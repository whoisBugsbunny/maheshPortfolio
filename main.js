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