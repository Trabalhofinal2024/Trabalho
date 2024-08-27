export class ResumoSaldo {
    entradas;
    saidas;
    constructor(entradas, saidas) {
        this.entradas = entradas;
        this.saidas = saidas;
    }
    calcularSaldo() {
        let totalEntradas = 0;
        let totalSaidas = 0;
        let i = 0;
        while (i < this.entradas.length) {
            totalEntradas += this.entradas[i];
            i++;
        }
        for (let j = 0; j < this.saidas.length; j++) {
            totalSaidas += this.saidas[j];
        }
        return totalEntradas - totalSaidas;
    }
    resumo() {
        let totalEntradas = 0;
        let totalSaidas = 0;
        let i = 0;
        while (i < this.entradas.length) {
            totalEntradas += this.entradas[i];
            i++;
        }
        for (let j = 0; j < this.saidas.length; j++) {
            totalSaidas += this.saidas[j];
        }
        const saldo = this.calcularSaldo();
        return {
            totalEntradas: totalEntradas,
            totalSaidas: totalSaidas,
            saldo: saldo
        };
    }
}
