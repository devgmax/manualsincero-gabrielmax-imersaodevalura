document.addEventListener("DOMContentLoaded", function() {
    const campoPesquisa = document.getElementById("campo-pesquisa");

    // Pesquisa parcial enquanto o usuário digita
    campoPesquisa.addEventListener("input", pesquisar);

    function pesquisar() {
        const section = document.getElementById("resultados-pesquisa");
        const campoPesquisaValor = campoPesquisa.value.trim().toLowerCase();

        if (!campoPesquisaValor) {
            section.innerHTML = "<p class='mensagem-erro'>Digite algo para buscar uma linguagem.</p>";
            return;
        }

        const resultados = dados
            .filter(dado => {
                const titulo = dado.titulo.toLowerCase();
                return titulo === campoPesquisaValor || 
                       (titulo.startsWith(campoPesquisaValor) && !titulo.includes(campoPesquisaValor + 'script'));
            })
            .map(gerarResultado)
            .join('');

        section.innerHTML = resultados || "<p class='mensagem-erro'>Nenhuma linguagem encontrada. Tente novamente.</p>";
    }

    // Função para gerar o HTML de cada resultado
    function gerarResultado(dado) {
        const descricaoComParagrafos = dado.descricao
            .split('\n')
            .map(paragrafo => `<p>${paragrafo}</p>`)
            .join('');

        return `
            <div class="item-resultado">
                <h2><a href="${dado.link}" target="_blank">${dado.titulo}</a></h2>
                ${descricaoComParagrafos}
                <a href="${dado.link}" target="_blank">Mais informações</a>
            </div>`;
    }
});
