import { menuArray } from "./data.js";
import { v4 as uuidv4 } from "https://jspm.dev/uuid";

let currentOrderArray = [];
const modalSection = document.getElementById("modal-section");

window.addEventListener('load', () => {
  if(localStorage.getItem("order")){
    currentOrderArray = JSON.parse(localStorage.getItem("order"));
  };
  
  renderOrder();
  console.log(currentOrderArray)
});

// Document event listener
document.addEventListener("click", (e) => {
  if (e.target.dataset.add) {
    getTargetObject(e.target.dataset.add);
  } else if (e.target.dataset.remove) {
    handleRemoveClick(e.target.dataset.remove);
  }
  if (e.target.id === "complete-btn") {
    revealModal();
    console.log("clicked");
  }
  else if (e.target.id === "pay-btn") {
    e.preventDefault();
    handlePaymentClick();
  }
});

//* MENU SECTION
// ITERATE thru menuArray to display each menu item to the HTML
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
          <button type="button" class="add-btn" id="${item.id}" data-add="${item.id
      }">+</button>
        </div>
      </div>
    `;
  });
  return menuHtml;
}

//render current menu items to the page
function renderMenu() {
  document.getElementById("menu-container").innerHTML = getMenuHtml();
}
renderMenu();

//* ORDER SECTION
// FILTER the SELECTED ITEM by ID
function getTargetObject(itemId) {
  const targetMenuObj = menuArray.find((item) => item.id === Number(itemId));
  if (targetMenuObj) {
    addItemToOrderArray(targetMenuObj);
  }
}

// PUSH ITEM TO NEW ARRAY, RENDER ORDER CALLED
function addItemToOrderArray(item) {
  const orderObj = {
    name: item.name,
    price: item.price,
    id: item.id,
    uuid: uuidv4(),
  };
  currentOrderArray.push(orderObj);
  localStorage.setItem("order", JSON.stringify(currentOrderArray));
  renderOrder();
}

//* FUNCTION to build the HTML for active orders
function getOrderHtml() {
  let orderHtml = "";
  currentOrderArray.map((item) => {
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
}

//* RENDER USER ORDER
function renderOrder() {
  
  if (currentOrderArray.length > 0) {
    document.getElementById("order-section").style.display = "block";
  } else {
    document.getElementById("order-section").style.display = "none";
  }
  document.getElementById("order-details").innerHTML = getOrderHtml();

  const totalPrice = calculateTotalPrice();
  document.getElementById("total-price").innerText = `$${totalPrice}`;
}

//* CALCULATE total price and return value
function calculateTotalPrice() {
  let totalPrice = 0;
  currentOrderArray.forEach((item) => {
    totalPrice += item.price;
  });
  return totalPrice;
}

//* REMOVE BUTTON CLICK
function handleRemoveClick(uuid) {
  const index = currentOrderArray.findIndex((item) =>  item.uuid === uuid);
  currentOrderArray.splice(index, 1);
  localStorage.setItem("order", JSON.stringify(currentOrderArray));
  renderOrder();
};

//* PAYMENT MODAL
function revealModal() {
  modalSection.style.display = "block";
  document.body.style.backgroundColor = "#DEDEDE";
}

function hideModal() {
  modalSection.style.display = "none";
  document.body.style.backgroundColor = "#ffffff";
}

function handlePaymentClick() {
  const paymentForm = document.getElementById("payment-form");
  const paymentFormData = new FormData(paymentForm);
  const name = paymentFormData.get("guest-name");

  if (paymentForm.checkValidity()) {
    document.getElementById("thanks-text").innerText = `
      Thank you, ${name}! Your order is on its way.
    `;

    hideModal();
    
    document.getElementById("thanks-box").style.display = "flex";
    document.getElementById("order-section").style.display = "none";

    setTimeout(() => {
      location.reload();
    }, 6000);
  } else {
    paymentForm.reportValidity();
  };
};
