import { initializeApp } from 'firebase/app';
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signInWithRedirect,
  signOut
} from 'firebase/auth';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  writeBatch
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDFkS0I84MepyaykgfSulW8Q-pSzjCzBlw',
  authDomain: 'fashionista-db-2d0ff.firebaseapp.com',
  projectId: 'fashionista-db-2d0ff',
  storageBucket: 'fashionista-db-2d0ff.appspot.com',
  messagingSenderId: '1083246845614',
  appId: '1:1083246845614:web:d6ef6fcc7ba43a7b5b173f'
};

const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

const auth = getAuth();
const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

const db = getFirestore();

const addCollectionAndDocuments = async (collectionKey, objectToAdd) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  objectToAdd.forEach(object => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });

  await batch.commit();
};

const getCategoriesAndDocument = async () => {
  const collectionRef = collection(db, 'categories');
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(docSnapshot => docSnapshot.data());

  // const categoriesMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
  //   const { title, items } = docSnapshot.data();
  //   acc[title.toLowerCase()] = items;
  //   return acc;
  // }, {});

  // return categoriesMap;
};

const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return;

  const userDocRef = doc(db, 'users', userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);
  // if user data not exists
  // create / set the document with the data from userAuth
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation
      });
    } catch (err) {
      console.log(`Error creating the user ${err.message}`);
    }
  }
  // if user data exists
  // return userSnapshot
  return userSnapshot;
};

const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  const response = await createUserWithEmailAndPassword(auth, email, password);
  return response;
};

const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  const response = await signInWithEmailAndPassword(auth, email, password);
  return response;
};

const signOutUser = async () => await signOut(auth);

const onAuthStateChangedListener = callback =>
  onAuthStateChanged(auth, callback);

const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      userAuth => {
        unsubscribe();
        resolve(userAuth);
      },
      reject
    );
  });
};

export {
  auth,
  signInWithGooglePopup,
  signInWithGoogleRedirect,
  db,
  createUserDocumentFromAuth,
  createAuthUserWithEmailAndPassword,
  signInAuthUserWithEmailAndPassword,
  signOutUser,
  onAuthStateChangedListener,
  addCollectionAndDocuments,
  getCategoriesAndDocument,
  getCurrentUser
};
