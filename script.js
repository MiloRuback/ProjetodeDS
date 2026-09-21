/* ============================================================
   AMIGO FIEL PETSHOP — Projeto PWA | Etec São Mateus
   Script principal: interatividade + registro do Service Worker
   ============================================================ */

/* ------------------------------------------------------------
   1) PWA: REGISTRO DO SERVICE WORKER (sw.js)
   É isso que faz o site funcionar offline e poder ser instalado.
   ------------------------------------------------------------ */
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker
            .register('sw.js')
            .then(registro => {
                console.log('Service Worker registrado com sucesso!', registro.scope);
            })
            .catch(erro => {
                console.log('Erro ao registrar o Service Worker:', erro);
            });
    });
}

/* ------------------------------------------------------------
   2) PWA: BOTÃO "INSTALAR APP"
   O navegador dispara o evento beforeinstallprompt quando o site
   pode ser instalado. Aí mostramos o botão no menu.
   ------------------------------------------------------------ */
let eventoInstalacao = null;
const botaoInstalar = document.getElementById('botaoInstalar');

window.addEventListener('beforeinstallprompt', evento => {
    evento.preventDefault();          // impede o banner automático
    eventoInstalacao = evento;        // guarda o evento
    botaoInstalar.classList.remove('esconder');
});

botaoInstalar.addEventListener('click', async () => {
    if (!eventoInstalacao) return;
    botaoInstalar.classList.add('esconder');
    eventoInstalacao.prompt();        // abre o diálogo de instalação
    const { outcome } = await eventoInstalacao.userChoice;
    console.log('Resultado da instalação:', outcome);
    eventoInstalacao = null;
});

/* ------------------------------------------------------------
   3) MENU DO CELULAR (hambúrguer)
   ------------------------------------------------------------ */
const menuBotao = document.getElementById('menuBotao');
const menu = document.getElementById('menu');

menuBotao.addEventListener('click', () => {
    const aberto = menu.classList.toggle('aberto');
    menuBotao.classList.toggle('aberto', aberto);
    menuBotao.setAttribute('aria-expanded', aberto);
});

// Fecha o menu ao clicar em um link (útil no celular)
menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        menu.classList.remove('aberto');
        menuBotao.classList.remove('aberto');
        menuBotao.setAttribute('aria-expanded', 'false');
    });
});

/* ------------------------------------------------------------
   4) SOMBRA NO CABEÇALHO QUANDO ROLA A PÁGINA
   ------------------------------------------------------------ */
const cabecalho = document.querySelector('.cabecalho');
const voltarTopo = document.getElementById('voltarTopo');

window.addEventListener('scroll', () => {
    const rolou = window.scrollY > 10;

    cabecalho.classList.toggle('rolado', rolou);
    voltarTopo.classList.toggle('esconder', window.scrollY < 500);
});

voltarTopo.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ------------------------------------------------------------
   5) LINK ATIVO NO MENU CONFORME A SEÇÃO VISÍVEL
   ------------------------------------------------------------ */
const secoes = document.querySelectorAll('main section[id]');
const linksMenu = document.querySelectorAll('.menu-link');

const observadorMenu = new IntersectionObserver(
    entradas => {
        entradas.forEach(entrada => {
            if (entrada.isIntersecting) {
                linksMenu.forEach(link => {
                    link.classList.toggle(
                        'ativo',
                        link.getAttribute('href') === '#' + entrada.target.id
                    );
                });
            }
        });
    },
    { rootMargin: '-40% 0px -55% 0px' }
);

secoes.forEach(secao => observadorMenu.observe(secao));

/* ------------------------------------------------------------
   6) ANIMAÇÃO DE ENTRADA DOS ELEMENTOS (classe .reveal)
   ------------------------------------------------------------ */
const observadorReveal = new IntersectionObserver(
    entradas => {
        entradas.forEach(entrada => {
            if (entrada.isIntersecting) {
                entrada.target.classList.add('visivel');
                observadorReveal.unobserve(entrada.target); // anima só uma vez
            }
        });
    },
    { threshold: 0.15 }
);

document.querySelectorAll('.reveal').forEach(elemento => {
    observadorReveal.observe(elemento);
});

/* ------------------------------------------------------------
   7) VALIDAÇÃO DO FORMULÁRIO DE AGENDAMENTO
   ------------------------------------------------------------ */
const formulario = document.getElementById('formulario');
const mensagemSucesso = document.getElementById('sucesso');

formulario.addEventListener('submit', evento => {
    evento.preventDefault(); // impede o envio real (site estático)

    let formularioValido = true;

    // Limpa os erros anteriores
    formulario.querySelectorAll('.erro').forEach(erro => erro.classList.add('esconder'));

    // Valida o nome (mínimo 3 caracteres)
    const campoNome = document.getElementById('nome');
    if (campoNome.value.trim().length < 3) {
        mostrarErro(campoNome);
        formularioValido = false;
    }

    // Valida o e-mail com expressão regular
    const campoEmail = document.getElementById('email');
    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(campoEmail.value.trim());
    if (!emailValido) {
        mostrarErro(campoEmail);
        formularioValido = false;
    }

    // Valida os campos de seleção
    const campoPet = document.getElementById('pet');
    const campoServico = document.getElementById('servico');
    if (!campoPet.value) {
        mostrarErro(campoPet);
        formularioValido = false;
    }
    if (!campoServico.value) {
        mostrarErro(campoServico);
        formularioValido = false;
    }

    // Se estiver tudo certo, mostra a mensagem de sucesso
    if (formularioValido) {
        mensagemSucesso.classList.remove('esconder');
        formulario.reset();
        // Esconde a mensagem depois de 6 segundos
        setTimeout(() => mensagemSucesso.classList.add('esconder'), 6000);
    }
});

// Mostra a mensagem de erro logo abaixo do campo
function mostrarErro(campo) {
    const erro = campo.parentElement.querySelector('.erro');
    if (erro) erro.classList.remove('esconder');
}

/* ------------------------------------------------------------
   8) ANO ATUAL NO RODAPÉ
   ------------------------------------------------------------ */
document.getElementById('ano').textContent = new Date().getFullYear();
