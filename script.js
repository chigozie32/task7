const menuItems = [
   {
    id: 1,
    name: "Jollof Rice",
    description: "Spicy tomato rice with veggies.",
    price: 1200,
    image: "images/jollof.jpg",
  },
  {
    id: 2,
    name: "Egusi Soup",
    description: "Melon seed soup with assorted meat.",
    price: 2000,
    image: "images/egusi.jpg",
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
    image: "images/moimoi.jpg",
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
    image: "images/okpa.jpg",
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

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const menu = document.getElementById("menu");
const cartItems = document.getElementById("cart-items");
const totalDisplay = document.getElementById("total");
const customAlert = document.getElementById("customAlert");
const alertOkBtn = document.getElementById("alertOkBtn");
const submitBtn = document.getElementById("submitBtn");
const printBtn = document.getElementById("printBtn");
const popup = document.getElementById("addedPopup");

// Display menu
menuItems.forEach((item) => {
  const card = document.createElement("div");
  card.className = "food-card";
  card.innerHTML = `
    <img src="${item.image}" alt="${item.name}" />
    <h3>${item.name}</h3>
    <p>${item.description}</p>
    <p><strong>₦${item.price}</strong></p>
    <button onclick="addToCart(${item.id})">Add to Plate</button>
  `;
  menu.appendChild(card);
});

function addToCart(id) {
  const item = menuItems.find((food) => food.id === id);
  const existing = cart.find((food) => food.id === id);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...item, quantity: 1 });
  }

  showPopup();
  updateCart();
  saveCart();
}

function updateCart() {
  cartItems.innerHTML = "";

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

function increaseQty(id) {
  const item = cart.find((i) => i.id === id);
  if (item) {
    item.quantity++;
    updateCart();
    saveCart();
  }
}

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

// printBtn.addEventListener("click", () => {
//   if (cart.length === 0) {
//     alert("🛑 No items to print.");
//     return;
//   }
  
//   window.print();
// });

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


//slide start
let currentSlide = 0;

const slides = 
document.querySelector('.slides');
const totalSlides = document.querySelectorAll('.slide').length;
const dotsContainer = document.querySelector( '.dots');

//Generate dots
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
    // const offset = -currentSlide * 400;
    // `translateX(${offset}px)`;
    // console.log("Current offset:", offset)

    //Updates dots
    dots.forEach(dot => 
        dot.classList.remove('active'));

    dots[currentSlide].classList.add('active');
}

//Auto slide every 3 seconds
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