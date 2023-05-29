import { menuArray } from "./data.js";
let menu = document.getElementById('menu-container');


menuArray.forEach((item) => {
  menu.innerHTML += `
    <div class="menu-item">
      <div class="menu-icon">
        <i class="item-icon" alt="An icon representing ${item.name}">${item.emoji}</i>
      </div>
      <div class="menu-detail">  
        <h2>${item.name}</h2>
        <p class="ingredients">${item.ingredients}</p>
        <h3>$${item.price}</h3>
      </div>
      <div class="add-item-btn">  
        <button class="add-btn" id="add-btn">+</button>
      </div>
    </div>
  `;
});
