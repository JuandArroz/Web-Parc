document.addEventListener('DOMContentLoaded', async function() {
    try {
        const response = await fetch("http://127.0.0.1:3000/getAllEstudiante");
        const users = await response.json();

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

        users.forEach(user => {
            if (user.tipo === "Administrador") {
                userDataBar.datasets[0].data[0]++;
                userDataLine.datasets[0].data[0]++;
            } else if (user.tipo === "Docente") {
                userDataBar.datasets[0].data[1]++;
                userDataLine.datasets[0].data[1]++;
            } else if (user.tipo === "Estudiante") {
                userDataBar.datasets[0].data[2]++;
                userDataLine.datasets[0].data[2]++;
            }
        });

        const userChartBar = new Chart(document.getElementById('userChartBar').getContext('2d'), { type: 'bar', data: userDataBar });
        const userChartLine = new Chart(document.getElementById('userChartLine').getContext('2d'), { type: 'line', data: userDataLine });
        const docentesChart = new Chart(document.getElementById('docentesChart').getContext('2d'), { type: 'pie', data: docentesData });

    } catch (ex) {
        alert(ex)
    }
});
