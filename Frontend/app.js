// show cart

let myArr = ["cow", "milk", "cheese"];

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
    img: "./img/apple1.jpg",
    promotion: 0,
    highlight: 0
  },
  {
    name: "Archer Farms",
    subtitle: "Deluxe roasted mixed nuts",
    brand: "",
    weight: "",
    unit: "",
    price: "25",
    promotionPrice: "",
    extraInfo: "",
    category: "Nuts",
    img: "./img/nuts1.jpg",
    promotion: 0,
    highlight: 0
  },
  {
    name: "Chiquita banana",
    subtitle: "",
    brand: "",
    weight: "",
    unit: "/kg",
    price: "3",
    promotionPrice: "",
    extraInfo: "",
    category: "Produce",
    img: "./img/banana1.jpg",
    promotion: 0,
    highlight: 0
  },
  {
    name: "Cliff Bar",
    subtitle: "Chocolate Chip",
    brand: "Cliff",
    weight: "",
    unit: "",
    price: "6",
    promotionPrice: "",
    extraInfo: "",
    category: "Nutrition",
    img: "./img/cliff1.jpg",
    promotion: 0,
    highlight: 0
  },
  {
    name: "Lay's Classic",
    subtitle: "Family Size",
    brand: "Lay's",
    weight: "",
    unit: "",
    price: "2,5",
    promotionPrice: "",
    extraInfo: "",
    category: "Chips, snacks & cookies",
    img: "./img/lays1.jpg",
    promotion: 0,
    highlight: 0
  },
  {
    name: "Peeled Snacks",
    subtitle: "Organic Dried Mango",
    brand: "Peeled Snacks",
    weight: "",
    unit: "",
    price: "3,79",
    promotionPrice: "",
    extraInfo: "",
    category: "Chips, snacks & cookies",
    img: "./img/peeledmango1.jpg",
    promotion: 0,
    highlight: 0
  },
  {
    name: "Philadelphia",
    subtitle: "Original",
    brand: "Philadelphia",
    weight: "",
    unit: "",
    price: "3,79",
    promotionPrice: "",
    extraInfo: "",
    category: "Dairy",
    img: "./img/philadelphiaOriginal.jpg",
    promotion: 0,
    highlight: 0
  }
];

let myCart = [{}];

//first get all possible categories from backend and store them in an Array
const categories = [];
productsArray.forEach(p => {
  let cat = p.category;
  if (categories.indexOf(cat) < 0) {
    categories.push(cat);
  }
});

//append the categories to the html:
const categoriesHTML = document.querySelector("#categories");
categoriesHTML.innerHTML = categories.map(createCategories).join("");
function createCategories(category) {
  return `<div class="mdl-cell mdl-cell--2-col">
  <button data-filterbtn="${category}" type="button" data-filterswitch="false" class="mdl-chip" id="filterButtons">
    <span data-filterbtn="${category}" class="mdl-chip__text">${category}</span>
  </button></div>
`;
}

/*************************/
/*************************/
/*****Filter Buttons******/
/*************************/
/*************************/
//here we query for buttons instead of adding onclick in html
//so that we can use event.preventDefault();
//this makes sure page doesn't scroll up after each click!
const filterButtons = document.querySelectorAll(
  "#filterButtons",
  ".mdl-chip__text"
);
let activeFilters = [];
filterButtons.forEach(function(btn) {
  btn.addEventListener("click", function(event) {
    //prevent the page from scrolling up to default
    event.preventDefault();

    //if event.target is the .mdl-chip__text: get the parent
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
      btn.classList.add("chipToggle");
      myEvent.dataset.filterswitch = "true";
      activeFilters.push(category);
    } else {
      btn.classList.remove("chipToggle");
      myEvent.dataset.filterswitch = "false";
      let indexOfCategory = activeFilters.indexOf(category);
      activeFilters.splice(indexOfCategory, 1);
    }
    console.log(activeFilters);

    //get all the products in html
    const items = document.querySelectorAll(".product");

    //filter the html based on contents of the activeFilter Array

    items.forEach(item => {
      //if activeFilters contains nothing, show all items!
      if (activeFilters.length <= 0) {
        item.style.display = "flex";
      } else {
        //Standard for loop to make use of the return function!!
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

//generate all the products on the screen
const products = document.querySelector("#products");
//first filter productArray to get products that aren't in promotion:
let noPromotionProducts = productsArray.filter(
  product => product.promotion === 0
);

//now map them into the innerHTML
products.innerHTML = noPromotionProducts.map(createProducts).join("");

function createProducts(product) {
  //notice the product "class" in first div. This is used
  //for querying for filtering purposes
  return `
  <div class="mdl-cell mdl-cell--3-col mdl-cell--12-col-phone mdl-cell--6-col-tablet product ${
    product.category
  }" data-category="${product.category}" data-name="${product.name}">
  <div class="mdl-card mdl-shadow--2dp">
  <div class="mdl-card__title mdl-card--expand">
    <img src=${product.img}>
  </div>
  
  
  
  <div class="mdl-card__supporting-text">
  <h2 class="productTitle mdl-card__title-text">${product.name}</h2>
  <h3 class="brandTitle mdl-card__title-text">${product.subtitle}</h3>
  <br>
  <h4 class="priceTitle mdl-card__title-text">€ ${product.price}</h4>
  <h4 class="unitTitle mdl-card__title-text">${product.unit}</h4>
  <br>
  </div>



  <div class="addProduct mdl-card__actions mdl-card--border mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">
  <i class="material-icons">shopping_cart</i>
  </div>
  </div>
  </div>`;
}

//Adding products to cart
let amount = 0;
function addProductToCart(element) {
  let product = element.getAttribute("data-product");
  console.log(product);

  var index = myCart.findIndex(item => item.product === product);
  console.log(index);
  if (index === -1) {
    amount = 1;
    myCart.push({ product: product, amount: amount });
  } else {
    myCart[index] = { product: product, amount: ++amount };
  }
  let label_input_text = document.getElementById("label_" + product + "_input");
  label_input_text.innerHTML = amount;

  console.log(myCart);
}

function removeProductFromCart(element) {
  let product = element.getAttribute("data-product");
  let index = myCart.findIndex(item => item.product === product);
  if (index >= 0) myCart[index] = { product: product, amount: --amount };
  let label_input_text = document.getElementById("label_" + product + "_input");
  label_input_text.innerHTML = amount;

  console.log(index);
  console.log(myCart);
}
/*
const cart = document.getElementsByClassName(
  "material-icons mdl-badge mdl-badge--overlap"
);
cart[0].setAttribute("data-badge", myArr.length);*/
