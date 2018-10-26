let array = ["cow", "milk", "cheese"];

const cards = document.getElementById("cards");
const gridElement = document.createElement("div");
gridElement.classList.add("mdl-grid");

array.forEach(element => {
  const colElement = document.createElement("div");
  colElement.classList.add("mdl-cell", "mdl-cell--4-col");

  cards.appendChild(gridElement);
  gridElement.appendChild(colElement);

  //generate the card:

  const card = document.createElement("div");
  card.classList.add("demo-card-wide", "mdl-card", "mdl-shadow--2dp");
  const cardTitle = document.createElement("div");
  cardTitle.classList.add("mdl-card__title");
  const cardTitleHeader = document.createElement("h2");
  cardTitleHeader.classList.add("mdl-card__title-text");
  const text = document.createTextNode(element);

  colElement.appendChild(card);
  card.appendChild(cardTitle);
  cardTitle.appendChild(cardTitleHeader);
  cardTitleHeader.appendChild(text);
});
/*
<div class="demo-card-wide mdl-card mdl-shadow--2dp">
  <div class="mdl-card__title">
    <h2 class="mdl-card__title-text">Welcome</h2>
  </div>
  <div class="mdl-card__supporting-text">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sagittis
    pellentesque lacus eleifend lacinia...
  </div>
  <div class="mdl-card__actions mdl-card--border">
    <a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">
      Get Started
    </a>
  </div>
  <div class="mdl-card__menu">
    <button class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect">
      <i class="material-icons">share</i>
    </button>
  </div>
</div>;
*/
