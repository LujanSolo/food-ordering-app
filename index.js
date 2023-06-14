import { menuArray } from "./data.js";
import { v4 as uuidv4 } from "https://jspm.dev/uuid"

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
    `
  });
  return menuHtml;
}

//* render current menu items to the page
function renderMenu() {
  document.getElementById("menu-container").innerHTML = getMenuHtml();
}

renderMenu();


//* ORDER SECTION



//* Document event listener using Event Object for targeting
document.addEventListener("click", (e) => {
  if (e.target.id) {
    getTargetObject(e.target.id);
  }
});

//* FILTER the selected menu item, send to new array
function getTargetObject(itemId) {
  const targetMenuObj = menuArray.filter((item) => {
  return item.id === Number(itemId)
  })[0];
  addItemToOrderArray(targetMenuObj);
}


let currentOrderArray = [];
//* PUSH selected OrderObject to the currentOrder array
function addItemToOrderArray(item) {
  
  const orderObj = {
    name: item.name,
    price: item.price,
    id: item.id,
    uuid: uuidv4()
  }

  currentOrderArray.push(orderObj);
  renderOrder();
  console.log(currentOrderArray)
}


//* FUNCTION to build the HTML for active orders
function getOrderHtml() {
  let orderHtml = "";

  currentOrderArray.forEach((item) => {
    orderHtml += `
        <div class="order-item">
          <h2 class="order-col-1">${item.name}</h2>
          <button class="remove-btn" id="${item.uuid}">remove</button>
          <p class="item-price">${item.price}</p>
        </div>
      `
  });
  return orderHtml;
}

//* Render user's order
function renderOrder() {
  document.getElementById("order-container").innerHTML = getOrderHtml();
}




//* SAVE OrderObject to Local Storage
// if(currentOrderArray.length > 0){
//   localStorage.setItem("order", JSON.stringify(currentOrderArray));
// }

// //* GET OrderObject from Local Storage
// function getLocalStorage(object) {
//   currentOrderArray = JSON.parse(localStorage.getItem("order"));
// }

