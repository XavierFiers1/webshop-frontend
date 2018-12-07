'use strict';
// Declarations
let user;
let notification = document.querySelector('.mdl-js-snackbar');
let deferredPrompt;
const TOPBARCONTAINER = document.getElementById('topbarContainer');


// init 
loadTopbar();
loadFooter();
// if ('serviceWorker' in navigator) {
//   navigator.serviceWorker
//       .register('/sw.js')
//       .then(function () { console.log("Service Worker Registered"); });
// }
// functions
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
      dialog.showModal();
    });

    dialog.querySelector('.close').addEventListener('click', function () {
      dialog.close();
    });

    if (window.location.pathname === '/Frontend/pages/products/products.html' || window.location.pathname === '/Frontend/pages/grocery/grocerybag.html') {
      console.log('bilkaish');
      document.getElementById('banner').src = '../../img/AaStorcenterPickup-w.svg' ;
    }
    
    
  }
});


function loadSection(url) {
  return fetch(url).then((response) => (response.text()));
}

function authenticate() {
  if (!localStorage.getItem(user)) {
    openSignUp();
  } else {
    window.location = '/Frontend/pages/user/user.html';
  }
}
function openSignUp() {

}
function showToast() {
  notification.MaterialSnackbar.showSnackbar(
    {
      message: 'Account registered'
    }
  );
}
function loadTopbar(event) {
  loadSection('/Frontend/shared/topbar/topbar.html').then((html) => {
    TOPBARCONTAINER.innerHTML = html;
  }).catch((error) => {
    console.warn(error);
  });
}
function loadFooter(event) {
  loadSection('/Frontend/shared/footer/footer.html').then((html) => {
    document.getElementById("footerContainer").innerHTML = html;
  }).catch((error) => {
    console.warn(error);
  });
}
// || '/Frontend/pages/grocerybag/grocerybag.html')
console.log(window.location);
if (window.location.pathname === ('/Frontend/pages/products/products.html' || '/Frontend/pages/grocerybag/grocerybag.html')) {
  TOPBARCONTAINER.classList.add('bilka_topbar');
  console.log('bilkaish');
  TOPBARCONTAINER.classList.remove('bilka_topbar');
  
}



