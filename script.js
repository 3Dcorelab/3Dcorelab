function order(product, price){
  const text = `Merhaba 3DCoreLab, ${product} ürününü sipariş vermek istiyorum. Fiyat: ${price}.`;
  window.open("https://wa.me/905516305006?text=" + encodeURIComponent(text), "_blank");
}
