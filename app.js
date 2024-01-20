// Import the functions you need from the SDKs you need
import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js";
import {
    getAnalytics
} from "https://www.gstatic.com/firebasejs/10.7.2/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyD9KCZhh3kqQhlxXBnOEDJ94np7pFffx_g",
    authDomain: "maheshportfolio-6fc50.firebaseapp.com",
    projectId: "maheshportfolio-6fc50",
    storageBucket: "maheshportfolio-6fc50.appspot.com",
    messagingSenderId: "987364420623",
    appId: "1:987364420623:web:7aa0de336dc5cbe4ab877a",
    measurementId: "G-DNGFJYV761"
};
import {
    doc,
    getDoc,
    getFirestore
} from "https://www.gstatic.com/firebasejs/10.7.2/firebase-firestore.js";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


const db = getFirestore(app);
const docRef = doc(db, "siteData", "allContent");
const docSnap = await getDoc(docRef);

if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
} else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
}