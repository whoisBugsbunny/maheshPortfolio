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
    getAuth,
    onAuthStateChanged,
    signOut,
    signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.7.2/firebase-auth.js";

import {
    doc,
    getFirestore,
    getDoc,
    setDoc
} from "https://www.gstatic.com/firebasejs/10.7.2/firebase-firestore.js";

import {
    getStorage,
    ref,
    getDownloadURL,
    uploadBytes,
    deleteObject
} from "https://www.gstatic.com/firebasejs/10.7.2/firebase-storage.js";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth();
const storage = getStorage();

const logoutdiv = document.getElementById('logoutdiv');
const logindiv = document.getElementById('logindiv');
const navDropDownOptsSettings = document.getElementById('navDropDownOptsSettings');
onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        logindiv.classList.add('d-none');
        logoutdiv.classList.remove('d-none');
        navDropDownOptsSettings.classList.remove('d-none');
        // ...
    } else {
        logoutdiv.classList.add('d-none');
        logindiv.classList.remove('d-none');
        navDropDownOptsSettings.classList.add('d-none');
        // User is signed out
        // ...
    }
});

const loginBox = document.getElementById('loginBox');
const loginScreen = document.getElementById('loginScreen');
const loginBtn = document.getElementById('loginBtn');
const logoutBtn = document.getElementById('logoutBtn');

loginBox.addEventListener('click', () => {
    loginScreen.classList.remove('d-none');
});

loginBtn.addEventListener('click', () => {
    console.log("loginBtn clicked");
    const email = document.getElementById('adminEmail').value;
    const password = document.getElementById('adminPass').value;
    login(email, password);
});
function login(email, password) {
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log(user);
            loginScreen.classList.add('d-none');
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log("login fail ", errorCode, errorMessage);
        });
}
logoutBtn.addEventListener('click', () => {
    logout();
});
function logout() {
    signOut(auth).then(() => {
        loginScreen.classList.add('d-none');
    }).catch((error) => {
        // An error happened.
    });
}

const db = getFirestore(app);
const contentDoc = doc(db, "siteData", "allContent");
// const backUpDoc = doc(db, "siteData", "backUp");
const contentDocSnap = await getDoc(contentDoc);
// const backUpDocSnap = await getDoc(backUpDoc);

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
    const mainImages = document.getElementsByName('mainImages');
    const appSnap = document.getElementsByName('appSnap');
    const resumeSelected = document.getElementById('downloadPdfBtn');

    setImages(data.profilePicsArr, mainImages, 3);
    setImages(data.appSnapArr, appSnap, 4);

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

    setPdfUrl(data.resumeSelected, resumeSelected);

    addSkills(data.skills);

    // change theme according to database
    changeTheme(data.theme);

    const themesOpts = document.getElementsByName('themesOpts');
    themesOpts[data.theme].classList.add('activeOpts');
}

async function setPdfUrl(pdf, object) {
    const imgURL = await getDownloadURL(ref(storage, pdf));
    object.href = imgURL;
}

async function setImages(data, imgDiv, count) {
    const ImgUrls = await getImagesUrl(data);
    setUrlsToPage(imgDiv, ImgUrls, count);
}

async function getImagesUrl(imgr) {
    const imgURLPromises = imgr.map(async (imgRef) => {
        const imgURL = await getDownloadURL(ref(storage, imgRef));
        return imgURL;
    });
    return Promise.all(imgURLPromises);
}

function setUrlsToPage(imgDiv, ImgUrls, count) {
    for (let i = 0; i < count; i++) {
        imgDiv[i].src = ImgUrls[i];
    }
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

function addSkills(skills) {
    const skillsContainer = document.getElementById('skillSnapContainer');
    skillsContainer.innerHTML = '';
    skills.forEach((skill) => {
        // const skillDiv = `<div class="skillbox"><img src="/images/brandIcons/${skill}.png" alt="${skill}" srcset="">${skill}</div>`
        const skillDiv = document.createElement('div');
        skillDiv.classList.add('skillbox');
        const skillImg = document.createElement('img');
        skillImg.src = `/images/brandIcons/${skill}.png`;
        skillImg.alt = skill;
        skillDiv.appendChild(skillImg);
        skillDiv.innerHTML += skill;
        skillsContainer.appendChild(skillDiv);
    });
}


function changeTheme(theme) {
    const body = document.getElementsByTagName('body');

    // Remove all existing classes
    body[0].classList.remove('black-theme', 'mystic-tranquility', 'shrine', 'snowy-fablescape');

    switch (theme) {
        case '0':
            body[0].classList.add('black-theme');
            break;
        case '1':
            body[0].classList.add('mystic-tranquility');
            break;
        case '2':
            body[0].classList.add('shrine');
            break;
        case '3':
            body[0].classList.add('snowy-fablescape');
            break;
        default:
            break;
    }
}

// local no data connection involved
const themesOpts = document.getElementsByName('themesOpts');
themesOpts.forEach((e) => {
    e.addEventListener('click', () => {
        themesOpts.forEach((op) => {
            op.classList.remove('activeOpts');
        });
        e.classList.add('activeOpts');
        changeTheme(e.dataset.value);
    });
});

function setDataToEdit(data) {
    // html objects
    const editMoto = document.getElementById('motoTextBox');
    const editAbout = document.getElementById('aboutTextBox');
    const editskills = document.getElementById('skillsTextBox');
    const editTextColorBlock = document.getElementsByName('editTextColorBlock');
    const editColorBlock = document.getElementsByName('editColorBlock');
    const editLocation = document.getElementsByName('editLocation');
    const editThemeDropBox = document.getElementById('editThemeDropBox');

    // set values from database
    editMoto.value = data.moto;
    editAbout.value = data.about;
    editskills.value = data.skills.join(', ');
    editTextColorBlock[0].value = data.colorBlocksKeys[0];
    editTextColorBlock[1].value = data.colorBlocksKeys[1];
    editTextColorBlock[2].value = data.colorBlocksKeys[2];
    editColorBlock[0].value = data.colorBlocksValues[0];
    editColorBlock[1].value = data.colorBlocksValues[1];
    editColorBlock[2].value = data.colorBlocksValues[2];
    editLocation[0].value = data.location;
    editLocation[1].value = data.locationURL;
    editThemeDropBox.value = data.theme;
}

const saveEditedData = document.getElementById('saveEditedData');

saveEditedData.addEventListener('click', () => {
    const profilePic1 = document.getElementById('ProfilePic1').files[0];
    const profilePic2 = document.getElementById('ProfilePic2').files[0];
    const profilePic3 = document.getElementById('ProfilePic3').files[0];

    const ProjectsShots1 = document.getElementById('ProjectsShots1').files[0];
    const ProjectsShots2 = document.getElementById('ProjectsShots2').files[0];
    const ProjectsShots3 = document.getElementById('ProjectsShots3').files[0];
    const ProjectsShots4 = document.getElementById('ProjectsShots4').files[0];

    const resumeFile = document.getElementById('resumeFile').files[0];

    const edits = {
        moto: document.getElementById('motoTextBox').value,
        about: document.getElementById('aboutTextBox').value,
        skills: document.getElementById('skillsTextBox').value.split(', '),
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
        locationURL: document.getElementsByName('editLocation')[1].value,
        theme: document.getElementById('editThemeDropBox').value,
        profilePicsArr: [
            getFileNameIfAvail('profilePics', profilePic1, contentDocSnap.data().profilePicsArr[0]),
            getFileNameIfAvail('profilePics', profilePic2, contentDocSnap.data().profilePicsArr[1]),
            getFileNameIfAvail('profilePics', profilePic3, contentDocSnap.data().profilePicsArr[2])
        ],
        appSnapArr: [
            getFileNameIfAvail('projectsShots', ProjectsShots1, contentDocSnap.data().appSnapArr[0]),
            getFileNameIfAvail('projectsShots', ProjectsShots2, contentDocSnap.data().appSnapArr[1]),
            getFileNameIfAvail('projectsShots', ProjectsShots3, contentDocSnap.data().appSnapArr[2]),
            getFileNameIfAvail('projectsShots', ProjectsShots4, contentDocSnap.data().appSnapArr[3])
        ],
        resumeSelected: getFileNameIfAvail('resume', resumeFile, contentDocSnap.data().resumeSelected)
    };
    saveEdits(edits);
});

function getFileNameIfAvail(location, file, oldFileName) {
    if (file) {
        saveFile(location, file);
        deleteOldFile(oldFileName);
        return '/' + location + '/' + file.name;
    } else {
        return oldFileName;
    }
}

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

    const contentDocSnapNew = await new getDoc(contentDoc);
    showData(contentDocSnapNew.data());
};

function saveFile(location, file) {
    const storageRef = ref(storage, '/' + location + '/' + file.name);

    // 'file' comes from the Blob or File API
    uploadBytes(storageRef, file).then((snapshot) => {
        console.log('Uploaded a blob or file!');
    });
}
function deleteOldFile(oldFileName) {
    const oldFileRef = ref(storage, oldFileName);
    deleteObject(oldFileRef).then(() => {
        console.log('old file deleted');
    }).catch((error) => {
        console.log('old file delete error');
    });
}