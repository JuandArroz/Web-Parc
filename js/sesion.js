const sesionusuarioJSON = localStorage.getItem('sesionusuario');
const sesionusuario = JSON.parse(sesionusuarioJSON);

const indesesion = () => {

    let opc4 = document.querySelector('#opc4');
    opc4.innerHTML = '';
    let opc5 = document.querySelector('#opc5');
    opc5.innerHTML = '';
    
    if(sesionusuario){
        switch(sesionusuario[0].tipouser){
            case 0:
                opc4.innerHTML += `
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle text-warning" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Jhonny</a>
                    <ul class="dropdown-menu">
                        <li>
                            <h6 class="dropdown-header">Opciones de administrador <i class="fa-solid fa-user-secret"></i></i></h6>
                            <a class="dropdown-item text-warning" href="html/tabladedatos.html">Listado de estudiantes</a>
                        </li>
                        <li>
                            <a class="dropdown-item text-warning" href="html/dashboard.html">Dashboard</a>
                        </li>
                        <li>
                            <a class="dropdown-item text-warning" href="html/agregarusuario.html">Agregar usuario</a>
                        </li>
                        <li>
                            <a class="dropdown-item text-warning" href="html/subirtesis.html">Subir tesis</a>
                        </li>
                        <li>
                            <hr class="dropdown-divider">
                            <h6 class="dropdown-header">Opciones de docente <i class="fa-solid fa-user-tie"></i></h6>
                        </li>
                        <li>
                            <a class="dropdown-item text-warning" href="html/propuestasadmin.html">Propuestas</a>
                        </li>
                    </ul>
                </li>
                `
                opc5.innerHTML += `
                    <li class="nav-item">
                        <span class="nav-link text-light"><i class="fa-solid fa-user-secret fa-xl"></i> ${sesionusuario[0].nombre}</span>
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
                        <span class="nav-link text-light"><i class="fa-solid fa-user-tie fa-xl"></i> ${sesionusuario[0].nombre}</span>
                    </li>
                    <li class="nav-item">
                        <button class="btn btn-warning" id="delog" onclick="limpiar_sesion()">Cerrar sesion</button>
                    </li>
                `
                break;
        
            case 2:
                opc4.innerHTML += `
                    <li class="nav-item">
                        <a class="nav-link text-light" href="html/enviar_propuesta.html">Enviar propuesta</a>
                    </li>
                `
                opc5.innerHTML += `
                    <li class="nav-item">
                        <span class="nav-link text-light"><i class="fa-solid fa-user-graduate fa-xl"></i> ${sesionusuario[0].nombre}</span>
                    </li>                    
                    <li class="nav-item">
                        <button class="btn btn-warning" id="delog" onclick="limpiar_sesion()">Cerrar sesion</button>
                    </li>      
                `
                break;
        }
    }else{
        opc4.innerHTML += `
            <span class="navbar-text text-secondary">Registrate para acceder a nuevas funciones</span>
        `
        opc5.innerHTML += `
            <li class="nav-item">
                <a class="nav-link text-light" href="html/login.html"><i class="fa-solid fa-right-to-bracket"></i> Login</a>
            </li>
            <li class="nav-item">
                <a class="nav-link text-light" href="html/register.html"><i class="fa-solid fa-address-card"></i> Registrarse</a>
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
        if(sesionusuario[0].tipouser == 0){
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
        if(sesionusuario[0].tipouser == 0 || sesionusuario[0].tipouser == 1){
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
        if(sesionusuario[0].tipouser == 0 || sesionusuario[0].tipouser == 2){
        }else{
            window.location = "../index.html";
            alert("ACCESO DENEGADO.\n")
        }
    }else{
        window.location = "../index.html";
        alert("ACCESO DENEGADO.\nSOLO ESTUDIANTES")
    }
}
