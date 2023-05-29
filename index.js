import { menuArray } from "./data.js";
let menu = document.getElementById('menu-container');


menuArray.forEach((item) => {
  menu.innerHTML += `
    <div class="menu-item">
      <i class="item-icon" alt="An icon representing ${item.name}">${item.emoji}</i>
      <h2>${item.name}</h2>
      <p>${item.ingredients}</p>
      <h3>${item.price}</h3>
      <button class="add-btn" id="add-btn">+</button>
    </div>
  `;
});
