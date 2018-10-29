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
  card_content.classList.add("mdl-card__supporting-text", "mdl-card--border");
  const card_content_text = document.createTextNode(
    "test test test test test "
  );

  //button add
  const button_add = document.createElement("button");
  button_add.classList.add(
    "mdl-button",
    "mdl-js-button",
    "mdl-js-ripple-effect"
  );
  let amount = 0;
  button_add.addEventListener("click", function() {
    amount++;
    console.log("clicked");
    myCart.push(element);
    label_input.removeChild(label_input_text);
    label_input_text = document.createTextNode(amount);
    label_input.appendChild(label_input_text);
    console.log(amount);
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
    "mdl-js-ripple-effect"
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

  //form field between buttons:
  const form_amount = document.createElement("form");
  form_amount.id = "product_amount";
  form_amount.action = "#";
  const textfield_amount = document.createElement("div");
  textfield_amount.classList.add("mdl-textfield", "mdl-js-textfield");
  const input_amount = document.createElement("input");
  input_amount.classList.add("mdl-textfield__input");
  input_amount.id = "inputerror";
  input_amount.type = "text";
  input_amount.pattern = "-?[0-9]*(.[0-9]+)?";
  let label_input = document.createElement("label");
  label_input.classList.add("mdl-textfield__label");
  label_input.id = "input_amount";
  label_input.setAttribute("for", "inputerror");
  let label_input_text = document.createTextNode("");
  const span_input = document.createElement("span");
  span_input.classList.add("mdl-textfield__error");
  const input_errorText = document.createTextNode("Input is not a number!");

  //card footer:
  const card_footer = document.createElement("div");
  card_footer.classList.add("mdl-card__supporting-text");

  //card DOM buildup:
  colElement.appendChild(card);
  card.appendChild(cardTitle);
  cardTitle.appendChild(cardTitleHeader);
  cardTitleHeader.appendChild(text);
  card.appendChild(card_content);
  card_content.appendChild(card_content_text);
  card.appendChild(card_footer);

  //add button and input

  card_footer.appendChild(button_add);
  card_footer.appendChild(form_amount);
  card_footer.appendChild(button_remove);

  button_add.appendChild(icon_add);
  icon_add.appendChild(icon_add_text);

  form_amount.appendChild(textfield_amount);
  textfield_amount.appendChild(input_amount);
  textfield_amount.appendChild(label_input);
  label_input.appendChild(label_input_text);
  textfield_amount.appendChild(span_input);
  span_input.appendChild(input_errorText);

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
