const sesionusuarioJSON = localStorage.getItem('sesionusuario');
const sesionusuario = JSON.parse(sesionusuarioJSON);

const indesesion = () => {

    let opc4 = document.querySelector('#opc4');
    opc4.innerHTML += '';

    if(sesionusuario){
        switch(sesionusuario.tipouser){
            case 0:
                opc4.innerHTML += `
                    <a class="nav-item nav-link active text-warning" href="html/tabladedatos.html">Tabla de Datos<span class="sr-only"></span></a>
                    <a class="nav-item nav-link active text-warning" href="html/agregarusuario.html">Registro de usuarios<span class="sr-only"></span></a>
                    <a class="nav-item nav-link active text-warning" href="html/propuestas_revi.html">Propuestas estudiantes<span class="sr-only"></span></a>
                    <div class="text-warning">Administrador: ${sesionusuario.nombres} ${sesionusuario.apellidos}</div>
                    <div><button class="btn btn-warning" id="delog" onclick="limpiar_sesion()">Cerrar sesión</button></div>
                `
                break;
        
            case 1:
                opc4.innerHTML += `
                    <a class="nav-item nav-link active text-warning" href="html/propuestas_revi.html">Propuestas estudiantes<span class="sr-only"></span></a>
                    <div class="text-warning">Docente: ${sesionusuario.nombres} ${sesionusuario.apellidos}</div>
                    <div><button class="btn btn-warning" id="delog" onclick="limpiar_sesion()">Cerrar sesión</button></div>
                `
                break;
        
            case 2:
                opc4.innerHTML += `
                    <div class="text-warning">Estudiante: ${sesionusuario.nombres} ${sesionusuario.apellidos}</div>
                    <div><button class="btn btn-warning" id="delog" onclick="limpiar_sesion()">Cerrar sesión</button></div>
                `
                break;
        }
    }else{
        opc4.innerHTML += `
        <a class="nav-item nav-link active text-warning" href="html/login.html">Login<span class="sr-only"></span></a>
        `
    }
}

const limpiar_sesion = () =>{
    localStorage.removeItem("sesionusuario");
    location.reload();
}

const comprobar_sesionA = () => {
    if(sesionusuario){
        if(sesionusuario.tipouser == 0){
        }else{
            window.location = "../index.html";
            alert("ACCESO DENEGADO.\nUSTED NO CUENTA CON PERMISOS DE ADMINISTRADOR")
        }
    }else{
        window.location = "../index.html";
        alert("ACCESO DENEGADO.\nUSTED NO CUENTA CON PERMISOS DE ADMINISTRADOR")
    }
}

const comprobar_sesionD = () => {
    if(sesionusuario){
        if(sesionusuario.tipouser == 0 || sesionusuario.tipouser == 1){
        }else{
            window.location = "../index.html";
            alert("ACCESO DENEGADO.\nUSTED NO CUENTA CON PERMISOS DE ADMINISTRADOR")
        }
    }else{
        window.location = "../index.html";
        alert("ACCESO DENEGADO.\nSOLO DOCENTES Y ADMINISTRADORES")
    }
}

const comprobar_sesionE = () => {
    if(sesionusuario){
        if(sesionusuario.tipouser == 0 || sesionusuario.tipouser == 2){
        }else{
            window.location = "../index.html";
            alert("ACCESO DENEGADO.\n")
        }
    }else{
        window.location = "../index.html";
        alert("ACCESO DENEGADO.\nSOLO ESTUDIANTES")
    }
}
