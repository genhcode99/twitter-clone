import firebase from 'firebase'

const firebaseConfig = {
  apiKey: 'AIzaSyB0YMvN_PoMR5tlKnfD6DQILr6W5D312pc',
  authDomain: 'twitter-clone-56f79.firebaseapp.com',
  projectId: 'twitter-clone-56f79',
  storageBucket: 'twitter-clone-56f79.appspot.com',
  messagingSenderId: '833163225371',
  appId: '1:833163225371:web:1b6fad73d771218b278bbe',
}

const firebaseApp = firebase.initializeApp(firebaseConfig)

export default firebaseApp
