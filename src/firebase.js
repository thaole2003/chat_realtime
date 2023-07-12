// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBtr1Eh7PIxpRJtIu7btEw5D_MOOBOWRtI",
  authDomain: "react-chat-ee4de.firebaseapp.com",
  projectId: "react-chat-ee4de",
  storageBucket: "react-chat-ee4de.appspot.com",
  messagingSenderId: "523798467583",
  appId: "1:523798467583:web:95d67b90a673f181c18dca"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)