document.addEventListener('DOMContentLoaded', async function() {
    try {
        // Función para obtener todos los estudiantes
        const response = await fetch("http://127.0.0.1:3000/getAllEstudiante");
        const users = await response.json();

        // Función para obtener todas las propuestas
        const propuestasResponse = await fetch("http://127.0.0.1:3000/getAllPropuesta");
        const propuestas = await propuestasResponse.json();

        // Función para obtener todos los docentes
        const docentesResponse = await fetch("http://127.0.0.1:3000/getAllDocente");
        const docentes = await docentesResponse.json();

        // Configuración de datos para los gráficos de usuarios
        const userDataBar = {
            labels: ["Administrador", "Docente", "Estudiante"],
            datasets: [{
                label: 'Usuarios (Barras)',
                data: [0, docentes.length, users.length],
                backgroundColor: ['rgba(255, 99, 132, 0.5)', 'rgba(54, 162, 235, 0.5)', 'rgba(255, 206, 86, 0.5)'],
                borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)'],
                borderWidth: 1
            }]
        };

        const userDataLine = {
            labels: ["Administrador", "Docente", "Estudiante"],
            datasets: [{
                label: 'Usuarios (Líneas)',
                data: [0, docentes.length, users.length],
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
                type: 'line'
            }]
        };

        // Contador de docentes por área
        const docentesPorArea = {};
        docentes.forEach(docente => {
            docentesPorArea[docente.especialidad] = (docentesPorArea[docente.especialidad] || 0) + 1;
        });

        const docentesData = {
            labels: Object.keys(docentesPorArea),
            datasets: [{
                label: 'Docentes por Especialidad',
                backgroundColor: Object.keys(docentesPorArea).map((especialidad, index) => {
                    // Genera un color aleatorio para cada especialidad
                    const colorIndex = index % 10; // Utiliza solo los primeros 10 colores
                    return `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.5)`;
                }),
                borderColor: Object.keys(docentesPorArea).map(() => 'rgba(0, 0, 0, 1)'),
                borderWidth: 1,
                data: Object.values(docentesPorArea)
            }]
        };

        // Contador de propuestas por estado
        const propuestasPorEstado = {};
        propuestas.forEach(propuesta => {
            propuestasPorEstado[propuesta.estado] = (propuestasPorEstado[propuesta.estado] || 0) + 1;
        });

        const propuestasData = {
            labels: Object.keys(propuestasPorEstado),
            datasets: [{
                label: 'Propuestas por Estado',
                backgroundColor: ['rgba(255, 99, 132, 0.5)', 'rgba(54, 162, 235, 0.5)', 'rgba(255, 206, 86, 0.5)'],
                borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)'],
                borderWidth: 1,
                data: Object.values(propuestasPorEstado)
            }]
        };

        // Contador de usuarios por tipo
        users.forEach(user => {
            if (user.tipo === "Administrador") {
                userDataBar.datasets[0].data[0]++;
                userDataLine.datasets[0].data[0]++;
            } else if (user.tipo === "Estudiante") {
                userDataBar.datasets[0].data[2]++;
                userDataLine.datasets[0].data[2]++;
            }
        });

        // Configuración de gráficos
        const userChartBar = document.getElementById('userChartBar').getContext('2d');
        const userChartLine = document.getElementById('userChartLine').getContext('2d');
        const docentesChart = document.getElementById('docentesChart').getContext('2d');
        const propuestasChart = document.getElementById('propuestasChart').getContext('2d');

        new Chart(userChartBar, {
            type: 'bar',
            data: userDataBar,
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });

        new Chart(userChartLine, {
            type: 'line',
            data: userDataLine,
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });

        new Chart(docentesChart, {
            type: 'doughnut',
            data: docentesData,
            options: {
                responsive: true,
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Docentes por Especialidad'
                },
                animation: {
                    animateScale: true,
                    animateRotate: true
                }
            }
        });

        new Chart(propuestasChart, {
            type: 'pie',
            data: propuestasData,
            options: {
                responsive: true,
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Propuestas por Estado'
                },
                animation: {
                    animateScale: true,
                    animateRotate: true
                }
            }
        });
    } catch (error) {
        console.error('Error fetching and parsing data:', error);
    }
});

