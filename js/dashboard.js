document.addEventListener('DOMContentLoaded', function() {
    
    const userDataBar = {
        labels: ["Administrador", "Docente", "Estudiante"],
        datasets: [{
            label: 'Usuarios (Barras)',
            data: [2, 2, 6],
            backgroundColor: ['rgba(255, 99, 132, 0.5)', 'rgba(54, 162, 235, 0.5)', 'rgba(255, 206, 86, 0.5)'],
            borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)'],
            borderWidth: 1
        }]
    };
    const userCtxBar = document.getElementById('userChartBar').getContext('2d');
    const userChartBar = new Chart(userCtxBar, { type: 'bar', data: userDataBar });

    const userDataLine = {
        labels: ["Administrador", "Docente", "Estudiante"],
        datasets: [{
            label: 'Usuarios (Líneas)',
            data: [2, 2, 6],
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
            type: 'line'
        }]
    };
    const userCtxLine = document.getElementById('userChartLine').getContext('2d');
    const userChartLine = new Chart(userCtxLine, { type: 'line', data: userDataLine });


    const docentesPorArea = { "Sistemas Distribuidos": 1, "Gestion de Redes": 1 }; 
    const colors = ['rgba(255, 99, 132, 0.5)', 'rgba(54, 162, 235, 0.5)']; 
    const docentesData = {
        labels: Object.keys(docentesPorArea),
        datasets: [{
            label: 'Docentes por Área',
            backgroundColor: colors,
            borderColor: colors,
            borderWidth: 1,
            data: Object.values(docentesPorArea)
        }]
    };
    const docentesCtx = document.getElementById('docentesChart').getContext('2d');
    const docentesChart = new Chart(docentesCtx, { type: 'pie', data: docentesData });

    const propuestasPorArea = { 
        "Tecnologias Emergentes": 1, 
        "Ingeniería de Control": 1,
        "Internet de las Cosas (IoT) Emergentes": 1,
        "Gestión de Redes": 1
    }; 
    const propuestasColors = ['rgba(255, 99, 132, 0.5)', 'rgba(54, 162, 235, 0.5)', 'rgba(255, 206, 86, 0.5)', 'rgba(75, 192, 192, 0.5)']; // Colores para las áreas temáticas
    const propuestasData = {
        labels: Object.keys(propuestasPorArea),
        datasets: [{
            label: 'Propuestas por Área Temática',
            backgroundColor: propuestasColors,
            borderColor: propuestasColors,
            borderWidth: 1,
            data: Object.values(propuestasPorArea)
        }]
    };
    const propuestasCtx = document.getElementById('propuestasChart').getContext('2d');
    const propuestasChart = new Chart(propuestasCtx, { type: 'doughnut', data: propuestasData });
});
