"use strict";
class ResumoSaldo {
    // Construtor para inicializar os atributos com listas de entradas e saídas
    constructor(entradas, saidas) {
        this.entradas = entradas;
        this.saidas = saidas;
    }
    // Método privado para calcular o saldo
    calcularSaldo() {
        // Calcula o total das entradas
        const totalEntradas = this.entradas.reduce((acc, valor) => acc + valor, 0);
        // Calcula o total das saídas
        const totalSaidas = this.saidas.reduce((acc, valor) => acc + valor, 0);
        // Retorna a diferença entre total de entradas e total de saídas
        return totalEntradas - totalSaidas;
    }
    // Método público para gerar o resumo formatado do saldo
    resumo() {
        // Total das entradas e saídas
        const totalEntradas = this.entradas.reduce((acc, valor) => acc + valor, 0);
        const totalSaidas = this.saidas.reduce((acc, valor) => acc + valor, 0);
        // Calcula o saldo
        const saldo = this.calcularSaldo();
        // Retorna o resumo formatado
        return `Resumo do Saldo:
        Total de Entradas: R$ ${totalEntradas.toFixed(2)}
        Total de Saídas: R$ ${totalSaidas.toFixed(2)}
        Saldo Final: R$ ${saldo.toFixed(2)}`;
    }
}
// Exemplo de uso da classe
const entradas = [1000.00, 200.00, 50.00];
const saidas = [300.00, 100.00];
const resumoSaldo = new ResumoSaldo(entradas, saidas);
console.log(resumoSaldo.resumo());
