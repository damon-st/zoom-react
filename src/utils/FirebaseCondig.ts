// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import{getAuth}from "firebase/auth";
import {collection,getFirestore}from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBpxaOc5SLtWJQ9eztLlM3RPZtn7K0Zbhs",
  authDomain: "angular-html-cfe31.firebaseapp.com",
  databaseURL: "https://angular-html-cfe31.firebaseio.com",
  projectId: "angular-html-cfe31",
  storageBucket: "angular-html-cfe31.appspot.com",
  messagingSenderId: "724649066042",
  appId: "1:724649066042:web:e38a5917eec8f6703abf03",
  measurementId: "G-2W3KDWV1SV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);
export const firebaseDB = getFirestore(app);

export const userRef = collection(firebaseDB,"users");
export const meetingsRef = collection(firebaseDB,"meetings");