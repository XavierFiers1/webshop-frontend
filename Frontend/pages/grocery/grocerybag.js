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
    img: "/Frontend/img/apple1.jpg",
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
    img: "/Frontend/img/nuts1.jpg",
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
    img: "/Frontend/img/banana1.jpg",
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
    img: "/Frontend/img/cliff1.jpg",
    promotion: 0,
    highlight: 0
  },
  {
    name: "Lay's Classic",
    subtitle: "Family Size",
    brand: "Lay's",
    weight: "",
    unit: "",
    price: "2.25",
    promotionPrice: "",
    extraInfo: "",
    category: "Chips, snacks & cookies",
    img: "/Frontend/img/lays1.jpg",
    promotion: 0,
    highlight: 0
  },
  {
    name: "Peeled Snacks",
    subtitle: "Organic Dried Mango",
    brand: "Peeled Snacks",
    weight: "",
    unit: "",
    price: "3.79",
    promotionPrice: "",
    extraInfo: "",
    category: "Chips, snacks & cookies",
    img: "/Frontend/img/peeledmango1.jpg",
    promotion: 0,
    highlight: 0
  },
  {
    name: "Philadelphia",
    subtitle: "Original",
    brand: "Philadelphia",
    weight: "",
    unit: "",
    price: "3.79",
    promotionPrice: "",
    extraInfo: "",
    category: "Dairy",
    img: "/Frontend/img/philadelphiaOriginal.jpg",
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
  cartBuilder();
})();

function cartBuilder() {
  productsArray.forEach(product => {
    if (sessionStorage.getItem(product.name)) {
      let amount = JSON.parse(sessionStorage.getItem(product.name)).amount;

      myCart.push({ product: product, amount: amount });
    }
  });
}

//create the product array based off of cart
(function() {
  pageBuilder();
})();

function pageBuilder() {
  const shoppingListContent = document.querySelector(".shoppingListContent");
  if (myCart.length > 0)
    shoppingListContent.innerHTML = myCart
      .map(createShoppingListProducts)
      .join("");
  else shoppingListContent.innerHTML = "Cart is empty";
}

function updateGrandTotal() {
  const totalHTML = document.querySelector("#totalValue");

  let total = 0;
  myCart.forEach(p => {
    total += parseFloat(p.product.price * p.amount);
  });
  total += 1; //service costs
  totalHTML.innerHTML = total;
}

function createShoppingListProducts(product) {
  //notice the product "class" in first div. This is used
  //for querying for filtering purposes
  return `

      <li class="productListItem mdl-list__item">
        <span class="mdl-list__item-primary-content">
          <div class="shoppingListCart mdl-card mdl-shadow--2dp">
            <div class="shoppingListCardTitle mdl-card__title mdl-card--expand">
              <img class="shoppinglistThumbnails" src="${
                product.product.img
              }" />
              <div class="deleteDiv"onclick="deleteProductFromList(this)" data-product="${
                product.product.name
              }">
              <i class="deleteProductFromList material-icons">delete</i>
              </div>      
              <h2 class="productTitle mdl-card__title-text">${
                product.product.name
              }</h2>
            
             
              <h3 class="mdl-card__title-text"> <span data-info="${
                product.product.name
              }">${product.amount} X €${product.product.price}
               <br />
                Total: €${parseFloat(
                  product.product.price * product.amount
                ).toFixed(2)}</span>
              </h3>
  
              <h3 class="mdl-card__title-text"></h3>
            </div>
  
            <!-- the plus minus buttons -->
            <div
              class="plusMinusButtonsShoppingList mdl-card__actions mdl-card--border"
              data-productname="${product.product.name}"
            >
              <button id="minButton"
                class="plusminButton mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect"
                onclick="removeAnotherProductFromCart(this)"
                data-productname="${product.product.name}"
              >
                <i class="material-icons">remove</i>
              </button>
              <button data-amount="${product.product.name}"
                
                class="productAmount mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect"
                disabled
              >
                ${product.amount}
              </button>
              <button
                class="plusminButton mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect"
                onclick="addAnotherProductToCart(this)"
                data-productname="${product.product.name}"
              >
                <i class="material-icons">add</i>
              </button>
            </div>
          </div>
        </span>
      </li>
  
  
                      
    `;
}
//disable all min buttons that for products that have amount one!
//make sure you can't press the minus button if amount is 1;
//user should be deliberately delete the product by using the
//appropriate icon
disableMinButtonsAmountOne();

function disableMinButtonsAmountOne() {
  const minbuttons = document.querySelectorAll("#minButton");
  minbuttons.forEach(btn => {
    let product = myCart.find(p => p.product.name === btn.dataset.productname);
    if (product.amount === 1) {
      btn.disabled = true;
    }
  });
}

function removeAnotherProductFromCart(event) {
  productname = event.dataset.productname;

  let product = myCart.find(element => element.product.name === productname);
  console.log(product);
  product.amount--;
  //now check if button product hasn't amount 1:
  disableMinButtonsAmountOne();

  updateProductAmountHtml(productname, product.amount, product.product.price);
  //also update the storage
  //create a new product to match the original session storage key value pairs
  product = { product: product.product.name, amount: product.amount };
  saveToStorage(productname, JSON.stringify(product));
  updateGrandTotal();
}

function updateProductAmountHtml(productname, amount, price) {
  //to be able to use queryselectorAll with string literals:
  //only option is working with a data attribute and
  //querying on the specific productname

  //update the info
  let infoHTML = document.querySelector(
    `[data-info=${CSS.escape(productname)}]`
  );
  price = parseFloat(price).toFixed(2);
  infoHTML.innerHTML = `${amount} X €${price}
    <br />
     Total: €${parseFloat(price * amount).toFixed(2)}`;

  //update the amount between plusminus buttons

  let amountHTML = document.querySelector(
    `[data-amount=${CSS.escape(productname)}]`
  );

  amountHTML.innerHTML = amount;
}

function saveToStorage(key, value) {
  sessionStorage.setItem(key, value);
}

function addAnotherProductToCart(event) {
  let productname = event.dataset.productname;
  let product = myCart.find(element => element.product.name === productname);

  //enable the min button if amount was 1
  if (product.amount === 1) {
    const minbuttons = document.querySelectorAll("#minButton");
    minbuttons.forEach(btn => {
      if (btn.dataset.productname === productname) {
        btn.disabled = false;
      }
    });
  }
  product.amount++;
  //update the amount html
  updateProductAmountHtml(productname, product.amount, product.product.price);
  //also update the storage//create a new product to match the original session storage key value pairs
  product = { product: product.product.name, amount: product.amount };
  saveToStorage(productname, JSON.stringify(product));
  updateGrandTotal();
}

//update cart icon in the header
updateCartIcon();

//update cart icon in header //only when all resources are loaded!:
function updateCartIcon() {
  document.addEventListener("readystatechange", event => {
    if (event.target.readyState === "interactive") {
    } else if (event.target.readyState === "complete") {
      const cart = document.getElementById("cartButton");
      cart.setAttribute("data-badge", myCart.length);
    } else {
      const cart = document.getElementById("cartButton");
      cart.setAttribute("data-badge", myCart.length);
    }
  });
}

function deleteProductFromList(event) {
  let productname = event.dataset.product;

  //remove product from sessionstorage:
  sessionStorage.removeItem(productname);
  //empty the cart
  myCart = [];
  //then rebuild the cart based on new sessionstorage
  cartBuilder();

  updateCartIcon();
  //rebuild the page
  pageBuilder();
}
updateGrandTotal();
