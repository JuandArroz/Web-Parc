const nuevoUsuario = {
    id: getRandomInt(1000), 
    correo: document.getElementById("TXT_Correo").value,
    nombres: document.getElementById("TXT_Nombres").value,
    apellidos: document.getElementById("TXT_Apellidos").value,
    pass: document.getElementById("Pass_Usuario").value,
    tipouser: document.getElementById("Select_TipoUsuario").value 
};
const agregarUsuario = () => {
    
    console.log(nuevoUsuario);
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

