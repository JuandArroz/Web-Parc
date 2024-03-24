var tesisData = [];

const dataTable = async() =>{
    await obten_data();
    console.log(tesisData)
    
}

const obten_data = async() =>{
    try {
        const response = await fetch("http://127.0.0.1:3000/getAllTesis");
        const data = await response.json();
        
        tesisData = data;
        let contenido = ``;
        tesisData.forEach((tesis, index) => {
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

    } catch (ex) {
        alert(ex)
    }
}

window.addEventListener("load",async()=>{
    await dataTable();
})