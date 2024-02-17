console.log('Vinculado')
const veriflog = () => {
    console.log("Dentro de la función")

    let correo = document.getElementById("TXT_Correo").value
    let password = document.getElementById("Pass_Login").value

   fetch('https://storage.googleapis.com/datos_tablas/datos.json')
        .then(response => response.json())
        .then(data => {
            if (Array.isArray(data)) {
                const usuarioEncontrado = data.find(usuario => usuario.correo === correo && usuario.pass === password);
                if (usuarioEncontrado) {
                    console.log('Comprobación correcta');
                    alert("Bienvenido, " + usuarioEncontrado.nombres);                    
                    const userses = JSON.stringify(usuarioEncontrado);
                    localStorage.setItem('sesionusuario', userses);   
                    window.location = "../index.html";

                } else {                    
                    if(validado()){
                        const nuevos = JSON.parse(localStorage.getItem('usuarios'));
                        for(let iter of nuevos){
                            if(iter.correo == correo && iter.pass == password){
                                console.log(iter)
                                console.log('Comprobación correcta');
                                alert("Bienvenido, " + iter.nombres);                    
                                const userses = JSON.stringify(iter);
                                localStorage.setItem('sesionusuario', userses);   
                                window.location = "../index.html";
                            }
                        }                        
                    }else{
                        alert("Credenciales incorrectas")
                    }                  
                }
            } else {
                console.error('Los datos no son un array:', data);
            }
        })
    .catch(error => {
        console.error('Error de archivo JSON:', error);
    });
}

let validado = () => {
    if(localStorage.getItem("usuarios") != null){
        return true;
    }else{
        return false;
    }
}
