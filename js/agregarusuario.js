var nuevoUsuario = {
    id: getRandomInt(1000), 
    correo: document.getElementById("TXT_Correo").value,
    nombres: document.getElementById("TXT_Nombres").value,
    apellidos: document.getElementById("TXT_Apellidos").value,
    pass: document.getElementById("Pass_Usuario").value,
    tipouser: document.getElementById("Select_TipoUsuario").value 
};


const agregarUsuario = () => {
   if (localStorage.getItem("RegistroAct")){
        var nuevoU = JSON.parse(localStorage.getItem("nuevoUsuario"));
        nuevoU = nuevoU.push(nuevoUsuario);
   }
   localStorage.setItem("RegistroAct",JSON.stringify(nuevoUsuario))
   console.log(localStorage.getItem("RegistroAct"))
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
