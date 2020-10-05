const cartQty = document.getElementById("cart-qty")
const cartTotal = document.getElementById("cart-total")
const itemList = document.getElementById("item-list");
itemList.innerHTML = '<li> Hello World</li>'
console.log(itemList)

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

//-----------------------------------------------------------------------------------------------
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

//-----------------------------------------------------------------------------------------------
function showItems() {
  const qty = getQty()
  cartQty.innerHTML = `You have ${getQty()} items in your cart`;

  let itemStr = ''
  for (let i = 0; i < cart.length; i += 1) {
    // console.log(`${cart[i].name} ${cart[i].price} * ${cart[i].qty} `);

    const name = cart[i].name;
    const price = cart[i].price;
    const qty = cart[i].qty;

    itemStr += `<li>
    ${name} ${price} * ${qty}
     = ${qty} * ${price} </li>`
  }

  itemList.innerHTML = itemStr

  //-----------------------------------------------------------------------------------------------
const total = getTotal()
  cartTotal.innerHTML = `Total in cart: $${getTotal()}`;
}

//-----------------------------------------------------------------------------------------------
function getQty() {
  let qty = 0;
  for (let i = 0; i < cart.length; i += 1) {
    qty += cart[i].qty;
  }
  return qty 
}

//-----------------------------------------------------------------------------------------------

function getTotal() {
  let total = 0;
  for (let i = 0; i < cart.length; i += 1) {
    total += cart[i].price * cart[i].qty;
  }
  return total.toFixed(2)
}

//-----------------------------------------------------------------------------------------------
//remove items
function removeItem(name, qty = 0) {
  for (let i = 0; i < cart.length; i += 1) {
    if (cart[i].name === name){
      if (qty > 0 ) {
        cart[i].qty -= qty
      }
      if (cart[i].qty < 1 || qty === 0) {
      cart.splice(i, 1)
    }
      return
    }
  }
}

//-----------------------------------------------------------------------------------------------


addItem("happy", 5.99);
addItem("sad", 5.99);
addItem("angry", 5.99);
addItem("happy", 5.99);
addItem("curious", 5.99);
addItem("happy", 5.99);
addItem("sad", 5.99);

removeItem("happy", 1)
removeItem("curious")

showItems();
