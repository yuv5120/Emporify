let products = [
  { id: 1, name: "Wireless Headphones", price :2999, image: "images/headphones.jpg" },
  { id: 2, name: "Smart Watch", price: 100, image: "images/smartwatch.jpg" },
  { id: 3, name: "Bluetooth Speaker", price: 80, image: "images/speaker.jpg" },
];

// Wishlist and Cart
let wishlist = [];
let cart = [];

// DOM Elements
const productGrid = document.getElementById("productGrid");
const wishlistItems = document.getElementById("wishlistItems");
const cartItems = document.getElementById("cartItems");
const addProductForm = document.getElementById("addProductForm");
const merchantProducts = document.getElementById("merchantProducts");

// Load Products on Homepage
function loadProducts() {
  const exchangeRate = 1; 
  productGrid.innerHTML = ""; 
  products.forEach(product => {
    const productCard = document.createElement("div");
    productCard.classList.add("product-card");

    const priceInINR = product.price * exchangeRate;

    productCard.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>₹${priceInINR.toLocaleString()}</p> <!-- Display price in INR -->
      <button onclick="addToWishlist(${product.id})">Add to Wishlist</button>
      <button onclick="addToCart(${product.id})">Add to Cart</button>
    `;
    productGrid.appendChild(productCard);
  });
}

function scrollToProducts() {
  const productsSection = document.getElementById("products");
  window.scrollTo({
    top: productsSection.offsetTop, // Get the vertical offset of the products section
    behavior: "smooth" // Smooth scrolling
  });
}
loadProducts();

// Add to Wishlist
function addToWishlist(productId) {
  const product = products.find(p => p.id === productId);
  if (!wishlist.some(item => item.id === product.id)) {
    wishlist.push(product);
    alert(`${product.name} added to wishlist!`);
    updateWishlist();
  } else {
    alert(`${product.name} is already in your wishlist!`);
  }
}

// Remove from Wishlist
function removeFromWishlist(productId) {
  wishlist = wishlist.filter(item => item.id !== productId);
  alert("Item removed from wishlist!");
  updateWishlist();
}

// Update Wishlist UI
function updateWishlist() {
  wishlistItems.innerHTML = ""; // Clear previous content
  wishlist.forEach(item => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `
      ${item.name} - $${item.price}
      <button onclick="removeFromWishlist(${item.id})">Remove</button>
    `;
    wishlistItems.appendChild(listItem);
  });
}

// Add to Cart
function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  if (!cart.some(item => item.id === product.id)) {
    cart.push(product);
    alert(`${product.name} added to cart!`);
    updateCart();
  } else {
    alert(`${product.name} is already in your cart!`);
  }
}

// Remove from Cart
function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  alert("Item removed from cart!");
  updateCart();
}

// Update Cart UI
function updateCart() {
  cartItems.innerHTML = ""; // Clear previous content
  cart.forEach(item => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `
      ${item.name} - $${item.price}
      <button onclick="removeFromCart(${item.id})">Remove</button>
    `;
    cartItems.appendChild(listItem);
  });
}

// Merchant Panel: Add New Product
addProductForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("productName").value;
  const price = parseFloat(document.getElementById("productPrice").value);
  const image = document.getElementById("productImage").value;
  const description = document.getElementById("productDescription").value;

  if (!name || isNaN(price) || !image || !description) {
    alert("Please fill in all fields!");
    return;
  }

  const newProduct = { id: Date.now(), name, price, image, description };
  products.push(newProduct);

  // Update Merchant Product List
  const productItem = document.createElement("li");
  productItem.textContent = `${name} - $${price}`;
  merchantProducts.appendChild(productItem);

  alert("Product added successfully!");
  addProductForm.reset();
  loadProducts(); // Reload products on the homepage
});

  