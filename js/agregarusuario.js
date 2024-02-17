const agregarUsuario = () => {
    
    let correo = document.getElementById("TXT_Correo").value;
    let nombres = document.getElementById("TXT_Nombres").value;
    let apellidos = document.getElementById("TXT_Apellidos").value;
    let password = document.getElementById("Pass_Usuario").value;
    let tipoUsuario = document.getElementById("Select_TipoUsuario").value;

    
    let nuevoUsuario = {
        id: obtenerNuevoId(), 
        correo: correo,
        nombres: nombres,
        apellidos: apellidos,
        pass: password,
        tipouser: parseInt(tipoUsuario) 
    };


    fetch('https://storage.googleapis.com/datos_tablas/datos.json')
        .then(response => response.json())
        .then(data => {
            
            data.push(nuevoUsuario);


            fetch('https://storage.googleapis.com/datos_tablas/datos.json', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
            .then(response => response.json())
            .then(data => {
                console.log('Usuario agregado exitosamente:', nuevoUsuario);
                alert("Usuario agregado exitosamente.");

            })
            .catch(error => {
                console.error('Error al agregar usuario:', error);
                alert("Hubo un error al agregar el usuario. Por favor, inténtalo de nuevo.");
            });
        })
        .catch(error => {
            console.error('Error al obtener datos JSON:', error);
            alert("Hubo un error al agregar el usuario. Por favor, inténtalo de nuevo.");
        });
}

const obtenerNuevoId = () => {
    let ultimoId = 4; // Considerando que ya hay 4 usuarios

    return ultimoId + 1;
}
