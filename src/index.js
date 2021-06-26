import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import firebaseApp from './firebase'

console.log(firebaseApp)

ReactDOM.render(
  <App />,

  document.getElementById('root'),
)
