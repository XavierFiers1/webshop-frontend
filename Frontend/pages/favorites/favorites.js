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
    img: "../../img/nuts1.jpg",
    promotion: 0,
    liked: 0
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
    img: "../../img/banana1.jpg",
    promotion: 0,
    liked: 0
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
    img: "../../img/cliff1.jpg",
    promotion: 0,
    liked: 0
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
    img: "../../img/lays1.jpg",
    promotion: 0,
    liked: 0
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
    img: "../../img/peeledmango1.jpg",
    promotion: 0,
    liked: 0
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
    img: "../../img/philadelphiaOriginal.jpg",
    promotion: 0,
    liked: 0
  },
  {
    name: "Test5",
    subtitle: "",
    brand: "",
    weight: "",
    unit: "/kg",
    price: "3",
    promotionPrice: "",
    extraInfo: "",
    category: "Produce",
    img: "../../img/banana1.jpg",
    promotion: 1,
    liked: 0
  },
  {
    name: "Test4",
    subtitle: "Chocolate Chip",
    brand: "Cliff",
    weight: "",
    unit: "",
    price: "6",
    promotionPrice: "",
    extraInfo: "",
    category: "Nutrition",
    img: "../../img/cliff1.jpg",
    promotion: 1,
    liked: 0
  },
  {
    name: "Test3",
    subtitle: "Family Size",
    brand: "Lay's",
    weight: "",
    unit: "",
    price: "2.5",
    promotionPrice: "1.5",
    extraInfo: "",
    category: "Chips, snacks & cookies",
    img: "../../img/lays1.jpg",
    promotion: 1,
    liked: 0
  },
  {
    name: "Test2",
    subtitle: "Organic Dried Mango",
    brand: "Peeled Snacks",
    weight: "",
    unit: "",
    price: "3.79",
    promotionPrice: "",
    extraInfo: "",
    category: "Chips, snacks & cookies",
    img: "../../img/peeledmango1.jpg",
    promotion: 1,
    liked: 0
  },
  {
    name: "Test1",
    subtitle: "Original",
    brand: "Philadelphia",
    weight: "",
    unit: "",
    price: "3.79",
    promotionPrice: "",
    extraInfo: "",
    category: "Dairy",
    img: "../../img/philadelphiaOriginal.jpg",
    promotion: 1,
    liked: 0
  },
  {
    name: "Test6",
    subtitle: "Original",
    brand: "Philadelphia",
    weight: "",
    unit: "",
    price: "3.79",
    promotionPrice: "",
    extraInfo: "",
    category: "Dairy",
    img: "../../img/philadelphiaOriginal.jpg",
    promotion: 1,
    liked: 0
  },
  {
    name: "Test7",
    subtitle: "Original",
    brand: "Philadelphia",
    weight: "",
    unit: "",
    price: "3.79",
    promotionPrice: "3",
    extraInfo: "",
    category: "Dairy",
    img: "../../img/philadelphiaOriginal.jpg",
    promotion: 1,
    liked: 0
  }
];

/******************************/
/*******************************/
/*****Generate Favorites HTML*****/
/******************************/
/*****************************/
let favorites = [];
const favoriteHTML = document.querySelector("#favorites");
(function() {
  productsArray.forEach(p => {
    if (localStorage.getItem(p.name)) {
      let product = productsArray.find(pr => pr.name === p.name);
      favorites.push(product);
    }
  });
})();

buildFavorites();

function createFavorites(product) {
  let strikeThroughClass = "";
  if (product.promotion === 1) {
    productClass = "";
    strikeThroughClass = "strikeThrough";
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
          }">favorite_border</i>
        </div>
    
        <div class="mdl-card__supporting-text">
          <h2 class="productTitle mdl-card__title-text">${product.name}</h2>
          <h3 class="brandTitle mdl-card__title-text">${product.subtitle}</h3>
          <br />
          <h4 class="priceTitle ${strikeThroughClass} mdl-card__title-text">€ ${
    product.price
  }</h4>
          <h4 class="priceTitle mdl-card__title-text">&nbsp € ${
            product.promotionPrice
          }</h4>
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

    if (localStorage.getItem(heart.dataset.productname)) {
      heart.innerHTML = "favorite";
    }

    heart.addEventListener("mouseout", mouseOutfunc);
    heart.addEventListener("click", function(event) {
      if (heart.innerHTML !== "favorite") {
        localStorage.setItem(event.target.dataset.productname, "liked");
        this.removeEventListener("mouseout", mouseOutfunc);
        heart.innerHTML = "favorite";
      } else {
        this.addEventListener("mouseout", mouseOutfunc);
        localStorage.removeItem(event.target.dataset.productname);
        let index = favorites.findIndex(
          f => f.name === event.target.dataset.productname
        );
        favorites.splice(index, 1);
        buildFavorites();
      }
    });
    //in order to use the removeEventListener, I had to create
    //a custom function to be used as callback
    function mouseOutfunc() {
      heart.innerHTML = "favorite_border";
    }
  });
}

function buildFavorites() {
  if (favorites.length > 0)
    favoriteHTML.innerHTML = favorites.map(createFavorites).join("");
  else favoriteHTML.innerHTML = "Add some favorite products to your watchlist";
  heartEventListeners();
}
