// Carrossel de imagens
let currentIndex = 0;
const images = [
    '1.webp',
    '2.jpg'
];

function showImage(index) {
    const imageContainer = document.querySelector('.carousel-images');
    imageContainer.innerHTML = `<img src="${images[index]}" alt="Cão">`;
}

function nextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    showImage(currentIndex);
}

setInterval(nextImage, 3000);
showImage(currentIndex);

// Lógica para criar uma conta
const criarContaForm = document.querySelector("#criarContaForm");
criarContaForm.addEventListener("submit", (event) => {
    event.preventDefault(); 

    const email = document.querySelector("#email").value;
    const senha = document.querySelector("#senha").value;

    if (!email || !senha) {
        alert("Por favor, preencha todos os campos!");
        return;
    }

   
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    const usuarioExistente = usuarios.find((usuario) => usuario.email === email);
    if (usuarioExistente) {
        alert("Este email já está cadastrado!");
        return;
    }

   
    usuarios.push({ email, senha });
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    alert("Conta criada com sucesso! Você pode fazer login agora.");
    window.location.href = "/login/login.html"; 
});
