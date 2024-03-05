const agregarUsuario = () => {
        var nuevoUsuario = {
                id: getRandomInt(1000), 
                nombres: document.getElementById("TXT_Nombres").value,
                apellidos: document.getElementById("TXT_Apellidos").value,
                correo: document.getElementById("TXT_Correo").value,        
                pass: document.getElementById("Pass_Usuario").value,
                tipouser: document.getElementById("Select_TipoUsuario").value;
        };
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    usuarios.push(nuevoUsuario);

    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    
    document.getElementById("TXT_Nombres").value = '';
    document.getElementById("TXT_Apellidos").value = '';
    document.getElementById("TXT_Correo").value = '';       
    document.getElementById("Pass_Usuario").value = '';
}

const registro = () => {
        var nuevoUsuario = {
                id: getRandomInt(1000), 
                nombres: document.getElementById("TXT_Nombres").value,
                apellidos: document.getElementById("TXT_Apellidos").value,
                correo: document.getElementById("TXT_Correo").value,        
                pass: document.getElementById("Pass_Usuario").value,
                tipouser: 2;
        };
        let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        
        usuarios.push(nuevoUsuario);
        
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
        
        document.getElementById("TXT_Nombres").value = '';
        document.getElementById("TXT_Apellidos").value = '';
        document.getElementById("TXT_Correo").value = '';       
        document.getElementById("Pass_Usuario").value = '';
        window.location = "../index.html";
}

const getRandomInt = (max) => {
    return Math.floor(Math.random() * max);
  }
