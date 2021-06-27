import React, { useEffect, useState } from 'react'
import { dbService } from '../firebaseApp'

const Home = () => {
  // State (상태관리)
  const [tweet, setTweet] = useState('')
  const [tweets, setTweets] = useState([])

  // #. Tweet Submit
  const onSubmit = async (event) => {
    event.preventDefault()
    await dbService.collection('tweets').add({
      tweet,
      createdAt: Date.now(),
    })
    setTweet('')
  }

  // #. Input Text 실시간 변경
  const onChange = (event) => {
    const {
      target: { value },
    } = event
    setTweet(value)
  }

  // #. Tweet 가져오기
  const getTweets = async () => {
    const DBTweets = await dbService.collection('tweets').get()
    DBTweets.forEach((document) => {
      const tweetObject = {
        ...document.data(),
        id: document.id,
      }
      setTweets((prev) => [tweetObject, ...prev])
    })
  }

  useEffect(() => {
    getTweets()
  }, [])

  console.log(tweets)
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
      <div>
        {tweets.map((tweet) => (
          <div key={tweet.id}>
            <h4>{tweet.tweet}</h4>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home
