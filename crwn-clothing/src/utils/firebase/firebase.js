import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider
} from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDFkS0I84MepyaykgfSulW8Q-pSzjCzBlw',
  authDomain: 'fashionista-db-2d0ff.firebaseapp.com',
  projectId: 'fashionista-db-2d0ff',
  storageBucket: 'fashionista-db-2d0ff.appspot.com',
  messagingSenderId: '1083246845614',
  appId: '1:1083246845614:web:d6ef6fcc7ba43a7b5b173f'
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: 'select_account'
});

const auth = getAuth();
const signInWithGooglePopup = () => signInWithPopup(auth, provider);

const db = getFirestore();
const createUserDocumentFromAuth = async userAuth => {
  const userDocRef = doc(db, 'users', userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  // if user data not exists
  // create / set the document with the data from userAuth in my collection
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt
      });
    } catch (err) {
      console.log(`Error creating the user ${err.message}`);
    }
  }

  // if user data exists
  // return userDocRef
  return userDocRef;
};

export { auth, signInWithGooglePopup, db, createUserDocumentFromAuth };
