function selector(element) {
  return document.getElementById(element);
}

const formatPrice = ( value) => {

  // Crear formateador
  const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
  })
  //lo pasamos de euros a pesos
  return formatter.format( value ) ; //$2,500.00
}

let product_title = selector("product_title"),
  product_id = selector("product_id"),
  product_price = selector("product_price"),
  product_quantity = selector("product_quantity"),
  product_subtract = selector("product_subtract"),
  product_add = selector("product_add"),
  cart_add = selector("cart_add"),
  product_text_price = selector("product_text_price");
  products_cart = selector("products_cart");

// inicializamos el carrito
let cart = [];
if (localStorage.getItem("carrito")) {
  cart = JSON.parse(localStorage.getItem("carrito"));
}

document.addEventListener("DOMContentLoaded", (e) => {
  fetchData();
});

const fetchData = async () => {
  let paths = window.location.pathname.split("/");
  let id = paths[paths.length - 1];

  const response = await fetch(`/productos/api/detalle/${id}`);
  const { product } = await response.json();

  addProductToCart(product);
  
};

const addProductToCart = (product) => {
  let counter = 1;
  let unitPrice = product.precio;
  let totalPrice = product.precio;

  product_add.addEventListener("click", function (e) {
    counter++;
    totalPrice = unitPrice * counter;
    product_quantity.innerHTML = counter;
    product_price.innerHTML = formatPrice(totalPrice);
    product_text_price.innerHTML = "Precio total";
  });

  product_subtract.addEventListener("click", function (e) {
    if (counter > 1) {
      counter--;
      totalPrice = unitPrice * counter;
      product_quantity.innerHTML = counter;
      product_price.innerHTML = formatPrice(totalPrice);
      product_text_price.innerHTML = "Precio total";
    }
  });

  cart_add.addEventListener("click", function (e) {
    let productAddToCart = {
      id: product.id,
      title: product.nombre,
      quantity: counter,
      price: totalPrice,
      img: product.images[0].filename,
    };
    cart.push(productAddToCart);

    localStorage.setItem("carrito", JSON.stringify(cart));
    window.location.replace("/productos/carrito");
  });
};

const setQuantityIconCart = () => {
  const cart = JSON.parse(localStorage.getItem("carrito"));
  const quantity_cart = document.querySelectorAll(".number_cart");
  let quantity = cart.length;

  if (quantity > 0)
    for (let i = 0; i < quantity_cart.length; i++) {
      quantity_cart[i].innerHTML = quantity;
    }
};


