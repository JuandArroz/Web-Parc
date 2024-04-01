

const agregarUsuario = () => {
}

const registro = async() => {

    var correo = TXT_Correo.value;
    var nombres = TXT_Nombres.value;
    var apellidos = TXT_Apellidos.value;
    var telefono = NMB_Celuco.value;
    var password = Pass_Usuario.value;

    if (!correo || !nombres || !apellidos || !telefono || !password) {
        alert("Por favor, complete todos los campos.");
    }else{
        if(validarCorreo(correo)){
            if(await validacion_correoDB(correo)){
                console.log(validacion_correoDB(correo));
                if(validarNombre(nombres)){
                    if(validarNombre(apellidos)){
                        if(validarTelefono(telefono)){
                            if(password && validarPassword(password)){

                                axios ({
                                    method: 'POST',
                                    url: 'http://127.0.0.1:3000/add_estudiante',
                                    data: {correo:correo,
                                           numero_celular:telefono,
                                           nombre:nombres,
                                           apellido:apellidos,
                                           contrasena:password                         
                                        },
                                  }).then(function (response) {
                                    alert("Registro exitoso, bienvenido "+nombres)
                                    window.location.href = '../index.html';
                                  }).catch(err => console.log('Error: ', err))

                            }else{
                                alert("La contraseña no es segura. Debe contener:\n*Minimo 1 letra mayuscula\n*Minimo 1 letra minuscula\n*Minimo 1 numero\n*Minimo 1 caracter especial\n*Minimo 8 caracteres, maximo 15");
                            }
                        }else{
                            alert("Telefono invalido");
                        }
                    }else{
                        alert("Apellido/s invalido/s.");
                    }
                }else{
                    alert("Nombre/s invalido/s.");
                }
            }else{
                alert("El correo ya fue registrado");
            }
        }else{
            alert("Correo invalido.");
        }
    }
}

const validarCorreo = (emailInput) => {
  var emailPattern = /^[^\s@]+@[^\s@]+\.(?:com|co|edu|net|org|gov|mil|biz|info|name|pro|aero|coop|int|jobs|museum|arpa|asia|cat|mobi|tel|travel|xxx)$/i;
  return emailPattern.test(emailInput);
}

const validarNombre = (nombreInput) => {
  var nombrePattern = /^[a-zA-ZÀ-ÿ\s']+$/;
  return nombrePattern.test(nombreInput);
}

const validarTelefono = (telefonoInput) => {
    var telefonoPattern = /^\d{1,11}$/;
    return telefonoPattern.test(telefonoInput);
}

const validarPassword = (password) => {
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
    return regex.test(password);
}

var userData = [];

const obten_data = async(correoTXT, url) => {
    try {
        const response = await fetch(url+correoTXT);
        const data = await response.json();
        userData = data;
    } catch (error) {
        alert(error);
    }
}

const validacion_correoDB = async(correo) => {

    let estado = true;
    let url_varia = ["http://127.0.0.1:3000/getAdministradorByCorreo/", "http://127.0.0.1:3000/getDocenteByCorreo/", "http://127.0.0.1:3000/getEstudianteByCorreo/"];

    for (let i = 0; i < url_varia.length; i++) {
        await obten_data(correo, url_varia[i]);
            if(userData.length > 0 && correo == userData[0].correo){
                estado = false;
                break;
            }
    }
    return estado;
}