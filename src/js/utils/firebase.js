// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDXlwg6GTCiQY-04YTR2flF1KiNZ_pZ3oE',
  authDomain: 'story-app-a0fde.firebaseapp.com',
  projectId: 'story-app-a0fde',
  storageBucket: 'story-app-a0fde.appspot.com',
  messagingSenderId: '822464144425',
  appId: '1:822464144425:web:a8832ac5c65d1718282838',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };
