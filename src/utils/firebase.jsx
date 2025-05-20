// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC8y3jZqubRpukRcrbe73LWgw00XPwAPho",
  authDomain: "e-menu-b1cfa.firebaseapp.com",
  projectId: "e-menu-b1cfa",
  storageBucket: "e-menu-b1cfa.firebasestorage.app",
  messagingSenderId: "133779154408",
  appId: "1:133779154408:web:b666603da1471f8baef05d",
  measurementId: "G-P0T8QJK84S"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);