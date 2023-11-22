const form = document.getElementById("expense-form");

form.addEventListener("submit", (event) => {
    event.preventDefault();
    const valor = document.getElementById("Valor").value;
    const descricao = document.getElementById("Descricao").value;

    const data = {
        valor: valor,
        descricao: descricao,
    };

    console.log(data);

    console.log("enviando");
    axios.post("http://localhost:3000/cadastrar", {
        valor: valor,
        descricao: descricao,
    });

    window.location.href =
        "http://127.0.0.1:5500/front/html/reembolso-pendente.html";

    form.reset();
});
