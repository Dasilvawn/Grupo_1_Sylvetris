console.log("Conectado");
function selector(element) {
  return document.getElementById(element);
}

window.addEventListener("load", () => {
  //Id de cada campo y del formulario
  let address_name = selector("address_name"),
    address_lastname = selector("address_lastname"),
    address_phone = selector("address_phone"),
    address_dni = selector("address_dni"),
    address_address = selector("address_address"),
    address_floor = selector("address_floor"),
    address_dpto = selector("address_dpto"),
    address_state = selector("address_state"),
    address_city = selector("address_city"),
    address_cp = selector("address_cp"),
    address_form = selector("form__change__address"),
    //Errores
    errorAddressName = selector("errorAddressName"),
    errorAddressLastname = selector("errorAddressLastname"),
    errorAddressPhone = selector("errorAddressPhone"),
    errorAddressDni = selector("errorAddressDni"),
    errorAddressAddress = selector("errorAddressAddress"),
    errorAddressFloor = selector("errorAddressFloor"),
    errorAddressDpto = selector("errorAddressDpto"),
    errorAddressState = selector("errorAddressState"),
    errorAddressCity = selector("errorAddressCity"),
    errorAddressCp = selector("errorAddressCp"),
    errorAddressForm = selector("errorAddressForm"),
    //botón
    address_btn = selector("address_btn"),
    //Expresiones regulares
    regExAlpha = /^[a-zA-Z\sñáéíóúü ]{3,}$/,
    regExEmail =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
    regExPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[#$@!%&*?]).{8,}/;
  regExOnlyNumber = /^[0-9+]*$|^NULL$/;
  regExLetterAndNumber = /^[a-zA-Z0-9ÁÉÍÓÚáéíóúñÑ ]+$/;

  //manejo de errores
  function trueError(error_field, msg) {
    error_field.innerHTML = msg;
    address_btn.disabled = true;
    address_btn.style.cursor = "not-allowed";
  }
  function falseError(error_field) {
    error_field.innerHTML = "";
    address_btn.disabled = false;
    address_btn.style.cursor = "pointer";
  }

  //Validaciones por campos

  //name
  address_name.addEventListener("blur", function () {
    switch (true) {
      case !address_name.value.trim():
        trueError(errorAddressName, "El nombre es obligatorio");
        break;
      case !regExAlpha.test(address_name.value):
        trueError(errorAddressName, "Debes ingresar un nombre válido");
        break;
      default:
        falseError(errorAddressName);
        break;
    }
  });

  //lastname
  address_lastname.addEventListener("blur", function () {
    switch (true) {
      case !address_lastname.value.trim():
        trueError(errorAddressLastname, "El apellido es obligatorio");
        break;
      case !regExAlpha.test(address_lastname.value):
        trueError(errorAddressLastname, "Debes ingresar un apellido válido");
        break;
      default:
        falseError(errorAddressLastname);
        break;
    }
  });

  //phone
  address_phone.addEventListener("blur", function () {
    switch (true) {
      case !address_phone.value.trim():
        trueError(errorAddressPhone, "El teléfono es obligatorio");
        break;
      case !regExOnlyNumber.test(address_phone.value):
        trueError(errorAddressPhone, "Solo números");
        break;
      default:
        falseError(errorAddressPhone);
        break;
    }
  });
  //dni
  address_dni.addEventListener("blur", function () {
    switch (true) {
      case !address_dni.value.trim():
        trueError(errorAddressDni, "El dni es obligatorio");
        break;
      case !regExOnlyNumber.test(address_dni.value):
        trueError(errorAddressDni, "Solo números");
        break;
      default:
        falseError(errorAddressDni);
        break;
    }
  });
  //address
  address_address.addEventListener("blur", function () {
    switch (true) {
      case !address_address.value.trim():
        trueError(errorAddressAddress, "La dirección es obligatoria");
        break;
      case !regExLetterAndNumber.test(address_address.value):
        trueError(errorAddressAddress, "Solo letras y números");
        break;
      default:
        falseError(errorAddressAddress);
        break;
    }
  });
  //floor
  address_floor.addEventListener("blur", function () {
    switch (true) {
      case !/^[a-zA-Z0-9 ]+$|^ *$/.test(address_floor.value):
        trueError(errorAddressFloor, "Solo letras y números");
        break;
      default:
        falseError(errorAddressFloor);
        break;
    }
  });
  //dpto
  address_dpto.addEventListener("blur", function () {
    switch (true) {
      case !/^[a-zA-Z0-9 ]+$|^ *$/.test(address_dpto.value):
        trueError(errorAddressDpto, "Solo letras y números");
        break;
      default:
        falseError(errorAddressDpto);
        break;
    }
  });

  //state
  address_state.addEventListener("blur", function () {
    switch (true) {
      case !address_state.value.trim():
        trueError(errorAddressState, "La dirección es obligatoria");
        break;
      case !/^[a-zA-Z0-9ÁÉÍÓÚáéíóúñÑ ]+$/.test(address_state.value):
        trueError(errorAddressState, "Solo letras y números");
        break;
      default:
        falseError(errorAddressState);
        break;
    }
  });
  //city
  address_city.addEventListener("blur", function () {
    switch (true) {
      case !address_city.value.trim():
        trueError(errorAddressCity, "La dirección es obligatoria");
        break;
      case !regExLetterAndNumber.test(address_city.value):
        trueError(errorAddressCity, "Solo letras y números");
        break;
      default:
        falseError(errorAddressCity);
        break;
    }
  });
  //cp
  address_cp.addEventListener("blur", function () {
    switch (true) {
      case !address_cp.value.trim():
        trueError(errorAddressCp, "La dirección es obligatoria");
        break;
      case !regExOnlyNumber.test(address_cp.value):
        trueError(errorAddressCp, "Solo números");
        break;
      default:
        falseError(errorAddressCp);
        break;
    }
  });

  address_form.addEventListener("submit", function (e) {
    let error = false;
    e.preventDefault();
    let inputs = address_form.elements;
    console.log(inputs);

    for (let i = 0; i < inputs.length - 1; i++) {
      if (
        inputs[i].value == "" &&
        inputs[i].name !== "floor" &&
        inputs[i].name !== "dpto"
      ) {
        errorAddressForm.innerHTML = "Debes completar todos los campos";
        error = true;
      }
    }
    setTimeout(() => {
      errorAddressForm.innerHTML = "";
    }, "5000");

    if (!error) {
      address_form.submit();
    }
  });
});
