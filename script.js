/* ============================================
   LAROCA E PITOCO - JavaScript Principal
   ============================================ */

// ========== CONFIGURAÇÕES ==========
const DATA_INICIO = new Date(2025, 8, 27, 16, 0, 0); // 27/09/2025 às 16:00

// ========== CORAÇÕES CAINDO ==========
function iniciarCoracoesCaindo() {
    const container = document.getElementById('hearts-container');
    const simbolos = ['❤️', '💖', '💕', '💘', '💝', '💗', '🥰', '💓', '💞'];
    const maxCoracoes = 30;

    function criarCoracao() {
        const heart = document.createElement('div');
        heart.className = 'heart-falling';
        heart.textContent = simbolos[Math.floor(Math.random() * simbolos.length)];

        const tamanho = Math.random() * 0.8 + 0.7;
        const posicao = Math.random() * 100;
        const duracao = Math.random() * 8 + 6;
        const delay = Math.random() * 5;
        const opacidade = Math.random() * 0.4 + 0.2;

        heart.style.left = posicao + '%';
        heart.style.fontSize = tamanho + 'rem';
        heart.style.animationDuration = duracao + 's';
        heart.style.animationDelay = delay + 's';
        heart.style.opacity = opacidade;

        container.appendChild(heart);

        setTimeout(() => {
            if (heart.parentNode) heart.parentNode.removeChild(heart);
        }, (duracao + delay) * 1000);
    }

    // Cria corações iniciais
    for (let i = 0; i < maxCoracoes; i++) {
        setTimeout(criarCoracao, i * 400);
    }

    // Continua criando indefinidamente
    setInterval(criarCoracao, 1200);
}

// ========== CONTADOR EM TEMPO REAL ==========
function atualizarContador() {
    const agora = new Date();
    const diff = agora - DATA_INICIO;

    if (diff < 0) {
        // Data ainda no futuro - mostra contagem regressiva
        const segundos = Math.floor(Math.abs(diff) / 1000);
        const dias = Math.floor(segundos / 86400);
        const horas = Math.floor((segundos % 86400) / 3600);
        const minutos = Math.floor((segundos % 3600) / 60);
        const segs = segundos % 60;

        document.getElementById('contador-dias').textContent = String(dias).padStart(2, '0');
        document.getElementById('contador-horas').textContent = String(horas).padStart(2, '0');
        document.getElementById('contador-minutos').textContent = String(minutos).padStart(2, '0');
        document.getElementById('contador-segundos').textContent = String(segs).padStart(2, '0');
        return;
    }

    const segundosTotais = Math.floor(diff / 1000);
    const dias = Math.floor(segundosTotais / 86400);
    const horas = Math.floor((segundosTotais % 86400) / 3600);
    const minutos = Math.floor((segundosTotais % 3600) / 60);
    const segundos = segundosTotais % 60;

    document.getElementById('contador-dias').textContent = String(dias).padStart(2, '0');
    document.getElementById('contador-horas').textContent = String(horas).padStart(2, '0');
    document.getElementById('contador-minutos').textContent = String(minutos).padStart(2, '0');
    document.getElementById('contador-segundos').textContent = String(segundos).padStart(2, '0');
}

// ========== MENU RESPONSIVO ==========
function inicializarMenu() {
    const toggle = document.getElementById('nav-toggle');
    const menu = document.getElementById('nav-menu');
    const links = document.querySelectorAll('.nav-link');

    toggle.addEventListener('click', () => {
        toggle.classList.toggle('active');
        menu.classList.toggle('active');
    });

    // Fecha menu ao clicar em um link
    links.forEach(link => {
        link.addEventListener('click', () => {
            toggle.classList.remove('active');
            menu.classList.remove('active');
        });
    });
}

// ========== NAVBAR SCROLL ==========
function inicializarNavbarScroll() {
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// ========== SCROLL REVEAL ==========
function inicializarScrollReveal() {
    const revelar = document.querySelectorAll('.reveal');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revelar.forEach(el => observer.observe(el));
}

// ========== BOTÃO VOLTAR AO TOPO ==========
function inicializarBtnTopo() {
    const btn = document.getElementById('btn-topo');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            btn.classList.remove('hidden');
        } else {
            btn.classList.add('hidden');
        }
    });
}

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function scrollToSection(id) {
    const section = document.getElementById(id);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// ========== MENU ATIVO ==========
function inicializarMenuAtivo() {
    const sections = document.querySelectorAll('section[id]');
    const links = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let atual = '';
        sections.forEach(section => {
            const top = section.offsetTop - 100;
            if (window.scrollY >= top) {
                atual = section.getAttribute('id');
            }
        });

        links.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + atual) {
                link.classList.add('active');
            }
        });
    });
}

// ========== MENSAGEM DE AMOR ==========
function mostrarMensagemAmor() {
    const overlay = document.getElementById('mensagem-amor-overlay');
    overlay.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    criarParticulasCoracao(window.innerWidth / 2, window.innerHeight / 2);
}

function fecharMensagemAmor() {
    const overlay = document.getElementById('mensagem-amor-overlay');
    overlay.classList.add('hidden');
    document.body.style.overflow = '';
}

// ========== MÚSICA ==========
let musicaTocando = false;

function toggleMusica() {
    const audio = document.getElementById('audio-player');
    const icon = document.getElementById('icon-musica');
    const texto = document.getElementById('texto-musica');
    const btn = document.getElementById('btn-musica-toggle');

    if (!audio) return;

    if (musicaTocando) {
        audio.pause();
        icon.textContent = '▶️';
        texto.textContent = 'Nossa Música';
        btn.classList.remove('tocando');
        musicaTocando = false;
    } else {
        audio.play().then(() => {
            icon.textContent = '⏸️';
            texto.textContent = 'Pausar';
            btn.classList.add('tocando');
            musicaTocando = true;
        }).catch(() => {
            texto.textContent = 'Música indisponível';
        });
    }
}

// ========== GALERIA LIGHTBOX ==========
const GALERIA_LEGENDAS = [
    'Nosso primeiro momento juntos',
    'Sorrisos que iluminam meu dia',
    'Aventuras que vivemos',
    'Olhares que dizem tudo',
    'Momentos inesquecíveis',
    'Nosso amor em cada detalhe'
];

const GALERIA_ICONES = ['💕', '💖', '💘', '💝', '💗', '🥰'];

let lightboxAtual = 0;

function abrirLightbox(index) {
    lightboxAtual = index;
    const lightbox = document.getElementById('lightbox');
    const placeholder = document.getElementById('lightbox-img');
    const texto = document.getElementById('lightbox-placeholder-text');
    const caption = document.getElementById('lightbox-caption');

    texto.textContent = GALERIA_ICONES[index];
    caption.textContent = GALERIA_LEGENDAS[index];
    lightbox.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function fecharLightbox() {
    document.getElementById('lightbox').classList.add('hidden');
    document.body.style.overflow = '';
}

function navegarLightbox(direcao) {
    lightboxAtual += direcao;
    if (lightboxAtual < 0) lightboxAtual = 5;
    if (lightboxAtual > 5) lightboxAtual = 0;

    const placeholder = document.getElementById('lightbox-img');
    const texto = document.getElementById('lightbox-placeholder-text');
    const caption = document.getElementById('lightbox-caption');

    placeholder.style.animation = 'none';
    placeholder.offsetHeight; // Trigger reflow
    placeholder.style.animation = 'scaleIn 0.3s ease';

    texto.textContent = GALERIA_ICONES[lightboxAtual];
    caption.textContent = GALERIA_LEGENDAS[lightboxAtual];
}

// ========== TIMELINE ==========
const MEMORIAS = [
    {
        data: '27 de Setembro de 2025',
        titulo: 'O Dia em que Tudo Começou',
        texto: 'Naquele momento especial, nossos olhares se encontraram e soubemos que algo mágico estava para acontecer. Foi o início da nossa linda história.',
        icone: '💕'
    },
    {
        data: 'Nossa Primeira Conversa',
        titulo: 'Palavras que Mudaram Tudo',
        texto: 'Cada palavra dita naquele dia ecoa até hoje no meu coração. A conexão foi instantânea, como se nos conhecêssemos há uma eternidade.',
        icone: '💬'
    },
    {
        data: 'Primeiro Encontro',
        titulo: 'Um Dia Inesquecível',
        texto: 'O nervosismo, a expectativa e a alegria de finalmente estar perto de você. Um dia que guardo com muito carinho na memória.',
        icone: '☕'
    },
    {
        data: 'Primeiro "Eu Te Amo"',
        titulo: 'Três Palavras Mágicas',
        texto: 'Quando finalmente dissemos um para o outro, o mundo parou por um instante. Foi o momento mais puro e verdadeiro do nosso amor.',
        icone: '💖'
    },
    {
        data: 'Nossas Aventuras',
        titulo: 'Juntos em Cada Lugar',
        texto: 'Cada lugar que visitamos, cada aventura que vivemos, ficou marcado com o brilho do nosso amor. Você torna tudo mais especial.',
        icone: '🌟'
    },
    {
        data: 'Hoje e Sempre',
        titulo: 'Para Todo o Sempre',
        texto: 'E aqui estamos, escrevendo mais um capítulo da nossa história. Cada dia é uma nova razão para amar você ainda mais.',
        icone: '💍'
    }
];

function criarTimeline() {
    const timeline = document.getElementById('timeline');

    MEMORIAS.forEach((memoria, index) => {
        const item = document.createElement('div');
        item.className = 'timeline-item';
        item.innerHTML = `
            <div class="timeline-card">
                <div class="timeline-data">${memoria.data}</div>
                <div class="timeline-foto">${memoria.icone}</div>
                <div class="timeline-titulo">${memoria.titulo}</div>
                <div class="timeline-texto">${memoria.texto}</div>
            </div>
        `;
        timeline.appendChild(item);
    });
}

function inicializarTimelineAnimacao() {
    const items = document.querySelectorAll('.timeline-item');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.2 });

    items.forEach(item => observer.observe(item));
}

// ========== QUIZ ==========
const PERGUNTAS = [
    {
        pergunta: 'Em que data Laroca e Pitoco se conheceram?',
        alternativas: ['15 de Agosto', '27 de Setembro', '10 de Outubro', '1 de Janeiro'],
        resposta: 1
    },
    {
        pergunta: 'Qual é o apelido carinhoso do casal?',
        alternativas: ['Amor e Vida', 'Laroca e Pitoco', 'Docinho e Flor', 'Sol e Lua'],
        resposta: 1
    },
    {
        pergunta: 'A que horas começou essa história de amor?',
        alternativas: ['14:00', '15:00', '16:00', '17:00'],
        resposta: 2
    },
    {
        pergunta: 'Qual o sentimento que define esse casal?',
        alternativas: ['Amor Infinito', 'Amizade', 'Carinho', 'Admiração'],
        resposta: 0
    },
    {
        pergunta: 'Qual é a promessa de Laroca e Pitoco?',
        alternativas: ['Ser felizes', 'Viajar o mundo', 'Ficar juntos para sempre', 'Tudo isso e mais'],
        resposta: 3
    }
];

let quizAtual = 0;
let quizPontuacao = 0;
let quizRespondendo = false;

function iniciarQuiz() {
    quizAtual = 0;
    quizPontuacao = 0;
    quizRespondendo = false;

    document.getElementById('quiz-inicio').classList.add('hidden');
    document.getElementById('quiz-pergunta').classList.remove('hidden');
    document.getElementById('quiz-resultado').classList.add('hidden');

    mostrarPergunta();
}

function mostrarPergunta() {
    const pergunta = PERGUNTAS[quizAtual];
    const progresso = ((quizAtual) / PERGUNTAS.length) * 100;

    document.getElementById('quiz-progresso').style.width = progresso + '%';
    document.getElementById('quiz-numero').textContent =
        `Pergunta ${quizAtual + 1} de ${PERGUNTAS.length}`;
    document.getElementById('quiz-pergunta-texto').textContent = pergunta.pergunta;

    const container = document.getElementById('quiz-alternativas');
    container.innerHTML = '';

    pergunta.alternativas.forEach((alt, index) => {
        const btn = document.createElement('button');
        btn.className = 'quiz-alt-btn';
        btn.textContent = alt;
        btn.onclick = () => responderQuiz(index);
        container.appendChild(btn);
    });

    quizRespondendo = true;
}

function responderQuiz(index) {
    if (!quizRespondendo) return;
    quizRespondendo = false;

    const pergunta = PERGUNTAS[quizAtual];
    const botoes = document.querySelectorAll('.quiz-alt-btn');

    botoes.forEach((btn, i) => {
        btn.classList.add('desativada');
        if (i === pergunta.resposta) {
            btn.classList.add('certa');
        } else if (i === index && i !== pergunta.resposta) {
            btn.classList.add('errada');
        }
    });

    if (index === pergunta.resposta) {
        quizPontuacao++;
    }

    setTimeout(() => {
        quizAtual++;
        if (quizAtual < PERGUNTAS.length) {
            mostrarPergunta();
        } else {
            mostrarResultadoQuiz();
        }
    }, 1500);
}

function mostrarResultadoQuiz() {
    document.getElementById('quiz-pergunta').classList.add('hidden');
    document.getElementById('quiz-resultado').classList.remove('hidden');

    const percentual = (quizPontuacao / PERGUNTAS.length) * 100;
    let emoji, titulo, texto;

    if (percentual === 100) {
        emoji = '🏆';
        titulo = 'Perfeito! Você conhece tudo!';
        texto = `Você acertou todas as ${PERGUNTAS.length} perguntas! Nosso amor é verdadeiro e você provou que conhece cada detalhe da nossa história! 💖`;
    } else if (percentual >= 60) {
        emoji = '🌟';
        titulo = 'Incrível! Quase lá!';
        texto = `Você acertou ${quizPontuacao} de ${PERGUNTAS.length} perguntas. Você conhece muito bem nosso relacionamento! 💕`;
    } else {
        emoji = '💝';
        titulo = 'O amor é o que importa!';
        texto = `Você acertou ${quizPontuacao} de ${PERGUNTAS.length} perguntas. O importante é o amor que sentimos um pelo outro! 💘`;
    }

    document.getElementById('quiz-resultado-emoji').textContent = emoji;
    document.getElementById('quiz-resultado-titulo').textContent = titulo;
    document.getElementById('quiz-resultado-texto').textContent = texto;
    document.getElementById('quiz-pontuacao').textContent = quizPontuacao;
    document.getElementById('quiz-total').textContent = PERGUNTAS.length;
}

function reiniciarQuiz() {
    iniciarQuiz();
}

// ========== SURPRESA FINAL ==========
function dispararSurpresa() {
    // Cria explosão de corações
    for (let i = 0; i < 60; i++) {
        setTimeout(() => {
            criarCoracaoExplosao();
        }, i * 30);
    }

    // Mostra mensagem
    setTimeout(() => {
        const overlay = document.getElementById('surpresa-overlay');
        overlay.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }, 800);
}

function criarCoracaoExplosao() {
    const coracoes = ['💕', '💖', '💘', '💝', '💗', '❤️', '💓', '🥰'];
    const heart = document.createElement('div');
    heart.textContent = coracoes[Math.floor(Math.random() * coracoes.length)];
    heart.style.cssText = `
        position: fixed;
        left: ${Math.random() * 100}vw;
        bottom: -50px;
        font-size: ${Math.random() * 2 + 1}rem;
        z-index: 4999;
        pointer-events: none;
        animation: subirCoracao ${Math.random() * 2 + 2}s ease-out forwards;
    `;
    document.body.appendChild(heart);

    setTimeout(() => {
        if (heart.parentNode) heart.parentNode.removeChild(heart);
    }, 4000);
}

function fecharSurpresa() {
    document.getElementById('surpresa-overlay').classList.add('hidden');
    document.body.style.overflow = '';
}

// ========== PARTÍCULAS NO CURSOR ==========
let ultimoCursor = 0;

document.addEventListener('mousemove', (e) => {
    const agora = Date.now();
    if (agora - ultimoCursor < 120) return;
    ultimoCursor = agora;

    if (Math.random() > 0.88) {
        const heart = document.createElement('div');
        heart.className = 'cursor-heart';
        heart.textContent = ['💕', '💖', '✨'][Math.floor(Math.random() * 3)];
        heart.style.left = e.clientX + 'px';
        heart.style.top = e.clientY + 'px';
        document.body.appendChild(heart);

        setTimeout(() => {
            if (heart.parentNode) heart.parentNode.removeChild(heart);
        }, 1000);
    }
});

function criarParticulasCoracao(x, y) {
    for (let i = 0; i < 20; i++) {
        const heart = document.createElement('div');
        heart.textContent = ['💕', '💖', '💘', '💝'][Math.floor(Math.random() * 4)];
        heart.style.cssText = `
            position: fixed;
            left: ${x}px;
            top: ${y}px;
            font-size: ${Math.random() * 1.5 + 0.5}rem;
            z-index: 3001;
            pointer-events: none;
            animation: cursorHeart ${Math.random() * 1 + 0.8}s ease forwards;
        `;
        document.body.appendChild(heart);

        setTimeout(() => {
            if (heart.parentNode) heart.parentNode.removeChild(heart);
        }, 1500);
    }
}

// ========== KEYBOARD NAVIGATION LIGHTBOX ==========
document.addEventListener('keydown', (e) => {
    const lightbox = document.getElementById('lightbox');
    if (!lightbox.classList.contains('hidden')) {
        if (e.key === 'Escape') fecharLightbox();
        if (e.key === 'ArrowLeft') navegarLightbox(-1);
        if (e.key === 'ArrowRight') navegarLightbox(1);
    }

    if (e.key === 'Escape') {
        fecharMensagemAmor();
        fecharSurpresa();
    }
});

// ========== INICIALIZAÇÃO ==========
document.addEventListener('DOMContentLoaded', () => {
    iniciarCoracoesCaindo();
    inicializarMenu();
    inicializarNavbarScroll();
    inicializarScrollReveal();
    inicializarBtnTopo();
    inicializarMenuAtivo();
    criarTimeline();
    inicializarTimelineAnimacao();

    // Inicia contador
    atualizarContador();
    setInterval(atualizarContador, 1000);

    // Console mensagem
    console.log('%c💕 Laroca e Pitoco 💕', 'font-size: 24px; font-weight: bold; color: #ff2d55;');
    console.log('%cFeito com amor para o casal mais especial!', 'font-size: 14px; color: #ff4d88;');
});

// ========== CSS DINÂMICO PARA ANIMAÇÕES ==========
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    @keyframes subirCoracao {
        0% {
            transform: translateY(0) scale(0.5) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) scale(1.5) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(styleSheet);
