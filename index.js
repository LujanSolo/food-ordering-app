import { menuArray } from "./data.js";
let currentOrderBucket = [];

//* Document event listener using Event Object for targeting
document.addEventListener("click", (e) => {
  if (e.target.id) {
    getTargetObject(e.target.id);
  }
});

//* ITERATE thru menuArray to display each menu item to the HTML
function getMenuHtml() {
  let menuHtml = "";

  menuArray.forEach((item) => {
    menuHtml += `
      <div class="menu-item">
        <i class="item-icon" alt="An icon representing ${item.name}">${item.emoji
      }</i>
        <div class="menu-detail">  
          <h2 class="item-name">${item.name}</h2>
          <p class="item-ingredients">${item.ingredients.join(", ")}</p>
          <h3 class="item-price">$${item.price}</h3>
        </div>
        <div class="add-item-btn">  
          <button class="add-btn" id="${item.id}">+</button>
        </div>
      </div>
    `;
  });
  return menuHtml;
}

//* FILTER the selected menu item, send to new array and local Storage
function getTargetObject(itemId) {
  const targetMenuObj = menuArray.filter((item) => {
    return item.id === Number(itemId);
  })[0];
  pushOrderToArray(targetMenuObj);
  console.log(currentOrderBucket) //! DELETE LATER
};

//* PUSH selected OrderObject to the currentOrder array
function pushOrderToArray(object) {
  currentOrderBucket.push(object);
  pushToLocalStorage(currentOrderBucket)
};
console.log(currentOrderBucket) //! DELETE LATER

//* SAVE OrderObject to Local Storage
function pushToLocalStorage(object) {
  localStorage.setItem('order', JSON.stringify(object));
};

//* render current menu items to the page
function render() {
  document.getElementById("menu-container").innerHTML = getMenuHtml();
};
render();
