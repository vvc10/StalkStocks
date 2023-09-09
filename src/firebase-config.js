// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import {getFirestore} from "firebase/firestore"
import {getStorage} from "firebase/storage"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAG6-bAiIFojfj-q440i1oNgGtdKyry9zA",
  authDomain: "imggen-af5a6.firebaseapp.com",
  projectId: "imggen-af5a6",
  storageBucket: "imggen-af5a6.appspot.com",
  messagingSenderId: "217207144998",
  appId: "1:217207144998:web:9c30b5ab454228142c5ce7",
  measurementId: "G-ERYQQVT17Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const API_TOKEN = "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";
export const Auth = getAuth(app)
export const Provider = new GoogleAuthProvider()
export const db = getFirestore(app)
export const storage = getStorage(app)