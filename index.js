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
  else if (e.target.dataset.remove) {
    handleRemoveClick(e.target.dataset.remove);
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
        <div class="order-item" id="${item.uuid}">
          <div class="item-details">
            <h2 class="item-name">${item.name}</h2>
            <button class="remove-btn" data-remove="${item.uuid}">remove</button>
          </div>
          <div>
            <p class="item-price">$${item.price}</p>
          </div>
        </div>
      `
  });
  return orderHtml;
}

//* Render user's order
function renderOrder() {
  if (currentOrderArray.length > 0) {
    document.getElementById('order-section').style.display = 'block';
  }
  else {
    document.getElementById('order-section').style.display = 'none';
  }

  document.getElementById("order-details").innerHTML = getOrderHtml();
}

function handleRemoveClick(uuid) {
  const targetOrderObject = currentOrderArray.filter((item) => {
    return item.uuid == uuid
  })[0];

  console.log(targetOrderObject)

  currentOrderArray.splice(targetOrderObject);
  renderOrder();
  console.log(currentOrderArray)
}


//todo - Hide order div until something is added to the array
//todo: remove button functionality, tied to UUID of item
//todo: total price function and js --> html insertion
//todo: pay modal; thank you screen; timeout to reset page

//* SAVE OrderObject to Local Storage
// if(currentOrderArray.length > 0){
//   localStorage.setItem("order", JSON.stringify(currentOrderArray));
// }

// //* GET OrderObject from Local Storage
// function getLocalStorage(object) {
//   currentOrderArray = JSON.parse(localStorage.getItem("order"));
// }

