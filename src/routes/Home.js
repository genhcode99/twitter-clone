import React, { useEffect, useState } from 'react'
import { traverseTwoPhase } from 'react-dom/test-utils'
import Tweet from '../components/Tweet'
import { dbService } from '../firebaseApp'

const Home = ({ userObj }) => {
  // State (상태관리)
  const [tweet, setTweet] = useState('')
  const [tweets, setTweets] = useState([])

  // #. Tweet Submit
  const onSubmit = async (event) => {
    event.preventDefault()
    await dbService.collection('tweets').add({
      text: tweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
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

  useEffect(() => {
    // #. Tweets DB에서 '실시간' 가져오기
    dbService
      .collection('tweets')
      .orderBy('createdAt', 'desc')
      .onSnapshot((snapshot) => {
        const tweetArray = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))

        setTweets(tweetArray)
      })
  }, [])

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
          <Tweet
            key={tweet.id}
            tweetObj={tweet}
            isOwner={tweet.creatorId === userObj.uid}
          />
        ))}
      </div>
    </div>
  )
}

export default Home
