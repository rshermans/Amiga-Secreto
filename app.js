let amigos = [];
const listaAmigos = document.getElementById('listaAmigos');
const resultadoSorteio = document.getElementById('resultado');
const maxAmigos = 10; // Limite máximo de amigos


// Carrega os amigos do localStorage ao iniciar
function carregarAmigos() {
    const amigosSalvos = localStorage.getItem('amigos');
    if (amigosSalvos) {
        amigos = JSON.parse(amigosSalvos);
        exibirAmigos();
    }
}
carregarAmigos();

function salvarAmigos(){
    localStorage.setItem('amigos', JSON.stringify(amigos))
}

function adicionarAmigo() {
    const nomeAmigo = document.getElementById('amigo').value.trim();

    if (nomeAmigo === '') {
        exibirAlerta('Por favor, digite um nome válido.');
        return;
    }

    if (amigos.length >= maxAmigos) {
        exibirAlerta(`Você já adicionou o número máximo de amigos (${maxAmigos}).`);
        return;
    }

    amigos.push(nomeAmigo);
    limparCampo('amigo');
    exibirAmigos();
    salvarAmigos()
}

function exibirAmigos() {
    listaAmigos.innerHTML = '';
    amigos.forEach((amigo, index) => {
        const li = document.createElement('li');
        li.textContent = amigo;

        const btnExcluir = document.createElement('button');
        btnExcluir.textContent = 'Excluir';
        btnExcluir.classList.add('btn-excluir');
        btnExcluir.onclick = () => removerAmigo(index);

        li.appendChild(btnExcluir);
        listaAmigos.appendChild(li);
    });
}

function removerAmigo(index) {
    amigos.splice(index, 1);
    exibirAmigos();
    salvarAmigos();
}

function sortearAmigo() {
    if (amigos.length < 2) {
       exibirAlerta('Adicione pelo menos dois amigos para realizar o sorteio.');
        return;
    }
    
    const indiceSorteado = Math.floor(Math.random() * amigos.length);
    const amigoSorteado = amigos[indiceSorteado];
    resultadoSorteio.innerHTML = `Amigo sorteado: <br> ${amigoSorteado}`;
    resultadoSorteio.classList.add('sorteado'); // Adiciona classe de animação
    setTimeout(() => resultadoSorteio.classList.remove('sorteado'), 1000); // Remove após 1 segundo
}

function limparCampo(id) {
    document.getElementById(id).value = '';
}

function exibirAlerta(mensagem) {
    alert(mensagem);
}