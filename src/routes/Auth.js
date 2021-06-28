import React from 'react'
import { authService, firebaseInstance } from '../firebaseApp'
import AuthForm from '../components/AuthForm'

const Auth = () => {
  // #. 소셜 로그인 버튼
  const onSocialClick = async (event) => {
    const {
      target: { name },
    } = event
    let provider
    if (name === 'google') {
      provider = new firebaseInstance.auth.GoogleAuthProvider()
    } else if (name === 'github') {
      provider = new firebaseInstance.auth.GithubAuthProvider()
    }
    await authService.signInWithPopup(provider)
  }

  return (
    <div>
      <AuthForm />
      <div>
        <button onClick={onSocialClick} name='google'>
          Continue with Google
        </button>
        <button onClick={onSocialClick} name='github'>
          Continue with GitHub
        </button>
      </div>
    </div>
  )
}

export default Auth
