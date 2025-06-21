import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC8xTrvdFZzxu_L_PDLhnzIyeTxJUMAu7Q",
  authDomain: "my-personal-task-manager-8c796.firebaseapp.com",
  databaseURL: "https://my-personal-task-manager-8c796-default-rtdb.firebaseio.com",
  projectId: "my-personal-task-manager-8c796",
  storageBucket: "my-personal-task-manager-8c796.firebasestorage.app",
  messagingSenderId: "1047540581777",
  appId: "1:1047540581777:web:256f307951c86c614dc630"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const auth = getAuth(app);
