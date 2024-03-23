document.addEventListener('DOMContentLoaded', function() {
    // Datos de ejemplo para los gráficos
    const userData = {
        labels: ["Administrador", "Docente", "Estudiante"],
        datasets: [{
            label: 'Usuarios',
            data: [2, 2, 10], // Reemplazar con los datos reales
            backgroundColor: [
                'rgba(255, 99, 132, 0.5)',
                'rgba(54, 162, 235, 0.5)',
                'rgba(255, 206, 86, 0.5)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)'
            ],
            borderWidth: 1
        }]
    };

    const proposalData = [
        { id: 3, title: 'Gestion Digital de Monitorias Academicas en la IUB', student: 'Juan Pérez' },
        { id: 4, title: 'Desarrollo de motopanes a nivel industrial', student: 'María González' }
    ];

    // Generar gráfico de usuarios
    const userCtx = document.getElementById('userChart').getContext('2d');
    const userChart = new Chart(userCtx, {
        type: 'bar',
        data: userData,
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

    // Mostrar propuestas enviadas
    const proposalList = document.getElementById('proposalList');
    proposalData.forEach(proposal => {
        const listItem = document.createElement('li');
        listItem.classList.add('list-group-item');
        listItem.innerHTML = `<strong>${proposal.title}</strong> - ${proposal.student}`;
        proposalList.appendChild(listItem);
    });
});
