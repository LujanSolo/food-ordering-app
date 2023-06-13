import { menuArray } from "./data.js";
import { v4 as uuidv4 } from "https://jspm.dev/uuid"

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
        <i class="item-icon" alt="An icon representing ${item.name}">${item.emoji}</i>
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

//* FILTER the selected menu item, send to new array
function getTargetObject(itemId) {
  let targetMenuObj = menuArray.filter((item) => {
    return item.id == itemId;
  });
  addItemToOrderArray(targetMenuObj)
  console.log(currentOrderBucket)
}

//* PUSH selected OrderObject to the currentOrder array
function addItemToOrderArray(object) {
  object.uuid = uuidv4();
  currentOrderBucket.unshift(object);
  console.log('currentOrderBucket:', currentOrderBucket)
  // pushToLocalStorage(currentOrderBucket);
}

//* SAVE OrderObject to Local Storage
function pushToLocalStorage(object) {
  localStorage.setItem("order", JSON.stringify(object));
}

//* GET OrderObject from Local Storage
function getLocalStorage(object) {
  currentOrderBucket = JSON.parse(localStorage.getItem("order"));
}

//* FUNCTION to build the HTML for active orders
function getOrderHtml() {
  let orderHtml = "";
  
  if(currentOrderBucket.length) {
    currentOrderBucket.forEach((orderItem) => {
      orderHtml += `
        <div class="order-item">
          <h2 class="order-col-1">${orderItem.name}</h2>
          <button class="remove-btn" id="${orderItem.uuid}">remove</button>
          <p class="item-price">${orderItem.price}</p>
          <h3 class="order-col-1">Total price:</h3>
          <p class="item-price" id="sum-price">price function</p>
          <button class="order-btn" id="order-btn">Complete Order</button>
        </div>
      `
    });
  }
  
  return orderHtml;
}

//* render current menu items to the page
function renderMenu() {
  document.getElementById("menu-container").innerHTML = getMenuHtml();
  
}

function renderOrder() {
  document.getElementById("order-details").innerHTML = getOrderHtml();
}

renderMenu();
renderOrder();