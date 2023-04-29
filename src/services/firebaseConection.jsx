import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage'


const firebaseConfig = {
    apiKey: "AIzaSyCs05AGtRkGcnJfXCewpq8GdrPBCJpi31Q",
    authDomain: "tickets-e938a.firebaseapp.com",
    projectId: "tickets-e938a",
    storageBucket: "tickets-e938a.appspot.com",
    messagingSenderId: "256178423647",
    appId: "1:256178423647:web:9c75f354cb3d81848898ea",
    measurementId: "G-RFX7WPBQHW"
};

const firebaseApp = initializeApp(firebaseConfig);

const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

export { auth, db, storage };