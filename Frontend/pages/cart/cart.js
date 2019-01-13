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
    img: "/Frontend/img/apple1.jpg",
    promotion: 0,
    highlight: 0
  }
];*/
let TOTALVALUE = document.querySelector("#totalValue");
let userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
let myCart = [];
let grandTotal = 0;

let requestProducts = new XMLHttpRequest();
// Open a new connection, using the GET request on the URL endpoint
let productsArray = [];
let data = [];
let localProducts = [];
requestProducts.open("GET", "http://localhost:57269/api/GetAllProducts", true);

requestProducts.onload = function() {
  // Begin accessing JSON data here
  if (requestProducts.status >= 200 && requestProducts.status < 400) {
    data = JSON.parse(this.response);

    data.forEach(p => {
      localProducts.push({ name: p.ProductName, id: p.ProductID });
    });
    localStorage.setItem("products", JSON.stringify(localProducts));
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
    //fill the cart array from content from localStorage:
    cartBuilder();
    //create the product array based off of cart
    pageBuilder();
    updateGrandTotal();
  } else {
    prompt("something went wrong, sorry for the inconvenience");
  }
};
requestProducts.send();

/******************************/
/*******************************/
/*****Shopping List before checkout*****/
/******************************/
/*****************************/

function cartBuilder() {
  productsArray.forEach(product => {
    if (localStorage.getItem(product.name)) {
      let amount = JSON.parse(localStorage.getItem(product.name)).amount;

      myCart.push({ product: product, amount: amount });
    }
  });
}

function pageBuilder() {
  const shoppingListContent = document.querySelector(".shoppingListContent");
  const checkoutInfoHTML = document.querySelector(".totalCalculation");
  const removeWhenEmptyCartHTML = document.querySelector(
    ".removeWhenEmptyCart"
  );
  if (myCart.length > 0)
    shoppingListContent.innerHTML = myCart
      .map(createShoppingListProducts)
      .join("");
  else {
    document.querySelector(".shoppingList").innerHTML = buildEmptyCartPage();
    checkoutInfoHTML.innerHTML = "";
    //remove this element to remove the white background
    removeWhenEmptyCartHTML.parentNode.removeChild(removeWhenEmptyCartHTML);
  }

  //after the page has been built, disable the min buttons on the products that have amount 1
  disableMinButtonsAmountOne();
}

function updateGrandTotal() {
  let total = 0;
  myCart.forEach(p => {
    total += parseFloat(p.product.price * p.amount);
  });
  total += 10; //service costs
  total = parseFloat(total).toFixed(2);
  grandTotal = total;
  TOTALVALUE.innerHTML = total;
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
              <div class="deleteDiv"onclick="deleteProductFromList(this);updateCartIcon()" data-product="${
                product.product.name
              }">
              <i class="deleteProductFromList material-icons">delete</i>
              </div>      
              <h2 class="productTitle mdl-card__title-text">${
                product.product.name
              }</h2>
            
             
              <h3 class="mdl-card__title-text"> <span data-info="${
                product.product.name
              }">${product.amount} X DKK ${product.product.price}
               <br />
                Total: DKK ${parseFloat(
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
    if (product.amount <= 1) {
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
  //create a new product to match the original local storage key value pairs
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
  infoHTML.innerHTML = `${amount} X DKK ${price}
    <br />
     Total: DKK ${parseFloat(price * amount).toFixed(2)}`;

  //update the amount between plusminus buttons

  let amountHTML = document.querySelector(
    `[data-amount=${CSS.escape(productname)}]`
  );

  amountHTML.innerHTML = amount;
}

function saveToStorage(key, value) {
  localStorage.setItem(key, value);
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

//update cart icon in header //only when all resources are loaded!:
function updateCartIcon() {
  const cart = document.getElementById("cartButton");
  cart.setAttribute("data-badge", myCart.length);
}

function deleteProductFromList(event) {
  let productname = event.dataset.product;

  //remove product from sessionstorage:
  localStorage.removeItem(productname);
  //empty the cart
  myCart = [];
  //then rebuild the cart based on new sessionstorage
  cartBuilder();

  //rebuild the page
  pageBuilder();
}

///restrict date to today
(function() {
  const datepicker = document.querySelector(".datePicker");

  let date = new Date();
  let month = 0;
  if (date.getUTCMonth() + 1 <= 9) month = "0" + (date.getUTCMonth() + 1);
  let min =
    date.getFullYear() + "-" + month + "-" + date.getDate().toLocaleString();

  datepicker.setAttribute("min", min);
})();

document.addEventListener("readystatechange", event => {
  if (event.target.readyState === "interactive") {
  } else if (event.target.readyState === "complete") {
    updateCartIcon();
  }
});
/*document
  .querySelector(".datePicker")
  .addEventListener("onchange", function(event) {
    console.log(event.target.value);
    //console.log(document.querySelector(".datePicker").value);
  });*/

function handleDateChange(event) {
  document.querySelector(".checkoutButton").disabled = false;
}

function handleCheckout() {
  let date = document.querySelector(".datePicker").value;
  let time = document.querySelector(".timePicker").value;

  if (userInfo === null) {
    alert("Please log in or create an account before making an order");
  } else {
    postOrder();
    //clear the local storage
    productsArray.forEach(p => {
      if (localStorage.getItem(p.name)) {
        localStorage.removeItem(p.name);
      }
    });
    //clear cart and update carticon
    myCart = [];
    updateCartIcon();
    document.querySelector(".shoppingList").innerHTML = buildCheckoutPage(
      date,
      time
    );
  }
}
function postOrder() {
  let date = document.querySelector(".datePicker").value;
  let time = document.querySelector(".timePicker").value;

  let orderData = {
    TotalValue: grandTotal,
    PickUp: time + ":00",
    PickUpDate: date,
    FK_UserID: userInfo[0].UserID
  };
  let productsIDs = [];
  productsArray.forEach(product => {
    if (localStorage.getItem(product.name)) {
      for (let i = 0; i < localProducts.length; i++) {
        const lp = localProducts[i];
        if (lp.name == product.name) {
          productsIDs.push(lp.id);
        }
      }
    }
  });

  let json = JSON.stringify(orderData);
  const request = new XMLHttpRequest();
  request.open("POST", `http://localhost:57269/api/AASC_ORDER`, true);
  request.setRequestHeader("Content-Type", "application/json");
  request.onload = function() {
    if (request.status >= 200 && request.status < 400) {
      if (request.readyState === request.DONE) {
        let OrderResponse = JSON.parse(request.response);
        updateHasList(OrderResponse.OrderID, productsIDs);
      }
    } else {
    }
  };
  request.send(json);
}

function updateHasList(oID, pIDs) {
  pIDs.forEach(i => {
    let data = {
      FK_OrderID: oID,
      FK_ProductID: i
    };
    let json = JSON.stringify(data);
    const request = new XMLHttpRequest();
    request.open("POST", `http://localhost:57269/api/AASC_HAS_LIST`, true);
    request.setRequestHeader("Content-Type", "application/json");
    request.onload = function() {
      if (request.status >= 200 && request.status < 400) {
        if (request.readyState === request.DONE) {
          console.log("Item with ID " + i + " posted");
        }
      } else {
      }
    };
    request.send(json);
  });
}

function buildCheckoutPage(date, time) {
  return `<div class="onCheckout">
  <h2>Thank you for shopping with us</h2>
  <h4>Your grocery bag will be ready for pickup on</h4>
  <h4 id="showDate">${date} at ${time}</h4>
  <p>At the pickup facilities at the entrance of Bilka</p>
  <p>Bilka's Address: Hobrovej 450, 9200 Aalborg SV</p>
  <br />
  <p>
    To make your pickup even more relaxing you can book a table at one of
    our participating restaurants 
  </p>
  <div class="mdl-grid crossroad">
  <div
    class="mdl-cell mdl-cell--5-col mdl-cell--10-col-phone mdl-cell--10-col-tablet hvr-grow"
    onclick="window.location = '/Frontend/pages/booktable/booktable.html'"
  >
    <div
      id="booking"
      class="card-image mdl-card mdl-shadow--2dp valign-center"
    >
      <h1 class="align-center">
        Book a table <br />
        <img
          src="/Frontend/img/AaStorcenter.svg"
          alt="Aalborg Storcenter"
        />
      </h1>
    </div>
  </div>
  </div>
</div>`;
}

function buildEmptyCartPage() {
  return `<div class="mdl-grid crossroad">
  <p>Add some items to your grocery list</p>
  <div
    class="mdl-cell mdl-cell--12-col mdl-cell--10-col-phone mdl-cell--10-col-tablet hvr-grow"
    onclick="window.location = '/Frontend/pages/products/products.html'"
  >
    <div
      id="grocery"
      class="card-image mdl-card mdl-shadow--2dp valign-center"
    >
      <h1 class="align-center">
        Shop groceries <br />
        <img src="/Frontend/img/bilkalogo.png" alt="bilka" />
      </h1>
    </div>
  </div>
  </div>`;
}
