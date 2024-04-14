document.addEventListener('DOMContentLoaded', function() {
    const propuestaForm = document.getElementById('propuestaForm');

    propuestaForm.addEventListener('submit', function(event) {
        event.preventDefault(); 
        
        const titulo = document.getElementById('titulo').value;
        const descripcion = document.getElementById('descripcion').value;
        const fechaPresentacion = document.getElementById('fecha_presentacion').value;
        const archivoPDF = document.getElementById('archivo_pdf').files[0]; 

        const formData = new FormData();
        formData.append('titulo', titulo);
        formData.append('descripcion', descripcion);
        formData.append('fecha_presentacion', fechaPresentacion);
        formData.append('archivo_pdf', archivoPDF);

        fetch('ruta_del_servidor/donde/enviar/propuesta', {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (response.ok) {
                return response.json(); 
            }
            throw new Error('Error al enviar la propuesta');
        })
        .then(data => {
            console.log('Propuesta enviada con éxito:', data);
            alert('Propuesta enviada con éxito');
            propuestaForm.reset(); 
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error al enviar la propuesta');
        });
    });
});
