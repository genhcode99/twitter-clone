import React, { useState } from 'react'

const Home = () => {
  // 1. 버튼 클릭
  const onSubmit = (event) => {
    event.preventDefault()
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
