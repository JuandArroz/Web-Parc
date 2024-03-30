var userData = [];

const obten_data = async(correoTXT, url) => {
    try {
        const response = await fetch(url+correoTXT);
        const data = await response.json();
        userData = data;
    } catch (error) {
        alert(error);
    }
}

const validacion_logeo = async() => {

    let correo = document.getElementById("TXT_Correo").value
    let password = document.getElementById("Pass_Login").value
    let estado = [0, 0];
    let url_varia = ["http://127.0.0.1:3000/getAdministradorByCorreo/", "http://127.0.0.1:3000/getDocenteByCorreo/", "http://127.0.0.1:3000/getEstudianteByCorreo/"];

    for (let i = 0; i < url_varia.length; i++) {
        await obten_data(correo, url_varia[i]);
            if(userData.length > 0 && correo == userData[0].correo){
                estado = [1,i];
                userData[0].tipouser = estado[1];
                break;
            }
    }
    
    if(estado[0] == 1){
        if(password == userData[0].contrasena){
            alert("Bienvenido, "+userData[0].nombre);
            localStorage.setItem('sesionusuario', JSON.stringify(userData));
            window.location = "../index.html";
        }else{
            alert("Contraseña incorrecta");
        }
    }else{
        alert("El correo ingresado no existe");
    }

}

let validado = () => {
    if(localStorage.getItem("usuarios") != null){
        return true;
    }else{
        return false;
    }
}
