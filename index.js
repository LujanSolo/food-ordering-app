import { menuArray } from "./data.js";
import { v4 as uuidv4 } from "https://jspm.dev/uuid";

const currentOrderArray = [];

//* MENU SECTION

// ITERATE thru menuArray to display each menu item to the HTML
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
          <button class="add-btn" id="${item.id}" data-add="${item.id}">+</button>
        </div>
      </div>
    `;
  });
  return menuHtml;
};

//render current menu items to the page
function renderMenu() {
  document.getElementById("menu-container").innerHTML = getMenuHtml();
};

renderMenu();

//* ORDER SECTION

// Document event listener
document.addEventListener("click", (e) => {
  if (e.target.dataset.add) {
    getTargetObject(e.target.dataset.add);
  }
  else if (e.target.dataset.remove) {
    handleRemoveClick(e.target.dataset.remove);
  }
  if (e.target.id === "complete-btn") {
    displayModal();
  }
  else if (e.target.id === "pay-btn") {
    e.preventDefault();
    console.log('clicked');
  }
});

//* FILTER the selected menu item, send to new array
function getTargetObject(itemId) {
  const targetMenuObj = menuArray.find((item) => item.id === Number(itemId));
  if (targetMenuObj) {
    addItemToOrderArray(targetMenuObj);
  }
};

//* PUSH selected OrderObject to the currentOrder array and renderOrderlet currentOrderArray = [];()
function addItemToOrderArray(item) {
  const orderObj = {
    name: item.name,
    price: item.price,
    id: item.id,
    uuid: uuidv4(),
  };

  currentOrderArray.push(orderObj);
  renderOrder();

  console.log(currentOrderArray); //!REMOVE
};

//* FUNCTION to build the HTML for active orders
function getOrderHtml() {
  let orderHtml = "";

  currentOrderArray.forEach((item) => {
    orderHtml += `
        <div class="order-item">
          <div class="item-details">
            <h2 class="item-name">${item.name}</h2>
            <button class="remove-btn" data-remove="${item.uuid}">remove</button>
          </div>
          <div>
            <p class="item-price">$${item.price}</p>
          </div>
        </div>
      `;
  });
  return orderHtml;
};

//* Render user's order
function renderOrder() {
  if (currentOrderArray.length > 0) {
    document.getElementById("order-section").style.display = "block";
  } else {
    document.getElementById("order-section").style.display = "none";
  }
  document.getElementById("order-details").innerHTML = getOrderHtml();

  const totalPrice = calculateTotalPrice();
  document.getElementById("total-price").innerHTML = `$${totalPrice}`
};

//* CALCULATE total price and return value
function calculateTotalPrice() {
  let totalPrice = 0;

  currentOrderArray.forEach((item) => {
    totalPrice += item.price;
  });
  return totalPrice;
};

function handleRemoveClick(uuid) {
  const index = currentOrderArray.findIndex((item) => {
    return item.uuid === uuid;
  });
  currentOrderArray.splice(index, 1);
  renderOrder();
  console.log(currentOrderArray); //! REMOVE
};

//* UNHIDE PAYMENT MODAL
function displayModal() {
  document.getElementById("modal-section").style.display = "block";
  document.body.style.backgroundColor = "#DEDEDE";
}





//todo: pay modal prevent default, then action; thank you screen; timeout to reset page; local storage

//* SAVE OrderObject to Local Storage
// if(currentOrderArray.length > 0){
//   localStorage.setItem("order", JSON.stringify(currentOrderArray));
// }

// //* GET OrderObject from Local Storage
// function getLocalStorage(object) {
//   currentOrderArray = JSON.parse(localStorage.getItem("order"));
// }
