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
    getFirestore,
    getDoc,
    setDoc
} from "https://www.gstatic.com/firebasejs/10.7.2/firebase-firestore.js";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


const db = getFirestore(app);
const contentDoc = doc(db, "siteData", "allContent");
// const settingsDoc = doc(db, "siteData", "settings");
const contentDocSnap = await getDoc(contentDoc);
// const settingsDocSnap = await getDoc(settingsDoc);

if (contentDocSnap.exists()) {
    // console.log("Document data:", contentDocSnap.data());
    showData(contentDocSnap.data());
    setDataToEdit(contentDocSnap.data());
} else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
}

function showData(data) {
    // html objects
    const valueMoto = document.getElementById('valueMoto');
    const valueAbout = document.getElementById('valueAbout');
    const valueTextColorBlock = document.getElementsByName('valueTextColorBlock');
    const valueColorBlock = document.getElementsByName('valueColorBlock');
    const valueLocation = document.getElementsByName('valueLocation');

    // set values from database
    valueMoto.innerHTML = data.moto;
    valueAbout.innerHTML = data.about;
    valueTextColorBlock[0].innerHTML = data.colorBlocksKeys[0];
    valueTextColorBlock[1].innerHTML = data.colorBlocksKeys[1];
    valueTextColorBlock[2].innerHTML = data.colorBlocksKeys[2];
    valueColorBlock[0].innerHTML = data.colorBlocksValues[0] + '+';
    valueColorBlock[1].innerHTML = data.colorBlocksValues[1] + '+';
    valueColorBlock[2].innerHTML = data.colorBlocksValues[2] + '+';
    valueLocation[0].innerHTML = data.location;

    valueLocation[1].src = getOnlyURL(data.locationURL);
}

function getOnlyURL(htmlString) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, 'text/html');

    const iframeElement = doc.querySelector('iframe');

    if (iframeElement) {
        return iframeElement.getAttribute('src');
    } else {
        return null; // Handle the case when no iframe is found
    }
}

function setDataToEdit(data) {
    // html objects
    const editMoto = document.getElementById('motoTextBox');
    const editAbout = document.getElementById('aboutTextBox');
    const editTextColorBlock = document.getElementsByName('editTextColorBlock');
    const editColorBlock = document.getElementsByName('editColorBlock');
    const editLocation = document.getElementsByName('editLocation');

    // set values from database
    editMoto.value = data.moto;
    editAbout.value = data.about;
    editTextColorBlock[0].value = data.colorBlocksKeys[0];
    editTextColorBlock[1].value = data.colorBlocksKeys[1];
    editTextColorBlock[2].value = data.colorBlocksKeys[2];
    editColorBlock[0].value = data.colorBlocksValues[0];
    editColorBlock[1].value = data.colorBlocksValues[1];
    editColorBlock[2].value = data.colorBlocksValues[2];
    editLocation[0].value = data.location;

    editLocation[1].value = data.locationURL;
}

const saveEditedData = document.getElementById('saveEditedData');

saveEditedData.addEventListener('click', () => {
    const edits = {
        moto: document.getElementById('motoTextBox').value,
        about: document.getElementById('aboutTextBox').value,
        colorBlocksKeys: [
            document.getElementsByName('editTextColorBlock')[0].value,
            document.getElementsByName('editTextColorBlock')[1].value,
            document.getElementsByName('editTextColorBlock')[2].value
        ],
        colorBlocksValues: [
            document.getElementsByName('editColorBlock')[0].value,
            document.getElementsByName('editColorBlock')[1].value,
            document.getElementsByName('editColorBlock')[2].value
        ],
        location: document.getElementsByName('editLocation')[0].value,
        locationURL: document.getElementsByName('editLocation')[1].value
    };
    saveEdits(edits);
});

async function saveEdits(edits) {
    const loadingScreen = document.getElementById('loadingScreen');
    loadingScreen.classList.remove('d-none');
    try {
        await setDoc(contentDoc, edits);
        console.log("Document successfully written!");
    } catch (e) {
        console.log(e);
    }
    loadingScreen.classList.add('d-none');
    const closeOptionRight = document.getElementById('closeOptionRight');
    closeOptionRight.click();
    showData(contentDocSnap.data());
};