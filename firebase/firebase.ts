import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import firebase from "firebase/compat/app";

const firebaseConfig = {
  apiKey: "AIzaSyAqWkAneBuT-MMorr-Gqry0LaHPhWl5Tec",
  authDomain: "task-management-e3210.firebaseapp.com",
  projectId: "task-management-e3210",
  storageBucket: "task-management-e3210.appspot.com",
  messagingSenderId: "278888747624",
  appId: "1:278888747624:web:d60a71a661abac7744a1dd",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const auth = getAuth(app);

export { app, auth };
