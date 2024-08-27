export class AdicionarTransacao {
    tipo;
    categoria;
    descricao;
    valor;
    constructor(t, c, d, v) {
        this.tipo = t;
        this.categoria = c;
        this.descricao = d;
        this.valor = v;
    }
}
