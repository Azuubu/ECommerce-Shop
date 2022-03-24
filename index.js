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

const wholeProduct = document.querySelectorAll('.wholeProduct');

wholeProduct.forEach((n) =>
  n.addEventListener('mouseenter', () => {
    addToCart.forEach((n) => n.classList.toggle('active'));
    wholeProduct.forEach((n) => (n.style.opacity = '0.6'));
    addToCart.forEach((n) => (n.style.opacity = '1'));
  })
);

wholeProduct.forEach((n) =>
  n.addEventListener('mouseleave', () => {
    addToCart.forEach((n) => n.classList.toggle('active'));
    wholeProduct.forEach((n) => (n.style.opacity = '1'));
    addToCart.forEach((n) => (n.style.opacity = '0'));
  })
);

// Renders products to the DOM

const productsEl = document.querySelector('.items');

function renderProducts() {
  products.forEach((product) => {
    productsEl.innerHTML += `
    <li class="wholeProduct">
          <button class="addToCart">
            <i class="fa-solid fa-cart-plus"></i>ADD TO CART
          </button>
          <div class="product one">
            <img src="${product.imgSrc}" alt="product 1" />
            <div class="productName">${product.name}</div>
            <div class="productPrice">$ ${product.price}</div>
          </div>
        </li>
    `;
  });
}

renderProducts();

// Adding to cart

const cart = [];

function addItem(id) {
  const item = products.find((product) => product.id === id);
}
