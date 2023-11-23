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



/*
*  Busca os reembolsos no banco e adiciona na lista
*/

function atualizarLista() {
    fetch('http://localhost:8080/reembolso/listar', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
            // Adicione outros cabeçalhos conforme necessário
        },
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao obter reembolsos');
        }
        return response.json();
    })
    .then(data => {
        // Limpar a lista existente
        var listaReembolsos = document.getElementById('reembolsos');
        listaReembolsos.innerHTML = '';

        // Iterar sobre os reembolsos e adicionar elementos à lista
        data.forEach(reembolso => {
            // Adicionar apenas os campos desejados à lista
            var li = document.createElement('li');
            li.textContent = `Descrição: ${reembolso.descricao}, Data: ${reembolso.data}, Estado: ${reembolso.estado}`;
            li.classList.add('list-group-item');
            listaReembolsos.appendChild(li);
        });
    })
    .catch(error => {
        console.error(error);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    // Chamar a função inicialmente 
    atualizarLista();

    // Adicionar um evento de clique ao botão
    var btnAtualizar = document.getElementById('atualizarBtn');
    btnAtualizar.addEventListener('click', function() {
        // Chamar a função ao clicar no botão
        atualizarLista();
    });
});