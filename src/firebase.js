import { initializeApp } from "firebase/app";
import { getAuth, signInWithRedirect, getRedirectResult } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBtr1Eh7PIxpRJtIu7btEw5D_MOOBOWRtI",
  authDomain: "react-chat-ee4de.firebaseapp.com",
  projectId: "react-chat-ee4de",
  storageBucket: "react-chat-ee4de.appspot.com",
  messagingSenderId: "523798467583",
  appId: "1:523798467583:web:95d67b90a673f181c18dca",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export { signInWithRedirect, getRedirectResult };
