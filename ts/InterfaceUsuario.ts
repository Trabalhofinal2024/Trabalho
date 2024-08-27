import { MinhasTransacoes } from './MinhasTransacoes.js';
import { AdicionarTransacao } from './AdicionarTransacao.js';

export class InterfaceUsuario {
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
