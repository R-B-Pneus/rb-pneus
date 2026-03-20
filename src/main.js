import './style.css'
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// 1. Revelações Técnicas
const initReveals = () => {
    gsap.utils.toArray('.reveal-up').forEach((el) => {
        gsap.to(el, {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
                trigger: el,
                start: "top 90%",
                toggleActions: "play none none none"
            }
        });
    });
};

// 2. Motor de Scrub de Vídeo (Nativo)
const initManualVideoScrub = () => {
    const video = document.getElementById('heroVideo');
    const section = document.querySelector('.hero');
    const content = document.querySelector('.hero-content-layer');
    
    if (!video || !section) return;

    function clamp(v, min, max) {
        return Math.min(Math.max(v, min), max);
    }

    function updateVideo() {
        const rect = section.getBoundingClientRect();
        const scrollable = section.offsetHeight - window.innerHeight;
        const scrolled = clamp(-rect.top, 0, scrollable);
        const progress = scrolled / scrollable;

        if (!isNaN(video.duration)) {
            video.currentTime = progress * video.duration;
        }

        if (content) {
            const opacity = clamp(1 - (progress / 0.7), 0, 1);
            const translateY = progress * -500;
            content.style.opacity = opacity;
            content.style.transform = `translateY(${translateY}px)`;
            content.style.visibility = opacity <= 0 ? 'hidden' : 'visible';
        }
    }

    const initScrubLogic = () => {
        window.addEventListener('scroll', () => {
            requestAnimationFrame(updateVideo);
        });
        updateVideo();
    };

    if (video.readyState >= 1) {
        initScrubLogic();
    } else {
        video.addEventListener('loadedmetadata', initScrubLogic);
    }
};

// 3. Estrutura da Página
document.addEventListener('DOMContentLoaded', () => {
    const app = document.querySelector('#app');
    
    app.innerHTML = `
        <div class="noise-overlay"></div>
        <div class="fixed-reference-grid" style="position: fixed; inset: 0; pointer-events: none; z-index: 50; background-image: radial-gradient(white 0.5px, transparent 0.5px); background-size: 80px 80px; opacity: 0.05;"></div>
        
        <header id="navbar" style="background: rgba(0,0,0,0.8); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); border-bottom: 1px solid rgba(255,255,255,0.08); position: fixed; width: 100%; top: 0; z-index: 100;">
            <div class="container" style="display: flex; justify-content: space-between; align-items: center; padding: 0.8rem 0;">
                <div style="display: flex; align-items: center; gap: 1.2rem;">
                    <a href="#" style="text-decoration: none; display: flex; align-items: center; gap: 1rem;">
                        <img src="/logo-rb.svg" style="height: 38px; width: auto; display: block;">
                    </a>
                    <div style="display: flex; align-items: center; gap: 0.4rem;">
                        <span class="font-mono" style="font-size: 7px; color: white; opacity: 0.2; letter-spacing: 0.1em; transform: translateY(1px);">DISTRIBUIDOR OFICIAL</span>
                    </div>
                </div>
                
                <nav class="nav-links" style="gap: 2.5rem;">
                    <a href="#sobre" class="nav-link" style="font-size: 0.65rem; color: white; opacity: 0.6; text-decoration: none; font-family: 'JetBrains Mono';">SOBRE</a>
                    <a href="#catalogo" class="nav-link" style="font-size: 0.65rem; color: white; opacity: 0.6; text-decoration: none; font-family: 'JetBrains Mono';">CATÁLOGO</a>
                    <a href="#contato" class="nav-link" style="font-size: 0.65rem; color: white; opacity: 0.6; text-decoration: none; font-family: 'JetBrains Mono';">CONTATO</a>
                </nav>

                <a href="#contato" class="btn-pill primary" style="padding: 0.6rem 1.8rem; font-size: 0.65rem; text-decoration: none;">SOLICITAR ORÇAMENTO</a>
            </div>
        </header>

        <main>
            <!-- SEÇÃO 1: HERO -->
            <section class="hero" style="position: relative; height: 800vh; background: #000;">
                <div class="hero-sticky-stage" style="position: sticky; top: 0; width: 100%; height: 100vh; overflow: hidden;">
                    <video id="heroVideo" preload="auto" muted playsinline style="width: 100%; height: 100%; object-fit: cover; z-index: 1;">
                        <source src="/hero-video.mp4" type="video/mp4" />
                    </video>
                    <div class="hero-vignette" style="position: absolute; inset: 0; z-index: 3; pointer-events: none; background: linear-gradient(to right, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 40%, transparent 100%);"></div>
                    
                    <div class="hero-content-layer" style="position: absolute; inset: 0; z-index: 4; display: flex; flex-direction: column; justify-content: center; pointer-events: none;">
                        <div class="container" style="width: 100%;">
                            <div style="max-width: 48rem; pointer-events: all;" class="legibility-shadow">
                                <div class="reveal-up" style="display: flex; align-items: center; gap: 1.5rem; margin-bottom: 3rem;">
                                    <span class="font-mono" style="font-size: 9px; color: rgba(255,255,255,0.4); letter-spacing: 0.3em;">SISTEMA // DISTRIBUIDOR_BOTO_BRASIL</span>
                                    <div style="width: 40px; height: 1px; background: rgba(255,255,255,0.2);"></div>
                                    <span class="font-mono" style="font-size: 9px; color: white; letter-spacing: 0.1em; text-transform: uppercase;">Alta Performance Industrial</span>
                                </div>
                                
                                <h1 class="reveal-up legibility-shadow" style="font-size: clamp(2.5rem, 6.5vw, 6.5rem); color: white; margin-bottom: 2.5rem; line-height: 0.9; font-weight: 800; text-transform: uppercase; letter-spacing: -0.04em;">
                                    Pneus e Rodas para <br> 
                                    <span style="color: transparent; -webkit-text-stroke: 1.5px rgba(255,255,255,1);">Caminhões e Ônibus.</span>
                                </h1>
                                
                                <p class="reveal-up" style="font-size: 1.1rem; color: rgba(255,255,255,0.7); max-width: 35rem; margin-bottom: 4.5rem; font-weight: 300; line-height: 1.6; letter-spacing: 0.02em;">
                                    Durabilidade, força e segurança para quem roda pesado. Atendimento nacional 24h para frotas e autônomos.
                                </p>
                            
                            <div class="reveal-up hero-btn-group" style="display: flex; gap: 1.5rem;">
                                <button class="btn-pill primary" style="padding: 1.5rem 3.5rem;">FAZER ORÇAMENTO (WHATSAPP)</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- SEÇÃO 2: QUEM SOMOS (WHITE THEME) -->
            <section id="sobre" style="padding: 180px 0; background: #FFFFFF; color: #000; border-top: 1px solid rgba(0,0,0,0.05);">
                <div class="container">
                    <div class="grid" style="grid-template-columns: repeat(2, 1fr); gap: 10rem;">
                        <div class="reveal-up">
                            <span class="font-mono" style="color: rgba(0,0,0,0.4); margin-bottom: 2rem; display: block;">R&B_PNEUS // UNIDADE_OFICIAL</span>
                            <h2 style="font-size: 4.5rem; color: #000; margin-bottom: 2.5rem;">Especialistas em <br><span style="opacity: 0.4;">Carga Pesada.</span></h2>
                            <p style="font-size: 1.25rem; color: rgba(0,0,0,0.6); line-height: 1.8; font-weight: 300; margin-bottom: 4rem;">
                                Entregamos durabilidade e desempenho para quem não pode parar. Soluções completas para veículos comerciais com suporte técnico especializado.
                            </p>
                        </div>
                        <div class="reveal-up">
                            <div style="position: relative; border: 1px solid rgba(0,0,0,0.08); background: #F9F9F9; margin-bottom: 2.5rem; overflow: hidden; width: 100%; aspect-ratio: 16/10; display: flex; align-items: center; justify-content: center;">
                                <img src="/quem_somos_tire.jpg" style="width: 100%; height: 100%; object-fit: cover; display: block; filter: contrast(1.02) brightness(1.02);">
                                <div style="position: absolute; bottom: 1.5rem; right: 1.5rem; text-align: right; opacity: 0.3; z-index: 5;">
                                    <div class="font-mono" style="font-size: 8px; color: #000; font-weight: 800;">REF_UNIT_048</div>
                                    <div class="font-mono" style="font-size: 8px; color: #000; font-weight: 800;">HYBRID_CORE_TECH</div>
                                </div>
                            </div>
                            <div class="grid" style="grid-template-columns: 1fr 1fr; gap: 3rem; border-top: 1px solid rgba(0,0,0,0.1); padding-top: 2.5rem;">
                                <div><span style="display: block; font-size: 2.5rem; font-weight: 800; color: #000;">24H</span><span class="font-mono" style="font-size: 9px; opacity: 0.4;">SUPORTE_AGIL</span></div>
                                <div>
                                    <span class="font-mono" style="font-size: 9px; opacity: 0.4;">DISTRIBUIDOR OFICIAL</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- SEÇÃO 3: CATÁLOGO (BLACK THEME) -->
            <section id="catalogo" style="padding: 150px 0; background: #050505;">
                <div class="container">
                    <div class="reveal-up mobile-mb-2" style="margin-bottom: 100px; text-align: center;">
                        <h2 style="font-size: 4rem; color: white; margin-bottom: 1.5rem;">Nosso Catálogo <span style="color: transparent; -webkit-text-stroke: 1px white;">Pro.</span></h2>
                    </div>

                    <div class="grid mobile-carousel" style="grid-template-columns: repeat(2, 1fr); gap: 3rem;">
                        <div class="flashlight-card reveal-up" style="background: #0A0A0A; border: 1px solid rgba(255,255,255,0.05); display: flex; flex-direction: column;">
                            <img src="/IMG_0876.png" style="width: 100%; height: 350px; object-fit: contain; margin-bottom: 2rem; filter: saturate(0) contrast(1.1);">
                            <div class="font-mono" style="margin-bottom: 1.5rem; opacity: 0.3; font-size: 0.7rem; letter-spacing: 0.1em;">275/80 R22.5 // RADIAL LISO 16_LONAS</div>
                            <h3 style="font-size: 2.2rem; color: white; margin-bottom: 1.5rem; font-weight: 800;">ÔNIBUS / URBANO</h3>
                            <p style="font-size: 0.85rem; color: rgba(255,255,255,0.5); line-height: 1.6; margin-bottom: 3rem; font-weight: 300;">
                                Estabilidade e segurança otimizadas para o transporte de passageiros. Inclui conjunto de rodas 22mm de aço inoxidável e bicos profissionais montados.
                            </p>
                            <a href="#contato" class="btn-pill primary" style="width: 100%; margin-top: auto; text-decoration: none; text-align: center; display: block;">SOLICITAR ORÇAMENTO</a>
                        </div>
                        <div class="flashlight-card reveal-up" style="background: #0A0A0A; border: 1px solid rgba(255,255,255,0.05); display: flex; flex-direction: column;">
                            <img src="/IMG_0876.png" style="width: 100%; height: 350px; object-fit: contain; margin-bottom: 2rem; filter: saturate(0) contrast(1.1);">
                            <div class="font-mono" style="margin-bottom: 1.5rem; opacity: 0.3; font-size: 0.7rem; letter-spacing: 0.1em;">295/80 R22.5 // RADIAL LISO 18_LONAS</div>
                            <h3 style="font-size: 2.2rem; color: white; margin-bottom: 1.5rem; font-weight: 800;">CARRETA / CARGA</h3>
                            <p style="font-size: 0.85rem; color: rgba(255,255,255,0.5); line-height: 1.6; margin-bottom: 3rem; font-weight: 300;">
                                Carcaça industrial de máxima resistência com 18 lonas para transporte pesado de longa distância. Kit completo com rodas de aço inox 22mm de alta durabilidade.
                            </p>
                            <a href="#contato" class="btn-pill primary" style="width: 100%; margin-top: auto; text-decoration: none; text-align: center; display: block;">SOLICITAR ORÇAMENTO</a>
                        </div>
                    </div>
                    <div class="carousel-dots">
                        <div class="dot active"></div>
                        <div class="dot"></div>
                    </div>
                </div>
            </section>

            <!-- SEÇÃO 6: VANTAGEM OPERACIONAL (WHITE THEME) -->
            <section style="background: #FFFFFF; color: #000;">
                <div class="container">
                    <div class="grid mobile-gap-1" style="grid-template-columns: repeat(2, 1fr); gap: 8rem; align-items: center;">
                        <div class="reveal-up">
                            <h2 style="font-size: 4rem; color: #000; margin-bottom: 5rem; font-weight: 800;">Vantagem <br><span style="color: transparent; -webkit-text-stroke: 1px #000;">Operacional BT219.</span></h2>
                            <div class="grid mobile-gap-1" style="grid-template-columns: 1fr 1fr; gap: 2rem;">
                                <div class="mobile-p-1-5" style="padding: 2.5rem; border: 1px solid rgba(0,0,0,0.05); background: #F9F9F9;">
                                    <h4 style="font-size: 0.8rem; color: #000; margin-bottom: 1rem; letter-spacing: 0.1em; font-weight: 800;">STONE EJECTORS</h4>
                                    <p style="font-size: 0.8rem; opacity: 0.5; line-height: 1.6;">Geometria patenteada para expulsão de pedras, protegendo a carcaça contra perfurações.</p>
                                </div>
                                <div class="mobile-p-1-5" style="padding: 2.5rem; border: 1px solid rgba(0,0,0,0.05); background: #F9F9F9;">
                                    <h4 style="font-size: 0.8rem; color: #000; margin-bottom: 1rem; letter-spacing: 0.1em; font-weight: 800;">REINFORCED SHOULDER</h4>
                                    <p style="font-size: 0.8rem; opacity: 0.5; line-height: 1.6;">Ombros de largura dupla para suportar o arraste lateral e garantir precisão na direção.</p>
                                </div>
                                <div class="mobile-p-1-5" style="padding: 2.5rem; border: 1px solid rgba(0,0,0,0.05); background: #F9F9F9;">
                                    <h4 style="font-size: 0.8rem; color: #000; margin-bottom: 1rem; letter-spacing: 0.1em; font-weight: 800;">OPTIMIZED CROWN</h4>
                                    <p style="font-size: 0.8rem; opacity: 0.5; line-height: 1.6;">Curva da coroa otimizada que reduz a deformação estrutural sob carga pesada.</p>
                                </div>
                                <div class="mobile-p-1-5" style="padding: 2.5rem; border: 1px solid rgba(0,0,0,0.05); background: #F9F9F9;">
                                    <h4 style="font-size: 0.8rem; color: #000; margin-bottom: 1rem; letter-spacing: 0.1em; font-weight: 800;">COMPOSTO CPK</h4>
                                    <p style="font-size: 0.8rem; opacity: 0.5; line-height: 1.6;">Focado em dissipação de calor e alta durabilidade em trajetos de severidade média/alta.</p>
                                </div>
                            </div>
                        </div>
                        <div class="reveal-up mobile-p-1-5" style="border: 1px solid rgba(0,0,0,0.08); padding: 5rem; background: #F9F9F9;">
                            <span class="font-mono" style="opacity: 0.4; display: block; margin-bottom: 3rem; color: #000; font-size: 0.7rem; letter-spacing: 0.2em;">REFERÊNCIA_TÉCNICA_BT219</span>
                            <ul style="list-style: none; display: flex; flex-direction: column; gap: 1.8rem;">
                                <li style="display: flex; justify-content: space-between; border-bottom: 1px solid rgba(0,0,0,0.05); padding-bottom: 1.2rem;">
                                    <span style="opacity: 0.4; font-size: 0.85rem;">Fabricante</span><span style="font-weight: 700; font-size: 0.85rem;">Shandong Wanda Boto</span>
                                </li>
                                <li style="display: flex; justify-content: space-between; border-bottom: 1px solid rgba(0,0,0,0.05); padding-bottom: 1.2rem;">
                                    <span style="opacity: 0.4; font-size: 0.85rem;">Estrutura</span><span style="font-weight: 700; font-size: 0.85rem;">4 Camadas de Cintas de Aço</span>
                                </li>
                                <li style="display: flex; justify-content: space-between; border-bottom: 1px solid rgba(0,0,0,0.05); padding-bottom: 1.2rem;">
                                    <span style="opacity: 0.4; font-size: 0.85rem;">Índice de Carga</span><span style="font-weight: 700; font-size: 0.85rem;">152/149 (Até 3.550kg)</span>
                                </li>
                                <li style="display: flex; justify-content: space-between; border-bottom: 1px solid rgba(0,0,0,0.05); padding-bottom: 1.2rem;">
                                    <span style="opacity: 0.4; font-size: 0.85rem;">Velocidade Máx.</span><span style="font-weight: 700; font-size: 0.85rem;">130 km/h (Símbolo M)</span>
                                </li>
                                <li style="display: flex; justify-content: space-between; border-bottom: 1px solid rgba(0,0,0,0.05); padding-bottom: 1.2rem;">
                                    <span style="opacity: 0.4; font-size: 0.85rem;">Ruído Externo</span><span style="font-weight: 700; font-size: 0.85rem;">73 dB (Médio/Baixo)</span>
                                </li>
                                <li style="display: flex; justify-content: space-between; border-bottom: 1px solid rgba(0,0,0,0.05); padding-bottom: 1.2rem;">
                                    <span style="opacity: 0.4; font-size: 0.85rem;">Certificações</span><span style="font-weight: 700; font-size: 0.85rem;">INMETRO / DOT / ECE</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            <!-- SEÇÃO 8: PÚBLICO ATENDIDO (BLACK THEME) -->
            <section style="padding: 12rem 0; background: #050505; text-align: center;">
                <div class="container" style="max-width: 900px;">
                    <span class="font-mono" style="opacity: 0.3; display: block; margin-bottom: 2rem;">SETOR // PÚBLICO_ATENDIDO</span>
                    <h2 style="font-size: 4rem; color: white; margin-bottom: 6rem;">Nossas Soluções <br> <span style="color: transparent; -webkit-text-stroke: 1px white;">Atendem:</span></h2>
                    <div class="grid" style="grid-template-columns: repeat(2, 1fr); gap: 1.5rem; text-align: left;">
                        ${['Frotas Empresariais', 'Transportadoras', 'Motoristas Autônomos', 'Logística', 'Operações Agrícolas', 'Mineração'].map(item => `
                            <div class="reveal-up" style="padding: 2.2rem; border: 1px solid rgba(255,255,255,0.05); background: #0a0a0a; display: flex; justify-content: space-between; align-items: center;">
                                <span style="font-weight: 800; font-family: var(--font-mono); letter-spacing: 0.1em; font-size: 0.9rem;">${item}</span>
                                <div style="width: 8px; height: 8px; border-radius: 50%; border: 1px solid #fff;"></div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </section>

            <!-- SEÇÃO 10: CTA FINAL (BLACK THEME) -->
            <section id="contato" style="background: #000; color: #fff; text-align: center;">
                <div class="container">
                    <div class="reveal-up mobile-mb-2" style="margin-bottom: 8rem;">
                        <h2 class="mobile-mb-2" style="font-size: 5.5rem; line-height: 0.9; margin-bottom: 5rem; font-weight: 900;">Faça seu orçamento <br>agora.</h2>
                        <div class="grid" style="grid-template-columns: repeat(2, 1fr); gap: 2rem; max-width: 50rem; margin: 0 auto;">
                            <a href="https://wa.me/5519984061207" target="_blank" class="btn-pill primary cta-button-card" style="text-decoration: none; border-radius: 4px; padding: 2.5rem; display: flex; flex-direction: column; align-items: center; gap: 1rem;">
                                <div style="opacity: 0.4; font-size: 9px;">COMERCIAL_01</div>
                                <div style="display: flex; align-items: center; gap: 0.75rem;">
                                    <span style="font-size: 1.3rem; font-weight: 800;">RICHARD NOGUEIRA</span>
                                    <img src="/WhatsApp.svg" style="width: 24px; height: 24px; filter: invert(0);">
                                </div>
                            </a>
                            <a href="https://wa.me/5588997283150" target="_blank" class="btn-pill primary cta-button-card" style="text-decoration: none; border-radius: 4px; padding: 2.5rem; display: flex; flex-direction: column; align-items: center; gap: 1rem;">
                                <div style="opacity: 0.4; font-size: 9px;">COMERCIAL_02</div>
                                <div style="display: flex; align-items: center; gap: 0.75rem;">
                                    <span style="font-size: 1.3rem; font-weight: 800;">RICARDO DIAS</span>
                                    <img src="/WhatsApp.svg" style="width: 24px; height: 24px; filter: invert(0);">
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            <!-- SEÇÃO 12: FAQ (WHITE THEME) -->
            <section id="faq" class="faq-section" style="background: #FFFFFF; color: #000; display: flex; flex-direction: column; align-items: center;">
                <div class="container" style="display: flex; flex-direction: column; align-items: center; width: 100%;">
                    <div class="reveal-up mobile-mb-2" style="margin-bottom: 80px; text-align: center;">
                        <span class="font-mono" style="opacity: 0.3; display: block; margin-bottom: 2rem; color: #000;">SISTEMA // DÚVIDAS_FREQUENTES</span>
                        <h2 style="font-size: 4rem; color: #000;">FAQ.</h2>
                    </div>

                    <div class="accordion-container reveal-up" style="max-width: 1000px; width: 100%;">
                        ${[
                            {q: 'ONDE SÃO FABRICADOS OS PNEUS BOTO?', a: 'Os pneus Boto são fabricados na China, onde estão localizadas a sede e as unidades de produção da marca.'},
                            {q: 'OS PNEUS BOTO SÃO CONFIÁVEIS?', a: 'Sim. Os pneus Boto são reconhecidos pela durabilidade e desempenho, produzidos com tecnologia avançada e materiais de alta qualidade.'},
                            {q: 'A BOTO POSSUI PNEUS PARA NEVE?', a: 'Sim. A marca oferece modelos específicos para inverno, desenvolvidos para garantir aderência e segurança em condições de neve e gelo.'},
                            {q: 'BORRACHA INDUSTRIAL É RESISTENTE?', a: 'Sim. As folhas de borracha industrial Boto são projetadas para suportar exposição a diversos produtos químicos, mantendo integridade em aplicações industriais.'},
                            {q: 'CORREIAS TRANSPORTADORAS BOTO PRECISAM DE MANUTENÇÃO?', a: 'Sim. Recomenda-se manutenção periódica (limpeza, ajuste de tensão) para garantir o máximo desempenho e vida útil.'},
                            {q: 'ESSE PNEU SUPORTA RECAPAGEM?', a: 'Sim. Os pneus Boto são projetados com carcaça reforçada de alta resistência, permitindo até três processos de recapagem. A estrutura do pneu mantém a integridade da carcaça após o uso prolongado, garantindo aderência, estabilidade e segurança. Essa característica faz dos pneus Boto uma opção econômica e sustentável, prolongando sua vida útil e reduzindo o custo por quilômetro.'}
                        ].map((item, index) => `
                            <div class="accordion-item" style="border-bottom-color: rgba(0,0,0,0.1);">
                                <button class="accordion-header" id="faq-header-${index}" style="color: #000;">
                                    <h4>${item.q}</h4>
                                    <div class="accordion-icon"><style>.accordion-icon::before,.accordion-icon::after{background:#000!important;}</style></div>
                                </button>
                                <div class="accordion-content">
                                    <div class="accordion-content-inner" style="color: rgba(0,0,0,0.6);">
                                        ${item.a}
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </section>

            <footer class="mobile-mt-2" style="margin-top: 15rem; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 5rem; text-align: left;">
                <div class="container">
                    <div class="grid" style="grid-template-columns: repeat(3, 1fr); gap: 8rem;">
                        <div style="grid-column: span 1;">
                            <div style="display: flex; flex-direction: column; gap: 2rem; margin-bottom: 2.5rem;">
                                <img src="/logo-rb.svg" style="height: 52px; width: auto; display: block; align-self: flex-start;">
                                <div style="display: flex; align-items: center; gap: 0.75rem; opacity: 0.4;">
                                    <span class="font-mono" style="font-size: 8px; color: white; letter-spacing: 0.1em;">DISTRIBUIDOR OFICIAL_BOTO</span>
                                </div>
                            </div>
                            <p style="font-size: 0.8rem; opacity: 0.5; color: white;">Alta performance e segurança para frotas industriais e transporte pesado.</p>
                            <p style="font-size: 0.7rem; opacity: 0.35; margin-top: 1rem; color: white;">CNPJ: 62.270.497/0001-15</p>
                        </div>
                        <div>
                            <span class="font-mono" style="opacity: 0.2; font-size: 9px; display: block; margin-bottom: 1.5rem; color: white;">NAVEGAÇÃO</span>
                            <div style="display: flex; flex-direction: column; gap: 1rem; font-size: 0.8rem; font-weight: 800;">
                                <a href="#sobre" style="text-decoration: none; color: white;">SOBRE</a>
                                <a href="#catalogo" style="text-decoration: none; color: white;">CATÁLOGO</a>
                                <a href="#contato" style="text-decoration: none; color: white;">CONTATO</a>
                            </div>
                        </div>
                        <div>
                            <span class="font-mono" style="opacity: 0.2; font-size: 9px; display: block; margin-bottom: 1.5rem; color: white;">SUPORTE_24H</span>
                            <div style="font-size: 0.8rem; opacity: 0.5; line-height: 2; color: white;">São Paulo, Brasil</div>
                        </div>
                    </div>
                </div>
            </footer>
        </main>

        <a href="https://wa.me/5519984061207" class="whatsapp-float" target="_blank">
            <img src="/WhatsApp.svg" alt="WhatsApp">
        </a>
    `;

    // 4. Lógica de Acordeão
    const initAccordion = () => {
        const headers = document.querySelectorAll('.accordion-header');
        headers.forEach(header => {
            header.addEventListener('click', () => {
                const item = header.parentElement;
                const isActive = item.classList.contains('active');
                
                // Fecha outros
                document.querySelectorAll('.accordion-item').forEach(el => el.classList.remove('active'));
                
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        });
    };

    initReveals();
    initManualVideoScrub();
    initAccordion();

    // Lógica de Dots do Carrossel Mobile
    const carouselArr = document.querySelector('.mobile-carousel');
    const dotsArr = document.querySelectorAll('.dot');
    if (carouselArr && dotsArr.length > 0) {
        carouselArr.addEventListener('scroll', () => {
            const index = Math.round(carouselArr.scrollLeft / carouselArr.offsetWidth);
            dotsArr.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
        });
    }
    
    // Efeito Flashlight Mouse
    document.addEventListener('mousemove', e => {
        document.querySelectorAll('.flashlight-card').forEach(card => {
            const rect = card.getBoundingClientRect();
            card.style.setProperty('--x', `${e.clientX - rect.left}px`);
            card.style.setProperty('--y', `${e.clientY - rect.top}px`);
        });
    });
});
