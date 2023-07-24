import React, { useEffect } from 'react';
import { auth,db, getRedirectResult } from '../../firebase';
import {GoogleAuthProvider,signInWithRedirect} from 'firebase/auth'
import {addDoc, collection,  serverTimestamp, query, where, getDocs} from 'firebase/firestore'

const style = {
  wrapper: `self-center cursor-pointer`
};

const googleSignIn = () => {
  const provider = new GoogleAuthProvider();
  signInWithRedirect(auth, provider);
};

const checkUserExists = async (uid) => {
  const usersRef = collection(db, 'users');
  const q = query(usersRef, where('uid', '==', uid));
  const snapshot = await getDocs(q);
  return !snapshot.empty;
};

const SignIn = () => {
  useEffect(() => {
    // Check response from google auth
    getRedirectResult(auth)
      .then( async(result) => {
    //kiểm tra xem tk tồn tại trong users chưa
      const userId = result.user.uid;
      const userExists = await checkUserExists(userId);
      if (!userExists) {
        // Tài khoản đăng nhập lần đầu
        const user = result.user;
        const additionalUserInfo = result.providerId;
        try {
          await addDoc(collection(db, 'users'), {
            displayName: user.displayName,
            email: user?.email || "",
            photoURL: user.photoURL,
            uid: user.uid,
            providerId: additionalUserInfo,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
          })
        } catch (error) {
          console.log("Login error:",error);
        }
      }})
      .catch((error) => {
        console.log('Login error:', error);
      });
  }, []);

  return (
    <div className={style.wrapper} onClick={googleSignIn}>
      <link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Open+Sans" />
      <div class="google-btn">
        <div class="google-icon-wrapper">
          <img alt='logo' class="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" />
        </div>
        <p class="btn-text"><b>Sign in with Google</b></p>
      </div>
    </div>
  );
};

export default SignIn;
