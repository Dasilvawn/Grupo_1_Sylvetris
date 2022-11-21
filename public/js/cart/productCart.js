function selector(element) {
  return document.getElementById(element);
}

let products_cart = selector("products_cart");
let cart_resume = selector("cart_resume");
let cart_empty = selector("cart_empty_container");

const rendeCart = () => {
  let cart = [];
  cart = JSON.parse(localStorage.getItem("carrito"));

  console.log(cart);
  cart.forEach((product) => {
    products_cart.innerHTML += `
          <article class="carrito_main_articulo_planta">
          <div class="planta">
            <img
              src="/images/products/${product.img}"
              alt="${product.title}"
            />
          </div>
  
          <div class="carrito_main_columna">
            <div class="carrito_main_fila">
              <p>${product.title}</p>
              <p id="delete_product_">X</p>
            </div>
  
            <div class="carrito_main_fila">
              <div class="carrito_main_boton_articulo">
                
                <p>Cant. ${product.quantity}</p>
                
              </div>
              <p>$${product.price * product.quantity}</p>
            </div>
  
            <div class="carrito_main_fila">
              <p>Unid. $${product.price}</p>
            </div>
          </div>
          
          
          <div class="carrito_main_columna_big">
            <div class="carrito_main_fila">
              <p>Bagonia Rondeau</p>
              <div class="carrito_main_boton_articulo">
             
                <p>Cant. ${product.quantity}</p>
                
              </div>
              <p>$${product.price * product.quantity}</p>
              <p accessKey=${product.id} class="delete_product">X</p>
            </div>
            <div class="carrito_main_fila">
              <p>Unid. $${product.price}</p>
            </div>
          </div> 
        </article>
          `;
  });
};
const rederCartResume = () => {
  let localStorageCart = JSON.parse(localStorage.getItem("carrito"));
  let total = 0;
  localStorageCart.forEach((product) => {
    total = total + +product.price;
  });

  cart_resume.innerHTML = `
  <section class="carrito_main_finish_container">
  <div class="carrito_main_titulo">
    <h3>Resumen del pedido</h3>
  </div>

  <hr class="hr" />

  <div class="carrito_main_subtotal">
    <p>Subtotal</p>
    <p>$${total}</p>
  </div>

  <div class="carrito_main_envio">
    <p>Envio</p>
    <p>GRATIS</p>
  </div>

  <hr class="hr" />

  <div class="carrito_main_total">
    <p>TOTAL</p>
    <p>$${total}</p>
  </div>

  <div class="carrito_main_boton_finalizarcompra">
    <button>Finalizar la compra</button>
  </div>
</section>
  `;
};
const rendeCartEmpty = () => {
  cart_empty.innerHTML = `
  <div id="cart_empty">
    <h2 >🪴Carrito vacío🪴</h2>
  </div>
  <hr />
  `;
};

let localStorageCart = JSON.parse(localStorage.getItem("carrito")) || [];
if (!localStorageCart || localStorageCart.length === 0) {
  rendeCartEmpty();
} else {
  rendeCart();
  rederCartResume();
}

let delete_product = document.querySelectorAll('.delete_product')
for (let i = 0; i < delete_product.length; i++) {
  delete_product[i].addEventListener("click", (e) => {
   
   
    const cartFilter = localStorageCart.filter((product) => +product.id !== +e.srcElement.accessKey);
    localStorage.setItem("carrito", JSON.stringify(cartFilter));
    location.reload()
  });
  
}

