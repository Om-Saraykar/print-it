// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAA1RHW27492bG_bQRySQn6aAxb9U-UpOI",
  authDomain: "print-it-70f2f.firebaseapp.com",
  projectId: "print-it-70f2f",
  storageBucket: "print-it-70f2f.appspot.com",
  messagingSenderId: "789127145775",
  appId: "1:789127145775:web:ad48e91c02b4589ac2d9da",
  measurementId: "G-SBB02QBL72"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup };
