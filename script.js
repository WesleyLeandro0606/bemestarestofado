// ===== Configurações (troque pelos dados reais da sua empresa) =====
const NUMERO_WHATSAPP = '5551982229841'; // formato: 55 + DDD + número, sem espaços ou símbolos
const LINK_INSTAGRAM = 'https://www.instagram.com/_bemestaarestofados?igsh=MWgxcXljaTZ2cXBlbw=='; // troque pelo @ da sua empresa

document.addEventListener('DOMContentLoaded', function () {

// 1. MENU HAMBÚRGUER (celular)

    const btnHamburguer = document.getElementById('btn-hamburguer');
    const menuNav = document.getElementById('menu-nav');

    if (btnHamburguer && menuNav) {
        btnHamburguer.addEventListener('click', function () {
            const menuAberto = menuNav.classList.toggle('ativo');
            btnHamburguer.classList.toggle('ativo', menuAberto);
            btnHamburguer.setAttribute('aria-expanded', menuAberto);
        });
    }

// 2. ROLAGEM SUAVE ENTRE SEÇÕES

     const linksMenu = document.querySelectorAll('nav a[href^="#"]');
    
    if (linksMenu.length > 0) {
        linksMenu.forEach(link => {
            link.addEventListener("click", function (e) {
                const idAlvo = this.getAttribute("href");
                if (idAlvo !== "#") {
                    e.preventDefault();
                    const secaoAlvo = document.querySelector(idAlvo);
                    if (secaoAlvo) {
                        secaoAlvo.scrollIntoView({
                            behavior: "smooth",
                            block: "start"
                        });
                    }

                    // Fecha o menu hambúrguer ao clicar em um link (celular)
                    if (menuNav && menuNav.classList.contains('ativo')) {
                        menuNav.classList.remove('ativo');
                        btnHamburguer.classList.remove('ativo');
                        btnHamburguer.setAttribute('aria-expanded', 'false');
                    }
                }
            });
        });
    }

    // ===== Função utilitária para abrir o WhatsApp com uma mensagem pronta =====
    function abrirWhatsApp(mensagem) {
        const mensagemCodificada = encodeURIComponent(mensagem);
        const url = `https://wa.me/${NUMERO_WHATSAPP}?text=${mensagemCodificada}`;
        window.open(url, '_blank');
    }

    // ===== Botão "Solicitar Orçamento" (topo do site) =====
    const btnWhatsTopo = document.getElementById('btn-whats-topo');
    if (btnWhatsTopo) {
        btnWhatsTopo.addEventListener('click', function () {
            abrirWhatsApp('Olá! Gostaria de solicitar um orçamento para higienização de estofados.');
        });
    }

    // ===== Botão "Fazer Orçamento Grátis" (seção Home) =====
    const btnWhatsHome = document.getElementById('btn-whats-home');
    if (btnWhatsHome) {
        btnWhatsHome.addEventListener('click', function () {
            abrirWhatsApp('Olá! Vi o site e quero fazer um orçamento grátis para limpeza de estofados.');
        });
    }

    // ===== Botão "WhatsApp" no rodapé =====
    const linkWhatsRodape = document.getElementById('link-whatsapp');
    if (linkWhatsRodape) {
        linkWhatsRodape.addEventListener('click', function (evento) {
            evento.preventDefault();
            abrirWhatsApp('Olá! Encontrei o WhatsApp de vocês pelo site.');
        });
    }

    // ===== Link do Instagram (rodapé) =====
    const linkInstagram = document.getElementById('link-instagram');
    if (linkInstagram) {
        linkInstagram.setAttribute('href', LINK_INSTAGRAM);
        // não precisa de preventDefault: o próprio href já leva pro perfil,
        // e o target="_blank" já abre em nova aba
    }

    // ===== Formulário "Solicitar Agendamento" -> envia direto pro WhatsApp =====
    const formAgendamento = document.querySelector('.form-agendamento');
    if (formAgendamento) {
        formAgendamento.addEventListener('submit', function (evento) {
            evento.preventDefault();

            const nome = document.getElementById('nome').value.trim();
            const servicoSelect = document.getElementById('servico');
            const servico = servicoSelect.options[servicoSelect.selectedIndex].text;
            const quantidade = document.getElementById('quantidade').value;
            const mensagem = document.getElementById('mensagem').value.trim();

            const textoWhatsApp =
                `Olá! Gostaria de agendar uma limpeza de estofado.\n\n` +
                `Nome: ${nome}\n` +
                `Tipo de estofado: ${servico}\n` +
                `Quantidade: ${quantidade}\n` +
                `Mensagem: ${mensagem}`;

            abrirWhatsApp(textoWhatsApp);
        });
    }
});