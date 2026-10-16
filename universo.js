/**
 * MIDNIGHT CITY — UNIVERSO & SEASON 1 (MÓDULO DE LUXO JS)
 * Padrão Awwwards / Refero / Honkai: Star Rail
 * Canvas Procedurais, Transições Físicas, Dossiês Expandidos e Cinema Scrollytelling
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // ── Registrar GSAP ScrollTrigger se disponível ──
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
  }

  /* ==========================================================================
     1. NAVEGAÇÃO, CABEÇALHO & PROGRESSO
     ========================================================================== */
  const header = document.querySelector('.santioni-header');
  const mobileProgress = document.getElementById('uni-mobile-progress');
  const trackerItems = document.querySelectorAll('.uni-tracker-item');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;

    if (mobileProgress) {
      mobileProgress.style.width = `${scrollPercent}%`;
    }

    if (header) {
      if (scrollY > 120) {
        header.classList.add('uni-header-scrolled');
      } else {
        header.classList.remove('uni-header-scrolled');
      }
    }
  }, { passive: true });

  // Sincronizar Lateral Tracker com as 4 Seções Principais
  const trackSections = [
    { id: 'londres', target: document.getElementById('londres') },
    { id: 'egide', target: document.getElementById('egide') },
    { id: 'cosmologia', target: document.getElementById('cosmologia') },
    { id: 'season1', target: document.getElementById('season1') }
  ];

  if ('IntersectionObserver' in window) {
    const trackerObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          trackerItems.forEach(item => {
            if (item.getAttribute('href') === `#${id}`) {
              item.classList.add('active');
            } else {
              item.classList.remove('active');
            }
          });

          // Diminuir presença do header em Cosmologia e Season 1
          if (header) {
            if (id === 'cosmologia' || id === 'season1') {
              header.classList.add('uni-header-dimmed');
            } else {
              header.classList.remove('uni-header-dimmed');
            }
          }
        }
      });
    }, { threshold: 0.22 });

    trackSections.forEach(sec => {
      if (sec.target) trackerObserver.observe(sec.target);
    });
  }

  trackerItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = item.getAttribute('href');
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  /* ==========================================================================
     2. ATO I — HERO COM CANVAS PROCEDURAL ("LONDRES SOB A TEMPESTADE ARCANA")
     ========================================================================== */
  const heroCanvas = document.getElementById('uni-hero-canvas');
  let heroCtx = null;
  let heroAnimId = null;
  let heroActive = true;
  let heroMouse = { x: window.innerWidth * 0.5, y: window.innerHeight * 0.4, targetX: window.innerWidth * 0.5, targetY: window.innerHeight * 0.4 };
  let mistParticles = [];
  let rainDrops = [];
  let emberParticles = [];
  let lightningFlash = 0;
  let nextLightning = Date.now() + 4000;

  if (heroCanvas) {
    heroCtx = heroCanvas.getContext('2d');

    function resizeHeroCanvas() {
      if (!heroCanvas) return;
      heroCanvas.width = heroCanvas.parentElement.clientWidth || window.innerWidth;
      heroCanvas.height = heroCanvas.parentElement.clientHeight || window.innerHeight;
      initHeroElements();
    }

    function initHeroElements() {
      const w = heroCanvas.width;
      const h = heroCanvas.height;

      // Camadas de névoa volumétrica
      mistParticles = [];
      const numMist = Math.floor(w / 45);
      for (let i = 0; i < numMist; i++) {
        mistParticles.push({
          x: Math.random() * w,
          y: Math.random() * h * 0.85 + h * 0.15,
          radius: Math.random() * 180 + 120,
          vx: Math.random() * 0.35 + 0.1,
          baseAlpha: Math.random() * 0.08 + 0.03,
          alpha: 0.05,
          scaleY: Math.random() * 0.4 + 0.3
        });
      }

      // Chuva fina em paralaxe
      rainDrops = [];
      const numRain = Math.floor(w / 18);
      for (let i = 0; i < numRain; i++) {
        rainDrops.push({
          x: Math.random() * w,
          y: Math.random() * h,
          length: Math.random() * 22 + 12,
          speed: Math.random() * 14 + 10,
          alpha: Math.random() * 0.25 + 0.1,
          layer: Math.random() > 0.6 ? 2 : 1
        });
      }

      // Brasas/poeira arcana suspensa
      emberParticles = [];
      for (let i = 0; i < 40; i++) {
        emberParticles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          radius: Math.random() * 1.8 + 0.6,
          vy: -(Math.random() * 0.4 + 0.15),
          vx: (Math.random() - 0.5) * 0.3,
          alpha: Math.random() * 0.7 + 0.2,
          color: Math.random() > 0.35 ? '#f8e48b' : '#c82924'
        });
      }
    }

    window.addEventListener('mousemove', (e) => {
      heroMouse.targetX = e.clientX;
      heroMouse.targetY = e.clientY;
    }, { passive: true });

    function renderHeroAtmosphere() {
      if (!heroCtx || !heroActive) return;
      const w = heroCanvas.width;
      const h = heroCanvas.height;

      heroMouse.x += (heroMouse.targetX - heroMouse.x) * 0.05;
      heroMouse.y += (heroMouse.targetY - heroMouse.y) * 0.05;

      // Fundo escuro com gradiente
      heroCtx.fillStyle = '#030306';
      heroCtx.fillRect(0, 0, w, h);

      // Relâmpagos e clarões celestes efêmeros
      const now = Date.now();
      if (now > nextLightning) {
        lightningFlash = Math.random() * 0.4 + 0.25;
        nextLightning = now + Math.random() * 7000 + 4000;
      }
      if (lightningFlash > 0.01) {
        heroCtx.fillStyle = `rgba(212, 175, 55, ${lightningFlash * 0.35})`;
        heroCtx.fillRect(0, 0, w, h);
        lightningFlash *= 0.88;
      }

      // Silhuetas arquitetônicas distantes de Londres no horizonte
      heroCtx.save();
      const horizonY = h * 0.78;
      heroCtx.fillStyle = '#020204';
      heroCtx.beginPath();
      heroCtx.moveTo(0, h);
      heroCtx.lineTo(0, horizonY);
      // Spire 1 (Big Ben style)
      heroCtx.lineTo(w * 0.18, horizonY);
      heroCtx.lineTo(w * 0.19, horizonY - 90);
      heroCtx.lineTo(w * 0.20, horizonY - 140);
      heroCtx.lineTo(w * 0.205, horizonY - 90);
      heroCtx.lineTo(w * 0.22, horizonY);
      // Gothic Towers & Domes
      heroCtx.lineTo(w * 0.45, horizonY);
      heroCtx.lineTo(w * 0.47, horizonY - 70);
      heroCtx.lineTo(w * 0.50, horizonY - 110);
      heroCtx.lineTo(w * 0.53, horizonY - 70);
      heroCtx.lineTo(w * 0.55, horizonY);
      // Distant Spire
      heroCtx.lineTo(w * 0.80, horizonY);
      heroCtx.lineTo(w * 0.82, horizonY - 80);
      heroCtx.lineTo(w * 0.84, horizonY);
      heroCtx.lineTo(w, horizonY + 15);
      heroCtx.lineTo(w, h);
      heroCtx.closePath();
      heroCtx.fill();
      heroCtx.restore();

      // Luz sutil que acompanha o cursor (Lanterna Arcana)
      const grad = heroCtx.createRadialGradient(heroMouse.x, heroMouse.y, 10, heroMouse.x, heroMouse.y, 420);
      grad.addColorStop(0, 'rgba(212, 175, 55, 0.12)');
      grad.addColorStop(0.5, 'rgba(200, 41, 36, 0.04)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      heroCtx.fillStyle = grad;
      heroCtx.fillRect(0, 0, w, h);

      // Renderizar névoa volumétrica
      mistParticles.forEach(p => {
        p.x += p.vx;
        if (p.x - p.radius > w) p.x = -p.radius;

        heroCtx.save();
        heroCtx.translate(p.x, p.y);
        heroCtx.scale(1, p.scaleY);
        const mistGrad = heroCtx.createRadialGradient(0, 0, 0, 0, 0, p.radius);
        mistGrad.addColorStop(0, `rgba(200, 190, 170, ${p.baseAlpha * 1.5})`);
        mistGrad.addColorStop(0.5, `rgba(180, 170, 160, ${p.baseAlpha * 0.7})`);
        mistGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        heroCtx.fillStyle = mistGrad;
        heroCtx.beginPath();
        heroCtx.arc(0, 0, p.radius, 0, Math.PI * 2);
        heroCtx.fill();
        heroCtx.restore();
      });

      // Renderizar chuva fina
      heroCtx.strokeStyle = 'rgba(200, 210, 230, 0.22)';
      heroCtx.lineWidth = 1;
      heroCtx.beginPath();
      rainDrops.forEach(r => {
        r.y += r.speed;
        r.x += 1.2;
        if (r.y > h) {
          r.y = -r.length;
          r.x = Math.random() * w;
        }
        heroCtx.moveTo(r.x, r.y);
        heroCtx.lineTo(r.x + 2, r.y + r.length);
      });
      heroCtx.stroke();

      // Renderizar brasas arcanas
      emberParticles.forEach(e => {
        e.y += e.vy;
        e.x += e.vx + Math.sin(Date.now() * 0.002 + e.x) * 0.2;
        if (e.y < 0) {
          e.y = h + 10;
          e.x = Math.random() * w;
        }
        heroCtx.beginPath();
        heroCtx.arc(e.x, e.y, e.radius, 0, Math.PI * 2);
        heroCtx.fillStyle = e.color;
        heroCtx.globalAlpha = e.alpha;
        heroCtx.shadowBlur = 8;
        heroCtx.shadowColor = e.color;
        heroCtx.fill();
        heroCtx.shadowBlur = 0;
      });
      heroCtx.globalAlpha = 1.0;

      heroAnimId = requestAnimationFrame(renderHeroAtmosphere);
    }

    window.addEventListener('resize', resizeHeroCanvas, { passive: true });
    resizeHeroCanvas();

    if ('IntersectionObserver' in window) {
      const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            heroActive = true;
            renderHeroAtmosphere();
          } else {
            heroActive = false;
            if (heroAnimId) cancelAnimationFrame(heroAnimId);
          }
        });
      }, { threshold: 0.05 });

      const heroSection = document.getElementById('hero');
      if (heroSection) heroObserver.observe(heroSection);
    }
  }

  /* ==========================================================================
     3. ATO IV — A DESCIDA PARA A ÉGIDE (PINNED SCROLL 250vh SEM DUPLICAÇÃO)
     ========================================================================== */
  const descentContainer = document.getElementById('descent-container');
  const descentStage = descentContainer ? descentContainer.querySelector('.uni-descent-stage') : null;
  const descentHall = document.getElementById('descent-hall');
  const descentDarkness = document.getElementById('descent-darkness');
  const depthVal = document.getElementById('depth-value');
  const depthLabel = document.getElementById('depth-label');
  const depthFill = document.getElementById('depth-fill');
  const depthPip = document.getElementById('depth-pip');

  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined' && descentContainer && descentStage) {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let elevatorChimePlayed = false;
    let elevatorAudioCtx = null;

    function playElevatorArrivalChime() {
      try {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (!AudioContextClass) return;
        if (!elevatorAudioCtx) {
          elevatorAudioCtx = new AudioContextClass();
        }
        if (elevatorAudioCtx.state === 'suspended') {
          elevatorAudioCtx.resume();
        }

        const now = elevatorAudioCtx.currentTime;
        
        // Tone 1: High harmonic bell chime (E5 ~ 659.25 Hz)
        const osc1 = elevatorAudioCtx.createOscillator();
        const gain1 = elevatorAudioCtx.createGain();
        osc1.type = 'sine';
        osc1.frequency.setValueAtTime(659.25, now);
        gain1.gain.setValueAtTime(0, now);
        gain1.gain.linearRampToValueAtTime(0.3, now + 0.02);
        gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.9);
        osc1.connect(gain1);
        gain1.connect(elevatorAudioCtx.destination);
        osc1.start(now);
        osc1.stop(now + 0.95);

        // Tone 2: Lower resolution bell chime (C5 ~ 523.25 Hz) after 220ms (Harmonic "Ding-Dong")
        const osc2 = elevatorAudioCtx.createOscillator();
        const gain2 = elevatorAudioCtx.createGain();
        osc2.type = 'sine';
        osc2.frequency.setValueAtTime(523.25, now + 0.22);
        gain2.gain.setValueAtTime(0, now + 0.22);
        gain2.gain.linearRampToValueAtTime(0.35, now + 0.24);
        gain2.gain.exponentialRampToValueAtTime(0.0008, now + 1.6);
        osc2.connect(gain2);
        gain2.connect(elevatorAudioCtx.destination);
        osc2.start(now + 0.22);
        osc2.stop(now + 1.65);
      } catch (err) {
        console.warn('Elevator chime audio notice:', err);
      }
    }

    if (prefersReducedMotion) {
      if (descentDarkness) descentDarkness.style.opacity = '0.2';
      if (descentHall) {
        descentHall.style.opacity = '1';
        descentHall.style.transform = 'scale(1.0)';
        descentHall.style.filter = 'brightness(0.92) contrast(1.15)';
      }
      if (depthLabel) depthLabel.textContent = 'CIDADELA DE AVALON';
      if (depthVal) depthVal.textContent = '−120 m';
      if (depthFill) depthFill.style.height = '100%';
    } else {
      const descentTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: descentContainer,
          start: 'top top',
          end: 'bottom bottom',
          pin: descentStage,
          anticipatePin: 1,
          pinSpacing: false,
          scrub: 0.5,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const p = self.progress;

            if (depthFill) depthFill.style.height = `${p * 100}%`;
            if (depthPip) depthPip.style.top = `${p * 100}%`;

            if (depthVal && depthLabel) {
              if (p < 0.20) {
                depthLabel.textContent = 'SUPERFÍCIE';
                depthVal.textContent = '0 m';
                if (p < 0.15) elevatorChimePlayed = false;
              } else if (p < 0.45) {
                depthLabel.textContent = 'CRIPTAS ROMANAS';
                depthVal.textContent = '−20 m';
              } else if (p < 0.70) {
                depthLabel.textContent = 'TÚNEIS DO TÂMISA';
                depthVal.textContent = '−46 m';
              } else if (p < 0.88) {
                depthLabel.textContent = 'ALICERCES DO VÉU';
                depthVal.textContent = '−83 m';
                elevatorChimePlayed = false; // Reset if scrolling back up
              } else {
                depthLabel.textContent = 'CIDADELA DE AVALON';
                depthVal.textContent = '−120 m';
                if (!elevatorChimePlayed) {
                  elevatorChimePlayed = true;
                  playElevatorArrivalChime();
                }
              }
            }
          }
        }
      });

      // Transição limpa: strata e escuridão dão lugar gradualmente à Cidadela de Avalon
      descentTimeline
        .to(descentDarkness, { opacity: 0.15, ease: 'none', duration: 0.5 }, 0.2)
        .to(descentHall, { opacity: 1, scale: 1.0, filter: 'brightness(0.92) contrast(1.15)', ease: 'none', duration: 0.6 }, 0.25);
    }
  }

  /* ==========================================================================
     4. GAVETA LATERAL (DRAWER) & MODAIS UNIFICADOS (COM RETRATO VERTICAL)
     ========================================================================== */
  const drawerBackdrop = document.getElementById('uni-drawer-backdrop');
  const drawer = document.getElementById('uni-drawer');
  const drawerTitle = document.getElementById('uni-drawer-title');
  const drawerCategory = document.getElementById('uni-drawer-category');
  const drawerBody = document.getElementById('uni-drawer-body');
  const drawerCloseBtn = document.getElementById('uni-drawer-close');

  const modal = document.getElementById('uni-modal');
  const modalTitle = document.getElementById('uni-modal-title');
  const modalBody = document.getElementById('uni-modal-body');
  const modalCloseBtn = document.getElementById('uni-modal-close');

  let activeTriggerElement = null;
  let removeDrawerTrap = null;
  let removeModalTrap = null;

  function trapFocusIn(container) {
    const focusable = container.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    if (!focusable.length) return () => {};
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    function onKeyDown(e) {
      if (e.key === 'Tab') {
        if (e.shiftKey && document.activeElement === first) {
          last.focus();
          e.preventDefault();
        } else if (!e.shiftKey && document.activeElement === last) {
          first.focus();
          e.preventDefault();
        }
      }
    }
    container.addEventListener('keydown', onKeyDown);
    return () => container.removeEventListener('keydown', onKeyDown);
  }

  function openDrawer(title, category, htmlContent, triggerEl) {
    if (!drawer || !drawerBackdrop) return;
    activeTriggerElement = triggerEl || document.activeElement;
    if (drawerTitle) drawerTitle.textContent = title;
    if (drawerCategory) drawerCategory.textContent = category;
    if (drawerBody) drawerBody.innerHTML = htmlContent;

    drawer.setAttribute('aria-hidden', 'false');
    drawerBackdrop.classList.add('is-open');
    drawer.classList.add('is-open');
    document.body.style.overflow = 'hidden';

    if (drawerCloseBtn) drawerCloseBtn.focus();
    if (removeDrawerTrap) removeDrawerTrap();
    removeDrawerTrap = trapFocusIn(drawer);
  }

  function closeDrawer() {
    if (!drawer || !drawerBackdrop) return;
    if (removeDrawerTrap) {
      removeDrawerTrap();
      removeDrawerTrap = null;
    }
    drawer.setAttribute('aria-hidden', 'true');
    drawer.classList.remove('is-open');
    drawerBackdrop.classList.remove('is-open');
    document.body.style.overflow = '';
    if (activeTriggerElement && typeof activeTriggerElement.focus === 'function') {
      activeTriggerElement.focus();
    }
  }

  function openModal(title, htmlContent, triggerEl) {
    if (!modal) return;
    activeTriggerElement = triggerEl || document.activeElement;
    if (modalTitle) modalTitle.textContent = title;
    if (modalBody) modalBody.innerHTML = htmlContent;

    modal.setAttribute('aria-hidden', 'false');
    modal.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    if (modalCloseBtn) modalCloseBtn.focus();
    if (removeModalTrap) removeModalTrap();
    removeModalTrap = trapFocusIn(modal);
  }

  function closeModal() {
    if (!modal) return;
    if (removeModalTrap) {
      removeModalTrap();
      removeModalTrap = null;
    }
    modal.setAttribute('aria-hidden', 'true');
    modal.classList.remove('is-open');
    document.body.style.overflow = '';
    if (activeTriggerElement && typeof activeTriggerElement.focus === 'function') {
      activeTriggerElement.focus();
    }
  }

  if (drawerCloseBtn) drawerCloseBtn.addEventListener('click', closeDrawer);
  if (drawerBackdrop) drawerBackdrop.addEventListener('click', closeDrawer);
  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeDrawer();
      closeModal();
    }
  });

  /* ==========================================================================
     5. ATO III — HOTSPOTS DA LONDRES SOB O VÉU
     ========================================================================== */
  const londonHotspots = [
    {
      id: 'crossroads',
      title: 'The Crossroads (Soho)',
      category: 'Clube Noturno Oculto & Ponto Neutro',
      desc: `
        <div class="uni-drawer-portrait-wrap">
          <img src="assets/crossroads_soho_mj.png" alt="The Crossroads Soho" class="uni-drawer-portrait-img">
          <div class="uni-drawer-portrait-overlay"></div>
        </div>
        <div class="uni-dossier-section">
          <div class="uni-dossier-section-title">✦ NATUREZA DO LOCAL</div>
          <p class="uni-dossier-text">
            Localizado sob uma discreta fachada vitoriana em Soho, o Crossroads é o santuário da boêmia sobrenatural de Londres. Governado sob a égide dos cultos dionisíacos, serve como território neutro onde semideuses, arcanos, vampiros e caçadores compartilham o mesmo balcão.
          </p>
        </div>
        <div class="uni-dossier-section border-red-500/30">
          <div class="uni-dossier-section-title text-red-300">✦ REGISTRO CLASSIFICADO DA ÉGIDE</div>
          <p class="uni-dossier-text text-sm">
            Palco oficial do Rito do Vinho de 30 de Setembro e da execução que deflagrou a Season 1. Acesso restrito a agentes credenciados durante as festividades solenes.
          </p>
        </div>
      `
    },
    {
      id: 'docks',
      title: 'Docas Abandonadas do Tâmisa',
      category: 'Fronteira Fluvial & Acesso Oculto',
      desc: `
        <div class="uni-drawer-portrait-wrap">
          <img src="assets/docas_tamisa_mj.png" alt="Docas do Tâmisa" class="uni-drawer-portrait-img">
          <div class="uni-drawer-portrait-overlay"></div>
        </div>
        <div class="uni-dossier-section">
          <div class="uni-dossier-section-title">✦ NATUREZA DO LOCAL</div>
          <p class="uni-dossier-text">
            O Tâmisa é o sangue arcaico de Londres. Nas docas desativadas do leste, sob a névoa industrial, barcaças fantasma atracam sem fazer ruído. Por galerias submersas acessam-se as rotas para o Duat e os arquivos subaquáticos da Biblioteca de Alexandria.
          </p>
        </div>
        <div class="uni-dossier-section border-cyan-500/30">
          <div class="uni-dossier-section-title text-cyan-300">✦ NÍVEL DE ALERTA DE CAMPO</div>
          <p class="uni-dossier-text text-sm">
            Risco frequente de afogamento dimensional e corrupção etérea. Patrulhas constantes da vanguarda dos Custódios e Sanctificadores.
          </p>
        </div>
      `
    },
    {
      id: 'westminster',
      title: 'Westminster & Criptopórticos',
      category: 'Poder Institucional & Alicerces Romanos',
      desc: `
        <div class="uni-drawer-portrait-wrap">
          <img src="assets/londres_panorama_mj.png" alt="Westminster e Criptas" class="uni-drawer-portrait-img">
          <div class="uni-drawer-portrait-overlay"></div>
        </div>
        <div class="uni-dossier-section">
          <div class="uni-dossier-section-title">✦ NATUREZA DO LOCAL</div>
          <p class="uni-dossier-text">
            Sob o Palácio do Parlamento e a Abadia de Westminster repousam galerias fortificadas da era imperial romana. Totalmente blindados contra radares e satélites humanos, é nestes criptopórticos que tratados de não-interferência com chefes de estado mortais são ratificados em selos de chumbo.
          </p>
        </div>
        <div class="uni-dossier-section">
          <div class="uni-dossier-section-title">✦ JURISDIÇÃO DA ORDEM</div>
          <p class="uni-dossier-text text-sm">
            Acesso estritamente restrito por decreto soberano do Conselho de Mármore.
          </p>
        </div>
      `
    },
    {
      id: 'highgate',
      title: 'Cemitério de Highgate',
      category: 'Necrópole Oculta & Ancoragem Ctônica',
      desc: `
        <div class="uni-drawer-portrait-wrap">
          <img src="assets/banner_londres_night.png" alt="Highgate Cemitério" class="uni-drawer-portrait-img">
          <div class="uni-drawer-portrait-overlay"></div>
        </div>
        <div class="uni-dossier-section">
          <div class="uni-dossier-section-title">✦ NATUREZA DO LOCAL</div>
          <p class="uni-dossier-text">
            Mausoléus tomados por raízes e sombras ancestrais. Em Highgate, a espessura do Véu é tão delgada que a fronteira com o reino dos mortos pode ser transposta por descuido. Abriga almas juramentadas e túmulos de heróis que tombaram antes da fundação de Avalon.
          </p>
        </div>
        <div class="uni-dossier-section border-purple-500/30">
          <div class="uni-dossier-section-title text-purple-300">✦ PONTO DE VIGÍLIA PERPÉTUA</div>
          <p class="uni-dossier-text text-sm">
            Ancoragem ctônica supervisionada pelos Arcanistas e Inquisidores. Qualquer distorção necrofântica desencadeia contenção imediata.
          </p>
        </div>
      `
    }
  ];

  document.querySelectorAll('.uni-hotspot').forEach(btn => {
    btn.addEventListener('click', () => {
      const spotId = btn.getAttribute('data-spot');
      const spotData = londonHotspots.find(s => s.id === spotId);
      if (spotData) {
        openDrawer(spotData.title, spotData.category, spotData.desc, btn);
      }
    });
  });

  /* ==========================================================================
     6. ATO V — OS 9 OFÍCIOS DA ÉGIDE (LORE PROFUNDA & RETRATOS VERTICAIS)
     ========================================================================== */
  const oficiosData = {
    custodio: {
      title: 'Custódios',
      category: 'Ofício Operacional • Vanguarda Militar',
      img: 'assets/custodio.png',
      doutrina: `
        A linha de frente inabalável da Égide de Avalon. Os Custódios são o braço bélico que se interpõe fisicamente entre a fragilidade do mundo mortal e a devastação de feras, titãs e entidades descontroladas. Não há hesitação em suas fileiras: onde outros buscam negociar ou compreender a anomalia, o Custódio já posicionou sua muralha e ergueu sua lâmina.
        Eles respondem diretamente às ordens executivas da Cadeira da Lança (Sr. Eric Bauman), constituindo a espinha dorsal de qualquer operação que envolva alto risco de ruptura do Véu ou derramamento de sangue místico.
      `,
      iniciacao: 'Suportar sete dias ininterruptos em câmaras gravitacionais sob pressão rúnica, seguidos pela caçada solitária a uma aberração do fosso sem auxílio de armaduras arcanas.',
      equipamento: 'Escudos de liga adamantina forjados pelos Artífices de Ébano, lanças de contenção cinemática e braçadeiras de bronze celestial gravadas com votos de sangue.',
      perfil: 'Guerreiros estoicos, veteranos marcados por cicatrizes profundas, semideuses de imensa tenacidade física e combatentes que valorizam o dever acima da própria sobrevivência.',
      preco: 'A perda gradual da sensibilidade ao medo e ao afeto; a rigidez corporal e a propensão à necrose mágica por absorção de impactos cósmicos.'
    },
    vigilante: {
      title: 'Vigilantes',
      category: 'Ofício de Inteligência • Espionagem & Infiltração',
      img: 'assets/vigilante.png',
      doutrina: `
        Olhos que tudo registram sem jamais serem notados. Os Vigilantes operam no interstício entre a alta sociedade londrina, os becos escuros e os sistemas de informação civis. Eles não entram em combate aberto a menos que sua missão de reconhecimento seja comprometida: sua maior vitória é saber exatamente onde o culto herético celebrará seu rito três semanas antes do primeiro sino tocar.
        Atuam em íntima sinergia com a Cadeira da Torre (Selene Telamon), alimentando a grande rede de vigilância panóptica da Égide com dados de interceptação mística e leitura de frequências ocultas.
      `,
      iniciacao: 'Infiltrar-se durante seis meses em uma organização sem vínculos sobrenaturais ou culto rival sem ser descoberto e desmantelar a célula sem disparar um único alarme.',
      equipamento: 'Mantos de dobra de luz e refração de sombra, lentes de contato tratadas com orvalho do Éter para enxergar através de ilusões, e adagas de silício com veneno paralisante.',
      perfil: 'Personalidades discretas, camaleônicas, capazes de transitar entre banquetes diplomáticos e esgotos fétidos sem alterar o compasso da respiração.',
      preco: 'Crise crônica de identidade; paranóia severa decorrente de anos vivendo sob múltiplas personas e a constante suspeita de estar sendo vigiado por algo ainda mais invisível.'
    },
    arcanista: {
      title: 'Arcanistas',
      category: 'Ofício Teúrgico • Alta Magia, Rituais & Oráculos',
      img: 'assets/arcanista.png',
      doutrina: `
        Mestres das geometrias sagradas e manipuladores das leis fundamentais que regem o Éter. Enquanto os mortais creem que as leis da física são imutáveis, os Arcanistas conhecem as equações que as divindades sussurraram nos alicerces do Tear da Vida. Eles estabelecem selos de proteção em bairros inteiros de Londres, dissipam fendas dimensionais e decifram línguas mortas que queimam os olhos de quem as lê sem preparo.
        Seus laboratórios subterrâneos em Avalon ressoam com cálculos astrolábicos e círculos de invocação controlada, servindo como suporte teúrgico para todas as outras divisões da Égide.
      `,
      iniciacao: 'Decifrar um quadrado mágico de 9ª ordem escrito em dialeto babilônico enquanto o candidato tem seus sentidos privados e é submetido a ilusões do próprio subconsciente.',
      equipamento: 'Báculos rúnicos com núcleos de âmbar ctônico, astrolábios de bolso em latão celestial, frascos de mercúrio vivo e cópulas de contenção para entidades gasosas.',
      perfil: 'Eruditos obcecados por detalhes, falantes de idiomas arcaicos, teurgos metódicos cuja mente opera em múltiplas dimensões simultaneamente.',
      preco: 'Degradação acelerada do sistema nervoso humano devido ao fluxo de energia divina; alucinações auditivas permanentes com os ecos da criação.'
    },
    inquisidor: {
      title: 'Inquisidores',
      category: 'Ofício Disciplinar • Julgamento & Corregedoria',
      img: 'assets/inquisidores.png',
      doutrina: `
        A mão implacável da lei interna da Égide. Os Inquisidores não caçam monstros civis: eles caçam traidores, agentes corrompidos, violadores de juramentos e aqueles que ousam romper o segredo sagrado do Véu por ganância ou ambição desmedida. Suas sentenças não admitem recurso quando ratificadas pelo Conselho de Mármore.
        Subordinados à Cadeira do Julgador (Lukas Ekantor), exercem a autoridade judicial com rigor cirúrgico, garantindo que a própria ordem que protege a humanidade não se torne o monstro que ela combate.
      `,
      iniciacao: 'Conduzir a inquirição e executar o julgamento formal de um antigo companheiro de treino condenado por quebra de juramento, sem manifestar vacilo moral.',
      equipamento: 'Balanças de latão ressonante que pesam a integridade da alma, chicotes com fios de prata estelar e tomos de penas capitais encadernados em ferro fundido.',
      perfil: 'Indivíduos de retidão inflexível, dotados de olhar cortante e discernimento psicológico cirúrgico, quase imunes à manipulação sentimental.',
      preco: 'Isolamento social absoluto dentro da própria Égide; o fardo perpétuo de ser temido e evitado pelos próprios irmãos de armas.'
    },
    mediador: {
      title: 'Mediadores',
      category: 'Ofício Diplomático • Pactos Estrangeiros & Tréguas',
      img: 'assets/mediadores.png',
      doutrina: `
        A palavra que impede que cidades inteiras sejam reduzidas a cinzas pelo capricho de um deus ofendido. Os Mediadores compreendem a etiqueta milenar que governa as cortes celestiais, as embaixadas de outros panteões e os espíritos livres das florestas antigas. Eles sabem que uma única palavra mal colocada perante um emissário divino pode equivaler a uma declaração de guerra cósmica.
        Trabalham diretamente vinculados à Cadeira do Mediador (Alexandre Magno), negociando limites de território, sacrifícios aceitáveis e tréguas solenes no limiar do apocalipse.
      `,
      iniciacao: 'Manter a calma e selar um tratado de limites com três espíritos primordiais antagônicos em um banquete onde a menor falta de respeito resulta em devoração imediata.',
      equipamento: 'Anéis de selo diplomático com brasões reconhecidos por cortes divinas, pergaminhos juramentados de quebra de hostilidade e cálices de néctar pacificatório.',
      perfil: 'Diplomatas carismáticos, negociadores com sangue-frio lendário, poliglotas de linguagens míticas e mestres da persuasão não-violenta.',
      preco: 'O desgaste moral de ter que pactuar e cumprimentar entidades hediondas em nome do bem maior, suportando o peso das concessões feitas.'
    },
    tecelao: {
      title: 'Tecelões do Véu',
      category: 'Ofício de Ocultação • Manipulação do Real',
      img: 'assets/tecelao.png',
      doutrina: `
        Os arquitetos do teatro em que a humanidade vive diariamente. Sem os Tecelões do Véu, a sociedade mortal teria entrado em colapso histérico há séculos. Eles editam filmagens de câmeras de segurança, forjam explicações científicas para tempestades anômalas, neutralizam reportagens de jornal e manipulam as memórias de civis que testemunharam o impossível.
        Trabalham sob as diretrizes da Cadeira do Véu (Hector Vermillion), operando antenas de interferência psíquica e fios de névoa que tecem o esquecimento conveniente sobre as mentes mortais.
      `,
      iniciacao: 'Reescrever completamente a memória recente de uma multidão de cinquenta testemunhas em um espaço público sem deixar traumas cerebrais ou pontas soltas na narrativa.',
      equipamento: 'Fusos de prata para tecer filamentos mnemônicos, agulhas de obsidiana para corte de lembranças e geradores de fumaça somnífera à base de flor de lótus negra.',
      perfil: 'Pensadores metódicos, oradores sutis, hipnotistas de campo e mestres da psicologia de massas que compreendem o poder avassalador da mentira necessária.',
      preco: 'Perda gradual da própria linha temporal de memórias pessoais; a incapacidade de confiar se as próprias lembranças de infância são autênticas ou implantadas.'
    },
    arquivista: {
      title: 'Arquivistas de Avalon',
      category: 'Ofício Histórico • Biblioteca de Alexandria',
      img: 'assets/arquivistas.png',
      doutrina: `
        Os guardiões da memória do mundo nas profundezas das águas do Tâmisa. A Biblioteca de Alexandria não pereceu em cinzas na antiguidade: seu coração místico foi resgatado e selado sob o leito do rio de Londres. Os Arquivistas catalogam genealogias divinas, nomes verdadeiros de demônios, mapas astrais de eras anteriores e rituais que foram banidos até da memória dos deuses.
        Herdeiros do ofício outrora manchado pela arrogância de Jonathan e hoje honrado pela sabedoria de Rowan Escardos, fornecem as respostas cruciais que salvam missões condenadas ao fracasso.
      `,
      iniciacao: 'Catalogar e conter um tomo senciente corrompido por miasma do Tártaro durante quarenta dias sem permitir que os sussurros do livro enlouqueçam o novato.',
      equipamento: 'Luvas de veludo com fios de platina para manipulação de pergaminhos ácidos, lupas com lentes de quartzo astral e chaves de ferro estelar que abrem cofres submersos.',
      perfil: 'Intelectuais incansáveis, polímatas silenciosos, historiadores e decifradores que encontram na poeira dos séculos a única verdade perene.',
      preco: 'Cegueira precoce por exposição à radiação de tintas encantadas; o tormento de conhecer segredos apocalípticos que não podem ser compartilhados com ninguém.'
    },
    artifice: {
      title: 'Artífices de Ébano',
      category: 'Ofício de Forja & Alquimia • Arsenais Divinos',
      img: 'assets/artifices.png',
      doutrina: `
        As mãos calejadas que transformam metal cru e essência mágica em instrumentos de glória e contenção. Em suas forjas subterrâneas que aproveitam veios de calor telúrico sob Londres, os Artífices fundem bronze celestial, aço valiriano e ligas rúnicas. Cada espada, escudo, bala de prata mística ou amuleto usado pelos agentes da Égide nasceu do suor de seus martelos.
        Eles não constroem apenas armas convencionais: desenvolvem autômatos de sentinela, reatores de contenção dimensional e próteses biomecânicas arcanas para combatentes que perderam membros em batalha.
      `,
      iniciacao: 'Forjar do metal bruto, durante um ciclo lunar contínuo, uma lâmina capaz de reter sua têmpera ao ser imersa no fogo dos deuses e no gelo de Niflheim.',
      equipamento: 'Martelos de gravidade compensada, aventais de couro de dragão imunes a calor extremo, pinças de tungstênio arcano e crisóis de cerâmica estelar.',
      perfil: 'Engenheiros visionários, artesãos obstinados, alquimistas pragmáticos que acreditam mais na solidez de uma liga metálica do que na promessa de qualquer entidade.',
      preco: 'Intoxicação crônica por vapores de metais mágicos; perda parcial da audição pelo estrondo das forjas e queima de terminações nervosas nas mãos.'
    },
    sanctificador: {
      title: 'Sanctificadores',
      category: 'Ofício Médico & Purificação • Campo & Cidadela',
      img: 'assets/sanctificadores.png',
      doutrina: `
        Os restauradores da vida quando a morte mística já reivindicou a carne. Os Sanctificadores enfrentam ferimentos que a medicina mortal sequer consegue diagnosticar: queimaduras de fogo primordial que consomem a alma, venenos de quimera que petrificam o sangue e maldições de necrose espiritual.
        Eles atuam tanto em hospitais secretos camuflados na superfície quanto na ala cirúrgica avançada de Avalon, curando veteranos mutilados e expurgando miasmas que poderiam infectar o santuário da Ordem.
      `,
      iniciacao: 'Realizar a extração cirúrgica de um parasita ctônico alojado no coração de um paciente vivo sem permitir que o miasma contamine o bloco operatório ou ceife a vida do operado.',
      equipamento: 'Bisturis de prata pura santificada em óleos solares, ataduras tecidas com fios de seda do Tear da Vida, e frascos de bálsamo de panacéia destilado em alambiques de ouro.',
      perfil: 'Médicos de compaixão inabalável aliada a frieza científica, semideuses curandeiros e teurgos que encaram a agonia da carne sem desviar o olhar.',
      preco: 'A absorção residual de dores e aflições espirituais dos pacientes tratados, resultando em insônia crônica e cicatrizes espectrais que ardem em noites sem lua.'
    }
  };

  document.querySelectorAll('.uni-oficio-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const oficioKey = btn.getAttribute('data-oficio');
      const data = oficiosData[oficioKey];
      if (data) {
        const content = `
          <div class="uni-drawer-portrait-wrap">
            <img src="${data.img}" alt="${data.title}" class="uni-drawer-portrait-img">
            <div class="uni-drawer-portrait-overlay"></div>
          </div>
          <div class="uni-dossier-section">
            <div class="uni-dossier-section-title">✦ DOUTRINA & ATUAÇÃO OPERACIONAL</div>
            <p class="uni-dossier-text">${data.doutrina.trim()}</p>
          </div>
          <div class="uni-dossier-section">
            <div class="uni-dossier-section-title">✦ RITOS DE INICIAÇÃO & PROVAÇÕES</div>
            <p class="uni-dossier-text">${data.iniciacao}</p>
          </div>
          <div class="uni-dossier-section">
            <div class="uni-dossier-section-title">✦ EQUIPAMENTO PADRÃO & MARCAS ARCANAS</div>
            <p class="uni-dossier-text">${data.equipamento}</p>
          </div>
          <div class="uni-dossier-section">
            <div class="uni-dossier-section-title">✦ PERFIL TÍPICO DOS INTEGRANTES</div>
            <p class="uni-dossier-text">${data.perfil}</p>
          </div>
        `;
        openDrawer(data.title, data.category, content, btn);
      }
    });
  });

  /* ==========================================================================
     7. ATO V.1 — O CONSELHO DE MÁRMORE (DOSSIÊS EXPANDIDOS & RETRATOS VERTICAIS)
     ========================================================================== */
  const councilInterface = document.querySelector('.uni-council-interface');
  const councilMembers = [
    {
      id: 'bauman',
      seat: 'A Lança',
      name: 'Sr. Eric Bauman',
      clans: 'Silva e Becker',
      img: 'assets/eric bauman.png',
      role: 'Força Militar & Estratégias de Guerra',
      historia: `
        Semideus de linhagem ctônica, Bauman ascendeu ao Conselho de Mármore através de sangue e lealdade implacável durante as guerras de contenção do início do século passado.
        É conhecido por não aceitar meias-medidas: onde há uma ameaça contra a estabilidade da humanidade, Bauman prega a eliminação definitiva antes que as raízes do caos se aprofundem.
        Carrega consigo a Lança das Almas, um dos artefatos mais terríveis já concebidos, capaz de aprisionar a essência imortal de qualquer ser vivo ou divino.
      `,
      civil: 'Na sociedade comum, é proprietário discreto de uma empresa de logística e escolta naval internacional com sede nas docas de Londres. É membro honorário e silencioso de um clube de tiro tradicional em Mayfair, onde ocupa a mesma mesa há trinta anos sem jamais iniciar conversa casual com nenhum associado.',
      rumores: 'Os agentes mais antigos dizem que seu ódio fanático pelos ocultistas da Rosa Negra se originou no assassinato de toda a sua família mortal há quase um século. Há boatos de que seu coração parou de bater na década de 1940 e que sua vida é sustentada exclusivamente pelas almas seladas na ponta de sua lança.',
      personalidade: 'Gélido, econômico nas palavras, com postura militar austera. Não tolera bajulações e toma decisões com a frieza de quem já viu incontáveis eras desmoronarem.',
      armamento: 'A Lança das Almas — artefato forjado nas entranhas do Tártaro, cuja lâmina não produz ferimento físico na carne, mas consome instantaneamente o cordão prateado da alma.'
    },
    {
      id: 'telamon',
      seat: 'A Torre',
      name: 'Selene Telamon',
      clans: 'Sem vassalos',
      img: 'assets/selene telamon.png',
      role: 'Vigilância Global & Alertas de Colapso',
      historia: `
        Considerada a vigia entre os vigias, Selene Telamon comanda a rede de radares sobrenaturais da Égide.
        Seus olhos foram consagrados por ritos arcaicos que lhe permitem enxergar perturbações nas correntes cósmicas antes mesmo que as divindades percebam a mudança.
        Foi a única integrante do Conselho que antecipou a fissura no tecido do submundo antes dos primeiros sinais no Tâmisa.
      `,
      civil: 'Atua como consultora sênior independente de análise geopolítica e previsão de desastres climáticos, prestando relatórios anônimos para centros de inteligência de Whitehall. Reside em um loft austero com paredes de vidro em South Bank, cercada por telas analógicas de monitoramento e telescópios astronômicos.',
      rumores: 'Dizem que Selene nunca dorme no sentido humano: sua consciência permanece conectada aos radares da Torre, e seu corpo físico repousa em estado cataléptico por apenas noventa minutos a cada aurora. Há quem afirme que ela já previu a data exata da queda de cada um dos membros do Conselho.',
      personalidade: 'Perspicaz, enigmática, com voz suave que impõe silêncio imediato em reuniões. Raramente sorri, exceto quando suas previsões mais sombrias se concretizam diante dos outros.',
      armamento: 'O Manto Panóptico de Argus e a Lente do Zênite — instrumentos arcanos que interceptam qualquer emissão de energia mágica em um raio de três mil milhas.'
    },
    {
      id: 'scardos',
      seat: 'O Arquivista',
      name: 'Rowan Escardos',
      clans: 'Sem vassalos',
      img: 'assets/rowan scardos.png',
      role: 'Guardião da Biblioteca de Alexandria',
      historia: `
        Veterano erudito cuja sabedoria atravessou gerações, Rowan foi nomeado para a Cadeira de Mármore para substituir Jonathan após a execução deste no Rito do Vinho.
        Rowan conhece cada corredor submerso da Biblioteca de Alexandria sob o Tâmisa e é o homem mais inteligente vivo entre os mortais.
        Foi ele quem liderou a força-tarefa de emergência enviada pelos deuses para investigar o massacre de civis no parque de Londres.
      `,
      civil: 'Mantém um sebo empoeirado e ateliê de restauração de encadernações raras no bairro de Bloomsbury, próximo ao Museu Britânico. Passa manhãs de domingo conversando sobre edições do século XVIII com acadêmicos incautos que não desconfiam que ele guarda segredos que derrubariam religiões inteiras.',
      rumores: 'Sussurra-se que Rowan já leu o Livro dos Mortos original e que seu relógio de bolso não mede horas, mas sim os batimentos cardíacos que lhe restam antes do colapso cósmico. Apesar de sua idade venerável, empunha magias defensivas capazes de repelir um regimento inteiro.',
      personalidade: 'Paternal, paciente, com uma perspicácia aguçada escondida sob a aparência de um velho acadêmico cansado. No entanto, quando a situação exige, sua autoridade silencia os conselheiros mais impetuosos.',
      armamento: 'Os Códices do Duat e a Pena de Toth — capazes de selar nomes verdadeiros de demônios e anular encantamentos através do registro da palavra escrita.'
    },
    {
      id: 'ekantor',
      seat: 'O Julgador',
      name: 'Lukas Ekantor',
      clans: 'Florence e Bellefleur',
      img: 'assets/lukas ekantor.png',
      role: 'Disciplina Interna & Sentenças Capitais',
      historia: `
        Semideus mestiço de Júpiter e Proserpina, Lukas sintetiza o poder das tempestades celestiais e a autoridade sobre a vida vegetal e ctônica.
        Comanda os Inquisidores com rigor científico. Foi sua pesquisa botânica de mais de cinco anos que permitiu rastrear a origem da temível Rosa Negra até os jardins do Palácio da Noite e desmantelar a estufa clandestina no pub de Londres.
      `,
      civil: 'É professor titular e pesquisador chefe no Departamento de Biologia Sistemática e Arqueobotânica da Universidade de Londres. Seus artigos sobre botânica fóssil e fisiologia vegetal são referências mundiais no meio acadêmico civil, onde é admirado pelos alunos por sua genialidade e temido por suas provas impiedosas.',
      rumores: 'Comenta-se que quando Lukas se irrita profundamente, plantas murcham num raio de duzentos metros e o ar ao seu redor cheira a ozônio de tempestade iminente. Rumores dizem que ele mantém em sua estufa privada uma muda viva de uma flor que não pertence a esta dimensão.',
      personalidade: 'Intelectual brilhante, analítico, fala com precisão cirúrgica. Combina a elegância acadêmica britânica com a fúria implacável de um semideus dos raios quando alguém trai a Égide.',
      armamento: 'A Balança de Júpiter e Centelhas de Raio Fóssil — com as quais pode desintegrar matéria física ou forçar o sistema nervoso de um interrogado a confessar toda a verdade.'
    },
    {
      id: 'vermillion',
      seat: 'O Véu',
      name: 'Hector Vermillion',
      clans: 'Sem vassalos',
      img: 'assets/hector vermillion.png',
      role: 'Ocultação do Sobrenatural & Censura Mágica',
      historia: `
        Supervisiona a grande máquina de censura e persuasão que impede que o mundo comum descubra o sobrenatural.
        Hector coordena a manipulação de agências de mídia, edição de transmissões televisivas, supressão de imagens em satélites e tecedura de névoas de esquecimento sobre multidões.
        Sem sua atuação impecável, o massacre no parque de Londres teria provocado comoção global imediata.
      `,
      civil: 'Acionista silencioso de conglomerados de comunicação e membro de diretorias de editoras históricas na Fleet Street. Frequenta a Royal Opera House e vernissages em Mayfair, sempre impecavelmente trajado em alfaiataria sob medida da Savile Row, onde passa por um aristocrata refinado e excêntrico.',
      rumores: 'Afirma-se que Hector consegue fazer qualquer ser humano esquecer o próprio nome com uma única frase sussurrada ao ouvido. Os novatos contam que suas pupilas têm o formato de engrenagens de prata quando ele utiliza seu poder máximo.',
      personalidade: 'Elegante, sutil, mestre da ironia fina e da etiqueta clássica. Prefere resolver uma crise com uma única reportagem de capa forjada do que com o disparo de cem metralhadoras arcanas.',
      armamento: 'O Fuso de Prata de Mnemosine — artefato que dissolve memórias traumáticas e reconstrói narrativas de cobertura perfeitas na mente dos mortais.'
    },
    {
      id: 'magno',
      seat: 'O Mediador',
      name: 'Alexandre Magno',
      clans: 'Sem vassalos',
      img: 'assets/alexandre magno.png',
      role: 'Diplomacia & Pactos Estrangeiros',
      historia: `
        A voz diplomática da Égide. Alexandre conduz conferências ultrassecretas com emissários dos Deuses do Olimpo, delegações de panteões nórdicos, egípcios e forças do abismo.
        Sua mente estratégica visualiza alianças e tensões como um tabuleiro continental, garantindo que a Égide preserve sua autonomia sem ser esmagada entre titãs cósmicos rivais.
      `,
      civil: 'Circula com passaporte diplomático por embaixadas em Pall Mall e consulados europeus. Atua como mediador de litígios patrimoniais complexos entre dinastias nobres e fundações culturais internacionais, sendo tratado com profunda reverência nos círculos mais altos da diplomacia europeia.',
      rumores: 'Os arquivos mais antigos de Alexandria sugerem que sua linhagem descende diretamente do lendário conquistador macedônio e que ele preserva memórias intactas de campanhas militares travadas milênios antes da fundação de Avalon.',
      personalidade: 'Carismático, altivo, com oratória magnética que cativa amigos e intimida adversários. Não se impressiona com ameaças divinas e negocia com deuses como iguais.',
      armamento: 'O Tratado dos Sete Selos e o Gládio da Concórdia — uma lâmina cuja presença obriga qualquer entidade presente a cumprir a palavra jurada sob pena de exílio cósmico.'
    },
    {
      id: 'kovacs',
      seat: 'O Oráculo',
      name: 'William Kovacs',
      clans: 'Stein, Campbell e Hoffmann',
      img: 'assets/william kovacs.png',
      role: 'Profecias, Sonhos & Sinais Celestiais',
      historia: `
        O decifrador dos presságios da Roda do Tempo. William Kovacs vive com um pé na vigília mortal e outro nas correntes infinitas do Tear da Vida.
        É através de seus mapas astrais manuscritos e visões oníricas que o Conselho recebe avisos de colapsos cósmicos e do despertar de forças primordiais como Nyx.
      `,
      civil: 'Vive como um astrônomo ermitão em uma propriedade isolada nos arredores de Greenwich, onde restaurou uma cúpula de observatório do século XIX com lentes especiais de safira. Recebe mantimentos por correio e recusa eletricidade moderna, iluminando seus mapas com lamparinas de azeite e cera de abelha.',
      rumores: 'Dizem que Kovacs já sonhou com o próprio fim do universo nove vezes e que em cada sonho as estrelas se apagavam em uma ordem ligeiramente diferente. Seus olhos possuem um brilho leitoso que reflete constelações que não existem no céu visível da Terra.',
      personalidade: 'Distante, fala por parábolas enigmáticas e metáforas astrais. Sua mente está constantemente dividida entre o presente e o que ainda está por vir.',
      armamento: 'A Esfera Armilar de Urano e o Espelho de Obsidiana dos Sonhos — que revelam os movimentos ocultos das Quatro Arquitetas e o giro da Roda do Tempo.'
    }
  ];

  document.querySelectorAll('.uni-seat-spot').forEach(spot => {
    spot.addEventListener('mouseenter', () => {
      if (councilInterface) councilInterface.classList.add('is-dimmed');
    });
    spot.addEventListener('mouseleave', () => {
      if (councilInterface) councilInterface.classList.remove('is-dimmed');
    });

    spot.addEventListener('click', () => {
      const memberId = spot.getAttribute('data-seat-id');
      const data = councilMembers.find(m => m.id === memberId);
      if (data) {
        const content = `
          <div class="uni-drawer-portrait-wrap">
            <img src="${data.img}" alt="${data.name}" class="uni-drawer-portrait-img">
            <div class="uni-drawer-portrait-overlay"></div>
          </div>
          <div class="inline-block px-3.5 py-1.5 rounded-full bg-[#d4af37]/15 border border-[#d4af37]/40 text-[#f8e48b] text-[10px] font-mono-tech uppercase mb-3 font-bold">
            ✦ CADEIRA DE MÁRMORE: ${data.seat.toUpperCase()} ✦
          </div>
          <h3 class="font-cinzel-title text-2xl sm:text-3xl font-bold text-white mb-1">${data.name}</h3>
          <div class="text-xs font-mono-tech text-amber-300 uppercase mb-4 tracking-wider">${data.role}</div>

          <div class="uni-dossier-section">
            <div class="uni-dossier-section-title">✦ HISTÓRIA CANÔNICA & ASCENSÃO</div>
            <p class="uni-dossier-text">${data.historia.trim()}</p>
          </div>

          <div class="uni-dossier-section border-[#38bdf8]/30">
            <div class="uni-dossier-section-title text-[#38bdf8]">✦ VIDA FORA DA ÉGIDE // IDENTIDADE CIVIL</div>
            <p class="uni-dossier-text text-sky-100">${data.civil}</p>
          </div>

          <div class="uni-dossier-section border-[#a855f7]/30">
            <div class="uni-dossier-section-title text-purple-300">✦ O QUE A ORDEM SABE // RUMORES PROIBIDOS</div>
            <p class="uni-dossier-text text-purple-100/90">${data.rumores}</p>
          </div>

          <div class="uni-dossier-section">
            <div class="uni-dossier-section-title">✦ PERSONALIDADE & TRAÇOS DE CONDUTA</div>
            <p class="uni-dossier-text">${data.personalidade}</p>
          </div>

          <div class="uni-dossier-section border-amber-500/30">
            <div class="uni-dossier-section-title text-amber-300">✦ PODER DA CADEIRA & ARTEFATO SAGRADO</div>
            <p class="uni-dossier-text text-amber-100/90">${data.armamento}</p>
          </div>

          <div class="p-4 rounded-xl bg-black/70 border border-white/10 text-xs font-mono-tech">
            <span class="text-[#f8e48b] font-bold">Clãs Juramentados:</span> <span class="text-gray-300">${data.clans}</span>
          </div>
        `;
        openDrawer(`${data.seat}: ${data.name}`, 'Conselho de Mármore', content, spot);
      }
    });
  });

  /* ==========================================================================
     8. ATO VI — MAPA COSMOLÓGICO INTERATIVO (HONKAI: STAR RAIL TIER)
     ========================================================================== */
  const cosmicCanvas = document.getElementById('cosmic-canvas');
  let cosmicCtx = null;
  let cosmicAnimationId = null;
  let cosmicActive = false;
  let stars = [];
  let cosmicMouse = { x: 0, y: 0, targetX: 0, targetY: 0 };

  if (cosmicCanvas) {
    cosmicCtx = cosmicCanvas.getContext('2d');

    function resizeCosmicCanvas() {
      if (!cosmicCanvas) return;
      cosmicCanvas.width = cosmicCanvas.parentElement.clientWidth || window.innerWidth;
      cosmicCanvas.height = cosmicCanvas.parentElement.clientHeight || window.innerHeight;
      initStars();
    }

    function initStars() {
      stars = [];
      const numStars = Math.floor((cosmicCanvas.width * cosmicCanvas.height) / 2800);
      for (let i = 0; i < numStars; i++) {
        stars.push({
          x: Math.random() * cosmicCanvas.width,
          y: Math.random() * cosmicCanvas.height,
          radius: Math.random() * 1.7 + 0.3,
          alpha: Math.random() * 0.85 + 0.15,
          speed: Math.random() * 0.02 + 0.005,
          depth: Math.random() * 0.8 + 0.2,
          color: Math.random() > 0.82 ? '#f8e48b' : (Math.random() > 0.65 ? '#38bdf8' : (Math.random() > 0.5 ? '#d8b4fe' : '#ffffff'))
        });
      }
    }

    let cachedCosmicRect = null;
    function updateCosmicRect() {
      if (cosmicCanvas) cachedCosmicRect = cosmicCanvas.getBoundingClientRect();
    }
    window.addEventListener('resize', updateCosmicRect, { passive: true });
    window.addEventListener('scroll', updateCosmicRect, { passive: true });
    updateCosmicRect();

    window.addEventListener('mousemove', (e) => {
      if (!cachedCosmicRect) updateCosmicRect();
      if (!cachedCosmicRect) return;
      cosmicMouse.targetX = (e.clientX - cachedCosmicRect.left - cachedCosmicRect.width / 2) * 0.035;
      cosmicMouse.targetY = (e.clientY - cachedCosmicRect.top - cachedCosmicRect.height / 2) * 0.035;
    }, { passive: true });

    function renderCosmos() {
      if (!cosmicCtx || !cosmicActive) return;
      cosmicCtx.clearRect(0, 0, cosmicCanvas.width, cosmicCanvas.height);

      cosmicMouse.x += (cosmicMouse.targetX - cosmicMouse.x) * 0.05;
      cosmicMouse.y += (cosmicMouse.targetY - cosmicMouse.y) * 0.05;

      // Nebulosa sutil em azul e púrpura cósmico
      const w = cosmicCanvas.width;
      const h = cosmicCanvas.height;
      const neb1 = cosmicCtx.createRadialGradient(w * 0.45 + cosmicMouse.x * 2, h * 0.4 + cosmicMouse.y * 2, 50, w * 0.45, h * 0.4, 550);
      neb1.addColorStop(0, 'rgba(56, 189, 248, 0.08)');
      neb1.addColorStop(0.5, 'rgba(168, 85, 247, 0.04)');
      neb1.addColorStop(1, 'transparent');
      cosmicCtx.fillStyle = neb1;
      cosmicCtx.fillRect(0, 0, w, h);

      // Renderizar estrelas com paralaxe
      stars.forEach(s => {
        s.alpha += Math.sin(Date.now() * s.speed) * 0.015;
        const currentAlpha = Math.max(0.1, Math.min(1, s.alpha));
        const posX = s.x + cosmicMouse.x * s.depth;
        const posY = s.y + cosmicMouse.y * s.depth;

        cosmicCtx.beginPath();
        cosmicCtx.arc(posX, posY, s.radius, 0, Math.PI * 2);
        cosmicCtx.fillStyle = s.color;
        cosmicCtx.globalAlpha = currentAlpha;
        cosmicCtx.fill();
      });
      cosmicCtx.globalAlpha = 1.0;

      cosmicAnimationId = requestAnimationFrame(renderCosmos);
    }

    window.addEventListener('resize', resizeCosmicCanvas, { passive: true });
    resizeCosmicCanvas();

    if ('IntersectionObserver' in window) {
      const cosmicObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            cosmicActive = true;
            renderCosmos();
          } else {
            cosmicActive = false;
            if (cosmicAnimationId) cancelAnimationFrame(cosmicAnimationId);
          }
        });
      }, { threshold: 0.1 });

      const cosmologySection = document.getElementById('cosmologia');
      if (cosmologySection) cosmicObserver.observe(cosmologySection);
    }
  }

  // Dados das Entidades Cósmicas (Honkai Star Rail)
  const cosmologyNodesData = {
    creator: {
      title: 'O Criador (Caos Primordial)',
      category: 'Origem Extraplanar • Singularidade Cósmica',
      img: 'assets/hero_perpetuos.jpg',
      desc: `
        Entidade de poder absoluto que extrapola os limites da realidade e da irrealidade.
        Os gregos o chamavam de Caos, mas cada civilização e povo ancestral conferiu a ele nomes próprios e relatou versões divergentes sobre seu fim ou misterioso sumiço.
        De sua vontade emanou o Grande Plano, bordado nos filamentos infinitos do Tear da Vida, permitindo que a existência celestial e mortal se tornasse viável.
      `
    },
    architects: {
      title: 'Os Princípios Celestiais (Os Quatro Arquitetos)',
      category: 'Primeiros Seres Vivos • Guardiões do Sistema',
      img: 'assets/despertar de nyx.png',
      desc: `
        Os primeiros seres vivos que nasceram do sopro primordial não possuíam forma: pulsavam determinação e controle absolutos. O Criador os denominou "Princípios Celestiais", mas eles próprios se chamavam "Os Quatro Arquitetos". Eram os guardiões incumbidos de preservar o sistema do Criador e garantir que a história de sua criação fosse seguida ciclicamente pelo Tear da Vida e pela Roda do Tempo.
        
        Contudo, ao contemplarem a liberdade dos vivos, os Princípios foram tomados pela inveja dos mortais e exigiram do Criador uma forma física tangível. Como derradeiro presente antes de seu desaparecimento misterioso, o Caos forjou os Celestiais — seres de poder imenso amarrados às regras do padrão e dependentes da fé mortal (aquilo que os homens chamaram de Deuses), negando aos Arquitetos corpos biológicos fixos.
        
        ✦ OBSERVAÇÃO¹ — POSSE FÍSICA: Os Princípios Celestiais não possuem carne material originária. Para intervir diretamente no plano físico, são forçados a possuir corpos de mortais ou semideuses, assumindo o controle de seus hospedeiros como receptáculos sob altíssima voltagem mística.
        
        ✦ OBSERVAÇÃO² — VÍRUS / BUG DE ARQUITETO CAÍDO: A sustentação do Tear depende da harmonia entre os quatro pilares. Quando um arquiteto se corrompe, deserta ou tomba — como ocorreu na queda e sono maldito de Nyx —, sua anomalia atua como uma falha crítica ou vírus sistêmico, desestabilizando as leis da realidade, a física planar e as correntes temporais.
        
        ✦ ARQUITETOS CONHECIDOS: Nyx (A Noite Eterna / O Arquiteto Caído em suspensão) e o Tecelão Primordial da Ordem Cósmica.
      `
    },
    celestials: {
      title: 'Celestiais (Os Deuses Olimpianos)',
      category: 'Entidades Moldadas • Ligados à Fé Mortal',
      img: 'assets/tronos_conselho_mj.png',
      desc: `
        Forjados pelo Criador antes de seu sumiço, como resposta à inveja que os Quatro Arquitetos sentiam da liberdade mortal.
        Ao invés de conceder aos Princípios corpos divinos ilimitados, o Criador amarrou os Deuses às regras invisíveis do padrão cósmico.
        Um deus só existe e mantém seu poder enquanto houver vida mortal consciente para reverenciá-lo e nomear seus mistérios.
      `
    },
    perpetuals: {
      title: 'Os Perpétuos (As Sete Forças Primordiais)',
      category: 'Força Incontrolável • Além da Vida e da Morte',
      img: 'assets/hero_perpetuos.jpg',
      desc: `
        Criados pelos Quatro Arquitetos na ausência do Criador, com forma física e o dever solene de vigiar o padrão e incorporar os valores mais sagrados do cosmo. Contudo, revelaram-se a força mais incontrolável de toda a criação.
        
        Eles nunca morrem: ainda que sejam destruídos por determinação arquitetônica, retornam sempre ainda mais imprevisíveis, sobrevivendo ao curso das eras e governando a existência sob seus próprios símbolos invioláveis:
        
        ✦ DESTINO • MORTE • SONHO • DESTRUIÇÃO • DESESPERO • DESEJO • DELÍRIO ✦
        
        Vivos, mortos e deuses reconhecem nessas sete entidades a autoridade máxima sobre aquilo que jamais pode ser contido pelo Tear.
      `
    },
    mortals: {
      title: 'Os Mortais (Humanidade & Semideuses)',
      category: 'O Eixo da Criação • O Fogo do Livre Arbítrio',
      img: 'assets/cidadela_avalon_mj.png',
      desc: `
        Dotados da preciosa e perigosa capacidade de escolha que despertou a inveja dos próprios Princípios Celestiais.
        São o alicerce sobre o qual os Deuses constroem sua relevância e o solo onde a Égide de Avalon trava sua guerra secreta para impedir que forças antigas apaguem a chama da história mortal.
      `
    },
    forsaken: {
      title: 'Os Forsaken (Os Cinco Ascendidos)',
      category: 'Anomalia Extrínseca • Além dos Limites do Tear',
      img: 'assets/keres_mj.png',
      desc: `
        Existem cinco mortais e imortais que quebraram os grilhões do Tear da Vida e ascenderam à condição herética de Forsaken, operando à margem da autoridade dos Deuses e dos Princípios Celestiais.
        
        Dos cinco, apenas dois são conhecidos pelas crônicas da Biblioteca Submersa:
        
        ✦ VORACIDADE — A fome primordial insaciável, que consome essência mística e fragmenta barreiras dimensionais;
        ✦ ABUNDÂNCIA — A proliferação descontrolada e infinita, que subverte o equilíbrio cíclico e asfixia a ordem cósmica.
        
        Os outros três permanecem incógnitos, ocultos no vazio escuro fora do astrolábio da criação.
      `
    },
    anti_life: {
      title: 'A Anti-Vida (O Fim de Todas as Coisas)',
      category: 'Antítese do Criador • Anulação Absoluta',
      img: 'assets/noite caida.png',
      desc: `
        A Anti-Vida é a antítese irrevogável do Criador e o nêmesis de tudo o que existe.
        
        Enquanto o Caos teceu o Tear da Vida para conferir substância, tempo e consciência aos mundos, a Anti-Vida representa a anulação total e definitiva da existência. Não é a morte dos mortais nem a travessia de almas: é a dissolução irreversível da matéria, do espírito e da memória cósmica no vazio eterno.
      `
    }
  };

  // Revelação Permanente das Entidades Secretas ao Hover ou Toque
  document.querySelectorAll('.uni-secret-entity').forEach(secret => {
    const revealSecret = () => {
      if (!secret.classList.contains('is-revealed')) {
        secret.classList.add('is-revealed');
      }
    };
    secret.addEventListener('mouseenter', revealSecret, { passive: true });
    secret.addEventListener('touchstart', revealSecret, { passive: true });
  });

  document.querySelectorAll('.uni-honkai-entity').forEach(node => {
    node.addEventListener('click', () => {
      const key = node.getAttribute('data-cosmo-key');
      const info = cosmologyNodesData[key];
      if (info) {
        // Garantir revelação se clicado
        if (node.classList.contains('uni-secret-entity')) {
          node.classList.add('is-revealed');
        }

        const content = `
          <!-- Conceito Cósmico - Moldura de Arte Higgsfield / Acervo Oficial -->
          <div class="uni-cosmo-concept-artwork mb-6 rounded-2xl overflow-hidden border border-[#d4af37]/40 relative bg-black/80 shadow-2xl group">
            <div class="relative w-full h-56 sm:h-64 overflow-hidden">
              <img src="${info.img}" alt="${info.title}" class="w-full h-full object-cover object-center filter brightness-95 group-hover:scale-105 transition-all duration-700" onerror="this.onerror=null; this.src='assets/hero_perpetuos.jpg';">
              <div class="absolute inset-0 bg-gradient-to-t from-[#090818] via-transparent to-transparent"></div>
              <div class="absolute top-3 right-3 text-[10px] font-mono-tech px-2.5 py-1 rounded bg-black/85 border border-[#d4af37]/50 text-[#f1d27a] font-bold uppercase tracking-wider">
                ✦ ARTE CONCEITUAL // CÓDICE
              </div>
            </div>
          </div>

          <div class="mb-5 p-4 rounded-xl bg-[#090818] border border-[#d4af37]/45 text-xs font-mono-tech text-[#f8e48b]">
            ✦ NÓ CELESTE: ${info.category.toUpperCase()} ✦
          </div>
          <div class="font-editorial-body text-base sm:text-lg text-[#ded8cb] leading-relaxed mb-6 space-y-4">
            ${info.desc.trim().split('\n\n').map(p => `<p>${p.trim()}</p>`).join('')}
          </div>
          <div class="p-4 rounded-xl bg-black/70 border border-white/10 text-xs font-mono-tech text-gray-400">
            Dica: Clique no botão central abaixo no mapa para abrir o Códice e ler toda a Cosmologia Canônica sem cortes.
          </div>
        `;
        openDrawer(info.title, info.category, content, node);
      }
    });
  });

  // Botão "LER A COSMOLOGIA COMPLETA"
  const readFullCosmoBtn = document.getElementById('uni-btn-read-full-cosmo');
  if (readFullCosmoBtn) {
    readFullCosmoBtn.addEventListener('click', () => {
      const fullCosmoContent = `
        <div class="space-y-6 font-editorial-body text-base sm:text-lg text-[#ded8cb] leading-relaxed">
          <p>
            Governado por forças acima da compreensão humana, o universo tem seu início pelas mãos de um ser de poder que extrapola os limites da realidade e da irrealidade. Os Gregos o chamavam de Caos, mas muitos outros povos deram a ele nomes diferentes, relatando versões divergentes sobre seu fim ou misterioso sumiço. O que se sabe é que ele esteve aqui para criar tudo aquilo que vive, seja direta ou indiretamente — no que chamamos de o Grande Plano, tecido pelos filamentos infinitos do Tear da Vida.
          </p>
          <p>
            Os primeiros seres vivos que nasceram não tinham forma biológica: pulsavam determinação e controle absolutos. O Criador os chamou de "Os Princípios Celestiais", mas eles próprios se chamavam de "Os Quatro Arquitetos". Eram responsáveis por preservar o sistema definido pelo Criador e cuidar para que a história de sua criação fosse seguida ciclicamente através das eras, movimentando os fios do destino na Roda do Tempo. Esse conhecimento era amplamente estudado pelos mortais, mas se perdeu nas brumas dos milênios.
          </p>
          <p>
            Contudo, vendo a liberdade que os vivos desfrutavam, os Princípios foram tomados pela inveja dos mortais e pediram ao Criador uma forma física. Sendo este o último presente que o Criador concedeu antes de seu sumiço, a dádiva não veio como eles imaginavam: ao invés de conceder aos quatro corpos divinos fixos, o Criador forjou os Celestiais — uma raça amarrada às regras invisíveis tecidas pelo padrão, dependente da fé consciente dos homens para manter seus poderes e domínios. Algo que os mortais passaram a chamar de Deuses.
          </p>
          <div class="p-4 rounded-xl bg-black/60 border border-[#d4af37]/30 space-y-3 font-mono-tech text-xs text-[#f8e48b]">
            <div><strong>✦ OBSERVAÇÃO¹ — POSSE FÍSICA:</strong> Desprovidos de carne biológica própria, os Princípios Celestiais são obrigados a possuir corpos de mortais ou semideuses para intervir diretamente no plano tangível.</div>
            <div><strong>✦ OBSERVAÇÃO² — VÍRUS DO ARQUITETO CAÍDO:</strong> A queda, corrupção ou sono forçado de um dos quatro (como ocorreu com Nyx) gera anomalias estruturais críticas no Tear da Vida, agindo como um vírus ou bug sistêmico que deforma as leis da realidade.</div>
          </div>
          <p>
            Nessa conjuntura, na ausência de seu mestre e temendo que a nova raça de deuses não compreendesse as amarras que deveriam existir, os Arquitetos criaram uma outra espécie de entidades: com forma física própria, para proteger o padrão, vigiar o mundo e viver seus valores mais sagrados. Contudo, revelaram-se a força mais incontrolável do cosmo. Eles nunca morrem: ainda que destruídos por determinação arquitetônica, retornam sempre ainda mais imprevisíveis, governando a criação sob seus sete símbolos sagrados: <strong>Destino, Morte, Sonho, Destruição, Desespero, Desejo e Delírio</strong>. A essas presenças indomáveis, vivos e deuses deram o nome de <strong>Perpétuos</strong>.
          </p>
          <div class="p-4 rounded-xl bg-[#120508] border border-red-500/30 space-y-2 font-mono-tech text-xs text-red-200">
            <div class="text-red-400 font-bold uppercase tracking-wider">✦ AS ANOMALIAS FORA DO TEAR: FORSAKEN & ANTI-VIDA</div>
            <p>Além das geometrias do Tear, no vazio escuro, residem as forças que desafiam a própria ordem: os <strong>Forsaken</strong> (cinco ascendidos que romperam as regras cósmicas, dos quais conhecem-se Voracidade e Abundância) e a <strong>Anti-Vida</strong>, a antítese primordial do Criador e o fim absoluto de todas as coisas.</p>
          </div>
          <p class="italic text-[#f8e48b] font-bold">
            E entre a ordem e o caos, as forças do mundo se estabeleceram assim, onde poder e submissão sempre caminhavam lado a lado... ou será que não?
          </p>
        </div>
      `;
      openModal('A Cosmologia de Midnight City — Texto Integral', fullCosmoContent, readFullCosmoBtn);
    });
  }

  /* ==========================================================================
     9. ATO VII — SEASON 1: CENÁRIOS DINÂMICOS & TRANSIÇÃO MONUMENTAL
     ========================================================================== */
  // Scrollytelling Capítulo 01
  const scrollyCap1 = document.getElementById('scrolly-cap1');
  const stageCap1 = scrollyCap1 ? scrollyCap1.querySelector('.uni-cinema-stage') : null;
  const beatsCap1 = document.querySelectorAll('#scrolly-cap1 .uni-cinema-beat');
  const bgImgsCap1 = document.querySelectorAll('#scrolly-cap1 .uni-cinema-bg-img');
  const overlayCap1 = document.getElementById('scrolly-overlay-cap1');

  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined' && scrollyCap1 && stageCap1) {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion && beatsCap1.length > 0) {
      beatsCap1.forEach((b, idx) => {
        b.classList.toggle('is-active', idx === beatsCap1.length - 1);
      });
      bgImgsCap1.forEach((img, idx) => {
        img.classList.toggle('is-active', idx === bgImgsCap1.length - 1);
      });
    } else if (beatsCap1.length > 0) {
      ScrollTrigger.create({
        trigger: scrollyCap1,
        start: 'top top',
        end: 'bottom bottom',
        pin: stageCap1,
        anticipatePin: 1,
        pinSpacing: false,
        scrub: 0.5,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const p = self.progress;
          const total = beatsCap1.length;
          const activeIndex = Math.min(Math.floor(p * total), total - 1);

          beatsCap1.forEach((b, idx) => {
            if (idx === activeIndex) {
              b.classList.add('is-active');
            } else {
              b.classList.remove('is-active');
            }
          });

          // Mapear imagens dinâmicas por Beat do Cap 1
          let targetImgIdx = 0;
          if (activeIndex === 2) {
            targetImgIdx = 1;
          } else if (activeIndex >= 3) {
            targetImgIdx = 2;
          }

          bgImgsCap1.forEach((img, idx) => {
            if (idx === targetImgIdx) {
              img.classList.add('is-active');
            } else {
              img.classList.remove('is-active');
            }
          });

          if (overlayCap1) {
            if (activeIndex >= 4) {
              overlayCap1.style.backgroundColor = 'rgba(2, 2, 3, 0.92)';
            } else if (activeIndex >= 3) {
              overlayCap1.style.backgroundColor = 'rgba(200, 41, 36, 0.25)';
            } else {
              overlayCap1.style.backgroundColor = 'rgba(9, 8, 16, 0.35)';
            }
          }
        }
      });
    }
  }

  // Scrollytelling Capítulo 02
  const scrollyCap2 = document.getElementById('scrolly-cap2');
  const stageCap2 = scrollyCap2 ? scrollyCap2.querySelector('.uni-cinema-stage') : null;
  const beatsCap2 = document.querySelectorAll('#scrolly-cap2 .uni-cinema-beat');
  const bgImgsCap2 = document.querySelectorAll('#scrolly-cap2 .uni-cinema-bg-img');
  const overlayCap2 = document.getElementById('scrolly-overlay-cap2');

  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined' && scrollyCap2 && stageCap2) {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion && beatsCap2.length > 0) {
      beatsCap2.forEach((b, idx) => {
        b.classList.toggle('is-active', idx === beatsCap2.length - 1);
      });
      bgImgsCap2.forEach((img, idx) => {
        img.classList.toggle('is-active', idx === bgImgsCap2.length - 1);
      });
    } else if (beatsCap2.length > 0) {
      ScrollTrigger.create({
        trigger: scrollyCap2,
        start: 'top top',
        end: 'bottom bottom',
        pin: stageCap2,
        anticipatePin: 1,
        pinSpacing: false,
        scrub: 0.5,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const p = self.progress;
          const total = beatsCap2.length;
          const activeIndex = Math.min(Math.floor(p * total), total - 1);

          beatsCap2.forEach((b, idx) => {
            if (idx === activeIndex) {
              b.classList.add('is-active');
            } else {
              b.classList.remove('is-active');
            }
          });

          // Mapear imagens dinâmicas por Beat do Cap 2
          const targetImgIdx = Math.min(activeIndex, bgImgsCap2.length - 1);

          bgImgsCap2.forEach((img, idx) => {
            if (idx === targetImgIdx) {
              img.classList.add('is-active');
            } else {
              img.classList.remove('is-active');
            }
          });

          if (overlayCap2) {
            if (activeIndex === 2) {
              // Estufa em chamas
              overlayCap2.style.backgroundColor = 'rgba(212, 175, 55, 0.2)';
            } else if (activeIndex === 4) {
              // Colapso do Submundo
              overlayCap2.style.backgroundColor = 'rgba(2, 2, 4, 0.88)';
            } else {
              overlayCap2.style.backgroundColor = 'rgba(15, 12, 28, 0.35)';
            }
          }
        }
      });
    }
  }

  // Modais de Leitura Completa dos Capítulos
  const btnReadCap1 = document.getElementById('uni-btn-read-cap1');
  if (btnReadCap1) {
    btnReadCap1.addEventListener('click', () => {
      const cap1Text = `
        <div class="space-y-6 font-editorial-body text-base sm:text-lg text-[#ded8cb] leading-relaxed">
          <p>
            Todos os anos, na data do dia 30 de Setembro. Os recrutas mais promissores pelas avaliações dos então veteranos de cada ofício elegiam candidatos para uma das mais famosas festas do mundo sobrenatural. O Rito do Vinho. Dionísio, tinha uma casa noturno no centro mais badalado de Londres, e orquestrava as festas mais infames, contudo, através da musica, dos corpos, das drogas e da bebida. Outra festa se organizava nas profundezas daquele prédio.
          </p>
          <p>
            A Elite da Égide estava lá naquela noite, vestindo-se a rigor, com mascaras encobrindo a face, em especial aqueles que chamavam de os conselheiros de marmore. Os recrutas sem perceber eram levados para dentro daquele salão cada um atraído por forças desconhecidas, e depender de seu ofício um desafio silencioso lhe era entregue, e ao longo daquela noite eles buscavam cumpri-lo, alguns temendo serem repreendido, mas a maioria buscando influência e poder diante dos olhos de um bom veterano... sem saber que naquela noite estavam sendo observados pela liderança daquela organização.
          </p>
          <p>
            E entre eles, os conselheiros conversavam, trocavam ideias, olhares, anotavam os nomes de recrutas promissores, e até mesmo brigavam.
          </p>
          <p>
            Três pessoas naquela noite se destacavam em especial: Selene, a Torre; Jonathan, o Arquivista; e Rowan Escardos, um veterano especialista que o conselho confiava a biblioteca de Alexandria quase que cegamente em suas mãos. No começo, Rowan e Selene pareciam estar conversando sobre algo nas entre linhas, como se a mulher estivesse sendo alvo das preocupações do velho desconfiado, mas Jonathan quando chegou conseguiu roubar a cena. Ele era alguém no mínimo sem traquejo social, não detinha de filtros devido a sua alta arrogância derivada do seu grande sucesso em missões de alta complexidade da ordem - ele havia condenado três líderes ocultistas desde que chegara ao cargo ao qual ocupava - e por isso tratava as mulheres sempre como objetos sem nenhum escrúpulo com palavras muito baixas, mas apesar da sua insalubridade que morava em sua limgua, havia também palavras carregadas de estratégia, afinal era ali que morava o seu verdadeiro potencial.
          </p>
          <p>
            Ele provocou várias vezes Selene naquela noite, dando a entender que a estava monitorando, algo que em tese deveria ser serviço da conselheira, afinal ela era a vigia entre os vigias, os olhos que sempre monitoravam tudo e todos, mas em especial ele parecia querer dar a entender algo excepcionalmente errado, ainda que não parecesse ter muito fundamento. Ele bebiba, tirava sarro e provocava, ao ponto de se tornar detestável até mesmo aos olhos de seu vassalo- Rowan.
          </p>
          <p>
            Foi um pouco depois das últimas provações dos recrutadas que a Lança, do conselho tomou a palavra entre os agentes. Sr. Bauman, era um semideus ctônico muito conhecido dentro da Égide por ser alguém cruel, impiedoso e determinado. Ele carregava consigo o artefato mais poderoso conhecido no mundo mortal e imortal, a lança das almas. Pouco se sabia dele entre os agentes, mas algo em particular era de que ele nutria um ódio incomum por ocultistas da rosa negra, uma organização que estava caçando os conselheiros a mais de um século... sempre que não conseguiam chegar até um dos integrantes, eles declaravam seu alvo primeiro em suas famílias, assassinando brutalmente as pessoas que eles mais amassem. Foi assim que Bauman tornou-se talvez... tão impiedoso.
          </p>
          <p>
            Ele cortou a festa declarando que o conselho havia recebido provas irrefutáveis de um agente infiltrado estava dentro do conselho tramando e vazando informações para então temida e desconhecida organização da rosa negra. E apesar de todas as cadeiras não terem participado da votação seis haviam determinado que o destino daquela pessoa não seria traçado pelos inquisidores em um julgamento como seria em dias normais, ele executaria a penitência dada por alta traição. E contra todas as expectativas, ele arrancou a cabeça de Jonathan, o conselheiro desagradável. A quem diga que a última imagem registrada em seus olhos antes de ser mortos fora de uma mulher de cabelos negros sorrindo com um convencimento estranhamente cruel.
          </p>
          <p class="italic font-bold text-red-400">
            E naquela noite os agentes entenderam, qual era o destino dos condenados... e o caminho que estavam trilhando em suas vidas era mais perigoso do que eles podiam imaginar.
          </p>
        </div>
      `;
      openModal('Capítulo 01: O Destino dos Condenados', cap1Text, btnReadCap1);
    });
  }

  const btnReadCap2 = document.getElementById('uni-btn-read-cap2');
  if (btnReadCap2) {
    btnReadCap2.addEventListener('click', () => {
      const cap2Text = `
        <div class="space-y-6 font-editorial-body text-base sm:text-lg text-[#ded8cb] leading-relaxed">
          <p>
            Depois da morte de Jonathan algo incomum começou a se instalar no submundo, como se alguma coisa estivesse tramando uma rebelião, não contra o sistema, mas contra o reino dos deuses. Essa onda de instabilidade foi sentida pelos olimpianos no início como um zumbido constante e persistente, e depois veio o lapso, potente e ensurdecedor. Uma onda de poder puro como nenhum celestial era capaz de emanar. Alguém havia despertado.
          </p>
          <p>
            Não demorou muito para que Hermes descobrisse que se tratava da deusa primordial Nyx, a quem os olimpianos haviam deixado em sono profundo a alguns séculos atrás. Diferente de outras entidades, os deuses não tinham tanto controle sobre seu núcleo de poder, a sua presença era capaz de matar cidades se fossem descuidados, por isso sempre o faziam através de seus hospedeiros, aos quais abrigavam apenas uma centelha de seu núcleo divino - sua alma. Contudo, Nyx não aceitava tais termos que sua presença no mundo mortal ou até mesmo nos reinos dos deuses era sempre um grande desafio… ou melhor, um grande caos.
          </p>
          <p>
            Temendo que ela recuperasse integralmente seus poderes e causasse uma grande destruição, os deuses solicitaram a Égide um grupo de agentes poderosos o suficiente para uma missão de identificação e possível mediação, afinal, ele não a podiam encontrar por terem sido mentalmente “cegados” em relação a presença dela. Esse fora a consequência de seu último sono forçado, nenhum deles conseguiam reconhecê-la, era como se a sua identidade tivesse se tornado um tabu.
          </p>
          <p>
            O grupo foi selecionado a dedo por cada um dos deuses do olimpo, e então liderados pelo então novo líder dos Arquivistas - Rowan Escardos - o homem mais inteligente e sábio conhecido entre os mortais. Contudo, antes de se encontrarem com o conselheiro de mármore, acabaram sendo interceptados por uma grande confusão provocada por um assassino em série, que estava causando uma grande confusão em um parque natural público de Londres, colocando o véu em risco. Com o objetivo de prender o assassino e ajudar os mortais, o grupo enfrentou David Sanitas que se dizia ser um enviado do submundo para ensinar o Olimpo boas maneiras, ele alegava que os deuses olimpianos estavam perturbando o ciclo natural estabelecido pelos princípios celestiais e isso estava trazendo consequências. O grupo venceu a batalha, apenas para descobrir que haviam se tornado as mãos do assassino. Cada clone ferido eram na verdade civis, agonizando com danos fatais. E o único rastro deixado pela sua cena horripilante de terror, era uma rosa negra - o sinal nefasto deixado na cena de crime da morte de todos os parentes dos conselheiros de mármore em pelo menos três décadas.
          </p>
          <p>
            Consumido pela raiva de encontrar o algoz do assassinato brutal de sua família e de seus companheiros, Rowan Escardos guiou os agentes até um dos conselheiros capazes de analisar um flor tão excentrica. A rosa negra era capaz de matar ao toque, enviando a alma de quem a possuía para as profundezas do tártaro, infelizmente todos os conselheiros sabiam muito bem disso, e nunca conseguiram encontrar uma intacta como aquela a tempo de ser examinada. Lukas Ekantor, o semideus mestiço de Júpiter e Proserpina, por outro lado, estava liderando uma pesquisa há pelo menos cinco anos que viria a calhar.
          </p>
          <p>
            Na Universidade de Londres, eles o encontraram e conseguiram não apenas identificar a origem da rosa que era dos jardins do palácio da noite, como também estava sendo artificialmente produzida na própria cidade mortal. Com a localização e mãos eles se dirigiram até um pub, que era usado para disfarçar o esconderijo da estufa onde as tais rosas estavam sendo produzidas, desejando por um fim em um dos maiores recursos do assassino, eles queimaram tudo, salvando todos os civis da fúria em chamas do conselheiro e dos agentes. Foi nesse momento que eles sentiram o poder da deusa noturna se manifestar em um local não muito longe dali, um parque natural como o outro, mas em uma localização mais reservada.
          </p>
          <p>
            Eles encontraram Nyx segurando um buquê daquelas mesmas rosas - denunciando que ela tinha uma conexão íntima com o assassino - um semideus diretamente descendente da linhagem da deusa primordial, um filho da noite. Aquilo justificava sua capacidade de manusear tais flores, e também de usar poderes tão formidáveis, ela se apresentou como alguém que não estava sendo perseguida e sim a mandante daquela missão, na realidade era ela uma aliada de Zeus, e todo aquele percurso teria sido necessário para testá-los antes de confiar a verdadeira missão.
          </p>
          <p>
            Para convencê-los de sua tarefa realmente arriscada, Nyx criou uma dimensão de bolso onde poderiam conversar sem ser importunados pelos princípios celestiais ou os próprios deuses. Ela se apresentou não como deusa, mas sim como uma entidade caída, uma das quatro arquitetas, conhecida como “Noite Eterna”. Ela explicou que fora deposta de seu posto quando começou a questionar a maneira como os princípios celestiais - as quatro arquitetas - estavam operando o destino da criação, pois ela acreditava que o livre arbítrio era fundamental para que a obra de seu criador se tornasse aquilo que ele idealizou. Ridicularizada e atacada, ela fora então caída e então substituída - quando uma entidade é deposta, sua memória e personalidades são reunidas e amarradas em uma única divindade, para que o conteúdo defeituoso morra com aquela realidade quando sua era chegar ao fim, preservando as demais deusas ligadas a entidades com uma nova memória e personalidade quando encarnar a referida arquiteta.
          </p>
          <p>
            Zeus a estava ajudando procurando poder para se libertar das amarras impostas pelos princípios celestiais - não por motivos benevolentes, e sim para governar sem ser governado - mas ela desejava que a criação fosse verdadeiramente livre. E querendo alcançar esse objetivo, os mortais aceitaram ajudar a deusa. Em resposta ganharam o poder do primeiro grupo de semideuses escolhidos para salvar a criação, a Legio Fulminata. Agora eles não envelheceriam, não morreriam por causas naturais e teriam poder além da suas limitações mortais. Causando sem saber, o colapso total do submundo.
          </p>
          <p class="italic text-center font-bold text-amber-300">
            [... continua …]
          </p>
        </div>
      `;
      openModal('Capítulo 02: A Mãe e o Assassino', cap2Text, btnReadCap2);
    });
  }

  // Interlúdio: Botão para pular direto ao Capítulo 2
  const btnJumpCap2 = document.getElementById('uni-btn-jump-cap2');
  if (btnJumpCap2) {
    btnJumpCap2.addEventListener('click', () => {
      const cap2El = document.getElementById('scrolly-cap2');
      if (cap2El) {
        cap2El.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  // Menu Mobile Toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      const isHidden = mobileMenu.classList.toggle('hidden');
      mobileMenuBtn.setAttribute('aria-expanded', !isHidden);
    });
  }

  // Recalcular ScrollTrigger após carregamento de imagens e fontes
  window.addEventListener('load', () => {
    if (typeof ScrollTrigger !== 'undefined') {
      ScrollTrigger.refresh();
    }
  });
});
