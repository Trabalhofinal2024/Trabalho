import { MinhasTransacoes } from './MinhasTransacoes.js';
import { AdicionarTransacao } from './AdicionarTransacao.js';
export class InterfaceUsuario {
    minhasTransacoes;
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
        document.getElementById('totalEntradas').textContent = `R$ ${resumoDados.totalEntradas.toFixed(2)}`;
        document.getElementById('totalSaidas').textContent = `R$ ${resumoDados.totalSaidas.toFixed(2)}`;
        document.getElementById('saldoFinal').textContent = `R$ ${resumoDados.saldo.toFixed(2)}`;
    }
}
