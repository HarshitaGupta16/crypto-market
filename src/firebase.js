import { initializeApp } from "firebase/app";
import firebaseConfig from "./config/firebaseConfig";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// this variable will be entry point between project and firebase
const firebaseApp = initializeApp(firebaseConfig);

const auth = getAuth(firebaseApp);

const db = getFirestore(firebaseApp);

export { auth, db };
