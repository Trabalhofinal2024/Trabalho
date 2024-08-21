"use strict";

class AdicionarTransacao {
    constructor(t, c, d, v) {
        this.tipo = t;
        this.categoria = c;
        this.descricao = d;
        this.valor = v;
    }
}

class MinhasTransacoes {
    constructor() {
        this.transacoes = [];
    }

    adicionarTransacao(transacao) {
        this.transacoes.push(transacao);
    }

    exibirTransacoes(filtroTipo = 'todos') {
        if (filtroTipo === 'todos') {
            return this.transacoes;
        }
        return this.transacoes.filter(transacao => transacao.tipo === filtroTipo);
    }

    obterResumoSaldo() {
        const entradas = [];
        const saidas = [];
        this.transacoes.forEach(transacao => {
            if (transacao.tipo === 'entrada') {
                entradas.push(transacao.valor);
            } else if (transacao.tipo === 'saida') {
                saidas.push(transacao.valor);
            }
        });
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

        // Calcular total de entradas usando um loop `while`
        let i = 0;
        while (i < this.entradas.length) {
            totalEntradas += this.entradas[i];
            i++;
        }

        // Calcular total de saídas usando um loop `for`
        for (let j = 0; j < this.saidas.length; j++) {
            totalSaidas += this.saidas[j];
        }

        return totalEntradas - totalSaidas;
    }

    // Gera um resumo formatado do saldo
    resumo() {
        let totalEntradas = 0;
        let totalSaidas = 0;

        // Calcular total de entradas usando um loop `while`
        let i = 0;
        while (i < this.entradas.length) {
            totalEntradas += this.entradas[i];
            i++;
        }

        // Calcular total de saídas usando um loop `for`
        for (let j = 0; j < this.saidas.length; j++) {
            totalSaidas += this.saidas[j];
        }

        const saldo = this.calcularSaldo();

        // Retornar um objeto com os valores ao invés de uma string
        return {
            totalEntradas: totalEntradas,
            totalSaidas: totalSaidas,
            saldo: saldo
        };
    }
}

class InterfaceUsuario {
    constructor() {
        this.minhasTransacoes = new MinhasTransacoes();
    }

    adicionarTransacao(tipo, categoria, descricao, valor) {
        const transacao = new AdicionarTransacao(tipo, categoria, descricao, valor);
        this.minhasTransacoes.adicionarTransacao(transacao);
        this.atualizarInterface();
    }

    exibirTransacoes(filtroTipo = 'todos') {
        return this.minhasTransacoes.exibirTransacoes(filtroTipo);
    }

    exibirResumo() {
        const resumoSaldo = this.minhasTransacoes.obterResumoSaldo();
        return resumoSaldo.resumo();
    }

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

        const resumoDados = this.exibirResumo();
        document.getElementById('totalEntradas').textContent = `R$ ${resumoDados.totalEntradas}`;
        document.getElementById('totalSaidas').textContent = `R$ ${resumoDados.totalSaidas}`;
        document.getElementById('saldoFinal').textContent = `R$ ${resumoDados.saldo}`;
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const interfaceUsuario = new InterfaceUsuario();

    // Seção de Login
    const loginSection = document.getElementById('introSection'); // Atualizado para a seção de introdução
    const funcaoSection = document.getElementById('funcaoSection');
    const transacaoSection = document.getElementById('transacaoSection');
    const transacoesSection = document.getElementById('transacoesSection');
    const resumoSection = document.getElementById('resumoSection');
    const loginButton = document.getElementById('loginButton');
    const nomeInput = document.getElementById('nome');

    // Botões de Funções
    const adicionarTransacaoButton = document.getElementById('adicionarTransacaoButton');
    const mostrarTransacoesButton = document.getElementById('mostrarTransacoesButton');
    const resumoSaldoButton = document.getElementById('resumoSaldoButton');

    // Formulário de Transações
    const form = document.getElementById('transacaoForm');
    const filtroTipo = document.getElementById('filtroTipo');

    loginButton.addEventListener('click', function () {
        if (nomeInput.value.trim() !== '') {
            loginSection.style.display = 'none'; // Oculta a seção de introdução
            funcaoSection.style.display = 'block';
        }
    });

    adicionarTransacaoButton.addEventListener('click', function () {
        transacaoSection.style.display = 'block';
        transacoesSection.style.display = 'none';
        resumoSection.style.display = 'none';
    });

    mostrarTransacoesButton.addEventListener('click', function () {
        transacaoSection.style.display = 'none';
        transacoesSection.style.display = 'block';
        resumoSection.style.display = 'none';
        interfaceUsuario.atualizarInterface();
    });

    resumoSaldoButton.addEventListener('click', function () {
        transacaoSection.style.display = 'none';
        transacoesSection.style.display = 'none';
        resumoSection.style.display = 'block';
        interfaceUsuario.atualizarInterface();
    });

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        const tipo = document.getElementById('tipo').value;
        const categoria = document.getElementById('categoria').value;
        const descricao = document.getElementById('descricao').value;
        const valor = parseFloat(document.getElementById('valor').value);
        interfaceUsuario.adicionarTransacao(tipo, categoria, descricao, valor);

        // Limpar os campos do formulário
        document.getElementById('tipo').value = '';
        document.getElementById('categoria').value = '';
        document.getElementById('descricao').value = '';
        document.getElementById('valor').value = '';

        // Exibir a mensagem de sucesso
        const mensagemSucesso = document.getElementById('mensagemSucesso');
        mensagemSucesso.style.display = 'block';

        // Ocultar a mensagem de sucesso após 3 segundos
        setTimeout(() => {
            mensagemSucesso.style.display = 'none';
        }, 3000);
    });

    filtroTipo.addEventListener('change', function () {
        interfaceUsuario.atualizarInterface();
    });

    interfaceUsuario.atualizarInterface();
});
