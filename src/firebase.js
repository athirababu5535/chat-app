// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC8PhbWYl_NTzXEhoXIuihC8vbLXzp4JTE",
  authDomain: "web-chat-5511f.firebaseapp.com",
  databaseURL:"https://web-chat-5511f.firebaseio.com",
  projectId: "web-chat-5511f",
  storageBucket: "web-chat-5511f.appspot.com",
  messagingSenderId: "740049273329",
  appId: "1:740049273329:web:1b6f177ada8a62d8dd0450"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export {auth,db,storage}