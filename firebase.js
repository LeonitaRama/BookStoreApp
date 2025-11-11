// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB2XsKQJ-0-3UOtM6Mx0BXCIPh_eDt4sxQ",
    authDomain: "fir-auth-facebook-d90ec.firebaseapp.com",
    projectId: "fir-auth-facebook-d90ec",
    storageBucket: "fir-auth-facebook-d90ec.firebasestorage.app",
    messagingSenderId: "368163206267",
    appId: "1:368163206267:web:439dc9796aa2c02ffa9ede",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)

export default app;