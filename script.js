function order(productName) {
  const phone = "905516305006";

  const message =
    "Merhaba 3DCoreLab! 👋\n\n" +
    "Şu ürün hakkında bilgi almak/sipariş vermek istiyorum:\n" +
    "🛍️ " + productName;

  const url =
    "https://wa.me/" +
    phone +
    "?text=" +
    encodeURIComponent(message);

  window.open(url, "_blank");
}
