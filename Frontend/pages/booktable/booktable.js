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
    imgpath: "../../img/starbucksthumbnail.jpg",
    id: 2
  },
  {
    name: "Sunset Boulevard",
    price: "$ - $$",
    imgpath: "../../img/sunsetthumbnail.jpg",
    id: 3
  },
  {
    name: "Joe & The Juice",
    price: "$$ - $$$",
    imgpath: "../../img/joethumbnail.jpg",
    id: 4
  },
  {
    name: "Baresso Coffee",
    price: "$ - $$",
    imgpath: "../../img/baressothumbnail.jpg",
    id: 5
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
              class="booktablethumbnail" alt="Starbucks Coffee"
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
              class="booktablethumbnail" alt="SunSet Boulevard"
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
              class="booktablethumbnail" alt="Joe & The Juice"
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
              class="booktablethumbnail" alt="Baresso Coffee"
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
            class="booktablethumbnailFocus"
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
       
  
        <form action="#" onsubmit="return handleFormSubmit(this)" data-restaurantName="${
          restaurant.name
        }">
        <p>Number of seats:</p>
      <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
      <input class="mdl-textfield__input" id="amountOfSeats" min="1" max="10" type="number" placeholder="Number between 1 and 10">
      
      </div>

        <p>Day of visit:</p>
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
              value="10:00"
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
  let month = 0;
  if (date.getUTCMonth() + 1 <= 9) month = "0" + (date.getUTCMonth() + 1);
  let min =
    date.getFullYear() + "-" + month + "-" + date.getDate().toLocaleString();

  datepicker.setAttribute("min", min);
}

function handleFormSubmit(event) {
  let restaurant = restaurants.find(
    r => r.name === event.dataset.restaurantname
  );

  let date = document.querySelector(".datePicker").value;

  let time = document.querySelector(".timePicker").value;
  let timeForInput = time;
  time = time + ":00.00";
  let amountOfSeats = document.querySelector("#amountOfSeats").value;
  document.querySelector(".restaurants").innerHTML = buildRestaurantCheckout(
    restaurant,
    amountOfSeats,
    date,
    timeForInput
  );

  let bookTableRequest = new XMLHttpRequest();
  var url = "http://localhost:57269/api/AASC_BOOKING";
  let params = {
    NumberOfSeats: amountOfSeats,
    BookingTime: time,
    BookingDate: date,
    FK_UserID: JSON.parse(sessionStorage.getItem("userInfo"))[0].UserID,
    FK_RestaurantID: restaurant.id
  };

  bookTableRequest.open("POST", url, true);
  //Send the proper header information along with the request
  bookTableRequest.setRequestHeader("Content-type", "application/json");
  bookTableRequest.onreadystatechange = function() {
    //Call a function when the state changes.
    if (bookTableRequest.readyState == 4 && bookTableRequest.status == 200) {
      alert(bookTableRequest.responseText);
    }
  };
  bookTableRequest.send(JSON.stringify(params));
}

function buildRestaurantCheckout(restaurant, amountOfSeats, date, time) {
  return `<div class="onCheckout">
  <img src="${restaurant.imgpath}" alt="${restaurant.name}">
  <h3>${amountOfSeats} seat(s) will be reserved for you at ${
    restaurant.name
  } on</h3>
  
  <h4 id="showDate">${date} at ${time}</h4>
  <h4>We are looking forward to your visit</h4>
  <br />
 
    
  </div>
  </div>
</div>`;
}

//coming from app.js
//////cart functionality
updateCartIconShared();
