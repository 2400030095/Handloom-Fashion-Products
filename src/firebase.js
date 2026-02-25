import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Handloom-Fashion Firebase Project
const firebaseConfig = {
    apiKey: "AIzaSyD5vZDQbVwtZ629xS4Y3wBalMD4W0WBxxg",
    authDomain: "handloom-fashion.firebaseapp.com",
    projectId: "handloom-fashion",
    storageBucket: "handloom-fashion.firebasestorage.app",
    messagingSenderId: "1073247680386",
    appId: "1:1073247680386:web:bc5f57b6a1de5bdc14419b"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
