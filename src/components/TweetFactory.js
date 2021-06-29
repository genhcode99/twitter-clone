import React, { useState } from 'react'
import { dbService, storageService } from '../firebaseApp'
import { v4 as uuidv4 } from 'uuid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons'

const TweetFactory = ({ userObj }) => {
  // State (상태관리)
  const [tweet, setTweet] = useState('')
  const [attachment, setAttachment] = useState('')

  // #. Tweet Submit
  const onSubmit = async (event) => {
    event.preventDefault()
    if (tweet === '') {
      return
    }
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
    setAttachment('')
  }

  return (
    <form onSubmit={onSubmit} className='factoryForm'>
      <div className='factory__container'>
        <input
          className='factoryInput__input'
          type='text'
          value={tweet}
          onChange={onChange}
          placeholder="What's on your mind"
          maxLength={120}
        />
        <input type='submit' value='&rarr;' className='factoryInput__arror' />
      </div>
      <label for='attach-file' className='factoryInput__label'>
        <span>Add Photos</span>
        <FontAwesomeIcon icon={faPlus} />
      </label>
      <input
        id='attach-file'
        type='file'
        accept='image/*'
        onChange={onFileChange}
        style={{ opacity: 0 }}
      />
      {attachment ? (
        <div className='factoryForm__attachment'>
          <img
            src={attachment}
            style={{ backgroundImage: attachment }}
            alt='attached'
          />
          <div className='factoryForm__clear' onClick={onClickClear}>
            <span>Remove</span>
            <FontAwesomeIcon icon={faTimes} />
          </div>
        </div>
      ) : null}
    </form>
  )
}

export default TweetFactory
