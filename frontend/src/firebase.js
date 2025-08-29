// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCc4YV6BSpfdGMvDQ4aFNIt5Z-XoDiumvE",
  authDomain: "book-fce9d.firebaseapp.com",
  projectId: "book-fce9d",
  storageBucket: "book-fce9d.firebasestorage.app",
  messagingSenderId: "674996265383",
  appId: "1:674996265383:web:c300594ecf9a893d3f5682",
  measurementId: "G-WEQKTTY22M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
export const auth = getAuth(app); // ✅ Named export

export default app;
