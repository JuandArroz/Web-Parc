
const traerdatos = () => {
    
    

    const xhttp =new XMLHttpRequest();

    xhttp.open('GET','https://storage.googleapis.com/datos_tablas/datos.json',true);

    xhttp.send();

    xhttp.onreadystatechange = function() {
        
        if(this.readyState == 4 && this.status == 200){

            let datos = JSON.parse(this.responseText);
            let tablauser = document.querySelector('#tablauser');
            tablauser.innerHTML = '';

            for(let item of datos ){
                tablauser.innerHTML += `   
                <tr>
                <th>${item.nombres}</th>
                <th>${item.apellidos}</th>
                <th>${item.correo}</th>
                <th>${item.pass}</th>
                <th>${item.tipouser}</th>
            </tr>
            `
           
             
            }
        }
    }

}
