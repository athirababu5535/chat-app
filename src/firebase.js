// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBJpK4RT3gtNEMNL80sRlqqqqI8vmdp0Lg",
  authDomain: "chat-app-5759e.firebaseapp.com",
  projectId: "chat-app-5759e",
  databaseURL:"https://chat-app-5759e.firebaseio.com",
  storageBucket: "chat-app-5759e.appspot.com",
  messagingSenderId: "936509600575",
  appId: "1:936509600575:web:abd537674754b03727998a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export {auth,db,storage}