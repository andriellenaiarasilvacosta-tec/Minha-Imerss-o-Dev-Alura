async function carregarJSON() {
    const resposta = await fetch("data.json");
    const dados = await resposta.json();
    return dados;
}

const form = document.getElementById("study-form");
const resultArea = document.getElementById("result-area");

form.addEventListener("submit", async function (event) {
    event.preventDefault();

    const dadosJSON = await carregarJSON();
    console.log("JSON carregado:", dadosJSON);

    const topic = document.getElementById("topic").value;

    const simulatedRoadmapJSON = [
        { 
            passo: 1, 
            titulo: `Entender o básico de ${topic}`, 
            descricao: `Pesquisar a definição e a sintaxe básica de ${topic}.` 
        },
        { 
            passo: 2, 
            titulo: `Praticar com exemplos simples`, 
            descricao: `Criar 3 exemplos práticos de uso de ${topic}.` 
        },
        { 
            passo: 3, 
            titulo: `Aprofundar em casos de uso`, 
            descricao: `Buscar como ${topic} é aplicado em projetos reais.` 
        }
    ];

    resultArea.innerHTML = "<p>Gerando roteiro...</p>";

    setTimeout(() => {
        let finalHTML = `<h2>Roteiro de Estudos</h2>`;
        
        simulatedRoadmapJSON.forEach(item => {
            finalHTML += `
                <div>
                    <h3>Passo ${item.passo}: ${item.titulo}</h3>
                    <p>${item.descricao}</p>
                </div>
                <hr>
            `;
        });

        resultArea.innerHTML = finalHTML;
    }, 500);
});
