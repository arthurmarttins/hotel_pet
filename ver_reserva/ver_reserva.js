document.addEventListener("DOMContentLoaded", () => {
    const queryParams = new URLSearchParams(window.location.search);
    const reservaId = queryParams.get("id");
    const reservas = JSON.parse(localStorage.getItem("reservas")) || [];
    const reserva = reservas.find((r) => r.id == reservaId);

    if (reserva) {
        document.querySelector(".reserva-detalhes").innerHTML = `
            <p><strong>Id:</strong> ${reserva.id}</p>
            <p><strong>Proprietário:</strong> ${reserva.proprietario}</p>
            <p><strong>Pet:</strong> ${reserva.pet}</p>
            <p><strong>Chegada:</strong> ${reserva.entrada}</p>
            <p><strong>Partida:</strong> ${reserva.saida}</p>
            <p><strong>Notas:</strong> ${reserva.notas || "N/A"}</p>
            <p><strong>Notas dos funcionários:</strong> ${reserva.anotacoesFuncionario || "N/A"}</p>
            <p><strong>Status:</strong> ${reserva.status}</p>
            <p><strong>Total das Diárias:</strong> R$ ${(parseFloat(reserva.totalDiarias) * valorDiaria).toFixed(2)}</p>
        `;
    }
});
