import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { authService } from '../firebaseApp'

const Profile = ({ userObj, refreshUser }) => {
  // State (상태관리)
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName)

  // #. 로그아웃
  const history = useHistory()
  const onLogOutClick = () => {
    authService.signOut()
    history.push('/')
  }

  // #. displayName 변경
  const onSubmit = async (event) => {
    event.preventDefault()
    if (userObj.displayName !== newDisplayName) {
      await userObj.updateProfile({
        displayName: newDisplayName,
      })
      refreshUser()
    }
  }

  // #. Input 글씨 실시간 변경
  const onChange = (event) => {
    const {
      target: { value },
    } = event
    setNewDisplayName(value)
  }

  // Return
  return (
    <div className='container'>
      <form onSubmit={onSubmit} className='profileForm'>
        <input
          onChange={onChange}
          type='text'
          autoFocus
          placeholder='Display Name'
          value={newDisplayName}
          className='formInput'
        />
        <input
          type='submit'
          value='Update Profile'
          className='formBtn'
          style={{
            marginTop: 10,
          }}
        />
      </form>
      <span className='formBtn cancelBtn logOut' onClick={onLogOutClick}>
        Log Out
      </span>
    </div>
  )
}

export default Profile
