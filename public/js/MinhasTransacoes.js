import { ResumoSaldo } from './ResumoSaldo.js';
export class MinhasTransacoes {
    transacoes;
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
            }
            else if (transacao.tipo === 'saida') {
                saidas.push(transacao.valor);
            }
        });
        return new ResumoSaldo(entradas, saidas);
    }
}
