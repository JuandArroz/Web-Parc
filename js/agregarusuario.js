const agregarUsuario = () => {
        var nuevoUsuario = {
                id: getRandomInt(1000), 
                nombres: document.getElementById("TXT_Nombres").value,
                apellidos: document.getElementById("TXT_Apellidos").value,
                correo: document.getElementById("TXT_Correo").value,        
                pass: document.getElementById("Pass_Usuario").value,
                tipouser: document.getElementById("Select_TipoUsuario").value
        };
    if(validarPassword(nuevoUsuario.pass)){
            alert("Contraseña correcta");
                manejoDatos(nuevoUsuario);
        }else{
                alert("La contraseña no es segura. Debe contener:\n*Minimo 1 letra mayuscula\n*Minimo 1 letra minuscula\n*Minimo 1 numero\n*Minimo 1 caracter especial\n*Minimo 8 caracteres, maximo 15")
        } 
}

const registro = () => {
        var nuevoUsuario = {
                id: getRandomInt(1000), 
                nombres: document.getElementById("TXT_Nombres").value,
                apellidos: document.getElementById("TXT_Apellidos").value,
                correo: document.getElementById("TXT_Correo").value,        
                pass: document.getElementById("Pass_Usuario").value,
                tipouser: 2
        };
        if(validarPassword(nuevoUsuario.pass)){
                manejoDatos(nuevoUsuario);
                window.location = "../index.html";
        }else{
                alert("La contraseña no es segura. Debe contener:\n*Minimo 1 letra mayuscula\n*Minimo 1 letra minuscula\n*Minimo 1 numero\n*Minimo 1 caracter especial\n*Minimo 8 caracteres, maximo 15")
        }     
}

const manejoDatos = (nuevoUsuario) => {
        let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        
        usuarios.push(nuevoUsuario);
        
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
        alert("Registro exitoso")
        
        document.getElementById("TXT_Nombres").value = '';
        document.getElementById("TXT_Apellidos").value = '';
        document.getElementById("TXT_Correo").value = '';       
        document.getElementById("Pass_Usuario").value = '';
}

const validarPassword = (password) => {
    const decimal = /^(?=.*\d)(?=.*[a-z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
    if(password.value.match(decimal)) {
        return true;
    } else {
        return false;
    }
}

const getRandomInt = (max) => {
    return Math.floor(Math.random() * max);
  }
