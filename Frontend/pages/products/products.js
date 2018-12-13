// show cart
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
    promotionPrice: "3",
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
    promotionPrice: "3",
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
    promotionPrice: "3",
    extraInfo: "",
    category: "Chips, snacks & cookies",
    img: "../../img/peeledmango1.jpg",
    promotion: 1,
    liked: 0
  },
  {
    name: "Test15",
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
  },
  {
    name: "Test14",
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
  },
  {
    name: "Test13",
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
  },
  {
    name: "Test12",
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
  },
  {
    name: "Test11",
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
  },
  {
    name: "Test10",
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
];*/

let requests = [
  "http://localhost:57269/api/AASC_PRODUCT",
  "http://localhost:57269/api/AASC_PRODUCT_CATEGORY"
];

/*************************/
/*************************/
/*****Get All The Categories!!******/
/*************************/
/*************************/

/*************************/
/*************************/
/*****Get All The Products!!******/
/*************************/
/*************************/
// Create a request variable and assign a new XMLHttpRequest object to it.
/*for (var i = 0; i < requests.length; i++) {
  (function(i) {
    nRequest[i] = new XMLHttpRequest();
    nRequest[i].open("GET", requests[i], true);
    nRequest[i].onreadystatechange = function(oEvent) {
      if (nRequest[i].readyState === 4) {
        if (nRequest[i].status === 200) {
          console.log(nRequest[i].responseText);
          alert(nRequest[i].responseText);
        } else {
          console.log("Error", nRequest[i].statusText);
        }
      }
    };
    nRequest[i].send(null);
  })(i);
} */
let requestProducts = new XMLHttpRequest();
// Open a new connection, using the GET request on the URL endpoint
let productsArray = [];
let data = [];
let categories = [];
requestProducts.open("GET", "http://localhost:57269/api/AASC_PRODUCT", true);

requestProducts.onload = function() {
  // Begin accessing JSON data here
  if (requestProducts.status >= 200 && requestProducts.status < 400) {
    data = JSON.parse(this.response);
    //data.forEach(p => productsArray.push({ name: p.ProductName }));
    //productsArray = JSON.stringify(data);
  } else {
    prompt("something went wrong, sorry for the inconvenience");
  }
};
requestProducts.send(data);
console.log(data);

console.log(productsArray);
let requestCategories = new XMLHttpRequest();
requestCategories.open(
  "GET",
  "http://localhost:57269/api/AASC_PRODUCT_CATEGORY",
  true
);
requestCategories.onload = function() {
  // Begin accessing JSON data here
  if (requestCategories.status >= 200 && requestCategories.status < 400) {
    let data = JSON.parse(this.response);
    data
      .map(c => ({
        CategoryID: c.CategoryID,
        CategoryName: c.CategoryName
      }))
      .forEach(cat => categories.push(cat));
  } else {
    prompt("something went wrong, sorry for the inconvenience");
  }
};
// Send request
requestCategories.send();

//now that we have both products and categories, map the categoryID in a product to the actual category name:

let myCart = [];
let favorites = [];
/*productsArray = data.map(p => ({
      name: p.ProductName,
      subtitle: p.ProductDescription,
      weight: p.ProductWeight,
      unit: p.ProductUnit,
      price: p.ProductPrice,
      promotionPrice: p.DiscountPrice,
      category: p.FK_CategoryID,
      img: p.ImgPath,
      promotion: p.IsFeatured
    }));*/
