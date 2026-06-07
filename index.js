async function fetchAndRenderTable() {
    try {
        const response = await fetch('data.json');
        const data = await response.json();
        const teamStats = data.teamStats;

        const tableBody = document.getElementById('tableBody');
        if (!tableBody) return;

        const rowsHtml = teamStats.map(stats => {
            const dg = stats.gf - stats.gc;
            return `
                <tr>
                    <td>${stats.pos}</td>
                    <td>${stats.team}</td>
                    <td>${stats.pj}</td>
                    <td>${stats.g}</td>
                    <td>${stats.e}</td>
                    <td>${stats.p}</td>
                    <td>${stats.gf}</td>
                    <td>${stats.gc}</td>
                    <td>${dg}</td>
                    <td><strong>${stats.pts}</strong></td>
                </tr>
            `;
        }).join('');

        tableBody.innerHTML = rowsHtml;
    } catch (error) {
        console.error('Error al cargar los datos de la tabla:', error);
    }
}

// Renderizar la tabla cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', fetchAndRenderTable);
