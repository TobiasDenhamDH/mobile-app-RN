import app from 'firebase/app'
import firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyDZvYgnit8_rPY8s9AjL6L9dRVj_rBH9e8",
  authDomain: "prog3-denham.firebaseapp.com",
  projectId: "prog3-denham",
  storageBucket: "prog3-denham.appspot.com",
  messagingSenderId: "436075676426",
  appId: "1:436075676426:web:cf1a2828782006c52170f3"
};

// Initialize Firebase
app.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const db = app.firestore();
export const storage = app.storage();