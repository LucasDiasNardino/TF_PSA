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

function formatarData(dataString) {
    // Verificar se a data já está no formato esperado (DD/MM/YYYY)
    const regexData = /^\d{2}\/\d{2}\/\d{4}$/;

    if (regexData.test(dataString)) {
        return dataString;
    }

    // Se a dataString for uma instância de Date, formatar diretamente
    const data = new Date(dataString);
    if (!isNaN(data.getTime())) {
        const dia = String(data.getDate()).padStart(2, '0');
        const mes = String(data.getMonth() + 1).padStart(2, '0');
        const ano = String(data.getFullYear());

        return `${dia}/${mes}/${ano}`;
    }

    // Se não for possível formatar, retornar 'Data Inválida'
    return 'Data Inválida';
}


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
        var tbodyReembolsos = document.getElementById('tbodyReembolsos');
        tbodyReembolsos.innerHTML = '';

        data.forEach((reembolso, index) => {
            var linha = document.createElement('tr');

            var classeEstado = '';

            if (reembolso.estado === 'Aprovado') {
                classeEstado = 'table-success';
            }
            else if (reembolso.estado === 'Reprovado') {
                classeEstado = 'text-danger';
            }


            linha.innerHTML = `
                <td>${reembolso.valor}</td>
                <td>${reembolso.descricao}</td>
                <td>${formatarData(reembolso.data)}</td>
                <td class="${classeEstado}">${reembolso.estado}</td>
            `;
            tbodyReembolsos.appendChild(linha);
        });
    })
    .catch(error => {
        console.error(error);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    // Chamar a função inicialmente 
    atualizarLista();
    //setInterval(atualizarLista, 5000);


    // Adicionar um evento de clique ao botão
    var btnAtualizar = document.getElementById('atualizarBtn');
    btnAtualizar.addEventListener('click', function() {
        // Chamar a função ao clicar no botão
        atualizarLista();
    });
});