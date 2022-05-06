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

/* Popping up add to cart button */

const addToCart = [...document.querySelectorAll('.addToCart')];
const wholeProduct = document.querySelectorAll('.product');

wholeProduct.forEach((product, button) => {
  product.addEventListener('mouseenter', () => {
    product.classList.add('active');
    button = product.previousElementSibling;
    button.classList.add('active');
  });
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
  button.addEventListener('mouseleave', () => {
    button.classList.remove('active');
    product = button.nextElementSibling;
    product.classList.remove('active');
  });
  button.addEventListener('mouseenter', () => {
    button.classList.add('active');
  });
  button.addEventListener('mouseleave', () => {
    button.classList.remove('active');
  });
});

/* Adding the actual product to the cart list */

/* -***- Product Class -***- */

class Product {
  constructor(id, name, quantity, price) {
    this.id = id;
    this.name = name;
    this.quantity = quantity;
    this.price = price;
  }
}

const cartItemsContainer = document.querySelector('.shoppingCartProducts');

addToCart.forEach((button) => {
  button.addEventListener('click', () => {
    let itemsInCart = [
      ...document.querySelectorAll('.shoppingCartSingleProduct'),
    ];
    const idInCart = itemsInCart.map((item) => item.id);

    let product = button.nextElementSibling;
    let productName = product.childNodes[3].innerText;
    let productPrice = product.childNodes[5].innerText;
    let productId = product.id;

    let actualQuantity = document.createElement('span');
    actualQuantity.classList.add('quantityOfProduct');
    actualQuantity.innerText = 1;

    /* Each new product used in constructor */

    let product1 = new Product(
      productId,
      productName,
      actualQuantity,
      productPrice
    );

    let singleProduct = document.createElement('div');
    singleProduct.classList.add('shoppingCartSingleProduct');

    let cartNames = document.createElement('div');
    cartNames.classList.add('shoppingCartNames');

    let cartQuantity = document.createElement('div');
    cartQuantity.classList.add('shoppingCartQuantity');

    let cartPrices = document.createElement('div');
    cartPrices.classList.add('shoppingCartPrices');

    const cartTrash = document.createElement('div');
    const trashIcon = document.createElement('i');
    cartTrash.classList.add('shoppingCartTrash');
    trashIcon.classList.add('ri-delete-bin-6-line');

    let arrowDecreaseDiv = document.createElement('div');
    arrowDecreaseDiv.classList.add('arrowContainer');
    arrowDecreaseDiv.classList.add('decrease');

    let quantityArrowDecrease = document.createElement('i');
    quantityArrowDecrease.classList.add('fa-solid');
    quantityArrowDecrease.classList.add('fa-caret-left');

    let arrowIncreaseDiv = document.createElement('div');
    arrowIncreaseDiv.classList.add('arrowContainer');
    arrowIncreaseDiv.classList.add('increase');

    let quantityArrowIncrease = document.createElement('i');
    quantityArrowIncrease.classList.add('fa-solid');
    quantityArrowIncrease.classList.add('fa-caret-right');

    if (!idInCart.includes(product1.id)) {
      /* Creating actual DOM elements with each 'click'() */
      cartItemsContainer.append(singleProduct);

      /* Products Names */
      singleProduct.append(cartNames);

      /* Products Quantities in the Cart */
      singleProduct.append(cartQuantity);

      /* Products Prices */
      singleProduct.append(cartPrices);

      /* Adding trash icon to each product to delete the item */
      cartTrash.append(trashIcon);
      singleProduct.append(cartTrash);

      /* Appending every parameter of the actual product to the cart */
      cartNames.append(product1.name);
      cartQuantity.append(actualQuantity);
      cartPrices.append(product1.price);
      singleProduct.setAttribute('id', product1.id);

      /* Quantity Arrows [ DECREASE ] **************** */
      cartQuantity.insertBefore(arrowDecreaseDiv, actualQuantity);
      arrowDecreaseDiv.append(quantityArrowDecrease);

      /* Quantity Arrows [ INCREASE ] **************** */
      cartQuantity.append(arrowIncreaseDiv);
      arrowIncreaseDiv.append(quantityArrowIncrease);

      /* Deleting Products from cart using trash icons */

      checkIfEmpty();

      cartTrash.addEventListener('click', () => {
        let fullProduct = cartTrash.parentElement;
        fullProduct.remove(fullProduct);
        updateCartTotal();
        addTextIfEmpty();

        button.innerText = 'Add to cart';
        button.style.backgroundColor = 'var(--bg-color)';
        button.style.cursor = 'pointer';
        button.style.color = 'var(--font-color)';

        console.log(`Deleted ${productName}`);
      });

      /* Incrementing the quantity of an item --- */

      arrowIncreaseDiv.addEventListener('click', () => {
        actualQuantity.innerText++;
        updateCartTotal();
      });

      arrowDecreaseDiv.addEventListener('click', () => {
        if (actualQuantity.innerText > 1) {
          actualQuantity.innerText--;
          updateCartTotal();
        } else {
          return;
        }
      });

      updateCartTotal();
    } else {
      console.log('This item is already added :) ');
    }

    /* Changing the button text when adding the item --- */

    button.innerText = 'Added to cart';
    button.style.backgroundColor = 'var(--primary-color-active)';
    button.style.cursor = 'default';
    button.style.color = 'whitesmoke';

    /* Clear Cart Button   */

    const clearButton = document.querySelector('.clearButton');

    clearButton.addEventListener('click', () => {
      let totalSumValue = document.querySelector('.dynamicValue');

      removeAllChildNodes(cartItemsContainer);
      console.log('Cleared the shopping Cart');

      cartItemsContainer.append(emptyCartText);
      emptyCartText.style.display = 'block';
      totalSumValue.innerText = '$0';

      button.innerText = 'Add to cart';
      button.style.backgroundColor = 'var(--bg-color)';
      button.style.cursor = 'pointer';
      button.style.color = 'var(--font-color)';
    });
  });
});

/* Clear Cart Button FUNCTION  */

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

/* Check If Empty Cart() ******* */
const emptyCartText = document.querySelector('.emptyCartText');

function checkIfEmpty() {
  if (cartItemsContainer.children.length > 1) {
    emptyCartText.style.display = 'none';
    cartItemsContainer.style.overflowY = 'scroll';
  }
}

function addTextIfEmpty() {
  if (cartItemsContainer.children.length <= 1) {
    emptyCartText.style.display = 'block';
    cartItemsContainer.style.overflowY = 'hidden';
  }
}

/* Home Page ******************** */

const homeButton = document.querySelector('.home');

homeButton.addEventListener('click', () => {
  shoppingCartContainer.classList.remove('active');
  profileButton.classList.remove('active');
  favouriteButton.classList.remove('active');

  // gridParent.classList.remove('hidden');
  // pageFooter.classList.remove('hidden');
});

/*  Cart Container Page ****************** */

const gridParent = document.querySelector('.gridParent');

const shoppingCartButton = document.querySelector('.cart');

const shoppingCartContainer = document.querySelector('.shoppingCartContainer');

const pageFooter = document.querySelector('#contactInfo');

shoppingCartButton.addEventListener('click', () => {
  shoppingCartContainer.classList.toggle('active');

  // pageFooter.classList.toggle('hidden');
  // gridParent.classList.toggle('hidden');
});

/* Glowing NAV ICONS when their page is displayed --- */
const profileButton = document.querySelector('.profile');
const favouriteButton = document.querySelector('.favourite');

homeButton.addEventListener('click', () => {
  shoppingCartButton.classList.remove('onDisplayCart');
  profileButton.classList.remove('onDisplay');
  favouriteButton.classList.remove('onDisplay');
});

profileButton.addEventListener('click', () => {
  profileButton.classList.toggle('onDisplay');

  shoppingCartContainer.classList.remove('active');

  favouriteButton.classList.remove('onDisplay');
  shoppingCartButton.classList.remove('onDisplayCart');
});

favouriteButton.addEventListener('click', () => {
  favouriteButton.classList.toggle('onDisplay');

  shoppingCartContainer.classList.remove('active');

  profileButton.classList.remove('onDisplay');
  shoppingCartButton.classList.remove('onDisplayCart');
});

shoppingCartButton.addEventListener('click', () => {
  shoppingCartButton.classList.toggle('onDisplayCart');

  profileButton.classList.remove('onDisplay');
  favouriteButton.classList.remove('onDisplay');
});

/* Updating Cart Total Summ ------- */

function updateCartTotal() {
  var cartItemContainer = document.getElementsByClassName(
    'shoppingCartContainer'
  )[0];

  var cartRows = cartItemContainer.getElementsByClassName(
    'shoppingCartSingleProduct'
  );

  var total = 0;
  for (var i = 0; i < cartRows.length; i++) {
    var cartRow = cartRows[i];
    var priceElement = cartRow.getElementsByClassName('shoppingCartPrices')[0];
    var quantityElement =
      cartRow.getElementsByClassName('quantityOfProduct')[0];
    var price = parseFloat(priceElement.innerText.replace('$', ''));
    var quantity = quantityElement.innerText;
    total = total + price * quantity;
  }
  total = Math.round(total * 100) / 100;
  document.getElementsByClassName('dynamicValue')[0].innerText = '$' + total;
}

/* --- End of the updating cart total --- */

/* Little addition to 'seeMoreProductsButton' */
let seeMoreProductsButton = document.querySelector('.seeMore');
let seeMoreProductsDots = document.querySelector('.dots');
seeMoreProductsButton.addEventListener('mouseover', () => {
  seeMoreProductsDots.style.opacity = 1;
});

seeMoreProductsButton.addEventListener('mouseout', () => {
  seeMoreProductsDots.style.opacity = 0;
});
/* ----- */

/* Horizontal Scrolling Function -> Button Onclick */

function sLeft() {
  var left = document.querySelector('.mediaScroller');

  left.scrollBy(-400, 0);
}

function sRight() {
  var right = document.querySelector('.mediaScroller');

  right.scrollBy(400, 0);
}

/* EXPLORE BUTTON SCROLL FUNCTION  */

function exScroll() {
  window.scrollBy(0, 900);
}

/* --- Displaying the ::after element [the number of items in the cart] ---*/

//! Implement this function to the ::after element on the button tmr
// function updateItemsNumber() {

// }
