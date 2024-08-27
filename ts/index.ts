"use strict";

class AdicionarTransacao {
    tipo: string;
    categoria: string;
    descricao: string;
    valor: number;

    constructor(t: string, c: string, d: string, v: number) {
        this.tipo = t;
        this.categoria = c;
        this.descricao = d;
        this.valor = v;
    }
}

class MinhasTransacoes {
    transacoes: AdicionarTransacao[];

    constructor() {
        this.transacoes = [];
    }

    adicionarTransacao(transacao: AdicionarTransacao): void {
        this.transacoes.push(transacao);
    }

    exibirTransacoes(filtroTipo: string = 'todos'): AdicionarTransacao[] {
        if (filtroTipo === 'todos') {
            return this.transacoes;
        }
        return this.transacoes.filter(transacao => transacao.tipo === filtroTipo);
    }

    obterResumoSaldo(): ResumoSaldo {
        const entradas: number[] = [];
        const saidas: number[] = [];
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

class ResumoSaldo {
    entradas: number[];
    saidas: number[];

    constructor(entradas: number[], saidas: number[]) {
        this.entradas = entradas;
        this.saidas = saidas;
    }

    // Calcula o saldo total (entradas - saídas)
    calcularSaldo(): number {
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
    resumo(): { totalEntradas: number; totalSaidas: number; saldo: number } {
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
    minhasTransacoes: MinhasTransacoes;

    constructor() {
        this.minhasTransacoes = new MinhasTransacoes();
    }

    adicionarTransacao(tipo: string, categoria: string, descricao: string, valor: number): void {
        const transacao = new AdicionarTransacao(tipo, categoria, descricao, valor);
        this.minhasTransacoes.adicionarTransacao(transacao);
        this.atualizarInterface();
    }

    exibirTransacoes(filtroTipo: string = 'todos'): AdicionarTransacao[] {
        return this.minhasTransacoes.exibirTransacoes(filtroTipo);
    }

    exibirResumo(): { totalEntradas: number; totalSaidas: number; saldo: number } {
        const resumoSaldo = this.minhasTransacoes.obterResumoSaldo();
        return resumoSaldo.resumo();
    }

    atualizarInterface(): void {
        const filtroTipo = (document.getElementById('filtroTipo') as HTMLSelectElement).value;
        const transacoesDiv = document.getElementById('transacoes') as HTMLDivElement;
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
        (document.getElementById('totalEntradas') as HTMLParagraphElement).textContent = `R$ ${resumoDados.totalEntradas.toFixed(2)}`;
        (document.getElementById('totalSaidas') as HTMLParagraphElement).textContent = `R$ ${resumoDados.totalSaidas.toFixed(2)}`;
        (document.getElementById('saldoFinal') as HTMLParagraphElement).textContent = `R$ ${resumoDados.saldo.toFixed(2)}`;
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const interfaceUsuario = new InterfaceUsuario();

    // Seção de Login
    const loginSection = document.getElementById('introSection') as HTMLDivElement;
    const funcaoSection = document.getElementById('funcaoSection') as HTMLDivElement;
    const transacaoSection = document.getElementById('transacaoSection') as HTMLDivElement;
    const transacoesSection = document.getElementById('transacoesSection') as HTMLDivElement;
    const resumoSection = document.getElementById('resumoSection') as HTMLDivElement;
    const loginButton = document.getElementById('loginButton') as HTMLButtonElement;
    const nomeInput = document.getElementById('nome') as HTMLInputElement;

    // Botões de Funções
    const adicionarTransacaoButton = document.getElementById('adicionarTransacaoButton') as HTMLButtonElement;
    const mostrarTransacoesButton = document.getElementById('mostrarTransacoesButton') as HTMLButtonElement;
    const resumoSaldoButton = document.getElementById('resumoSaldoButton') as HTMLButtonElement;

    // Formulário de Transações
    const form = document.getElementById('transacaoForm') as HTMLFormElement;
    const filtroTipo = document.getElementById('filtroTipo') as HTMLSelectElement;

    loginButton.addEventListener('click', function () {
        if (nomeInput.value.trim() !== '') {
            loginSection.style.display = 'none';
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
        const tipo = (document.getElementById('tipo') as HTMLSelectElement).value;
        const categoria = (document.getElementById('categoria') as HTMLInputElement).value;
        const descricao = (document.getElementById('descricao') as HTMLInputElement).value;
        const valor = parseFloat((document.getElementById('valor') as HTMLInputElement).value);
        interfaceUsuario.adicionarTransacao(tipo, categoria, descricao, valor);

        // Limpar os campos do formulário
        (document.getElementById('tipo') as HTMLSelectElement).value = '';
        (document.getElementById('categoria') as HTMLInputElement).value = '';
        (document.getElementById('descricao') as HTMLInputElement).value = '';
        (document.getElementById('valor') as HTMLInputElement).value = '';

        // Exibir a mensagem de sucesso
        const mensagemSucesso = document.getElementById('mensagemSucesso') as HTMLDivElement;
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
