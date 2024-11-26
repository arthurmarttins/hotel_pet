document.addEventListener("DOMContentLoaded", () => {
    // Obtém o índice da reserva a partir da URL
    const urlParams = new URLSearchParams(window.location.search);
    const index = parseInt(urlParams.get("index"));

    if (isNaN(index)) {
        alert("Reserva não encontrada.");
        window.location.href = "/reservas/reservas.html";
        return;
    }

    // Carrega os dados da reserva
    const reservas = JSON.parse(localStorage.getItem("reservas")) || [];
    const reserva = reservas[index];

    if (!reserva) {
        alert("Reserva não encontrada.");
        window.location.href = "/reservas/reservas.html";
        return;
    }

    // Preenche o formulário com os dados da reserva
    document.querySelector("#proprietario").value = reserva.proprietario;
    document.querySelector("#pet").value = reserva.pet;
    document.querySelector("#entrada").value = reserva.entrada;
    document.querySelector("#saida").value = reserva.saida;
    document.querySelector("#status").value = reserva.status;
    document.querySelector("#notas").value = reserva.notas || "";
    document.querySelector("#anotacoes_funcionario").value = reserva.anotacoesFuncionario || "";

    // Calcula e exibe o total de diárias no campo correspondente
    calcularDiarias(reserva.entrada, reserva.saida);

    // Atualiza os dados da reserva no localStorage
    const formulario = document.querySelector("#form-editar");
    formulario.addEventListener("submit", (event) => {
        event.preventDefault();

        const proprietario = document.querySelector("#proprietario").value.trim();
        const pet = document.querySelector("#pet").value.trim();
        const entrada = document.querySelector("#entrada").value.trim();
        const saida = document.querySelector("#saida").value.trim();
        const status = document.querySelector("#status").value.trim();
        const notas = document.querySelector("#notas").value.trim();
        const anotacoesFuncionario = document.querySelector("#anotacoes_funcionario").value.trim();

        if (!proprietario || !pet || !entrada || !saida || !status) {
            alert("Por favor, preencha todos os campos obrigatórios (*)!");
            return;
        }

        // Atualiza os dados da reserva no objeto
        reservas[index] = {
            ...reserva,
            proprietario,
            pet,
            entrada,
            saida,
            status,
            notas,
            anotacoesFuncionario
        };

        localStorage.setItem("reservas", JSON.stringify(reservas));

        alert("Reserva atualizada com sucesso!");
        window.location.href = "/reservas/reservas.html"; // Redireciona para a lista de reservas
    });
});

// Calcula o total de diárias e exibe no campo correspondente
function calcularDiarias(entrada = null, saida = null) {
    entrada = entrada || document.getElementById("entrada").value;
    saida = saida || document.getElementById("saida").value;

    const totalDiariasInput = document.getElementById("total_diarias");

    if (entrada && saida) {
        const dataEntrada = new Date(entrada);
        const dataSaida = new Date(saida);
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
