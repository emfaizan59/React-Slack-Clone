import * as firebase from 'firebase/app';
import "firebase/auth"
import "firebase/storage"
import "firebase/database"

var firebaseConfig = {
    apiKey: "AIzaSyDCiqd0GNR4Mhs7xOooyjQ6Rg95AYNRYJM",
    authDomain: "react-slack-clone-18154.firebaseapp.com",
    databaseURL: "https://react-slack-clone-18154.firebaseio.com",
    projectId: "react-slack-clone-18154",
    storageBucket: "react-slack-clone-18154.appspot.com",
    messagingSenderId: "420445690002",
    appId: "1:420445690002:web:17cf9ce7a379e774912e4b"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);


export default firebase;