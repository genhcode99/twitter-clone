import React, { useState } from 'react'
import { dbService, storageService } from '../firebaseApp'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPencilAlt } from '@fortawesome/free-solid-svg-icons'

const Tweet = ({ tweetObj, isOwner }) => {
  // State (상태관리)
  const [editing, setEditing] = useState(false)
  const [newTweet, setNewTweet] = useState(tweetObj.text)

  // #. Tweet 삭제
  const onClickDel = async () => {
    const ok = window.confirm('정말로 삭제하시겠습니까?')
    if (ok) {
      await dbService.doc(`tweets/${tweetObj.id}`).delete()
      if (tweetObj.attachmentUrl !== '')
        await storageService.refFromURL(tweetObj.attachmentUrl).delete()
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
    <div className='tweet'>
      {editing ? (
        <>
          {isOwner ? (
            <>
              <form onSubmit={onSubmit} className='container tweetEdit'>
                <input
                  type='text'
                  placeholder='Edit your tweet'
                  onChange={onChange}
                  value={newTweet}
                  required
                  autoFocus
                  className='formInput'
                />
                <input type='submit' value='Update Tweet' className='formBtn' />
              </form>
              <span onClick={toggleEditing} className='formBtn cancelBtn'>
                Cancel
              </span>
            </>
          ) : null}
        </>
      ) : (
        <>
          <h4>{tweetObj.text}</h4>
          {tweetObj.attachmentUrl ? (
            <img src={tweetObj.attachmentUrl} alt='With chat' />
          ) : null}
          {isOwner ? (
            <div className='tweet__actions'>
              <span onClick={onClickDel}>
                <FontAwesomeIcon icon={faTrash} />
              </span>
              <span onClick={toggleEditing}>
                <FontAwesomeIcon icon={faPencilAlt} />
              </span>
            </div>
          ) : null}
        </>
      )}
    </div>
  )
}

export default Tweet
