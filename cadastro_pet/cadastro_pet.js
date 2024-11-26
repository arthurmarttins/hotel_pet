document.addEventListener("DOMContentLoaded", () => {
    const formulario = document.querySelector("form");

    formulario.addEventListener("submit", (event) => {
        event.preventDefault();

   
        const proprietario = document.querySelector("#proprietario").value.trim();
        const nome = document.querySelector("#Nome").value.trim();
        const tipo = document.querySelector("#tipo").value.trim();
        const tamanho = document.querySelector("#tamanho").value.trim();
        const raca = document.querySelector("#raca").value.trim();  
        const imagemInput = document.querySelector("#imagem_pet");


        if (!proprietario || !nome || !tipo || !tamanho || !raca) {
            alert("Por favor, preencha todos os campos obrigatórios (*)!");
            return;
        }

  
        const imagemURL = imagemInput.files[0] ? URL.createObjectURL(imagemInput.files[0]) : null;

        const novoPet = {
            proprietario,
            nome,
            tipo,
            tamanho,
            raca,
            imagem: imagemURL
        };

        const pets = JSON.parse(localStorage.getItem("pets")) || [];
        pets.push(novoPet);
        localStorage.setItem("pets", JSON.stringify(pets));

        alert("Pet cadastrado com sucesso!");

        window.location.href = "/pets/pets.html";

        formulario.reset();
    });
});
