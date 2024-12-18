document.addEventListener('DOMContentLoaded', async function() {
    const email = localStorage.getItem('userEmail');
    console.log(email);
    if (!email) {
        alert("Você precisa estar logado para ver esta página.");
        window.location.href = "../../login.html";
        return;
    }

    try {
        const response = await fetch('http://localhost:8080/register/exames', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: email })
        });

        if (!response.ok) {
            throw new Error('Erro ao buscar exames');
        }

        const examesList = await response.json();

        const examesTableBody = document.getElementById('examesTableBody');
        examesTableBody.innerHTML = '';

        examesList.forEach(exame => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${exame.nomeExame}</td>
                <td>${exame.dataExame}</td>
                <td>${exame.comentarios}</td>
                <td>${exame.resultado}</td>
            `;
            examesTableBody.appendChild(row);
        });
    } catch (error) {
        console.error(error);
        alert("Erro ao carregar exames: " + error.message);
    }
});
