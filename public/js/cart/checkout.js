function selector(element) {
  return document.getElementById(element);
}

let products_cart = selector("products_cart");
let cart_resume = selector("cart_resume");
let cart_empty = selector("cart_empty_container");

const rendeCart = () => {
  let cart = [];
  cart = JSON.parse(localStorage.getItem("carrito"));

  cart.forEach((product) => {
    products_cart.innerHTML += `
            <article class="carrito_main_articulo_planta">
            <div class="planta">
              <img
                src="${product.img}"
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
                <p>${product.title}</p>
                <div class="carrito_main_boton_articulo">
               
                  <p>Cant. ${product.quantity}</p>
                  
                </div>
                <p>$${product.price * product.quantity}</p>
              
              </div>
              <div class="carrito_main_fila">
                <p>Unid. $${product.price}</p>
              </div>
            </div> 
          </article>
            `;
  });
};
const renderCartResume = () => {
  let localStorageCart = JSON.parse(localStorage.getItem("carrito"));
  let total = 0;
  localStorageCart.forEach((product) => {
    total = total + product.price * product.quantity;
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
      <button id="btn_confirm" >Confirmar pedido</button>
    </div>
    <div class="carrito_main_boton_finalizarcompra">
      <button id="btn_seguir" style="background-color: #333 ; margin-top: 20px">Seguir Comprando</button>
    </div>
  </section>
    `;

  let btn_confirm = selector("btn_confirm");
  let btn_seguir = selector("btn_seguir");
  btn_confirm.addEventListener("click", function (e) {
    confirmOrder();
    window.location.replace("/productos/pedido_confirmado");
  });
  btn_seguir.addEventListener("click", function (e) {
    console.log("click");
    window.location.replace("/productos");
  });
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
  renderCartResume();
}

let delete_product = document.querySelectorAll(".delete_product");
for (let i = 0; i < delete_product.length; i++) {
  delete_product[i].addEventListener("click", (e) => {
    const cartFilter = localStorageCart.filter(
      (product) => +product.id !== +e.srcElement.accessKey
    );
    localStorage.setItem("carrito", JSON.stringify(cartFilter));
    location.reload();
  });
}

const confirmOrder = () => {
  let products = JSON.parse(localStorage.getItem("carrito"));
  const getCookie = (cname) => {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  };

  const cookie = getCookie("sylvestris");
  const userId = cookie.slice(8, 9);

  const mapProduct = products.map((product) => {
    return {
      productId: product.id,
      userId: +userId,
      total: product.quantity * product.price,
      quantity: product.quantity,
    };
  });

  fetch("/api/checkout", {
    method: "POST",
    body: JSON.stringify({
      userId,
      products: mapProduct,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .catch((error) => console.error("Error:", error))
    .then((response) => console.log("Success:", response));
    localStorage.removeItem("carrito");
};
