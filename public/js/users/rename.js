//console.log("Conectado")
function selector(element) {
    return document.getElementById(element);
  }
  
  window.addEventListener("load", () => {
    //Id de cada campo y del formulario
    let 	
      rename_name 			    = selector("rename_name"),
      rename_lastname 		    = selector("rename_lastname"),
      rename_form 			    = selector("rename_form"),
      //Errores
      errorName 				= selector("errorfirstNameProfile"),
      errorlastName 			= selector("errorflastnameProfile"),
      errorForm 				= selector("errorFormRename"),
      //botón
      rename_btn 			    = selector("rename_btn"),
      //Expresiones regulares
      regExAlpha 				= /^[a-zA-Z\sñáéíóúü ]{3,}$/,
      regExEmail 				= /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
      regExPassword 			= /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[#$@!%&*?]).{8,}/;
  
    //manejo de errores
    function trueError(error_field, msg) {
      error_field.innerHTML = msg;
      rename_btn.disabled = true;
      rename_btn.style.cursor = "not-allowed";
    }
    function falseError(error_field) {
      error_field.innerHTML = "";
      rename_btn.disabled = false;
      rename_btn.style.cursor = "pointer";
    }
  
    //Validaciones por campos
  
    //name
    rename_name.addEventListener("blur", function () {
      switch (true) {
        case !rename_name.value.trim():
          trueError(errorName, "El nombre es obligatorio");
          break;
        case !regExAlpha.test(rename_name.value):
          trueError(errorName, "Debes ingresar un nombre válido");
          break;
        default:
          falseError(errorName);
          break;
      }
    });
  
    //lastname
    rename_lastname.addEventListener("blur", function () {
      switch (true) {
        case !rename_lastname.value.trim():
          trueError(errorlastName, "El apellido es obligatorio");
          break;
        case !regExAlpha.test(rename_lastname.value):
          trueError(errorlastName, "Debes ingresar un apellido válido");
          break;
        default:
          falseError(errorlastName);
          break;
      }
    });
  
    
  
    rename_form.addEventListener("submit", function (e) {
      let error = false;
      e.preventDefault();
      let inputs = rename_form.elements;
  
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
        rename_form.submit();
      }
    });
  });
  