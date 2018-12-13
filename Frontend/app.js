'use strict';
// Declarations

let notification = document.querySelector('.mdl-js-snackbar');
const BODY = document.getElementsByTagName('body')[0];
const TOPBARCONTAINER = document.getElementById('topbarContainer');
const URLBASE = 'http://localhost:57269/api/';

// init 
loadTopbar();
loadFooter();

// if ('serviceWorker' in navigator) {
//   navigator.serviceWorker
//       .register('/sw.js')
//       .then(function () { console.log("Service Worker Registered"); });
// }

// FUNCTIONS
// Initialize Modals and listen for events, polyfill for fallbacks

document.addEventListener('readystatechange', event => {
  if (event.target.readyState === 'interactive') {

  }
  else if (event.target.readyState === 'complete') {
    let dialog = document.querySelector('dialog');
    let showDialogButton = document.querySelector('#profileButton');
    if (!dialog.showModal) {
      dialogPolyfill.registerDialog(dialog);
    }

    showDialogButton.addEventListener('click', function () {
      if (sessionStorage.getItem('user')) {
        window.location.pathname = '/Frontend/pages/user/user.html';
      } else {
        BODY.classList.add('is-blurred');
        dialog.showModal();
      }
    });

    dialog.querySelector('.close').addEventListener('click', function () {
      BODY.classList.remove('is-blurred');
      dialog.close();
    });
    document.onkeydown = function (evt) {
      evt = evt || window.event;
      if (evt.keyCode == 27) {
        BODY.classList.remove('is-blurred');

        dialog.close();
      }
    };


    window.onclick = function (event) {
      if (event.target == dialog) {
        dialog.close();
        BODY.classList.remove('is-blurred');

      }
    }
    if (window.location.pathname === '/Frontend/pages/products/products.html' || window.location.pathname === '/Frontend/pages/cart/cart.html') {
      document.getElementById('banner').src = '../../img/AaStorcenterPickup-w.svg';
    }



  }
});
function loadSection(url) {
  return fetch(url).then((response) => (response.text()));
}
function showToast() {
  notification.MaterialSnackbar.showSnackbar(
    {
      message: 'Account registered'
    }
  );
}
function loadTopbar() {
  loadSection('/Frontend/shared/topbar/topbar.html').then((html) => {
    TOPBARCONTAINER.innerHTML = html;
  }).catch((error) => {
    console.warn(error);
  });
}
function loadFooter() {
  loadSection('/Frontend/shared/footer/footer.html').then((html) => {
    document.getElementById("footerContainer").innerHTML = html;
  }).catch((error) => {
    console.warn(error);
  });
}
// || '/Frontend/pages/cart/cart.html')
if (window.location.pathname === ('/Frontend/pages/products/products.html' || '/Frontend/pages/cart/cart.html')) {
  TOPBARCONTAINER.classList.add('bilka_topbar');
  TOPBARCONTAINER.classList.remove('bilka_topbar');

}

function changeForm(form) {
  switch (form) {
    case 'signup':
      document.getElementById('form').innerHTML = `
    <form action="javascript:showToast(); dialog.close()">
        <p class="align-center">Please fill in this form to create an account.</p>
        <hr />

        <!-- <label for="fname"><b>First name</b></label> -->
        <input id="fname" class="user-input" type="text" placeholder="Enter first name" name="fname" required />

        <!-- <label for="lname"><b>Last Name</b></label> -->
        <input id="lname" class="user-input" placeholder="Enter last name" name="lname" required />

        <!-- <label for="email"><b>Email</b></label> -->
        <input id="email" class="user-input" type="email" placeholder="Enter email" name="email" required />

        <!-- <label for="phoneNo"><b>Phone Number</b></label> -->
        <input id="phoneNo" class="user-input" type="tel" placeholder="Enter phone number" name="phoneNo" required />

        <!-- <label for="city"><b>City</b></label> -->
        <input id="city" class="user-input" type="text" placeholder="Enter city" name="city" required />

        <!-- <label for="street"><b>Street</b></label> -->
        <input id="street" class="user-input" placeholder="Enter street" name="street" required />

        <!-- <label for="psw-repeat"><b>Flat Number</b></label> -->
        <input id="flatNo" class="user-input" placeholder="Enter flat number" name="flatNo" required />

        <!-- <label for="zip"><b>Postal Code</b></label> -->
        <input id="zip" class="user-input" type="number" placeholder="Enter postal code" name="zip" required />

        <!-- <label for="cpr"><b>CPR</b></label> -->
        <input id="cpr" class="user-input" type="number" placeholder="CPR" name="cpr" required />

        <!-- <label for="psw"><b>Password</b></label> -->
        <input id="psw" class="user-input" type="password" placeholder="Enter Password" name="psw" required />

        <!-- <label for="psw-repeat"><b>Repeat Password</b></label> -->
        <input id="" class="user-input" type="password" placeholder="Repeat Password" name="psw-repeat" required />

        <label>
          <input type="checkbox" checked="checked" name="remember" style="margin-bottom:15px" />
          Remember me
        </label>

        <p>
          By creating an account you agree to our
          <a href="#" style="color:dodgerblue">Terms & Privacy</a>.
        </p>

        <div class="clearfix">
          <button type="button" class="modal-button cancelbtn close">Cancel</button>
          <button type="submit" class="modal-button signupbtn close">Sign Up</button>
        </div>
        <hr>
        <p class="align-center" style="margin-top: 2.3rem;">Already a member? <br> <span onclick="changeForm('login')" style="color:dodgerblue">
            Log in </span></p>
      </form>
    `;

      break;
    case 'login':
      document.getElementById('form').innerHTML = `
      <form class="" action="javascript:loginUser(); dialog.close()">
          <p class="align-center">Please enter yout credentials.</p>
<!-- <label for="email"><b>Email</b></label> -->
        <input id="loginEmail" class="user-input" type="email" placeholder="Enter email" name="email" required />
<!-- <label for="loginPassword"><b>Password</b></label> -->
        <input id="loginPassword" class="user-input" type="password" placeholder="Enter Password" name="psw"  required />      
        <div class="clearfix">
          <button type="button" class="modal-button cancelbtn close">Cancel</button>
          <button type="submit" class="modal-button signupbtn close">Log in</button>
        </div>
        <hr>
        <p class="align-center" style="margin-top: 2.3rem;">Not a member? <br> <span onclick="changeForm('signup')" style="color:dodgerblue">
            Sign up </span></p>
      </form>
       
`;
      break;
    default:
      dialog.close();
      break;
  }
}
// register the user
function registerUser() {
  var user = {
    FName: document.querySelector('#fname').value,
    LName: document.querySelector('#lname').value,
    EMail: document.querySelector('#email').value,
    PhoneNo: document.querySelector('#phoneNo').value,
    City: document.querySelector('#city').value,
    Street: document.querySelector('#street').value,
    FlatNo: document.querySelector('#flatNo').value,
    Zip: document.querySelector('#zip').value,
    CPR: document.querySelector('#cpr').value,
    UPassword: document.querySelector('#psw').value

  };
  sessionStorage.setItem("userID", user.email);
  let json = JSON.stringify(user);
  const request = new XMLHttpRequest();
  request.open("POST", URLBASE + "postUser", true);
  request.setRequestHeader('Content-Type', 'application/json');
  request.onload = function () {
    if (request.status >= 200 && request.status < 400) {

      loginUser(user.EMail, user.UPassword);
    } else {
      showToast('Something went wrong');
    }
  };
  request.send(json);
}
function loginUser(email, password) {
  email = document.getElementById('loginEmail').value;
  password = document.getElementById('loginPassword').value;
  const request = new XMLHttpRequest();
  
  request.open("GET", URLBASE + "getUser/" + email + "/" + password, true);
  request.setRequestHeader('Content-Type', 'application/json');
  request.onload = function () {
    if (request.status >= 200 && request.status < 400) {
      sessionStorage.setItem('user', email);
      
    } else {
      showToast('Wrong e-mail or password.');
    }
  };
  request.send();
}
