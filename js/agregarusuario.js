const agregarUsuario = () => {
    var nuevoUsuario = {
        id: getRandomInt(1000), 
        correo: document.getElementById("TXT_Correo").value,
        nombres: document.getElementById("TXT_Nombres").value,
        apellidos: document.getElementById("TXT_Apellidos").value,
        pass: document.getElementById("Pass_Usuario").value,
        tipouser: document.getElementById("Select_TipoUsuario").value 
    };

    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    usuarios.push(nuevoUsuario);

    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    
    
    //guardarEnArchivoTexto(nuevoUsuario);
};

const guardarEnArchivoTexto = (usuario) => {
}

const getRandomInt = (max) => {
    return Math.floor(Math.random() * max);
  }
