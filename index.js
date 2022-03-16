/* Popping up Hamburger Menu */
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.navMenu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
});

document.querySelectorAll('.navLink').forEach((n) =>
  n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
  })
);

/* White color hover effect on hamburger menu */
const bar = document.querySelectorAll('.bar');

hamburger.addEventListener('mouseover', () => {
  bar.forEach((n) => (n.style.backgroundColor = 'white'));
});

hamburger.addEventListener('mouseleave', () => {
  bar.forEach((n) => (n.style.backgroundColor = 'black'));
});

/* Clicking the x clears the input field completely */
const clearInput = document.querySelector('.fa-xmark');
const inputField = document.querySelector('.input');

clearInput.addEventListener('click', () => {
  inputField.value = '';
  inputField.focus();
});

