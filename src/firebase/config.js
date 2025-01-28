// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyDXBLbJIdyfuwDyuWIliOpMaPd9_6UNNm0",
	authDomain: "miniblog-50c2c.firebaseapp.com",
	projectId: "miniblog-50c2c",
	storageBucket: "miniblog-50c2c.firebasestorage.app",
	messagingSenderId: "317056901442",
	appId: "1:317056901442:web:5f007556a929a9e487a8db",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db, app };