import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAEMEwNQz1JRMn7nOPSG1MVtfYd4x_kFGw",
  authDomain: "interactive-wall-rb.firebaseapp.com",
  projectId: "interactive-wall-rb",
  storageBucket: "interactive-wall-rb.firebasestorage.app",
  messagingSenderId: "991980685250",
  appId: "1:991980685250:web:a38d957adccd51c9a3b85b"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };