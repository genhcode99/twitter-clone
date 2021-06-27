import React, { useState } from 'react'
import { authService } from '../firebaseApp'
import Router from './Router'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser)
  return (
    <>
      <Router isLoggedIn={isLoggedIn} />
      <footer>&copy;{new Date().getFullYear()}</footer>
    </>
  )
}

export default App
