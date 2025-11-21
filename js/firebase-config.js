import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-storage.js";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCRmjcbqMRel8iQiTc3ODS6xa6Id77JwIM",
  authDomain: "edubot-gtu.firebaseapp.com",
  projectId: "edubot-gtu",
  storageBucket: "edubot-gtu.firebasestorage.app",
  messagingSenderId: "797163892030",
  appId: "1:797163892030:web:7e6dcb3e34088df58a106f",
  measurementId: "G-HS5LHX4EPF"
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
