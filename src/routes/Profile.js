import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { authService, dbService } from '../firebaseApp'

const Profile = ({ userObj }) => {
  // State (상태관리)
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName)

  // #. 로그아웃
  const history = useHistory()
  const onLogOutClick = () => {
    authService.signOut()
    history.push('/')
  }

  // #. 사용자가 쓴 Tweet 가져오기
  const getMyTweets = async () => {
    const tweets = await dbService
      .collection('tweets')
      .where('creatorId', '==', userObj.uid)
      .orderBy('createdAt', 'desc')
      .get()
    console.log(tweets.docs.map((doc) => doc.data()))
  }

  // #. displayName 변경
  const onSubmit = async (event) => {
    event.preventDefault()
    if (userObj.displayName !== newDisplayName) {
      await userObj.updateProfile({
        displayName: newDisplayName,
      })
    }
  }

  // #. Input 글씨 실시간 변경
  const onChange = (event) => {
    const {
      target: { value },
    } = event
    setNewDisplayName(value)
  }

  // Use Effect
  useEffect(() => {
    getMyTweets()
  }, [])

  // Return
  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          type='text'
          placeholder='Display Name'
          onChange={onChange}
          value={newDisplayName}
        />
        <input type='submit' placeholder='Update Profile' />
      </form>
      <button onClick={onLogOutClick}>Log Out</button>
    </>
  )
}

export default Profile
