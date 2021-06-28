import React, { useState } from 'react'
import { dbService } from '../firebaseApp'

const Tweet = ({ tweetObj, isOwner }) => {
  // State (상태관리)
  const [editing, setEditing] = useState(false)
  const [newTweet, setNewTweet] = useState(tweetObj.text)

  // #. Tweet 삭제
  const onClickDel = async () => {
    const ok = window.confirm('정말로 삭제하시겠습니까?')
    if (ok) {
      await dbService.doc(`tweets/${tweetObj.id}`).delete()
    }
  }

  // #. Edit 활성화 토글 버튼
  const toggleEditing = () => setEditing((prev) => !prev)

  // #. Edit Input 실시간 타이핑
  const onChange = (event) => {
    const {
      target: { value },
    } = event
    setNewTweet(value)
  }

  // #. Tweet Edit
  const onSubmit = async (event) => {
    event.preventDefault()
    await dbService.doc(`tweets/${tweetObj.id}`).update({
      text: newTweet,
    })
    setEditing(false)
  }

  return (
    <div>
      {editing ? (
        <>
          {isOwner ? (
            <>
              <form onSubmit={onSubmit}>
                <input
                  type='text'
                  placeholder='Edit your tweet'
                  onChange={onChange}
                  value={newTweet}
                  required
                />
                <input type='submit' value='Update Tweet' />
              </form>
              <button onClick={toggleEditing}>Cancel</button>
            </>
          ) : null}
        </>
      ) : (
        <>
          <h4>{tweetObj.text}</h4>
          {tweetObj.attachmentUrl ? (
            <img
              src={tweetObj.attachmentUrl}
              width='50px'
              height='50px'
              alt='With chat'
            />
          ) : null}
          {isOwner ? (
            <>
              <button onClick={onClickDel}>Delete Tweet</button>
              <button onClick={toggleEditing}>Edit Tweet</button>
            </>
          ) : null}
        </>
      )}
    </div>
  )
}

export default Tweet
