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

const addToCart = [...document.querySelectorAll('.addToCart')];
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

/* Adding the actual product to the cart list */

const cartItemsContainer = document.querySelector('.shoppingCartProducts');

addToCart.forEach((button) => {
  button.addEventListener('click', () => {
    /* Variables of elements of a product */
    let product = button.nextElementSibling;
    let productName = product.childNodes[3].innerText;
    let productPrice = product.childNodes[5].innerText;
    let productTrash = document.querySelector('.fa-trash');

    let linebreak = document.createElement('br');

    /* Creating actual DOM elements with each 'click'() */
    let product1 = new Product(productName, 1, productPrice, productTrash);

    let cartNames = document.createElement('div');
    cartNames.classList.add('shoppingCartNames');
    cartItemsContainer.append(cartNames);

    let cartQuantity = document.createElement('div');
    cartQuantity.classList.add('shoppingCartQuantity');
    cartItemsContainer.append(cartQuantity);

    let cartPrices = document.createElement('div');
    cartPrices.classList.add('shoppingCartPrices');
    cartItemsContainer.append(cartPrices);

    let cartTrash = document.createElement('div');
    cartTrash.classList.add('shoppingCartTrash');
    cartItemsContainer.append(cartTrash);

    cartNames.append(product1.name);
    cartQuantity.append(1);
    cartPrices.append(product1.price);
    cartTrash.append('remove');
    cartItemsContainer.append(linebreak);
  });
});

/* -***- Product Class -***- */

class Product {
  constructor(name, quantity, price, trash) {
    this.name = name;
    this.quantity = quantity;
    this.price = price;
    this.trash = trash;
  }
}

/*  Cart Container Page ****************** */

const gridParent = document.querySelector('.gridParent');

const shoppingCartButton = document.querySelector('.cart');

const shoppingCartContainer = document.querySelector('.shoppingCartContainer');

shoppingCartButton.addEventListener('click', () => {
  shoppingCartContainer.classList.toggle('active');
});

/* Home Page ******************** */
const homeButton = document.querySelector('.home');

homeButton.addEventListener('click', () => {
  shoppingCartContainer.classList.remove('active');
});
