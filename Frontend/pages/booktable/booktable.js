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

let restaurants = [
  {
    name: "Starbucks Coffee",
    price: "$$ - $$$",
    imgpath: "../../img/starbucksthumbnail.jpg"
  },
  {
    name: "Sunset Boulevard",
    price: "$ - $$",
    imgpath: "../../img/sunsetthumbnail.jpg"
  },
  {
    name: "Joe & The Juice",
    price: "$$ - $$$",
    imgpath: "../../img/joethumbnail.jpg"
  },
  {
    name: "Baresso Coffee",
    price: "$$ - $$$",
    imgpath: "../../img/baressothumbnail.jpg"
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
buildRestaurants();

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
                class="booktableButton mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect" onclick="bookTable(this)" data-restaurant="Sunset Boulevard"
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
                class="booktableButton mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect" onclick="bookTable(this)" data-restaurant="Joe & The Juice"
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
                class="booktableButton mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect" onclick="bookTable(this)" data-restaurant="Baresso Coffee"
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

//book single table screen

function bookTable(event) {
  let target = event.dataset.restaurant;
  let restaurant = restaurants.find(r => r.name === target);

  restaurantsHTML.innerHTML = buildSingleRestaurant(restaurant);
  //also make sure datepicker has the right restrictions after every page rebuild:
  datePicker();
}

function buildSingleRestaurant(restaurant) {
  return ` <div class="mdl-grid">
  <div class="mdl-cell mdl-cell--6-col">
    <div class="booktablecard">
      <div class="mdl-grid">
        <div class="mdl-cell mdl-cell--8-col">
          <img
            src=${restaurant.imgpath}
            class="booktablethumbnail"
          />
        </div>
        <div class="mdl-cell mdl-cell--4-col">
          <div class="booktabletext">
            <p class="booktableTitle">${restaurant.name}</p>
            <p class="booktableSubTitle">Opening hours</p>
            <p class="booktablecontent">
              Monday - Saturday: 09:00 - 19:00
            </p>
            <p class="booktablecontent">Sunday: 10:00 - 19:00</p>
            <p class="booktableSubTitle">Price range</p>
            <p class="booktablecontent">${restaurant.price}</p>
            <br />
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="mdl-cell mdl-cell--6-col">
    <section class="sectionTimeDate">
      <div class="timeDate">
        <p>Day of visit:</p>

        <form action="#">
          <div class="mdl-textfield mdl-js-textfield">
            <input required
              class="mdl-textfield__input datePicker"
              type="date"
              id="pickupDate"
            />
          </div>
       

        <p>Time of visit:</p>
    
          <div class="mdl-textfield mdl-js-textfield">
            <input required
              class="mdl-textfield__input timePicker"
              type="time"
              id="pickupTime"
              min="09:00"
              max="18:59"
            />
            <span class="mdl-textfield__error"
              >Please select a time between restaurant's opening
              hours</span
            >
          </div>
          <div>
          <button
            class="mdl-button mdl-js-button mdl-button--raised checkoutButtons"
          >
            Book!
          </button>
          
        </div>
        </form>
        <button
            class="mdl-button mdl-js-button mdl-button--raised checkoutButtons"
            onclick="buildRestaurants()"
          >
            Back to restaurants
          </button>
       
      </div>
    </section>
  </div>
</div>`;
}

///restrict date to today
function datePicker() {
  const datepicker = document.querySelector(".datePicker");

  let date = new Date();
  let min =
    date.getFullYear() +
    "-" +
    (date.getUTCMonth() + 1).toLocaleString() +
    "-" +
    date.getDate().toLocaleString();

  datepicker.setAttribute("min", min);
}
