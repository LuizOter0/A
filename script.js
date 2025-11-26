console.clear();
gsap.registerPlugin(ScrollTrigger);

window.addEventListener("load", () => {
    
    // --- FUNÇÃO DE TRANSIÇÃO SURPRESA (SWIPE INTENSO) ---
    function startTransition(destino, duracaoTotal = 0.4) { 
        const overlay = document.querySelector('.transition-overlay');
        
        // 1. Prepara o overlay: inicia totalmente à esquerda, visível e esticado
        gsap.set(overlay, { 
            opacity: 1, 
            pointerEvents: 'auto',
            x: '-100%', 
            scaleY: 1.5 // Efeito de estiramento vertical (borrão de velocidade)
        });

        const tl = gsap.timeline({
            onComplete: () => {
                // 3. Após a animação de swipe terminar, muda para menu.html
                window.location.href = destino; 
            }
        });

        // 2. Animação de SWIPE RÁPIDO (Linhas Rapidez)
        // Passo 1: O overlay entra rapidamente (cobre a tela)
        tl.to(overlay, {
            duration: duracaoTotal / 2, 
            x: '0%', // Entra na tela
            ease: "power3.in"
        })
        // Passo 2: O overlay sai rapidamente (revela a nova tela)
        .to(overlay, {
            duration: duracaoTotal / 2, 
            x: '100%', // Sai da tela pela direita
            ease: "power3.out"
        });
    }
    // --- FIM DA FUNÇÃO DE TRANSIÇÃO ---


    const tl = gsap
        .timeline({
            scrollTrigger: {
                trigger: ".wrapper",
                start: "top top",
                // MUDANÇA PRINCIPAL: Reduz a distância de rolagem para o zoom terminar mais rápido
                end: "+=50%", 
                
                pin: true, // Garante que a tela fique fixa enquanto o zoom acontece
                scrub: true,
                
                onLeave: () => {
                    // Animação de Queda da Imagem (Rápida e intensa)
                    gsap.to(".image-container img", {
                        duration: 0.3, 
                        y: 800,        
                        rotation: 45,  
                        opacity: 0,    
                        scale: 0.2,    
                        ease: "power3.in" 
                    });
                    
                    // Inicia a transição de SWIPE RÁPIDO para "menu.html"
                    startTransition("menu.html");
                },
                once: true 
            }
        })
        // ... (Animações de Scroll do GSAP)
        .to(".image-container img", {
            scale: 2,
            z: 350,
            transformOrigin: "center center",
            ease: "power1.inOut"
        })
        .to(
            ".section.hero",
            {
                scale: 1.1,
                transformOrigin: "center center",
                ease: "power1.inOut"
            },
            "<"
        );
});