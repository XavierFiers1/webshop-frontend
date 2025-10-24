/*
let productsArray = [
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
  }
];*/

let myCart = [];
let favorites = [];
let isMobile = false;
const PROMOTIONS = document.querySelector("#promotions");
const LOADER = document.createElement("div");
LOADER.setAttribute(
  "class",
  "m-auto mdl-spinner mdl-spinner--single-color mdl-js-spinner is-active"
);
LOADER.style = "left: 50%";
function detectmobile() {
  if (window.innerWidth <= 800) {
    isMobile = true;
  } else {
    return false;
  }
}
detectmobile();

/*************************/
/*************************/
/*****Get All The Products!!******/
/*************************/
/*************************/

let requestProducts = new XMLHttpRequest();
// Open a new connection, using the GET request on the URL endpoint
let productsArray = [];
let data = [];
const categories = [];
requestProducts.open("GET", "http://localhost:57269/api/GetAllProducts", true);
requestProducts.onloadstart = function() {
  PROMOTIONS.appendChild(LOADER);
};
requestProducts.onload = function() {
  // Begin accessing JSON data here
  if (requestProducts.status >= 200 && requestProducts.status < 400) {
    data = JSON.parse(this.response);

    productsArray = data.map(p => ({
      productID: p.ProductID,
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

    //first get all possible categories from backend and store them in an Array
    productsArray.forEach(p => {
      let cat = p.category;
      if (categories.indexOf(cat) < 0) {
        categories.push(cat);
      }
    });

    //append the categories to the html:
    const categoriesHTML = document.querySelector("#categories");
    categoriesHTML.innerHTML = categories.map(createCategories).join("");

    //build the products
    //generate all the products on the screen
    const products = document.querySelector("#products");
    //first filter productArray to get products that aren't in promotion:
    let noPromotionProducts = productsArray.filter(
      product => product.promotion === false
    );

    //now map them into the innerHTML
    products.innerHTML = noPromotionProducts.map(createProducts).join("");

    //build promotion products
    if (isMobile) {
      buildpromotionForMobile();
    } else buildPromotionsForDesktop();
    //create all the clickevents;
    heartsClickEvents();
    buttonClickEvents();
    filterButtonEvents();
  } else {
    alert("something went wrong, sorry for the inconvenience");
  }
};
requestProducts.send();

//display category chips
function createCategories(category) {
  return `<div class="mdl-cell mdl-cell--2-col">
<button data-filterbtn="${category}" type="button" data-filterswitch="false" class="mdl-chip" id="filterButtons">
  <span data-filterbtn="${category}" class="mdl-chip__text">${category}</span>
</button></div>
`;
}

//here we query for the category buttons instead of adding onclick in html
//so that we can use event.preventDefault();
//this makes sure page doesn't scroll up after each click!
//also query for the "button" text specifically, so we can manipulate it
function filterButtonEvents() {
  const filterButtons = document.querySelectorAll(
    "#filterButtons",
    ".mdl-chip__text"
  );
  let activeFilters = [];
  filterButtons.forEach(function(btn) {
    btn.addEventListener("click", function(event) {
      //prevent the page from scrolling up to default
      event.preventDefault();

      //if event.target is the .mdl-chip__text: get the parent node
      //because otherwise the button toggle functions don't work
      //so if user selects the span text instead, change the event as if the button was clicked
      let myEvent = event.target;
      if (event.target.classList.contains("mdl-chip__text")) {
        myEvent = event.target.parentNode;
      }

      //get the exact category
      const category = myEvent.dataset.filterbtn;

      //check if button isn't active already!
      //make use of true or false strings, no bools
      let filterswitch = myEvent.dataset.filterswitch;
      if (filterswitch === "false") {
        //chiptoggle is a custom class in css that changes background to lighter green
        btn.classList.add("chipToggle");
        myEvent.dataset.filterswitch = "true";
        activeFilters.push(category);
      } else {
        btn.classList.remove("chipToggle");
        myEvent.dataset.filterswitch = "false";
        let indexOfCategory = activeFilters.indexOf(category);
        activeFilters.splice(indexOfCategory, 1);
      }

      //get all the products in html
      const items = document.querySelectorAll(".product");

      //Filtering because of this clickevent:
      //filter the html based on contents of the activeFilter Array
      items.forEach(item => {
        //if activeFilters contains nothing, show all items!
        if (activeFilters.length <= 0) {
          item.style.display = "flex";
        } else {
          //Standard for loop to make use of the return function!!
          //Because if there is a hit, there is no use to loop further
          //Or style.display gets overruled again.
          for (i = 0; i < activeFilters.length; i++) {
            if (item.dataset.category === activeFilters[i]) {
              item.style.display = "flex";
              return;
            } else item.style.display = "none";
          }
        }
      });
    });
  });
}

/*************************/
/*************************/
/*****Search Function*****/
/*************************/
/*************************/
(function() {
  const searchbar = document.getElementById("productSearch");

  searchbar.addEventListener("keyup", function() {
    let value = searchbar.value.toLowerCase().trim();

    //get all the items:
    const items = document.querySelectorAll(".product");

    items.forEach(function(item) {
      let category = item.dataset.category.toLowerCase().trim();
      let itemName = item.dataset.name.toLowerCase().trim();
      //include as in: if the letter is present in the category
      //search on category or itemname
      if (category.includes(value) || itemName.includes(value)) {
        item.style.display = "flex";
      } else {
        item.style.display = "none";
      }
    });
  });
})();

/******************************/
/*******************************/
/*****Generate promotion HTML*****/
/******************************/
/*****************************/
let promotionColumnCode = 0;
function buildPromotionsForDesktop() {
  const promotionProductsHTML = document.querySelector(".promotion");
  //first filter productArray to get promotion products:
  let promotionProducts = productsArray.filter(
    product => product.promotion === true
  );
  //custom function to split an array into 2 dim array
  function chunkArrayInGroups(arr, size) {
    let myArray = [];
    for (var i = 0; i < arr.length; i += size) {
      myArray.push(arr.slice(i, i + size));
    }
    return myArray;
  }

  //get the promotionArray and slice it in a two dim array with 4 columns
  let promotionPerFour = chunkArrayInGroups(promotionProducts, 4);

  let promotionIndex = 0;
  //get the length of the amount of products in the array in order to
  //we will use promotionColumnCode to check how many elements that particular array chunk has
  //grid class should be adapted to this number
  promotionColumnCode = promotionPerFour[promotionIndex].length;

  //add ALL the products to the innerhtml
  promotionProductsHTML.innerHTML = promotionProducts
    .map(createProducts)
    .join("");
  //now display = "none" ALL those products
  const promotionObjectsHTML = document.querySelectorAll(".isPromotion");
  promotionObjectsHTML.forEach(pr => (pr.style.display = "none"));

  //set display to flex on first elements of the first array dim
  for (let i = 0; i < promotionPerFour[promotionIndex].length; i++) {
    promotionObjectsHTML[i].style.display = "flex";
  }

  ///if 2 dim array only consist of 1 row, don't even generate the arrows!
  if (promotionPerFour.length === 1) {
    const arrows = document.querySelectorAll(".arrowIcons");
    arrows.forEach(a => (a.style.display = "none"));
  }

  ////////////BackArrow
  let backArrow = document.querySelector("#backArrow");
  backArrow.addEventListener("click", function(event) {
    //again, set ALL products display to none
    promotionObjectsHTML.forEach(pr => (pr.style.display = "none"));
    let size = promotionPerFour.length;
    let index = 0;
    promotionIndex--;

    if (promotionIndex < 0) {
      index = ((promotionIndex % size) + size) % size;
    } else index = promotionIndex % size;

    promotionColumnCode = promotionPerFour[index].length;

    let code = 1;
    switch (promotionColumnCode) {
      case 0:
        break;
      case 1:
        code = 12;
        break;
      case 2:
        code = 6;
        break;
      case 3:
        code = 4;
        break;
      case 4:
        code = 3;
        break;
    }

    for (let i = 0; i < promotionPerFour[index].length; i++) {
      let j = index * 4 + i;
      promotionObjectsHTML[j].style.display = "flex";
      //first remove ALL the possible classes
      promotionObjectsHTML[j].classList.remove(
        "mdl-cell--3-col",
        "mdl-cell--6-col",
        "mdl-cell--12-col"
      );
      //then add the particular class thanks to the promotioncolumncode
      promotionObjectsHTML[j].classList.add("mdl-cell--" + code + "-col");
    }
  });

  ////////////FrontArrow
  let frontArrow = document.querySelector("#frontArrow");
  frontArrow.addEventListener("click", function(event) {
    promotionObjectsHTML.forEach(pr => (pr.style.display = "none"));
    let size = promotionPerFour.length;
    let index = 0;
    promotionIndex++;

    if (promotionIndex < 0) {
      index = ((promotionIndex % size) + size) % size;
    } else index = promotionIndex % size;

    promotionColumnCode = promotionPerFour[index].length;

    let code = 1;
    switch (promotionColumnCode) {
      case 0:
        break;
      case 1:
        code = 12;
        break;
      case 2:
        code = 6;
        break;
      case 3:
        code = 4;
        break;
      case 4:
        code = 3;
        break;
    }

    for (let i = 0; i < promotionPerFour[index].length; i++) {
      let j = index * 4 + i;
      promotionObjectsHTML[j].style.display = "flex";
      promotionObjectsHTML[j].classList.remove(
        "mdl-cell--3-col",
        "mdl-cell--6-col",
        "mdl-cell--12-col"
      );
      promotionObjectsHTML[j].classList.add("mdl-cell--" + code + "-col");
    }
  });
}
function buildpromotionForMobile() {
  const promotionProductsHTML = document.querySelector(".promotion");
  //first filter productArray to get promotion products:
  let promotionProducts = productsArray.filter(
    product => product.promotion === true
  );

  let promotionIndex = 0;
  //get the length of the amount of products in the array in order to
  //we will use promotionColumnCode to check how many elements that particular array chunk has
  //grid class should be adapted to this number

  //add ALL the products to the innerhtml
  promotionProductsHTML.innerHTML = promotionProducts
    .map(createProducts)
    .join("");
  //now display = "none" ALL those products
  const promotionObjectsHTML = document.querySelectorAll(".isPromotion");
  promotionObjectsHTML.forEach(pr => (pr.style.display = "none"));

  //set display to flex on promotionIndex elements of the first array dim

  promotionObjectsHTML[promotionIndex].style.display = "flex";

  ////////////BackArrow
  let backArrow = document.querySelector("#backArrow");
  backArrow.addEventListener("click", function(event) {
    //again, set ALL products display to none
    promotionObjectsHTML.forEach(pr => (pr.style.display = "none"));
    let size = promotionObjectsHTML.length;
    let index = 0;
    promotionIndex--;

    if (promotionIndex < 0) {
      index = ((promotionIndex % size) + size) % size;
    } else index = promotionIndex % size;

    promotionObjectsHTML[index].style.display = "flex";
    //first remove ALL the possible classes
    promotionObjectsHTML[index].classList.remove(
      "mdl-cell--3-col",
      "mdl-cell--6-col",
      "mdl-cell--12-col",
      "mdl-cell--12-col-phone",
      "mdl-cell--6-col-tablet"
    );
    //then add the particular class thanks to the promotioncolumncode
    promotionObjectsHTML[index].classList.add("mdl-cell--12-col-phone");
  });

  ////////////FrontArrow
  let frontArrow = document.querySelector("#frontArrow");
  frontArrow.addEventListener("click", function(event) {
    promotionObjectsHTML.forEach(pr => (pr.style.display = "none"));
    let size = promotionObjectsHTML.length;
    let index = 0;
    promotionIndex++;

    if (promotionIndex < 0) {
      index = ((promotionIndex % size) + size) % size;
    } else index = promotionIndex % size;

    promotionObjectsHTML[index].style.display = "flex";
    promotionObjectsHTML[index].classList.remove(
      "mdl-cell--3-col",
      "mdl-cell--6-col",
      "mdl-cell--12-col",
      "mdl-cell--12-col-phone",
      "mdl-cell--6-col-tablet"
    );
    promotionObjectsHTML[index].classList.add("mdl-cell--12-col-phone");
  });
}

/******************************/
/*******************************/
/*****Generate products HTML*****/
/******************************/
/*****************************/

function createProducts(product) {
  let productClass = "product";
  let strikeThroughClass = "";
  let promotionPriceMarkup = "";
  let productUnit = product.unit;
  let isPromotion = "";

  if (productUnit !== "") {
    productUnit = "/" + productUnit;
  }

  //first let's check if we're working with a promotion product:
  //if not, then we don't add the "product" class to the first div
  //this way the search function doesn't target the promotion products array
  if (product.promotion === true) {
    productClass = "";
    strikeThroughClass = "strikeThrough";
    promotionPriceMarkup = "DKK " + product.promotionPrice;
    isPromotion = "isPromotion";
  }

  //notice the product "class" in first div. This is used
  //for querying for filtering purposes
  return `
    <div
    class="mdl-cell mdl-cell--3-col mdl-cell--12-col-phone mdl-cell--6-col-tablet ${isPromotion} ${productClass} ${
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
        }">favorite_border</i>
      </div>
  
      <div class="mdl-card__supporting-text">
        <h2 class="productTitle mdl-card__title-text">${product.name}</h2>
        <h3 class="brandTitle mdl-card__title-text">${product.subtitle}</h3>
        <br />
        <h4 class="priceTitle ${strikeThroughClass} mdl-card__title-text">DKK ${
    product.price
  }</h4>
        <h4 class="priceTitle mdl-card__title-text">&nbsp  ${promotionPriceMarkup}</h4>
        <h4 class="unitTitle mdl-card__title-text">${productUnit}</h4>
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
          onclick="removeAnotherProductFromCart(this);updateCartIcon()"  data-productname="${
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

function heartsClickEvents() {
  const heartUntouchedIcons = document.querySelectorAll(".heartIconUntouched");

  //get all the hearts from storage
  let storage = JSON.parse(localStorage.getItem("liked"));

  if (storage === null) storage = [];
  favorites = storage;
  let storageProduct = "";
  heartUntouchedIcons.forEach(function(heart) {
    storageProduct = favorites.find(p => p === heart.dataset.productname);

    //fill in hearts where needed according to local storage liked heart

    if (favorites.findIndex(p => p === storageProduct) >= 0)
      heart.innerHTML = "favorite";

    heart.addEventListener("click", function(event) {
      let productname = event.target.dataset.productname;

      if (favorites.findIndex(p => p === productname) < 0) {
        favorites.push(event.target.dataset.productname);

        localStorage.setItem("liked", JSON.stringify(favorites));
        heart.innerHTML = "favorite";
        this.addEventListener("mouseover", mouseOver);
        this.addEventListener("mouseout", mouseOut);
      } else {
        //remove the item from the favorites array, then store this again in localstorage
        let index = favorites.findIndex(p => p === productname);

        favorites.splice(index, 1);

        localStorage.setItem("liked", JSON.stringify(favorites));

        this.removeEventListener("mouseover", mouseOver);
        this.removeEventListener("mouseout", mouseOut);
        heart.innerHTML = "favorite_border";
      }
    });
    function mouseOver() {
      heart.innerHTML = "remove";
    }
    function mouseOut() {
      heart.innerHTML = "favorite";
    }
  });
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
  let data = "";

  //first "virtually click buttons based off of localstorage"
  addProductButtons.forEach(function(btn) {
    //for every cart button on a product, if the local storage already has a product like this, hide this cartbutton and show the plusminusbutton instead
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
      let myEvent = event.target;
      if (event.target.classList.contains("material-icons")) {
        myEvent = event.target.parentNode;
      }

      let productName = myEvent.dataset.productname;

      //OnClick: Hide this button
      btn.style.display = "none";

      /////snackbar logic///////
      ("use strict");
      let snackbarContainer = document.querySelector("#theToast");
      data = { message: "Added " + productName + " to grocery Bag!" };
      // snackbarContainer.MaterialSnackbar.showSnackbar(data);
      //////////////////////////

      //get the specific plus min buttons for this product and show them
      plusminusDivs.forEach(div => {
        if (div.dataset.productname === productName) {
          div.style.display = "flex";
        }
      });

      ///////cart logic////////
      //this product isn't added throug local storage so
      //the second attribute has to be set 0;
      addProductToCart(productName, 0);
      updateCartIcon();
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

//after everything is set in place, also updateCartIcon

document.addEventListener("readystatechange", event => {
  if (event.target.readyState === "interactive") {
  } else if (event.target.readyState === "complete") {
    updateCartIcon();
  }
});
