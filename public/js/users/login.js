//console.log("Conectado")
function selector(element) {
    return document.getElementById(element);
  }
  
  window.addEventListener("load", () => {
    //Id de cada campo y del formulario
    let 	
      
      login_email = selector("login_email"),
      login_password = selector("login_password"),
      login_form = selector("login_form"),
     
      //Errores
      errorEmail = selector("errorEmail"),
      errorPass = selector("errorPassword"),
      errorForm = selector("errorForm"),
      //botón
      login_btn = selector("login_btn"),
      //Expresiones regulares
      // regExAlpha = /^[a-zA-Z\sñáéíóúü ]{3,}$/,
      regExEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
      regExPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[#$@!%&*?]).{8,}/;
  
    //manejo de errores
    function trueError(error_field, msg) {
      error_field.innerHTML = msg;
      login_btn.disabled = true;
      login_btn.style.cursor = "not-allowed";
    }
    function falseError(error_field) {
      error_field.innerHTML = "";
      login_btn.disabled = false;
      login_btn.style.cursor = "pointer";
    }
  
    //Validaciones por campos
  
    //email
   login_email.addEventListener("blur", function () {
      switch (true) {
        case !register_email.value.trim():
          trueError(errorEmail, "El email es obligatorio");
          break;
        case !regExEmail.test(register_email.value):
          trueError(errorEmail, "Debes ingresar un email válido");
          break;
        default:
          falseError(errorEmail);
          break;
      }
    });
  
    //password
   login_password.addEventListener("blur", function () {
      switch (true) {
        case !register_password.value.trim():
          trueError(errorPass, "El password es obligatorio");
          break;
        case !regExPassword.test(register_password.value):
          trueError(
            errorPass,
            "Debe tener una mayúscula, una minúscula, un número, un carácter especial y al menos 8 caracteres"
          );
          break;
        default:
          falseError(errorPass);
          break;
      }
    });
  
   login_form.addEventListener("submit", function (e) {
      let error = false;
      e.preventDefault();
      let inputs =login_form.elements;
  
      for (let i = 0; i < inputs.length - 1; i++) {
        if (inputs[i].value == "" && inputs[i].name !== "archivo") {
          errorForm.innerHTML = "Debes completar todos los campos";
          error = true;
        }
      }
      setTimeout(() => {
        errorForm.innerHTML = "";
      }, "5000");
  
      if (!error) {
       login_form.submit();
      }
    });
  });
  