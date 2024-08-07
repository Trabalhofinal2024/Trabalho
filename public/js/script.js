"use strict";
// Classe para representar uma transação financeira
class AdicionarTransacao {
    constructor(t, c, d, v) {
        this.tipo = t;
        this.categoria = c;
        this.descricao = d;
        this.valor = v;
    }
}
// Classe para gerenciar um conjunto de transações
class MinhasTransacoes {
    constructor() {
        this.transacoes = [];
    }
    // Adiciona uma nova transação à lista
    adicionarTransacao(transacao) {
        this.transacoes.push(transacao);
    }
    // Exibe transações filtradas por tipo
    exibirTransacoes(filtroTipo = 'todos') {
        if (filtroTipo === 'todos') {
            return this.transacoes;
        }
        // Usando um loop for tradicional em vez de filter e map
        const transacoesFiltradas = [];
        for (let i = 0; i < this.transacoes.length; i++) {
            const transacao = this.transacoes[i];
            if (transacao.tipo === filtroTipo) {
                transacoesFiltradas.push(transacao);
            }
        }
        return transacoesFiltradas;
    }
    // Obtém o resumo do saldo com base nas transações
    obterResumoSaldo() {
        const entradas = [];
        const saidas = [];
        // Usando um loop for tradicional em vez de filter e map
        for (let i = 0; i < this.transacoes.length; i++) {
            const transacao = this.transacoes[i];
            if (transacao.tipo === 'entrada') {
                entradas.push(transacao.valor);
            }
            else if (transacao.tipo === 'saida') {
                saidas.push(transacao.valor);
            }
        }
        return new ResumoSaldo(entradas, saidas);
    }
}
// Classe para calcular e exibir o resumo do saldo
class ResumoSaldo {
    constructor(entradas, saidas) {
        this.entradas = entradas;
        this.saidas = saidas;
    }
    // Calcula o saldo total (entradas - saídas)
    calcularSaldo() {
        let totalEntradas = 0;
        let totalSaidas = 0;
        for (let i = 0; i < this.entradas.length; i++) {
            totalEntradas += this.entradas[i];
        }
        for (let i = 0; i < this.saidas.length; i++) {
            totalSaidas += this.saidas[i];
        }
        return totalEntradas - totalSaidas;
    }
    // Gera um resumo formatado do saldo
    resumo() {
        let totalEntradas = 0;
        let totalSaidas = 0;
        for (let i = 0; i < this.entradas.length; i++) {
            totalEntradas += this.entradas[i];
        }
        for (let i = 0; i < this.saidas.length; i++) {
            totalSaidas += this.saidas[i];
        }
        const saldo = this.calcularSaldo();
        return `Resumo do Saldo:
                Total de Entradas: R$ ${totalEntradas.toFixed(2)}
                Total de Saídas: R$ ${totalSaidas.toFixed(2)}
                Saldo Final: R$ ${saldo.toFixed(2)}`;
    }
}
// Classe para gerenciar a interface do usuário
class InterfaceUsuario {
    constructor() {
        this.minhasTransacoes = new MinhasTransacoes();
    }
    // Adiciona uma nova transação e atualiza a interface
    adicionarTransacao(tipo, categoria, descricao, valor) {
        const transacao = new AdicionarTransacao(tipo, categoria, descricao, valor);
        this.minhasTransacoes.adicionarTransacao(transacao);
        this.atualizarInterface();
    }
    // Exibe transações filtradas por tipo
    exibirTransacoes(filtroTipo = 'todos') {
        return this.minhasTransacoes.exibirTransacoes(filtroTipo);
    }
    // Exibe o resumo do saldo
    exibirResumo() {
        const resumoSaldo = this.minhasTransacoes.obterResumoSaldo();
        return resumoSaldo.resumo();
    }
    // Atualiza a interface do usuário com as transações e resumo
    atualizarInterface() {
        const filtroTipo = document.getElementById('filtroTipo').value;
        const transacoesDiv = document.getElementById('transacoes');
        transacoesDiv.innerHTML = '';
        this.exibirTransacoes(filtroTipo).forEach((transacao, index) => {
            const transacaoDiv = document.createElement('div');
            transacaoDiv.innerHTML = `
                <p>Transação ${index + 1}:</p>
                <p>Tipo: ${transacao.tipo}</p>
                <p>Categoria: ${transacao.categoria}</p>
                <p>Descrição: ${transacao.descricao}</p>
                <p>Valor: R$ ${transacao.valor.toFixed(2)}</p>
                <hr>
            `;
            transacoesDiv.appendChild(transacaoDiv);
        });
        const resumoDiv = document.getElementById('resumo');
        resumoDiv.innerHTML = this.exibirResumo();
    }
}
// Lógica de manipulação do DOM
document.addEventListener('DOMContentLoaded', function () {
    const interfaceUsuario = new InterfaceUsuario();
    // Manipulador de envio do formulário
    const form = document.getElementById('transacaoForm');
    const filtroTipo = document.getElementById('filtroTipo');
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        const tipo = document.getElementById('tipo').value;
        const categoria = document.getElementById('categoria').value;
        const descricao = document.getElementById('descricao').value;
        const valor = parseFloat(document.getElementById('valor').value);
        interfaceUsuario.adicionarTransacao(tipo, categoria, descricao, valor);
    });
    // Manipulador de mudança do filtro de tipo
    filtroTipo.addEventListener('change', function () {
        interfaceUsuario.atualizarInterface();
    });
    // Atualiza a interface ao carregar a página
    interfaceUsuario.atualizarInterface();
});
