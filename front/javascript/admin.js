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


    // Adicionar um evento de clique ao botão
    var btnAtualizar = document.getElementById('atualizarBtn');
    btnAtualizar.addEventListener('click', function() {
        // Chamar a função ao clicar no botão
        atualizarLista();
    });
});





function reprovarBotao(){
    var reprovar = document.getElementById("reprovar");
    reprovar.addEventListener("click", function(){
        reprovar();
    });
}

function reprovar() {
    var divEntrada = document.getElementById("motivo");
    
    var caixaTexto = document.createElement("div");
    caixaTexto.innerHTML = `<span class="input-group-text" id="inputGroup-sizing-default">Motivo da Reprovação:</span>
    <input id="texto" ype="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">`;
    
    divEntrada.appendChild(caixaTexto);

    var motivo = document.getElementById("texto")

    var preenchido = motivo.value.trim() !== "";
    
    loginButton.disabled = !(preenchido);

    //*FAZER PUT PARA ALTERAR REEMBOLSO

}