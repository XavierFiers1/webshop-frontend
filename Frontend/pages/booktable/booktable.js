const prefix = '/Frontend/img/bookables/';
const QUICKNAV = document.getElementById('quicknavigation');
// function Bookable(name, path, priceRange, category) {
//     this.name = name;
//     this.path = path;
//     this.priceRange = priceRange;
//     this.category = category;
// }
let bookables = [
    {
        name:'Baresso',
        img:'baresso.jpg',
        priceRange:3,
        category:'coffee'
    },
    {
        name:'Cafe Karma',
        img:'cafe_karma.jpg',
        priceRange:3,
        category:'coffee'
    },
    {
        name:'Carls Jr',
        img:'carls_jr.jpg',
        priceRange:3,
        category:'coffee'
    },
    {
        name:'Frellsen',
        img:'frellsen.jpg',
        priceRange:3,
        category:'coffee'
    },
    {
        name:'Joe and the juice',
        img:'joe_and_the_juice.jpg',
        priceRange:3,
        category:'coffee'
    },
    {
        name:'Paradis Is',
        img:'paradis_is.jpg',
        priceRange:3,
        category:'coffee'
    },
    {
        name:'Starbucks',
        img:'starbucks.jpg',
        priceRange:3,
        category:'coffee'
    },
    {
        name:'Sunset',
        img:'sunset.jpg',
        priceRange:3,
        category:'coffee'
    },
    {
        name:'Sushi Mania',
        img:'sushi_mania.jpg',
        priceRange:3,
        category:'coffee'
    },
];
bookables.forEach(bookable => {
    let bkable = document.createElement('div');
    bkable.classList.add('mdl-grid');
    bkable.innerHTML = `
    <div>
    <img id="${bookable.name}" class="hvr-grow" src="${prefix + bookable.img}" alt="${bookable.name}">
    </div>
    <div class="mdl-tooltip mdl-tooltip--large" for="${bookable.name}">
    ${bookable.name}
  </div>
    `;
    QUICKNAV.appendChild(bkable);
});