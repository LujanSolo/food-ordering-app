import { menuArray } from "./data.js";
let currentOrderBucket = [];
console.log(currentOrderBucket)

document.addEventListener("click", (e) => {
  if (e.target.id) {
    addToOrderArray(e.target.id);
  }
});

//* ITERATE thru menuArray to print each menu item to the HTML
function getMenuHtml() {
  let menuHtml = "";

  menuArray.forEach((item) => {
    menuHtml += `
      <div class="menu-item">
        <i class="item-icon" alt="An icon representing ${item.name}">${
      item.emoji
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

//* FILTER the selected menu item and STORE it in a CONST
function addToOrderArray(itemId) {
  const targetMenuObj = menuArray.filter((item) => {
    return item.id === Number(itemId);
  })[0];
  currentOrderBucket.push(targetMenuObj)
  console.log(currentOrderBucket)
  localStorage.setItem('order', JSON.stringify(currentOrderBucket))
}

function render() {
  document.getElementById("menu-container").innerHTML = getMenuHtml();
}

render();
