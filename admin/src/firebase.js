// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCv79XZRwcUMkqOp8jd3ZXCehUlx1evIb8",
  authDomain: "shop-32a8a.firebaseapp.com",
  projectId: "shop-32a8a",
  storageBucket: "shop-32a8a.appspot.com",
  messagingSenderId: "781695747857",
  appId: "1:781695747857:web:f29cee615ccde6332faeb0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;