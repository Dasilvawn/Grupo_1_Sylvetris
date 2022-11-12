//console.log("Conectado")
function selector(element){
    return document.getElementById(element)
}

window.addEventListener('load', () => {
		//Id de cada campo y del formulario
	let register_name 		= selector('register_name'),
		register_lastname 	= selector('register_lastname'),
    	register_email 		= selector('register_email'),
    	register_password 	= selector('register_password'),
    	register_password2 	= selector('register_password2'),
    	register_form		= selector('register_form'),
		//Errores
		errorName 			= selector('errorfirstName'),
		errorlastName 		= selector('errorlastName'),
		errorEmail 			= selector('errorEmail'),
		errorPass 			= selector('errorPassword'),
		errorPass2 			= selector('errorPassword2'),
		errorForm 			= selector('errorForm'),
		//botón
		register_btn        = selector('register_btn'),
		//Expresiones regulares
    	regExAlpha 			= /^[a-zA-Z\sñáéíóúü ]{3,}$/,
    	regExEmail 			= /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
    	regExPassword 		= /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[#$@!%&*?]).{8,}/
		
    //manejo de errores
	function trueError(error_field, msg) {
		error_field.innerHTML = msg;
		register_btn.disabled = true;
		register_btn.style.cursor = "not-allowed"
	}
	function falseError(error_field) {
		error_field.innerHTML = "";
		register_btn.disabled = false;
		register_btn.style.cursor = "pointer"
	}
	
	//Validaciones por campos

	//name
    register_name.addEventListener("blur", function () {
      switch (true) {
        case !register_name.value.trim():
          trueError(errorName, "El nombre es obligatorio")
          break;
        case !regExAlpha.test(register_name.value):
          trueError(errorName, "Debes ingresar un nombre válido")
          break;
        default:
          falseError(errorName)
          break;
      }
    })
	
	//lastname
    register_lastname.addEventListener("blur", function () {
        switch (true) {
          case !register_lastname.value.trim():
           	trueError(errorlastName, "El apellido es obligatorio")
            break;
          case !regExAlpha.test(register_lastname.value):
          	trueError(errorlastName, "Debes ingresar un apellido válido")
            break;
          default:
           	falseError(errorlastName)
        	break;
        }
      })

	  //email
      register_email.addEventListener("blur", function () {
        switch (true) {
          case !register_email.value.trim():
           	trueError(errorEmail, "El email es obligatorio")
			break;
          case !regExEmail.test(register_email.value):
            trueError(errorEmail, "Debes ingresar un email válido")
			break;
          default:
           	falseError(errorEmail)
			break;
        }
      })

	  //password
      register_password.addEventListener("blur", function () {
        switch (true) {
          case !register_password.value.trim():
           trueError(errorPass, "El password es obligatorio")
           	break;
          case !regExPassword.test(register_password.value):
         	trueError(errorPass, "Debe tener una mayúscula, una minúscula, un número, un carácter especial y al menos 8 caracteres")
            break;
          default:
			falseError(errorPass)
            break;
        }
      })

	  //password2
      register_password2.addEventListener("blur", function () {
        switch (true) {
          case !register_password2.value.trim():
			trueError(errorPass2, "El password es obligatorio")
           	break;
          case register_password.value !== register_password2.value:
           	trueError(errorPass2, "Las contraseñas no coinciden")
           	break;
          default:
            falseError(errorPass2)
            break;
        }
      })
      
	  register_form.addEventListener('submit',function(e){
        let error = false;
        e.preventDefault()
        let inputs = register_form.elements
        
        for (let i = 0; i < inputs.length - 1; i++) {
            if(inputs[i].value == "" && inputs[i].name !== "archivo"){
              	errorForm.innerHTML = "Debes completar todos los campos";
            	error = true;
            }
        }
		setTimeout(() => {
			errorForm.innerHTML = ""
		  }, "5000") 
    
         if(!error){
			register_form.submit()
        } 
		
    
    })
})