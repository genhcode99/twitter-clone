import React, { useEffect, useState } from 'react'
import Tweet from '../components/Tweet'
import { v4 as uuidv4 } from 'uuid'
import { dbService, storageService } from '../firebaseApp'

const Home = ({ userObj }) => {
  // State (상태관리)
  const [tweet, setTweet] = useState('')
  const [tweets, setTweets] = useState([])
  const [attachment, setAttachment] = useState('')

  // #. Tweet Submit
  const onSubmit = async (event) => {
    event.preventDefault()
    let attachmentUrl = ''
    if (attachment !== '') {
      const attachmentRef = storageService
        .ref()
        .child(`${userObj.uid}/${uuidv4()}`)
      const reponse = await attachmentRef.putString(attachment, 'data_url')
      attachmentUrl = await reponse.ref.getDownloadURL()
    }
    const tweetInfo = {
      text: tweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      attachmentUrl,
    }
    await dbService.collection('tweets').add(tweetInfo)
    setTweet('')
    setAttachment('')
  }

  // #. Input Text 실시간 변경
  const onChange = (event) => {
    const {
      target: { value },
    } = event
    setTweet(value)
  }

  // #. 선택된 사진 미리보기
  const onFileChange = (event) => {
    const {
      target: { files },
    } = event
    const theFile = files[0]
    const reader = new FileReader()
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent
      setAttachment(result)
    }
    reader.readAsDataURL(theFile)
  }

  // #. 선택된 사진 지우기
  const onClickClear = () => {
    setAttachment(null)
  }

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
    <div>
      <form onSubmit={onSubmit}>
        <input
          type='text'
          value={tweet}
          onChange={onChange}
          placeholder="What's on your mind"
          maxLength={120}
        />
        <input type='file' accept='image/*' onChange={onFileChange} />
        <input type='submit' value='Tweet' />
        {attachment ? (
          <div>
            <img src={attachment} width='50px' height='50px' alt='attached' />
            <button onClick={onClickClear}>Clear</button>
          </div>
        ) : null}
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
