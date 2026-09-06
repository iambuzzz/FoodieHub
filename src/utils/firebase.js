// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// 1. getAuth aur GoogleAuthProvider ko import karein
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // 1. Firestore ko import karein
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCvDBoP3MzJVrop8T7PPc36Fq_iHjqP6Ys",
    authDomain: "foodiehub-5951f.firebaseapp.com",
    projectId: "foodiehub-5951f",
    storageBucket: "foodiehub-5951f.firebasestorage.app",
    messagingSenderId: "1039591520802",
    appId: "1:1039591520802:web:e0aeba864e7181f454287b",
    measurementId: "G-F33K2PY014",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// 2. Auth service aur Google Provider ko export karein
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider(); // Naya provider

export const db = getFirestore(app); // Firestore DB ko export karein

export default app;
