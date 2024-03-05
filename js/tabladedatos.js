let validado = () => {
    if(localStorage.getItem("usuarios") != null){
        return true;
    }else{
        return false;
    }
}

const traerdatos = () => {
    
    

    const xhttp =new XMLHttpRequest();

    xhttp.open('GET','https://storage.googleapis.com/datos_tablas/datos.json',true);

    xhttp.send();

    xhttp.onreadystatechange = function() {
        
        if(this.readyState == 4 && this.status){

            let datos = JSON.parse(this.responseText);
            let tablauser = document.querySelector('#tablauser');
            tablauser.innerHTML = '';

            for(let item of datos ){
                tablauser.innerHTML += `
                <tr>
                    <th scope="row">${item.id}</th>
                    <td>${item.nombres}</td>
                    <td>${item.apellidos}</td>
                    <td>${item.correo}</td>
                    <td>${item.pass}</td>
                    <td>${item.tipouser}</td>
                </tr>
                `                        
            }
        }
        if(validado()){
            let nuevos = JSON.parse(localStorage.getItem("usuarios"));
            for(let unico of nuevos){
                tablauser.innerHTML += `
                <tr>
                    <th scope="row">${unico.id}</th>
                    <td>${unico.nombres}</td>
                    <td>${unico.apellidos}</td>
                    <td>${unico.correo}</td>
                    <td>${unico.pass}</td>
                    <td>${unico.tipouser}</td>
                </tr>
                `
            }
        }else{
            console.log("LocalStorage vacío");
        }
    }

}
