// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,
  authDomain: "aureliahr.firebaseapp.com",
  projectId: "aureliahr",
  storageBucket: "aureliahr.firebasestorage.app",
  messagingSenderId: "694312438313",
  appId: "1:694312438313:web:ca0b39fb5e9b668ea62a38"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);