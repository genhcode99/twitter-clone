import React, { useState } from 'react'
import { dbService } from '../firebaseApp'

const Home = () => {
  // 1. 버튼 클릭
  const onSubmit = async (event) => {
    event.preventDefault()
    await dbService.collection('tweets').add({
      tweet,
      createdAt: Date.now(),
    })
    setTweet('')
  }

  // 2. Input Text 변경
  const [tweet, setTweet] = useState('')

  const onChange = (event) => {
    const {
      target: { value },
    } = event
    setTweet(value)
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type='text'
          value={tweet}
          onChange={onChange}
          placeholder="What's on your mind"
          maxLength={120}
        />
        <input type='submit' value='Tweet' />
      </form>
    </div>
  )
}

export default Home
