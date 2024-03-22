const validarPropuesta = (event) => {
    event.preventDefault(); 

    const nombreCompleto = document.getElementById('nombreCompleto').value.trim();
    const email = document.getElementById('email').value.trim();
    const programaEstudio = document.getElementById('programaEstudio').value.trim();
    const tituloProyecto = document.getElementById('tituloProyecto').value.trim();
    const descripcionProyecto = document.getElementById('descripcionProyecto').value.trim();
    
    if (nombreCompleto === '' || email === '' || programaEstudio === '' || tituloProyecto === '' || descripcionProyecto === '') {
        alert('Por favor, completa todos los campos.');
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Por favor, ingresa un correo electrónico válido.');
        return;
    }

    enviarPropuestaAlServidor({ nombreCompleto, email, programaEstudio, tituloProyecto, descripcionProyecto });
    
    document.getElementById('contactForm').reset();

    alert('Propuesta enviada exitosamente.');
};

document.getElementById('contactForm').addEventListener('submit', validarPropuesta);
