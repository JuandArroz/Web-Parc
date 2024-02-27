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
                <th>${item.id}</th>
                <th>${item.nombres}</th>
                <th>${item.apellidos}</th>
                <th>${item.correo}</th>
                <th>${item.pass}</th>
                <th>${item.tipouser}</th>
            </tr>
            `                        
            }
        }
        if(validado()){
            let nuevos = JSON.parse(localStorage.getItem("usuarios"));
            for(let unico of nuevos){
                tablauser.innerHTML += `
                <tr>
                <th>${unico.id}</th>
                <th>${unico.nombres}</th>
                <th>${unico.apellidos}</th>
                <th>${unico.correo}</th>
                <th>${unico.pass}</th>
                <th>${unico.tipouser}</th>
                </tr>
                `
            }
        }else{
            console.log("LocalStorage vacío");
        }
    }

}
