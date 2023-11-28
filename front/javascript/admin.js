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
                if (reembolso.user != null) {
                    var linha = document.createElement('tr');

                    linha.id = 'linha' + reembolso.id;

                    var classeEstado = '';

                    if (reembolso.estado === 'Aprovado') {
                        classeEstado = 'table-success';
                    }
                    else if (reembolso.estado === 'Reprovado') {
                        classeEstado = 'text-danger';
                    }

                    var id = reembolso.id;


                    linha.innerHTML = `
                    <td>${index + 1}</td>
                    <td>${reembolso.user.toUpperCase()}</td>
                    <td>R$${reembolso.valor}</td>
                    <td>${reembolso.descricao}</td>
                    <td>${formatarData(reembolso.data)}</td>
                    <td class="${classeEstado}">
                        <button id="aprovar${id}" type="button" class="btn btn-success ml-auto">Aprovar</button>
                        <button id="reprovar${id}" type="button" class="btn btn-danger ml-auto">Reprovar</button>
                    </td>
                `;
                    tbodyReembolsos.appendChild(linha);

                    console.log("Reembolso", id, "criado com sucesso:")

                    aprovarBotao(id);
                    reprovarBotao(id);
                }

            });
        })
        .catch(error => {
            console.error(error);
        });
}

document.addEventListener('DOMContentLoaded', function () {
    // Chamar a função inicialmente 
    atualizarLista();
    //setInterval(atualizarLista, 5000);
});


var idReembolso;

function aprovarBotao(id) {
    var reprovar = document.getElementById("aprovar" + id);
    reprovar.addEventListener("click", function () {
        console.log("Aprovar Acionado -ID: " + id);

    });
}

var motivoRep;
var botaoSubmeter;

function atualizaSubmeter(){
   var descricaoPreenchido = motivoRep.value.trim() !== "";
   
   botaoSubmeter.disabled = !descricaoPreenchido;
    
}

function reprovarBotao(id) {
    var reprovar = document.getElementById("reprovar" + id);
    reprovar.addEventListener("click", function () {
        console.log("Reprovar Acionado -ID: " + id);

        //deixa botao desabilitado
        reprovar.disabled = true;



        console.log("Cria entrada");
        var divEntrada = document.getElementById("motivo");

        divEntrada.innerHTML = '';

        entrada = document.createElement('div');

        entrada.innerHTML =
            `
            <div id="entradaMotivo" class="input-group">
                <span class="input-group-text">Descreva brevemente o motivo:</span>
                <textarea id="motivo" class="form-control" aria-label="With textarea"></textarea>
                <button id="botaoSubmeter" class="btn btn-outline-primary" type="button">Submeter</button>
            </div>
            `

        divEntrada.appendChild(entrada);

        
        var botao = document.getElementById("botaoSubmeter");
        botaoSubmeter = botao;

        var motivo = document.getElementById("motivo");
        motivoRep = motivo;

        atualizaSubmeter();

    });
}

function putFunc(){
    document.getElementById("botaoSubmeter").addEventListener("click", function () {

        console.log("Post -ID: " + submeterMotivoID);
    
        var motivo = document.getElementById("motivo").value;
    
        console.log("Motivo: " + motivo);
    
        var url = 'http://localhost:8080/reembolso/reprovar/' + submeterMotivoID;
    
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
                // Adicione outros cabeçalhos conforme necessário
             },
                body: JSON.stringify({
                    descricao: motivo
                })
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Erro ao reprovar reembolso');
                    }
                    return response.json();
                })
                .then(data => {
                    console.log("Reembolso", submeterMotivoID, "reprovado com sucesso:")
                    console.log(data);
    
                    var linha = document.getElementById("linha" + submeterMotivoID);
    
                    linha.remove();
    
                    var divEntrada = document.getElementById("motivo");
    
                    divEntrada.innerHTML = '';
    
                })
                .catch(error => {
                    console.error(error);
                });
    });
}



