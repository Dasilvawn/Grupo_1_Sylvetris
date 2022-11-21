const setQuantityIcon = () => {
  const cart = JSON.parse(localStorage.getItem("carrito"));
  const quantity_cart = document.querySelectorAll(".number_cart");
  let quantity = cart.length;

  if (quantity > 0)
    for (let i = 0; i < quantity_cart.length; i++) {
      quantity_cart[i].innerHTML = quantity;
    }
};

setQuantityIcon();
