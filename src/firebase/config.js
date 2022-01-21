import firebase from "firebase/app";
import "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyC5CmpBbioAb7BPFkjyxZWxFf9B0MN0Y38",
    authDomain: "vue-firebase-projects-446f5.firebaseapp.com",
    projectId: "vue-firebase-projects-446f5",
    storageBucket: "vue-firebase-projects-446f5.appspot.com",
    messagingSenderId: "506902671299",
    appId: "1:506902671299:web:1be9c2c8bef9800ef8d776"
  };

// initialize firebase
firebase.initializeApp(firebaseConfig)

// init firestore service
const projectFirestore = firebase.firestore()
const timestamp = firebase.firestore.FieldValue.serverTimestamp
// timestamp to get the time a post is created
// so we can display first the most recently made posts

// export firestore service
export { projectFirestore, timestamp }