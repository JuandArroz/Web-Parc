let dataTable;
let dataTableIsInitialized = false;
var sesion_actual = JSON.parse(localStorage.getItem("sesionusuario"));
console.log(sesion_actual[0].id_docente);

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
        {className:"centered", targets:[0,1,2,3,4,5,6,7]},
        {orderable:false, targets:[5,6]}
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

    await listPropu();
    dataTable = $("#datatable_propuestas").DataTable(dataTableOptions);
    dataTableIsInitialized = true;
}

//OBTENCIÓN E IMPRENSIÓN DE DATOS

const listPropu=async()=>{
    try {   
            if(validar_ses){
                const response = await fetch("http://127.0.0.1:3000/getPropuestaDocById/"+sesion_actual[0].id_docente);
                const propuestas = await response.json();

                let content = ``;
                propuestas.forEach((propuesta, index) => {
                    content +=`
                        <tr>
                            <th>${index + 1}</th>
                            <td>${propuesta.id_propuesta}</td>
                            <td>${propuesta.estado}</td>
                            <td>${propuesta.titulo}</td>
                            <td>${propuesta.descripcion}</td>
                            <td>${propuesta.fecha_presentacion}</td>
                            <td>${propuesta.fecha_aprobacion}</td>
                            <td>${propuesta.id_estudiante}</td>
                            <td>
                                <button id="${propuesta.id_propuesta}" class="btn btn-sm btn-primary" onclick="proceso_modal(this.id)" data-bs-toggle="modal" data-bs-target="#editModal"><i class="fa-solid fa-eye fa-xl"></i></button>
                                <button id="${propuesta.id_propuesta}" class="btn btn-sm btn-danger" onclick="eliminar_usuario(this.id)"><i class="fa-solid fa-trash-can fa-xl"></i></button>
                            </td>
                        </tr>
                    `
                });
                tableBody_propuestas.innerHTML = content;
            }else{
                alert("ERROR");
                window.location = "../index.html";
            }
    } catch (ex) {
        alert(ex)
    }
}

window.addEventListener("load",async()=>{
    await initDataTable();
})