const sesionusuarioJSON = localStorage.getItem('sesionusuario');
const sesionusuario = JSON.parse(sesionusuarioJSON);

const indesesion = () => {

    let opc4 = document.querySelector('#opc4');
    opc4.innerHTML += '';
    let opc5 = document.querySelector('#opc5');
    opc5.innerHTML = '';
    
    if(sesionusuario){
        switch(sesionusuario.tipouser){
            case 0:
                opc4.innerHTML += `
                    <li class="nav-item">
                        <a class="nav-link text-warning" href="html/tabladedatos.html">Tabla de datos</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link text-warning" href="html/agregarusuario.html">Agregar usuario</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link text-warning" href="html/propuestas_revi.html">Propuestas</a>
                    </li>
                `
                opc5.innerHTML += `
                    <li class="nav-item">
                        <span class="nav-link text-light"><i class="fa-solid fa-user-secret fa-xl"></i> ${sesionusuario.nombres}</span>
                    </li>
                    <li class="nav-item">
                        <button class="btn btn-warning" id="delog" onclick="limpiar_sesion()">Cerrar sesion</button>
                    </li>
                `
                break;
        
            case 1:
                opc4.innerHTML += `
                    <li class="nav-item">
                        <a class="nav-link text-warning" href="html/propuestas_revi.html">Propuestas</a>
                    </li>                     
                `
                opc5.innerHTML += `
                    <li class="nav-item">
                        <span class="nav-link text-light"><i class="fa-solid fa-user-tie fa-xl"></i> ${sesionusuario.nombres}</span>
                    </li>
                    <li class="nav-item">
                        <button class="btn btn-warning" id="delog" onclick="limpiar_sesion()">Cerrar sesion</button>
                    </li>
                `
                break;
        
            case 2:
                opc5.innerHTML += `
                    <li class="nav-item">
                        <span class="nav-link text-light"><i class="fa-solid fa-user-graduate fa-xl"></i> ${sesionusuario.nombres}</span>
                    </li>                    
                    <li class="nav-item">
                        <button class="btn btn-warning" id="delog" onclick="limpiar_sesion()">Cerrar sesion</button>
                    </li>      
                `
                break;
        }
    }else{
        opc5.innerHTML += `
            <li class="nav-item">
                <a class="nav-link text-light" href="html/login.html">Login</a>
            </li>
            <li class="nav-item">
                <a class="nav-link text-light" href="html/register.html">Registrarse</a>
            </li>
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
