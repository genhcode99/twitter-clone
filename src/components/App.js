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
        setUserObj(user)
      }
      setInit(true)
    })
  }, [])

  return (
    <>
      {init ? (
        <Router isLoggedIn={Boolean(userObj)} userObj={userObj} />
      ) : (
        'Initializing....'
      )}
    </>
  )
}

export default App
