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
                    <td data-label="Pos">${stats.pos}</td>
                    <td data-label="Equipo">${stats.team}</td>
                    <td data-label="PJ">${stats.pj}</td>
                    <td data-label="G">${stats.g}</td>
                    <td data-label="E">${stats.e}</td>
                    <td data-label="P">${stats.p}</td>
                    <td data-label="GF">${stats.gf}</td>
                    <td data-label="GC">${stats.gc}</td>
                    <td data-label="DG">${dg}</td>
                    <td data-label="Pts"><strong>${stats.pts}</strong></td>
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
