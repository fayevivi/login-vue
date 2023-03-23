// firebase.js

import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyAdgEIrfiec7OluDmHzkDboZSwSiR6cTqA",
    authDomain: "member-c757d.firebaseapp.com",
    projectId: "member-c757d",
    storageBucket: "member-c757d.appspot.com",
    messagingSenderId: "403255110776",
    appId: "1:403255110776:web:90d3170d8d2ca5ee77d18d"
}
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

export { app, auth }


