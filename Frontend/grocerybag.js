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

let myCart = [];

/******************************/
/*******************************/
/*****Shopping List before checkout*****/
/******************************/
/*****************************/

//fill the cart array from content from sessionstorage:
(function() {
  productsArray.forEach(product => {
    if (sessionStorage.getItem(product.name)) {
      myCart.push(product);
    }
  });
})();

//create the product array based off of cart
(function() {
  const shoppingListContent = document.querySelector(".shoppingListContent");
  shoppingListContent.innerHTML = myCart
    .map(createShoppingListProducts)
    .join("");
})();

function createShoppingListProducts(product) {
  //notice the product "class" in first div. This is used
  //for querying for filtering purposes
  return `

      <li class="productListItem mdl-list__item">
        <span class="mdl-list__item-primary-content">
          <div class="shoppingListCart mdl-card mdl-shadow--2dp">
            <div class="shoppingListCardTitle mdl-card__title mdl-card--expand">
              <img class="shoppinglistThumbnails" src="${product.img}" />
              <h2 class="productTitle mdl-card__title-text">${product.name}</h2>
              <i class="deleteProductFromList material-icons">delete</i>
              <h3 class="mdl-card__title-text">
                €${product.price} <br />
                ${product.price}
              </h3>
  
              <h3 class="mdl-card__title-text"></h3>
            </div>
  
            <!-- the plus minus buttons that are hidden by default -->
            <div
              class="plusMinusButtonsShoppingList mdl-card__actions mdl-card--border"
              data-productname="${product.name}"
            >
              <button
                class="plusminButton mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect"
                onclick="removeAnotherProductFromCart(this)"
                data-productname="${product.name}"
              >
                <i class="material-icons">remove</i>
              </button>
              <button
                id="productAmount${product.name}"
                class="productAmount mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect"
                disabled
              >
                1
              </button>
              <button
                class="plusminButton mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect"
                onclick="addAnotherProductToCart(this)"
                data-productname="${product.name}"
              >
                <i class="material-icons">add</i>
              </button>
            </div>
          </div>
        </span>
      </li>
  
  
                      
    `;
}
