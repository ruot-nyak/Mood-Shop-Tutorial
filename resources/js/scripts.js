const itemsContainer = document.getElementById("items");
import data from "./data.js";

for (let i = 0; i < data.length; ++i) {
  let newDiv = document.createElement("div");
  newDiv.className = "item";

  // create an image element
  let img = document.createElement("img");

  img.src = data[i].image;
  img.width = 300;
  img.height = 300;

  newDiv.appendChild(img);

  itemsContainer.appendChild(newDiv);

  let desc = document.createElement("p");

  desc.innerText = data[i].desc;

  newDiv.appendChild(desc);

  let price = document.createElement("P");
  price.innerText = data[i].price;
  newDiv.appendChild(price);

  let button = document.createElement("button");
  button.id = data[i].name;

  button.dataset.price = data[i].price;
  button.innerHTML = "Add to Cart";
  newDiv.appendChild(button);

  itemsContainer.appendChild(newDiv);
}

const cart = [];

const a = 999
const obj = { a };

console.log(obj)
console.log("*****************")

function addItem(name, price) {
  for (let i = 0; i < cart.length; i += 1) {
    if (cart[i].name === name) {
      cart[i].qty += 1;
      return;
    }
  }
  const item = { name: name, price: price, qty: 1 };
  cart.push(item);
}

function showItems() {
  const qty = getQty()
  console.log(`You have ${getQty()} items in your cart`);

  for (let i = 0; i < cart.length; i += 1) {
    console.log(`${cart[i].name} ${cart[i].price} * ${cart[i].qty} `);
  }

const total = getTotal()
  console.log(`Total in cart: $${getTotal()}`);
}

function getQty() {
  let qty = 0;
  for (let i = 0; i < cart.length; i += 1) {
    qty += cart[i].qty;
  }
  return qty 
}

function getTotal() {
  let total = 0;
  for (let i = 0; i < cart.length; i += 1) {
    total += cart[i].price * cart[i].qty;
  }
  return total.toFixed(2)
}

addItem("happy", 5.99);
addItem("sad", 5.99);
addItem("angry", 5.99);
addItem("happy", 5.99);
addItem("curious", 5.99);
addItem("happy", 5.99);
addItem("sad", 5.99);

showItems();
