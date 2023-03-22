import { initializeApp } from "firebase/app";
import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  getAuth,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "luvmessenger-46dab.firebaseapp.com",
  projectId: "luvmessenger-46dab",
  storageBucket: "luvmessenger-46dab.appspot.com",
  messagingSenderId: "221098215786",
  appId: "1:221098215786:web:ff476c06830e30b1d97d13",
  measurementId: "G-M0D4K8MDML",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const providerFacebook = new FacebookAuthProvider();
const providerGoogle = new GoogleAuthProvider();

export { auth, providerFacebook, providerGoogle };
