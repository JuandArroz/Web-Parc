let dataTable;
let dataTableIsInitialized = false;
var sesion_actual = JSON.parse(localStorage.getItem("sesionusuario"));

const validar_ses = () => {
    if(sesion_actual == null){
        return false;
    }else{
        return true;
    }
}

//CONFIGURACIÓN DE LA DATATABLE

const dataTableOptions = {
    columnDefs:[
        {className:"centered", targets:[0,1,2,3,4,5,6,7,8]},
        {orderable:false, targets:[5,6,8]}
    ],
    pageLength:10,
    lengthMenu: [10, 20, 40, 60, 80, 100],
    destroy:true,
    language: {
        lengthMenu: "Mostrar _MENU_ registros por página",
        zeroRecords: "Ningún usuario encontrado",
        info: "Mostrando de _START_ a _END_ de un total de _TOTAL_ registros",
        infoEmpty: "Ningún usuario encontrado",
        infoFiltered: "(filtrados desde _MAX_ registros totales)",
        search: "Buscar:",
        loadingRecords: "Cargando...",
        paginate: {
            first: "Primero",
            last: "Último",
            next: "Siguiente",
            previous: "Anterior"
        }
    }
};

//INICIALIZACIÓN DE DATATABLE

const initDataTable=async()=>{
    if(dataTableIsInitialized){
        dataTable.destroy();
    }
    let url = '';
    if(sesion_actual[0].tipouser == 1){
        url = "http://127.0.0.1:3000/getPropuestaDocById/"+sesion_actual[0].id_docente;
    }else if(sesion_actual[0].tipouser == 0){
        url = "http://127.0.0.1:3000/getAllPropuesta";
    }
    await listPropu(url);
    dataTable = $("#datatable_propuestas").DataTable(dataTableOptions);
    dataTableIsInitialized = true;
}

//OBTENCIÓN E IMPRENSIÓN DE DATOS

const listPropu = async (url) => {
    try {
        if (validar_ses) {
            const response = await fetch(url);
            const propuestas = await response.json();

            let content = ``;
            await Promise.all(propuestas.map(async (propuesta, index) => {
                const response2 = await fetch("http://127.0.0.1:3000/getEstudianteById/" + propuesta.id_estudiante);
                const estudiantes = await response2.json();

                if (!propuesta.fecha_presentacion) {
                    propuesta.fecha_presentacion = 'No definida';
                }
                if (!propuesta.fecha_aprobacion) {
                    propuesta.fecha_aprobacion = 'No definida';
                }

                content += `
                    <tr>
                        <th>${index + 1}</th>
                        <td>${propuesta.id_propuesta}</td>
                        <td>${propuesta.estado}</td>
                        <td>${propuesta.titulo}</td>
                        <td>${propuesta.descripcion.substring(0, 50)}</td>
                        <td>${propuesta.fecha_presentacion}</td>
                        <td>${propuesta.fecha_aprobacion}</td>
                        <td>${estudiantes[0].nombre} ${estudiantes[0].apellido}</td>
                        <td>
                            <button id="${propuesta.id_propuesta}" class="btn btn-sm btn-primary" onclick="proceso_modal(this.id)" data-bs-toggle="modal" data-bs-target="#RevisarModal"><i class="fa-solid fa-eye fa-xl"></i></button>                            
                        </td>
                    </tr>
                `;
            }));
            tableBody_propuestas.innerHTML = content;
        } else {
            alert("ERROR");
            window.location = "../index.html";
        }
    } catch (ex) {
        alert(ex);
    }
};

var ideditar = '';
const proceso_modal = async(id_boton) => {
    ideditar = id_boton;
    const response = await fetch("http://127.0.0.1:3000/getPropuestaById/"+ideditar);
    const data = await response.json();

    const response2 = await fetch("http://127.0.0.1:3000/getEstudianteById/" + data[0].id_estudiante);
    const estudiantes = await response2.json();

    staticBackdropLabel.innerHTML = data[0].titulo;
    ApartadoId.innerHTML = "Id de propuesta: "+data[0].id_propuesta;
    ApartadoDescripcion.innerHTML = data[0].descripcion;
    ApartadoNombre.innerHTML = "Estudiante: " + estudiantes[0].nombre + " " + estudiantes[0].apellido;
    if (!data[0].fecha_presentacion) {
        data[0].fecha_presentacion = 'No definida';
    }
    if (!data[0].fecha_aprobacion) {
        data[0].fecha_aprobacion = 'No definida';
    }
    ApartadoFecha1.innerHTML = data[0].fecha_presentacion;
    ApartadoFecha2.innerHTML = data[0].fecha_aprobacion;
}

const enviar_correccion = () => {
    var mensaje = document.getElementById("correccion_propuesta").value;
    /*var valores = {
        id_asesor: ,
        id_propuesta: ideditar,
        texto: mensaje,
    }*/


    if(!mensaje){
        alert("El mensaje de corrección no puede estar vacío");
    }else{
        axios.post(url, valores)
        .then(function (response) {
            alert("Registro exitoso");
            location.reload();
        })
        .catch(err => {
            console.error('Error: ', err);
            alert("Ocurrió un error al intentar agregar el usuario.");
        });
    }

    document.getElementById("correccion_propuesta").value = "";

}
BotonCorregir.addEventListener("click", enviar_correccion);

window.addEventListener("load",async()=>{
    await initDataTable();
})