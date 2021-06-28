import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { authService, dbService } from '../firebaseApp'

const Profile = ({ userObj }) => {
  const history = useHistory()

  // #. 로그아웃
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

  // Use Effect
  useEffect(() => {
    getMyTweets()
  }, [])

  // Return
  return <button onClick={onLogOutClick}>Log Out</button>
}

export default Profile
