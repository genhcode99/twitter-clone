import React, { useEffect, useState } from 'react'
import Tweet from '../components/Tweet'

import { dbService } from '../firebaseApp'
import TweetFactory from '../components/TweetFactory'

const Home = ({ userObj }) => {
  // State (상태관리)
  const [tweets, setTweets] = useState([])

  // Use Effect
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

  // Return
  return (
    <div className='container'>
      <TweetFactory userObj={userObj} />
      <div style={{ marginTop: 30 }}>
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
