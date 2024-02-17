document.addEventListener('DOMContentLoaded', function() {
    console.log('Vinculado');

    const contactForm = document.getElementById('contactForm');

    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();
        enviarFormulario();
    });

    const enviarFormulario = () => {
        console.log("Enviando formulario...");

        let genero = document.getElementById("genero").value; 
        let nombre = document.getElementById("nombre").value;
        let email = document.getElementById("email").value;
        let mensaje = document.getElementById("mensaje").value;

        document.getElementById("nombre").value = '';
        document.getElementById("email").value = '';
        document.getElementById("mensaje").value = '';

        alert("¡Gracias por contactarnos, " + nombre + "! Nos pondremos en contacto contigo pronto. Género: " + genero);
    };
});
