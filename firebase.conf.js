// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDF9TMl0-uZBLh-CqEUFc-nqIokKdiNS5c",
  authDomain: "hetic-58f98.firebaseapp.com",
  projectId: "hetic-58f98",
  storageBucket: "hetic-58f98.appspot.com",
  messagingSenderId: "199403566102",
  appId: "1:199403566102:web:0c12574edb49d27bff7137",
  measurementId: "G-0ESZLLZWZR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);