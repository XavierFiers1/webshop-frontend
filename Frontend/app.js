// show cart

let array = ["cow", "milk", "cheese"];

let myCart = [];

const products = document.getElementById("products");
const gridElement = document.createElement("div");
gridElement.classList.add("mdl-grid");

array.forEach(element => {
  const colElement = document.createElement("div");
  colElement.classList.add("mdl-cell", "mdl-cell--4-col");

  products.appendChild(gridElement);
  gridElement.appendChild(colElement);

  //generate one product card:
  const card = document.createElement("div");
  card.classList.add("demo-card-wide", "mdl-card", "mdl-shadow--2dp");
  const cardTitle = document.createElement("div");
  cardTitle.classList.add("mdl-card__title");
  const cardTitleHeader = document.createElement("h2");
  cardTitleHeader.classList.add("mdl-card__title-text");
  const text = document.createTextNode(element);
  const card_content = document.createElement("div");
  card_content.classList.add("mdl-card__supporting-text");
  const card_content_text = document.createTextNode(
    "test test test test test "
  );

  //button add
  const button_add = document.createElement("button");
  button_add.classList.add(
    "mdl-button",
    "mdl-js-button",
    "mdl-button--fab",
    "mdl-button--colored"
  );
  button_add.addEventListener("click", function() {
    console.log("clicked");
    myCart.push(element);
    console.log(myCart);
  });
  button_add.id = "button_add";
  const icon_add = document.createElement("i");
  icon_add.classList.add("material-icons");
  const icon_add_text = document.createTextNode("add");

  //button remove
  const button_remove = document.createElement("button");
  button_remove.classList.add(
    "mdl-button",
    "mdl-js-button",
    "mdl-button--fab",
    "mdl-button--colored"
  );
  button_remove.addEventListener("click", function() {
    let index = myCart.findIndex(item => item === element);
    if (index >= 0) myCart.splice(index, 1);
    console.log(myCart);
  });
  button_remove.id = "button_remove";
  const icon_remove = document.createElement("i");
  icon_remove.classList.add("material-icons");

  const icon_remove_text = document.createTextNode("remove");

  //card footer:
  const card_footer = document.createElement("div");
  card_footer.classList.add("mdl-card__actions", "mdl-card--border");

  //card DOM buildup:
  colElement.appendChild(card);
  card.appendChild(cardTitle);
  cardTitle.appendChild(cardTitleHeader);
  cardTitleHeader.appendChild(text);
  card.appendChild(card_content);
  card_content.appendChild(card_content_text);
  card.appendChild(card_footer);

  //add buttons
  const buttons_div = document.createElement("div");
  buttons_div.id = "buttons_div";
  card_footer.appendChild(buttons_div);
  buttons_div.appendChild(button_add);
  buttons_div.appendChild(button_remove);

  button_add.appendChild(icon_add);
  icon_add.appendChild(icon_add_text);

  button_remove.appendChild(icon_remove);
  icon_remove.appendChild(icon_remove_text);
});

const cart = document.getElementsByClassName(
  "material-icons mdl-badge mdl-badge--overlap"
);
cart[0].setAttribute("data-badge", array.length);

//cart dialog
var dialog = document.querySelector("dialog");
var showDialogButton = document.querySelector("#cart-button");
if (!dialog.showModal) {
  dialogPolyfill.registerDialog(dialog);
}
showDialogButton.addEventListener("click", function() {
  dialog.showModal();
});
dialog.querySelector(".close").addEventListener("click", function() {
  dialog.close();
});

//add item to cart
