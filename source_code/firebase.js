// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Included for authentication
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCTnwjdnR_fdE79593NZU9NAcMRl7d_TUY",
  authDomain: "parkingbuddy-45506.firebaseapp.com",
  projectId: "parkingbuddy-45506",
  storageBucket: "parkingbuddy-45506.firebasestorage.app",
  messagingSenderId: "704160908298",
  appId: "1:704160908298:web:0fa95b85f7d9dd1e288bf3",
  measurementId: "G-ZYKZWC0YT1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and Analytics
const auth = getAuth(app);
const analytics = getAnalytics(app);

export { auth, analytics };