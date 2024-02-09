// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDGH1EXCdr41OZolHiPiyftzPm8bvKmL6Y",
  authDomain: "tomato-disease-identific-ba6d4.firebaseapp.com",
  databaseURL: "https://tomato-disease-identific-ba6d4-default-rtdb.firebaseio.com",
  projectId: "tomato-disease-identific-ba6d4",
  storageBucket: "tomato-disease-identific-ba6d4.appspot.com",
  messagingSenderId: "374304704954",
  appId: "1:374304704954:web:63464cfd88377e3d663583",
  measurementId: "G-EMBHG6QXGT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
const auth = getAuth(app);

export { auth };