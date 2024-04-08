let dataTable;
let dataTableIsInitialized = false;

//CONFIGURACIÓN DE LA DATATABLE

const dataTableOptions = {
    columnDefs:[
        {className:"centered", targets:[0,1,2,3,4,5,6]},
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

    await listUsers();
    dataTable = $("#datatable_users").DataTable(dataTableOptions);
    dataTableIsInitialized = true;
}

//OBTENCIÓN E IMPRENSIÓN DE DATOS

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
                        <td>
                            <button id="${user.id_estudiante}" class="btn btn-sm btn-primary" onclick="proceso_modal(this.id)" data-bs-toggle="modal" data-bs-target="#editModal"><i class="fa-solid fa-pencil fa-xl"></i></button>
                            <button id="${user.id_estudiante}" class="btn btn-sm btn-danger" onclick="eliminar_usuario(this.id)"><i class="fa-solid fa-trash-can fa-xl"></i></button>
                        </td>
                    </tr>
                `
            });
            tableBody_users.innerHTML = content;
    } catch (ex) {
        alert(ex)
    }
}

//ELIMINAR USUARIO DE LA BASE DE DATOS

const eliminar_usuario = async(id_boton) => {
    axios.delete(`http://127.0.0.1:3000/delete_Estudiante/${id_boton}`)
        .then(response => {
            initDataTable();
        })
        .catch(error => {
            console.error(error);
        });
}

//APERTURA Y ASIGNACIÓN DE DATOS SELECCIONADOS EN EL MODAL

ideditar = '';
const proceso_modal = async(id_boton) => {
    ideditar = id_boton;
    datos = await obten_usuario_id("http://127.0.0.1:3000/getEstudianteById/" ,ideditar);
    editModalLabel.innerHTML = "Modificar datos de " + datos[0].nombre + " " + datos[0].apellido;

    TXT_Nombres.value = datos[0].nombre;
    TXT_Apellidos.value = datos[0].apellido;
    TXT_Correo.value = datos[0].correo;
    Pass_Usuario.value = datos[0].contrasena;
    NMB_Celuco.value = datos[0].numero_celular;
}

//ACTUALIZACION DE USUARIO SELECCIONADO

const Boton_enviar = document.querySelector('#editModal .modal-footer button.btn-primary');

Boton_enviar.addEventListener('click', async() => {

    var valores = {nombre: document.getElementById('TXT_Nombres').value,
        apellido: document.getElementById('TXT_Apellidos').value,
        numero_celular: document.getElementById('NMB_Celuco').value,
        correo: document.getElementById('TXT_Correo').value,
        contrasena: document.getElementById('Pass_Usuario').value
    };

    if (!valores.correo || !valores.nombre || !valores.apellido || !valores.numero_celular || !valores.contrasena) {
        alert("Por favor, complete todos los campos.");
    } else if (!validarCorreo(valores.correo)) {
        alert("Correo invalido.");
    }  else if (!validarNombre(valores.nombre)) {
        alert("Nombre/s invalido/s.");
    } else if (!validarNombre(valores.apellido)) {
        alert("Apellido/s invalido/s.");
    } else if (!validarTelefono(valores.numero_celular)) {
        alert("Telefono invalido");
    } else if (!validarPassword(valores.contrasena)) {
        alert("La contraseña no es segura. Debe contener:\n*Minimo 1 letra mayuscula\n*Minimo 1 letra minuscula\n*Minimo 1 numero\n*Minimo 1 caracter especial\n*Minimo 8 caracteres, maximo 15");
    } else {
        url = 'http://127.0.0.1:3000/update_Estudiante/' + ideditar;
        axios.put(url, valores)
            .then(async(response) => {
                alert("Modificación exitosa, puede cerrar el menú");
                await initDataTable();
            })
            .catch((error) => {
                console.error(error);
            });
    }
});

//OBTENCIÓN DEL USUARIO DEL BOTÓN PRESIONADO

const obten_usuario_id = async(url, id_usuario) => {
    try {
        const response = await fetch(url + id_usuario);
        const data = await response.json();
        return data;
    } catch (error) {
        alert(error);
    }
}

//VERIFICACIONES PARA EL UPDATE

const validarCorreo = (emailInput) => {
    var emailPattern = /^[^\s@]+@[^\s@]+\.(?:com|co|edu|net|org|gov|mil|biz|info|name|pro|aero|coop|int|jobs|museum|arpa|asia|cat|mobi|tel|travel|xxx)$/i;
    return emailPattern.test(emailInput);
  }
  
  const validarNombre = (nombreInput) => {
    var nombrePattern = /^[a-zA-ZÀ-ÿ\s']+$/;
    return nombrePattern.test(nombreInput);
  }
  
  const validarTelefono = (telefonoInput) => {
      var telefonoPattern = /^\d{1,11}$/;
      return telefonoPattern.test(telefonoInput);
  }
  
  const validarPassword = (password) => {
      const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
      return regex.test(password);
  }

window.addEventListener("load",async()=>{
    await initDataTable();
})