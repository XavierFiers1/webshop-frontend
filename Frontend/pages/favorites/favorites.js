/*let productsArray = [
  {
    name: "Pink Lady Apples",
    subtitle: "",
    brand: "Pink Lady",
    weight: "",
    unit: "/kg",
    price: "3",
    promotionPrice: "",
    extraInfo: "",
    category: "Produce",
    img: "../../img/apple1.jpg",
    promotion: 0,
    liked: 0
  }]*/

let myCart = [];
let requestProducts = new XMLHttpRequest();
// Open a new connection, using the GET request on the URL endpoint
let productsArray = [];
let data = [];
let favorites = [];
let storage = [];
let names = [];
const favoriteHTML = document.querySelector("#favorites");
requestProducts.open("GET", "http://localhost:57269/api/GetAllProducts", true);

requestProducts.onload = function() {
  // Begin accessing JSON data here
  if (requestProducts.status >= 200 && requestProducts.status < 400) {
    data = JSON.parse(this.response);

    productsArray = data.map(p => ({
      name: p.ProductName,
      subtitle: p.ProductDescription,
      weight: p.ProductWeight,
      unit: p.ProductUnit,
      price: p.ProductPrice,
      promotionPrice: p.DiscountPrice,
      category: p.ProductCategory[0].CategoryName,
      img: p.ImgPath,
      promotion: p.IsFeatured
    }));

    getFavoritesFromStorage();
    buildFavorites();
    buttonClickEvents();
    //cartBuilder();
    updateCartIcon();
  } else {
    prompt("something went wrong, sorry for the inconvenience");
  }
};
requestProducts.send();

//cartbuilder
function cartBuilder() {
  productsArray.forEach(product => {
    if (localStorage.getItem(product.name)) {
      let amount = JSON.parse(localStorage.getItem(product.name)).amount;

      myCart.push({ product });
    }
  });
  console.log(myCart);
}

/******************************/
/*******************************/
/*****Generate Favorites HTML*****/
/******************************/
/*****************************/

function getFavoritesFromStorage() {
  storage = JSON.parse(localStorage.getItem("liked"));
  if (storage === null) storage = [];

  productsArray.forEach(p => {
    if (storage.findIndex(fav => fav === p.name) >= 0) {
      //favorites is used to map the products
      favorites.push(p);
      //names is used to write to local storage
      names.push(p.name);
    }
  });
}

function createFavorites(product) {
  if (product.promotion === true) {
    productClass = "";
  }

  return `
      <div
      class="mdl-cell mdl-cell--2-col mdl-cell--12-col-phone mdl-cell--6-col-tablet product ${
        product.category
      }"
      data-category="${product.category}"
      data-name="${product.name}"
    >
      <div class="mdl-card mdl-shadow--2dp">
        <div class="mdl-card__title mdl-card--expand">
          <img src="${product.img}" />
          <i class="material-icons heartIconUntouched" data-toggle="false" data-productname="${
            product.name
          }">favorite</i>
        </div>
    
        <div class="mdl-card__supporting-text">
          <h2 class="productTitle mdl-card__title-text">${product.name}</h2>
          <h3 class="brandTitle mdl-card__title-text">${product.subtitle}</h3>
          <br />
          <h4 class="priceTitle  mdl-card__title-text">DKK ${product.price}</h4>
          
          <h4 class="unitTitle mdl-card__title-text">${product.unit}</h4>
          <br />
        </div>
    
        <div
          data-productname="${product.name}"
          class="cartButton mdl-card__actions mdl-card--border mdl-button mdl-js-button mdl-button--raised"
        >
          <i class="material-icons">shopping_cart</i>
        </div>
        <!-- the plus minus buttons that are hidden by default -->
        <div class="plusMinusButtons mdl-card__actions mdl-card--border" data-productname="${
          product.name
        }">
          <button
            class="plusminButton mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect"
            onclick="removeAnotherProductFromCart(this)" data-productname="${
              product.name
            }">
            <i class="material-icons">remove</i>
          </button>
          <button id="productAmount${product.name}"
            class="productAmount mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect"
            disabled
          >
            1
          </button>
          <button
            class="plusminButton mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect"
            onclick="addAnotherProductToCart(this)" data-productname="${
              product.name
            }">
            <i class="material-icons">add</i>
          </button>
        </div>
      
      </div>
      
      <!-- Code needed to show snackbar at bottom of screen -->
      <div id="theToast" class="mdl-js-snackbar mdl-snackbar">
        <div class="mdl-snackbar__text"></div>
        <button class="mdl-snackbar__action" type="button"></button>
      </div>
      
    </div>
                        
      `;
}

/*///////////////////////////////////
  Add clickevents and hover to all product heart buttons:
  ///////////////////////////////////*/

function heartEventListeners() {
  const heartUntouchedIcons = document.querySelectorAll(".heartIconUntouched");

  heartUntouchedIcons.forEach(function(heart) {
    //fill in hearts where needed according to local storage liked heart
    heart.addEventListener("mouseover", function(event) {
      heart.innerHTML = "favorite_border";
    });
    heart.addEventListener("mouseout", mouseOutfunc);
    heart.addEventListener("click", function(event) {
      let index = favorites.findIndex(
        f => f.name === event.target.dataset.productname
      );
      favorites.splice(index, 1);
      names = [];
      favorites.forEach(f => names.push(f.name));
      localStorage.setItem("liked", JSON.stringify(names));
      buildFavorites();
    });

    //in order to use the removeEventListener, I had to create
    //a custom function to be used as callback
    function mouseOutfunc() {
      heart.innerHTML = "favorite";
    }
  });
}

function buildFavorites() {
  if (favorites.length > 0)
    favoriteHTML.innerHTML = favorites.map(createFavorites).join("");
  else favoriteHTML.innerHTML = "Add some products to your watchlist";
  heartEventListeners();
}

/*///////////////////////////////////
  Add clickevents to all product buttons:
  ///////////////////////////////////*/
/*///////////////////////////////////
  Also, if there are some items in storage, show the right buttons accordingly!
  ///////////////////////////////////*/
function buttonClickEvents() {
  let amount = 0;
  let plusminusDivs = document.querySelectorAll(".plusMinusButtons");
  let addProductButtons = document.querySelectorAll(".cartButton");

  addProductButtons.forEach(function(btn) {
    //for every cart button on a product, if the session already has a product like this, hide this cartbutton and show the plusminusbutton instead
    if (localStorage.getItem(btn.dataset.productname)) {
      //hide this button
      btn.style.display = "none";

      //show the plus minus buttons for this product
      plusminusDivs.forEach(entry => {
        if (entry.dataset.productname === btn.dataset.productname) {
          entry.style.display = "flex";
          //ofcourse, also update this divs innerhtml amount section
          let productFromStorage = localStorage.getItem(
            btn.dataset.productname
          );
          let productAmount = JSON.parse(productFromStorage).amount;

          updateProductAmountHtml(btn.dataset.productname, productAmount);
          //also add this item to the cart with amount from storage:
          addProductToCart(btn.dataset.productname, productAmount);
        }
      });
    }

    //register the clickevent for each button
    btn.addEventListener("click", function(event) {
      let productName = event.target.dataset.productname;
      //OnClick: Hide this button
      btn.style.display = "none";

      /////snackbar logic///////
      ("use strict");
      let snackbarContainer = document.querySelector("#theToast");
      var data = { message: "Added " + productName + " to grocery Bag!" };
      snackbarContainer.MaterialSnackbar.showSnackbar(data);
      //////////////////////////

      //get the specific plus min buttons for this product and show them
      plusminusDivs.forEach(div => {
        if (div.dataset.productname === productName) {
          div.style.display = "flex";
        }
      });

      ///////cart logic////////
      //this product isn't added throug session storage so
      //the second attribute has to be set 0;
      addProductToCart(productName, 0);
    });
  });
}

//this function will execute if there was no product of this type in the cart
//the cart button will change into plus minus buttons
function addProductToCart(productname, amountFromStorage) {
  let index = myCart.findIndex(item => item.product === productname);
  let amount = 0;

  if (index === -1 && amountFromStorage === 0) {
    amount = 1;
    myCart.push({ product: productname, amount: amount });
    //save this to sessionstorage
    let product = myCart.find(element => element.product === productname);
    saveToStorage(productname, JSON.stringify(product));
  }
  //check if the given parameter productAmount is greater than 0, this means we
  //get the value from session storage
  //set the exact amount in cart
  else if (amountFromStorage > 0) {
    myCart.push({ product: productname, amount: amountFromStorage });
    amount = amountFromStorage;
  }
  //else, the functions add and remove product use this method and you'll just want to update the
  //amount by 1
  else {
    myCart[index] = { product: productname, amount: ++amount };
    //save this to sessionstorage
    let product = myCart.find(element => element.product === productname);
    saveToStorage(productname, JSON.stringify(product));
  }

  /////update cart icon in the header with new items added
  updateCartIconShared();
  //update the html of the productAmount shown
  updateProductAmountHtml(productname, amount);
}

//if there already was a first product in cart, this function will be launched (clicking the plus button)
function addAnotherProductToCart(event) {
  let productname = event.dataset.productname;
  let product = myCart.find(element => element.product === productname);
  product.amount++;
  //update the amount html
  updateProductAmountHtml(productname, product.amount);
  //also update the storage
  saveToStorage(productname, JSON.stringify(product));
}

function removeAnotherProductFromCart(event) {
  productname = event.dataset.productname;

  let product = myCart.find(element => element.product === productname);

  product.amount--;
  if (product.amount === 0) {
    //remove this product from the myCart Array!

    let index = myCart.findIndex(element => {
      return element.product === productname;
    });

    myCart.splice(index, 1);

    //also update cartIcon
    updateCartIconShared();

    //find specific div for this product and hide it
    let plusminusDivs = document.querySelectorAll(".plusMinusButtons");
    plusminusDivs.forEach(div => {
      if (div.dataset.productname === productname) {
        div.style.display = "none";
      }
    });

    //find the specific cartbutton div for this product and show it
    let cartButtonDiv = document.querySelectorAll(".cartButton");
    cartButtonDiv.forEach(div => {
      if (div.dataset.productname === productname) {
        div.style.display = "inline-block";
      }
    });
  }
  updateProductAmountHtml(productname, product.amount);
  //also update the storage
  saveToStorage(productname, JSON.stringify(product));
}

function saveToStorage(key, value) {
  //fist get the amount from the product to store
  let amount = JSON.parse(value).amount;

  //if the amount is 0, delete this key value pair from storage cause there is no need for it anymore
  if (amount === 0) {
    localStorage.removeItem(key);
  } else localStorage.setItem(key, value);
}

function updateCartIcon() {
  const cart = document.getElementById("cartButton");
  cart.setAttribute("data-badge", myCart.length);
}

function updateProductAmountHtml(productname, amount) {
  let amountHTML = document.getElementById("productAmount" + productname);
  amountHTML.innerHTML = amount;
}
//coming from app.js
//////cart functionality
updateCartIconShared();
