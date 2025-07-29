// Data for  the food menu that will be displayed
const menuItems = [
   {
    id: 1,
    name: "Jollof Rice",
    description: "Spicy tomato rice with veggies.",
    price: 1200,
    image: "images/Jollof.jpg",
  },
  {
    id: 2,
    name: "Egusi Soup",
    description: "Melon seed soup with assorted meat.",
    price: 2000,
    image: "images/Egusi.jpg",
  },
   {
    id: 3,
    name: "Okro Soup",
    description: "Delicious okro soup with natural ingredients.",
    price: 1500,
    image: "images/Okro.jpg",
  },
 {
    id: 4,
    name: "Suya",
    description: "Nigerian made autentic spicied suya.",
    price: 1500,
    image: "images/Suya.jpg",
  },
  {
    id: 5,
    name: "Moi Moi",
    description: "Delicious steamed bean pudding.",
    price: 1800,
    image: "images/Moimoi.jpg",
  },
 
  {
    id: 6,
    name: "Nkwobi",
    description: "Well prepared saucy and delicious Nkwobi.",
    price: 1300,
    image: "images/Nkwobi.jpg",
  },
  {
    id: 7,
    name: "Okpa & Pap",
    description: "Steamed bambara nut pudding and pap.",
    price: 2100,
    image: "images/Okpa.jpg",
  },
  {
    id: 8,
    name: "Pepper Soup",
    description: "Goat meat pepper soup",
    price: 2000,
    image: "images/Pepper.jpg",
  },
  {
    id: 9,
    name: "Abacha",
    description: "Healthy and delicious abacha with fish and kpomo",
    price: 2000,
    image: "images/Abacha.jpg",
  },
  {
    id: 10,
    name: "Kpomo",
    description: "Well preapered cow skin and dekicious oil sauce",
    price: 1700,
    image: "images/Kpomo.jpg",
  },
];
// Load saved cart items from local storage (if any) or start with an empty array
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// get refrences to DOM element by  their IDs

// gets the menu container where food cards will be displayed 
const menu = document.getElementById("menu");

// This gets the total display where selected cart-items will be shown
const cartItems = document.getElementById("cart-items");

// gets the total display element to show the total price
const totalDisplay = document.getElementById("total");

// gets the custom alert element (the pop uop)
const customAlert = document.getElementById("customAlert");

// gets the ok button inside to alert pop up
const alertOkBtn = document.getElementById("alertOkBtn");

// get the submitt button element for placing the order
const submitBtn = document.getElementById("submitBtn");

//get the print button to allow printing the order
const printBtn = document.getElementById("printBtn");

//get the popup that shows a message when an item is added to cart
const popup = document.getElementById("addedPopup");

// Display menu(Loops through each food items and create a card for it)
menuItems.forEach((item) => {

  // creates a new div element for the food cart
  const card = document.createElement("div");

  //adds a class name to the card for styling(from css)
  card.className = "food-card";

  // Fills the card with image, name, description, price, and button
  card.innerHTML = `
    <img src="${item.image}" alt="${item.name}" />
    <h3>${item.name}</h3>
    <p>${item.description}</p>
    <p><strong>₦${item.price}</strong></p>
    <button onclick="addToCart(${item.id})">Add to Plate</button>
  `;

  // add this card to the menu container in the Html
  menu.appendChild(card);
});

// this function adds a food item to the cart using it's id
function addToCart(id) {
  //finds the food item in the menuItems array by matching the ID 
  const item = menuItems.find((food) => food.id === id);

  // checks if the item is already in the cart
  const existing = cart.find((food) => food.id === id);

  // if the item is in the cart it increases it's quantity
  if (existing) {
    existing.quantity += 1;
  } else {

    // if it's a new item, set its quantity to 1 and add it to the cart
    cart.push({ ...item, quantity: 1 });
  }

  //shows a brief confirmation message
  showPopup();

  // update the cart display
  updateCart();

  //save cart
  saveCart();
}

//this function updates the cart display and total 
function updateCart() {

  //clear what ever is already inside the cart container
  cartItems.innerHTML = "";

//loop through every item in the cart to show  it on the page
  cart.forEach((item) => {
    
    const li = document.createElement("li");
    li.innerHTML = `
      <div><strong>${item.name}</strong> - ₦${item.price} x ${item.quantity}</div>
      <div class="quantity-buttons">
        <button onclick="decreaseQty(${item.id})">-</button>
        <span>${item.quantity}</span>
        <button onclick="increaseQty(${item.id})">+</button>
      </div>
    `;
    cartItems.appendChild(li);
  });

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  totalDisplay.textContent = total;
}

//add 1 to the current quantity
function increaseQty(id) {
  const item = cart.find((i) => i.id === id);
  if (item) {
    item.quantity++;

//refresh the cart to show the new quantity and total
    updateCart();
    saveCart();
  }
}
  

//this function descrease the quantity of a cart item by 1
function decreaseQty(id) {
  const item = cart.find((i) => i.id === id);
  if (item && item.quantity > 1) {
    item.quantity--;
  } else {
    cart = cart.filter((i) => i.id !== id);
  }
  updateCart();
  saveCart();
}

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function showPopup() {
  popup.classList.remove("hidden");
  setTimeout(() => popup.classList.add("hidden"), 1000);
}
//this pops up when you try submitting with no other selected
submitBtn.addEventListener("click", () => {
  if (cart.length === 0) {
    alert("🛑 Please add something to your plate first.");
    return;
  }

  // Show loading...
  submitBtn.disabled = true;
  submitBtn.innerText = "Submitting...";
  setTimeout(() => {
    submitBtn.disabled = false;
    submitBtn.innerText = "Submit Order";

    // Show success alert
    customAlert.classList.remove("hidden");

    // Show estimated delivery
    const deliveryTime = Math.floor(Math.random() * 15) + 10;
    // const deliveryTime = `30-45`;
    const message = `🎉 Order submitted successfully!<br>Your meal will be ready in about ${deliveryTime} mins.`;
    customAlert.querySelector("p").innerHTML = message;

    // Reset cart
    cart = [];
    updateCart();
    saveCart();
  }, 2000);
});

alertOkBtn.addEventListener("click", () => {
  customAlert.classList.add("hidden");
});

// 5. Print order
document.getElementById("printBtn").addEventListener("click", () => {
  if (cart.length === 0) {
    alert("No items to print.");
    return;
  }

  const printWindow = window.open("", "", "width=600,height=400");
  printWindow.document.write("<h2>🧾 Order Summary</h2><ul>");
  cart.forEach(item => {
    printWindow.document.write(`<li>${item.name} - ₦${item.price} x ${item.quantity}</li>`);
  });
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  printWindow.document.write(`</ul><p><strong>Total: ₦${total}</strong></p>`);
  printWindow.document.close();
  printWindow.print();
});

// Initial load
updateCart();


//slide start (For the automatic image slider)
let currentSlide = 0;

const slides = 
document.querySelector('.slides');
const totalSlides = document.querySelectorAll('.slide').length;
const dotsContainer = document.querySelector( '.dots');

//Generate dots to allow you manually coontrol the image that shows on the slide
for (let i = 0; i < totalSlides; i++)
{
    const dot = document.createElement('span');
    dot.classList.add('dot');
    dot.addEventListener('click', () =>
    {
        showSlide(i);
        resetAutoSlide();
});
dotsContainer.appendChild(dot);
}

const dots = document.querySelectorAll('.dot');

function showSlide(index) {
    const slideWidth = document.querySelector('.slide').offsetWidth;
    if (index < 0) index = totalSlides - 1;
    if (index >= totalSlides) index = 0;

    currentSlide = index;
    // const slideWitdth = document.querySelector('.slide').offsetWidth;
    const offset = -currentSlide * slideWidth;
    slides.style.transform = 
    `translateX(${offset}px)`;
    //Updates dots
    dots.forEach(dot => 
        dot.classList.remove('active'));

    dots[currentSlide].classList.add('active');
}

//Auto slide every 2 seconds
let slideInterval = setInterval(() =>
{
    showSlide (currentSlide + 1);
}, 2000);

function resetAutoSlide() {
    clearInterval(slideInterval);
    slideInterval = setInterval(() => {
        showSlide(currentSlide + 1);
    }, 2000);
}

//start
showSlide(0);
//slide end