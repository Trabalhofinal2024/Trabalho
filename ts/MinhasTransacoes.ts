import { AdicionarTransacao } from './AdicionarTransacao.js';
import { ResumoSaldo } from './ResumoSaldo.js';

export class MinhasTransacoes {
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
