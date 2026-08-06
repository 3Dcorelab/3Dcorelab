let cart = [];
const phoneNumber = "905516305006";
let currentCategory = "anahtarlik";
/* ================= KATEGORİ ================= */
function showCategory(category, button) {
  currentCategory = category;
  document.querySelectorAll(".products").forEach(section => {
    section.classList.remove("active");
  });
  const selected =
    document.getElementById(category);
  if (selected) {
    selected.classList.add("active");
  }
  document.querySelectorAll(".category").forEach(item => {
    item.classList.remove("active");
  });
  if (button && button.classList.contains("category")) {
    button.classList.add("active");
  }
  const titles = {
    anahtarlik: [
      "ANAHTARLIKLAR",
      "Anahtarlık Modelleri"
    ],
    figur: [
      "FİGÜRLER",
      "Figürler"
    ],
    kilif: [
      "ÇAKMAK KILIFLARI",
      "Çakmak Kılıfları"
    ]
  };
  document.getElementById("categoryLabel")
    .textContent = titles[category][0];
  document.getElementById("categoryTitle")
    .textContent = titles[category][1];
  clearSearch();
}
/* ================= ARAMA ================= */
const searchInput =
  document.getElementById("productSearch");
searchInput.addEventListener("input", searchProducts);
function searchProducts() {
  const query =
    searchInput.value
      .toLocaleLowerCase("tr-TR")
      .trim();
  const current =
    document.getElementById(currentCategory);
  if (!current) return;
  const products =
    current.querySelectorAll(".product");
  products.forEach(product => {
    const name =
      (product.dataset.name || "")
        .toLocaleLowerCase("tr-TR");
    const text =
      product.innerText
        .toLocaleLowerCase("tr-TR");
    const found =
      name.includes(query) ||
      text.includes(query);
    product.style.display =
      found ? "" : "none";
  });
}
function clearSearch() {
  searchInput.value = "";
  searchProducts();
}
/* ================= SEPET ================= */
function addToCart(name, price) {
  const existing =
    cart.find(item =>
      item.name === name
    );
  if (existing) {
    existing.quantity++;
  } else {
    cart.push({
      name,
      price,
      quantity: 1
    });
  }
  updateCart();
  openCart();
}
function removeFromCart(index) {
  cart.splice(index, 1);
  updateCart();
}
function updateCart() {
  const items =
    document.getElementById("cartItems");
  const count =
    document.getElementById("cartCount");
  const totalElement =
    document.getElementById("cartTotal");
  let total = 0;
  let quantity = 0;
  if (cart.length === 0) {
    items.innerHTML =
      "<p>Sepetin boş.</p>";
  } else {
    items.innerHTML = "";
    cart.forEach((item, index) => {
      const itemTotal =
        item.price * item.quantity;
      total += itemTotal;
      quantity += item.quantity;
      const div =
        document.createElement("div");
      div.className =
        "cart-item";
      div.innerHTML = `
        <div>
          <strong>
            ${item.name}
          </strong>
          <br>
          <small>
            ${item.quantity} × ₺${item.price}
          </small>
        </div>
        <div>
          <strong>
            ₺${itemTotal}
          </strong>
          <button
            onclick="removeFromCart(${index})">
            ✕
          </button>
        </div>
      `;
      items.appendChild(div);
    });
  }
  count.textContent = quantity;
  totalElement.textContent =
    "₺" + total;
}
/* ================= SEPET PANELİ ================= */
function openCart() {
  document
    .getElementById("cartPanel")
    .classList.add("active");
  document
    .getElementById("overlay")
    .classList.add("active");
}
function closeCart() {
  document
    .getElementById("cartPanel")
    .classList.remove("active");
  document
    .getElementById("overlay")
    .classList.remove("active");
}
/* ================= WHATSAPP ================= */
function checkout() {
  if (cart.length === 0) {
    alert("Sepetin boş.");
    return;
  }
  let message =
    "Merhaba 3Dcorelab! 👋\n\n" +
    "Sipariş vermek istiyorum:\n\n";
  let total = 0;
  cart.forEach(item => {
    const itemTotal =
      item.price * item.quantity;
    total += itemTotal;
    message +=
      "🛍️ " +
      item.name +
      " × " +
      item.quantity +
      " = ₺" +
      itemTotal +
      "\n";
  });
  message +=
    "\n💰 Toplam: ₺" +
    total +
    "\n\n" +
    "Sipariş hakkında bilgi almak istiyorum.";
  window.open(
    "https://wa.me/" +
    phoneNumber +
    "?text=" +
    encodeURIComponent(message),
    "_blank"
  );
}
/* ================= BAŞLANGIÇ ================= */
updateCart();
