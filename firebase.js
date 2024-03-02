// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCOBFMnoPcvW_OSIHy5j0OulI2UCz10Gt0",
  authDomain: "tomatocrop-66f6d.firebaseapp.com",
  projectId: "tomatocrop-66f6d",
  storageBucket: "tomatocrop-66f6d.appspot.com",
  messagingSenderId: "774873843581",
  appId: "1:774873843581:web:bdd38f5ba283380e1c2e14"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
const auth = getAuth(app);

export { auth };