function alterarquantidade(produto, acao) {
    const quantidade = document.getElementById('quantidade_' + produto);
    const valor = document.getElementById('valor_' + produto);
    const total = document.getElementById('total_' + produto);

    // Previne que a quantidade fique negativa
    if (acao === '-' && quantidade.innerHTML == 0) {
        return;
    }

    // Atualiza a quantidade
    if (acao === '+') {
        quantidade.innerHTML++;
    } else {
        quantidade.innerHTML--;
    }

    // Calcula o novo total para o produto
    let valorProduto = somenteNumeros(valor.innerHTML);  // Extrai o valor numérico
    let totalProduto = quantidade.innerHTML * valorProduto; // Multiplica pela quantidade

    total.innerHTML = formatarValor(totalProduto); // Atualiza o total do produto

    // Atualiza o total geral do carrinho
    soma();
}

function soma() {
    let somaTotal = 0;

    // Aqui você pode ajustar o número de produtos dinamicamente se necessário
    for (let i = 1; i <= 5; i++) {  // Ajuste o número de produtos conforme necessário
        let totalProduto = document.getElementById('total_' + i);

        // Verifica se o elemento existe no DOM
        if (totalProduto) {
            let numero = somenteNumeros(totalProduto.innerHTML); // Extrai o valor numérico do total
            somaTotal += numero;  // Soma ao total geral
        }
    }

    // Exibe o total geral formatado
    document.getElementById('Total').innerHTML = formatarValor(somaTotal);
}

function somenteNumeros(n) {
    // Remove qualquer coisa que não seja número ou ponto decimal
    // Substitui vírgula por ponto e remove caracteres não numéricos
    return parseFloat(n.replace(/[^\d,]/g, '').replace(',', '.')) || 0;
}

function formatarValor(n) {
    // Formata o número como moeda em Reais
    return 'R$ ' + n.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
