import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDF9TMl0-uZBLh-CqEUFc-nqIokKdiNS5c",
  authDomain: "hetic-58f98.firebaseapp.com",
  projectId: "hetic-58f98",
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const auth = app.auth();

export { auth };
