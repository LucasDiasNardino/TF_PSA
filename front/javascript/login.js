// Obtém referências para os elementos HTML
var loginInput = document.getElementById("login");
var passwordInput = document.getElementById("password");
var loginButton = document.getElementById("loginBut");

// Adiciona event listeners aos campos de entrada
loginInput.addEventListener("input", atualizarEstadoBotao);
passwordInput.addEventListener("input", atualizarEstadoBotao);

// Função para atualizar o estado do botão com base nos campos de entrada
function atualizarEstadoBotao() {
    // Verifica se ambos os campos estão preenchidos
    var loginPreenchido = loginInput.value.trim() !== "";
    var passwordPreenchido = passwordInput.value.trim() !== "";

    // Habilita o botão se ambos os campos estiverem preenchidos, caso contrário, desabilita
    loginButton.disabled = !(loginPreenchido && passwordPreenchido);
}
document.getElementById("loginBut").addEventListener("click", function () {
    var login = document.getElementById("login").value;
    var password = document.getElementById("password").value;

    var dados = {
        login: login,
        password: password
    };

    console.log("Dados submetidos:", dados);
});
