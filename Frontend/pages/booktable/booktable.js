const prefix = "/Frontend/img/bookables/";
const QUICKNAV = document.getElementById("quicknavigation");
// function Bookable(name, path, priceRange, category) {
//     this.name = name;
//     this.path = path;
//     this.priceRange = priceRange;
//     this.category = category;
// }
let bookables = [
  {
    name: "Baresso",
    img: "baresso.jpg",
    priceRange: 3,
    category: "coffee"
  },
  {
    name: "Cafe Karma",
    img: "cafe_karma.jpg",
    priceRange: 3,
    category: "coffee"
  },
  {
    name: "Carls Jr",
    img: "carls_jr.jpg",
    priceRange: 3,
    category: "coffee"
  },
  {
    name: "Frellsen",
    img: "frellsen.jpg",
    priceRange: 3,
    category: "coffee"
  },
  {
    name: "Joe and the juice",
    img: "joe_and_the_juice.jpg",
    priceRange: 3,
    category: "coffee"
  },
  {
    name: "Paradis Is",
    img: "paradis_is.jpg",
    priceRange: 3,
    category: "coffee"
  },
  {
    name: "Starbucks",
    img: "starbucks.jpg",
    priceRange: 3,
    category: "coffee"
  },
  {
    name: "Sunset",
    img: "sunset.jpg",
    priceRange: 3,
    category: "coffee"
  },
  {
    name: "Sushi Mania",
    img: "sushi_mania.jpg",
    priceRange: 3,
    category: "coffee"
  }
];
bookables.forEach(bookable => {
  let bkable = document.createElement("div");
  bkable.classList.add("mdl-grid");
  bkable.innerHTML = `
    <div>
    <img id="${bookable.name}" class="hvr-grow" src="${prefix +
    bookable.img}" alt="${bookable.name}">
    </div>
    <div class="mdl-tooltip mdl-tooltip--large" for="${bookable.name}">
    ${bookable.name}
  </div>
    `;
  QUICKNAV.appendChild(bkable);
});
const restaurantsHTML = document.querySelector(".restaurants");
//buildRestaurants();

function buildRestaurants() {
  restaurantsHTML.innerHTML = restaurantCode();
}

function restaurantCode() {
  return `<div class="mdl-grid">
    <div class="mdl-cell mdl-cell--6-col">
      <div class="booktablecard">
        <div class="mdl-grid">
          <div class="mdl-cell mdl-cell--8-col">
            <img
              src="../../img/starbucksthumbnail.jpg"
              class="booktablethumbnail"
            />
          </div>
          <div class="mdl-cell mdl-cell--4-col">
            <div class="booktabletext">
              <p class="booktableTitle">Starbucks Coffee</p>
              <p class="booktableSubTitle">Opening hours</p>
              <p class="booktablecontent">
                Monday - Saturday: 09:00 - 19:00
              </p>
              <p class="booktablecontent">Sunday: 10:00 - 19:00</p>
              <p class="booktableSubTitle">Price range</p>
              <p class="booktablecontent">$$ - $$$</p>
              <br />
              <button
                class="booktableButton mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect" onclick="bookTable(this)" data-restaurant="Starbucks Coffee"
              >
                Book table
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Sunset Boulevard -->
    <div class="mdl-cell mdl-cell--6-col">
      <div class="booktablecard">
        <div class="mdl-grid">
          <div class="mdl-cell mdl-cell--8-col">
            <img
              src="../../img/sunsetthumbnail.jpg"
              class="booktablethumbnail"
            />
          </div>
          <div class="mdl-cell mdl-cell--4-col">
            <div class="booktabletext">
              <p class="booktableTitle">Sunset Boulevard</p>
              <p class="booktableSubTitle">Opening hours</p>
              <p class="booktablecontent">
                Monday - Saturday: 09:00 - 19:00
              </p>
              <p class="booktablecontent">Sunday: 10:00 - 19:00</p>
              <p class="booktableSubTitle">Price range</p>
              <p class="booktablecontent">$ - $$</p>
              <br />
              <button
                class="booktableButton mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect" onclick="bookTable(this)" data-restaurant="Starbucks Coffee"
              >
                Book table
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Joe & The Juice -->
    <div class="mdl-cell mdl-cell--6-col">
      <div class="booktablecard">
        <div class="mdl-grid">
          <div class="mdl-cell mdl-cell--8-col">
            <img
              src="../../img/joethumbnail.jpg"
              class="booktablethumbnail"
            />
          </div>
          <div class="mdl-cell mdl-cell--4-col">
            <div class="booktabletext">
              <p class="booktableTitle">Joe & The Juice</p>
              <p class="booktableSubTitle">Opening hours</p>
              <p class="booktablecontent">
                Monday - Saturday: 09:00 - 19:00
              </p>
              <p class="booktablecontent">Sunday: 10:00 - 19:00</p>
              <p class="booktableSubTitle">Price range</p>
              <p class="booktablecontent">$$ - $$$</p>
              <br />
              <button
                class="booktableButton mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect" onclick="bookTable(this)" data-restaurant="Starbucks Coffee"
              >
                Book table
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Baresso Coffee -->
    <div class="mdl-cell mdl-cell--6-col">
      <div class="booktablecard">
        <div class="mdl-grid">
          <div class="mdl-cell mdl-cell--8-col">
            <img
              src="../../img/baressothumbnail.jpg"
              class="booktablethumbnail"
            />
          </div>
          <div class="mdl-cell mdl-cell--4-col">
            <div class="booktabletext">
              <p class="booktableTitle">Baresso Coffee</p>
              <p class="booktableSubTitle">Opening hours</p>
              <p class="booktablecontent">
                Monday - Saturday: 09:00 - 19:00
              </p>
              <p class="booktablecontent">Sunday: 10:00 - 19:00</p>
              <p class="booktableSubTitle">Price range</p>
              <p class="booktablecontent">$ - $$</p>
              <br />
              <button
                class="booktableButton mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect" onclick="bookTable(this)" data-restaurant="Starbucks Coffee"
              >
                Book table
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>`;
}

function bookTable(event) {
  let restaurant = event.dataset.restaurant;
  restaurantsHTML.innerHTML = buildSingleRestaurant();
}

function buildSingleRestaurant() {
  return `<div class="mdl-grid">
    <div class="mdl-cell mdl-cell--6-col">
      <div class="booktablecard">
        <div class="mdl-grid">
          <div class="mdl-cell mdl-cell--8-col">
            <img
              src="../../img/starbucksthumbnail.jpg"
              class="booktablethumbnail"
            />
          </div>
          <div class="mdl-cell mdl-cell--4-col">
            <div class="booktabletext">
              <p class="booktableTitle">Starbucks Coffee</p>
              <p class="booktableSubTitle">Opening hours</p>
              <p class="booktablecontent">
                Monday - Saturday: 09:00 - 19:00
              </p>
              <p class="booktablecontent">Sunday: 10:00 - 19:00</p>
              <p class="booktableSubTitle">Price range</p>
              <p class="booktablecontent">$$ - $$$</p>
              <br />
              
            </div>
          </div>
        </div>
      </div>



      
      <div class="mdl-cell mdl-cell--6-col">
        <p>Pickup Date:</p>
    
        <form action="#">
          <div class="mdl-textfield mdl-js-textfield">
            <input
              class="mdl-textfield__input datePicker"
              type="date"
              id="pickupDate"
            />
          </div>
        </form>
      </div>
      <div class="mdl-cell mdl-cell--6-col">
        <p>Pickup Time:</p>
        <form action="#">
          <div class="mdl-textfield mdl-js-textfield">
            <input
              class="mdl-textfield__input timePicker"
              type="time"
              id="pickupTime"
              min="09:00:00"
              max="00:00:00"
            />
            <span class="mdl-textfield__error"
              >Please select a time between Bilka's opening hours</span
            >
          </div>
        </form>
        <div class="total">
          <p>Service cost: €1</p>
          <p>Total: € <span id="totalValue"> test</span></p>
    
          <button class="mdl-button mdl-js-button mdl-button--raised">
            Checkout!
          </button>
        </div>
      </div>

    




    </div>`;
}
