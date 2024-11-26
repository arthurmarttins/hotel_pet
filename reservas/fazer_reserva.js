document.addEventListener("DOMContentLoaded", () => {
    // Função para calcular o número de diárias
    function calcularDiarias() {
        const entrada = document.getElementById("entrada").value;
        const saida = document.getElementById("saida").value;
        const totalDiariasInput = document.getElementById("total_diarias");

        if (entrada && saida) {
            const dataEntrada = new Date(entrada.split("/").reverse().join("-"));
            const dataSaida = new Date(saida.split("/").reverse().join("-"));
            const diferencaEmMilissegundos = dataSaida - dataEntrada;
            const dias = diferencaEmMilissegundos / (1000 * 60 * 60 * 24);

            if (dias >= 0) {
                totalDiariasInput.value = dias;
            } else {
                totalDiariasInput.value = "Data inválida";
            }
        } else {
            totalDiariasInput.value = "";
        }
    }

    // Função para salvar a reserva no localStorage
    function salvarReserva(event) {
        event.preventDefault();

        const pet = document.getElementById("pet").value;
        const entrada = document.getElementById("entrada").value;
        const saida = document.getElementById("saida").value;
        const notas = document.getElementById("notas").value;
        const totalDiarias = document.getElementById("total_diarias").value;

        if (pet && entrada && saida && totalDiarias !== "") {
            const reserva = { pet, entrada, saida, notas, totalDiarias };

            let reservas = JSON.parse(localStorage.getItem("reservas")) || [];
            reservas.push(reserva);
            localStorage.setItem("reservas", JSON.stringify(reservas));

            alert("Reserva salva com sucesso!");
            window.location.href = "/reservas/reservas.html";
        } else {
            alert("Por favor, preencha todos os campos obrigatórios.");
        }
    }

    // Eventos
    document.getElementById("entrada").addEventListener("change", calcularDiarias);
    document.getElementById("saida").addEventListener("change", calcularDiarias);
    document.getElementById("form-reserva").addEventListener("submit", salvarReserva);
});
