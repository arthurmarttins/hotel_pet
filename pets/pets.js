document.addEventListener("DOMContentLoaded", function () {
    function loadPets(filter = {}) {
        const pets = JSON.parse(localStorage.getItem("pets")) || [];
        const petsTableBody = document.querySelector("#pets-table-body");
        petsTableBody.innerHTML = "";

    
        const filteredPets = pets.filter((pet) => {
            return Object.keys(filter).every((key) => {
                return filter[key] ? pet[key]?.toLowerCase().includes(filter[key].toLowerCase()) : true;
            });
        });

      
        filteredPets.forEach((pet, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td><input type="checkbox" /></td>
                <td>${index + 1}</td>
                <td>${pet.nome}</td>
                <td>${pet.tipo}</td>
                <td>${pet.raca}</td>
                <td>${pet.tamanho}</td>
                <td class="actions">
                    <a href="/editar_pet/editar_pet.html?index=${index}">Editar</a> | 
                    <a href="/visualizar_pet/visualizar_pet.html?index=${index}">Visualizar</a> | 
                    <a class="delete-btn" data-index="${index}">Excluir</a>
                </td>
            `;
            petsTableBody.appendChild(row);
        });


        document.querySelectorAll(".delete-btn").forEach(button => {
            button.addEventListener("click", function () {
                const index = parseInt(this.getAttribute("data-index"));
                deletePet(index);
            });
        });
    }

    function deletePet(index) {
        const pets = JSON.parse(localStorage.getItem("pets")) || [];
        pets.splice(index, 1);

        localStorage.setItem("pets", JSON.stringify(pets));

        loadPets();
    }

    loadPets();

    
    document.querySelector("form").addEventListener("submit", function (event) {
        event.preventDefault();

        const filter = {
            Id: document.querySelector("#Id").value.trim(),
            nome: document.querySelector("#nome").value.trim(),
            raca: document.querySelector("#raça").value.trim(),
            tamanho: document.querySelector("#tamanho").value.trim(),
        };

        loadPets(filter);
    });

   
    document.querySelector("form").addEventListener("reset", function () {
        loadPets();
    });
});
