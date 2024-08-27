import { InterfaceUsuario } from './InterfaceUsuario.js';

document.addEventListener('DOMContentLoaded', function () {
    const interfaceUsuario = new InterfaceUsuario();

    const loginSection = document.getElementById('introSection') as HTMLDivElement;
    const funcaoSection = document.getElementById('funcaoSection') as HTMLDivElement;
    const transacaoSection = document.getElementById('transacaoSection') as HTMLDivElement;
    const transacoesSection = document.getElementById('transacoesSection') as HTMLDivElement;
    const resumoSection = document.getElementById('resumoSection') as HTMLDivElement;
    const loginButton = document.getElementById('loginButton') as HTMLButtonElement;
    const nomeInput = document.getElementById('nome') as HTMLInputElement;

    const adicionarTransacaoButton = document.getElementById('adicionarTransacaoButton') as HTMLButtonElement;
    const mostrarTransacoesButton = document.getElementById('mostrarTransacoesButton') as HTMLButtonElement;
    const resumoSaldoButton = document.getElementById('resumoSaldoButton') as HTMLButtonElement;

    const form = document.getElementById('transacaoForm') as HTMLFormElement;
    const filtroTipo = document.getElementById('filtroTipo') as HTMLSelectElement;

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
        const tipo = (document.getElementById('tipo') as HTMLSelectElement).value;
        const categoria = (document.getElementById('categoria') as HTMLInputElement).value;
        const descricao = (document.getElementById('descricao') as HTMLInputElement).value;
        const valor = parseFloat((document.getElementById('valor') as HTMLInputElement).value);
        interfaceUsuario.adicionarTransacao(tipo, categoria, descricao, valor);

        (document.getElementById('tipo') as HTMLSelectElement).value = '';
        (document.getElementById('categoria') as HTMLInputElement).value = '';
        (document.getElementById('descricao') as HTMLInputElement).value = '';
        (document.getElementById('valor') as HTMLInputElement).value = '';

        const mensagemSucesso = document.getElementById('mensagemSucesso') as HTMLDivElement;
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
