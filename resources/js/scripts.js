const cartQty = document.getElementById("cart-qty")
const cartTotal = document.getElementById("cart-total")
const itemList = document.getElementById("item-list");
itemList.innerHTML = '<li> Hello World</li>'
console.log(itemList)

const itemsContainer = document.getElementById("items");
import data from "./data.js";

const cart = [];

itemList.onchange = function (e) {
  if (e.target && e.target.classList.contains("update")) {
    const name = e.target.dataset.name;
    const qty = parseInt(e.target.value);
    updateCart(name, qty);
  }
};

itemList.onclick = function (e) {
  if (e.target && e.target.classList.contains("remove")) {
    const name = e.target.dataset.name;
    removeItem(name);
  } else if (e.target && e.target.classList.contains("add-one")) {
    const name = e.target.dataset.name;
    addItem(name);
  } else if (e.target && e.target.classList.contains("remove-one")) {
    const name = e.target.dataset.name;
    removeItem(name, 1);
  }
};

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
    ${name} $${price} x ${qty} = ${qty * price} 
    <button class="remove" data-name="${name}">Remove</button>
    <button class="add-one" data-name="${name}">+</button>
    <button class="remove-one" data-name="${name}">-</button>
    <input class="update" type="number" data-name="${name}">
  </li>`;

  }

  const all_items_button = Array.from(document.querySelectorAll("button"));

  all_items_button.forEach((elt) =>
  elt.addEventListener("click", () => {
    addItem(elt.getAttribute("id"), elt.getAttribute("data-price"));
    showItems();
  })
);

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

function updateCart(name, qty) {
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].name === name) {
      if (qty < 1) {
        removeItem(name);
        return;
      }
      cart[i].qty = qty;
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
