let nuevoUsuario = {
    id: getRandomInt(1000), 
    nombres: document.getElementById("TXT_Nombres").value,
    apellidos: document.getElementById("TXT_Apellidos").value,
    correo: document.getElementById("TXT_Correo").value,
    pass: document.getElementById("Pass_Usuario").value,
    tipouser: document.getElementById("Select_TipoUsuario").value 
};


const agregarUsuario = () => {
    const ar = JSON.stringify(nuevoUsuario);
    console.log(ar);
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
