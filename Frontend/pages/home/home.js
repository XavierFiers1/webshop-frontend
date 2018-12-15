/*let myCart = [];
let requestProducts = new XMLHttpRequest();
// Open a new connection, using the GET request on the URL endpoint
let productsArray = [];
let data = [];

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
    productsArray.forEach(p => {
      if (localStorage.getItem(p.name)) {
        myCart.push(p);
      }
    });
    updateCartIcon();
  } else {
    prompt("something went wrong, sorry for the inconvenience");
  }
};
requestProducts.send();

function updateCartIcon() {
  const cart = document.getElementById("cartButton");
  cart.setAttribute("data-badge", myCart.length);
}

//after everything is set in place, also updateCartIcon

document.addEventListener("readystatechange", event => {
  if (event.target.readyState === "interactive") {
  } else if (event.target.readyState === "complete") {
    updateCartIcon();
  }
});
*/
updateCartIconShared();
