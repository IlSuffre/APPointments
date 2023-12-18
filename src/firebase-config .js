import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; 

//add your firebase keys here
const firebaseConfig = {
    apiKey: "Insert your api key here",
    authDomain: "Insert your api key here",
    projectId: "Insert your api key here",
    storageBucket: "Insert your api key here",
    messagingSenderId: "Insert your api key here",
    appId: "Insert your api key here",
    measurementId: "Insert your api key here"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
