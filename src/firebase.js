import firebase from 'firebase';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC7G4lKdSr8IupLseVp4vg7ahWVMEWUO68",
    authDomain: "uon-foe.firebaseapp.com",
    projectId: "uon-foe",
    storageBucket: "uon-foe.appspot.com",
    messagingSenderId: "524682378810",
    appId: "1:524682378810:web:db9fb6afa8db5e05c23f03",
    measurementId: "G-YZ7V72D6W8"
  };

const firebaseSApp = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
 const db = firebaseSApp.firestore();
 const googleProvider = new firebase.auth.GoogleAuthProvider();
 const facebookProvider = new firebase.auth.FacebookAuthProvider();
 const TwitterProvider = new firebase.auth.TwitterAuthProvider();
 const GithubProvider = new firebase.auth.GithubAuthProvider();
 const storage = firebase.storage();
export default {auth, db, storage};
export  {db, googleProvider, facebookProvider, TwitterProvider,GithubProvider};
export  {auth};
export  {storage};
