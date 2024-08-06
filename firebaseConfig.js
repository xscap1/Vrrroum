// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { initializeAuth, getAuth, getReactNativePersistence } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCGXz0SO-GgC940HqoGZ32swcqrVisb9CM",
  authDomain: "kaki-e1cd9.firebaseapp.com",
  projectId: "kaki-e1cd9",
  storageBucket: "kaki-e1cd9.appspot.com",
  messagingSenderId: "383293001226",
  appId: "1:383293001226:web:a3aec8d5d26b050a8e59f3",
  measurementId: "G-LWGGMETRV7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const initAuth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
const auth = getAuth(app);

export { auth }