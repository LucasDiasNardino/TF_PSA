var sairBut = document.getElementById("sair");

document.getElementById("sair").addEventListener("click", function () {
    window.location.href = "login.html";
});

var valorInput = document.getElementById("valor");
var descricaoInput = document.getElementById("descricao");
var enviarBut = document.getElementById("enviar");

valorInput.addEventListener("input", atualizarEstadoBotao);
descricaoInput.addEventListener("input", atualizarEstadoBotao);

function atualizarEstadoBotao() {
    var valorPreenchido = valorInput.value.trim() !== "";
    var descricaoPreenchido = descricaoInput.value.trim() !== "";

    enviarBut.disabled = !(valorPreenchido && descricaoPreenchido);
}