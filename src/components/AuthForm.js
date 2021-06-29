import React, { useState } from 'react'
import { authService } from '../firebaseApp'

const AuthForm = () => {
  // State (상태관리)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [email, setEmail] = useState('')
  const [newAccount, setNewAccount] = useState(true)

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
      if (newAccount) {
        await authService.createUserWithEmailAndPassword(email, password)
      } else {
        await authService.signInWithEmailAndPassword(email, password)
      }
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

  return (
    <>
      <form onSubmit={onSubmit} className='container'>
        <input
          name='email'
          type='email'
          placeholder='Email'
          required
          value={email}
          onChange={onChange}
          className='authInput'
        />
        <input
          name='password'
          type='password'
          placeholder='Password'
          required
          value={password}
          onChange={onChange}
          className='authInput'
        />
        <input
          type='submit'
          className='authInput authSubmit'
          value={newAccount ? 'Create Account' : 'Log In'}
        />
        {error ? <span className='authError'>{error}</span> : null}
      </form>
      <span onClick={toggleAccount} className='authSwitch'>
        {newAccount ? 'Log In' : 'Create Accrount'}
      </span>
    </>
  )
}

export default AuthForm
