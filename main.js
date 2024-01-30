// const navBtn = document.getElementsByClassName('navBtns');
const mainBody = document.getElementById('mainBody');
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
    mainBody.classList.remove('position-fixed');
    burgerOptions.classList.remove('optRightShow');
});

const navDropDownOptsSettings = document.getElementById('navDropDownOptsSettings');
navDropDownOptsSettings.addEventListener('click', () => {
    animateBurger();
    mainBody.classList.add('position-fixed');
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
    themeSelect.classList.remove('hideThemeScreen');
});
themeSelect.addEventListener('click', () => {
    themeSelect.classList.add('hideThemeScreen');
});

// const mainImages = document.getElementsByName('mainImages');
// for (let i = 0; i < mainImages.length; i++) {
//     mainImages[i].style.zIndex = i + 1;
//     mainImages[i].style.right = `${i * 100}%`;
// }

const navDropDownOptsAchievements = document.getElementById('navDropDownOptsAchievements');
const navDropDownOptsCertificates = document.getElementById('navDropDownOptsCertificates');
const animationSlide = document.getElementsByName('animationSlide');
const achievementsSlide = document.getElementsByClassName('burgerMenuSlide')[0];
const certificatesSlide = document.getElementsByClassName('burgerMenuSlide')[1];
const closeSlideMenu = document.getElementsByName('burgerMenuSlideClose');

navDropDownOptsAchievements.addEventListener('click', () => {
    animateBurger();
    mainBody.classList.add('position-fixed');
    animateSlide(achievementsSlide);
    achievements.classList.remove('d-none');
});

navDropDownOptsCertificates.addEventListener('click', () => {
    animateBurger();
    mainBody.classList.add('position-fixed');
    animateSlide(certificatesSlide);
    certificates.classList.remove('d-none');
});

function animateSlide(slideToShow) {
    animationSlide[0].classList.toggle('left-100');
    animationSlide[1].classList.toggle('left-100');
    animationSlide[2].classList.toggle('left-100');
    slideToShow.classList.toggle('left0');
}

closeSlideMenu[0].addEventListener('click', () => {
    mainBody.classList.remove('position-fixed');
    animateSlide(achievementsSlide);
});
closeSlideMenu[1].addEventListener('click', () => {
    mainBody.classList.remove('position-fixed');
    animateSlide(certificatesSlide);
});