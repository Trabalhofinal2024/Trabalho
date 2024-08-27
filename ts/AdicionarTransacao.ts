export class AdicionarTransacao {
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
