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

// Lógica do login
const formulario = document.querySelector("#loginForm");
formulario.addEventListener("submit", (event) => {
    event.preventDefault(); 

    const email = document.querySelector("#email").value;
    const senha = document.querySelector("#senha").value;

    if (!email || !senha) {
        alert("Por favor, preencha todos os campos!");
        return;
    }

    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

 
    const usuarioValido = usuarios.find(
        (usuario) => usuario.email === email && usuario.senha === senha
    );

    if (!usuarioValido) {
        alert("Login ou senha incorretos!");
        return;
    }

    if(usuarioValido){
    alert("Login bem-sucedido!");
    window.location.href = "../pets/pets.html";

    }
});
