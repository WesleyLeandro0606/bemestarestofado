// ===== Mini carrossel Antes/Depois (cards de Nossos Serviços) =====
document.addEventListener('DOMContentLoaded', function () {
    const carrosseis = document.querySelectorAll('.mini-carrossel');

    carrosseis.forEach((carrossel) => {
        const trilho = carrossel.querySelector('.mini-trilho');
        const btnAnterior = carrossel.querySelector('.mini-seta-anterior');
        const btnProxima = carrossel.querySelector('.mini-seta-proxima');
        const containerPontos = carrossel.querySelector('.mini-pontos');
        const slides = trilho.querySelectorAll('.mini-slide');
        const totalSlides = slides.length;

        let indiceAtual = 0;
        let autoplayInterval;

        // Cria as bolinhas indicadoras
        slides.forEach((_, indice) => {
            const ponto = document.createElement('button');
            ponto.classList.add('mini-ponto');
            ponto.setAttribute('aria-label', `Ver foto ${indice + 1}`);
            if (indice === 0) ponto.classList.add('ativo');
            ponto.addEventListener('click', () => {
                indiceAtual = indice;
                atualizar();
                reiniciarAutoplay();
            });
            containerPontos.appendChild(ponto);
        });

        const pontos = containerPontos.querySelectorAll('.mini-ponto');

        function atualizar() {
            trilho.style.transform = `translateX(-${indiceAtual * 100}%)`;
            pontos.forEach((ponto, indice) => {
                ponto.classList.toggle('ativo', indice === indiceAtual);
            });
        }

        function proximoSlide() {
            indiceAtual = (indiceAtual + 1) % totalSlides;
            atualizar();
        }

        function slideAnterior() {
            indiceAtual = (indiceAtual - 1 + totalSlides) % totalSlides;
            atualizar();
        }

        function iniciarAutoplay() {
            autoplayInterval = setInterval(proximoSlide, 2800);
        }

        function reiniciarAutoplay() {
            clearInterval(autoplayInterval);
            iniciarAutoplay();
        }

        btnProxima.addEventListener('click', () => {
            proximoSlide();
            reiniciarAutoplay();
        });

        btnAnterior.addEventListener('click', () => {
            slideAnterior();
            reiniciarAutoplay();
        });

        iniciarAutoplay();
    });
});