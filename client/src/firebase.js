// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCVtleXF_wMzKyqje5WF1-QrbxIgDE-Ck4",
  authDomain: "d-kisan.firebaseapp.com",
  projectId: "d-kisan",
  storageBucket: "d-kisan.appspot.com",
  messagingSenderId: "274419079587",
  appId: "1:274419079587:web:253721f30bc6557d49a216",
  measurementId: "G-NKP2WJLFB3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default getFirestore();