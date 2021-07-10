import firebase from 'firebase'
import 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyDWlMuSEo1RXEKNkJcBEsevuD1i8d0jQ-o",
  authDomain: "cookfactor-fbd79.firebaseapp.com",
  projectId: "cookfactor-fbd79",
  storageBucket: "cookfactor-fbd79.appspot.com",
  messagingSenderId: "97955718423",
  appId: "1:97955718423:web:38cad246524dd996b9c352",
  measurementId: "G-QLXYZCQXXY"
};

firebase.initializeApp(firebaseConfig)

export default firebase