// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBxphr8UtjEbVrgN3M9R34A7YrQEA6nLSs",
  authDomain: "curso-react-dc0dd.firebaseapp.com",
  projectId: "curso-react-dc0dd",
  storageBucket: "curso-react-dc0dd.appspot.com",
  messagingSenderId: "1038515478052",
  appId: "1:1038515478052:web:827ce94c90e2a80c1582b1"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig); 
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB =  getFirestore(FirebaseApp);