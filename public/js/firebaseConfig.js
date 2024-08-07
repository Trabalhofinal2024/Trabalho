// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAZH4dpxqmbSUPvRK-hKr-RBNssxGnQsJk",
  authDomain: "trabalho-final-2024.firebaseapp.com",
  databaseURL: "https://trabalho-final-2024-default-rtdb.firebaseio.com",
  projectId: "trabalho-final-2024",
  storageBucket: "trabalho-final-2024.appspot.com",
  messagingSenderId: "786939469658",
  appId: "1:786939469658:web:2859c66cfeb694edde1d63",
  measurementId: "G-H081R9Y60Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);