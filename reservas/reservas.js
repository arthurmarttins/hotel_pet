document.addEventListener("DOMContentLoaded", () => {
    const tabelaReservas = document.querySelector("tbody");

    // Recupera o valor da diária ou define um padrão
    const valorDiaria = parseFloat(localStorage.getItem("valor_diaria")) || 40;

    // Carrega reservas e insere na tabela
    function carregarReservas() {
        const reservas = JSON.parse(localStorage.getItem("reservas")) || [];
        tabelaReservas.innerHTML = "";

        reservas.forEach((reserva, index) => {
            const linha = `
                <tr>
                    <td><input type="checkbox" /></td>
                    <td>${index + 1}</td>
                    <td>${reserva.pet}</td>
                    <td>${reserva.entrada}</td>
                    <td>${reserva.saida}</td>
                    <td><span class="status">${reserva.status}</span></td>
                    <td>R$ ${(parseFloat(reserva.totalDiarias) * valorDiaria).toFixed(2)}</td>
                    <td>
                        <a href="#" class="editar" data-index="${index}">Editar</a> | 
                        <a href="#" class="visualizar" data-index="${index}">Visualizar</a> | 
                        <a href="#" class="excluir" data-index="${index}">Excluir</a>
                    </td>
                </tr>
            `;
            tabelaReservas.innerHTML += linha;
        });

        adicionarEventos();
    }

    // Adiciona eventos para os botões de ação
    function adicionarEventos() {
        const botoesEditar = document.querySelectorAll(".editar");
        const botoesVisualizar = document.querySelectorAll(".visualizar");
        const botoesExcluir = document.querySelectorAll(".excluir");

        botoesEditar.forEach((botao) => {
            botao.addEventListener("click", (e) => {
                e.preventDefault();
                const index = e.target.getAttribute("data-index");
                editarReserva(index);
            });
        });

        botoesVisualizar.forEach((botao) => {
            botao.addEventListener("click", (e) => {
                e.preventDefault();
                const index = e.target.getAttribute("data-index");
                visualizarReserva(index);
            });
        });

        botoesExcluir.forEach((botao) => {
            botao.addEventListener("click", (e) => {
                e.preventDefault();
                const index = e.target.getAttribute("data-index");
                excluirReserva(index);
            });
        });
    }

    // Redireciona para a página de edição com os dados da reserva
    function editarReserva(index) {
        const reservas = JSON.parse(localStorage.getItem("reservas")) || [];
        const reserva = reservas[index];

        if (reserva) {
            localStorage.setItem("reserva_editar", JSON.stringify(reserva));
            localStorage.setItem("reserva_index", index);
            window.location.href = "/editar_reserva/editar_reserva.html";
        }
    }

    // Redireciona para a página de visualização com os dados da reserva
    function visualizarReserva(index) {
        const reservas = JSON.parse(localStorage.getItem("reservas")) || [];
        const reserva = reservas[index];

        if (reserva) {
            localStorage.setItem("reserva_visualizar", JSON.stringify(reserva));
            window.location.href = "/ver_reserva/ver_reserva.html";
        }
    }

    // Remove a reserva da lista e salva novamente
    function excluirReserva(index) {
        const reservas = JSON.parse(localStorage.getItem("reservas")) || [];
        reservas.splice(index, 1);

        localStorage.setItem("reservas", JSON.stringify(reservas));
        carregarReservas();
    }

    carregarReservas();
});
