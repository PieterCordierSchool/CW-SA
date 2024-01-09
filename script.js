const menuIcon = document.querySelector(".hamburger-menu");
const navbar = document.querySelector(".navbar");

menuIcon.addEventListener("click", () => {
  navbar.classList.toggle("change");
});


function creditCardValidation(creditCradNum) {
  var regEx = /^5[1-5][0-9]{14}$|^2(?:2(?:2[1-9]|[3-9][0-9])|[3-6][0-9][0-9]|7(?:[01][0-9]|20))[0-9]{12}$/;
  if (creditCradNum.value.match(regEx)) {
    return true;
  }
  else {
    alert("Please enter a valid credit card number.");
    return false;
  }
}



// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}



function opennav() {
  document.getElementById("slidenav").style.width = "220px";
  document.getElementById("menuicon").style.display = "none";
  document.getElementById("trolley1").style.display = "none";
  document.getElementById("trolley2").style.display = "none";
  document.getElementById("trolley3").style.display = "none";
  document.getElementById("trolley4").style.display = "none";
  document.getElementById("trolley5").style.display = "none";
  document.getElementById("trolley6").style.display = "none";
  document.getElementById("trolley7").style.display = "none";
  document.getElementById("trolley8").style.display = "none";
}

function closenav() {
  document.getElementById("slidenav").style.width = "0";
  document.getElementById("menuicon").style.display = "block";
  document.getElementById("trolley1").style.display = "inline";
  document.getElementById("trolley2").style.display = "inline";
  document.getElementById("trolley3").style.display = "inline";
  document.getElementById("trolley4").style.display = "inline";
  document.getElementById("trolley5").style.display = "inline";
  document.getElementById("trolley6").style.display = "inline";
  document.getElementById("trolley7").style.display = "inline";
  document.getElementById("trolley8").style.display = "inline";
}

//get the Nav Elements
const carts = document.querySelectorAll('.trolley');


//Array of Shop items 
let products = [

  {
      name: 'Billy J Sport Leather', 
      tag: 'Billy J Sport Leather', 
      price: 3800.00,
      inCart: 0,
      oldQty: 0
  },
  {
      name: 'Billy J Snuff 2 Tone Leather', 
      tag: 'Billy J Snuff 2 Tone Leather', 
      price: 4200.00,
      inCart: 0,
      oldQty: 0
  },
  {
      name: 'Bj Classic Leather',
      tag: 'Bj Sport Leather Jacket', 
      price: 3000.00,
      inCart: 0, oldQty: 0
  },
  {
      name: 'Bj Sport Leather Jacket', 
      tag: 'Bj Sport Leather Jacket', 
      price: 3500.00,
      inCart: 0, oldQty: 0
  },
  {
      name: 'Black bj Jacket', 
      tag: 'Black bj Jacket', 
      price: 4000.00,
      inCart: 0, oldQty: 0
  },
  {
      name: 'Choc Leather Bag', 
      tag: 'Choc Leather Bag', 
      price: 3850.00,
      inCart: 0, oldQty: 0
  },
  {
      name: 'Brown Leather Bag', 
      tag: 'Brown Leather Bag', 
      price: 2775.00,
      inCart: 0, oldQty: 0

  },
  {
      name: 'SA Biker Jacket', 
      tag: 'SA Biker Jacket', 
      price: 3950.00,
      inCart: 0,
      oldQty: 0
  }

];

//Add eventListeners to Buttoms 
for (let i =0; i < carts.length; i++){ 
  carts[i].addEventListener('click', ()=>{ 
      addCart(products[i]); 
      cartVisible();
   }); 
  }

//Add to cart
function addCart(product) {
  let cartItems = sessionStorage.getItem('productsInCart'); cartItems = JSON.parse(cartItems);

  if (cartItems != null) {

      if (cartItems[product.tag] == undefined) {
          cartItems = {
              ...cartItems, [product.tag]: product
          }
      }
      cartItems[product.tag].inCart += 1;
  }
  else {
      product.inCart = 1; cartItems = {
          [product.tag]: product
      }
  }

  sessionStorage.setItem('productsInCart', JSON.stringify(cartItems)); totalCost(product);
  displayCart();

}

//Total cost
function totalCost(product) {
  let cartCost = sessionStorage.getItem('totalCost');


  if (cartCost != null) {
      cartCost = parseFloat(cartCost); sessionStorage.setItem('totalCost', cartCost + product.price);
  }
  else {
      sessionStorage.setItem('totalCost', product.price);
  }
}

// Display cart 
function displayCart() {
  let cartItems = sessionStorage.getItem('productsInCart'); let cartDisplay = document.getElementById('cartDisplay'); let subTotal = document.getElementById('bottom'); cartItems = JSON.parse(cartItems);
  let cartCost = parseFloat(sessionStorage.getItem('totalCost'));


  if (cartItems) {
      cartDisplay.innerHTML = '';
      Object.values(cartItems).map(item => {
          cartDisplay.innerHTML += `<li title="${item.tag}">
  <p>${item.name}</p>
  <input type="number" value="${item.inCart}" onchange="updateItem(event)">
  <button onclick="removeItem(event)"><span class="fas fa- times">X</span></button>
  R<p>${item.price * item.inCart} </p>
  </li>`;




      });
      subTotal.innerHTML = ` <h4>SubTotal: R<span>${cartCost}</span></h4>
  <a href="checkOut.html" class="btn">Check Out</a>
  `;
  }
}


//Make cart visible 
function cartVisible() {
  let cart = document.getElementById('cart'); cart.style.display = 'block';
}
//Hide cart
function cartHidden() {
  let cart = document.getElementById('cart'); cart.style.display = 'none';
}

//Remove item from cart 
function removeItem(e){ 
  let itemTitle = e.target.parentElement.parentElement.title; 
  let totalItemCost = e.target.parentElement.parentElement.children[3].innerText; 
  e.target.parentElement.parentElement.remove(); 
  let productsInCart = JSON.parse(sessionStorage.getItem('productsInCart')); 
  delete productsInCart[itemTitle]; 
  sessionStorage.setItem('productsInCart', JSON.stringify(productsInCart)); 
  
  for (let i=0; i < products.length; i++){ 
    if (products[i].tag == itemTitle){ 
      products[i].inCart = 0; 
    } 
  } 
  updateTotalCost(totalItemCost); 
}

// Update cost
function updateTotalCost(totalItemCost) {
  let bottom = document.getElementById('bottom');
  let currentTotal = bottom.children[0].children[0].innerText; bottom.children[0].children[0].innerText = parseFloat(currentTotal) - parseFloat(totalItemCost);
  let sessionTotalCost = sessionStorage.getItem('totalCost'); sessionStorage.setItem('totalCost', parseFloat(sessionTotalCost) - parseFloat(totalItemCost));
}
//Update item cost 
function updateItem(e) {

  let newQty = e.target.value;
  let itemTitle = e.target.parentElement.title;

  let productsInCart = JSON.parse(sessionStorage.getItem('productsInCart')); productsInCart[itemTitle].oldQty = productsInCart[itemTitle].inCart; productsInCart[itemTitle].inCart = newQty;
  let productPrice = productsInCart[itemTitle].price;

  let newQtyAdded = newQty - productsInCart[itemTitle].oldQty; let newPriceToAdd = newQtyAdded * productPrice; console.log(newPriceToAdd);
  sessionStorage.setItem('productsInCart', JSON.stringify(productsInCart)); let currentTotal = parseFloat(sessionStorage.getItem('totalCost')); currentTotal += newPriceToAdd;
  sessionStorage.setItem('totalCost', currentTotal);

  let bottom = document.getElementById('bottom');
  let currentTotalOnCart = bottom.children[0].children[0].innerText; bottom.children[0].children[0].innerText = currentTotal;

  e.target.parentElement.children[3].innerText = productPrice * newQty;
}

//DisplayCart function on load 
displayCart();



function checkForm() {
  let yes = document.getElementById('yes'); let no = document.getElementById('no');
  let inputs = document.getElementsByTagName('input'); let flag;

  if (yes.checked && no.checked) {
      alert(' Please select only one option on our Terms and Condition!');
  }
  else if (no.unchecked && yes.unchecked) {
      alert('Please select at least one option on our Terms and Condition! ');
  }
  else if (no.checked) {
      alert('Please agree to our Terms and Condition!');
  }
  else if (yes.checked) {
      window.location.href = 'Thank You.html';
  }
}

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function () {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal 
span.onclick = function () {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it 
window.onclick = function (event) {
  if (event.target == modal) {
      modal.style.display = "none";
  }
}


function myFunction() {
  var myWindow = window.open("", "", "width=200,height=100");
}