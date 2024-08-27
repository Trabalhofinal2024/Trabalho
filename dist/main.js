import { InterfaceUsuario } from './InterfaceUsuario.js';
document.addEventListener('DOMContentLoaded', function () {
    const interfaceUsuario = new InterfaceUsuario();
    const loginSection = document.getElementById('introSection');
    const funcaoSection = document.getElementById('funcaoSection');
    const transacaoSection = document.getElementById('transacaoSection');
    const transacoesSection = document.getElementById('transacoesSection');
    const resumoSection = document.getElementById('resumoSection');
    const loginButton = document.getElementById('loginButton');
    const nomeInput = document.getElementById('nome');
    const adicionarTransacaoButton = document.getElementById('adicionarTransacaoButton');
    const mostrarTransacoesButton = document.getElementById('mostrarTransacoesButton');
    const resumoSaldoButton = document.getElementById('resumoSaldoButton');
    const form = document.getElementById('transacaoForm');
    const filtroTipo = document.getElementById('filtroTipo');
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
        const tipo = document.getElementById('tipo').value;
        const categoria = document.getElementById('categoria').value;
        const descricao = document.getElementById('descricao').value;
        const valor = parseFloat(document.getElementById('valor').value);
        interfaceUsuario.adicionarTransacao(tipo, categoria, descricao, valor);
        document.getElementById('tipo').value = '';
        document.getElementById('categoria').value = '';
        document.getElementById('descricao').value = '';
        document.getElementById('valor').value = '';
        const mensagemSucesso = document.getElementById('mensagemSucesso');
        mensagemSucesso.style.display = 'block';
        setTimeout(() => {
            mensagemSucesso.style.display = 'none';
        }, 3000);
    });
    filtroTipo.addEventListener('change', function () {
        interfaceUsuario.atualizarInterface();
    });
    interfaceUsuario.atualizarInterface();
});
