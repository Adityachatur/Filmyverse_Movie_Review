
import { initializeApp } from "firebase/app";
import { getFirestore, collection } from 'firebase/firestore'; //
const firebaseConfig = {
  apiKey: "AIzaSyDEG0Jk6hUBTOHSdOkUidHJzyIxXNsUar0",
  authDomain: "filmyverse-1f9ec.firebaseapp.com",
  projectId: "filmyverse-1f9ec",
  storageBucket: "filmyverse-1f9ec.appspot.com",
  messagingSenderId: "452540365293",
  appId: "1:452540365293:web:342ed610597fa0c90e4fe4"
};
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app); // 
export const moviesRef = collection(db, "Movies"); //
export const reviewRef = collection(db, "Review");
export const userRef = collection(db,"Users");
export default app;