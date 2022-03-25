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

/* Clicking the x clears the input field completely */
const clearInput = document.querySelector('.fa-xmark');
const inputField = document.querySelector('.input');

clearInput.addEventListener('click', () => {
  inputField.value = '';
  inputField.focus();
});

/* Popping up add to cart button */

const addToCart = document.querySelectorAll('.addToCart');
const wholeProduct = document.querySelectorAll('.product');

wholeProduct.forEach((product, button) => {
  product.addEventListener('mouseenter', () => {
    product.classList.add('active');
    button = product.previousElementSibling;
    button.classList.add('active');
  });
});

wholeProduct.forEach((product, button) => {
  product.addEventListener('mouseleave', () => {
    product.classList.remove('active');
    button = product.previousElementSibling;
    button.classList.remove('active');
  });
});

addToCart.forEach((button, product) => {
  button.addEventListener('mouseenter', () => {
    button.classList.add('active');
    product = button.nextElementSibling;
    product.classList.add('active');
  });
});

addToCart.forEach((button, product) => {
  button.addEventListener('mouseleave', () => {
    button.classList.remove('active');
    product = button.nextElementSibling;
    product.classList.remove('active');
  });
});

addToCart.forEach((button) => {
  button.addEventListener('mouseenter', () => {
    button.classList.add('active');
  });
});

addToCart.forEach((button) => {
  button.addEventListener('mouseleave', () => {
    button.classList.remove('active');
  });
});
