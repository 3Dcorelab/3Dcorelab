let cart = [];

const phoneNumber = "905516305006";


/* ================= ARAMA ================= */

function openSearch() {
  document.getElementById("searchBox").classList.add("active");

  document.getElementById("searchInput").focus();
}


function closeSearch() {
  document.getElementById("searchBox").classList.remove("active");

  document.getElementById("searchInput").value = "";

  searchProducts();
}


function searchProducts() {

  const input = document
    .getElementById("searchInput")
    .value
    .toLowerCase()
    .trim();

  const products = document.querySelectorAll(".product-card");

  products.forEach(product => {

    const name =
      product.dataset.name.toLowerCase();

    if (name.includes(input)) {
      product.style.display = "";
    } else {
      product.style.display = "none";
    }

  });
}


/* ================= KATEGORİLER ================= */

function toggleCategory(id, button) {

  const section =
    document.getElementById(id);

  const isOpen =
    section.classList.contains("open");


  /* Önce bütün kategorileri kapat */

  document
    .querySelectorAll(".category-products")
    .forEach(item => {

      item.classList.remove("open");

    });


  document
    .querySelectorAll(".category-card")
    .forEach(item => {

      item.classList.remove("active");

    });


  /* Tıklanan kapalıysa aç */

  if (!isOpen) {

    section.classList.add("open");

    button.classList.add("active");

    setTimeout(() => {

      section.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

    }, 50);

  }

}


function closeCategory(id) {

  const section =
    document.getElementById(id);

  section.classList.remove("open");


  document
    .querySelectorAll(".category-card")
    .forEach(item => {

      item.classList.remove("active");

    });


  document
    .getElementById("kategoriler")
    .scrollIntoView({
      behavior: "smooth",
      block: "start"
    });

}


/* ================= SEPET ================= */

function addToCart(name, price) {

  const existingProduct =
    cart.find(product =>
      product.name === name
    );


  if (existingProduct) {

    existingProduct.quantity++;

  } else {

    cart.push({
      name: name,
      price: price,
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

  const cartItems =
    document.getElementById("cartItems");

  const cartCount =
    document.getElementById("cartCount");

  const cartTotal =
    document.getElementById("cartTotal");


  let total = 0;
  let count = 0;


  if (cart.length === 0) {

    cartItems.innerHTML = `
      <p class="empty-cart">
        Sepetin şu anda boş.
      </p>
    `;

  } else {

    cartItems.innerHTML = "";


    cart.forEach((product, index) => {

      const productTotal =
        product.price * product.quantity;


      total += productTotal;

      count += product.quantity;


      const item =
        document.createElement("div");


      item.className =
        "cart-item";


      item.innerHTML = `

        <div>

          <strong>
            ${product.name}
          </strong>

          <br>

          <small>
            ${product.quantity} × ₺${product.price}
          </small>

        </div>

        <div>

          <strong>
            ₺${productTotal}
          </strong>

          <button
            onclick="removeFromCart(${index})">
            ✕
          </button>

        </div>

      `;


      cartItems.appendChild(item);

    });

  }


  cartCount.textContent = count;

  cartTotal.textContent =
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


  cart.forEach(product => {

    const productTotal =
      product.price * product.quantity;


    total += productTotal;


    message +=
      "🛍️ " +
      product.name +
      " × " +
      product.quantity +
      " = ₺" +
      productTotal +
      "\n";

  });


  message +=
    "\n💰 Toplam: ₺" +
    total +
    "\n\n" +
    "Sipariş hakkında bilgi almak istiyorum.";


  const whatsappURL =
    "https://wa.me/" +
    phoneNumber +
    "?text=" +
    encodeURIComponent(message);


  window.open(
    whatsappURL,
    "_blank"
  );

}


/* ================= BAŞLANGIÇ ================= */

updateCart();
