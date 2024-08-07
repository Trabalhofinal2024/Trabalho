"use strict";
class MinhasTransacoes {
    // construtor que recebe o objeto feito em "AdicionarTransacao" e organiza em uma lista.
    constructor() {
        this.transacoes = [];
    }
    // o atributo transacoes começa vazio, sempre
    //esse método adiciona novas transações na lista de transações.
    adicionarTransacao(transacao) {
        this.transacoes.push(transacao);
    }
    // esse método vai mostrar todas as transações.
    exibirTransacoes() {
        // o forEach vai iterando cada elemento do array "transacoes"
        // é transacao (array) na posicao index
        // index incrementa de 1 em 1, similiar ao i++ de "for".
        this.transacoes.forEach(function (transacao, index) {
            console.log(`Transação ${index + 1}:`);
            console.log(`Tipo: ${transacao.tipo}`);
            console.log(`Categoria: ${transacao.categoria}`);
            console.log(`Descrição: ${transacao.descricao}`);
            console.log(`Valor: ${transacao.valor}`);
            console.log('---');
        });
    }
    // esse método é o filtro
    // vc coloca o tipo de transação e a categoria
    // se existir essa transação, mostra, se não, não mostra.
    buscarTransacao(tipo, categoria) {
        // cria um array vazio
        let resultado = [];
        // percorre o array de transações com o loop for.
        for (let i = 0; i < this.transacoes.length; i++) {
            // o transacao recebe o array de transações na posição i.
            let transacao = this.transacoes[i];
            // se o conteúdo tipo e categoria satisfazer a condição de igualdade
            // o resultado (que estava vazio) recebe a transação.
            if (transacao.tipo === tipo && transacao.categoria === categoria) {
                // recebendo
                resultado.push(transacao);
            }
        }
        // se o resultado não estiver vazio, ou seja, se existe pelo menos uma transação
        // idêntica ao do parâmetro informado no início, ele vai retornar o resultado.
        if (resultado.length > 0) {
            return resultado;
        }
        // caso não, nada é retornado.
        else {
            return undefined;
        }
    }
}
