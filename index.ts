// Classe para representar uma transação financeira
class AdicionarTransacao {
    tipo: string; // Tipo de transação (entrada ou saída)
    categoria: string; // Categoria da transação
    descricao: string; // Descrição da transação
    valor: number; // Valor da transação

    constructor(t: string, c: string, d: string, v: number) {
        this.tipo = t;
        this.categoria = c;
        this.descricao = d;
        this.valor = v;
    }
}

// Classe para gerenciar um conjunto de transações
class MinhasTransacoes {
    transacoes: AdicionarTransacao[]; // Lista de transações

    constructor() {
        this.transacoes = [];
    }

    // Adiciona uma nova transação à lista
    adicionarTransacao(transacao: AdicionarTransacao): void {
        this.transacoes.push(transacao);
    }

    // Exibe transações filtradas por tipo
    exibirTransacoes(filtroTipo: string = 'todos'): AdicionarTransacao[] {
        if (filtroTipo === 'todos') {
            return this.transacoes;
        }

        // Usando um loop for tradicional em vez de filter e map
        const transacoesFiltradas: AdicionarTransacao[] = [];
        for (let i = 0; i < this.transacoes.length; i++) {
            const transacao = this.transacoes[i];
            if (transacao.tipo === filtroTipo) {
                transacoesFiltradas.push(transacao);
            }
        }
        return transacoesFiltradas;
    }

    // Obtém o resumo do saldo com base nas transações
    obterResumoSaldo(): ResumoSaldo {
        const entradas: number[] = [];
        const saidas: number[] = [];

        // Usando um loop for tradicional em vez de filter e map
        for (let i = 0; i < this.transacoes.length; i++) {
            const transacao = this.transacoes[i];
            if (transacao.tipo === 'entrada') {
                entradas.push(transacao.valor);
            } else if (transacao.tipo === 'saida') {
                saidas.push(transacao.valor);
            }
        }

        return new ResumoSaldo(entradas, saidas);
    }
}


// Classe para calcular e exibir o resumo do saldo
class ResumoSaldo {
    entradas: number[];
    saidas: number[];

    constructor(entradas: number[], saidas: number[]) {
        this.entradas = entradas;
        this.saidas = saidas;
    }

    // Calcula o saldo total (entradas - saídas)
    calcularSaldo(): number {
        let totalEntradas : number  = 0;
        let totalSaidas : number = 0;

        for (let i = 0; i < this.entradas.length; i++) {
            totalEntradas += this.entradas[i];
        }

        for (let i = 0; i < this.saidas.length; i++) {
            totalSaidas += this.saidas[i];
        }

        return totalEntradas - totalSaidas;
    }

    // Gera um resumo formatado do saldo
    resumo(): string {
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
    minhasTransacoes: MinhasTransacoes; // Instância da classe de transações

    constructor() {
        this.minhasTransacoes = new MinhasTransacoes();
    }

    // Adiciona uma nova transação e atualiza a interface
    adicionarTransacao(tipo: string, categoria: string, descricao: string, valor: number): void {
        const transacao = new AdicionarTransacao(tipo, categoria, descricao, valor);
        this.minhasTransacoes.adicionarTransacao(transacao);
        this.atualizarInterface();
    }

    // Exibe transações filtradas por tipo
    exibirTransacoes(filtroTipo: string = 'todos'): AdicionarTransacao[] {
        return this.minhasTransacoes.exibirTransacoes(filtroTipo);
    }

    // Exibe o resumo do saldo
    exibirResumo(): string {
        const resumoSaldo = this.minhasTransacoes.obterResumoSaldo();
        return resumoSaldo.resumo();
    }

    // Atualiza a interface do usuário com as transações e resumo
    atualizarInterface(): void {
        const filtroTipo = (document.getElementById('filtroTipo') as HTMLSelectElement).value;
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
    const form = document.getElementById('transacaoForm') as HTMLFormElement;
    const filtroTipo = document.getElementById('filtroTipo') as HTMLSelectElement;

    form.addEventListener('submit', function (event: Event) {
        event.preventDefault();

        const tipo = (document.getElementById('tipo') as HTMLSelectElement).value;
        const categoria = (document.getElementById('categoria') as HTMLSelectElement).value;
        const descricao = (document.getElementById('descricao') as HTMLInputElement).value;
        const valor = parseFloat((document.getElementById('valor') as HTMLInputElement).value);

        interfaceUsuario.adicionarTransacao(tipo, categoria, descricao, valor);
    });

    // Manipulador de mudança do filtro de tipo
    filtroTipo.addEventListener('change', function () {
        interfaceUsuario.atualizarInterface();
    });

    // Atualiza a interface ao carregar a página
    interfaceUsuario.atualizarInterface();
});