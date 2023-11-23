var sairBut = document.getElementById("sair");

document.getElementById("sair").addEventListener("click", function () {
    window.location.href = "login.html";
});


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
        data.sort((a, b) => new Date(b.data) - new Date(a.data));
        // Limpar a lista existente
        var tbodyReembolsos = document.getElementById('tbodyReembolsos');
        tbodyReembolsos.innerHTML = '';        

        data.forEach((reembolso, index) => {
            console.log(reembolso.user);
            if(reembolso.user != null){
                var linha = document.createElement('tr');

                var classeEstado = '';

                if (reembolso.estado === 'Aprovado') {
                    classeEstado = 'table-success';
                }
                else if (reembolso.estado === 'Reprovado') {
                    classeEstado = 'text-danger';
                }

                


                linha.innerHTML = `
                    <td>${reembolso.user.toUpperCase()}</td>
                    <td>R$${reembolso.valor}</td>
                    <td>${reembolso.descricao}</td>
                    <td>${formatarData(reembolso.data)}</td>
                    <td class="${classeEstado}"><button id="aprovar" type="button" class="btn btn-success ml-auto">Aprovar</button><button id="reprovar" type="button" class="btn btn-danger ml-auto">Reprovar</button></td>
                `;
                tbodyReembolsos.appendChild(linha);

                var id = reembolso.id;

                reprovarBotao();
            }
            
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
});





function reprovarBotao(){
    var reprovar = document.getElementById("reprovar");
    reprovar.addEventListener("click", function(){
        console.log("clicou"); 
        reprovar.disabled
        criaEntrada();
    });
}

function criaEntrada() {
    console.log("cria entrada");
    var divEntrada = document.getElementById("motivo");
    
    divEntrada.innerHTML = '';

    entrada = document.createElement('div');
    
    entrada.innerHTML = `
    <input id="textoMotivo" type="text" class="form-control" placeholder="Descreva Brevemente o Motivo da Recusa" aria-label="Recipient's username" aria-describedby="button-addon2">
    <button id="submeter" class="btn btn-outline-secondary" type="button" id="button-addon2">Submeter</button>
    `;

    divEntrada.appendChild(entrada);   
}

/**
 * SUBMETE MOTIVO
 */

document.getElementById("motivo").addEventListener("click", function () {
    var motivo = document.getElementById("textoMotivo").value;

    var dados = {
        motivo: motivo
    };

    console.log("Dados submetidos:", dados);

    fetch('http://localhost:8080/reembolso/reprovar/'+id, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },

        body: JSON.stringify(dados)

    }).then(function (response) {
        if (response.ok) {
            console.log("Resposta ok");
            return response.text();
        } else {
            console.log("Resposta de erro do servidor");
            return Promise.reject(response);
        }
    }).then(function (data) {
        console.log("Resposta:", data);
        window.location.href = "admin.html";
    }).catch(function (error) {
        console.error(error);
    });});