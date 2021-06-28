import React, { useEffect, useState } from 'react'
import { authService } from '../firebaseApp'
import Router from './Router'

function App() {
  // State (상태관리)
  const [init, setInit] = useState(false)
  const [userObj, setUserObj] = useState()

  useEffect(() => {
    // #. 로그인 상태 확인
    authService.onAuthStateChanged((user) => {
      if (user) {
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
          updateProfile: (args) => user.updateProfile(args),
        })
      }
      setInit(true)
    })
  }, [])

  // User 상태 실시간 새로고침
  const refreshUser = () => {
    const user = authService.currentUser
    setUserObj({
      displayName: user.displayName,
      uid: user.uid,
      updateProfile: (args) => user.updateProfile(args),
    })
  }

  return (
    <>
      {init ? (
        <Router
          isLoggedIn={Boolean(userObj)}
          userObj={userObj}
          refreshUser={refreshUser}
        />
      ) : (
        'Initializing....'
      )}
    </>
  )
}

export default App
