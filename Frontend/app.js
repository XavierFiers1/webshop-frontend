var notification = document.querySelector('.mdl-js-snackbar');
function authenticate() {
    if (!localstorage.getItem(user)) {
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
var dialog = document.querySelector('dialog');
  var showDialogButton = document.querySelector('#profileButton');
  if (! dialog.showModal) {
    dialogPolyfill.registerDialog(dialog);
  }
  showDialogButton.addEventListener('click', function() {
    dialog.showModal();
  });
  dialog.querySelector('.close').addEventListener('click', function() {
    dialog.close();
  });