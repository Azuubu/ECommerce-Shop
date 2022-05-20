/* Popping up Hamburger Menu */
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.navMenu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
});

document.querySelectorAll('#navLink').forEach((n) =>
  n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
  })
);

/* Popping up add to cart button */

const addToCart = [...document.querySelectorAll('.addToCart')];
const wholeProduct = document.querySelectorAll('.product');
const addToFav = [...document.querySelectorAll('.addToFav')];

wholeProduct.forEach((product, button, fav) => {
  product.addEventListener('mouseenter', () => {
    product.classList.add('active');
    button = product.previousElementSibling;
    button.classList.add('active');

    fav = button.previousElementSibling;
    fav.classList.add('active');
  });

  product.addEventListener('mouseleave', () => {
    product.classList.remove('active');
    button = product.previousElementSibling;
    button.classList.remove('active');
    fav.classList.remove('active');
  });
});

addToCart.forEach((button, product, fav) => {
  button.addEventListener('mouseenter', () => {
    button.classList.add('active');
    product = button.nextElementSibling;
    product.classList.add('active');

    fav = button.previousElementSibling;
    fav.classList.add('active');
  });
  button.addEventListener('mouseleave', () => {
    button.classList.remove('active');
    product = button.nextElementSibling;
    product.classList.remove('active');

    fav.classList.remove('active');
  });
});

addToFav.forEach((fav, button, product) => {
  fav.addEventListener('mouseenter', () => {
    fav.classList.add('active');

    button = fav.nextElementSibling;
    button.classList.add('active');

    product = button.nextElementSibling;
    product.classList.add('active');
  });

  fav.addEventListener('mouseleave', () => {
    fav.classList.remove('active');

    button = fav.nextElementSibling;
    button.classList.remove('active');

    product = button.nextElementSibling;
    product.classList.remove('active');
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

// let itemsInCart = JSON.parse(localStorage.getItem('ShoppingCart'));
let itemsInCart = [];

addToCart.forEach((button) => {
  button.addEventListener('click', (e) => {
    itemsInCart = [...document.querySelectorAll('.shoppingCartSingleProduct')];

    const idInCart = itemsInCart.map((item) => item.id);

    let product = e.target.nextElementSibling;
    let productName = product.querySelector('.productName').innerText;
    let productPrice = product.querySelector('.productPrice').innerText;
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

    if (!idInCart.includes(productId)) {
      cartItemsContainer.append(singleProduct);

      singleProduct.append(cartNames);

      singleProduct.append(cartQuantity);

      singleProduct.append(cartPrices);

      cartTrash.append(trashIcon);
      singleProduct.append(cartTrash);

      /* Appending every parameter of the actual product to the cart */
      cartNames.append(product1.name);
      cartQuantity.append(actualQuantity);
      cartPrices.append(product1.price);
      singleProduct.setAttribute('id', productId);

      /* Quantity Arrows [ DECREASE ] **************** */
      cartQuantity.insertBefore(arrowDecreaseDiv, actualQuantity);
      arrowDecreaseDiv.append(quantityArrowDecrease);

      /* Quantity Arrows [ INCREASE ] **************** */
      cartQuantity.append(arrowIncreaseDiv);
      arrowIncreaseDiv.append(quantityArrowIncrease);

      /* Deleting Products from cart using trash icons */

      updateCartTotal();
    } else {
      console.log('This item is already added :) ');
    }

    checkBagCount();
    checkIfEmpty();

    cartTrash.addEventListener('click', () => {
      let fullProduct = cartTrash.parentElement;
      fullProduct.remove(fullProduct);

      updateCartTotal();
      addTextIfEmpty();
      checkBagCount();

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

    //   updateCartTotal();
    // } else {
    //   console.log('This item is already added :) ');
    // }

    /* Changing the button text when adding the item --- */

    button.innerText = 'In the cart';
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

/* Adding Items to the Wishlist */

addToFav.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    btn.style.cursor = 'default';

    let productName =
      e.target.parentElement.nextElementSibling.nextElementSibling.querySelector(
        '.productName'
      ).innerText;

    let productPrice =
      e.target.parentElement.nextElementSibling.nextElementSibling.querySelector(
        '.productPrice'
      ).innerText;

    let favProductImg =
      e.target.parentElement.nextElementSibling.nextElementSibling
        .querySelector('img')
        .cloneNode();

    let favItemId =
      e.target.parentElement.nextElementSibling.nextElementSibling.id;

    let wishSpanName = document.createElement('span');
    let wishSpanPrice = document.createElement('span');
    wishSpanPrice.classList.add('wishPrice');
    wishSpanName.classList.add('wishName');

    /* Filling the heart after adding to fav */
    e.target.remove();
    let newIcon = document.createElement('i');
    newIcon.classList.add('ri-heart-fill');
    btn.append(newIcon);

    // let iconDiv = document.createElement('div');
    // iconDiv.classList.add('iconDiv');

    let newIconInList = document.createElement('i');
    newIconInList.classList.add('ri-heart-fill');
    newIconInList.classList.add('removeFavItem');
    // iconDiv.append(newIconInList);

    let wishListRow = document.createElement('div');
    wishListRow.classList.add('wishListRow');
    wishListRow.setAttribute('id', favItemId);

    let favProductsList = document.querySelector('.productsList');
    let favItems = [...document.querySelectorAll('.wishListRow')];

    const idInFav = favItems.map((item) => item.id);

    if (!idInFav.includes(wishListRow.id)) {
      wishSpanName.append(productName);
      wishSpanPrice.append(productPrice);

      // wishListRow.append(iconDiv);
      wishListRow.append(newIconInList);

      wishListRow.append(favProductImg);
      wishListRow.append(wishSpanName);
      wishListRow.append(wishSpanPrice);
      favProductsList.append(wishListRow);
    } else console.log(`It's already added to your wishlist`);

    newIconInList.addEventListener('click', (e) => {
      e.target.parentElement.remove();

      let changedIcon = btn.children[0];
      changedIcon.classList.replace('ri-heart-fill', 'ri-heart-line');

      checkFavCount();

      btn.style.cursor = 'pointer';
    });

    checkFavCount();
  });
});

/* Check fav list count ****** */

function checkFavCount() {
  let productCount = document.querySelector('.productCount');
  let pluralSuffix = document.querySelector('.products');
  let favProductsList = document.querySelector('.productsList');

  productCount.innerText = favProductsList.children.length * 1;

  if (productCount.innerText == 1) {
    pluralSuffix.innerText = 'Product';
  } else if (productCount.innerText == 0) {
    productCount.innerText = 'No';
    pluralSuffix.innerText = 'Products';
  } else {
    pluralSuffix.innerText = 'Products';
  }
}

/* Check bag count */

function checkBagCount() {
  let productCount = document.querySelector('.productBagCount');
  let pluralSuffix = document.querySelector('.productsBag');
  let bagProductsList = document.querySelector('.shoppingCartProducts');

  productCount.innerText = bagProductsList.children.length * 1 - 1;

  if (productCount.innerText == 1) {
    pluralSuffix.innerText = 'Product';
  } else if (productCount.innerText == 0) {
    productCount.innerText = 'No';
    pluralSuffix.innerText = 'Products';
  } else {
    pluralSuffix.innerText = 'Products';
  }
}

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
  favouritesList.classList.remove('active');
  profileMenu.classList.add('hidden');
});

/*  Cart Container Page ****************** */

const gridParent = document.querySelector('.gridParent');

const shoppingCartButton = document.querySelector('.cart');

const shoppingCartContainer = document.querySelector('.shoppingCartContainer');

const pageFooter = document.querySelector('#contactInfo');

shoppingCartButton.addEventListener('click', () => {
  shoppingCartContainer.classList.toggle('active');
});

/* Glowing NAV ICONS when their page is displayed --- */

const profileButton = document.querySelector('.profile');

const favouritesButton = document.querySelector('.favourites');
const favouritesList = document.querySelector('.favouritesList');

homeButton.addEventListener('click', () => {
  shoppingCartButton.classList.remove('onDisplay');
  profileButton.classList.remove('onDisplay');
  favouritesButton.classList.remove('onDisplay');
});

profileButton.addEventListener('click', () => {
  profileButton.classList.toggle('onDisplay');

  shoppingCartContainer.classList.remove('active');

  shoppingCartButton.classList.remove('onDisplay');

  favouritesButton.classList.remove('onDisplay');
  favouritesList.classList.remove('active');
});

shoppingCartButton.addEventListener('click', () => {
  shoppingCartButton.classList.toggle('onDisplay');

  profileButton.classList.remove('onDisplay');

  profileMenu.classList.add('hidden');

  favouritesButton.classList.remove('onDisplay');
  favouritesList.classList.remove('active');
});

favouritesButton.addEventListener('click', () => {
  favouritesButton.classList.toggle('onDisplay');
  favouritesList.classList.toggle('active');

  profileButton.classList.remove('onDisplay');
  profileMenu.classList.add('hidden');

  shoppingCartButton.classList.remove('onDisplay');
  shoppingCartContainer.classList.remove('active');
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

/* PROFILE MENU */
let profileMenu = document.querySelector('.wrapper');

profileButton.addEventListener('click', () => {
  profileMenu.classList.toggle('hidden');
});

const loginText = document.querySelector('.title-text .login');
const loginForm = document.querySelector('form.login');
const loginBtn = document.querySelector('label.login');
const signupBtn = document.querySelector('label.signup');
const signupLink = document.querySelector('form .signup-link a');
signupBtn.onclick = () => {
  loginForm.style.marginLeft = '-50%';
  loginText.style.marginLeft = '-50%';
};
loginBtn.onclick = () => {
  loginForm.style.marginLeft = '0%';
  loginText.style.marginLeft = '0%';
};
signupLink.onclick = () => {
  signupBtn.click();
  return false;
};

/* Return Arrows */

let returnArrowCart = document.querySelector('.arrowCart');
returnArrowCart.addEventListener('click', () => {
  shoppingCartButton.classList.remove('onDisplay');

  shoppingCartContainer.classList.remove('active');
});

let returnArrowUser = document.querySelector('.arrowUser');
returnArrowUser.addEventListener('click', () => {
  profileButton.classList.remove('onDisplay');

  profileMenu.classList.add('hidden');
});

let returnArrowFav = document.querySelector('.arrowFav');
returnArrowFav.addEventListener('click', () => {
  favouritesButton.classList.remove('onDisplay');
  favouritesList.classList.remove('active');
});
