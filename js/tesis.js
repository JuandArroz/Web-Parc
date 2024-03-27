var tesisData = [];
let itemsPerPage = 10;
let currentPage = 1;

const dataTable = async() =>{
    await obten_data();
    
    const pages = [];
    for (let i = 0; i <= Math.ceil(tesisData.length / itemsPerPage); i++) {
        pages.push(i)
    }

    const indexLastPage = currentPage * itemsPerPage;
    const indexFirstPage = indexLastPage - itemsPerPage;
    const currentItems = tesisData.slice(indexFirstPage, indexLastPage);

    let contenido = ``;
        currentItems.forEach((tesis, index) => {
            contenido += `
                <div class="row mb-5">
                    <table class="table">
                        <th>${tesis.id_tesis}</th>
                        <th>${tesis.titulo}</th>
                        <th>${tesis.descripcion}</th>
                        <th>${tesis.area_tematica}</th>
                        <th>${tesis.fecha_inicio}</th>
                        <th>${tesis.fecha_finalizacion}</th>
                        <th>${tesis.id_estudiante}</th>
                        <th>Archivo</th>
                    </table>
                </div>
            `
        });
        tesis_container.innerHTML = contenido;
}

const obten_data = async() =>{
    try {
        const response = await fetch("http://127.0.0.1:3000/getAllTesis");
        const data = await response.json();
        
        tesisData = data;
    } catch (ex) {
        alert(ex)
    }
}

const prev_btn = () =>{
    if((currentPage - 1) * itemsPerPage){
        currentPage--;
        dataTable();
    }
}

const next_btn = () =>{
    const lastIndex = currentPage * itemsPerPage;

    if(lastIndex < tesisData.length){
        currentPage++;
        dataTable();
    }
}

boton_previo.addEventListener("click", prev_btn, false)
boton_siguiente.addEventListener("click", next_btn, false)

window.addEventListener("load",async()=>{
    await dataTable();
})