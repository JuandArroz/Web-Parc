let validado = () => {
    if(localStorage.getItem("usuarios") != null){
        return true;
    }else{
        return false;
    }
}

let dataTable;
let dataTableIsInitialized = false;

const dataTableOptions = {
    columnDefs:[
        {className:"centered", targets:[0,1,2,3,4,5,6,7]},
        {orderable:false, targets:[5,7]}
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

const initDataTable=async()=>{
    if(dataTableIsInitialized){
        dataTable.destroy();
    }

    await listUsers();
    dataTable = $("#datatable_users").DataTable(dataTableOptions);
    dataTableIsInitialized = true;
}

const listUsers=async()=>{
    try {
            const response = await fetch("http://127.0.0.1:3000/getAllEstudiante");
            const users= await response.json();

            let content = ``;
            users.forEach((user, index) => {
                content +=`
                    <tr>
                        <th>${index + 1}</th>
                        <td>${user.id_estudiante}</td>
                        <td>${user.nombre}</td>
                        <td>${user.apellido}</td>
                        <td>${user.correo}</td>
                        <td>${user.numero_celular}</td>
                        <td>Estudiante</td>
                        <td>
                            <button id="BTN1_${user.id_estudiante}" class="btn btn-sm btn-primary"><i class="fa-solid fa-pencil fa-xl"></i></button>
                            <button id="BTN2_${user.id_estudiante}" class="btn btn-sm btn-danger"><i class="fa-solid fa-trash-can fa-xl"></i></button>
                        </td>
                    </tr>
                `
            });
            tableBody_users.innerHTML = content;
    } catch (ex) {
        alert(ex)
    }
}

window.addEventListener("load",async()=>{
    await initDataTable();
})
