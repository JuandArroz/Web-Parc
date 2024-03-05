const agregarUsuario = () => {
    var password = document.getElementById("Pass_Usuario").value;
    
    if(validarNombre(document.getElementById("TXT_Nombres").value)){
        if(validarNombre(document.getElementById("TXT_Apellidos").value)){
            if(validarCorreo(document.getElementById("TXT_Correo").value)){
                if(password && validarPassword(password)){
                var nuevoUsuario = {
                    id: getRandomInt(1000), 
                    nombres: document.getElementById("TXT_Nombres").value,
                    apellidos: document.getElementById("TXT_Apellidos").value,
                    correo: document.getElementById("TXT_Correo").value,        
                    pass: password,
                    tipouser: document.getElementById("Select_TipoUsuario").value
                };
                manejoDatos(nuevoUsuario);
                } else {
                    alert("La contraseña no es segura. Debe contener:\n*Minimo 1 letra mayuscula\n*Minimo 1 letra minuscula\n*Minimo 1 numero\n*Minimo 1 caracter especial\n*Minimo 8 caracteres, maximo 15");
                }
            }else{
                alert("Correo no valido. ")
            }  
        }else{
            alert("Apellido invalido");
        }
    }else{
        alert("Nombre invalido");
    }
}

const registro = () => {
    if(validarNombre(document.getElementById("TXT_Nombres").value)){
        if(validarNombre(document.getElementById("TXT_Apellidos").value)){
            if(validarCorreo(document.getElementById("TXT_Correo").value)){
                if(password && validarPassword(password)){
                var nuevoUsuario = {
                    id: getRandomInt(1000), 
                    nombres: document.getElementById("TXT_Nombres").value,
                    apellidos: document.getElementById("TXT_Apellidos").value,
                    correo: document.getElementById("TXT_Correo").value,        
                    pass: password,
                    tipouser: 2
                };
                manejoDatos(nuevoUsuario);
                } else {
                    alert("La contraseña no es segura. Debe contener:\n*Minimo 1 letra mayuscula\n*Minimo 1 letra minuscula\n*Minimo 1 numero\n*Minimo 1 caracter especial\n*Minimo 8 caracteres, maximo 15");
                }
            }else{
                alert("Correo no valido. ")
            }  
        }else{
            alert("Apellido invalido");
        }
    }else{
        alert("Nombre invalido");
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

const validarCorreo = (emailInput) => {
  var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(emailInput);
}

const validarNombre = (nombreInput) => {
  var nombrePattern = /^[a-zA-ZÀ-ÿ\s']+$/;
  return nombrePattern.test(nombreInput);
}

const validarPassword = (password) => {
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
    return regex.test(password);
}

const getRandomInt = (max) => {
    return Math.floor(Math.random() * max);
  }
