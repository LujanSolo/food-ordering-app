import { menuArray } from "./data.js";



menuArray.forEach((item) => {
  let menu = document.getElementById('menu-container');
  menu.innerHTML += `
    <div class="menu-item">
      <div class="menu-icon">
        <i class="item-icon" alt="An icon representing ${item.name}">${item.emoji}</i>
      </div>
      <div class="menu-detail">  
        <h2 class="item-name">${item.name}</h2>
        <p class="item-ingredients">${item.ingredients.join(", ")}</p>
        <h3 class="item-price">$${item.price}</h3>
      </div>
      <div class="add-item-btn">  
        <button class="add-btn" id="add-btn" data-add="${item.id}">+</button>
      </div>
    </div>
  `;
});

document.addEventListener('click', (e) => {
  //event listener for ADD ITEM with unique id
  if (e.target.dataset.add) {
    console.log('clicked')
  }

  //event listener for ORDER BUTTON

  //event listener for REMOVE ITEM

  //event listener for PURCHASE ORDER
})

function addItemToOrder() {
  // document.getElementById('order-container').classList.toggle('hidden')
  //todo: Build dynamic section for Ordered Items, default set to "display: hidden"

}