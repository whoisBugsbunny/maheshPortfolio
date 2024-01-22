// const navBtn = document.getElementsByClassName('navBtns');
const navBurger = document.getElementById('navburger');
const navbarBlock = document.getElementById('navbarBlock');
const burgerLine = document.getElementsByClassName('burgerline');

// const containBox = document.getElementsByClassName('containbox');

function animateBurger() {
    navbarBlock.classList.toggle('nav-grow');
    // animation to burger lines go to X
    burgerLine[0].classList.toggle('burgerlineX1');
    burgerLine[1].classList.toggle('burgerlineX2');
    burgerLine[2].classList.toggle('burgerlineX3');
}
navBurger.addEventListener('click', () => {
    animateBurger();
});

const closeOptionRight = document.getElementById('closeOptionRight');
const burgerOptions = document.getElementById('burgerOptions');
closeOptionRight.addEventListener('click', () => {
    burgerOptions.classList.remove('optRightShow');
});

const navDropDownOptsSettings = document.getElementById('navDropDownOptsSettings');
navDropDownOptsSettings.addEventListener('click', () => {
    animateBurger();
    burgerOptions.classList.add('optRightShow');
});

const loginScreen = document.getElementById('loginScreen');
const closeLogin = document.getElementById('closeLogin');

closeLogin.addEventListener('click', () => {
    loginScreen.classList.add('d-none');
});

const navDropDownOptsThemes = document.getElementById('navDropDownOptsThemes');
const themeSelect = document.getElementById('themeSelect');

navDropDownOptsThemes.addEventListener('click', () => {
    animateBurger();
    themeSelect.classList.remove('d-none');
});
themeSelect.addEventListener('click', () => {
    themeSelect.classList.add('d-none');
});