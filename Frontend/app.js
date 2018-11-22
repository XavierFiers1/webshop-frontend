// show cart

let myArr = ["cow", "milk", "cheese"];

let productsArray = [
  {
    name: "Candy",
    brand: "",
    weight: "1l",
    price: "25",
    promotionPrice: "",
    extraInfo: "",
    category: "Sweets",
    img: "./img/Milk1.jpg",
    promotion: 0,
    highlight: 0
  },
  {
    name: "Broccoli",
    brand: "Leerdammer",
    weight: "",
    price: "50",
    promotionPrice: "",
    extraInfo: "",
    category: "Produce",
    img: "./img/cheese.jpg",
    promotion: 0,
    highlight: 0
  },
  {
    name: "Cheese",
    brand: "Leerdammer",
    weight: "",
    price: "50",
    promotionPrice: "",
    extraInfo: "",
    category: "Produce",
    img: "./img/cheese.jpg",
    promotion: 0,
    highlight: 0
  },
  {
    name: "Cheese",
    brand: "Leerdammer",
    weight: "",
    price: "50",
    promotionPrice: "",
    extraInfo: "",
    category: "Dairy",
    img: "./img/cheese.jpg",
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
  <span class="mdl-chip__text">${category}</span>
  </button></div>
`;
}
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
    //get the exact category
    const category = event.target.dataset.filterbtn;

    //check if button isn't active already!
    //make use of true or false strings, no bools
    let filterswitch = event.target.dataset.filterswitch;
    if (filterswitch === "false") {
      btn.classList.add("chipToggle");
      event.target.dataset.filterswitch = "true";
      activeFilters.push(category);
    } else {
      btn.classList.remove("chipToggle");
      event.target.dataset.filterswitch = "false";
      let indexOfCategory = activeFilters.indexOf(category);
      activeFilters.splice(indexOfCategory, 1);
    }
    console.log(activeFilters);

    //prevent the page from scrolling up to default
    event.preventDefault();

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
          if (item.classList.contains(activeFilters[i])) {
            item.style.display = "flex";
            return;
          } else item.style.display = "none";
        }
      }
    });
  });
});

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
  <div class="mdl-cell mdl-cell--4-col product ${product.category}">
  <div class="demo-card-square mdl-card mdl-shadow--2dp">
  <div class="mdl-card__title mdl-card--expand">
    <h2 class="mdl-card__title-text">${product.name}</h2>
    
  </div>
  <div class="mdl-card__supporting-text">
  <img src=${product.img} >
  </div>
  <div class="mdl-card__actions mdl-card--border mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">
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
