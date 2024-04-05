const obtener_tipo = () => {
    if(Select_TipoUsuario.value != null){
        var tipo_form = Select_TipoUsuario.value;
    }else{
        var tipo_form = 0;
    }
    return tipo_form;
}

const form_registroadmin = () => {
    tipo_form = obtener_tipo();
    nouser = '';
    switch (tipo_form) {
        case "0":
            nouser = "administrador";
            break;
        case "1":
            nouser = "docente";
            break;
        case "2":
            nouser = "estudiante";
            break;
    }

    alert("Se ha seleccionado un registro de " + nouser);

    let contenido = document.querySelector('#form_extra');
    contenido.innerHTML = '';
    
    switch (tipo_form) {
        case "0":
            break;

        case "1":
            contenido.innerHTML += `
                <label for="TXT_Especialidad" class="form-label">Especialidad:</label>
                <input type="text" class="form-control form-control-sm" id="TXT_Especialidad" required>
            `;
            break;

        case "2":
            contenido.innerHTML += `
                <label for="NMB_Celuco" class="form-label">Telefono:</label>
                <input type="text" class="form-control form-control-sm" id="NMB_Celuco" required>
            `;
            break;
    
        default:
            alert("ERROR: TIPO DE USUARIO NO VALIDO");
            break;
    }
}

const agregarUsuario = async() => {

    tipo_form = obtener_tipo();
    var correo = TXT_Correo.value;
    var nombres = TXT_Nombres.value;
    var apellidos = TXT_Apellidos.value;
    var password = Pass_Usuario.value;
    
    var estado = true;
    url = '';
    var valores = {correo: correo,
        nombre: nombres,
        apellido: apellidos,
        contrasena: password
    };

    if (!correo || !nombres || !apellidos || !password) {
        alert("Por favor, complete todos los campos.");
    }else{
        if(validarCorreo(correo)){
            if(await validacion_correoDB(correo)){
                if(validarNombre(nombres)){
                    if(validarNombre(apellidos)){
                            if(password && validarPassword(password)){                                
                            }else{
                                alert("La contraseña no es segura. Debe contener:\n*Minimo 1 letra mayuscula\n*Minimo 1 letra minuscula\n*Minimo 1 numero\n*Minimo 1 caracter especial\n*Minimo 8 caracteres, maximo 15");
                                estado = false;
                            }
                    }else{
                        alert("Apellido/s invalido/s.");
                        estado = false;
                    }
                }else{
                    alert("Nombre/s invalido/s.");
                    estado = false;
                }
            }else{
                alert("El correo ya fue registrado");
                estado = false;
            }
        }else{
            alert("Correo invalido.");
            estado = false;
        }
    }

    switch (tipo_form) {
        case "0":
            if(estado){
                url = 'http://127.0.0.1:3000/add_administrador';
            }
            break;

        case "1":
            var especialidad = TXT_Especialidad.value;
            if(!especialidad || !validarNombre(especialidad)){
                estado = false;
                alert("Especialidad invalida o nula");
            }else{
                valores.especialidad = especialidad;
                url = 'http://127.0.0.1:3000/add_docente';
            }
            break;

        case "2":
            var telefono = NMB_Celuco.value;
            if(!telefono || !validarTelefono(telefono)){
                estado = false;
                alert("Telefono invalido o nulo");
            }else{
                valores.numero_celular = telefono;
                url = 'http://127.0.0.1:3000/add_estudiante';
            }
            break;

        default:
            alert("ERROR. TIPO DE USUARIO INVALIDO");
            estado = false;
            break;
    }

    if(estado){
        axios.post(url, valores)
        .then(function (response) {
            alert("Registro exitoso");
            location.reload();
        })
        .catch(err => {
            console.error('Error: ', err);
            alert("Ocurrió un error al intentar agregar el usuario.");
        });
    }

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