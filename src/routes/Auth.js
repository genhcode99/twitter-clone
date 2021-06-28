import React, { useState } from 'react'
import { authService, firebaseInstance } from '../firebaseApp'

const Auth = () => {
  // State (상태관리)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [newAccount, setNewAccount] = useState(true)
  const [error, setError] = useState('')

  // #. 이메일, 비밀번호 Input 값 실시간 변경
  const onChange = (event) => {
    const {
      target: { name, value },
    } = event
    if (name === 'email') {
      setEmail(value)
    } else if (name === 'password') {
      setPassword(value)
    }
  }

  // #. 이메일, 비밀번호 Submit 시 로그인 / 회원가입
  const onSubmit = async (event) => {
    event.preventDefault()
    try {
      let data
      if (newAccount) {
        data = await authService.createUserWithEmailAndPassword(email, password)
      } else {
        data = await authService.signInWithEmailAndPassword(email, password)
      }
      console.log(data)
    } catch (error) {
      setError(error.message)
      setTimeout(() => {
        setError('')
      }, 5000)
    }
    setPassword('')
  }

  // #. 로그인 / 회원가입 변경 버튼
  const toggleAccount = () => setNewAccount((prev) => !prev)

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
    const data = await authService.signInWithPopup(provider)
    console.log(data)
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          name='email'
          type='email'
          placeholder='Email'
          required
          value={email}
          onChange={onChange}
        />
        <input
          name='password'
          type='password'
          placeholder='Password'
          required
          value={password}
          onChange={onChange}
        />
        <input type='submit' value={newAccount ? 'Create Account' : 'Log In'} />
        {error}
      </form>
      <span onClick={toggleAccount}>
        {newAccount ? 'Log In' : 'Create Accrount'}
      </span>
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
