document.addEventListener('DOMContentLoaded', async function() {
    try {
        // Función para obtener todos los estudiantes
        const response = await fetch("http://127.0.0.1:3000/getAllEstudiante");
        const users = await response.json();

        // Función para obtener todas las propuestas
        const propuestasResponse = await fetch("http://127.0.0.1:3000/getAllPropuesta");
        const propuestas = await propuestasResponse.json();

        // Configuración de datos para los gráficos de usuarios
        const userDataBar = {
            labels: ["Administrador", "Docente", "Estudiante"],
            datasets: [{
                label: 'Usuarios (Barras)',
                data: [0, 0, 0],
                backgroundColor: ['rgba(255, 99, 132, 0.5)', 'rgba(54, 162, 235, 0.5)', 'rgba(255, 206, 86, 0.5)'],
                borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)'],
                borderWidth: 1
            }]
        };

        const userDataLine = {
            labels: ["Administrador", "Docente", "Estudiante"],
            datasets: [{
                label: 'Usuarios (Líneas)',
                data: [0, 0, 0],
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
                type: 'line'
            }]
        };

        // Contador de docentes por área
        const docentesPorArea = { "Sistemas Distribuidos": 0, "Gestion de Redes": 0 }; 
        users.forEach(user => {
            if (user.tipo === "Docente") {
                docentesPorArea[user.area] = (docentesPorArea[user.area] || 0) + 1;
            }
        });

        const docentesData = {
            labels: Object.keys(docentesPorArea),
            datasets: [{
                label: 'Docentes por Área',
                backgroundColor: ['rgba(255, 99, 132, 0.5)', 'rgba(54, 162, 235, 0.5)'],
                borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
                borderWidth: 1,
                data: Object.values(docentesPorArea)
            }]
        };

        // Contador de propuestas por estado
        const propuestasPorEstado = { "Pendiente": 0, "Aprobada": 0, "Rechazada": 0 }; 
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
            } else if (user.tipo === "Docente") {
                userDataBar.datasets[0].data[1]++;
                userDataLine.datasets[0].data[1]++;
            } else {
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
                    text: 'Docentes por Área'
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

