const sesionusuarioJSON = localStorage.getItem('sesionusuario');
const sesionusuario = JSON.parse(sesionusuarioJSON);

const indesesion = () => {

    let opc4 = document.querySelector('#opc4');
    opc4.innerHTML = '';

    if(sesionusuario){
        switch(sesionusuario.tipouser){
            case 0:
                opc4.innerHTML = `                                       
                    <li><a href="html/tabladedatos.html">Tabla de Datos</a></li>
                    <li><a href="html/agregarusuario.html">Registro de usuarios</a></li>
                    <li><a href="html/propuestas_revi.html">Propuestas estudiantes</a></li>
                    <li>Administrador: ${sesionusuario.nombres} ${sesionusuario.apellidos}<li>
                    <li><button id="delog" onclick="limpiar_sesion()">Cerrar sesión</button></li>
                `
                break;
        
            case 1:
                opc4.innerHTML = `
                    <li><a href="html/propuestas_revi.html">Propuestas estudiantes</a></li>
                    <li>Docente: ${sesionusuario.nombres} ${sesionusuario.apellidos}<li>
                    <li><button id="delog" onclick="limpiar_sesion()">Cerrar sesión</button></li>
                `
                break;
        
            case 2:
                opc4.innerHTML = `
                    <li>Estudiante: ${sesionusuario.nombres} ${sesionusuario.apellidos}<li>
                    <li><button id="delog" onclick="limpiar_sesion()">Cerrar sesión</button></li>
                `
                break;
        }
    }else{
        opc4.innerHTML = `
        <li><a href="html/login.html">Login</a></li>
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
