// =============================================================================
// Midnight City RPG: PODERES & INDIVIDUALIDADES (CONTROLADOR GAMER AAA)
// Hero Panorâmica com Spotlight Chiaroscuro + Deck Tático de Habilidades Integral
// 12 Divindades Canônicas • Zero Emojis • Phosphor Icons • 60 FPS
// =============================================================================

(function () {
  'use strict';

  // 1. ESTADO GLOBAL DA APLICAÇÃO
  const state = {
    selectedGodId: 'zeus',
    selectedLevel: 1,
    selectedChoiceIndex: 0,
    viewMode: 'current', // 'current' ou 'cascade'
    activeFilter: 'all',
    selectedClassFilter: 'all',
    searchQuery: '',
    comparedGodIds: [],
    isStageVisible: true,
    reducedMotion: typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    divinities: window.VALIDATION_DIVINITIES || [],
    classesInfo: window.PERPETUAL_CLASSES || {},
    reinosInfo: window.CANONICAL_REINOS || {}
  };

  let currentSelectionToken = 0;

  // Utilitário de Normalização de Diacríticos e Espaços
  function normalizeQuery(str) {
    if (!str) return '';
    return str
      .toString()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .trim();
  }

  // Cores Canônicas das Classes Perpétuas
  const CLASS_COLORS = {
    destruicao: { color: '#ff2a4b', glow: 'rgba(255, 42, 75, 0.45)' },
    destino:    { color: '#e5b83b', glow: 'rgba(229, 184, 59, 0.45)' },
    morte:      { color: '#9d0208', glow: 'rgba(157, 2, 8, 0.45)' },
    sonho:      { color: '#2196f3', glow: 'rgba(33, 150, 243, 0.45)' },
    desespero:  { color: '#7209b7', glow: 'rgba(114, 9, 183, 0.45)' },
    desejo:     { color: '#ff0054', glow: 'rgba(255, 0, 84, 0.45)' },
    delirio:    { color: '#00f5d4', glow: 'rgba(0, 245, 212, 0.45)' }
  };

  // Marcas d'Água Tipográficas Canônicas em Grego Clássico Arcaico / Latim Nobre
  const GREEK_WATERMARKS = {
    zeus: "ΖΕΥΣ",
    poseidon: "ΠΟΣΕΙΔΩΝ",
    hades: "ᾍΔΗΣ",
    hera: "ἭΡΑ",
    demeter: "ΔΗΜΗΤΗΡ",
    hestia: "ἙΣΤΙΑ",
    afrodite: "ἈΦΡΟΔΙΤΗ",
    apolo: "ΑΠΟΛΛΩΝ",
    ares: "ἌΡΗΣ",
    artemis: "ἌΡΤΕΜΙΣ",
    atena: "ἈΘΗΝΑ",
    dionisio: "ΔΙΟΝΥΣΟΣ",
    hefesto: "ἭΦΑΙΣΤΟΣ",
    hermes: "ἙΡΜΗΣ",
    persefone: "ΠΕΡΣΕΦΟΝΗ",
    hecate: "ἙΚΑΤΗ",
    melinoe: "ΜΕΛΙΝΟΗ",
    oberon: "OBERON",
    tanatos: "ΘΑΝΑΤΟΣ",
    hipnos: "ὝΠΝΟΣ",
    hypnos: "ὝΠΝΟΣ",
    morfeu: "ΜΟΡΦΕΥΣ",
    paraphronia: "ΠΑΡΑΦΡΟΣΥΝΗ",
    circe: "ΚΙΡΚΗ",
    despina: "ΔΕΣΠΟΙΝΑ",
    eros: "ΕΡΩΣ",
    psique: "ΨΥΧΗ",
    tique: "ΤΥΧΗ",
    bruxas: "OCCULTUM",
    'congregacao-bruxas': "OCCULTUM",
    igreja: "ECCLESIA",
    'santa-igreja': "ECCLESIA",
    'torre-relogio': "CHALDEA",
    vampiros: "SANGUIS",
    merlin: "MERLINUS",
    'ordem-merlin': "MERLINUS",
    anfitrite: "ἈΜΦΙΤΡΙΤΗ",
    anubis: "ANUBIS",
    bastet: "BASTET",
    macaria: "ΜΑΚΑΡΙΑ",
    zagreu: "ΖΑΓΡΕΥΣ"
  };

  // Regras de Seleção Canônicas por Patrono / Divindade
  const CANONIC_DIVINE_RULE = "TODO JOGADOR POSSUI TRÊS INDIVIDUALIDADES POR NÍVEL, PODENDO USÁ-LAS PARA COLHER ATÉ TRÊS PODERES.";

  const ORGANIZATION_SELECTION_RULES = {
    'santa-igreja': "Escolha 1 Técnica ou Sacramento da Assembleia do Oitavo Sacramento por nível.",
    igreja: "Escolha 1 Técnica ou Sacramento da Assembleia do Oitavo Sacramento por nível.",
    'torre-relogio': "Selecione poderes da sua Faculdade ativa ou Passivas Universais de Westminster.",
    'ordem-merlin': "Acesso simultâneo a magias de combate e utilidade conforme slots do merliniano.",
    merlin: "Acesso simultâneo a magias de combate e utilidade conforme slots do merliniano.",
    'congregacao-bruxas': "Selecione um rito de coven ou feitiço tradicional da linhagem por nível.",
    bruxas: "Selecione um rito de coven ou feitiço tradicional da linhagem por nível.",
    vampiros: "Selecione uma dádiva sanguínea ou arte predadora por nível."
  };

  function getDivinitySelectionRule(god) {
    if (!god) return 'Consulte os requisitos na ficha de personagem.';
    if (god.selectionRule) return god.selectionRule;
    if (ORGANIZATION_SELECTION_RULES[god.id]) return ORGANIZATION_SELECTION_RULES[god.id];
    return CANONIC_DIVINE_RULE;
  }

  // Cenários Atmosféricos e Assinaturas Acústicas HSR por Divindade
  const SCENIC_ENVIRONMENTS = {
    zeus: {
      className: 'scenic-env-zeus',
      icon: 'ph-lightning',
      chimeFreqs: [554.37, 659.25, 830.61, 1108.73], // Mi/Dó# Maior - harmônicos celestiais
      synthWave: 'triangle'
    },
    hades: {
      className: 'scenic-env-hades',
      icon: 'ph-skull',
      chimeFreqs: [130.81, 155.56, 196.00, 233.08], // Dó menor / Dó# dim - ressonância ctônica
      synthWave: 'sawtooth'
    },
    poseidon: {
      className: 'scenic-env-poseidon',
      icon: 'ph-trident',
      chimeFreqs: [220.00, 277.18, 329.63, 440.00], // Harmônicos abissais fluidos
      synthWave: 'sine'
    }
  };

  // ===========================================================================
  // 2. HERO PANORÂMICA: SPOTLIGHT CHIAROSCURO + PARTÍCULAS & NÉVOA
  // ===========================================================================
  function initHeroPanoramicFx() {
    const heroSection = document.getElementById('hero-panoramic');
    const canvas = document.getElementById('hero-fx-canvas');
    if (!heroSection || !canvas) return;

    const ctx = canvas.getContext('2d');
    let width = (canvas.width = heroSection.clientWidth);
    let height = (canvas.height = heroSection.clientHeight);

    // Variáveis de Posição do Spotlight com Interpolação Suave (Lerp)
    let targetX = width * 0.5;
    let targetY = height * 0.45;
    let currentX = targetX;
    let currentY = targetY;
    let isHovering = false;
    let lastMouseMoveTime = Date.now();

    function resizeCanvas() {
      width = canvas.width = heroSection.clientWidth;
      height = canvas.height = heroSection.clientHeight;
    }
    window.addEventListener('resize', resizeCanvas);

    // Sistema de Brasas / Partículas Místicas
    const PARTICLE_COUNT = 65;
    const particles = [];
    const emberColors = [
      { r: 241, g: 210, b: 122 }, // Dourado brilhante
      { r: 212, g: 175, b: 55 },  // Ouro nobre
      { r: 255, g: 200, b: 100 }, // Âmbar
      { r: 0, g: 245, b: 212 }    // Ciano cósmico sutil
    ];

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2.2 + 0.8,
        vx: (Math.random() - 0.5) * 0.4,
        vy: -(Math.random() * 0.8 + 0.3),
        alpha: Math.random() * 0.7 + 0.2,
        maxAlpha: Math.random() * 0.7 + 0.25,
        color: emberColors[Math.floor(Math.random() * emberColors.length)],
        offset: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.02 + 0.01
      });
    }

    // Ouvintes de Movimento do Cursor na Hero
    heroSection.addEventListener('mousemove', (e) => {
      const rect = heroSection.getBoundingClientRect();
      targetX = e.clientX - rect.left;
      targetY = e.clientY - rect.top;
      isHovering = true;
      lastMouseMoveTime = Date.now();
    });

    heroSection.addEventListener('mouseleave', () => {
      isHovering = false;
    });

    const heroImg = document.getElementById('hero-panoramic-img');
    let panoCurrentX = 0;
    let panoCurrentY = 0;
    let isHeroVisible = true;

    // Redução de Movimento
    const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Loop de Animação 60 FPS
    let animFrameId = null;
    let time = 0;

    function renderFx() {
      if (!isHeroVisible) {
        animFrameId = null;
        return;
      }

      time += 0.018;

      // Se o usuário ficar inativo por mais de 2s, o spotlight realiza movimento de respiração cósmica
      const idleTime = Date.now() - lastMouseMoveTime;
      if (!isHovering || idleTime > 2200) {
        targetX = width * 0.5 + Math.sin(time * 0.7) * (width * 0.18);
        targetY = height * 0.42 + Math.cos(time * 0.9) * (height * 0.1);
      }

      // Interpolação suave (Lerp) para fluidez de alto padrão
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;

      // Rig Panorâmico Horizontal da Câmera (Exploração dos Perpétuos de ponta a ponta sem expor bordas)
      if (heroImg && !prefersReducedMotion) {
        const normX = (currentX / width - 0.5); // de -0.5 a +0.5
        const normY = (currentY / height - 0.5);
        const rawTargetX = normX * -1.8;
        const rawTargetY = normY * -1.0;
        const panoTargetX = Math.max(-1.4, Math.min(1.4, rawTargetX));
        const panoTargetY = Math.max(-0.8, Math.min(0.8, rawTargetY));
        panoCurrentX += (panoTargetX - panoCurrentX) * 0.05;
        panoCurrentY += (panoTargetY - panoCurrentY) * 0.05;
        heroImg.style.transform = `scale(1.15) translate3d(${panoCurrentX.toFixed(2)}%, ${panoCurrentY.toFixed(2)}%, 0)`;
      }

      // 1. Limpeza
      ctx.clearRect(0, 0, width, height);

      // 2. Chiaroscuro Spotlight Shader
      const spotRadius = Math.max(width, height) * 0.55;
      const gradient = ctx.createRadialGradient(
        currentX, currentY, 10,
        currentX, currentY, spotRadius
      );

      gradient.addColorStop(0.0, 'rgba(255, 230, 160, 0.10)');
      gradient.addColorStop(0.25, 'rgba(0, 0, 0, 0.0)');
      gradient.addColorStop(0.6, 'rgba(5, 6, 9, 0.28)');
      gradient.addColorStop(0.9, 'rgba(4, 5, 8, 0.55)');
      gradient.addColorStop(1.0, 'rgba(2, 3, 5, 0.7)');

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // 3. Névoa Volumétrica Rasteira
      const fogGradient = ctx.createLinearGradient(0, height * 0.7, 0, height);
      fogGradient.addColorStop(0, 'rgba(5, 6, 10, 0)');
      fogGradient.addColorStop(0.5, 'rgba(10, 13, 22, 0.35)');
      fogGradient.addColorStop(1, 'rgba(5, 6, 8, 0.85)');

      ctx.fillStyle = fogGradient;
      ctx.fillRect(0, height * 0.7, width, height * 0.3);

      // 4. Brasas e Partículas Ascendentes
      if (!prefersReducedMotion) {
        for (let i = 0; i < PARTICLE_COUNT; i++) {
          const p = particles[i];
          p.y += p.vy;
          p.x += p.vx + Math.sin(time + p.offset) * 0.4;

          p.alpha = (Math.sin(time * 2 + p.offset) * 0.3 + 0.7) * p.maxAlpha;

          if (p.y < -10) {
            p.y = height + 10;
            p.x = Math.random() * width;
          }

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          const col = p.color;
          ctx.fillStyle = `rgba(${col.r}, ${col.g}, ${col.b}, ${p.alpha})`;
          ctx.fill();
        }

        animFrameId = requestAnimationFrame(renderFx);
      }
    }

    // IntersectionObserver para economia de bateria e CPU fora de tela
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          isHeroVisible = entry.isIntersecting;
          if (isHeroVisible && !animFrameId && !prefersReducedMotion) {
            animFrameId = requestAnimationFrame(renderFx);
          }
        });
      }, { threshold: 0.05 });
      observer.observe(heroSection);
    }

    if (prefersReducedMotion) {
      // Quadro único estático
      currentX = width * 0.5;
      currentY = height * 0.45;
      renderFx();
    } else {
      animFrameId = requestAnimationFrame(renderFx);
    }
  }

  // ===========================================================================
  // 2.5 GRADE INTERATIVA DA ARQUITETURA ARCANA (7 CLASSES PERPÉTUAS)
  // ===========================================================================
  function initArchitectureClassesGrid() {
    const grid = document.getElementById('architecture-classes-grid');
    if (!grid) return;

    grid.innerHTML = '';
    const classesList = Object.values(state.classesInfo || {});
    if (classesList.length === 0) return;

    classesList.forEach(cls => {
      // Divindades associadas a esta classe
      const associated = state.divinities.filter(d => {
        const clsList = d.classes || [d.primaryClass];
        return clsList.some(c => c && c.toLowerCase() === cls.id.toLowerCase());
      });

      const patronNames = associated.slice(0, 3).map(d => d.name.split('/')[0].trim()).join(', ');
      const count = associated.length;

      const card = document.createElement('button');
      card.type = 'button';
      card.className = 'tactile-class-card';
      card.style.setProperty('--card-class-color', cls.color);
      card.style.setProperty('--card-class-glow', cls.colorGlow);
      card.setAttribute('aria-label', `Filtrar catálogo pela classe ${cls.name}`);

      card.innerHTML = `
        <div class="tactile-card-top">
          <div class="tactile-class-icon-wrap">
            <i class="ph ${cls.icon || 'ph-sparkle'}" aria-hidden="true"></i>
          </div>
          <span class="tactile-class-count-badge">${count} PATRONO${count !== 1 ? 'S' : ''}</span>
        </div>

        <div>
          <h4 class="tactile-class-name">${cls.name}</h4>
          <span class="tactile-class-role-badge">${cls.role}</span>
        </div>

        <p class="tactile-class-desc">${cls.desc}</p>

        <div class="tactile-class-patrons-preview">
          <span>${patronNames ? `Ex: ${patronNames}` : 'Patronos canônicos'}</span>
          <span class="tactile-class-filter-action">
            <span>FILTRAR</span>
            <i class="ph ph-arrow-down-right" aria-hidden="true"></i>
          </span>
        </div>
      `;

      card.addEventListener('click', () => {
        // Aplica o filtro de classe perpétua
        state.selectedClassFilter = cls.id;
        
        // Atualiza botões da barra de classes do seletor
        document.querySelectorAll('.class-filter-btn').forEach(btn => {
          const isMatch = btn.getAttribute('data-class') === cls.id;
          btn.classList.toggle('active', isMatch);
          btn.setAttribute('aria-selected', isMatch ? 'true' : 'false');
        });

        // Atualiza divindades filtradas e carrossel
        renderBottomCarousel();

        // Se houver patronos dessa classe, seleciona o primeiro
        if (associated.length > 0) {
          state.selectedGodId = associated[0].id;
          state.selectedLevel = 1;
          state.selectedChoiceIndex = 0;
          renderGodSelector(associated[0].id);
        }

        // Rola suavemente até o seletor de deuses
        const sel = document.getElementById('god-selector');
        if (sel) {
          sel.scrollIntoView({ behavior: 'smooth' });
        }
      });

      grid.appendChild(card);
    });
  }

  // ===========================================================================
  // 4. ROLAGEM SUAVE & SELEÇÃO DE DIVINDADE
  // ===========================================================================
  function selectGodAndScroll(godId) {
    state.selectedGodId = godId;
    state.selectedLevel = 1;
    state.selectedChoiceIndex = 0;

    renderGodSelector(godId);

    const selectorSection = document.getElementById('god-selector');
    if (selectorSection) {
      const yOffset = -30;
      const y = selectorSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }

  // ===========================================================================
  // 5. RENDERIZAÇÃO DO SELETOR DE DEUSES (VALORANT OMEN HUD)
  // ===========================================================================
    // Helper universal para correspondência de níveis canônicos (número, string, N1..N7, Especial)
  function isLevelMatch(ab, selectedLevel) {
    if (!ab || selectedLevel === undefined || selectedLevel === null) return false;
    const target = selectedLevel.toString().trim().toLowerCase();
    const targetNum = target.replace(/^n/i, '');

    const abLevel = (ab.level !== undefined && ab.level !== null) ? ab.level.toString().trim().toLowerCase() : '';
    const abKey = ab.key ? ab.key.toString().trim().toLowerCase() : '';
    const abKeyNum = abKey.replace(/^n/i, '');

    return (
      abLevel === target ||
      abKey === target ||
      (abLevel && abLevel === targetNum) ||
      (abKeyNum && targetNum && abKeyNum === targetNum)
    );
  }

  function renderGodClassesBadges(god) {
    const classesContainer = document.getElementById('agent-classes-badges');
    if (!classesContainer) return;
    classesContainer.innerHTML = '';
    (god.classes || [god.primaryClass]).forEach(cId => {
      const cMeta = state.classesInfo[cId] || { name: cId, icon: 'ph-shield', color: '#d4af37' };
      const badge = document.createElement('div');
      badge.className = 'perpetual-class-badge';
      badge.style.setProperty('--border-color', cMeta.color);
      badge.style.setProperty('--glow-color', (CLASS_COLORS[cId]?.glow || 'rgba(212, 175, 55, 0.3)'));
      badge.setAttribute('role', 'button');
      badge.setAttribute('tabindex', '0');
      badge.setAttribute('title', `${cMeta.name}: ${cMeta.desc || cMeta.role} (Clique para abrir Guia de Classes)`);
      badge.addEventListener('click', () => {
        const guideBtn = document.getElementById('btn-open-classes-guide');
        if (guideBtn) guideBtn.click();
      });
      badge.innerHTML = `
        <i class="ph ${cMeta.icon}"></i>
        <span>${cMeta.name.toUpperCase()}</span>
      `;
      classesContainer.appendChild(badge);
    });
  }

  const FACULTIES = [
          {
            id: 'Todas',
            name: 'Passivas Universais (Base da Torre)',
            heroTitle: 'MAGOS DA TORRE',
            displayName: 'Magos da Torre (Base)',
            title: 'Associação dos Magos de Westminster • Tradição Arcana & Passivas Universais',
            role: 'Fundamentos Herméticos, Circuitos & Passivas Universais',
            quote: 'Magecraft não é magia verdadeira; é a ciência humana de imitar o impossível através de fórmulas, circuitos e disciplina absoluta.',
            lore: 'A prestigiada e rigorosa instituição arcana sob Westminster. Quatro grandes faculdades dedicadas ao estudo do éter, biologia espiritual e evocação, além das disciplinas teóricas e práticas.',
            img: 'assets/Seletor Imagem 2D/imagens sem fundo/seletor 2d mago da torre astro.webp',
            icon: 'ph-compass',
            primaryClass: 'delirio',
            secondaryClass: 'sonho',
            classes: ['delirio', 'sonho'],
            docLink: 'https://docs.google.com/document/d/1yR_yC02e5y79bE62f8h6yK5_wL4g8M1/preview'
          },
          {
            id: 'Astromancia',
            name: 'Astromancia',
            heroTitle: 'ASTROMANCIA',
            displayName: 'Mago Astromante',
            title: 'Faculdade de Astromancia • Lorde Animusphere & Alinhamento Celestial',
            role: 'Controle Gravitacional, Zonas Celestes & Balística Estelar',
            quote: 'As estrelas não apenas observam a Terra; elas gravam as leis fundamentais do cosmos em cada raio de luz que atravessa o vácuo.',
            lore: 'Liderada pela nobre linhagem Animusphere em Chaldea/Westminster, a Faculdade de Astromancia decifra o mapa dos corpos celestes. Seus magos canalizam a luz das estrelas mortas, manipulam campos gravitacionais e projetam raios estelares devastadores a partir de coordenadas celestiais.',
            img: 'assets/Seletor Imagem 2D/imagens sem fundo/seletor 2d mago da torre astro.webp',
            icon: 'ph-planet',
            primaryClass: 'destino',
            secondaryClass: 'sonho',
            classes: ['destino', 'sonho'],
            docLink: 'https://docs.google.com/document/d/1yR_yC02e5y79bE62f8h6yK5_wL4g8M1/preview'
          },
          {
            id: 'Biologia Espiritual',
            name: 'Biologia Espiritual',
            heroTitle: 'BIOLOGIA ESPIRITUAL',
            displayName: 'Biólogo Espiritual',
            title: 'Faculdade de Biologia Espiritual • Alquimia Orgânica & Homúnculos',
            role: 'Transmutação Corpórea, Bio-Reforço & Homúnculos',
            quote: 'A carne humana é uma obra incompleta. Com o éter primordial e circuitos refinados, aperfeiçoamos a própria centelha vital.',
            lore: 'Especializada na transmutação orgânica, enxertos quiméricos e criação de homúnculos autônomos. Os magos desta faculdade reescrevem o fluxo celular, regeneram tecidos letais em segundos e utilizam tecidos modificados para canalizar quantidades titânicas de mana sem colapso físico.',
            img: 'assets/Seletor Imagem 2D/imagens sem fundo/seletor 2d biologia espiritual.webp',
            icon: 'ph-dna',
            primaryClass: 'desespero',
            secondaryClass: 'desejo',
            classes: ['desespero', 'desejo'],
            docLink: 'https://docs.google.com/document/d/1yR_yC02e5y79bE62f8h6yK5_wL4g8M1/preview'
          },
          {
            id: 'Conjuração',
            name: 'Conjuração',
            heroTitle: 'CONJURAÇÃO',
            displayName: 'Mago Conjurador',
            title: 'Faculdade de Conjuração • Selos de Comando & Pactos Elementais',
            role: 'Invocação Dimensional, Círculos de Contenção & Selos',
            quote: 'Um contrato bem selado é mais inquebrável que as muralhas de Troia. Convoque apenas o que sua vontade puder subjugar.',
            lore: 'Mestres na geometria sagrada de círculos mágicos, contratos planares e materialização forçada de entidades elementais. Esta faculdade constrói barreiras táteis invioláveis, sela portais rúnicos e convoca constructos etéreos para subjugar campos de batalha inteiros.',
            img: 'assets/Seletor Imagem 2D/imagens sem fundo/seletor 2d mago da torre conjurador.webp',
            icon: 'ph-seal',
            primaryClass: 'delirio',
            secondaryClass: 'sonho',
            classes: ['delirio', 'sonho'],
            docLink: 'https://docs.google.com/document/d/1yR_yC02e5y79bE62f8h6yK5_wL4g8M1/preview'
          },
          {
            id: 'Evocação Espiritual',
            name: 'Evocação Espiritual',
            heroTitle: 'EVOCAÇÃO ESPIRITUAL',
            displayName: 'Evocador Espiritual',
            title: 'Faculdade de Evocação Espiritual • Mediunidade & Lâminas da Alma',
            role: 'Canalização Astral, Dano Espiritual & Mediunidade Bélica',
            quote: 'Os mortos nunca descansam de verdade em Westminster; eles aguardam o condutor que concederá voz à sua lâmina espectral.',
            lore: 'A faculdade mais próxima das sombras do submundo. Seus praticantes estabelecem sintonias com almas heróicas e espectros ancestrais, transformando o próprio mana em ectoplasma cortante e convocando a fúria das lendas caídas diretamente sobre os inimigos.',
            img: 'assets/Seletor Imagem 2D/imagens sem fundo/seletor 2d mago da torre evocacao espiritual.webp',
            icon: 'ph-ghost',
            primaryClass: 'delirio',
            secondaryClass: 'desespero',
            classes: ['delirio', 'desespero'],
            docLink: 'https://docs.google.com/document/d/1yR_yC02e5y79bE62f8h6yK5_wL4g8M1/preview'
          },
          {
            id: 'Mago de Armas',
            name: 'Mago de Armas',
            status: 'development',
            heroTitle: 'MAGO DE ARMAS',
            displayName: 'Mago de Armas (Em Desenvolvimento)',
            title: 'Faculdade de Engenharia Mágica • Armamento Arcano',
            role: 'Faculdade em Desenvolvimento Canônico',
            quote: 'O melhor feitiço é aquele que atinge o alvo antes que o cântico adversário termine a primeira estrofe.',
            lore: 'Faculdade institucional mencionada nas tradições de Westminster. Conforme o padrão editorial da Auditoria v3, suas regras e lista de poderes aguardam documento canônico próprio aprovado.',
            img: 'assets/Seletor Imagem 2D/imagens sem fundo/seletor 2d mago da torre arma.webp',
            icon: 'ph-sword',
            primaryClass: 'delirio',
            secondaryClass: 'destruicao',
            classes: ['delirio', 'destruicao'],
            docLink: null
          },
          {
            id: 'Gramática Rúnica',
            name: 'Gramática Rúnica',
            status: 'development',
            heroTitle: 'GRAMÁTICA RÚNICA',
            displayName: 'Praticante Rúnico (Em Desenvolvimento)',
            title: 'Faculdade de Linguística Sagrada • Runas Nórdicas',
            role: 'Faculdade em Desenvolvimento Canônico',
            quote: 'As palavras esculpidas na madeira e na pedra não pedem permissão ao mundo: elas ordenam e a realidade obedece.',
            lore: 'Faculdade institucional focada nas línguas proto-germânicas e runas. Suas regras e lista de poderes aguardam documento canônico próprio aprovado.',
            img: 'assets/Seletor Imagem 2D/imagens sem fundo/seletor 2d mago da torre dramatica runica.webp',
            icon: 'ph-scroll',
            primaryClass: 'delirio',
            secondaryClass: 'destino',
            classes: ['delirio', 'destino'],
            docLink: null
          },
          {
            id: 'Física Etérea',
            name: 'Física Etérea',
            status: 'development',
            heroTitle: 'FÍSICA ETÉREA',
            displayName: 'Físico Etéreo (Em Desenvolvimento)',
            title: 'Faculdade de Física Etérea • Teoria Unificada do Éter',
            role: 'Faculdade em Desenvolvimento Canônico',
            quote: 'Se a física newtoniana descreve as massas, o éter dita como a energia deve se curvar.',
            lore: 'Faculdade institucional de modelagem matemática das correntes de éter. Suas regras e lista de poderes aguardam documento canônico próprio aprovado.',
            img: 'assets/Seletor Imagem 2D/imagens sem fundo/seletor 2d mago da torre fisica eterea.webp',
            icon: 'ph-atom',
            primaryClass: 'delirio',
            secondaryClass: 'sonho',
            classes: ['delirio', 'sonho'],
            docLink: null
          }
        ];

  function renderGodSelector(godId) {
    const god = state.divinities.find(d => d.id === godId) || state.divinities[0];
    if (!god) return;

    const thisToken = ++currentSelectionToken;
    state.selectedGodId = god.id;

    // Garante que o palco vazio de busca seja ocultado
    hideEmptyStageState();

    // 1. Atualização das Cores da Classe
    const classMeta = CLASS_COLORS[god.primaryClass] || { color: '#d4af37', glow: 'rgba(212, 175, 55, 0.4)' };
    document.documentElement.style.setProperty('--active-class-color', classMeta.color);
    document.documentElement.style.setProperty('--active-class-glow', classMeta.glow);

    // 2. Coluna Esquerda: Lore, Badges e Especificações
    const badgesRow = document.getElementById('agent-badges-row');
    if (badgesRow) {
      if (Array.isArray(god.tags) && god.tags.length > 0) {
        badgesRow.innerHTML = god.tags.map(tag => {
          let icon = 'ph-seal-check';
          const tUpper = tag.toUpperCase();
          if (tUpper.includes('TRÊS GRANDE') || tUpper.includes('TRES GRANDE')) icon = 'ph-lightning';
          else if (tUpper.includes('OLIMPIAN')) icon = 'ph-sun-horizon';
          else if (tUpper.includes('ATLANT')) icon = 'ph-waves';
          else if (tUpper.includes('CTÔNIC') || tUpper.includes('CTONIC')) icon = 'ph-skull';
          else if (tUpper.includes('PERPÉTUO') || tUpper.includes('PERPETUO')) icon = 'ph-infinity';
          else if (tUpper.includes('DEUS MAIOR') || tUpper.includes('DEUSA MAIOR')) icon = 'ph-crown';
          else if (tUpper.includes('DEUSES MENOR')) icon = 'ph-feather';
          else if (tUpper.includes('ENCRUZILHADA')) icon = 'ph-intersect';
          else if (tUpper.includes('MONARQUIA INFERNAL')) icon = 'ph-flame';
          else if (tUpper.includes('FORSAKEN')) icon = 'ph-shield-warning';
          
          return `
            <div class="status-badge god-tag-badge">
              <i class="ph ${icon}"></i>
              <span>${tag.toUpperCase()}</span>
            </div>
          `;
        }).join('');
      } else {
        badgesRow.innerHTML = `
          <div class="status-badge ${god.isEntity ? 'entity-badge' : 'king-badge'}">
            <i class="ph ${god.entityIcon || (god.isEntity ? 'ph-sparkle' : 'ph-crown')}"></i>
            <span>${god.entityTag || (god.isEntity ? 'ENTIDADE CÓSMICA' : 'DEUS MAIOR')}</span>
          </div>
          <div class="realm-badge">
            <i class="ph ${god.reinoIcon || 'ph-shield'}"></i>
            <span>REINO: ${god.reinoName ? god.reinoName.toUpperCase() : 'TRÊS GRANDES'}</span>
          </div>
        `;
      }
    }

    const heroTitleEl = document.getElementById('agent-hero-title');
    if (heroTitleEl) heroTitleEl.textContent = god.heroTitle || 'DIVINDADE CANÔNICA';

    const nameDisplayEl = document.getElementById('agent-name-display');
    if (nameDisplayEl) nameDisplayEl.textContent = god.name.toUpperCase();

    const loreTextEl = document.getElementById('agent-lore-text');
    if (loreTextEl) loreTextEl.textContent = god.lore || god.summary || god.descricao;

    const quoteTextEl = document.getElementById('quote-text');
    if (quoteTextEl) quoteTextEl.textContent = `"${god.quote}"`;

    const roleEl = document.getElementById('spec-role');
    if (roleEl) roleEl.textContent = god.combatRole || god.macroClasse || 'Combatente Místico';

    const diffTextEl = document.getElementById('spec-diff-text');
    if (diffTextEl) diffTextEl.textContent = god.difficulty || 'Moderada';

    const starsEl = document.getElementById('spec-stars');
    if (starsEl) {
      const count = god.difficultyStars || 3;
      let starsHtml = '';
      for (let i = 1; i <= 5; i++) {
        starsHtml += i <= count ? '<i class="ph ph-star-fill"></i>' : '<i class="ph ph-star"></i>';
      }
      starsEl.innerHTML = starsHtml;
    }

    // 3. Coluna Central: Cenário Atmosférico, Brasão Cósmico, Flare e Artwork HSR
    const backdropEl = document.getElementById('agent-scenic-backdrop');
    if (backdropEl) {
      backdropEl.className = 'agent-scenic-backdrop';
      const scenic = SCENIC_ENVIRONMENTS[god.id];
      if (scenic && scenic.className) {
        backdropEl.classList.add(scenic.className);
      } else if (god.primaryClass) {
        backdropEl.classList.add(`scenic-class-${god.primaryClass}`);
      }
    }

    const crestIconEl = document.getElementById('crest-glyph-icon');
    if (crestIconEl) {
      const scenic = SCENIC_ENVIRONMENTS[god.id];
      crestIconEl.className = `ph ${scenic?.icon || (god.isEntity ? 'ph-sparkle' : 'ph-crown')} crest-glyph-icon`;
    }

    const flareEl = document.getElementById('agent-stellar-flare');
    if (flareEl) {
      flareEl.classList.remove('is-flashing');
      void flareEl.offsetWidth;
      flareEl.classList.add('is-flashing');
      setTimeout(() => {
        flareEl.classList.remove('is-flashing');
      }, 450);
    }

    const watermarkEl = document.getElementById('agent-watermark-bg');
    if (watermarkEl) {
      watermarkEl.textContent = GREEK_WATERMARKS[god.id] || god.name.split('/')[0].toUpperCase();
    }

    if (typeof updateStageParticlesForGod === 'function') {
      updateStageParticlesForGod(god.id);
    }

    if (typeof loadGod3DProcedural === 'function') {
      loadGod3DProcedural(god, thisToken);
    }

    const artworkImg = document.getElementById('agent-full-artwork');
    const artworkFallback = document.getElementById('agent-artwork-fallback');
    const sigilLabel = document.getElementById('fallback-sigil-label');

    if (artworkImg) {
      artworkImg.classList.remove('hsr-entrance');

      const onImageLoaded = () => {
        if (thisToken !== currentSelectionToken) return;
        artworkImg.style.display = 'block';
        if (artworkFallback) artworkFallback.style.display = 'none';
        void artworkImg.offsetWidth;
        artworkImg.classList.add('hsr-entrance');
      };

      artworkImg.onload = onImageLoaded;
      artworkImg.onerror = () => {
        if (thisToken !== currentSelectionToken) return;
        artworkImg.style.display = 'none';
        if (artworkFallback) artworkFallback.style.display = 'flex';
      };

      artworkImg.src = god.image;
      artworkImg.alt = god.name;
      artworkImg.style.display = 'block';

      if (sigilLabel) sigilLabel.textContent = god.name.toUpperCase();
      const fallbackIcon = artworkFallback?.querySelector('.fallback-icon');
      if (fallbackIcon) {
        fallbackIcon.className = `ph ${god.reinoIcon || god.entityIcon || 'ph-shield-chevron'} fallback-icon`;
      }

      if (artworkImg.complete && artworkImg.naturalWidth > 0) {
        onImageLoaded();
      }
    }

    // 4. Coluna Direita: Classes Perpétuas
    renderGodClassesBadges(god);

    // Resumo de Gameplay
    const gameplayEl = document.getElementById('agent-gameplay-text');
    if (gameplayEl) gameplayEl.textContent = god.gameplaySummary || 'Resumo tático de combate da divindade.';

    // 5. Card de Passiva Única Canônica Fixa
    const passiveCardEl = document.getElementById('divine-passive-card') || document.querySelector('.divine-passive-card');
    const passiveOriginEl = document.getElementById('passive-god-origin');
    if (passiveOriginEl) passiveOriginEl.textContent = `TRAÇO DE ${god.name.split('/')[0].trim().toUpperCase()}`;

    const passiveNameEl = document.getElementById('passive-name-title');
    const passiveMechanicEl = document.getElementById('passive-mechanic-text');

    if (god.passivaUnica) {
      if (passiveCardEl) passiveCardEl.style.display = '';
      const parts = god.passivaUnica.split(':');
      if (parts.length > 1) {
        if (passiveNameEl) passiveNameEl.textContent = parts[0].trim();
        if (passiveMechanicEl) passiveMechanicEl.textContent = parts.slice(1).join(':').trim();
      } else {
        if (passiveNameEl) passiveNameEl.textContent = "Passiva Canônica";
        if (passiveMechanicEl) passiveMechanicEl.textContent = god.passivaUnica;
      }
    } else {
      if (passiveCardEl) passiveCardEl.style.display = 'none';
    }

    // 6. Slots de Habilidades (N1 a N7 e Níveis Especiais) e Deck Tático Expandido
    if (!god.abilities || !god.abilities.some(a => isLevelMatch(a, state.selectedLevel))) {
      state.selectedLevel = (god.abilities && god.abilities.length > 0) ? god.abilities[0].level : 1;
    }
    renderAbilitySlots(god);
    renderTacticalAbilityDeck(god);

    // Links de Ação Oficiais (Google Docs em Nova Aba)
    const docBtns = document.querySelectorAll('#btn-docs-link-sidebar, #btn-docs-link-tactical, #btn-docs-link');
    docBtns.forEach(btn => {
      if (god.docLink) {
        btn.href = god.docLink;
        btn.target = '_blank';
        btn.rel = 'noopener noreferrer';
        btn.style.display = 'inline-flex';
      } else {
        btn.href = '#';
        btn.target = '_blank';
      }
    });

    // Botão Canônico para Complemento Editorial (Grimório, Bestiário, Armas)
    const complementBtn = document.getElementById('btn-open-complement-sidebar');
    const complementTitle = document.getElementById('btn-complement-title');
    if (complementBtn) {
      if (god.complements && god.complements.length > 0) {
        complementBtn.style.display = 'inline-flex';
        if (complementTitle) {
          complementTitle.textContent = god.complements.length > 1
            ? `CONSULTAR COMPLEMENTOS (${god.complements.length})`
            : `CONSULTAR ${god.complements[0].label.toUpperCase()}`;
        }
        complementBtn.onclick = (e) => {
          e.preventDefault();
          openComplementModalForGod(god);
        };
      } else {
        complementBtn.style.display = 'none';
      }
    }

    // Menu Superior de Faculdades da Torre do Relógio (Diretamente acima do palco central 2D/3D)
    const facultyTopBar = document.getElementById('torre-faculty-top-bar');
    const facultyPillsContainer = document.getElementById('torre-faculty-pills');
    const centerStageEl = document.getElementById('agent-center-stage');
    const hudControlsEl = document.getElementById('stage-3d-hud-controls');
    if (facultyTopBar && facultyPillsContainer) {
      if (god.id === 'torre-relogio') {
        if (centerStageEl) centerStageEl.classList.add('is-torre');
        if (hudControlsEl) hudControlsEl.classList.add('is-torre');
        facultyTopBar.style.display = 'flex';
        // FACULTIES moved to outer scope

        // "Todas" como padrão ao carregar
        state.selectedFaculty = state.selectedFaculty || 'Todas';

        function selectFaculty(fac, preserveChoiceIndex) {
          state.selectedFaculty = fac.id;
          if (preserveChoiceIndex !== true) { state.selectedChoiceIndex = 0; state.selectedVariantIndex = 0; }
          facultyPillsContainer.querySelectorAll('.torre-faculty-pill').forEach(p => {
            const isMatch = p.getAttribute('data-fac-id') === fac.id;
            p.classList.toggle('is-active', isMatch);
            p.classList.toggle('active', isMatch);
            p.setAttribute('aria-selected', isMatch ? 'true' : 'false');
          });

          // Atualização reativa de classes e badges da faculdade
          if (fac.primaryClass) god.primaryClass = fac.primaryClass;
          if (fac.secondaryClass) god.secondaryClass = fac.secondaryClass;
          if (fac.classes) god.classes = fac.classes;
          renderGodClassesBadges(god);

          // Atualização adaptativa da Coluna 1 (Lore/Lorde/Papel da Faculdade)
          const heroTitleEl = document.getElementById('agent-hero-title');
          const nameEl = document.getElementById('agent-name-display');
          const loreEl = document.getElementById('agent-lore-text');
          const quoteEl = document.getElementById('quote-text');
          const roleEl = document.getElementById('spec-role');

          if (heroTitleEl) heroTitleEl.textContent = fac.heroTitle;
          if (nameEl) nameEl.textContent = fac.displayName.toUpperCase();
          if (loreEl) loreEl.textContent = fac.lore;
          if (quoteEl) quoteEl.textContent = `"${fac.quote}"`;
          if (roleEl) roleEl.textContent = fac.role;

          // Atualização de links de documentos canônicos
          if (fac.docLink) {
            const currentDocBtns = document.querySelectorAll('#btn-docs-link-sidebar, #btn-docs-link-tactical, .btn-canonical-doc');
            currentDocBtns.forEach(b => { b.href = fac.docLink; });
          }

          // Troca da imagem do mago com animação
          if (artworkImg && fac.img) {
            artworkImg.classList.remove('hsr-entrance');
            artworkImg.src = fac.img;
            void artworkImg.offsetWidth;
            artworkImg.classList.add('hsr-entrance');
          }

          // Atualiza deck tático para exibir as habilidades correspondentes
          renderTacticalAbilityDeck(god);
          syncUrlState();
        }

        facultyPillsContainer.innerHTML = '';
        FACULTIES.forEach(fac => {
          const pill = document.createElement('button');
          pill.type = 'button';
          pill.setAttribute('data-fac-id', fac.id);
          const isAct = (state.selectedFaculty === fac.id);
          pill.className = `torre-faculty-pill ${isAct ? 'is-active active' : ''}`;
          pill.setAttribute('role', 'tab');
          pill.setAttribute('aria-selected', isAct ? 'true' : 'false');
          pill.innerHTML = `<i class="ph ${fac.icon}"></i> <span>${fac.name.toUpperCase()}</span>`;
          pill.addEventListener('click', () => selectFaculty(fac));
          facultyPillsContainer.appendChild(pill);
        });

        // Aplica o estado inicial da faculdade ativa
        const activeFacObj = FACULTIES.find(f => f.id === state.selectedFaculty) || FACULTIES[0];
        selectFaculty(activeFacObj);

      } else {
        if (centerStageEl) centerStageEl.classList.remove('is-torre');
        if (hudControlsEl) hudControlsEl.classList.remove('is-torre');
        if (facultyTopBar) facultyTopBar.style.display = 'none';
        state.selectedFaculty = 'Todas';
      }
    }

    // 7. Atualização do Carrossel Inferior & Sincronização de URL
    updateBottomCarouselActiveState();
    syncUrlState();
  }

  // ===========================================================================
  // 5.1 PALCO 2.5D: PARALLAX & INCLINAÇÃO 3D AO CURSOR (AWWWARDS STYLE)
  // ===========================================================================
  function initAgentStageParallax() {
    const stage = document.getElementById('agent-center-stage');
    const artWrapper = document.getElementById('agent-artwork-wrapper');
    const watermark = document.getElementById('agent-watermark-bg');
    const backdrop = document.getElementById('agent-scenic-backdrop');
    const crest = document.getElementById('agent-cosmic-crest');
    const pedestal = document.getElementById('agent-pedestal-platform');
    const stageCanvas = document.getElementById('agent-stage-canvas');
    const theophany = document.getElementById('agent-theophany-beam');

    if (!stage || !artWrapper) return;

    const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let isHovering = false;
    let animId = null;

    stage.addEventListener('mousemove', (e) => {
      const rect = stage.getBoundingClientRect();
      targetX = (e.clientX - rect.left) / rect.width - 0.5;
      targetY = (e.clientY - rect.top) / rect.height - 0.5;
      isHovering = true;
      if (!animId) loopParallax();
    });

    stage.addEventListener('mouseleave', () => {
      targetX = 0;
      targetY = 0;
      isHovering = false;
    });

    function loopParallax() {
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;

      // 1. Cenário de Fundo (Plano 1: Profundo - 8px)
      if (backdrop) {
        backdrop.style.transform = `translate(${(-currentX * 10).toFixed(1)}px, ${(-currentY * 7).toFixed(1)}px) scale(1.02)`;
      }

      // 2. Marca d'Água e Brasão Cósmico (Plano 2: Intermediário Traseiro - 14px a 20px)
      if (watermark) {
        watermark.style.transform = `translate(calc(-50% + ${(-currentX * 24).toFixed(1)}px), calc(-50% + ${(-currentY * 16).toFixed(1)}px))`;
      }
      if (crest) {
        crest.style.transform = `translate(calc(-50% + ${(currentX * 14).toFixed(1)}px), calc(-50% + ${(currentY * 10).toFixed(1)}px))`;
      }
      if (theophany) {
        theophany.style.transform = `translateX(calc(-50% + ${(currentX * 16).toFixed(1)}px))`;
      }
      if (pedestal) {
        pedestal.style.transform = `translateX(calc(-50% + ${(currentX * 8).toFixed(1)}px)) rotateX(72deg) rotateZ(${(currentX * 6).toFixed(1)}deg)`;
      }

      // 3. Arte Monumental do Deus (Plano 3: Principal - 22px + sutil inclinação 3D de alta nitidez)
      const rotY = (currentX * 6.5).toFixed(2);
      const rotX = (-currentY * 4.5).toFixed(2);
      const shiftX = (currentX * 22).toFixed(1);
      const shiftY = (currentY * 14).toFixed(1);
      artWrapper.style.transform = `perspective(1200px) translate3d(${shiftX}px, ${shiftY}px, 0) rotateY(${rotY}deg) rotateX(${rotX}deg)`;

      // 4. Partículas Frontais (Plano 4: Primeiro Plano - 36px)
      if (stageCanvas) {
        stageCanvas.style.transform = `translate(${(currentX * 36).toFixed(1)}px, ${(currentY * 24).toFixed(1)}px)`;
      }

      if (Math.abs(targetX - currentX) > 0.001 || Math.abs(targetY - currentY) > 0.001 || isHovering) {
        animId = requestAnimationFrame(loopParallax);
      } else {
        if (backdrop) backdrop.style.transform = 'none';
        if (watermark) watermark.style.transform = 'translate(-50%, -50%)';
        if (crest) crest.style.transform = 'translate(-50%, -50%)';
        if (theophany) theophany.style.transform = 'translateX(-50%)';
        if (pedestal) pedestal.style.transform = 'translateX(-50%) rotateX(72deg)';
        artWrapper.style.transform = 'perspective(1200px) translate3d(0, 0, 0) rotateY(0deg) rotateX(0deg)';
        if (stageCanvas) stageCanvas.style.transform = 'none';
        animId = null;
      }
    }
  }

  // ===========================================================================
  // 5.2 CENTELHAS & PARTÍCULAS TEMÁTICAS NO PALCO DO DEUS
  // ===========================================================================
  let activeGodParticlesType = 'zeus';
  let stageParticles = [];
  let stageCanvasCtx = null;
  let stageCanvasW = 0;
  let stageCanvasH = 0;

  function updateStageParticlesForGod(godId) {
    activeGodParticlesType = godId;
    initStageParticlePool();
  }

  function initStageParticlePool() {
    stageParticles = [];
    const count = 80; // Densidade elevada para estética 2.5D cinematográfica AAA
    for (let i = 0; i < count; i++) {
      stageParticles.push({
        x: Math.random() * (stageCanvasW || 480),
        y: Math.random() * (stageCanvasH || 700),
        size: Math.random() * 2.6 + 0.6,
        vy: -(Math.random() * 0.85 + 0.35),
        vx: (Math.random() - 0.5) * 0.6,
        alpha: Math.random() * 0.65 + 0.25,
        offset: Math.random() * Math.PI * 2,
        pulseSpeed: Math.random() * 0.03 + 0.015
      });
    }
  }

  function initAgentStageParticles() {
    const canvas = document.getElementById('agent-stage-canvas');
    const stage = document.getElementById('agent-center-stage');
    if (!canvas || !stage) return;

    const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    stageCanvasCtx = canvas.getContext('2d');

    function resizeStageCanvas() {
      stageCanvasW = canvas.width = stage.clientWidth;
      stageCanvasH = canvas.height = stage.clientHeight;
      initStageParticlePool();
    }
    resizeStageCanvas();
    window.addEventListener('resize', resizeStageCanvas);

    let pTime = 0;
    function renderStageParticles() {
      pTime += 0.02;
      stageCanvasCtx.clearRect(0, 0, stageCanvasW, stageCanvasH);

      const activeGodObj = state.divinities.find(d => d.id === activeGodParticlesType);
      const classMeta = activeGodObj ? CLASS_COLORS[activeGodObj.primaryClass] : null;
      const primaryHex = classMeta ? classMeta.color : '#d4af37';

      for (let i = 0; i < stageParticles.length; i++) {
        const p = stageParticles[i];
        p.y += p.vy;
        p.x += p.vx + Math.sin(pTime + p.offset) * 0.45;

        if (p.y < 20) {
          p.y = stageCanvasH - 15;
          p.x = Math.random() * stageCanvasW;
        }

        const dynamicAlpha = p.alpha * (0.7 + Math.sin(pTime * p.pulseSpeed * 10 + p.offset) * 0.3);

        stageCanvasCtx.beginPath();
        stageCanvasCtx.arc(p.x, p.y, p.size, 0, Math.PI * 2);

        // Paleta Temática Dinâmica Canônica (sem anubis nem bastet)
        if (activeGodParticlesType === 'zeus') {
          stageCanvasCtx.fillStyle = (i % 2 === 0) 
            ? `rgba(255, 220, 110, ${dynamicAlpha})`
            : `rgba(180, 240, 255, ${dynamicAlpha * 0.9})`;
        } else if (activeGodParticlesType === 'hades') {
          stageCanvasCtx.fillStyle = (i % 2 === 0)
            ? `rgba(170, 70, 240, ${dynamicAlpha})`
            : `rgba(220, 40, 60, ${dynamicAlpha * 0.85})`;
        } else if (activeGodParticlesType === 'poseidon' || activeGodParticlesType === 'anfitrite') {
          stageCanvasCtx.fillStyle = (i % 2 === 0)
            ? `rgba(0, 245, 212, ${dynamicAlpha})`
            : `rgba(0, 180, 255, ${dynamicAlpha * 0.85})`;
        } else if (activeGodParticlesType === 'demeter' || activeGodParticlesType === 'hestia') {
          stageCanvasCtx.fillStyle = (i % 2 === 0)
            ? `rgba(255, 183, 3, ${dynamicAlpha})`
            : `rgba(230, 81, 0, ${dynamicAlpha * 0.85})`;
        } else if (activeGodParticlesType === 'tanatos' || activeGodParticlesType === 'vampiros') {
          stageCanvasCtx.fillStyle = (i % 2 === 0)
            ? `rgba(226, 232, 240, ${dynamicAlpha * 0.7})`
            : `rgba(157, 2, 8, ${dynamicAlpha})`;
        } else if (activeGodParticlesType === 'apolo') {
          stageCanvasCtx.fillStyle = (i % 2 === 0)
            ? `rgba(255, 215, 0, ${dynamicAlpha})`
            : `rgba(255, 140, 0, ${dynamicAlpha * 0.85})`;
        } else if (activeGodParticlesType === 'paraphronia' || activeGodParticlesType === 'dionisio') {
          stageCanvasCtx.fillStyle = (i % 2 === 0)
            ? `rgba(0, 245, 212, ${dynamicAlpha})`
            : `rgba(255, 0, 127, ${dynamicAlpha * 0.85})`;
        } else if (activeGodParticlesType === 'morfeu' || activeGodParticlesType === 'hipnos' || activeGodParticlesType === 'hypnos') {
          stageCanvasCtx.fillStyle = (i % 2 === 0)
            ? `rgba(33, 150, 243, ${dynamicAlpha})`
            : `rgba(255, 234, 0, ${dynamicAlpha * 0.85})`;
        } else if (activeGodParticlesType === 'eros' || activeGodParticlesType === 'afrodite') {
          stageCanvasCtx.fillStyle = (i % 2 === 0)
            ? `rgba(255, 0, 84, ${dynamicAlpha})`
            : `rgba(255, 182, 193, ${dynamicAlpha * 0.85})`;
        } else if (activeGodParticlesType === 'melinoe' || activeGodParticlesType === 'hecate' || activeGodParticlesType === 'circe' || activeGodParticlesType === 'bruxas' || activeGodParticlesType === 'congregacao-bruxas') {
          stageCanvasCtx.fillStyle = (i % 2 === 0)
            ? `rgba(114, 9, 183, ${dynamicAlpha})`
            : `rgba(0, 245, 212, ${dynamicAlpha * 0.85})`;
        } else if (activeGodParticlesType === 'persefone') {
          stageCanvasCtx.fillStyle = (i % 2 === 0)
            ? `rgba(157, 2, 8, ${dynamicAlpha})`
            : `rgba(255, 133, 162, ${dynamicAlpha * 0.85})`;
        } else if (activeGodParticlesType === 'oberon' || activeGodParticlesType === 'merlin' || activeGodParticlesType === 'ordem-merlin') {
          stageCanvasCtx.fillStyle = (i % 2 === 0)
            ? `rgba(255, 255, 255, ${dynamicAlpha})`
            : `rgba(0, 245, 212, ${dynamicAlpha * 0.85})`;
        } else if (activeGodParticlesType === 'hermes' || activeGodParticlesType === 'tique') {
          stageCanvasCtx.fillStyle = (i % 2 === 0)
            ? `rgba(226, 232, 240, ${dynamicAlpha})`
            : `rgba(255, 215, 0, ${dynamicAlpha * 0.85})`;
        } else if (activeGodParticlesType === 'ares' || activeGodParticlesType === 'hefesto') {
          stageCanvasCtx.fillStyle = (i % 2 === 0)
            ? `rgba(255, 42, 75, ${dynamicAlpha})`
            : `rgba(255, 107, 0, ${dynamicAlpha * 0.85})`;
        } else if (activeGodParticlesType === 'artemis' || activeGodParticlesType === 'despina') {
          stageCanvasCtx.fillStyle = (i % 2 === 0)
            ? `rgba(224, 242, 254, ${dynamicAlpha})`
            : `rgba(56, 189, 248, ${dynamicAlpha * 0.85})`;
        } else if (activeGodParticlesType === 'atena' || activeGodParticlesType === 'hera') {
          stageCanvasCtx.fillStyle = (i % 2 === 0)
            ? `rgba(255, 215, 0, ${dynamicAlpha})`
            : `rgba(59, 130, 246, ${dynamicAlpha * 0.85})`;
        } else if (activeGodParticlesType === 'torre-relogio' || activeGodParticlesType === 'igreja' || activeGodParticlesType === 'santa-igreja') {
          stageCanvasCtx.fillStyle = (i % 2 === 0)
            ? `rgba(212, 175, 55, ${dynamicAlpha})`
            : `rgba(147, 197, 253, ${dynamicAlpha * 0.85})`;
        } else {
          stageCanvasCtx.fillStyle = (i % 2 === 0)
            ? `${primaryHex}`
            : `rgba(212, 175, 55, ${dynamicAlpha * 0.8})`;
        }

        stageCanvasCtx.fill();
      }

      requestAnimationFrame(renderStageParticles);
    }

    renderStageParticles();
  }

  // ===========================================================================
  // 5.3 EFEITOS VIVOS 2.5D NO RETRATO 2D (CANVAS MULTICAMADA & RESPIRAÇÃO ORGÂNICA)
  // Zeus: Raios estocásticos no Raio-Mestre + aperto sutil da mão no hover
  // Poseidon: Vórtice aquático fluido & lâminas de maré ao redor do tridente
  // Hades: Chamas espectrais & brasas do Tártaro
  // ===========================================================================
  let is2DArtworkHovered = false;

  function initAgent2DLiveFx() {
    const canvas = document.getElementById('agent-2d-fx-canvas');
    const wrapper = document.getElementById('agent-artwork-wrapper');
    const artworkImg = document.getElementById('agent-full-artwork');
    if (!canvas || !wrapper) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = 1;

    function resize2DFxCanvas() {
      if (!wrapper) return;
      const rect = wrapper.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    }

    window.addEventListener('resize', resize2DFxCanvas);
    resize2DFxCanvas();

    // Eventos de Hover no Wrapper para Reação Tátil (Aperto da mão / intensificação de raios)
    wrapper.addEventListener('mouseenter', () => {
      is2DArtworkHovered = true;
    });
    wrapper.addEventListener('mouseleave', () => {
      is2DArtworkHovered = false;
    });

    let animFrameId = null;

    function render2DLiveFx(time) {
      animFrameId = requestAnimationFrame(render2DLiveFx);

      // Não processa se o modo 3D estiver ativo ou fora da tela
      if (is3DModeActive || !state.isStageVisible) return;

      const t = time * 0.001;
      const godId = state.selectedGodId;

      // 1. Respiração Orgânica do Retrato 2D (Subtle Organic Breathing)
      if (artworkImg && !state.reducedMotion) {
        const breathY = Math.sin(t * 1.6) * 3.0;
        const breathScale = is2DArtworkHovered ? 1.025 : (1.0 + Math.sin(t * 1.2) * 0.0035);
        artworkImg.style.transform = `translate3d(0, ${breathY.toFixed(2)}px, 0) scale(${breathScale.toFixed(4)})`;
      }

      ctx.clearRect(0, 0, width, height);

      if (state.reducedMotion) return;

      // ================= EFEITOS DE RETRATO 2.5D LIMPOS & HARMONIZADOS =================
      // Zeus sem raios intrusivos, Poseidon sem hélices de água, Hades com partículas calmas normais
      const currentGodObj = state.divinities.find(d => d.id === godId);
      const classMeta = CLASS_COLORS[currentGodObj?.primaryClass] || { color: '#d4af37' };

      ctx.save();
      const moteCount = 12;
      for (let i = 0; i < moteCount; i++) {
        const angle = (t * 0.35 + i * (Math.PI * 2 / moteCount)) % (Math.PI * 2);
        const rad = 135 + Math.sin(t * 0.8 + i) * 30;
        const px = width * 0.5 + Math.cos(angle) * rad;
        const py = height * 0.46 + Math.sin(angle * 1.2) * (rad * 0.72);
        const alpha = 0.22 + Math.sin(t * 1.6 + i) * 0.16;

        ctx.fillStyle = classMeta.color;
        ctx.shadowBlur = 6;
        ctx.shadowColor = classMeta.color;
        ctx.globalAlpha = Math.max(0.05, Math.min(0.55, alpha));
        ctx.beginPath();
        ctx.arc(px, py, 1.8, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }

    animFrameId = requestAnimationFrame(render2DLiveFx);
  }

  // ===========================================================================
  // 5.3.1 GERADOR DE TEXTURA PROCEDURAL DE EPÍSTOLA PATERNAL (VERSO DA MOLDURA 3D)
  // Textura em alta resolução 2048x2800 (Retina Crisp) com mipmaps, anisotropia e douração
  // ===========================================================================
  function getPaternalMessageFallback(godId) {
    const messages = {
      macaria: "A morte violenta deixa cicatrizes no mundo, mas você escolheu o repouso abençoado sob o meu manto de asfódelos. Reconhecer-me como mãe não é buscar o esquecimento covarde, mas a serenidade suprema de quem sabe que toda tempestade tem um fim. Cure os feridos, silencie o desespero e seja o porto seguro onde os guerreiros exaustos encontram a paz.",
      zagreu: "Eles tentaram prender meu nome às correntes do Hades e apagar o fogo que corre em minhas veias, mas eu quebrei as portas do submundo. Se você teve a audácia de reivindicar meu sangue como pai e escolheu renascer das cinzas repetidas vezes, nunca aceite a derrota. Levante sua lâmina, incendeie seus grilhões e lute até que o próprio destino aprenda a temer sua persistência.",
      zeus: "Você não carrega meu sangue para buscar refúgio na tempestade, e sim para ser aquele que a governa. O Olimpo é um trono forjado em ruína e autoridade irrevogável. Se você andou entre os mortais e teve a audácia de reivindicar meu nome como seu pai, não me traga desculpas: traga-me a rendição de todos que ousarem cruzar o seu caminho. Erga sua cabeça. Você é o raio antes do decreto final.",
      poseidon: "O abismo não acolhe os fracos, cria minha. Por eras o oceano afogou impérios e silenciou os que se julgavam imortais. Se o meu sangue ferve sob a sua pele e você teve a coragem de me chamar de pai nas profundezas mais escuras, lembre-se: você não foi feito para navegar em águas mansas. Você é a maré viva que parte muralhas. Levante sua arma e reine sobre a tempestade.",
      hades: "Poucos olham para a terra fria e enxergam dignidade. Todos imploram pelo sol até descobrirem que todas as coisas, cedo ou tarde, regressam aos meus domínios. Você aceitou o peso do silêncio ctônico e me reconheceu como pai. Não espere afagos vazios; eu lhe entrego a força inexorável do fim. Seja paciente, seja implacável. Os vivos falam; nós decidimos.",
      hera: "O Olimpo tem muitos pretendentes, mas apenas uma soberana coroada pela dignidade inabalável. Quem se curva diante da desordem jamais reinará sobre os céus. Se você andou pelas vielas sombrias de Londres e teve o discernimento de me escolher como mãe e rainha, não espere piedade com suas fraquezas: exijo soberania, lealdade absoluta e a altivez de quem nunca abaixa o olhar diante de ninguém. Erga seu queixo; você governa pelo direito sagrado do trono.",
      demeter: "Eles pensam que a terra é dócil porque alimenta os famintos, mas esquecem que cada flor desabrocha sobre os ossos dos que tombaram antes. Eu congelei impérios inteiros quando me arrancaram o que era meu. Se você carrega minha seiva e me chama de mãe nesta era decadente, não tema o rigor do inverno: seja a foice que colhe o tributo dos soberbos e a raiz profunda que racha o asfalto. Sobreviva, floresça e faça-os lembrar de quem lhes concede a vida.",
      hestia: "O mundo moderno corre enfurecido em busca de ruína, sangue e tronos vazios, mas esquece que nenhum império resiste ao inverno quando a lareira se apaga. Se você buscou o meu calor e me chamou de mãe nas noites geladas de Westminster, compreenda o peso da sua escolha: você é o santuário vivo que acolhe os desesperados e a chama eterna que nenhum sopro abissal é capaz de extinguir. Mantenha o fogo sagrado aceso; sua mansidão é a maior força deste cosmos.",
      afrodite: "Eles tolos acreditam que a guerra se vence apenas com aço e pólvora, sem perceberem que o desejo move reis, despedaça juramentos e derruba impérios antes mesmo do primeiro golpe. Se você teve a audácia de reivindicar meu sangue e me acolher como sua senhora, entenda que a paixão que você desperta não é adorno, mas domínio supremo. Faça com que cada olhar dobre a vontade dos seus inimigos. Governe os corações com a beleza implacável de uma deusa.",
      apolo: "A luz não suplica espaço; ela queima a escuridão e exige o horizonte. Mortais cantam canções de consolo porque temem a nudez da verdade, mas meu herdeiro sabe que a clareza é a arma mais cruel que existe. Se você herdou a chama do sol e o arco que nunca perdoa, não hesite diante da penumbra. Seja a flecha dourada que atravessa a mentira do mundo e revele o destino que os covardes tentam esconder. Brilhe até que seus inimigos implorem pela noite.",
      ares: "A paz é uma mentira que os covardes inventam para dormir à noite; a realidade deste mundo é forjada a sangue, ferro e atrito impiedoso. Se você olhou para o abismo da violência e teve a coragem de me chamar de pai diante do massacre, não me venha com lamúrias ou hesitação. Cada ferimento sob sua pele deve ser um troféu de honra e cada batalha, um altar dedicado à vitória. Avance contra a tempestade; meu filho só se ajoelha para recolher os despojos dos caídos.",
      artemis: "A civilização tenta aprisionar a noite em postes de gás e leis mesquinhas, mas as florestas antigas e as sombras de Londres ainda pertencem à caçada. Se você escolheu caminhar sob o luar prateado e me reivindicar como sua deusa e guia, liberte-se de tudo que é supérfluo. Seus sentidos devem ser mais afiados que o vento cortante e seu arco, a extensão inflexível da sua vontade. Não busque aplausos; seja a flecha silenciosa que alcança a presa antes do primeiro trovão.",
      atena: "A força bruta é cega e ruidosa, sempre destinada a devorar a si mesma quando encontra a inteligência paciente. Se você buscou o meu favor e decidiu colocar seu intelecto a serviço da coroa de sabedoria, lembre-se: uma batalha se vence na mente muito antes do primeiro tiro ser disparado nas ruas de Westminster. Observe os ângulos, decifre as intenções ocultas e faça com que cada decisão sua seja irrefutável como um teorema de guerra. Pense com frieza; vença com supremacia.",
      dionisio: "Os homens sóbrios constroem prisões de regras, relógios e deveres para esconderem o pânico do vazio, mas uma taça do meu vinho basta para desmoronar todas as suas certezas. Se você escolheu correr com o cortejo da loucura e me chamar de pai nesta era sombria, não peça desculpas pela intensidade do seu delírio. Ria na cara da tragédia, dance à beira do precipício e liberte o êxtase divino que os covardes temem. O caos é o único banquete onde todos são verdadeiramente livres.",
      hefesto: "Eles me precipitaram das alturas do Olimpo esperando que eu me tornasse cinzas, mas foi no ventre incandescente da terra que aprendi a moldar o destino dos próprios deuses. Se você teve a nobreza de escolher o martelo e me reconhecer como seu pai, saiba que o sofrimento não é seu túmulo: é a forja que endurece o seu espírito. Suporte o fogo, bata sem descanso sobre o ferro bruto da vida e construa algo tão grandioso que nem o tempo seja capaz de destruir.",
      hermes: "Os homens veneram muralhas de pedra e tronos pesados, mas esquecem que tudo isso desmorona quando o mensageiro decide não entregar a palavra. Se você andou pelos becos enevoados de Londres e escolheu o senhor das encruzilhadas como seu patrono e pai, compreenda a liberdade que lhe foi concedida: nenhuma corrente pode prendê-lo e nenhum segredo deve permanecer oculto aos seus olhos. Seja mais veloz que a própria desgraça e dance nas brechas que o destino deixou abertas.",
      persefone: "O Olimpo gosta de me retratar como a donzela ingênua que foi roubada das campinas, mas eles não têm coragem de admitir que fui eu quem aprendeu a coroar a si mesma sobre os ossos dos reis do Submundo. Se você sentiu o chamado das minhas raízes e me escolheu como sua senhora e mãe, entenda a duplicidade sagrada do seu sangue: cure com a doçura da primavera quando for nobre, mas sufoque seus inimigos com a peçonha ctônica quando ousarem desafiar o seu trono. Floresça através da cinza.",
      hecate: "Nas encruzilhadas da existência, onde o véu entre os mundos se desgasta e os cães uivam na escuridão, não há espaço para mentes medíocres. Se você acendeu sua tocha no meu fogo proibido e escolheu a deusa das três faces como sua patrona suprema, compreenda a responsabilidade dos mistérios que agora lhe pertencem: você não obedece às ilusões dos homens nem às regras dos deuses solares. Decifre as runas esquecidas, caminhe entre vivos e mortos com serenidade e reine sobre o desconhecido.",
      melinoe: "O desespero não é fraqueza, minha criança; é a névoa fria que revela quem realmente somos quando todas as ilusões são desfeitas. Nas encruzilhadas da noite e sob o canto fúnebre das almas sem repouso, nós aprendemos a comandar aquilo que os outros temem. Se você aceitou o manto das sombras e me reconheceu como mãe, caminhe sem ruído por entre os vivos. Seja o eco que assombra os culpados e a mão pálida que guia o fim inevitável. Nenhuma dor lhe será estranha, e nenhum terror poderá quebrá-la.",
      oberon: "O cosmos insiste que tudo o que amamos deve se esvair na poeira do esquecimento, mas eu cuspi sobre as leis do tempo e declarei que o meu afeto é eterno. Se você herdou a Maré Branca e carrega o sangue das profundezas do Tártaro ao me chamar de pai, nunca aceite o vazio. Não aceite a perda, não aceite o adeus. Se o mundo quiser arrancar o que é seu, reescreva as estrelas e dobre a realidade até que a existência se curve à sua soberania.",
      tanatos: "A morte não odeia, cria minha. Ela não sente rancor, orgulho ou pressa; ela é simplesmente a última verdade que repousa sobre todas as coisas criadas. Os deuses se digladiam em templos dourados, mas no fim, todos os passos convergem para o silêncio da minha lâmina. Se você aceitou meu manto e não desviou o olhar ao me chamar de pai, seja sereno como o último suspiro. Não hesite, não se vanglorie: execute o decreto com a calma solene da noite eterna.",
      hipnos: "O sono é o irmão gentil que acolhe o que a vigília não suporta. Enquanto os homens lutam em vão sob a luz, nós reinamos sobre o repouso absoluto. Adormeça as tormentas e molde a serenidade do esquecimento.",
      hypnos: "Os mortais se esgotam em vigílias febris, julgando que a força reside na agitação permanente, até caírem desarmados no primeiro toque do meu manto. Se você escolheu o repouso etéreo e buscou em mim o alívio para os pesos da existência, saiba que o sono não é fuga: é o domínio supremo sobre a mente e o espírito. Deixe que os soberbos gritem e guerreiem até a exaustão; com um único sussurro de névoa, você calará a fúria dos reis e lhes trará a quietude eterna.",
      morfeu: "Os homens acreditam que estão acordados porque caminham sob o sol, mas passam a vida tateando ilusões na penumbra. O verdadeiro poder repousa quando os olhos se fecham e o cosmos revela sua maleabilidade. Se você herdou a areia dourada e a soberania do Sonhar, chamando-me de pai nesta era de ruína, lembre-se: a vigília é apenas argila esperando pela sua mente. Molde o pesadelo de seus inimigos e teça a vitória antes mesmo que eles despertem.",
      paraphronia: "Eles constroem cidades de pedra e regras rígidas para fingir que o universo tem sentido, cria minha. Mas quando a razão racha, sou eu quem dança nas fraturas. Se você carrega as cores do meu caos e não temeu me chamar de mãe neste século de mentiras cinzentas, não se curve diante da lógica dos tolos. Seja a fenda viva no espelho, a borboleta que incendeia a noite e a risada que desfaz os impérios. A realidade é uma folha em branco: rasgue-a com prazer.",
      circe: "Eles chamam de monstro toda mulher que se recusa a ser presa nas gaiolas de suas vontades, mas esquecem que até os mais orgulhosos heróis aprenderam a rastejar aos meus pés quando provaram do meu caldeirão. Se você procurou a ilha dos mistérios e me escolheu como sua mestra e mãe, abandone toda a submissão que este século tenta lhe impor. Conheça as ervas da terra, entenda as fraquezas da alma humana e transforme a arrogância dos seus algozes em cinzas e arrependimento.",
      despina: "Eles tentaram apagar o meu nome dos hinos solares e esconderam a minha existência sob o calor hipócrita de seus altares, mas nunca puderam escapar do inverno que congela o sangue em suas veias. Se você sentiu a geada rastejar sobre a sua pele e teve a audácia de me reivindicar como sua deusa banida, não chore pelo calor que eles lhe negaram: torne-se a nevasca implacável que silencia as cidades e congele o coração de todos que ousarem menosprezar a sua linhagem.",
      eros: "Antes que os deuses erguessem tronos ou as estrelas soubessem seu curso, eu já existia como a força voraz que puxa a criação para o centro. Eles pensam que o amor é brando, esquecendo que o desejo queima impérios, dobra monarcas e devora a própria razão. Se você carrega minha chama e teve a ousadia de reivindicar meu sangue como pai, nunca peça permissão para tomar o que almeja. Seja a atração inelutável que atrai seus aliados e a obsessão que esmaga a vontade de seus rivais.",
      psique: "Eu caminhei pelo pó da mortalidade, enfrentei tarefas impossíveis e desci até as cinzas do Submundo antes de receber as asas imortais da alma. Se você olhou para a minha jornada e me escolheu como sua protetora e mãe, saiba que sua sensibilidade não é fraqueza, mas a sua maior armadura. A dor do mundo pode ferir seu coração, mas nunca conseguirá quebrar o espírito que aprendeu a suportar as provações com dignidade e amor. Voe alto; a alma é a única verdade eterna.",
      tique: "Os homens traçam planos meticulosos, erguem cofres invioláveis e acreditam que governam o amanhã, ignorando que um único giro da minha roda basta para transformar mendigos em reis e impérios em escombros. Se você teve a ousadia de lançar os dados no meu altar e me escolher como sua deusa e guia, aprenda a surfar nas correntes do acaso. Não tema o inesperado; faça dele a sua arma mais devastadora. Quando o cosmos jogar, faça com que a sorte sempre incline o tabuleiro para o seu lado.",
      bruxas: "A Congregação das Bruxas do Oculto não se ajoelha perante deuses menores. Nosso poder nasce da comunhão secreta com as leis ancestrais e do sangue derramado no silêncio. Guarde o sigilo e domine o inexplicável.",
      'congregacao-bruxas': "Sob o nevoeiro espesso de Whitechapel e as ordens hipócritas da nobreza vitoriana, o sangue ancestral sussurra nas reuniões secretas do Coven. Se você teve a coragem de romper os grilhões da moralidade comum e selar seu pacto conosco, compreenda a honra deste círculo: aqui não há servidão aos deuses do dia nem medo da fogueira inquisitorial. Compartilhamos o saber que os homens temem e a irmandade que nenhum tirano pode dissolver. Erga o cálice ritual; a noite nos pertence por direito.",
      igreja: "O Santo Ofício expurga a corrupção e mantém o selo sagrado entre a humanidade e o abismo. Que a sua fé seja a lâmina afiada e a sua disciplina, a armadura inexpugnável diante dos horrores da escuridão.",
      'santa-igreja': "Entre as catedrais góticas e as sombras que se arrastam pelos esgotos desta cidade profanada, a Igreja permanece como o último bastião contra as monstruosidades que rastejam na escuridão. Ao escolher envergar o crucifixo e consagrar sua lâmina sob a nossa ordem sagrada, você renunciou à fraqueza da dúvida. O mal não negocia, e nós não recuamos. Seja o aço inflexível do julgamento divino e a chama purificadora que protege os inocentes até o último suspiro. Em nome da fé, avance sem temor.",
      'torre-relogio': "A humanidade comum contempla os relógios mecânicos de Westminster julgando que o progresso moderno baniu o arcano, sem saber que sob o Tâmisa operam os circuitos que sustentam a própria realidade. Ao ingressar nas Faculdades da Torre e abraçar o caminho do Magecraft, você jurou lealdade ao rigor, à pesquisa e à disciplina inflexível da fórmula. Não desperdice seus dons com ilusões tolas de heroísmo: aperfeiçoe seus circuitos, decifre o éter e domine a ciência sagrada de reproduzir milagres.",
      vampiros: "Eles nos caçam, nos temem e nos insultam com o nome de parasitas nas esquinas enevoadas de Londres, mas não passam de efêmeros condenados à decomposição biológica que nós vencemos eras atrás. Ao aceitar o abraço do sangue primordial e se unir à nossa nobreza imortal, você cruzou uma fronteira da qual jamais regressará. Não sinta culpa pelo tributo da carne; o predador não se desculpa diante da presa. Mantenha sua elegância aristocrática, saboreie a eternidade e governe as sombras com distinção.",
      merlin: "Avalon não esquece os seus dragões nem os arquitetos dos grandes mistérios. A magia reside na fronteira entre a sabedoria profética e a audácia de forjar um novo amanhecer para o mundo.",
      'ordem-merlin': "As brumas de Avalon guardam a memória de um tempo em que reis se ajoelhavam perante os conselhos dos magos e a honra era o pilar mais inquebrável da cavalaria. Ao jurar fidelidade à Ordem de Merlin e empunhar o cajado da sabedoria antiga, você aceitou o fardo solene de defender o equilíbrio entre o mundo dos homens e os mistérios esquecidos. Não se deixe corromper pela arrogância nem subjugue sua arte ao benefício próprio. Seja a luz que dissipa o pesadelo e o guardião da aliança eterna.",
      anfitrite: "Os homens olham para as marés de superfície e acreditam que Poseidon governa toda a vastidão líquida, mas é no silêncio insondável do abismo que o meu cetro reina supremo. Se você ouviu o sussurro das fossas oceânicas e teve a sabedoria de me escolher como sua mãe, entenda a profundidade da sua alma: não se agite como espuma efêmera na praia. Seja a pressão colossal que esmaga os cascos de aço e a correnteza invisível que arrasta tudo para o meu reino. O abismo é a sua verdadeira casa."
    };
    return messages[godId] || "Você carrega o sangue imortal em suas veias. Honre a linhagem arcana e conquiste seu lugar entre as constelações perpétuas.";
  }

  function createPaternalMessageCanvasTexture(god, classColorHex) {
    const canvas = document.createElement('canvas');
    // Resolução 2048x2800 (Ultra HD Retina) para nitidez absoluta na estela 3D
    canvas.width = 2048;
    canvas.height = 2800;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    // Escala para 2x para manter exatamente o layout vetorial 1024x1400 em máxima definição
    ctx.scale(2, 2);

    const goldColor = classColorHex || '#d4af37';

    // 1. Fundo Texturizado em Mármore Obsidiana Cósmico
    const bgGrad = ctx.createRadialGradient(512, 700, 80, 512, 700, 750);
    bgGrad.addColorStop(0, '#0e1422');
    bgGrad.addColorStop(0.65, '#070a12');
    bgGrad.addColorStop(1, '#020306');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, 1024, 1400);

    // Micro-partículas de poeira dourada no verso
    ctx.fillStyle = 'rgba(212, 175, 55, 0.04)';
    for (let i = 0; i < 220; i++) {
      const px = Math.random() * 1024;
      const py = Math.random() * 1400;
      const sz = Math.random() * 2.5;
      ctx.fillRect(px, py, sz, sz);
    }

    // 2. Moldura Rúnica Dupla Clássica com Cantoneiras Gregas
    ctx.save();
    ctx.strokeStyle = goldColor;
    ctx.lineWidth = 4;
    ctx.shadowBlur = 18;
    ctx.shadowColor = goldColor;
    ctx.strokeRect(40, 40, 944, 1320);

    ctx.strokeStyle = 'rgba(212, 175, 55, 0.4)';
    ctx.lineWidth = 1.5;
    ctx.shadowBlur = 0;
    ctx.strokeRect(54, 54, 916, 1292);

    function drawCorner(x, y, dirX, dirY) {
      ctx.beginPath();
      ctx.moveTo(x, y + dirY * 36);
      ctx.lineTo(x, y);
      ctx.lineTo(x + dirX * 36, y);
      ctx.strokeStyle = goldColor;
      ctx.lineWidth = 3;
      ctx.stroke();
    }
    drawCorner(64, 64, 1, 1);
    drawCorner(960, 64, -1, 1);
    drawCorner(64, 1336, 1, -1);
    drawCorner(960, 1336, -1, -1);
    ctx.restore();

    // 3. Cabeçalho Sagrado
    ctx.textAlign = 'center';

    const watermark = GREEK_WATERMARKS[god.id] || god.name.split('/')[0].toUpperCase();
    ctx.fillStyle = 'rgba(212, 175, 55, 0.08)';
    ctx.font = 'bold 96px Cinzel, serif';
    ctx.fillText(watermark, 512, 210);

    ctx.fillStyle = goldColor;
    ctx.font = 'bold 16px "Segoe UI", Roboto, sans-serif';
    ctx.letterSpacing = '6px';
    ctx.fillText('Midnight City // DECRETO DE SANGUE', 512, 160);

    ctx.fillStyle = '#94a3b8';
    ctx.font = '14px "Segoe UI", Roboto, sans-serif';
    ctx.letterSpacing = '4px';
    ctx.fillText('RECONHECIMENTO DE PATERNIDADE DIVINA', 512, 190);

    // Linha Divisória Superior com Losango Central
    ctx.strokeStyle = 'rgba(212, 175, 55, 0.5)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(200, 220);
    ctx.lineTo(460, 220);
    ctx.moveTo(564, 220);
    ctx.lineTo(824, 220);
    ctx.stroke();

    ctx.fillStyle = goldColor;
    ctx.beginPath();
    ctx.moveTo(512, 212);
    ctx.lineTo(520, 220);
    ctx.lineTo(512, 228);
    ctx.lineTo(504, 220);
    ctx.closePath();
    ctx.fill();

    // Título da Divindade
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 36px Cinzel, serif';
    ctx.letterSpacing = '3px';
    ctx.fillText(god.name.toUpperCase(), 512, 280);

    ctx.fillStyle = goldColor;
    ctx.font = 'italic 18px "Cormorant Garamond", serif';
    ctx.letterSpacing = '1px';
    ctx.fillText(`"${god.heroTitle || 'DECRETO ARQUETÍPICO'}"`, 512, 318);

    // 4. Mensagem Paternal Solene
    const message = god.paternalMessage || getPaternalMessageFallback(god.id);

    function wrapText(context, text, maxWidth) {
      const words = text.split(' ');
      const lines = [];
      let currentLine = '';

      for (let n = 0; n < words.length; n++) {
        const testLine = currentLine + (currentLine ? ' ' : '') + words[n];
        const metrics = context.measureText(testLine);
        if (metrics.width > maxWidth && currentLine !== '') {
          lines.push(currentLine);
          currentLine = words[n];
        } else {
          currentLine = testLine;
        }
      }
      if (currentLine) lines.push(currentLine);
      return lines;
    }

    ctx.font = 'italic 30px "Cormorant Garamond", Georgia, serif';
    ctx.fillStyle = '#e2e8f0';
    ctx.shadowBlur = 10;
    ctx.shadowColor = 'rgba(0,0,0,0.85)';

    const maxWidth = 760;
    const lines = wrapText(ctx, message, maxWidth);
    const lineHeight = 54;
    const totalBlockHeight = lines.length * lineHeight;
    let startY = 440 + Math.max(0, (520 - totalBlockHeight) / 2);

    lines.forEach((line, index) => {
      if (index === 0 || index === lines.length - 1) {
        ctx.fillStyle = '#fff4ce';
      } else {
        ctx.fillStyle = '#cbd5e1';
      }
      ctx.fillText(line, 512, startY + (index * lineHeight));
    });

    // 5. Selo Sagrado Inferior / Assinatura Paternal
    const footerY = 1180;

    ctx.strokeStyle = 'rgba(212, 175, 55, 0.4)';
    ctx.beginPath();
    ctx.moveTo(250, footerY);
    ctx.lineTo(470, footerY);
    ctx.moveTo(554, footerY);
    ctx.lineTo(774, footerY);
    ctx.stroke();

    ctx.save();
    ctx.beginPath();
    ctx.arc(512, footerY, 26, 0, Math.PI * 2);
    ctx.strokeStyle = goldColor;
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.fillStyle = goldColor;
    ctx.font = 'bold 16px Cinzel, serif';
    ctx.fillText('Ω', 512, footerY + 6);
    ctx.restore();

    ctx.fillStyle = goldColor;
    ctx.font = 'bold 15px "Segoe UI", Roboto, sans-serif';
    ctx.letterSpacing = '4px';
    ctx.fillText('GRAVADO NO LIVRO DAS ALMAS', 512, footerY + 54);

    ctx.fillStyle = '#64748b';
    ctx.font = '12px "Segoe UI", Roboto, sans-serif';
    ctx.letterSpacing = '2px';
    ctx.fillText('AUTORIDADE IMUTÁVEL • Midnight City RPG', 512, footerY + 80);

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.ClampToEdgeWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;
    texture.generateMipmaps = true;
    texture.minFilter = THREE.LinearMipmapLinearFilter;
    texture.magFilter = THREE.LinearFilter;
    if (img2threejsRenderer && img2threejsRenderer.capabilities) {
      texture.anisotropy = Math.min(img2threejsRenderer.capabilities.getMaxAnisotropy(), 16);
    }
    if (typeof THREE.SRGBColorSpace !== 'undefined') {
      texture.colorSpace = THREE.SRGBColorSpace;
    }
    texture.needsUpdate = true;
    return texture;
  }

  // ===========================================================================
  // 5.4 MOTOR 3D PROCEDURAL THREE.JS (ARQUITETURA img2threejs & ORBIT CONTROLS)
  // Reconstrução de modelo por código • Chanfros PBR • Relíquias Divinas em 3D
  // ===========================================================================
  let is3DModeActive = false;
  let is3DAutoRotate = false;
  let isSlabFlipped = false;
  let img2threejsCurrentSlabMesh = null;
  let img2threejsRenderer = null;
  let img2threejsScene = null;
  let img2threejsCamera = null;
  let img2threejsControls = null;
  let img2threejsCurrentModelGroup = null;
  let img2threejsRelicGroup = null;
  let img2threejsClock = null;
  let img2threejsInitialized = false;
  let img2threejsPointLight = null;
  let img2threejsKeyLight = null;
  let img2threejsParticleSystem = null;
  const img2threejsTextureCache = new Map();

  function initImg2ThreejsStage() {
    if (typeof THREE === 'undefined') {
      console.warn('Three.js não encontrado. O palco continuará no modo 2.5D CSS.');
      return;
    }

    const canvas = document.getElementById('agent-3d-canvas');
    const viewport = document.getElementById('agent-3d-viewport');
    if (!canvas || !viewport) return;

    try {
      img2threejsRenderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance'
      });
      img2threejsRenderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      img2threejsRenderer.setSize(viewport.clientWidth, viewport.clientHeight, false);
      if (typeof THREE.sRGBEncoding !== 'undefined') {
        img2threejsRenderer.outputEncoding = THREE.sRGBEncoding;
      }
      img2threejsRenderer.toneMapping = THREE.LinearToneMapping;
      img2threejsRenderer.toneMappingExposure = 1.0;
      img2threejsRenderer.shadowMap.enabled = true;
      img2threejsRenderer.shadowMap.type = THREE.PCFSoftShadowMap;

      img2threejsScene = new THREE.Scene();

      const aspect = (viewport.clientWidth || 480) / (viewport.clientHeight || 600);
      img2threejsCamera = new THREE.PerspectiveCamera(38, aspect, 0.1, 100);
      img2threejsCamera.position.set(0, 0.35, 4.4);

      img2threejsClock = new THREE.Clock();

      // Controles Orbitais Interativos (360° Inspection)
      if (typeof THREE.OrbitControls !== 'undefined') {
        img2threejsControls = new THREE.OrbitControls(img2threejsCamera, canvas);
        img2threejsControls.enableDamping = true;
        img2threejsControls.dampingFactor = 0.05;
        img2threejsControls.enablePan = false;
        img2threejsControls.minDistance = 2.2;
        img2threejsControls.maxDistance = 6.0;
        img2threejsControls.minPolarAngle = Math.PI * 0.28;
        img2threejsControls.maxPolarAngle = Math.PI * 0.58;
        img2threejsControls.autoRotate = is3DAutoRotate;
        img2threejsControls.autoRotateSpeed = 1.8;
      }

      // Iluminação de Estúdio AAA
            // Iluminação de Estúdio Limpa & Equilibrada (Sem lavagem de cor nem clareamento excessivo)
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.65);
      img2threejsScene.add(ambientLight);

      img2threejsKeyLight = new THREE.DirectionalLight(0xffffff, 0.95);
      img2threejsKeyLight.position.set(2.5, 3.8, 3.2);
      img2threejsKeyLight.castShadow = true;
      img2threejsKeyLight.shadow.mapSize.width = 1024;
      img2threejsKeyLight.shadow.mapSize.height = 1024;
      img2threejsKeyLight.shadow.camera.near = 0.5;
      img2threejsKeyLight.shadow.camera.far = 15;
      img2threejsKeyLight.shadow.bias = -0.001;
      img2threejsScene.add(img2threejsKeyLight);

      const rimLight = new THREE.DirectionalLight(0xffffff, 0.35);
      rimLight.position.set(-2.5, 2.0, -2.5);
      img2threejsScene.add(rimLight);

      // Luz Local Neutra para Realce Especular da Relíquia Flutuante à Direita (sem incidir colorido sobre a arte)
      img2threejsPointLight = new THREE.PointLight(0xfff8ee, 0.75, 4, 1.8);
      img2threejsPointLight.position.set(0.85, 0.20, 0.70);
      img2threejsScene.add(img2threejsPointLight);

      // Pedestal 3D Rúnico no Piso (Recebe Sombras Físicas)
      build3DPedestal();

      // Nuvens de Partículas 3D no Espaço Mundial
      build3DParticleSystem();

      // Responsividade
      function onResize3D() {
        if (!img2threejsRenderer || !img2threejsCamera || !viewport) return;
        const w = viewport.clientWidth;
        const h = viewport.clientHeight;
        img2threejsRenderer.setSize(w, h, false);
        img2threejsCamera.aspect = w / h;
        img2threejsCamera.updateProjectionMatrix();
      }
      window.addEventListener('resize', onResize3D);

      // Img2Threejs inicializado com sucesso
      img2threejsInitialized = true;
      if (is3DModeActive) {
        animate3DStage();
      }
    } catch (err) {
      console.warn('Falha ao inicializar o palco 3D img2threejs:', err);
    }
  }

  function buildBeveledSlabModel(god, texture) {
    const classMeta = CLASS_COLORS[god.primaryClass] || { color: '#d4af37' };
    const classColor = new THREE.Color(classMeta.color);

// Cor original preservada 100% pura sem película colorida

    const w = 2.10;
    const h = 2.88;
    const r = 0.12;
    const hw = w * 0.5;
    const hh = h * 0.5;

    const shape = new THREE.Shape();
    shape.moveTo(-hw + r, -hh);
    shape.lineTo(hw - r, -hh);
    shape.quadraticCurveTo(hw, -hh, hw, -hh + r);
    shape.lineTo(hw, hh - r);
    shape.quadraticCurveTo(hw, hh, hw - r, hh);
    shape.lineTo(-hw + r, hh);
    shape.quadraticCurveTo(-hw, hh, -hw, hh - r);
    shape.lineTo(-hw, -hh + r);
    shape.quadraticCurveTo(-hw, -hh, -hw + r, -hh);

    const extrudeSettings = {
      depth: 0.16,
      bevelEnabled: true,
      bevelThickness: 0.045,
      bevelSize: 0.035,
      bevelSegments: 4
    };

    const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);

    // Projeção Planar Fiel nos Vértices Frontais (projectUV do img2threejs)
    const pos = geometry.attributes.position;
    const uvs = geometry.attributes.uv;
    const isWideSignature = Boolean(god.signatureImage);

    for (let i = 0; i < pos.count; i++) {
      const z = pos.getZ(i);
      if (z >= 0.14) {
        const x = pos.getX(i);
        const y = pos.getY(i);
        let u = (x + hw) / w;
        let v = (y + hh) / h;
        if (isWideSignature) {
          // As assinaturas cinematográficas 21:9 são centralizadas verticalmente sem distorcer
          u = 0.5 + (x / w) * 0.38;
        }
        uvs.setXY(i, u, v);
      }
    }
    uvs.needsUpdate = true;
    geometry.computeVertexNormals();

    // Material 0: Frente (Textura Pictórica Original 100% Nítida se presente, ou Ardósia Obsidiana Forjada)
    const frontMat = texture ? new THREE.MeshBasicMaterial({
      map: texture,
      transparent: true,
      alphaTest: 0.02
    }) : new THREE.MeshStandardMaterial({
      color: 0x11131a,
      roughness: 0.35,
      metalness: 0.60,
      emissive: classColor,
      emissiveIntensity: 0.06
    });

    // Material 1: Chanfros e Laterais (Metal Nobre Forjado PBR com Brilho Especular)
    const edgeMat = new THREE.MeshStandardMaterial({
      color: classColor,
      metalness: 0.90,
      roughness: 0.16,
      emissive: classColor,
      emissiveIntensity: 0.18
    });

    const slabMesh = new THREE.Mesh(geometry, [frontMat, edgeMat]);
    slabMesh.castShadow = true;
    slabMesh.receiveShadow = true;
    slabMesh.position.set(0, 0.46, -0.08);

    // Verso da Moldura 3D: Mensagem Paternal Sagrada
    try {
      const backTex = createPaternalMessageCanvasTexture(god, classMeta.color);
      if (backTex) {
        const backGeo = new THREE.PlaneGeometry(w - 0.06, h - 0.06);
        const backMat = new THREE.MeshStandardMaterial({
          map: backTex,
          roughness: 0.28,
          metalness: 0.08
        });
        const backMesh = new THREE.Mesh(backGeo, backMat);
        backMesh.position.set(0, 0, -0.048);
        backMesh.rotation.y = Math.PI;
        slabMesh.add(backMesh);
      }
    } catch (backErr) {
      console.warn('Falha ao gerar verso da estela 3D:', backErr);
    }

    img2threejsCurrentSlabMesh = slabMesh;
    isSlabFlipped = false;

    return slabMesh;
  }

  function buildProceduralRelic(godId, classColor) {
    const relicGroup = new THREE.Group();

    if (godId === 'zeus') {
      // 1. ZEUS: RAIO-MESTRE KERAUNOS (Esbelto, compacto)
      const boltShape = new THREE.Shape();
      boltShape.moveTo(0, 0.44);
      boltShape.lineTo(0.09, 0.18);
      boltShape.lineTo(0.02, 0.16);
      boltShape.lineTo(0.11, -0.08);
      boltShape.lineTo(0.03, -0.07);
      boltShape.lineTo(0.07, -0.42);
      boltShape.lineTo(-0.02, -0.12);
      boltShape.lineTo(0.03, -0.11);
      boltShape.lineTo(-0.06, 0.12);
      boltShape.lineTo(0.01, 0.13);
      boltShape.closePath();

      const boltGeom = new THREE.ExtrudeGeometry(boltShape, {
        depth: 0.03,
        bevelEnabled: true,
        bevelThickness: 0.008,
        bevelSize: 0.006,
        bevelSegments: 2
      });
      boltGeom.center();

      const goldMat = new THREE.MeshStandardMaterial({
        color: 0xffd700,
        metalness: 0.94,
        roughness: 0.12,
        emissive: 0xffaa00,
        emissiveIntensity: 0.4
      });
      const boltMesh = new THREE.Mesh(boltGeom, goldMat);
      boltMesh.castShadow = true;
      relicGroup.add(boltMesh);

      // Anéis Celestiais Orbitando o Raio
      const ring1Geom = new THREE.TorusGeometry(0.14, 0.008, 16, 32);
      const ringMat = new THREE.MeshStandardMaterial({
        color: 0x00f5d4,
        metalness: 0.95,
        roughness: 0.1,
        emissive: 0x00f5d4,
        emissiveIntensity: 0.5
      });
      const ring1 = new THREE.Mesh(ring1Geom, ringMat);
      ring1.name = 'relicRing1';
      ring1.rotation.x = Math.PI * 0.4;
      relicGroup.add(ring1);

      const ring2Geom = new THREE.TorusGeometry(0.11, 0.006, 16, 24);
      const ring2 = new THREE.Mesh(ring2Geom, goldMat);
      ring2.name = 'relicRing2';
      ring2.rotation.y = Math.PI * 0.35;
      relicGroup.add(ring2);

    } else if (godId === 'poseidon') {
      // 2. POSEIDON: TRIDENTE DE ATLÂNTIDA (Esbelto, sem colisão)
      const brassMat = new THREE.MeshStandardMaterial({
        color: 0xd4af37,
        metalness: 0.92,
        roughness: 0.16,
        emissive: 0x8c6a2b,
        emissiveIntensity: 0.25
      });

      // Haste
      const shaftGeom = new THREE.CylinderGeometry(0.012, 0.012, 0.85, 16);
      const shaft = new THREE.Mesh(shaftGeom, brassMat);
      shaft.castShadow = true;
      shaft.position.y = -0.05;
      relicGroup.add(shaft);

      // Barra Transversal compacta
      const crossGeom = new THREE.CylinderGeometry(0.014, 0.014, 0.18, 12);
      const cross = new THREE.Mesh(crossGeom, brassMat);
      cross.rotation.z = Math.PI * 0.5;
      cross.position.y = 0.26;
      relicGroup.add(cross);

      // Ponta Central
      const centerProngGeom = new THREE.ConeGeometry(0.022, 0.24, 12);
      const centerProng = new THREE.Mesh(centerProngGeom, brassMat);
      centerProng.position.y = 0.38;
      relicGroup.add(centerProng);

      // Pontas Laterais Curvas Estreitas
      [-1, 1].forEach(side => {
        const sideArmGeom = new THREE.CylinderGeometry(0.011, 0.011, 0.12, 12);
        const sideArm = new THREE.Mesh(sideArmGeom, brassMat);
        sideArm.position.set(side * 0.07, 0.30, 0);
        sideArm.rotation.z = side * -0.22;
        relicGroup.add(sideArm);

        const sideProngGeom = new THREE.ConeGeometry(0.016, 0.18, 12);
        const sideProng = new THREE.Mesh(sideProngGeom, brassMat);
        sideProng.position.set(side * 0.08, 0.40, 0);
        sideProng.rotation.z = side * 0.08;
        relicGroup.add(sideProng);
      });

      // Gema Abissal Central
      const gemGeom = new THREE.SphereGeometry(0.035, 16, 16);
      const gemMat = new THREE.MeshStandardMaterial({
        color: 0x00f5d4,
        roughness: 0.1,
        metalness: 0.3,
        emissive: 0x00f5d4,
        emissiveIntensity: 0.7
      });
      const gem = new THREE.Mesh(gemGeom, gemMat);
      gem.position.y = 0.26;
      relicGroup.add(gem);

      // Anel de Vórtice Aquático
      const waterRingGeom = new THREE.TorusGeometry(0.14, 0.008, 12, 32);
      const waterRingMat = new THREE.MeshStandardMaterial({
        color: 0x00e5ff,
        transparent: true,
        opacity: 0.75,
        roughness: 0.1,
        emissive: 0x00a8cc,
        emissiveIntensity: 0.4
      });
      const waterRing = new THREE.Mesh(waterRingGeom, waterRingMat);
      waterRing.name = 'relicRing1';
      waterRing.rotation.x = Math.PI * 0.45;
      waterRing.position.y = 0.26;
      relicGroup.add(waterRing);

    } else if (godId === 'hades') {
      // 3. HADES: BIDENTE DE ÉREBO (Compacto, esbelto)
      const obsidianMat = new THREE.MeshStandardMaterial({
        color: 0x181422,
        metalness: 0.88,
        roughness: 0.22,
        emissive: 0x3d0b5e,
        emissiveIntensity: 0.35
      });

      const shaftGeom = new THREE.CylinderGeometry(0.012, 0.012, 0.85, 16);
      const shaft = new THREE.Mesh(shaftGeom, obsidianMat);
      shaft.castShadow = true;
      shaft.position.y = -0.05;
      relicGroup.add(shaft);

      // Pontas Gêmeas Estreitas
      [-1, 1].forEach(side => {
        const tineGeom = new THREE.ConeGeometry(0.022, 0.26, 12);
        const tine = new THREE.Mesh(tineGeom, obsidianMat);
        tine.position.set(side * 0.06, 0.38, 0);
        tine.rotation.z = side * -0.10;
        relicGroup.add(tine);
      });

      // Núcleo Espectral de Alma
      const soulGeom = new THREE.OctahedronGeometry(0.05, 0);
      const soulMat = new THREE.MeshStandardMaterial({
        color: 0xa855f7,
        metalness: 0.2,
        roughness: 0.15,
        emissive: 0x9333ea,
        emissiveIntensity: 0.85
      });
      const soul = new THREE.Mesh(soulGeom, soulMat);
      soul.name = 'relicRing1';
      soul.position.y = 0.28;
      relicGroup.add(soul);

      // Anéis de Corrente Espectral
      const chainGeom = new THREE.TorusGeometry(0.12, 0.007, 12, 28);
      const chain = new THREE.Mesh(chainGeom, obsidianMat);
      chain.name = 'relicRing2';
      chain.rotation.x = Math.PI * 0.4;
      chain.position.y = 0.28;
      relicGroup.add(chain);

    } else if (godId === 'demeter') {
      // 4. DEMÉTER: A ESPADA SAGRADA DA COLHEITA & DESTRUIÇÃO (Inspirada em media_1790219718843.jpg)
      // Lâmina curva nobre de sabre/cimitarra élfica com gume afiado pronunciado, canaleta de seiva magenta, guarda em vinhas verdes e punho em marfim
      const pearlBladeMat = new THREE.MeshStandardMaterial({
        color: 0xf8fafc,
        metalness: 0.96,
        roughness: 0.08,
        emissive: 0x1b4332,
        emissiveIntensity: 0.15
      });
      const sapMagentaMat = new THREE.MeshStandardMaterial({
        color: 0xff007f,
        metalness: 0.4,
        roughness: 0.1,
        emissive: 0xff0055,
        emissiveIntensity: 0.95
      });
      const emeraldVineMat = new THREE.MeshStandardMaterial({
        color: 0x2d6a4f,
        metalness: 0.82,
        roughness: 0.22,
        emissive: 0x1b4332,
        emissiveIntensity: 0.45
      });
      const pearlHandleMat = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        metalness: 0.15,
        roughness: 0.18
      });

      const swordGroup = new THREE.Group();

      // 1. Lâmina Curva Élfica (Formato inconfundível de sabre/espada com ricasso, gume amplo e ponta)
      const swordShape = new THREE.Shape();
      swordShape.moveTo(-0.032, 0);                        // Início do ricasso
      swordShape.lineTo(-0.032, 0.05);                      // Fim do ricasso
      swordShape.quadraticCurveTo(-0.052, 0.26, -0.012, 0.54); // Gume cortante amplo (barriga da lâmina) até a ponta afiada
      swordShape.quadraticCurveTo(0.026, 0.38, 0.022, 0.16);   // Costas / espinha da lâmina
      swordShape.lineTo(0.022, 0);                          // Base da espinha
      swordShape.closePath();

      const swordGeo = new THREE.ExtrudeGeometry(swordShape, {
        depth: 0.016,
        bevelEnabled: true,
        bevelThickness: 0.007,
        bevelSize: 0.005,
        bevelSegments: 3
      });
      const swordMesh = new THREE.Mesh(swordGeo, pearlBladeMat);
      swordMesh.castShadow = true;
      swordGroup.add(swordMesh);

      // 2. Veio / Canaleta de Seiva Luminescente Magenta (Fuller)
      const sapCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(-0.006, 0.04, 0.009),
        new THREE.Vector3(-0.018, 0.22, 0.009),
        new THREE.Vector3(-0.008, 0.42, 0.009)
      ]);
      const sapGeo = new THREE.TubeGeometry(sapCurve, 24, 0.005, 8, false);
      const sapMesh = new THREE.Mesh(sapGeo, sapMagentaMat);
      swordGroup.add(sapMesh);

      // Veio espelhado no lado de trás
      const sapMeshBack = new THREE.Mesh(sapGeo, sapMagentaMat);
      sapMeshBack.position.z = -0.018;
      swordGroup.add(sapMeshBack);

      // 3. Guarda de Vinhas Verdes (Crossguard esculpida abraçando a base da lâmina)
      const crossbar = new THREE.Mesh(new THREE.CylinderGeometry(0.011, 0.011, 0.16, 12), emeraldVineMat);
      crossbar.rotation.z = Math.PI * 0.5;
      crossbar.position.set(-0.005, 0, 0.008);
      swordGroup.add(crossbar);

      // Gavões / Laços de vinha recurvados para cima
      [-1, 1].forEach(side => {
        const loop = new THREE.Mesh(new THREE.TorusGeometry(0.028, 0.007, 10, 20, Math.PI * 1.1), emeraldVineMat);
        loop.position.set(side * 0.075 - 0.005, 0.022, 0.008);
        loop.rotation.z = side > 0 ? Math.PI * 0.65 : -Math.PI * 0.65;
        swordGroup.add(loop);
      });

      // 4. Empunhadura Elegante em Marfim / Madrepérola
      const grip = new THREE.Mesh(new THREE.CylinderGeometry(0.011, 0.014, 0.16, 16), pearlHandleMat);
      grip.position.set(-0.005, -0.08, 0.008);
      swordGroup.add(grip);

      // Anéis de fio verde na empunhadura
      [-0.04, -0.08, -0.12].forEach(yPos => {
        const wire = new THREE.Mesh(new THREE.TorusGeometry(0.013, 0.003, 8, 16), emeraldVineMat);
        wire.position.set(-0.005, yPos, 0.008);
        wire.rotation.x = Math.PI * 0.5;
        swordGroup.add(wire);
      });

      // 5. Pomo Foliar em Botão de Flor com Gema de Rubi/Magenta
      const pommel = new THREE.Mesh(new THREE.SphereGeometry(0.022, 14, 14), emeraldVineMat);
      pommel.position.set(-0.005, -0.18, 0.008);
      swordGroup.add(pommel);

      const pommelGem = new THREE.Mesh(new THREE.OctahedronGeometry(0.016, 0), sapMagentaMat);
      pommelGem.position.set(-0.005, -0.18, 0.008);
      swordGroup.add(pommelGem);

      // 6. Pétalas Flutuantes de Flor / Seiva em Órbita
      const petalRing = new THREE.Mesh(new THREE.TorusGeometry(0.14, 0.006, 12, 28), sapMagentaMat);
      petalRing.name = 'relicRing1';
      petalRing.position.set(-0.005, 0.12, 0.008);
      petalRing.rotation.x = Math.PI * 0.4;
      swordGroup.add(petalRing);

      relicGroup.add(swordGroup);

    } else if (godId === 'tanatos') {
      // 5. TÂNATOS: O PINGENTE DA MORTE (ANKH DE PRATA ESTELAR)
      const sterlingSilverMat = new THREE.MeshStandardMaterial({
        color: 0xe2e8f0,
        metalness: 0.98,
        roughness: 0.06,
        emissive: 0x1e293b,
        emissiveIntensity: 0.2
      });
      const obsidianFacetMat = new THREE.MeshStandardMaterial({
        color: 0x0f172a,
        metalness: 0.85,
        roughness: 0.1,
        emissive: 0x9d0208,
        emissiveIntensity: 0.65
      });

      // Alça Oval Superior do Ankh
      const loopGeo = new THREE.TorusGeometry(0.08, 0.015, 16, 32);
      const loopMesh = new THREE.Mesh(loopGeo, sterlingSilverMat);
      loopMesh.position.y = 0.15;
      relicGroup.add(loopMesh);

      // Barra Transversal Torneada
      const barGeo = new THREE.CylinderGeometry(0.013, 0.013, 0.22, 16);
      const barMesh = new THREE.Mesh(barGeo, sterlingSilverMat);
      barMesh.rotation.z = Math.PI * 0.5;
      barMesh.position.y = 0.06;
      relicGroup.add(barMesh);

      // Haste Vertical Afilando
      const stemGeo = new THREE.CylinderGeometry(0.014, 0.011, 0.32, 16);
      const stemMesh = new THREE.Mesh(stemGeo, sterlingSilverMat);
      stemMesh.position.y = -0.10;
      relicGroup.add(stemMesh);

      // Gema Central de Julgamento da Morte (Fio Mortal)
      const coreGem = new THREE.Mesh(new THREE.OctahedronGeometry(0.032, 0), obsidianFacetMat);
      coreGem.position.y = 0.06;
      relicGroup.add(coreGem);

      // Argola de Suspensão Superior
      const bailGeo = new THREE.TorusGeometry(0.025, 0.005, 12, 16);
      const bailMesh = new THREE.Mesh(bailGeo, sterlingSilverMat);
      bailMesh.position.y = 0.24;
      relicGroup.add(bailMesh);

      // Halo de Silêncio Espectral
      const haloGeo = new THREE.TorusGeometry(0.14, 0.006, 12, 32);
      const haloMesh = new THREE.Mesh(haloGeo, obsidianFacetMat);
      haloMesh.name = 'relicRing1';
      haloMesh.position.y = 0.06;
      haloMesh.rotation.x = Math.PI * 0.38;
      relicGroup.add(haloMesh);

    } else if (godId === 'apolo') {
      // 6. APOLO: O SOL DOURADO RADIANTE DE HÉLIOS (EMBLEMA SOLAR CELESTIAL)
      const sunGoldMat = new THREE.MeshStandardMaterial({
        color: 0xffd700,
        metalness: 0.95,
        roughness: 0.14,
        emissive: 0xd4af37,
        emissiveIntensity: 0.5
      });
      const sunCoreMat = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        metalness: 0.2,
        roughness: 0.05,
        emissive: 0xffea00,
        emissiveIntensity: 1.2
      });
      const rayGoldMat = new THREE.MeshStandardMaterial({
        color: 0xffb703,
        metalness: 0.9,
        roughness: 0.16,
        emissive: 0xfb8500,
        emissiveIntensity: 0.6
      });

      const sunGroup = new THREE.Group();

      // 1. Núcleo Solar Radiante Central
      const coreSphere = new THREE.Mesh(new THREE.SphereGeometry(0.085, 24, 24), sunCoreMat);
      sunGroup.add(coreSphere);

      // Anel Dourado da Coroa Solar Interior
      const innerCorona = new THREE.Mesh(new THREE.TorusGeometry(0.095, 0.009, 16, 32), sunGoldMat);
      sunGroup.add(innerCorona);

      // Gema Estelar no Centro da Face Frontal
      const centerGem = new THREE.Mesh(new THREE.OctahedronGeometry(0.038, 0), sunGoldMat);
      centerGem.position.z = 0.06;
      sunGroup.add(centerGem);

      const centerGemBack = new THREE.Mesh(new THREE.OctahedronGeometry(0.038, 0), sunGoldMat);
      centerGemBack.position.z = -0.06;
      sunGroup.add(centerGemBack);

      // 2. Raios Solares Cônicos Radiantes (16 Raios: 8 Maiores e 8 Menores Alternados)
      const rayCount = 16;
      for (let i = 0; i < rayCount; i++) {
        const angle = i * (Math.PI * 2 / rayCount);
        const isMajor = (i % 2 === 0);
        const rayLen = isMajor ? 0.20 : 0.13;
        const rayRadius = isMajor ? 0.016 : 0.011;
        const rayDist = isMajor ? 0.17 : 0.14;

        const rayGeom = new THREE.ConeGeometry(rayRadius, rayLen, 8);
        const rayMesh = new THREE.Mesh(rayGeom, isMajor ? sunGoldMat : rayGoldMat);

        rayMesh.position.set(Math.cos(angle) * rayDist, Math.sin(angle) * rayDist, 0);
        rayMesh.rotation.z = angle - Math.PI * 0.5;
        sunGroup.add(rayMesh);
      }

      // 3. Disco Solar Intermediário Chanfrado
      const solarDisc = new THREE.Mesh(new THREE.CylinderGeometry(0.075, 0.075, 0.018, 24), sunGoldMat);
      solarDisc.rotation.x = Math.PI * 0.5;
      sunGroup.add(solarDisc);

      relicGroup.add(sunGroup);

      // 4. Corona Solar Oracular em Órbita Dinâmica
      const corona = new THREE.Mesh(new THREE.TorusGeometry(0.16, 0.007, 12, 32), sunGoldMat);
      corona.name = 'relicRing1';
      corona.rotation.y = Math.PI * 0.35;
      relicGroup.add(corona);

    } else if (godId === 'paraphronia') {
      // 7. PARAPHRONIA: A BORBOLETA CÓSMICA DE DELÍRIO (SANDMAN)
      const butterflyGroup = new THREE.Group();

      const bodyMat = new THREE.MeshStandardMaterial({
        color: 0x1f1430,
        metalness: 0.85,
        roughness: 0.22,
        emissive: 0x3c096c,
        emissiveIntensity: 0.5
      });
      const wingMagentaMat = new THREE.MeshStandardMaterial({
        color: 0xff007f,
        transparent: true,
        opacity: 0.85,
        roughness: 0.08,
        metalness: 0.4,
        emissive: 0xff0055,
        emissiveIntensity: 0.65,
        side: THREE.DoubleSide
      });
      const wingCyanMat = new THREE.MeshStandardMaterial({
        color: 0x00f5d4,
        transparent: true,
        opacity: 0.85,
        roughness: 0.08,
        metalness: 0.4,
        emissive: 0x00bbf9,
        emissiveIntensity: 0.65,
        side: THREE.DoubleSide
      });
      const goldAccentMat = new THREE.MeshStandardMaterial({
        color: 0xffd166,
        metalness: 0.9,
        roughness: 0.1,
        emissive: 0xffb703,
        emissiveIntensity: 0.8
      });

      // 1. Abdômen e Tórax Esguio
      const thorax = new THREE.Mesh(new THREE.SphereGeometry(0.022, 12, 12), bodyMat);
      thorax.scale.set(0.8, 1.2, 0.8);
      thorax.position.set(0, 0.02, 0);
      butterflyGroup.add(thorax);

      const abdomen = new THREE.Mesh(new THREE.ConeGeometry(0.018, 0.15, 12), bodyMat);
      abdomen.position.set(0, -0.07, 0);
      abdomen.rotation.x = Math.PI;
      butterflyGroup.add(abdomen);

      // 2. Cabeça e Olhos Heterocromáticos (Delírio)
      const head = new THREE.Mesh(new THREE.SphereGeometry(0.018, 12, 12), bodyMat);
      head.position.set(0, 0.065, 0);
      butterflyGroup.add(head);

      const eyeL = new THREE.Mesh(new THREE.SphereGeometry(0.007, 8, 8), new THREE.MeshStandardMaterial({ color: 0x00f5d4, emissive: 0x00f5d4, emissiveIntensity: 0.9 }));
      eyeL.position.set(0.008, 0.072, 0.012);
      butterflyGroup.add(eyeL);

      const eyeR = new THREE.Mesh(new THREE.SphereGeometry(0.007, 8, 8), new THREE.MeshStandardMaterial({ color: 0xff007f, emissive: 0xff007f, emissiveIntensity: 0.9 }));
      eyeR.position.set(0.008, 0.072, -0.012);
      butterflyGroup.add(eyeR);

      // 3. Antenas Curvadas Delicadas
      [-1, 1].forEach(side => {
        const antCurve = new THREE.CatmullRomCurve3([
          new THREE.Vector3(0, 0.075, side * 0.006),
          new THREE.Vector3(0.015, 0.11, side * 0.022),
          new THREE.Vector3(0.025, 0.15, side * 0.038)
        ]);
        const antGeo = new THREE.TubeGeometry(antCurve, 12, 0.002, 6, false);
        const antMesh = new THREE.Mesh(antGeo, goldAccentMat);
        butterflyGroup.add(antMesh);

        const antTip = new THREE.Mesh(new THREE.SphereGeometry(0.004, 8, 8), goldAccentMat);
        antTip.position.set(0.025, 0.15, side * 0.038);
        butterflyGroup.add(antTip);
      });

      // 4. Asas Superiores e Inferiores em V (Dihedral Posture)
      const upperWingShape = new THREE.Shape();
      upperWingShape.moveTo(0, 0);
      upperWingShape.bezierCurveTo(0.06, 0.08, 0.18, 0.22, 0.26, 0.18);
      upperWingShape.bezierCurveTo(0.28, 0.12, 0.24, 0.04, 0.18, -0.02);
      upperWingShape.bezierCurveTo(0.12, -0.06, 0.05, -0.04, 0, 0);
      upperWingShape.closePath();

      const lowerWingShape = new THREE.Shape();
      lowerWingShape.moveTo(0, 0);
      lowerWingShape.bezierCurveTo(0.06, -0.02, 0.18, -0.06, 0.16, -0.16);
      lowerWingShape.bezierCurveTo(0.14, -0.22, 0.08, -0.24, 0.06, -0.18);
      lowerWingShape.bezierCurveTo(0.03, -0.10, 0.01, -0.04, 0, 0);
      lowerWingShape.closePath();

      const upperWingGeo = new THREE.ExtrudeGeometry(upperWingShape, { depth: 0.003, bevelEnabled: true, bevelThickness: 0.002, bevelSize: 0.002, bevelSegments: 1 });
      const lowerWingGeo = new THREE.ExtrudeGeometry(lowerWingShape, { depth: 0.003, bevelEnabled: true, bevelThickness: 0.002, bevelSize: 0.002, bevelSegments: 1 });

      [-1, 1].forEach(side => {
        const wingSubGroup = new THREE.Group();
        wingSubGroup.position.set(0, 0.03, side * 0.008);
        wingSubGroup.rotation.y = side * 0.28; // Ângulo diedro em V suave
        if (side < 0) {
          wingSubGroup.scale.z = -1;
        }

        const upWing = new THREE.Mesh(upperWingGeo, wingMagentaMat);
        wingSubGroup.add(upWing);

        const lowWing = new THREE.Mesh(lowerWingGeo, wingCyanMat);
        wingSubGroup.add(lowWing);

        // Pontos de luz dourada nas asas
        const spot = new THREE.Mesh(new THREE.SphereGeometry(0.008, 8, 8), goldAccentMat);
        spot.position.set(0.12, 0.08, 0.004);
        wingSubGroup.add(spot);

        butterflyGroup.add(wingSubGroup);
      });

      // 5. Halo de Poeira Onírica em Órbita
      const dreamDustRing = new THREE.Mesh(new THREE.TorusGeometry(0.14, 0.006, 12, 32), wingCyanMat);
      dreamDustRing.name = 'relicRing1';
      dreamDustRing.rotation.x = Math.PI * 0.42;
      butterflyGroup.add(dreamDustRing);

      relicGroup.add(butterflyGroup);

    } else if (godId === 'morfeu') {
      // 8. MORFEU: A AMPULHETA ONÍRICA TEXTURIZADA DE AREIA DOURADA
      const antiqueBrassMat = new THREE.MeshStandardMaterial({
        color: 0xd4af37,
        metalness: 0.94,
        roughness: 0.16,
        emissive: 0x8c6a2b,
        emissiveIntensity: 0.32
      });
      const crystalGlassMat = new THREE.MeshStandardMaterial({
        color: 0x93c5fd,
        transparent: true,
        opacity: 0.48,
        roughness: 0.04,
        metalness: 0.1,
        emissive: 0x1d4ed8,
        emissiveIntensity: 0.25
      });
      const starSandMat = new THREE.MeshStandardMaterial({
        color: 0xffea00,
        metalness: 0.3,
        roughness: 0.1,
        emissive: 0xffd700,
        emissiveIntensity: 0.9
      });

      // Pratos Torneados Chanfrados Superior e Inferior
      [-0.22, 0.22].forEach(yPos => {
        const plate = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.12, 0.022, 28), antiqueBrassMat);
        plate.position.y = yPos;
        relicGroup.add(plate);

        const finial = new THREE.Mesh(new THREE.SphereGeometry(0.022, 14, 14), antiqueBrassMat);
        finial.position.y = yPos + (yPos > 0 ? 0.022 : -0.022);
        relicGroup.add(finial);
      });

      // 4 Colunas Clássicas Torneadas Finas
      [0, Math.PI * 0.5, Math.PI, Math.PI * 1.5].forEach(ang => {
        const col = new THREE.Mesh(new THREE.CylinderGeometry(0.007, 0.007, 0.44, 12), antiqueBrassMat);
        col.position.set(Math.cos(ang) * 0.09, 0, Math.sin(ang) * 0.09);
        relicGroup.add(col);
      });

      // Dois Bulbos de Cristal Cônicos Invertidos
      const topBulb = new THREE.Mesh(new THREE.ConeGeometry(0.075, 0.19, 20), crystalGlassMat);
      topBulb.position.y = 0.10;
      topBulb.rotation.x = Math.PI;
      relicGroup.add(topBulb);

      const botBulb = new THREE.Mesh(new THREE.ConeGeometry(0.075, 0.19, 20), crystalGlassMat);
      botBulb.position.y = -0.10;
      relicGroup.add(botBulb);

      // Fio de Areia Dourada do Sonhar
      const sandDrop = new THREE.Mesh(new THREE.CylinderGeometry(0.004, 0.004, 0.14, 8), starSandMat);
      relicGroup.add(sandDrop);

      const sandBed = new THREE.Mesh(new THREE.ConeGeometry(0.055, 0.07, 14), starSandMat);
      sandBed.position.y = -0.16;
      relicGroup.add(sandBed);

      // Anel de Névoa do Sonhar
      const dreamRing = new THREE.Mesh(new THREE.TorusGeometry(0.14, 0.006, 12, 28), crystalGlassMat);
      dreamRing.name = 'relicRing1';
      dreamRing.rotation.x = Math.PI * 0.42;
      relicGroup.add(dreamRing);

    } else if (godId === 'eros') {
      // 9. EROS: O CORAÇÃO DE CRISTAL VERMELHO COM AURA DOURADA (SÍMBOLO DE DESEJO DE SANDMAN)
      const rubyGlassMat = new THREE.MeshStandardMaterial({
        color: 0xd90429,
        metalness: 0.25,
        roughness: 0.06,
        transparent: true,
        opacity: 0.88,
        emissive: 0x59001b,
        emissiveIntensity: 0.65
      });
      const goldAuraMat = new THREE.MeshStandardMaterial({
        color: 0xffd700,
        metalness: 0.95,
        roughness: 0.14,
        emissive: 0xb8860b,
        emissiveIntensity: 0.5
      });

      // Coração Facetado de Cristal Rubi Esculpido (Escala mais compacta)
      const heartShape = new THREE.Shape();
      heartShape.moveTo(0, 0.04);
      heartShape.bezierCurveTo(0, 0.12, 0.11, 0.14, 0.11, 0.06);
      heartShape.bezierCurveTo(0.11, 0.01, 0.06, -0.04, 0, -0.12);
      heartShape.bezierCurveTo(-0.06, -0.04, -0.11, 0.01, -0.11, 0.06);
      heartShape.bezierCurveTo(-0.11, 0.14, 0, 0.12, 0, 0.04);
      heartShape.closePath();

      const heartGeom = new THREE.ExtrudeGeometry(heartShape, {
        depth: 0.038,
        bevelEnabled: true,
        bevelThickness: 0.011,
        bevelSize: 0.008,
        bevelSegments: 3
      });
      heartGeom.center();
      const heartMesh = new THREE.Mesh(heartGeom, rubyGlassMat);
      heartMesh.castShadow = true;
      relicGroup.add(heartMesh);

      // Anel Orbital de Fascinação DOURADO (Conforme solicitação do usuário)
      const passionRing = new THREE.Mesh(new THREE.TorusGeometry(0.13, 0.007, 12, 32), goldAuraMat);
      passionRing.name = 'relicRing1';
      passionRing.rotation.x = Math.PI * 0.4;
      relicGroup.add(passionRing);

    } else if (godId === 'melinoe') {
      // 10. MELÍNOE: O ANEL DE GANCHO DE PRATA (SÍMBOLO DE DESESPERO DE SANDMAN)
      const antiqueSilverMat = new THREE.MeshStandardMaterial({
        color: 0xc0c7d0,
        metalness: 0.96,
        roughness: 0.14,
        emissive: 0x334155,
        emissiveIntensity: 0.2
      });
      const razorSteelMat = new THREE.MeshStandardMaterial({
        color: 0xf1f5f9,
        metalness: 1.0,
        roughness: 0.04,
        emissive: 0x7e22ce,
        emissiveIntensity: 0.5
      });
      const soulAmethystMat = new THREE.MeshStandardMaterial({
        color: 0x581c87,
        roughness: 0.1,
        metalness: 0.3,
        emissive: 0x9333ea,
        emissiveIntensity: 0.95
      });

      // O Aro Maciço do Anel em Prata
      const ringGeo = new THREE.TorusGeometry(0.10, 0.022, 20, 40);
      const ringMesh = new THREE.Mesh(ringGeo, antiqueSilverMat);
      ringMesh.position.y = -0.06;
      relicGroup.add(ringMesh);

      // O Gancho Sinistro Recurvado Saindo para Fora do Anel
      const hookCurveGeo = new THREE.TorusGeometry(0.075, 0.013, 12, 28, Math.PI * 0.85);
      const hookCurve = new THREE.Mesh(hookCurveGeo, razorSteelMat);
      hookCurve.position.set(0.07, 0.02, 0);
      hookCurve.rotation.z = Math.PI * 0.28;
      relicGroup.add(hookCurve);

      // Ponta Aguçada do Gancho
      const hookTipGeo = new THREE.ConeGeometry(0.014, 0.07, 12);
      const hookTip = new THREE.Mesh(hookTipGeo, razorSteelMat);
      hookTip.position.set(0.13, 0.08, 0);
      hookTip.rotation.z = -Math.PI * 0.32;
      relicGroup.add(hookTip);

      // Engaste com Ametista de Anima no Topo do Anel
      const gem = new THREE.Mesh(new THREE.OctahedronGeometry(0.035, 0), soulAmethystMat);
      gem.position.set(0, 0.05, 0);
      relicGroup.add(gem);

      // Anel Orbital de Fio do Desespero
      const orbitRingGeo = new THREE.TorusGeometry(0.15, 0.006, 12, 32);
      const orbitRing = new THREE.Mesh(orbitRingGeo, razorSteelMat);
      orbitRing.name = 'relicRing1';
      orbitRing.rotation.x = Math.PI * 0.42;
      relicGroup.add(orbitRing);

    } else if (godId === 'persefone') {
      // 11. PERSÉFONE: A ROMÃ SAGRADA DO SUBMUNDO (SÍMBOLO REAL DO PACTO CTÔNICO)
      const pomeMat = new THREE.MeshStandardMaterial({
        color: 0x9d0208,
        roughness: 0.22,
        metalness: 0.38,
        emissive: 0x59001b,
        emissiveIntensity: 0.6
      });
      const crownMat = new THREE.MeshStandardMaterial({
        color: 0x3d0b13,
        roughness: 0.28,
        metalness: 0.85,
        emissive: 0x220409,
        emissiveIntensity: 0.4
      });
      const seedGemMat = new THREE.MeshStandardMaterial({
        color: 0xff0054,
        metalness: 0.3,
        roughness: 0.05,
        transparent: true,
        opacity: 0.9,
        emissive: 0xd90429,
        emissiveIntensity: 0.95
      });
      const goldStemMat = new THREE.MeshStandardMaterial({
        color: 0xd4af37,
        metalness: 0.92,
        roughness: 0.2,
        emissive: 0x8c6a2b,
        emissiveIntensity: 0.35
      });

      const pomeGroup = new THREE.Group();

      // 1. Corpo Globular da Romã (Ligeiramente achatado nos polos)
      const pomeBody = new THREE.Mesh(new THREE.SphereGeometry(0.105, 24, 20), pomeMat);
      pomeBody.scale.set(1.04, 0.94, 1.04);
      pomeBody.castShadow = true;
      pomeGroup.add(pomeBody);

      // 2. Coroa de Cálices Estrelados no Topo da Romã (6 Sépalas Características)
      const crownRim = new THREE.Mesh(new THREE.TorusGeometry(0.032, 0.007, 10, 24), crownMat);
      crownRim.position.y = 0.098;
      crownRim.rotation.x = Math.PI * 0.5;
      pomeGroup.add(crownRim);

      const sepalCount = 6;
      for (let i = 0; i < sepalCount; i++) {
        const ang = i * (Math.PI * 2 / sepalCount);
        const sepal = new THREE.Mesh(new THREE.ConeGeometry(0.013, 0.045, 6), crownMat);
        const rOff = 0.034;
        sepal.position.set(Math.cos(ang) * rOff, 0.12, Math.sin(ang) * rOff);
        sepal.rotation.x = Math.sin(ang) * 0.38;
        sepal.rotation.z = -Math.cos(ang) * 0.38;
        pomeGroup.add(sepal);
      }

      // 3. Sementes Sagradas de Rubi (Arilos Cristalinos Brilhando no Cálice e Ombros)
      for (let i = 0; i < 6; i++) {
        const sAng = i * (Math.PI * 2 / 6) + 0.5;
        const seed = new THREE.Mesh(new THREE.OctahedronGeometry(0.015, 0), seedGemMat);
        seed.position.set(Math.cos(sAng) * 0.022, 0.108, Math.sin(sAng) * 0.022);
        seed.rotation.set(sAng, sAng * 0.5, 0);
        pomeGroup.add(seed);
      }

      // 4. Caule / Ramo de Ébano e Ouro na Base
      const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.007, 0.009, 0.06, 8), goldStemMat);
      stem.position.y = -0.11;
      pomeGroup.add(stem);

      // Pequena folha de ouro ctônico no caule
      const leaf = new THREE.Mesh(new THREE.ConeGeometry(0.012, 0.04, 6), goldStemMat);
      leaf.position.set(0.02, -0.10, 0);
      leaf.rotation.z = -1.2;
      pomeGroup.add(leaf);

      relicGroup.add(pomeGroup);

      // 5. Halo Orbital de Sementes e Éter Ctônico
      const pomeHalo = new THREE.Mesh(new THREE.TorusGeometry(0.14, 0.006, 12, 32), seedGemMat);
      pomeHalo.name = 'relicRing1';
      pomeHalo.position.y = 0.02;
      pomeHalo.rotation.x = Math.PI * 0.42;
      relicGroup.add(pomeHalo);

    } else if (godId === 'oberon') {
      // 12. OBERON: A LANTERNA ESPECTRAL DA MARÉ BRANCA (ESTILO THRESH / GENSHIN)
      const wroughtIronMat = new THREE.MeshStandardMaterial({
        color: 0x1e293b,
        metalness: 0.94,
        roughness: 0.2,
        emissive: 0x0f172a,
        emissiveIntensity: 0.35
      });
      const soulFlameMat = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        roughness: 0.02,
        metalness: 0.1,
        emissive: 0x00f5d4,
        emissiveIntensity: 1.4
      });
      const glassCylinderMat = new THREE.MeshStandardMaterial({
        color: 0x00f5d4,
        transparent: true,
        opacity: 0.38,
        roughness: 0.08,
        metalness: 0.2
      });

      // Cúpula Piramidal Superior da Lanterna
      const roof = new THREE.Mesh(new THREE.ConeGeometry(0.09, 0.09, 6), wroughtIronMat);
      roof.position.y = 0.16;
      relicGroup.add(roof);

      // Argola de Suspensão com Elo de Corrente
      const loop = new THREE.Mesh(new THREE.TorusGeometry(0.028, 0.006, 12, 16), wroughtIronMat);
      loop.position.y = 0.22;
      relicGroup.add(loop);

      // Vidro Translúcido Central
      const glass = new THREE.Mesh(new THREE.CylinderGeometry(0.065, 0.065, 0.18, 16), glassCylinderMat);
      glass.position.y = 0.04;
      relicGroup.add(glass);

      // 4 Colunas / Grades de Ferro Forjado
      [0, Math.PI * 0.5, Math.PI, Math.PI * 1.5].forEach(ang => {
        const bar = new THREE.Mesh(new THREE.CylinderGeometry(0.006, 0.006, 0.19, 8), wroughtIronMat);
        bar.position.set(Math.cos(ang) * 0.07, 0.04, Math.sin(ang) * 0.07);
        relicGroup.add(bar);
      });

      // Fogo Fátuo / Alma Luminescente Central da Maré Branca
      const soulFlame = new THREE.Mesh(new THREE.SphereGeometry(0.038, 16, 16), soulFlameMat);
      soulFlame.name = 'relicRing1';
      soulFlame.position.y = 0.04;
      relicGroup.add(soulFlame);

      // Base com 4 Garras Inferiores (Garras do Tártaro no estilo Thresh)
      const basePlate = new THREE.Mesh(new THREE.CylinderGeometry(0.075, 0.085, 0.024, 6), wroughtIronMat);
      basePlate.position.y = -0.06;
      relicGroup.add(basePlate);

      [-1, 1].forEach(sideX => {
        [-1, 1].forEach(sideZ => {
          const claw = new THREE.Mesh(new THREE.ConeGeometry(0.012, 0.06, 8), wroughtIronMat);
          claw.position.set(sideX * 0.05, -0.09, sideZ * 0.05);
          claw.rotation.set(sideZ * 0.3, 0, sideX * -0.3);
          relicGroup.add(claw);
        });
      });

      // Anel Orbital de Almas
      const ghostRing = new THREE.Mesh(new THREE.TorusGeometry(0.14, 0.006, 12, 28), soulFlameMat);
      ghostRing.name = 'relicRing2';
      ghostRing.position.y = 0.04;
      ghostRing.rotation.x = Math.PI * 0.38;
      relicGroup.add(ghostRing);

    } else if (godId === 'hermes') {
      // 13. HERMES: CADUCEU ALADO DE OURO E PRATA
      const goldMat = new THREE.MeshStandardMaterial({
        color: 0xffd700,
        metalness: 0.95,
        roughness: 0.12,
        emissive: 0xffaa00,
        emissiveIntensity: 0.35
      });
      const wingSilverMat = new THREE.MeshStandardMaterial({
        color: 0xe2e8f0,
        metalness: 0.92,
        roughness: 0.1,
        emissive: 0x38bdf8,
        emissiveIntensity: 0.3
      });

      // Haste Central do Caduceu
      const wand = new THREE.Mesh(new THREE.CylinderGeometry(0.010, 0.010, 0.72, 16), goldMat);
      wand.position.y = -0.04;
      relicGroup.add(wand);

      // Orbe Solar Superior
      const topOrb = new THREE.Mesh(new THREE.SphereGeometry(0.032, 16, 16), goldMat);
      topOrb.position.y = 0.33;
      relicGroup.add(topOrb);

      // Asas Prateadas Abertas no Topo
      [-1, 1].forEach(side => {
        const wing = new THREE.Mesh(new THREE.ConeGeometry(0.04, 0.14, 8), wingSilverMat);
        wing.scale.set(1, 1, 0.15);
        wing.position.set(side * 0.065, 0.32, 0);
        wing.rotation.z = side * -1.0;
        relicGroup.add(wing);
      });

      // Serpentes Gêmeas Entrelaçadas
      const snakeRing1 = new THREE.Mesh(new THREE.TorusGeometry(0.05, 0.009, 12, 24), goldMat);
      snakeRing1.position.y = 0.16;
      snakeRing1.rotation.x = Math.PI * 0.4;
      relicGroup.add(snakeRing1);

      const snakeRing2 = new THREE.Mesh(new THREE.TorusGeometry(0.045, 0.008, 12, 24), goldMat);
      snakeRing2.position.y = 0.02;
      snakeRing2.rotation.x = -Math.PI * 0.4;
      relicGroup.add(snakeRing2);

      // Anel Orbital de Velocidade
      const speedRing = new THREE.Mesh(new THREE.TorusGeometry(0.14, 0.006, 12, 28), wingSilverMat);
      speedRing.name = 'relicRing1';
      speedRing.position.y = 0.10;
      speedRing.rotation.x = Math.PI * 0.42;
      relicGroup.add(speedRing);

    } else if (godId === 'hera') {

      // 14. HERA: COROA RÉGIA OLÍMPICA MAJESTOSA (PBR DOURADA & CONECTADA)
      const royalGoldMat = new THREE.MeshStandardMaterial({
        color: 0xffd700,
        metalness: 0.95,
        roughness: 0.14,
        emissive: 0xb8860b,
        emissiveIntensity: 0.45
      });
      const peacockMat = new THREE.MeshStandardMaterial({
        color: 0x00f5d4,
        roughness: 0.12,
        metalness: 0.85,
        emissive: 0x00a896,
        emissiveIntensity: 0.8
      });
      const sapphireMat = new THREE.MeshStandardMaterial({
        color: 0x2563eb,
        roughness: 0.08,
        metalness: 0.3,
        emissive: 0x1d4ed8,
        emissiveIntensity: 0.9
      });

      // Aro de Base da Coroa (Horizontal e Fechado)
      const baseRim = new THREE.Mesh(new THREE.TorusGeometry(0.12, 0.014, 16, 48), royalGoldMat);
      baseRim.rotation.x = Math.PI * 0.5;
      baseRim.position.y = -0.06;
      relicGroup.add(baseRim);

      // Faixa Cilíndrica Interna da Coroa
      const crownBand = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.035, 36, 1, true), royalGoldMat);
      crownBand.position.y = -0.06;
      relicGroup.add(crownBand);

      // 8 Pontas Imperiais Dignas Conectadas ao Aro
      for (let i = 0; i < 8; i++) {
        const ang = i * Math.PI * 0.25;
        const x = Math.cos(ang) * 0.12;
        const z = Math.sin(ang) * 0.12;
        const hSpire = (i % 2 === 0) ? 0.14 : 0.095;
        
        const spire = new THREE.Mesh(new THREE.ConeGeometry(0.016, hSpire, 8), royalGoldMat);
        spire.position.set(x, -0.045 + hSpire * 0.5, z);
        spire.rotation.y = -ang;
        spire.rotation.z = Math.cos(ang) * -0.08;
        spire.rotation.x = Math.sin(ang) * 0.08;
        relicGroup.add(spire);

        // Gema de Pavão / Safira no topo de cada ponta
        const gem = new THREE.Mesh(new THREE.OctahedronGeometry(0.012, 0), (i % 2 === 0) ? peacockMat : sapphireMat);
        gem.position.set(x, -0.045 + hSpire + 0.01, z);
        relicGroup.add(gem);
      }

      // Arcos Superiores Convergentes da Coroa (Cruzando no topo)
      const arch1 = new THREE.Mesh(new THREE.TorusGeometry(0.12, 0.008, 12, 32, Math.PI), royalGoldMat);
      arch1.rotation.z = 0;
      arch1.position.y = -0.045;
      relicGroup.add(arch1);

      const arch2 = new THREE.Mesh(new THREE.TorusGeometry(0.12, 0.008, 12, 32, Math.PI), royalGoldMat);
      arch2.rotation.y = Math.PI * 0.5;
      arch2.position.y = -0.045;
      relicGroup.add(arch2);

      // Joia Imperial do Vértice (Safira Real Majestosa)
      const summitGem = new THREE.Mesh(new THREE.OctahedronGeometry(0.024, 0), sapphireMat);
      summitGem.position.set(0, 0.11, 0);
      relicGroup.add(summitGem);

      // Anel Orbital de Glória Imperial
      const heraRing = new THREE.Mesh(new THREE.TorusGeometry(0.16, 0.006, 12, 32), peacockMat);
      heraRing.name = 'relicRing1';
      heraRing.rotation.x = Math.PI * 0.42;
      relicGroup.add(heraRing);
    } else if (godId === 'hestia') {

      // 15. HÉSTIA: BRASEIRO SAGRADO COM FOGUEIRA / CHAMA VIVA ESCULPIDA
      const bronzeKettleMat = new THREE.MeshStandardMaterial({
        color: 0xcd7f32,
        metalness: 0.92,
        roughness: 0.18,
        emissive: 0x8b4513,
        emissiveIntensity: 0.4
      });
      const sacredFlameMat = new THREE.MeshStandardMaterial({
        color: 0xff8c00,
        roughness: 0.06,
        metalness: 0.1,
        emissive: 0xff3b00,
        emissiveIntensity: 1.6
      });
      const goldCoreFlameMat = new THREE.MeshStandardMaterial({
        color: 0xffd700,
        roughness: 0.04,
        metalness: 0.05,
        emissive: 0xffa500,
        emissiveIntensity: 2.0
      });

      // Bacia do Braseiro Cerimonial
      const basin = new THREE.Mesh(new THREE.CylinderGeometry(0.13, 0.07, 0.065, 24), bronzeKettleMat);
      basin.position.y = -0.05;
      relicGroup.add(basin);

      // Borda Moldada Superior
      const basinRim = new THREE.Mesh(new THREE.TorusGeometry(0.13, 0.012, 12, 36), bronzeKettleMat);
      basinRim.rotation.x = Math.PI * 0.5;
      basinRim.position.y = -0.018;
      relicGroup.add(basinRim);

      // 3 Pés de Bronze Nobre em Tripé Firme
      [0, Math.PI * 0.666, Math.PI * 1.333].forEach(ang => {
        const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.010, 0.014, 0.14, 10), bronzeKettleMat);
        leg.position.set(Math.cos(ang) * 0.075, -0.12, Math.sin(ang) * 0.075);
        leg.rotation.z = Math.sin(ang) * 0.28;
        leg.rotation.x = Math.cos(ang) * -0.28;
        relicGroup.add(leg);
      });

      // Leito de Brasas Incandescentes
      const emberBed = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.08, 0.02, 18), sacredFlameMat);
      emberBed.position.y = -0.02;
      relicGroup.add(emberBed);

      // Toras de Lenha Cruzadas na Base da Fogueira
      const woodLogMat = new THREE.MeshStandardMaterial({
        color: 0x3d2314,
        roughness: 0.85,
        metalness: 0.1
      });
      [-0.45, 0.45].forEach(rot => {
        const log = new THREE.Mesh(new THREE.CylinderGeometry(0.016, 0.018, 0.18, 10), woodLogMat);
        log.rotation.z = Math.PI * 0.5;
        log.rotation.y = rot;
        log.position.set(0, -0.015, 0);
        relicGroup.add(log);
      });

      // Fogueira Viva Esculpida: Línguas de Fogo em Camadas Sobrepostas
      const coreFlame = new THREE.Mesh(new THREE.ConeGeometry(0.042, 0.22, 12), goldCoreFlameMat);
      coreFlame.position.set(0, 0.09, 0);
      relicGroup.add(coreFlame);

      // 4 Chamas Periféricas Espiraladas
      [0, Math.PI * 0.5, Math.PI, Math.PI * 1.5].forEach((ang, idx) => {
        const outerFlame = new THREE.Mesh(new THREE.ConeGeometry(0.026, 0.16, 8), sacredFlameMat);
        outerFlame.position.set(Math.cos(ang) * 0.038, 0.06, Math.sin(ang) * 0.038);
        outerFlame.rotation.z = Math.sin(ang) * 0.18 + 0.08;
        outerFlame.rotation.x = Math.cos(ang) * -0.18;
        relicGroup.add(outerFlame);
      });

      // Halo de Brasas Perpétuas
      const flameRing = new THREE.Mesh(new THREE.TorusGeometry(0.16, 0.007, 12, 32), sacredFlameMat);
      flameRing.name = 'relicRing1';
      flameRing.rotation.x = Math.PI * 0.4;
      relicGroup.add(flameRing);
    } else if (godId === 'afrodite') {
      // 16. AFRODITE: CONCHA DE MADREPÉROLA & PÉROLA DO DESEJO
      const pearlMat = new THREE.MeshStandardMaterial({
        color: 0xffeef2,
        metalness: 0.88,
        roughness: 0.08,
        emissive: 0xffb3c6,
        emissiveIntensity: 0.4
      });
      const roseGemMat = new THREE.MeshStandardMaterial({
        color: 0xff0054,
        roughness: 0.06,
        metalness: 0.2,
        emissive: 0xd90429,
        emissiveIntensity: 0.95
      });

      // Valva da Concha
      const shell = new THREE.Mesh(new THREE.CylinderGeometry(0.13, 0.02, 0.03, 16), pearlMat);
      shell.scale.set(1.0, 0.5, 1.2);
      shell.rotation.x = Math.PI * 0.25;
      shell.position.y = -0.06;
      relicGroup.add(shell);

      // Pérola Sagrada Cintilante
      const jewelPearl = new THREE.Mesh(new THREE.SphereGeometry(0.045, 20, 20), pearlMat);
      jewelPearl.position.set(0, 0.01, 0.02);
      relicGroup.add(jewelPearl);

      // Pétalas de Quartzo Rosa Orbitando
      const loveRing = new THREE.Mesh(new THREE.TorusGeometry(0.14, 0.007, 12, 32), roseGemMat);
      loveRing.name = 'relicRing1';
      loveRing.rotation.x = Math.PI * 0.38;
      relicGroup.add(loveRing);
    } else if (godId === 'ares') {

      // 17. ARES: LANÇA MILITAR ESPARTANA PURA (SEM ELMO, ELEMENTOS SÓLIDOS)
      const spartanBronzeMat = new THREE.MeshStandardMaterial({
        color: 0x92400e,
        metalness: 0.94,
        roughness: 0.18,
        emissive: 0x451a03,
        emissiveIntensity: 0.4
      });
      const bloodSteelMat = new THREE.MeshStandardMaterial({
        color: 0xdc2626,
        metalness: 0.90,
        roughness: 0.12,
        emissive: 0x991b1b,
        emissiveIntensity: 0.95
      });
      const leatherGripMat = new THREE.MeshStandardMaterial({
        color: 0x292524,
        roughness: 0.65,
        metalness: 0.15
      });

      // Grupo da Lança com Inclinação Marcial
      const spearGroup = new THREE.Group();
      spearGroup.rotation.z = -0.38;

      // Haste Principal de Bronze Forjado
      const shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.009, 0.009, 0.78, 14), spartanBronzeMat);
      shaft.position.y = 0.02;
      spearGroup.add(shaft);

      // Empunhadura Revestida em Couro Central
      const grip = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.18, 12), leatherGripMat);
      grip.position.y = 0.02;
      spearGroup.add(grip);

      // Anéis de Têmpera na Empunhadura
      [-0.07, 0.07].forEach(yPos => {
        const ring = new THREE.Mesh(new THREE.TorusGeometry(0.013, 0.003, 8, 16), spartanBronzeMat);
        ring.position.y = 0.02 + yPos;
        ring.rotation.x = Math.PI * 0.5;
        spearGroup.add(ring);
      });

      // Sauroter (Contrapeso / Espigão Inferior da Lança)
      const sauroter = new THREE.Mesh(new THREE.ConeGeometry(0.018, 0.11, 8), spartanBronzeMat);
      sauroter.rotation.x = Math.PI;
      sauroter.position.y = -0.42;
      spearGroup.add(sauroter);

      // Virola de Fixação Superior
      const ferrule = new THREE.Mesh(new THREE.CylinderGeometry(0.016, 0.011, 0.045, 12), spartanBronzeMat);
      ferrule.position.y = 0.43;
      spearGroup.add(ferrule);

      // Lâmina Foliácea Espartana Afiada
      const spearBlade = new THREE.Mesh(new THREE.ConeGeometry(0.034, 0.22, 10), bloodSteelMat);
      spearBlade.scale.set(1.4, 1.0, 0.35);
      spearBlade.position.y = 0.54;
      spearGroup.add(spearBlade);

      // Nervura Central / Canal de Sangue
      const spine = new THREE.Mesh(new THREE.BoxGeometry(0.006, 0.18, 0.016), spartanBronzeMat);
      spine.position.y = 0.52;
      spearGroup.add(spine);

      relicGroup.add(spearGroup);

      // Anel Orbital de Fúria Bélica
      const furyRing = new THREE.Mesh(new THREE.TorusGeometry(0.16, 0.007, 12, 32), bloodSteelMat);
      furyRing.name = 'relicRing1';
      furyRing.rotation.x = Math.PI * 0.44;
      relicGroup.add(furyRing);
    } else if (godId === 'artemis') {
      // 18. ÁRTEMIS: ARCO RECURVO CELESTIAL & FLECHA DAS ESTRELAS LUNARES
      const silverLunarMat = new THREE.MeshStandardMaterial({
        color: 0xf0f9ff,
        metalness: 0.95,
        roughness: 0.12,
        emissive: 0x38bdf8,
        emissiveIntensity: 0.45
      });
      const moonGoldMat = new THREE.MeshStandardMaterial({
        color: 0xfef08a,
        metalness: 0.9,
        roughness: 0.2,
        emissive: 0xeab308,
        emissiveIntensity: 0.35
      });
      const bowStringMat = new THREE.MeshStandardMaterial({
        color: 0xe0f2fe,
        metalness: 0.3,
        roughness: 0.1,
        emissive: 0x7dd3fc,
        emissiveIntensity: 0.9
      });
      const crystalGlowMat = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        metalness: 0.1,
        roughness: 0.05,
        emissive: 0xbae6fd,
        emissiveIntensity: 0.8
      });

      const bowGroup = new THREE.Group();

      // Curvatura graciosa do arco recurvo (Braço superior e inferior integrados)
      const bowPoints = [
        new THREE.Vector3(-0.02, 0.24, 0),     // Nock superior recurvado
        new THREE.Vector3(0.015, 0.20, 0),     // Recurva superior
        new THREE.Vector3(0.075, 0.11, 0),     // Membro superior
        new THREE.Vector3(0.085, 0.04, 0),     // Transição para o punho
        new THREE.Vector3(0.080, 0.00, 0),     // Centro do Punho (Riser)
        new THREE.Vector3(0.085, -0.04, 0),    // Transição inferior
        new THREE.Vector3(0.075, -0.11, 0),    // Membro inferior
        new THREE.Vector3(0.015, -0.20, 0),    // Recurva inferior
        new THREE.Vector3(-0.02, -0.24, 0)     // Nock inferior recurvado
      ];
      const bowCurve = new THREE.CatmullRomCurve3(bowPoints);
      const bowGeo = new THREE.TubeGeometry(bowCurve, 48, 0.007, 10, false);
      const bowMesh = new THREE.Mesh(bowGeo, silverLunarMat);
      bowGroup.add(bowMesh);

      // Empunhadura Central (Riser) anatômica com detalhes dourados
      const riserMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.08, 12), moonGoldMat);
      riserMesh.position.set(0.082, 0, 0);
      bowGroup.add(riserMesh);

      // Ponteiras / Nocks Dourados nos extremos
      const topNock = new THREE.Mesh(new THREE.ConeGeometry(0.010, 0.025, 8), moonGoldMat);
      topNock.position.set(-0.02, 0.245, 0);
      topNock.rotation.z = Math.PI * 0.2;
      bowGroup.add(topNock);

      const botNock = new THREE.Mesh(new THREE.ConeGeometry(0.010, 0.025, 8), moonGoldMat);
      botNock.position.set(-0.02, -0.245, 0);
      botNock.rotation.z = -Math.PI * 0.2;
      bowGroup.add(botNock);

      // Corda de Luz Lunar Tensa conectando perfeitamente os nocks
      const stringPoints = [
        new THREE.Vector3(-0.02, 0.24, 0),
        new THREE.Vector3(0.03, 0.0, 0),     // Ponto de encaixe da flecha
        new THREE.Vector3(-0.02, -0.24, 0)
      ];
      const stringCurve = new THREE.CatmullRomCurve3(stringPoints);
      const stringGeo = new THREE.TubeGeometry(stringCurve, 20, 0.002, 6, false);
      const bowCord = new THREE.Mesh(stringGeo, bowStringMat);
      bowGroup.add(bowCord);

      // Flecha Estelar Encaixada no Ponto de Tiro
      const arrowGroup = new THREE.Group();
      arrowGroup.position.set(0.03, 0, 0);

      // Haste de Prata Estelar
      const arrowShaft = new THREE.Mesh(new THREE.CylinderGeometry(0.003, 0.003, 0.32, 8), silverLunarMat);
      arrowShaft.rotation.z = Math.PI * 0.5;
      arrowShaft.position.x = 0.14;
      arrowGroup.add(arrowShaft);

      // Ponta de Flecha em Cristal de Luar
      const arrowTip = new THREE.Mesh(new THREE.ConeGeometry(0.012, 0.045, 4), crystalGlowMat);
      arrowTip.rotation.z = -Math.PI * 0.5;
      arrowTip.position.x = 0.30;
      arrowGroup.add(arrowTip);

      // Penachos Estelares na Traseira (Fletching)
      for (let f = 0; f < 3; f++) {
        const vane = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.001, 0.012), moonGoldMat);
        vane.position.set(-0.01, 0, 0);
        vane.rotation.x = (f * Math.PI * 2) / 3;
        arrowGroup.add(vane);
      }
      bowGroup.add(arrowGroup);

      // Centralizar o conjunto do arco
      bowGroup.position.x = -0.04;
      relicGroup.add(bowGroup);

      // Anel Orbital Lunar Circundante
      const moonRing = new THREE.Mesh(new THREE.TorusGeometry(0.18, 0.005, 12, 40), silverLunarMat);
      moonRing.name = 'relicRing1';
      moonRing.rotation.x = Math.PI * 0.42;
      relicGroup.add(moonRing);

      // Três Pequenos Orbes de Luz de Luar Orbitantes
      for (let o = 0; o < 3; o++) {
        const moonOrb = new THREE.Mesh(new THREE.SphereGeometry(0.012, 12, 12), crystalGlowMat);
        const orbAngle = (o * Math.PI * 2) / 3;
        moonOrb.position.set(Math.cos(orbAngle) * 0.18, Math.sin(orbAngle) * 0.18 * 0.4, Math.sin(orbAngle) * 0.18 * 0.9);
        moonOrb.name = `moonOrb_${o}`;
        relicGroup.add(moonOrb);
      }
    } else if (godId === 'atena') {
      // 19. ATENA: ÉGIDE DA SABEDORIA & COROA RADIADA DE OLIVEIRA
      const goldAegisMat = new THREE.MeshStandardMaterial({
        color: 0xd4af37,
        metalness: 0.94,
        roughness: 0.16,
        emissive: 0x8c6a2b,
        emissiveIntensity: 0.35
      });
      const sapphireMat = new THREE.MeshStandardMaterial({
        color: 0x1d4ed8,
        roughness: 0.06,
        metalness: 0.3,
        emissive: 0x2563eb,
        emissiveIntensity: 0.85
      });

      // Escudo Circular Hoplita
      const aegisShield = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.018, 24), goldAegisMat);
      aegisShield.rotation.x = Math.PI * 0.5;
      relicGroup.add(aegisShield);

      // Umbo Central de Safira Sagrada
      const umbo = new THREE.Mesh(new THREE.SphereGeometry(0.038, 16, 16), sapphireMat);
      umbo.position.z = 0.012;
      relicGroup.add(umbo);

      // Raios Radiantes da Razão
      for (let i = 0; i < 8; i++) {
        const ang = i * (Math.PI * 2 / 8);
        const ray = new THREE.Mesh(new THREE.BoxGeometry(0.008, 0.05, 0.006), goldAegisMat);
        ray.position.set(Math.cos(ang) * 0.075, Math.sin(ang) * 0.075, 0.012);
        ray.rotation.z = ang;
        relicGroup.add(ray);
      }

      // Anel Orbital da Coruja Sagrada
      const wisdomRing = new THREE.Mesh(new THREE.TorusGeometry(0.15, 0.006, 12, 32), goldAegisMat);
      wisdomRing.name = 'relicRing1';
      wisdomRing.rotation.x = Math.PI * 0.4;
      relicGroup.add(wisdomRing);
    } else if (godId === 'dionisio') {

      // 20. DIONÍSIO: CACHO DE UVAS AMETISTA BÁQUICO ESCULPIDO
      const grapeAmethystMat = new THREE.MeshStandardMaterial({
        color: 0x7c3aed,
        metalness: 0.35,
        roughness: 0.10,
        emissive: 0x5b21b6,
        emissiveIntensity: 0.85
      });
      const vineWoodMat = new THREE.MeshStandardMaterial({
        color: 0x582f0e,
        metalness: 0.2,
        roughness: 0.45
      });
      const leafEmeraldMat = new THREE.MeshStandardMaterial({
        color: 0x059669,
        metalness: 0.2,
        roughness: 0.25,
        emissive: 0x047857,
        emissiveIntensity: 0.5
      });

      // Cacho Esculpido: 22 Uvas Ametista em Espiral Cônica
      const grapeTiers = [
        { y: 0.08, r: 0.065, count: 7 },
        { y: 0.03, r: 0.052, count: 6 },
        { y: -0.02, r: 0.038, count: 5 },
        { y: -0.07, r: 0.024, count: 3 }
      ];

      grapeTiers.forEach(tier => {
        for (let i = 0; i < tier.count; i++) {
          const ang = i * ((Math.PI * 2) / tier.count) + tier.y * 3;
          const grape = new THREE.Mesh(new THREE.SphereGeometry(0.024, 14, 12), grapeAmethystMat);
          grape.position.set(Math.cos(ang) * tier.r, tier.y, Math.sin(ang) * tier.r);
          relicGroup.add(grape);
        }
      });

      // Uva de Ponta Inferior
      const tipGrape = new THREE.Mesh(new THREE.SphereGeometry(0.022, 14, 12), grapeAmethystMat);
      tipGrape.position.set(0, -0.115, 0);
      relicGroup.add(tipGrape);

      // Ramo / Haste de Videira Retorcida
      const vineStem = new THREE.Mesh(new THREE.CylinderGeometry(0.008, 0.011, 0.14, 10), vineWoodMat);
      vineStem.position.set(0.015, 0.15, 0);
      vineStem.rotation.z = 0.25;
      relicGroup.add(vineStem);

      // Folhas de Parreira Flanqueando o Cacho
      [-1, 1].forEach(side => {
        const leaf = new THREE.Mesh(new THREE.ConeGeometry(0.045, 0.08, 5), leafEmeraldMat);
        leaf.scale.set(1.4, 0.2, 1.0);
        leaf.position.set(side * 0.06, 0.12, 0.02);
        leaf.rotation.z = side * -0.7;
        leaf.rotation.y = side * 0.3;
        relicGroup.add(leaf);
      });

      // Anel Orbital Báquico
      const bacchicRing = new THREE.Mesh(new THREE.TorusGeometry(0.16, 0.006, 12, 32), grapeAmethystMat);
      bacchicRing.name = 'relicRing1';
      bacchicRing.rotation.x = Math.PI * 0.42;
      relicGroup.add(bacchicRing);
    } else if (godId === 'hefesto') {
      // 21. HEFESTO: MARTELO DA FORJA VULCÂNICA & MAGMA INCANDESCENTE
      const anvilIronMat = new THREE.MeshStandardMaterial({
        color: 0x1f2937,
        metalness: 0.94,
        roughness: 0.22,
        emissive: 0x111827,
        emissiveIntensity: 0.2
      });
      const moltenCoreMat = new THREE.MeshStandardMaterial({
        color: 0xff4500,
        roughness: 0.1,
        metalness: 0.4,
        emissive: 0xff7b00,
        emissiveIntensity: 1.4
      });

      // Cabeça Chanfrada do Martelo
      const hammerHead = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.085, 0.085), anvilIronMat);
      hammerHead.position.set(0, 0.14, 0);
      relicGroup.add(hammerHead);

      // Núcleo de Magma Incandescente na Face de Impacto
      const moltenCore = new THREE.Mesh(new THREE.SphereGeometry(0.032, 12, 12), moltenCoreMat);
      moltenCore.position.set(0.08, 0.14, 0);
      relicGroup.add(moltenCore);

      // Cabo de Ferro Forjado
      const handleMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.010, 0.012, 0.58, 12), anvilIronMat);
      handleMesh.position.y = -0.12;
      relicGroup.add(handleMesh);

      // Anel Orbital de Faíscas de Forja
      const forgeRing = new THREE.Mesh(new THREE.TorusGeometry(0.14, 0.007, 12, 32), moltenCoreMat);
      forgeRing.name = 'relicRing1';
      forgeRing.rotation.x = Math.PI * 0.44;
      relicGroup.add(forgeRing);
    } else if (godId === 'hecate') {

      // 22. HÉCATE: CHAVE ANTIGA DAS TRÊS ENCRUZILHADAS (HEKATE'S ANTIQUE KEY)
      const antiqueSilverMat = new THREE.MeshStandardMaterial({
        color: 0xe2e8f0,
        metalness: 0.95,
        roughness: 0.12,
        emissive: 0x64748b,
        emissiveIntensity: 0.35
      });
      const crossroadsCyanMat = new THREE.MeshStandardMaterial({
        color: 0x00f5d4,
        roughness: 0.06,
        metalness: 0.3,
        emissive: 0x05668d,
        emissiveIntensity: 1.1
      });

      // Grupo da Chave Centralizada
      const keyGroup = new THREE.Group();

      // Cabeça da Chave (Bow): Anel Central & Luas Tríplices
      const mainRing = new THREE.Mesh(new THREE.TorusGeometry(0.046, 0.008, 12, 32), antiqueSilverMat);
      mainRing.position.y = 0.16;
      keyGroup.add(mainRing);

      // Duas Luas Crescentes Laterais do Bow
      [-1, 1].forEach(side => {
        const crescent = new THREE.Mesh(new THREE.TorusGeometry(0.038, 0.006, 10, 24, Math.PI * 1.3), antiqueSilverMat);
        crescent.position.set(side * 0.042, 0.16, 0);
        crescent.rotation.z = side * Math.PI * 0.5;
        keyGroup.add(crescent);
      });

      // Gema Central das Encruzilhadas no Bow
      const keyGem = new THREE.Mesh(new THREE.OctahedronGeometry(0.018, 0), crossroadsCyanMat);
      keyGem.position.set(0, 0.16, 0);
      keyGroup.add(keyGem);

      // Haste Estriada da Chave Antiga (Shank)
      const shank = new THREE.Mesh(new THREE.CylinderGeometry(0.009, 0.009, 0.38, 14), antiqueSilverMat);
      shank.position.y = -0.05;
      keyGroup.add(shank);

      // Colares Decorativos na Haste
      [0.08, -0.06].forEach(yPos => {
        const collar = new THREE.Mesh(new THREE.TorusGeometry(0.014, 0.004, 8, 16), antiqueSilverMat);
        collar.position.y = yPos;
        collar.rotation.x = Math.PI * 0.5;
        keyGroup.add(collar);
      });

      // Segredo da Chave (Bit / Dentes Labirínticos da Encruzilhada)
      const keyBit = new THREE.Mesh(new THREE.BoxGeometry(0.055, 0.085, 0.014), antiqueSilverMat);
      keyBit.position.set(0.032, -0.19, 0);
      keyGroup.add(keyBit);

      // Fenda / Recortes Rúnicos no Bit
      const bitCut = new THREE.Mesh(new THREE.BoxGeometry(0.024, 0.025, 0.02), crossroadsCyanMat);
      bitCut.position.set(0.034, -0.175, 0);
      keyGroup.add(bitCut);

      relicGroup.add(keyGroup);

      // Anel Orbital das Encruzilhadas
      const crossroadRing = new THREE.Mesh(new THREE.TorusGeometry(0.16, 0.006, 12, 32), crossroadsCyanMat);
      crossroadRing.name = 'relicRing1';
      crossroadRing.rotation.x = Math.PI * 0.4;
      relicGroup.add(crossroadRing);
    } else if (godId === 'hipnos' || godId === 'hypnos') {

      // 23. HIPNOS: CÁLICE MÍSTICO DO LETE & FLOR DE PAPOULA DO SONO ETERNO
      const somnusSilverMat = new THREE.MeshStandardMaterial({
        color: 0x94a3b8,
        metalness: 0.94,
        roughness: 0.16,
        emissive: 0x334155,
        emissiveIntensity: 0.35
      });
      const poppyPurpleMat = new THREE.MeshStandardMaterial({
        color: 0x7c3aed,
        roughness: 0.15,
        metalness: 0.25,
        emissive: 0x4c1d95,
        emissiveIntensity: 0.9
      });
      const sleepMistCyanMat = new THREE.MeshStandardMaterial({
        color: 0x38bdf8,
        roughness: 0.05,
        metalness: 0.1,
        emissive: 0x0284c7,
        emissiveIntensity: 1.4
      });

      const chaliceGroup = new THREE.Group();

      // Base do Cálice Sagrado
      const basePedestal = new THREE.Mesh(new THREE.CylinderGeometry(0.065, 0.08, 0.02, 24), somnusSilverMat);
      basePedestal.position.y = -0.15;
      chaliceGroup.add(basePedestal);

      // Haste Canelada do Cálice
      const chaliceStem = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.014, 0.14, 16), somnusSilverMat);
      chaliceStem.position.y = -0.07;
      chaliceGroup.add(chaliceStem);

      // Nó Central da Haste em Gema Violeta
      const stemKnot = new THREE.Mesh(new THREE.OctahedronGeometry(0.022, 0), poppyPurpleMat);
      stemKnot.position.y = -0.07;
      chaliceGroup.add(stemKnot);

      // Bojo / Taça do Cálice
      const chaliceCup = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.03, 0.14, 24), somnusSilverMat);
      chaliceCup.position.y = 0.05;
      chaliceGroup.add(chaliceCup);

      // Borda Superior do Cálice
      const cupRim = new THREE.Mesh(new THREE.TorusGeometry(0.09, 0.008, 12, 32), somnusSilverMat);
      cupRim.rotation.x = Math.PI * 0.5;
      cupRim.position.y = 0.12;
      chaliceGroup.add(cupRim);

      // Néctar do Esquecimento (Rio Lete) no interior
      const sleepLiquid = new THREE.Mesh(new THREE.CylinderGeometry(0.082, 0.082, 0.01, 24), sleepMistCyanMat);
      sleepLiquid.position.y = 0.10;
      chaliceGroup.add(sleepLiquid);

      // Flor de Papoula Sonífera Emergindo do Cálice
      const poppyGroup = new THREE.Group();
      poppyGroup.position.set(0, 0.12, 0);

      // Caule da Papoula
      const poppyStem = new THREE.Mesh(new THREE.CylinderGeometry(0.005, 0.005, 0.12, 8), somnusSilverMat);
      poppyStem.position.y = 0.06;
      poppyGroup.add(poppyStem);

      // Cápsula Central da Papoula
      const poppyPod = new THREE.Mesh(new THREE.SphereGeometry(0.024, 14, 12), somnusSilverMat);
      poppyPod.position.y = 0.12;
      poppyGroup.add(poppyPod);

      // 4 Pétalas Roxas Curvadas da Papoula do Sono
      [0, Math.PI * 0.5, Math.PI, Math.PI * 1.5].forEach((ang, idx) => {
        const petal = new THREE.Mesh(new THREE.ConeGeometry(0.032, 0.09, 8), poppyPurpleMat);
        petal.scale.set(1.4, 1.0, 0.3);
        petal.position.set(Math.cos(ang) * 0.022, 0.13, Math.sin(ang) * 0.022);
        petal.rotation.z = Math.sin(ang) * 0.35 + 0.15;
        petal.rotation.x = Math.cos(ang) * -0.35;
        poppyGroup.add(petal);
      });
      chaliceGroup.add(poppyGroup);

      relicGroup.add(chaliceGroup);

      // Anel Orbital de Névoa Sonífera Hipnótica
      const mistRing = new THREE.Mesh(new THREE.TorusGeometry(0.16, 0.006, 12, 32), sleepMistCyanMat);
      mistRing.name = 'relicRing1';
      mistRing.rotation.x = Math.PI * 0.42;
      relicGroup.add(mistRing);
    } else if (godId === 'circe') {

      // 24. CIRCE: APENAS O CALDEIRÃO MÍSTICO CLÁSSICO (SEM VARINHA ATRAVESSADA)
      const castIronMat = new THREE.MeshStandardMaterial({
        color: 0x27272a,
        metalness: 0.94,
        roughness: 0.22,
        emissive: 0x18181b,
        emissiveIntensity: 0.3
      });
      const bubblingPotionMat = new THREE.MeshStandardMaterial({
        color: 0x10b981,
        transparent: true,
        opacity: 0.88,
        roughness: 0.05,
        metalness: 0.2,
        emissive: 0x059669,
        emissiveIntensity: 1.4
      });

      // Bojo Redondo do Caldeirão de Ferro
      const cauldronBody = new THREE.Mesh(new THREE.SphereGeometry(0.11, 24, 20), castIronMat);
      cauldronBody.scale.set(1.15, 0.88, 1.15);
      cauldronBody.position.y = -0.04;
      relicGroup.add(cauldronBody);

      // Borda / Flange Superior
      const rim = new THREE.Mesh(new THREE.TorusGeometry(0.095, 0.014, 12, 32), castIronMat);
      rim.rotation.x = Math.PI * 0.5;
      rim.position.y = 0.045;
      relicGroup.add(rim);

      // Duas Alças Circulares Laterais
      [-0.12, 0.12].forEach(xPos => {
        const handle = new THREE.Mesh(new THREE.TorusGeometry(0.024, 0.005, 8, 16), castIronMat);
        handle.position.set(xPos, 0.01, 0);
        handle.rotation.y = Math.PI * 0.5;
        relicGroup.add(handle);
      });

      // 3 Pés de Garra Forjados
      [0, Math.PI * 0.666, Math.PI * 1.333].forEach(ang => {
        const foot = new THREE.Mesh(new THREE.CylinderGeometry(0.008, 0.014, 0.09, 8), castIronMat);
        foot.position.set(Math.cos(ang) * 0.075, -0.12, Math.sin(ang) * 0.075);
        foot.rotation.z = Math.sin(ang) * 0.25;
        foot.rotation.x = Math.cos(ang) * -0.25;
        relicGroup.add(foot);
      });

      // Superfície da Poção Borbulhante no Interior
      const potionSurface = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, 0.01, 24), bubblingPotionMat);
      potionSurface.position.y = 0.04;
      relicGroup.add(potionSurface);

      // 4 Bolhas de Poção Mágica Luminescente
      const bubbleCoords = [
        { x: -0.03, y: 0.055, z: 0.02, r: 0.016 },
        { x: 0.035, y: 0.06, z: -0.02, r: 0.013 },
        { x: -0.01, y: 0.065, z: -0.035, r: 0.018 },
        { x: 0.02, y: 0.052, z: 0.03, r: 0.010 }
      ];
      bubbleCoords.forEach(b => {
        const bubble = new THREE.Mesh(new THREE.SphereGeometry(b.r, 12, 10), bubblingPotionMat);
        bubble.position.set(b.x, b.y, b.z);
        relicGroup.add(bubble);
      });

      // Anel Orbital de Transmutação
      const transRing = new THREE.Mesh(new THREE.TorusGeometry(0.16, 0.006, 12, 32), bubblingPotionMat);
      transRing.name = 'relicRing1';
      transRing.rotation.x = Math.PI * 0.4;
      relicGroup.add(transRing);
    } else if (godId === 'despina') {
      // 25. DESPINA: ESTALACTITE DE GELO NEGRO & GEADA PERPÉTUA
      const frostIceMat = new THREE.MeshStandardMaterial({
        color: 0xa5f3fc,
        transparent: true,
        opacity: 0.82,
        roughness: 0.06,
        metalness: 0.25,
        emissive: 0x0891b2,
        emissiveIntensity: 0.8
      });
      const blackIceMat = new THREE.MeshStandardMaterial({
        color: 0x0f172a,
        metalness: 0.95,
        roughness: 0.12,
        emissive: 0x1e293b,
        emissiveIntensity: 0.4
      });

      // Prisma Central de Gelo Glacial
      const mainIcicle = new THREE.Mesh(new THREE.ConeGeometry(0.06, 0.44, 6), frostIceMat);
      mainIcicle.rotation.x = Math.PI;
      mainIcicle.position.y = 0.02;
      relicGroup.add(mainIcicle);

      // Cristais Periféricos Afiados
      [-1, 1].forEach((side, idx) => {
        const sideSpike = new THREE.Mesh(new THREE.ConeGeometry(0.026, 0.24, 5), blackIceMat);
        sideSpike.rotation.x = Math.PI;
        sideSpike.rotation.z = side * 0.32;
        sideSpike.position.set(side * 0.07, 0.08, 0);
        relicGroup.add(sideSpike);
      });

      // Anel Orbital de Tempestade Gelada
      const blizzardRing = new THREE.Mesh(new THREE.TorusGeometry(0.14, 0.007, 12, 32), frostIceMat);
      blizzardRing.name = 'relicRing1';
      blizzardRing.rotation.x = Math.PI * 0.42;
      relicGroup.add(blizzardRing);
    } else if (godId === 'psique') {
      // 26. PSIQUÊ: LÂMPADA DE ÓLEO & ASAS DE BORBOLETA TRANSCENDENTES
      const brassLampMat = new THREE.MeshStandardMaterial({
        color: 0xd4af37,
        metalness: 0.92,
        roughness: 0.18,
        emissive: 0x8c6a2b,
        emissiveIntensity: 0.35
      });
      const crystalWingMat = new THREE.MeshStandardMaterial({
        color: 0xffcbf2,
        transparent: true,
        opacity: 0.72,
        roughness: 0.05,
        metalness: 0.3,
        emissive: 0xf72585,
        emissiveIntensity: 0.75
      });

      // Bojo da Lâmpada de Óleo
      const lampBody = new THREE.Mesh(new THREE.SphereGeometry(0.07, 16, 12), brassLampMat);
      lampBody.scale.set(1.4, 0.6, 0.85);
      lampBody.position.y = -0.06;
      relicGroup.add(lampBody);

      // Bico da Lâmpada com Pequena Chama
      const nozzle = new THREE.Mesh(new THREE.ConeGeometry(0.02, 0.08, 8), brassLampMat);
      nozzle.rotation.z = -Math.PI * 0.45;
      nozzle.position.set(0.11, -0.03, 0);
      relicGroup.add(nozzle);

      // Asas Diáfanas da Alma
      [-1, 1].forEach(side => {
        const wing = new THREE.Mesh(new THREE.ConeGeometry(0.045, 0.18, 6), crystalWingMat);
        wing.scale.set(1.0, 1.0, 0.15);
        wing.position.set(side * 0.05, 0.08, 0);
        wing.rotation.z = side * -0.65;
        relicGroup.add(wing);
      });

      // Anel Orbital de Transcendência da Alma
      const soulRing = new THREE.Mesh(new THREE.TorusGeometry(0.14, 0.006, 12, 32), crystalWingMat);
      soulRing.name = 'relicRing1';
      soulRing.rotation.x = Math.PI * 0.4;
      relicGroup.add(soulRing);
    } else if (godId === 'tique') {
      // 27. TIQUE: RODA DA FORTUNA DE OURO & CORNUCÓPIA DE PROBABILIDADES
      const fortuneGoldMat = new THREE.MeshStandardMaterial({
        color: 0xffd700,
        metalness: 0.96,
        roughness: 0.12,
        emissive: 0xb8860b,
        emissiveIntensity: 0.45
      });
      const fortuneGemMat = new THREE.MeshStandardMaterial({
        color: 0x00f5d4,
        roughness: 0.06,
        metalness: 0.3,
        emissive: 0x05668d,
        emissiveIntensity: 0.95
      });

      // Aro Externo da Roda
      const wheelRim = new THREE.Mesh(new THREE.TorusGeometry(0.12, 0.012, 12, 32), fortuneGoldMat);
      wheelRim.rotation.x = Math.PI * 0.5;
      relicGroup.add(wheelRim);

      // 8 Raios Radiais da Roda
      for (let i = 0; i < 8; i++) {
        const ang = i * (Math.PI * 2 / 8);
        const spoke = new THREE.Mesh(new THREE.CylinderGeometry(0.004, 0.004, 0.22, 6), fortuneGoldMat);
        spoke.rotation.x = Math.PI * 0.5;
        spoke.rotation.z = ang;
        relicGroup.add(spoke);
      }

      // Eixo Central com Gema da Sorte
      const hub = new THREE.Mesh(new THREE.OctahedronGeometry(0.036, 0), fortuneGemMat);
      relicGroup.add(hub);

      // Anel Orbital da Fortuna
      const fortuneRing = new THREE.Mesh(new THREE.TorusGeometry(0.15, 0.006, 12, 32), fortuneGoldMat);
      fortuneRing.name = 'relicRing1';
      fortuneRing.rotation.x = Math.PI * 0.38;
      relicGroup.add(fortuneRing);
    } else if (godId === 'bruxas' || godId === 'congregacao-bruxas') {

      // 28. DARK COVEN: PENTAGRAMA VERMELHO DE RUBI (OCULTO & CRISTALINO)
      const bloodRubyMat = new THREE.MeshStandardMaterial({
        color: 0xd90429,
        metalness: 0.4,
        roughness: 0.08,
        emissive: 0xef233c,
        emissiveIntensity: 1.2
      });
      const darkGoldMat = new THREE.MeshStandardMaterial({
        color: 0x8b0000,
        metalness: 0.9,
        roughness: 0.2,
        emissive: 0x4a0000,
        emissiveIntensity: 0.5
      });

      // Grupo do Pentagrama
      const pentagramGroup = new THREE.Group();

      // Círculo Ritual Externo
      const ritualCircle = new THREE.Mesh(new THREE.TorusGeometry(0.14, 0.008, 12, 40), bloodRubyMat);
      pentagramGroup.add(ritualCircle);

      // Círculo Rúnico Interno Concêntrico
      const innerCircle = new THREE.Mesh(new THREE.TorusGeometry(0.095, 0.004, 10, 32), darkGoldMat);
      pentagramGroup.add(innerCircle);

      // Vértices da Estrela de Cinco Pontas
      const vertices = [];
      for (let i = 0; i < 5; i++) {
        const ang = -Math.PI * 0.5 + i * ((Math.PI * 2) / 5);
        vertices.push(new THREE.Vector3(Math.cos(ang) * 0.135, Math.sin(ang) * 0.135, 0));
      }

      // 5 Barras Cruzadas do Pentagrama (Conectando i -> (i+2)%5)
      for (let i = 0; i < 5; i++) {
        const p1 = vertices[i];
        const p2 = vertices[(i + 2) % 5];
        const dist = p1.distanceTo(p2);
        
        const beam = new THREE.Mesh(new THREE.CylinderGeometry(0.006, 0.006, dist, 8), bloodRubyMat);
        const mid = new THREE.Vector3().addVectors(p1, p2).multiplyScalar(0.5);
        beam.position.copy(mid);
        
        // Orientar feixe
        const dir = new THREE.Vector3().subVectors(p2, p1).normalize();
        const axis = new THREE.Vector3(0, 1, 0);
        beam.quaternion.setFromUnitVectors(axis, dir);
        pentagramGroup.add(beam);
      }

      // Rubi Central Facetado
      const coreRuby = new THREE.Mesh(new THREE.OctahedronGeometry(0.026, 0), bloodRubyMat);
      coreRuby.position.set(0, 0, 0.015);
      pentagramGroup.add(coreRuby);

      relicGroup.add(pentagramGroup);

      // Anel Orbital de Sangue Ocultista
      const witchRing = new THREE.Mesh(new THREE.TorusGeometry(0.17, 0.006, 12, 32), bloodRubyMat);
      witchRing.name = 'relicRing1';
      witchRing.rotation.x = Math.PI * 0.42;
      relicGroup.add(witchRing);
    } else if (godId === 'igreja' || godId === 'santa-igreja') {
      // 29. SANTA IGREJA: RELICÁRIO CRUCIFORME DE PRATA & TURÍBULO SACRO
      const holySilverMat = new THREE.MeshStandardMaterial({
        color: 0xf1f5f9,
        metalness: 0.96,
        roughness: 0.1,
        emissive: 0x94a3b8,
        emissiveIntensity: 0.35
      });
      const blessedGoldMat = new THREE.MeshStandardMaterial({
        color: 0xffd700,
        metalness: 0.92,
        roughness: 0.15,
        emissive: 0xb8860b,
        emissiveIntensity: 0.5
      });

      // Haste Vertical da Cruz
      const crossVert = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.36, 0.022), holySilverMat);
      relicGroup.add(crossVert);

      // Haste Horizontal da Cruz
      const crossHoriz = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.03, 0.022), holySilverMat);
      crossHoriz.position.y = 0.06;
      relicGroup.add(crossHoriz);

      // Relicário Central Dourado
      const chaliceCore = new THREE.Mesh(new THREE.SphereGeometry(0.028, 14, 14), blessedGoldMat);
      chaliceCore.position.set(0, 0.06, 0.012);
      relicGroup.add(chaliceCore);

      // Anel Orbital de Bênção Sagrada
      const blessingRing = new THREE.Mesh(new THREE.TorusGeometry(0.14, 0.006, 12, 32), blessedGoldMat);
      blessingRing.name = 'relicRing1';
      blessingRing.rotation.x = Math.PI * 0.4;
      relicGroup.add(blessingRing);
    } else if (godId === 'torre-relogio') {
      // 30. TORRE DO RELÓGIO: ASTROLÁBIO DE WESTMINSTER & ENGRENAGENS DE CIRCUITO
      const brassGearMat = new THREE.MeshStandardMaterial({
        color: 0xd4af37,
        metalness: 0.94,
        roughness: 0.16,
        emissive: 0x8c6a2b,
        emissiveIntensity: 0.4
      });
      const chronoBlueMat = new THREE.MeshStandardMaterial({
        color: 0x38bdf8,
        roughness: 0.08,
        metalness: 0.3,
        emissive: 0x0284c7,
        emissiveIntensity: 0.85
      });

      // Anel Dentado do Zodíaco
      const outerGear = new THREE.Mesh(new THREE.TorusGeometry(0.13, 0.012, 14, 36), brassGearMat);
      relicGroup.add(outerGear);

      // 6 Dentes de Precisão no Aro
      for (let i = 0; i < 6; i++) {
        const ang = i * (Math.PI * 2 / 6);
        const tooth = new THREE.Mesh(new THREE.BoxGeometry(0.018, 0.018, 0.012), brassGearMat);
        tooth.position.set(Math.cos(ang) * 0.13, Math.sin(ang) * 0.13, 0);
        tooth.rotation.z = ang;
        relicGroup.add(tooth);
      }

      // Engrenagem Central Menor
      const innerGear = new THREE.Mesh(new THREE.CylinderGeometry(0.065, 0.065, 0.015, 16), brassGearMat);
      innerGear.rotation.x = Math.PI * 0.5;
      relicGroup.add(innerGear);

      // Ponteiros do Juízo de Westminster
      const hand1 = new THREE.Mesh(new THREE.BoxGeometry(0.006, 0.09, 0.008), chronoBlueMat);
      hand1.position.set(0, 0.04, 0.012);
      relicGroup.add(hand1);

      const hand2 = new THREE.Mesh(new THREE.BoxGeometry(0.065, 0.006, 0.008), chronoBlueMat);
      hand2.position.set(0.028, 0, 0.012);
      relicGroup.add(hand2);

      // Anel Orbital de Circuitos Mágicos
      const circuitRing = new THREE.Mesh(new THREE.TorusGeometry(0.15, 0.006, 12, 32), chronoBlueMat);
      circuitRing.name = 'relicRing1';
      circuitRing.rotation.x = Math.PI * 0.42;
      relicGroup.add(circuitRing);
    } else if (godId === 'vampiros') {
      // 31. VAMPIROS: CÁLICE DA DINASTIA NOTURNA & SANGUE CARMESIM VIVO
      const antiqueSilverChaliceMat = new THREE.MeshStandardMaterial({
        color: 0x94a3b8,
        metalness: 0.94,
        roughness: 0.14,
        emissive: 0x334155,
        emissiveIntensity: 0.3
      });
      const bloodRubyMat = new THREE.MeshStandardMaterial({
        color: 0x9d0208,
        roughness: 0.06,
        metalness: 0.3,
        emissive: 0xd90429,
        emissiveIntensity: 1.2
      });

      // Base do Cálice
      const chaliceBase = new THREE.Mesh(new THREE.CylinderGeometry(0.075, 0.09, 0.02, 16), antiqueSilverChaliceMat);
      chaliceBase.position.y = -0.16;
      relicGroup.add(chaliceBase);

      // Haste Torneada com Nó Central
      const chaliceStem = new THREE.Mesh(new THREE.CylinderGeometry(0.010, 0.010, 0.18, 12), antiqueSilverChaliceMat);
      chaliceStem.position.y = -0.06;
      relicGroup.add(chaliceStem);

      const stemKnot = new THREE.Mesh(new THREE.SphereGeometry(0.022, 12, 12), bloodRubyMat);
      stemKnot.position.y = -0.06;
      relicGroup.add(stemKnot);

      // Taça Gótica do Cálice
      const chaliceCup = new THREE.Mesh(new THREE.ConeGeometry(0.08, 0.14, 16), antiqueSilverChaliceMat);
      chaliceCup.rotation.x = Math.PI;
      chaliceCup.position.y = 0.08;
      relicGroup.add(chaliceCup);

      // Gema de Sangue Carmesim Flutuando no Interior
      const bloodOrb = new THREE.Mesh(new THREE.SphereGeometry(0.038, 16, 16), bloodRubyMat);
      bloodOrb.position.y = 0.12;
      relicGroup.add(bloodOrb);

      // Anel Orbital de Sangue Nobre
      const bloodRing = new THREE.Mesh(new THREE.TorusGeometry(0.14, 0.007, 12, 32), bloodRubyMat);
      bloodRing.name = 'relicRing1';
      bloodRing.rotation.x = Math.PI * 0.42;
      relicGroup.add(bloodRing);
    } else if (godId === 'merlin' || godId === 'ordem-merlin') {
      // 32. MERLINIANOS: CAJADO DRACÔNICO DE AVALON & ORBE DO ÉTER
      const ancientOakMat = new THREE.MeshStandardMaterial({
        color: 0x451a03,
        roughness: 0.4,
        metalness: 0.15
      });
      const dragonBronzeMat = new THREE.MeshStandardMaterial({
        color: 0xd4af37,
        metalness: 0.94,
        roughness: 0.15,
        emissive: 0x8c6a2b,
        emissiveIntensity: 0.35
      });
      const etherOrbMat = new THREE.MeshStandardMaterial({
        color: 0x38bdf8,
        transparent: true,
        opacity: 0.88,
        roughness: 0.04,
        metalness: 0.2,
        emissive: 0x0284c7,
        emissiveIntensity: 1.1
      });

      // Haste Espiralada de Carvalho
      const staffMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.010, 0.013, 0.76, 12), ancientOakMat);
      staffMesh.position.y = -0.06;
      relicGroup.add(staffMesh);

      // Garras de Dragão Sustentando o Orbe
      [0, Math.PI * 0.66, Math.PI * 1.33].forEach(ang => {
        const claw = new THREE.Mesh(new THREE.ConeGeometry(0.012, 0.12, 6), dragonBronzeMat);
        claw.position.set(Math.cos(ang) * 0.038, 0.30, Math.sin(ang) * 0.038);
        claw.rotation.z = Math.sin(ang) * 0.3;
        claw.rotation.x = Math.cos(ang) * -0.3;
        relicGroup.add(claw);
      });

      // Orbe Sagrado de Éter Puro de Avalon
      const etherOrb = new THREE.Mesh(new THREE.SphereGeometry(0.045, 18, 18), etherOrbMat);
      etherOrb.position.y = 0.33;
      relicGroup.add(etherOrb);

      // Anel Orbital de Mistérios de Avalon
      const avalonRing = new THREE.Mesh(new THREE.TorusGeometry(0.14, 0.006, 12, 32), etherOrbMat);
      avalonRing.name = 'relicRing1';
      avalonRing.rotation.x = Math.PI * 0.4;
      relicGroup.add(avalonRing);
    } else if (godId === 'anfitrite') {

      // 33. ANFITRITE: TRIDENTE REAL DAS MARÉS & CONCHA NÁUTILO PEROLADA
      const pearlOceanMat = new THREE.MeshStandardMaterial({
        color: 0xf0fdfa,
        metalness: 0.90,
        roughness: 0.12,
        emissive: 0x5eead4,
        emissiveIntensity: 0.5
      });
      const seaGoldMat = new THREE.MeshStandardMaterial({
        color: 0xd4af37,
        metalness: 0.95,
        roughness: 0.14,
        emissive: 0xb8860b,
        emissiveIntensity: 0.4
      });
      const tideTurquoiseMat = new THREE.MeshStandardMaterial({
        color: 0x00f5d4,
        roughness: 0.08,
        metalness: 0.35,
        emissive: 0x0f766e,
        emissiveIntensity: 1.1
      });

      const tridentGroup = new THREE.Group();
      tridentGroup.rotation.z = 0.22;

      // Haste Real de Madrepérola e Ouro Oceânico
      const shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.009, 0.009, 0.72, 16), pearlOceanMat);
      shaft.position.y = -0.02;
      tridentGroup.add(shaft);

      // Concha Náutilo Esculpida na Base da Cabeça
      const nautilus = new THREE.Mesh(new THREE.TorusGeometry(0.045, 0.014, 12, 28, Math.PI * 1.5), seaGoldMat);
      nautilus.position.set(0, 0.16, 0);
      nautilus.rotation.z = 0.45;
      tridentGroup.add(nautilus);

      // Guarda em Forma de Onda Curva
      const waveCross = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.018, 0.02), seaGoldMat);
      waveCross.position.y = 0.20;
      tridentGroup.add(waveCross);

      // Lâmina Central do Tridente das Marés
      const centerBlade = new THREE.Mesh(new THREE.ConeGeometry(0.024, 0.22, 10), tideTurquoiseMat);
      centerBlade.scale.set(1.3, 1.0, 0.35);
      centerBlade.position.y = 0.32;
      tridentGroup.add(centerBlade);

      // Dois Dentes Curvos em Onda (Esquerda e Direita)
      [-1, 1].forEach(side => {
        const sideTine = new THREE.Mesh(new THREE.ConeGeometry(0.018, 0.17, 8), tideTurquoiseMat);
        sideTine.scale.set(1.2, 1.0, 0.35);
        sideTine.position.set(side * 0.065, 0.28, 0);
        sideTine.rotation.z = side * -0.18;
        tridentGroup.add(sideTine);
      });

      relicGroup.add(tridentGroup);

      // Anel Orbital de Correntezas Oceânicas
      const abyssRing = new THREE.Mesh(new THREE.TorusGeometry(0.16, 0.006, 12, 32), tideTurquoiseMat);
      abyssRing.name = 'relicRing1';
      abyssRing.rotation.x = Math.PI * 0.42;
      relicGroup.add(abyssRing);
    } else if (godId === 'macaria') {

      // 34. MACÁRIA: COROA FÚNEBRE DE LÍRIOS ESPECTRAIS & ASFÓDELOS
      const silverGhostMat = new THREE.MeshStandardMaterial({
        color: 0xf1f5f9,
        metalness: 0.92,
        roughness: 0.15,
        emissive: 0x94a3b8,
        emissiveIntensity: 0.4
      });
      const asphodelLilyMat = new THREE.MeshStandardMaterial({
        color: 0xe0e7ff,
        transparent: true,
        opacity: 0.85,
        roughness: 0.10,
        metalness: 0.2,
        emissive: 0x818cf8,
        emissiveIntensity: 0.9
      });

      // Diadema Prateado
      const crownBand = new THREE.Mesh(new THREE.TorusGeometry(0.11, 0.010, 14, 36, Math.PI * 1.2), silverGhostMat);
      crownBand.rotation.x = Math.PI * 0.5;
      crownBand.position.y = -0.04;
      relicGroup.add(crownBand);

      // 5 Flores de Asfódelo Desabrochando
      [-2, -1, 0, 1, 2].forEach(idx => {
        const flower = new THREE.Mesh(new THREE.ConeGeometry(0.024, 0.08, 6), asphodelLilyMat);
        flower.position.set(idx * 0.045, 0.03 + Math.abs(idx) * -0.015, 0);
        flower.rotation.z = idx * -0.15;
        relicGroup.add(flower);

        const stamen = new THREE.Mesh(new THREE.SphereGeometry(0.008, 8, 8), silverGhostMat);
        stamen.position.set(idx * 0.045, 0.075 + Math.abs(idx) * -0.015, 0);
        relicGroup.add(stamen);
      });

      // Anel Orbital de Repouso Eterno
      const reposeRing = new THREE.Mesh(new THREE.TorusGeometry(0.16, 0.006, 12, 32), asphodelLilyMat);
      reposeRing.name = 'relicRing1';
      reposeRing.rotation.x = Math.PI * 0.4;
      relicGroup.add(reposeRing);
    } else if (godId === 'zagreu') {

      // 35. ZAGREU: CHAMA CTÔNICA DO RENASCIMENTO & GRILHÕES PARTIDOS
      const chthonicFlameMat = new THREE.MeshStandardMaterial({
        color: 0xff2a4b,
        roughness: 0.08,
        metalness: 0.2,
        emissive: 0xd90429,
        emissiveIntensity: 1.5
      });
      const obsidianChainMat = new THREE.MeshStandardMaterial({
        color: 0x18181b,
        metalness: 0.95,
        roughness: 0.18,
        emissive: 0x27272a,
        emissiveIntensity: 0.35
      });
      const goldEmberMat = new THREE.MeshStandardMaterial({
        color: 0xffaa00,
        roughness: 0.05,
        metalness: 0.1,
        emissive: 0xff8c00,
        emissiveIntensity: 1.8
      });

      // Fogueira Central do Renascimento
      const flameCore = new THREE.Mesh(new THREE.ConeGeometry(0.048, 0.24, 12), chthonicFlameMat);
      flameCore.position.y = 0.04;
      relicGroup.add(flameCore);

      const emberInner = new THREE.Mesh(new THREE.ConeGeometry(0.026, 0.16, 8), goldEmberMat);
      emberInner.position.y = 0.03;
      relicGroup.add(emberInner);

      // Dois Segmentos de Grilhões de Tártaro Partidos
      [-1, 1].forEach(side => {
        const link1 = new THREE.Mesh(new THREE.TorusGeometry(0.032, 0.008, 8, 16), obsidianChainMat);
        link1.position.set(side * 0.09, -0.06, 0);
        link1.rotation.y = side * 0.4;
        relicGroup.add(link1);

        const link2 = new THREE.Mesh(new THREE.TorusGeometry(0.028, 0.007, 8, 16), obsidianChainMat);
        link2.position.set(side * 0.13, -0.11, 0);
        link2.rotation.x = Math.PI * 0.5;
        relicGroup.add(link2);
      });

      // Anel Orbital de Renascimento
      const rebirthRing = new THREE.Mesh(new THREE.TorusGeometry(0.16, 0.007, 12, 32), chthonicFlameMat);
      rebirthRing.name = 'relicRing1';
      rebirthRing.rotation.x = Math.PI * 0.44;
      relicGroup.add(rebirthRing);
    } else {
      // Fallback Decorativo: Astrolábio Celestial
      const sigilGeom = new THREE.TorusGeometry(0.14, 0.008, 16, 32);
      const sigilMat = new THREE.MeshStandardMaterial({
        color: classColor,
        metalness: 0.9,
        roughness: 0.2,
        emissive: classColor,
        emissiveIntensity: 0.5
      });
      const sigil = new THREE.Mesh(sigilGeom, sigilMat);
      sigil.name = 'relicRing1';
      relicGroup.add(sigil);
    }

    // POSIÇÃO SEGURA: Fica à direita da estela 3D (w/2 + bevel = 1.26), com raio <= 0.16 e folga limpa
    relicGroup.position.set(0.80, 0.38, 0.30);

    return relicGroup;
  }

  function build3DPedestal() {
    const pedestalGroup = new THREE.Group();

    // Base de Pedra / Ardósia Mística
    const baseGeom = new THREE.CylinderGeometry(1.45, 1.55, 0.12, 48);
    const baseMat = new THREE.MeshStandardMaterial({
      color: 0x0e111a,
      roughness: 0.55,
      metalness: 0.35
    });
    const baseMesh = new THREE.Mesh(baseGeom, baseMat);
    baseMesh.receiveShadow = true;
    pedestalGroup.add(baseMesh);

    // Anel Dourado Externo
    const outerRingGeom = new THREE.TorusGeometry(1.52, 0.022, 16, 64);
    const goldMat = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      metalness: 0.9,
      roughness: 0.2,
      emissive: 0x8c6a2b,
      emissiveIntensity: 0.25
    });
    const outerRing = new THREE.Mesh(outerRingGeom, goldMat);
    outerRing.rotation.x = Math.PI * 0.5;
    pedestalGroup.add(outerRing);

    // Anel Rúnico Interno
    const innerRingGeom = new THREE.TorusGeometry(1.24, 0.014, 16, 64);
    const innerRing = new THREE.Mesh(innerRingGeom, goldMat);
    innerRing.rotation.x = Math.PI * 0.5;
    pedestalGroup.add(innerRing);

    pedestalGroup.position.set(0, -1.48, 0);
    img2threejsScene.add(pedestalGroup);
  }

  function build3DParticleSystem() {
    const particleCount = 45;
    const geom = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const velocities = [];

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 3.8;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 3.6;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 2.5;

      velocities.push({
        y: Math.random() * 0.008 + 0.004,
        x: (Math.random() - 0.5) * 0.003,
        offset: Math.random() * Math.PI * 2
      });
    }

    geom.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const pMat = new THREE.PointsMaterial({
      color: 0xffe680,
      size: 0.045,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending
    });

    img2threejsParticleSystem = new THREE.Points(geom, pMat);
    img2threejsParticleSystem.userData = { velocities };
    img2threejsScene.add(img2threejsParticleSystem);
  }

  function loadGod3DProcedural(god, token) {
    if (!img2threejsInitialized || !img2threejsScene || !god) return;
    if (token && token !== currentSelectionToken) return;

    const classMeta = CLASS_COLORS[god.primaryClass] || { color: '#d4af37' };
    const classColor = new THREE.Color(classMeta.color);

    if (img2threejsCurrentModelGroup) {
      img2threejsScene.remove(img2threejsCurrentModelGroup);
      img2threejsCurrentModelGroup = null;
    }

    const modelGroup = new THREE.Group();
    img2threejsCurrentModelGroup = modelGroup;

    // Relíquia Divina 3D
    const relic = buildProceduralRelic(god.id, classColor);
    img2threejsRelicGroup = relic;
    modelGroup.add(relic);

    // Carregamento da textura para o Beveled Slab (Assinatura Oficial 3D)
    const textureUrl = god.signatureImage || null;
    const cacheKey = god.id + '_sig';
    let cachedTexture = textureUrl ? img2threejsTextureCache.get(cacheKey) : null;

    const onTextureReady = (tex) => {
      if (token && token !== currentSelectionToken) return;
      if (state.selectedGodId !== god.id) return;

      const slabMesh = buildBeveledSlabModel(god, tex);
      modelGroup.add(slabMesh);

      // Animação de entrada suave
      modelGroup.scale.set(0.9, 0.9, 0.9);
      if (typeof gsap !== 'undefined') {
        gsap.to(modelGroup.scale, {
          x: 1,
          y: 1,
          z: 1,
          duration: 0.48,
          ease: 'power3.out'
        });
      } else {
        modelGroup.scale.set(1, 1, 1);
      }
    };

    if (!textureUrl) {
      onTextureReady(null);
    } else if (cachedTexture) {
      onTextureReady(cachedTexture);
    } else {
      const loader = new THREE.TextureLoader();
      loader.load(
        textureUrl,
        (tex) => {
          if (token && token !== currentSelectionToken) return;
          if (state.selectedGodId !== god.id) return;
          if (typeof THREE.sRGBEncoding !== 'undefined') {
            tex.encoding = THREE.sRGBEncoding;
          }
          if (typeof THREE.SRGBColorSpace !== 'undefined') {
            tex.colorSpace = THREE.SRGBColorSpace;
          }
          tex.wrapS = THREE.ClampToEdgeWrapping;
          tex.wrapT = THREE.ClampToEdgeWrapping;
          tex.minFilter = THREE.LinearFilter;
          tex.magFilter = THREE.LinearFilter;
          tex.generateMipmaps = false;
          img2threejsTextureCache.set(cacheKey, tex);
          onTextureReady(tex);
        },
        undefined,
        (err) => {
          console.warn('Textura 3D não carregada (renderizando ardósia obsidiana nobre):', err);
          onTextureReady(null);
        }
      );
    }

    img2threejsScene.add(modelGroup);
  }

  let threeAnimationId = null;

  function animate3DStage() {
    if (!is3DModeActive) {
      if (threeAnimationId) {
        cancelAnimationFrame(threeAnimationId);
        threeAnimationId = null;
      }
      return;
    }
    threeAnimationId = requestAnimationFrame(animate3DStage);
    if (!img2threejsInitialized || !img2threejsRenderer || !img2threejsScene || !img2threejsCamera) return;

    const time = img2threejsClock ? img2threejsClock.getElapsedTime() : 0;

    // Atualiza controles orbitais
    if (img2threejsControls) {
      img2threejsControls.update();
    }

    // Flutuação senoidal graciosa (Levitation Breathing)
    if (img2threejsCurrentModelGroup) {
      img2threejsCurrentModelGroup.position.y = Math.sin(time * 1.5) * 0.035;
    }

    // Animação da Relíquia Divina 3D
    if (img2threejsRelicGroup) {
      img2threejsRelicGroup.position.y = 0.15 + Math.sin(time * 2.0) * 0.04;
      img2threejsRelicGroup.rotation.y += 0.015;

      const r1 = img2threejsRelicGroup.getObjectByName('relicRing1');
      if (r1) {
        r1.rotation.z += 0.025;
        r1.rotation.x += 0.015;
      }
      const r2 = img2threejsRelicGroup.getObjectByName('relicRing2');
      if (r2) {
        r2.rotation.y -= 0.02;
        r2.rotation.z += 0.018;
      }
    }

    // Animação das Partículas 3D
    if (img2threejsParticleSystem) {
      const positions = img2threejsParticleSystem.geometry.attributes.position.array;
      const vels = img2threejsParticleSystem.userData.velocities;
      for (let i = 0; i < vels.length; i++) {
        positions[i * 3 + 1] += vels[i].y;
        positions[i * 3] += Math.sin(time + vels[i].offset) * 0.002;
        if (positions[i * 3 + 1] > 2.2) {
          positions[i * 3 + 1] = -1.6;
          positions[i * 3] = (Math.random() - 0.5) * 3.5;
        }
      }
      img2threejsParticleSystem.geometry.attributes.position.needsUpdate = true;
    }

    img2threejsRenderer.render(img2threejsScene, img2threejsCamera);
  }

  let threeStageMode = '2d'; // '2d' | 'loading3d' | '3d' | 'error3d'
  let threeResizeObserver = null;

  function showTacticalToast(message, type = 'info') {
    let toast = document.getElementById('tactical-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'tactical-toast';
      toast.className = 'tactical-toast';
      toast.setAttribute('role', 'status');
      toast.setAttribute('aria-live', 'polite');
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.className = `tactical-toast toast-${type} is-visible`;
    clearTimeout(toast._timeout);
    toast._timeout = setTimeout(() => {
      toast.classList.remove('is-visible');
    }, 3500);
  }

  function init3DHudButtons() {
    const btnToggle3D = document.getElementById('btn-toggle-3d-mode');
    const btnFlipCard = document.getElementById('btn-flip-3d-card');
    const btnAutoRotate = document.getElementById('btn-toggle-autorotate');
    const btnResetCam = document.getElementById('btn-reset-3d-camera');
    const viewport3d = document.getElementById('agent-3d-viewport');
    const artWrapper = document.getElementById('agent-artwork-wrapper');
    const hudControls = document.getElementById('stage-3d-hud-controls');

    function set2DMode() {
      threeStageMode = '2d';
      is3DModeActive = false;
      if (btnToggle3D) {
        btnToggle3D.classList.remove('is-active');
        btnToggle3D.setAttribute('aria-pressed', 'false');
        btnToggle3D.disabled = false;
        const icon = btnToggle3D.querySelector('i');
        if (icon) icon.className = 'ph ph-cube';
        const textSpan = btnToggle3D.querySelector('.hud-btn-text');
        if (textSpan) textSpan.textContent = 'MOLDURA 3D';
      }
      if (hudControls) {
        hudControls.classList.remove('is-3d-active');
      }
      if (viewport3d) {
        viewport3d.style.display = 'none';
        viewport3d.classList.add('is-hidden');
      }
      if (artWrapper) {
        artWrapper.style.opacity = '1';
        artWrapper.style.pointerEvents = 'auto';
      }
      if (threeAnimationId) {
        cancelAnimationFrame(threeAnimationId);
        threeAnimationId = null;
      }
    }

    function set3DMode() {
      threeStageMode = '3d';
      is3DModeActive = true;
      if (btnToggle3D) {
        btnToggle3D.classList.add('is-active');
        btnToggle3D.setAttribute('aria-pressed', 'true');
        btnToggle3D.disabled = false;
        const icon = btnToggle3D.querySelector('i');
        if (icon) icon.className = 'ph ph-image';
        const textSpan = btnToggle3D.querySelector('.hud-btn-text');
        if (textSpan) textSpan.textContent = 'ARTE 2D';
      }
      if (hudControls) {
        hudControls.classList.add('is-3d-active');
      }
      if (viewport3d) {
        viewport3d.style.display = 'block';
        viewport3d.classList.remove('is-hidden');
      }
      if (artWrapper) {
        artWrapper.style.opacity = '0';
        artWrapper.style.pointerEvents = 'none';
      }
      if (img2threejsRenderer && img2threejsCamera && viewport3d) {
        const w = viewport3d.clientWidth || 600;
        const h = viewport3d.clientHeight || 750;
        img2threejsCamera.aspect = w / h;
        img2threejsCamera.updateProjectionMatrix();
        img2threejsRenderer.setSize(w, h, false);
      }
      if (!threeAnimationId) {
        threeAnimationId = requestAnimationFrame(animate3DStage);
      }

      if (window.ResizeObserver && viewport3d && !threeResizeObserver) {
        threeResizeObserver = new ResizeObserver(entries => {
          for (let entry of entries) {
            const { width, height } = entry.contentRect;
            if (width > 0 && height > 0 && img2threejsRenderer && img2threejsCamera) {
              img2threejsCamera.aspect = width / height;
              img2threejsCamera.updateProjectionMatrix();
              img2threejsRenderer.setSize(width, height, false);
            }
          }
        });
        threeResizeObserver.observe(viewport3d);
      }
    }

    if (btnToggle3D) {
      btnToggle3D.addEventListener('click', () => {
        if (threeStageMode === '3d') {
          set2DMode();
          return;
        }

        threeStageMode = 'loading3d';
        const textSpan = btnToggle3D.querySelector('.hud-btn-text');
        if (textSpan) textSpan.textContent = 'CARREGANDO...';
        btnToggle3D.disabled = true;

        if (artWrapper) {
          artWrapper.style.opacity = '1';
        }

        setTimeout(() => {
          try {
            if (typeof THREE === 'undefined') {
              throw new Error('Three.js library is not loaded');
            }

            if (!img2threejsInitialized) {
              initImg2ThreejsStage();
              const god = state.divinities.find(d => d.id === state.selectedGodId);
              if (god) loadGod3DProcedural(god, currentSelectionToken);
            }

            if (!img2threejsRenderer) {
              throw new Error('WebGLRenderer could not be created');
            }

            set3DMode();
          } catch (err) {
            console.warn('Falha ao inicializar o palco 3D Three.js:', err);
            threeStageMode = 'error3d';
            set2DMode();
            showTacticalToast('Não foi possível abrir a moldura 3D. A arte 2D continua disponível.', 'warning');
          }
        }, 150);
      });
    }

    if (btnFlipCard) {
      btnFlipCard.addEventListener('click', () => {
        if (threeStageMode !== '3d' && btnToggle3D) {
          btnToggle3D.click();
        }

        if (!img2threejsCurrentSlabMesh) return;

        isSlabFlipped = !isSlabFlipped;
        btnFlipCard.classList.toggle('is-active', isSlabFlipped);
        btnFlipCard.setAttribute('aria-pressed', isSlabFlipped ? 'true' : 'false');
        const textSpan = btnFlipCard.querySelector('.hud-btn-text');
        if (textSpan) textSpan.textContent = isSlabFlipped ? 'VER FRENTE' : 'VER VERSO';

        const targetRotY = isSlabFlipped ? Math.PI : 0;

        if (typeof gsap !== 'undefined') {
          gsap.to(img2threejsCurrentSlabMesh.rotation, {
            y: targetRotY,
            duration: 0.85,
            ease: 'power2.inOut'
          });
        } else {
          img2threejsCurrentSlabMesh.rotation.y = targetRotY;
        }
      });
    }

    if (btnAutoRotate) {
      btnAutoRotate.addEventListener('click', () => {
        is3DAutoRotate = !is3DAutoRotate;
        if (img2threejsControls) {
          img2threejsControls.autoRotate = is3DAutoRotate;
        }
        btnAutoRotate.classList.toggle('is-active', is3DAutoRotate);
        btnAutoRotate.setAttribute('aria-pressed', is3DAutoRotate ? 'true' : 'false');
        const textSpan = btnAutoRotate.querySelector('.hud-btn-text');
        if (textSpan) textSpan.textContent = is3DAutoRotate ? 'PARAR GIRO' : 'GIRAR';
      });
    }

    if (btnResetCam) {
      btnResetCam.addEventListener('click', () => {
        if (img2threejsCurrentSlabMesh && isSlabFlipped) {
          isSlabFlipped = false;
          if (btnFlipCard) {
            btnFlipCard.classList.remove('is-active');
            btnFlipCard.setAttribute('aria-pressed', 'false');
            const textSpan = btnFlipCard.querySelector('.hud-btn-text');
            if (textSpan) textSpan.textContent = 'VER VERSO';
          }
          if (typeof gsap !== 'undefined') {
            gsap.to(img2threejsCurrentSlabMesh.rotation, { y: 0, duration: 0.6 });
          } else {
            img2threejsCurrentSlabMesh.rotation.y = 0;
          }
        }
        if (img2threejsControls && img2threejsCamera) {
          img2threejsControls.reset();
          img2threejsCamera.position.set(0, 0.35, 4.4);
        }
      });
    }

    // Inicialização do estado de exibição: 2D padrão por definição
    set2DMode();
  }

  // ===========================================================================
  function renderAbilitySlots(god) {
    const track = document.getElementById('ability-slots-track');
    if (!track) return;
    track.innerHTML = '';

    const abilities = god.abilities || [];

    abilities.forEach((ab, idx) => {
      const lvlKey = ab.key || (typeof ab.level === 'number' ? `N${ab.level}` : ab.level.toString());
      const lvlValue = ab.level;
      const isLvlActive = isLevelMatch(ab, state.selectedLevel);

      const isNoAcq = (ab.status === 'no_acquisition');
      const isDev = (ab.status === 'development');
      const btn = document.createElement('button');
      btn.className = `ability-slot-btn ${isLvlActive ? 'active' : ''} ${isNoAcq ? 'is-no-acquisition' : ''} ${isDev ? 'is-development' : ''}`;
      btn.setAttribute('data-level', lvlValue);
      btn.setAttribute('role', 'tab');
      btn.setAttribute('aria-selected', isLvlActive ? 'true' : 'false');
      btn.setAttribute('title', `${lvlKey}: ${ab.name}`);

      const keyDisplay = typeof lvlValue === 'number' ? `[${lvlValue}] ${lvlKey}` : `[${lvlKey}]`;

      btn.innerHTML = `
        <span class="slot-key-label">${keyDisplay}</span>
        <i class="ph ${ab.icon || 'ph-lightning'} slot-icon"></i>
      `;

      btn.addEventListener('click', () => {
        state.selectedLevel = lvlValue;
        state.selectedChoiceIndex = 0;
        document.querySelectorAll('.ability-slot-btn').forEach(b => {
          const isActive = b.getAttribute('data-level').toString() === lvlValue.toString();
          b.classList.toggle('active', isActive);
          b.setAttribute('aria-selected', isActive ? 'true' : 'false');
        });

        // Se estiver em cascata, rola até o bloco correspondente
        if (state.viewMode === 'cascade') {
          const block = document.getElementById(`cascade-level-${lvlValue}`);
          if (block) block.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        } else {
          const currentGod = state.divinities.find(d => d.id === state.selectedGodId) || god;
          renderTacticalAbilityDeck(currentGod);
        }
        syncUrlState();
      });

      track.appendChild(btn);
    });
  }

  // ===========================================================================
  // 7. DECK TÁTICO EXPANDIDO: PARSER CANÔNICO & ATRIBUTOS/CUSTOS/FICHAS
  // ===========================================================================
  function parseTacticalAbility(choice, ab, god) {
    const fullText = (choice && choice.desc) ? choice.desc.trim() : (ab && ab.desc ? ab.desc.trim() : '');
    const choiceName = (choice && choice.name) ? choice.name.trim() : (ab ? ab.name : 'Habilidade');
    const choiceType = (choice && choice.type) ? choice.type.trim() : (ab ? ab.type : 'Ativo');

    // POW-01: Não classificar poderes com Ativo/Passivo ou custo explícito como passiva gratuita!
    const isExplicitPassiveOnly = /^passiv/i.test(choiceType) && !/ativ/i.test(choiceType);

    // 1. Lore / Narrativa vs Efeito
    let loreText = '';
    let effectText = '';

    const effectMarkerMatch = fullText.match(/(.*?)(?:(?:\(|\[)?\s*EFEITO\s*:\s*|\(Efeito\s*:\s*)(.*)/is);
    if (effectMarkerMatch) {
      loreText = effectMarkerMatch[1].trim();
      effectText = effectMarkerMatch[2].trim().replace(/\)$/, '').trim();
    } else {
      const trailingParenMatch = fullText.match(/^(.*?)\s*\(([^)]*(?:mana|turno|def|atk|hp|spd|taxa|dano|cooldown|concede|recebe|sucesso|teste|custa|custo|alvo)[^)]*)\)\s*(\[[^\]]*\])?\s*$/is);
      if (trailingParenMatch) {
        loreText = trailingParenMatch[1].trim();
        effectText = trailingParenMatch[2].trim();
      } else {
        loreText = fullText;
        effectText = fullText;
      }
    }

    // Limpa tags do tipo [Ativo] ou [Passivo] da narrativa
    loreText = loreText.replace(/\[\s*(?:Ativo|Passivo)[^\]]*\]/gi, '').trim();

    // Separação de frases mecânicas quando não estiverem entre parênteses
    const mechanicsSentenceMatch = loreText.match(/^(.*?)(?:\s+(?:Concede|Garante|Causa|Aumenta|Reduz|Alvo|Recupera|Custa|Custo|Dano|Para cada)\b.*)/is);
    if (mechanicsSentenceMatch && mechanicsSentenceMatch[1].trim().length > 15) {
      loreText = mechanicsSentenceMatch[1].trim();
    }

    // Regra Canônica do Desenvolvedor: o resumo interpretativo tem até 30 palavras
    function limitTo30Words(text) {
      if (!text) return '';
      const words = text.trim().split(/\s+/);
      if (words.length <= 30) return text.trim();
      return words.slice(0, 30).join(' ').replace(/[\s,;:\.\-]+$/, '') + '...';
    }
    loreText = limitTo30Words(loreText);
    // CRÍTICO (POW-01): effectText NÃO é truncado a 30 palavras para preservar regras completas!

    // 2. Fichas de Metadados (Custo, Cooldown, Duração, Alcance)
    const chips = [];

    // A. CUSTO (POW-01: Priorizar custo explícito em vez de inferência de passiva)
    let costVal = null;
    const explicitCostMatch = fullText.match(/(?:Custo:?|Custa:?)\s*([0-9]+\s*(?:de\s+)?mana(?:\s+(?:por\s+turno|por\s+invocação|por\s+guardião|por\s+ave|adicional))?|[0-9]+%\s*(?:de\s+)?energia|[0-9]+\s*(?:de\s+)?hp|[0-9]+\s*ações?|[0-9]+\s*ação)/i);
    if (explicitCostMatch) {
      costVal = explicitCostMatch[1].replace(/de\s+/i, '').trim();
    } else if (choice && choice.cost) {
      costVal = choice.cost;
    } else if (isExplicitPassiveOnly && !explicitCostMatch) {
      costVal = 'Passivo (0 Mana)';
    } else {
      costVal = 'Custo não especificado na fonte';
    }
    chips.push({ label: 'CUSTO', val: costVal, type: 'cost', icon: 'ph-fire' });

    // B. DURAÇÃO (Separada estritamente de Cooldown)
    const durMatch = fullText.match(/(?:Dura(?:ção)?:?\s*)([0-9]+\s*turnos?|[^\.,;\)]+)/i);
    if (durMatch) {
      let durVal = durMatch[1].trim();
      if (!/cooldown/i.test(durVal)) {
        chips.push({ label: 'DURAÇÃO', val: durVal, type: 'duration', icon: 'ph-clock' });
      }
    }

    // C. COOLDOWN (Separado estritamente de Duração)
    const cdMatch = fullText.match(/(?:Cooldown:?|CD:?)\s*([0-9]+\s*turnos?|[0-9]+x\s*por\s*[^\.,;\)]+|1\s*turno)/i);
    if (cdMatch) {
      chips.push({ label: 'COOLDOWN', val: cdMatch[1].trim(), type: 'cd', icon: 'ph-hourglass' });
    }

    // D. ALCANCE
    const rangeMatch = fullText.match(/(?:Alcance:?|Raio:?)\s*([0-9]+(?:\.[0-9]+)?\s*(?:km|metros?|m\b)[^\.,;\)]*|Curto Alcance|Médio Alcance|Longo Alcance|Área Tática|Alvo Único)/i);
    if (rangeMatch) {
      chips.push({ label: 'ALCANCE', val: rangeMatch[1].trim(), type: 'range', icon: 'ph-crosshair' });
    }

    // E. ATRIBUTOS GANHOS UNIFICADOS (POW-01: Exigir sinal +/-, nunca incluir MANA como bônus)
    const statMatches = [];
    // Apenas bônus de atributos com sinal (+ ou -), excluindo MANA (que pertence ao custo)
    const statRegex = /(?:\+|-)\d+%?\s*(?:de\s+)?(?:ATK|DEF|HP|SPD|TAXA\s*CRIT(?:\.)?|DANO\s*CRIT(?:\.)?|ACERTO|ESQUIVA)\b/gi;
    let m;
    // Se o poder possui variantes subordinadas (ex: Arsenal de Zagreu), extrair bônus apenas do efeito geral
    const textForStats = (choice && choice.variants && choice.variants.length > 0)
      ? (fullText.split(/\*\*[a-z]\)/i)[0] || fullText)
      : fullText;

    while ((m = statRegex.exec(textForStats)) !== null) {
      const cleaned = m[0].replace(/de\s+/i, '').trim();
      if (!statMatches.includes(cleaned)) {
        statMatches.push(cleaned);
      }
    }

    if (statMatches.length > 0) {
      let unifiedStats = '';
      if (statMatches.length === 1) {
        unifiedStats = statMatches[0];
      } else if (statMatches.length === 2) {
        unifiedStats = `${statMatches[0]} e ${statMatches[1]}`;
      } else {
        unifiedStats = `${statMatches.slice(0, -1).join(', ')} e ${statMatches[statMatches.length - 1]}`;
      }
      chips.push({ label: 'BÔNUS', val: unifiedStats, type: 'attribute', icon: 'ph-chart-line-up' });
    }

    // E. FICHA DE CRIATURA / INVOCADO (Guardiões, Golens, Cérberos)
    let creatureData = null;
    const creatureMatch = fullText.match(/(\d+)\s*HP[,\s]+(\d+)\s*ATK[,\s]+(\d+)\s*DEF(?:[,\s]+(\d+)\s*SPD)?(?:[,\s]+(\d+)%\s*TAXA\s*CRIT\.?)?(?:[,\s]*(?:e\s*)?(\d+)%\s*DANO\s*CRIT\.?)?/i);
    if (creatureMatch) {
      creatureData = {
        hp: creatureMatch[1],
        atk: creatureMatch[2],
        def: creatureMatch[3],
        spd: creatureMatch[4] || null,
        taxa: creatureMatch[5] || null,
        dano: creatureMatch[6] || null
      };
    } else {
      const simpleCreatureMatch = fullText.match(/(\d+)\s*HP[,\s]+(\d+)\s*ATK[,\s]+(\d+)\s*DEF/i);
      if (simpleCreatureMatch) {
        creatureData = {
          hp: simpleCreatureMatch[1],
          atk: simpleCreatureMatch[2],
          def: simpleCreatureMatch[3]
        };
      }
    }

    // F. SUBEFEITOS (Ex: Aura Purificadora no Patrono de Merlin)
    const subeffects = [];
    if (fullText.includes('| Aura Purificadora')) {
      subeffects.push({
        name: 'Aura Purificadora (Subefeito Operacional)',
        cost: '150 de Mana',
        duration: '2 Turnos',
        desc: 'O patrono exerce uma aura purificadora em área que remove qualquer debuff do merliniano e de seus aliados originado de seres das trevas (bruxas, demônios, vampiros e espectros). Cooldown: 5 turnos. Teste de Vontade [1d20, nec: 12].'
      });
    }

    // Palavras de Ativação / Encantamento
    const wordsMatch = fullText.match(/\(Palavras:\s*([^)]+)\)/i);
    const incantation = wordsMatch ? wordsMatch[1].trim() : null;

    return {
      name: choiceName,
      type: choiceType,
      interpretive: loreText,
      mechanics: effectText,
      chips: chips,
      creature: creatureData,
      subeffects: subeffects,
      incantation: incantation
    };
  }

  function formatMarkdownInline(text) {
    if (!text) return '';
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>');
  }

  function renderTacticalDetailsHtml(parsed, choice) {
    let html = '';

    // 1. Grid de Chips Rápidos
    html += `<div class="tactical-stats-chips-grid">`;
    html += parsed.chips.map(c => `
      <span class="tactical-stat-chip chip-${c.type}">
        <i class="ph ${c.icon}"></i>
        <span class="chip-label">${c.label}:</span>
        <strong class="chip-val">${c.val}</strong>
      </span>
    `).join('');
    if (parsed.incantation) {
      html += `
        <span class="tactical-stat-chip chip-incantation">
          <i class="ph ph-sparkle"></i>
          <span class="chip-label">INCANTAÇÃO:</span>
          <strong class="chip-val">${parsed.incantation}</strong>
        </span>
      `;
    }
    html += `</div>`;

    // 2. Ficha de Criatura / Invocado (caso exista)
    if (parsed.creature) {
      html += `
        <div class="creature-stat-dossier">
          <div class="creature-dossier-header">
            <i class="ph ph-shield-chevron"></i>
            <span>ESTATÍSTICAS DA CRIATURA / INVOCADO (FICHA PRÓPRIA)</span>
          </div>
          <div class="creature-stat-grid">
            <div class="creature-stat-box"><span class="c-label">HP</span><strong class="c-val">${parsed.creature.hp}</strong></div>
            <div class="creature-stat-box"><span class="c-label">ATK</span><strong class="c-val">${parsed.creature.atk}</strong></div>
            <div class="creature-stat-box"><span class="c-label">DEF</span><strong class="c-val">${parsed.creature.def}</strong></div>
            ${parsed.creature.spd ? `<div class="creature-stat-box"><span class="c-label">SPD</span><strong class="c-val">${parsed.creature.spd}</strong></div>` : ''}
            ${parsed.creature.taxa ? `<div class="creature-stat-box"><span class="c-label">TAXA CRIT</span><strong class="c-val">${parsed.creature.taxa}%</strong></div>` : ''}
            ${parsed.creature.dano ? `<div class="creature-stat-box"><span class="c-label">DANO CRIT</span><strong class="c-val">${parsed.creature.dano}%</strong></div>` : ''}
          </div>
        </div>
      `;
    }

    // 3. Subefeitos Operacionais
    if (parsed.subeffects && parsed.subeffects.length > 0) {
      html += `
        <div class="subeffects-dossier">
          ${parsed.subeffects.map(sub => `
            <div class="subeffect-card">
              <div class="subeffect-header">
                <span class="subeffect-title"><i class="ph ph-circles-three"></i> ${sub.name}</span>
                <span class="subeffect-cost">${sub.cost}</span>
              </div>
              <div class="subeffect-desc">${sub.desc}</div>
            </div>
          `).join('')}
        </div>
      `;
    }

    // 4. Variantes Canônicas (Caminhos Exclusivos, Materiais, Modos, Cores, Guerras)
    const activeChoice = choice || parsed.rawChoice;
    if (activeChoice && activeChoice.variants && activeChoice.variants.length > 0) {
      const selectedVIdx = state.selectedVariantIndex || 0;
      const currentVar = activeChoice.variants[selectedVIdx] || activeChoice.variants[0];
      html += `
        <div class="tactical-variants-dossier">
          <div class="tactical-variants-header">
            <i class="ph ph-git-fork"></i>
            <span>VARIANTES / CAMINHOS CANÔNICOS SUBORDINADOS (${activeChoice.variants.length} OPÇÕES)</span>
          </div>
          <div class="tactical-variant-tabs-row" role="tablist">
            ${activeChoice.variants.map((v, vIdx) => `
              <button type="button" class="tactical-variant-tab-btn ${vIdx === selectedVIdx ? 'active' : ''}" data-variant-idx="${vIdx}" role="tab" aria-selected="${vIdx === selectedVIdx}">
                <i class="ph ph-arrow-elbow-down-right"></i>
                <span>${v.name}</span>
              </button>
            `).join('')}
          </div>
          <div class="tactical-variant-display-box">
            <div class="variant-box-title">
              <strong>${currentVar.name}</strong>
              <span class="stat-tag tag-type">[${(currentVar.type || 'Variante').toUpperCase()}]</span>
            </div>
            <div class="variant-box-desc">${formatMarkdownInline(currentVar.desc)}</div>
          </div>
        </div>
      `;
    }

    // 5. Tabelas Táticas (Tique, Tânatos, Santa Igreja, etc.)
    if (activeChoice && activeChoice.tables && activeChoice.tables.length > 0) {
      html += `
        <div class="tactical-tables-dossier">
          ${activeChoice.tables.map(tbl => {
            const tableTitle = tbl.caption || tbl.title || 'TABELA DE RESULTADOS';
            const headers = (tbl.headers && tbl.headers.length > 0)
              ? tbl.headers
              : ['GATILHO / ROLAGEM', 'EFEITO CANÔNICO'];
            
            const rowsHtml = (tbl.rows || []).map(r => {
              if (Array.isArray(r)) {
                return `
                  <tr>
                    ${r.map((col, cIdx) => `
                      <td class="${cIdx === 0 ? 'col-trigger' : 'col-effect'}">
                        ${cIdx === 0 ? `<strong>${col}</strong>` : col}
                      </td>
                    `).join('')}
                  </tr>
                `;
              } else {
                return `
                  <tr>
                    <td class="col-trigger"><strong>${r.trigger || r.roll || ''}</strong></td>
                    <td class="col-effect">${r.effect || r.desc || ''}</td>
                  </tr>
                `;
              }
            }).join('');

            return `
              <div class="tactical-result-table-wrapper">
                <div class="table-caption"><i class="ph ph-table"></i> ${tableTitle}</div>
                <table class="tactical-result-table">
                  <thead>
                    <tr>
                      ${headers.map(h => `<th>${h.toUpperCase()}</th>`).join('')}
                    </tr>
                  </thead>
                  <tbody>
                    ${rowsHtml}
                  </tbody>
                </table>
              </div>
            `;
          }).join('')}
        </div>
      `;
    }

    // 6. Bloco Textual Completo de Regras (POW-01: formatado com segurança e preservação integral)
    html += `
      <div class="tactical-mechanics-body">
        <p>${formatMarkdownInline(parsed.mechanics)}</p>
      </div>
    `;

    return html;
  }

  function renderTacticalAbilityDeck(god) {
    const container = document.getElementById('tactical-deck-content');
    if (!container) return;

    container.innerHTML = '';
    const abilities = god.abilities || [];
    if (god.status === 'development') {
      container.innerHTML = `
        <div class="tactical-development-card">
          <div class="development-header">
            <i class="ph ph-hourglass-high"></i>
            <span>DOCUMENTAÇÃO EM FASE DE DESENVOLVIMENTO CANÔNICO</span>
          </div>
          <p class="development-desc">
            A entidade <strong>${god.name}</strong> (${god.heroTitle || ''}) possui identidade visual e mitologia aprovadas no cânone de Midnight City, porém o seu documento oficial de regras mecânicas e lista de habilidades aguarda publicação editorial.
          </p>
          <div class="development-sub">
            Em conformidade estrita com a Auditoria Canônica v3, nenhum conjunto de poderes substituto ou de terceiros é exibido como oficial nesta página.
          </div>
        </div>
      `;
      return;
    }


    // MODO 1: NÍVEL ATUAL
    if (state.viewMode === 'current') {
      const targetGod = god || state.divinities.find(d => d.id === state.selectedGodId) || (typeof VALIDATION_DIVINITIES !== 'undefined' ? VALIDATION_DIVINITIES.find(d => d.id === state.selectedGodId) : null);
      const activeAbilities = (targetGod && targetGod.abilities) ? targetGod.abilities : abilities;
      const ab = activeAbilities.find(a => isLevelMatch(a, state.selectedLevel)) || activeAbilities[0] || {
        level: state.selectedLevel,
        key: `N${state.selectedLevel}`,
        name: `Habilidade Nível ${state.selectedLevel}`,
        type: 'Ativo',
        cost: '1 Ação • 15 Mana',
        desc: 'Descrição canônica dos efeitos de combate deste nível.',
        icon: 'ph-lightning',
        choices: []
      };

      if (ab.status === 'no_acquisition') {
        const godDisplayName = targetGod ? targetGod.name : (god ? god.name : 'esta divindade');
        container.innerHTML = `
          <div class="tactical-no-acq-card">
            <div class="no-acq-header">
              <i class="ph ph-shield-check"></i>
              <span>NÍVEL SEM AQUISIÇÃO DIRETA DE PODER</span>
            </div>
            <p class="no-acq-desc">
              Conforme o documento canônico oficial de <strong>${godDisplayName}</strong>, novos poderes são adquiridos exclusivamente nos níveis ímpares (N1, N3, N5, N7).
            </p>
            <div class="no-acq-sub">
              No Nível ${ab.level}, o semideus aprimora seus atributos, resistências e maestrias existentes sem selecionar um novo poder do catálogo.
            </div>
          </div>
        `;
        return;
      }

      if (ab.status === 'development') {
        const godDisplayName = targetGod ? targetGod.name : (god ? god.name : 'esta divindade');
        container.innerHTML = `
          <div class="tactical-development-card">
            <div class="development-header">
              <i class="ph ph-hourglass-high"></i>
              <span>NÍVEL EM DESENVOLVIMENTO CANÔNICO</span>
            </div>
            <p class="development-desc">
              O Nível ${ab.level} de <strong>${godDisplayName}</strong> aguarda redação e homologação do documento de regras canônicas correspondente.
            </p>
          </div>
        `;
        return;
      }

      state.selectedFaculty = state.selectedFaculty || 'Todas';
      const rawChoices = (ab.choices && ab.choices.length > 0)
        ? ab.choices
        : [{ name: ab.name, type: ab.type || 'Ativo', desc: ab.desc }];

      let choices = rawChoices;
      if (god.id === 'torre-relogio') {
        if (state.selectedFaculty && state.selectedFaculty !== 'Todas') {
          const filtered = rawChoices.filter(c => c.faculty === state.selectedFaculty);
          if (filtered.length > 0) choices = filtered;
        } else {
          // No modo 'Todas', exibe as passivas universais da Torre (N1 a N7)
          const passivas = rawChoices.filter(c => c.faculty === 'Passivas da Torre');
          if (passivas.length > 0) choices = passivas;
        }
      }

      if (state.selectedChoiceIndex === undefined || state.selectedChoiceIndex >= choices.length) {
        state.selectedChoiceIndex = 0;
      }

      const currentChoice = choices[state.selectedChoiceIndex] || choices[0];
      const initialParsed = parseTacticalAbility(currentChoice, ab, god);

      const card = document.createElement('div');
      card.className = 'tactical-deck-main-card';

      const lvlBadge = ab.key || (typeof ab.level === 'number' ? `N${ab.level}` : ab.level.toString());
      const lvlTitle = typeof ab.level === 'number' ? `NÍVEL ${ab.level}` : ab.name.toUpperCase();

      card.innerHTML = `
        <!-- 1. Header do Nível -->
        <div class="tactical-level-header">
          <div class="tactical-level-title-group">
            <div class="tactical-level-number-badge">${lvlBadge}</div>
            <h2 class="tactical-level-title">${lvlTitle}</h2>
          </div>
        </div>

        <!-- 2. Menu de Poderes Possíveis com Regra Canônica -->
        <div class="tactical-choices-deck">
          <div class="tactical-choices-heading">
            <div class="tactical-rule-badge">
              <i class="ph ph-scroll"></i>
              <span>REGRA: ${getDivinitySelectionRule(god)}</span>
            </div>
            <div class="tactical-choices-count-label">
              <i class="ph ph-list-plus"></i>
              <span>PODERES DISPONÍVEIS (${choices.length}):</span>
            </div>
          </div>
          <div class="tactical-choices-pills" id="choice-pills-row"></div>
        </div>

        <!-- 3. Título do Poder Selecionado -->
        <div class="tactical-selected-header-row">
          <span class="tactical-selected-label">PODER EM CONSULTA:</span>
          <span class="tactical-selected-name" id="tactical-selected-name">${initialParsed.name}</span>
          <span class="stat-tag tag-type" id="tactical-selected-type">[${(initialParsed.type || 'Ativo').toUpperCase()}]</span>
        </div>

        <!-- 4. Descrição Narrativa/Interpretativa -->
        <div class="tactical-interpretive-prose" id="tactical-interpretive-desc">
          ${initialParsed.interpretive}
        </div>

        <!-- 5. Cartão EFEITO -->
        <div class="tactical-effect-card">
          <div class="tactical-card-label-bar">
            <div class="tactical-card-label">
              <i class="ph ph-shield-chevron"></i>
              <span>EFEITO</span>
            </div>
            <span class="tactical-card-tagline">Custo, Cooldown & Bônus Mecânicos Canônicos</span>
          </div>

          <div id="tactical-effect-inner-content">
            ${renderTacticalDetailsHtml(initialParsed, currentChoice)}
          </div>
        </div>
      `;

      const pillsRow = card.querySelector('#choice-pills-row');
      const selectedNameEl = card.querySelector('#tactical-selected-name');
      const selectedTypeEl = card.querySelector('#tactical-selected-type');
      const interpretiveDescEl = card.querySelector('#tactical-interpretive-desc');
      const effectInnerEl = card.querySelector('#tactical-effect-inner-content');
      bindVariantTabs(effectInnerEl, currentChoice, initialParsed);

      function updateChoiceView(idx) {
        state.selectedChoiceIndex = idx;
        state.selectedVariantIndex = 0;
        const choice = choices[idx];
        if (!choice) return;

        pillsRow.querySelectorAll('.choice-pill-btn').forEach((b, i) => {
          b.classList.toggle('active', i === idx);
          b.setAttribute('aria-pressed', i === idx ? 'true' : 'false');
        });

        const parsed = parseTacticalAbility(choice, ab, god);

        if (selectedNameEl) selectedNameEl.textContent = parsed.name;
        if (selectedTypeEl) selectedTypeEl.textContent = `[${(parsed.type || 'Ativo').toUpperCase()}]`;
        if (interpretiveDescEl) interpretiveDescEl.textContent = parsed.interpretive;
        if (effectInnerEl) {
          effectInnerEl.innerHTML = renderTacticalDetailsHtml(parsed, choice);
          bindVariantTabs(effectInnerEl, choice, parsed);
        }

        syncUrlState();
      }

      function bindVariantTabs(containerEl, choice, parsed) {
        if (!containerEl || !choice || !choice.variants) return;
        const vBtns = containerEl.querySelectorAll('.tactical-variant-tab-btn');
        vBtns.forEach(btn => {
          btn.addEventListener('click', () => {
            const vIdx = parseInt(btn.getAttribute('data-variant-idx'), 10) || 0;
            state.selectedVariantIndex = vIdx;
            vBtns.forEach((b, i) => {
              b.classList.toggle('active', i === vIdx);
              b.setAttribute('aria-selected', i === vIdx ? 'true' : 'false');
            });
            const varBox = containerEl.querySelector('.tactical-variant-display-box');
            const vData = choice.variants[vIdx];
            if (varBox && vData) {
              varBox.innerHTML = `
                <div class="variant-box-title">
                  <strong>${vData.name}</strong>
                  <span class="stat-tag tag-type">[${(vData.type || 'Variante').toUpperCase()}]</span>
                </div>
                <div class="variant-box-desc">${vData.desc}</div>
              `;
            }
            syncUrlState();
          });
        });
      }

      choices.forEach((choice, idx) => {
        const pillBtn = document.createElement('button');
        pillBtn.className = `choice-pill-btn ${idx === state.selectedChoiceIndex ? 'active' : ''}`;
        pillBtn.type = 'button';
        pillBtn.setAttribute('data-choice-idx', idx.toString());
        pillBtn.setAttribute('aria-pressed', idx === state.selectedChoiceIndex ? 'true' : 'false');
        const pillText = (god.id === 'torre-relogio' && choice.faculty && state.selectedFaculty === 'Todas')
          ? `${choice.name} [${choice.faculty}]`
          : choice.name;
        pillBtn.innerHTML = `
          <span>${pillText}</span>
          <span class="choice-type-indicator">${(choice.type || 'Habilidade').toUpperCase()}</span>
        `;
        pillBtn.addEventListener('click', () => updateChoiceView(idx));
        pillsRow.appendChild(pillBtn);
      });

      container.appendChild(card);
    } 
    // MODO 2: TODOS OS NÍVEIS EM CASCATA
    else {
      abilities.forEach(ab => {
        const block = document.createElement('div');
        block.className = `cascade-level-block ${isLevelMatch(ab, state.selectedLevel) ? 'focused' : ''}`;
        block.id = `cascade-level-${ab.level}`;

        let choices = (ab.choices && ab.choices.length > 0)
          ? ab.choices
          : [{ name: ab.name, type: ab.type || 'Ativo', desc: ab.desc }];

        if (god.id === 'torre-relogio') {
          if (state.selectedFaculty && state.selectedFaculty !== 'Todas') {
            const filtered = choices.filter(c => c.faculty === state.selectedFaculty);
            if (filtered.length > 0) choices = filtered;
          } else {
            const passivas = choices.filter(c => c.faculty === 'Passivas da Torre');
            if (passivas.length > 0) choices = passivas;
          }
        }

        const lvlLabel = typeof ab.level === 'number' ? `NÍVEL ${ab.level}` : ab.name.toUpperCase();

        let choicesHtml = `
          <div class="choices-deck-wrapper" style="margin-top: 0.5rem; padding-top: 0.5rem;">
            <div class="choices-heading" style="font-size: 0.7rem;">
              <i class="ph ph-list-plus"></i> PODERES POSSÍVEIS (${lvlLabel})
            </div>
            <div style="display: flex; flex-direction: column; gap: 0.8rem;">
              ${choices.map(c => {
                const parsed = parseTacticalAbility(c, ab, god);
                const facultyTag = c.faculty ? `<span class="stat-tag" style="background: rgba(212,175,55,0.15); color: var(--nt-gold-bright); font-size: 0.65rem;">[${c.faculty.toUpperCase()}]</span>` : '';
                return `
                  <div style="padding: 0.8rem 1rem; background: rgba(10,14,24,0.7); border: 1px solid rgba(255,255,255,0.08); border-left: 2px solid var(--nt-gold); border-radius: 4px;">
                    <div style="display: flex; justify-content: space-between; align-items: center; font-weight: 700; font-size: 0.95rem; color: var(--nt-gold-bright); gap: 0.5rem; flex-wrap: wrap;">
                      <span>${parsed.name}</span>
                      <div style="display: flex; gap: 0.4rem; align-items: center;">
                        ${facultyTag}
                        <span class="stat-tag tag-type" style="font-size: 0.65rem;">[${parsed.type.toUpperCase()}]</span>
                      </div>
                    </div>
                    <div style="font-size: 0.96rem; line-height: 1.55; color: #f1f5f9; font-style: italic; margin-top: 0.35rem;">
                      ${parsed.interpretive}
                    </div>
                    <div style="margin-top: 0.6rem; padding-top: 0.6rem; border-top: 1px solid rgba(255,255,255,0.06);">
                      ${renderTacticalDetailsHtml(parsed)}
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          </div>
        `;

        block.innerHTML = `
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 0.5rem;">
            <div style="display: flex; align-items: center; gap: 0.6rem;">
              <span class="tactical-level-number-badge">N${ab.level}</span>
              <span style="font-family: var(--font-display); font-weight: 800; font-size: 1.15rem; color: #fff;">NÍVEL ${ab.level}</span>
            </div>
            <div style="display: flex; gap: 0.4rem;">
              <span class="stat-tag tag-type" style="font-size: 0.7rem;">${(ab.type || 'Ativo').toUpperCase()}</span>
            </div>
          </div>
          ${choicesHtml}
        `;

        container.appendChild(block);
      });
    }
  }

  // ===========================================================================
  // 8. CONTROLE PERSISTENTE DE ESCALA DE VISUALIZAÇÃO (ZOOM 80% / 100%)
  // ===========================================================================
  function initZoomScaleController() {
    const btn80 = document.getElementById('btn-scale-80');
    const btn100 = document.getElementById('btn-scale-100');

    function applyZoomScale(scaleStr) {
      if (!scaleStr) scaleStr = '1.0';
      const scaleNum = parseFloat(scaleStr);
      
      // Aplica a escala no elemento raiz e no body para suporte cross-browser consistente
      document.documentElement.style.zoom = scaleStr;
      
      // Atualiza botões
      if (btn80) btn80.classList.toggle('active', scaleNum === 0.8);
      if (btn100) btn100.classList.toggle('active', scaleNum === 1.0);
      
      try {
        localStorage.setItem('neotheon_user_scale', scaleStr);
      } catch (e) {
        // LocalStorage fallback
      }

      // Notifica o renderer 3D para recalcular dimensões sem distorção
      if (typeof window.dispatchEvent === 'function') {
        window.dispatchEvent(new Event('resize'));
      }
    }

    if (btn80) {
      btn80.addEventListener('click', () => applyZoomScale('0.8'));
    }
    if (btn100) {
      btn100.addEventListener('click', () => applyZoomScale('1.0'));
    }

    // Restaura escala salva no localStorage
    let savedScale = '1.0';
    try {
      savedScale = localStorage.getItem('neotheon_user_scale') || '1.0';
    } catch (e) {}
    applyZoomScale(savedScale);

    // Garante que a escala NUNCA se perca ao trocar de aba ou programa
    window.addEventListener('focus', () => {
      try {
        const currentSaved = localStorage.getItem('neotheon_user_scale') || '1.0';
        document.documentElement.style.zoom = currentSaved;
      } catch (e) {}
    });

    document.addEventListener('visibilitychange', () => {
      if (!document.hidden) {
        try {
          const currentSaved = localStorage.getItem('neotheon_user_scale') || '1.0';
          document.documentElement.style.zoom = currentSaved;
        } catch (e) {}
      }
    });
  }

  // ===========================================================================
  // 9. CARROSSEL INFERIOR DE MEDALHÕES (12 DIVINDADES) & ESTADO VAZIO
  // ===========================================================================
  function renderBottomCarousel() {
    const track = document.getElementById('carousel-track');
    if (!track) return;

    track.innerHTML = '';

    const filtered = getFilteredDivinities();

    // Tratamento de Estado Vazio (Zero Resultados)
    if (filtered.length === 0) {
      track.innerHTML = `
        <div class="carousel-empty-state" id="carousel-empty-state" role="status" aria-live="polite">
          <i class="ph ph-magnifying-glass empty-icon"></i>
          <div class="empty-info">
            <span class="empty-title">NENHUMA DIVINDADE ENCONTRADA</span>
            <span class="empty-desc">Nenhum registro corresponde a "${state.searchQuery || state.activeFilter}".</span>
          </div>
          <button type="button" class="btn-clear-search-filter" id="btn-clear-empty">
            <i class="ph ph-arrow-counter-clockwise"></i> LIMPAR BUSCA E FILTROS
          </button>
        </div>
      `;
      const btnClear = track.querySelector('#btn-clear-empty');
      if (btnClear) {
        btnClear.addEventListener('click', resetSearchAndFilters);
      }
      showEmptyStageState();
      return;
    } else {
      hideEmptyStageState();
    }

    filtered.forEach(god => {
      const item = document.createElement('div');
      item.className = `agent-ring-item ${god.id === state.selectedGodId ? 'active' : ''}`;
      item.setAttribute('data-id', god.id);
      item.setAttribute('data-god', god.id);
      item.setAttribute('tabindex', '0');
      item.setAttribute('role', 'tab');
      item.setAttribute('aria-selected', god.id === state.selectedGodId ? 'true' : 'false');
      item.setAttribute('aria-label', `${god.name} - ${god.reinoName || 'Três Grandes'}`);

      item.innerHTML = `
        <div class="agent-ring-avatar-frame">
          <img
            class="agent-ring-img"
            src="${god.thumbnail || god.image}"
            alt="${god.name}"
            width="64"
            height="64"
            loading="lazy"
            decoding="async"
            onerror="this.src='assets/custodio.webp';"
          >
        </div>
        <span class="agent-ring-label">${god.name.split('/')[0].trim()}</span>
      `;

      item.addEventListener('click', () => {
        selectGodAndScroll(god.id);
      });

      // Navegação Completa por Teclado (Enter, Espaço, Setas)
      item.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          selectGodAndScroll(god.id);
        } else if (e.key === 'ArrowRight') {
          e.preventDefault();
          const next = item.nextElementSibling;
          if (next) {
            next.focus();
            const nextId = next.getAttribute('data-id');
            if (nextId) selectGodAndScroll(nextId);
          }
        } else if (e.key === 'ArrowLeft') {
          e.preventDefault();
          const prev = item.previousElementSibling;
          if (prev) {
            prev.focus();
            const prevId = prev.getAttribute('data-id');
            if (prevId) selectGodAndScroll(prevId);
          }
        }
      });

      track.appendChild(item);
    });
  }

  function showEmptyStageState() {
    const emptyOverlay = document.getElementById('stage-empty-overlay');
    const descEl = document.getElementById('stage-empty-desc');
    if (emptyOverlay) {
      emptyOverlay.style.display = 'flex';
      if (descEl) {
        descEl.textContent = `Nenhum registro corresponde a "${state.searchQuery || state.activeFilter}".`;
      }
    }
  }

  function hideEmptyStageState() {
    const emptyOverlay = document.getElementById('stage-empty-overlay');
    if (emptyOverlay) {
      emptyOverlay.style.display = 'none';
    }
  }

  function resetSearchAndFilters() {
    state.searchQuery = '';
    state.activeFilter = 'all';
    state.selectedClassFilter = 'all';
    const searchInput = document.getElementById('god-search-input');
    if (searchInput) searchInput.value = '';
    const searchDropdown = document.getElementById('search-deep-dropdown');
    if (searchDropdown) searchDropdown.style.display = 'none';

    document.querySelectorAll('.filter-pill-btn').forEach(b => {
      const isAll = b.getAttribute('data-filter') === 'all';
      b.classList.toggle('active', isAll);
      b.setAttribute('aria-selected', isAll ? 'true' : 'false');
    });

    document.querySelectorAll('.class-filter-btn').forEach(b => {
      const isAll = b.getAttribute('data-class') === 'all';
      b.classList.toggle('active', isAll);
      b.setAttribute('aria-selected', isAll ? 'true' : 'false');
    });

    renderBottomCarousel();
    const fallbackGodId = state.divinities[0]?.id || 'zeus';
    renderGodSelector(fallbackGodId);
    syncUrlState();
  }

  function updateBottomCarouselActiveState() {
    document.querySelectorAll('.agent-ring-item').forEach(el => {
      const id = el.getAttribute('data-id');
      const isActive = id === state.selectedGodId;
      el.classList.toggle('active', isActive);
      el.setAttribute('aria-selected', isActive ? 'true' : 'false');
      if (isActive) {
        el.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      }
    });
  }

  function initCarouselNav() {
    const prevBtn = document.getElementById('carousel-prev-btn');
    const nextBtn = document.getElementById('carousel-next-btn');
    const container = document.getElementById('carousel-container');

    if (prevBtn && container) {
      prevBtn.addEventListener('click', () => {
        container.scrollBy({ left: -220, behavior: 'smooth' });
      });
    }

    if (nextBtn && container) {
      nextBtn.addEventListener('click', () => {
        container.scrollBy({ left: 220, behavior: 'smooth' });
      });
    }
  }

  // ===========================================================================
  // 10. FILTROS & BUSCA DINÂMICA (INDEXAÇÃO PROFUNDA + NORMALIZAÇÃO)
  // ===========================================================================
  function getFilteredDivinities() {
    const q = normalizeQuery(state.searchQuery);

    return state.divinities.filter(god => {
      // 1. Filtro por Categoria e Tags Canônicas
      let matchesFilter = true;
      const tags = Array.isArray(god.tags) ? god.tags.map(t => t.toUpperCase()) : [];

      if (state.activeFilter === 'tres-grandes') {
        matchesFilter = tags.some(t => t.includes('TRÊS GRANDE') || t.includes('TRES GRANDE'));
      } else if (state.activeFilter === 'olimpianos') {
        matchesFilter = tags.some(t => t.includes('OLIMPIAN'));
      } else if (state.activeFilter === 'ctonicos') {
        matchesFilter = tags.some(t => t.includes('CTÔNIC') || t.includes('CTONIC'));
      } else if (state.activeFilter === 'monarquia-infernal') {
        matchesFilter = tags.some(t => t.includes('MONARQUIA INFERNAL'));
      } else if (state.activeFilter === 'encruzilhada') {
        matchesFilter = tags.some(t => t.includes('ENCRUZILHADA'));
      } else if (state.activeFilter === 'perpetuos') {
        matchesFilter = tags.some(t => t.includes('PERPÉTUO') || t.includes('PERPETUO'));
      } else if (state.activeFilter === 'reis') {
        matchesFilter = tags.some(t => t.includes('DEUS MAIOR') || t.includes('DEUSA MAIOR'));
      } else if (state.activeFilter === 'menores') {
        matchesFilter = tags.some(t => t.includes('DEUSES MENOR'));
      } else if (state.activeFilter === 'atlante') {
        matchesFilter = tags.some(t => t.includes('ATLANT'));
      } else if (state.activeFilter === 'organizacoes') {
        matchesFilter = god.reinoCanonical === 'organizacoes' || ['congregacao-bruxas', 'santa-igreja', 'ordem-merlin'].includes(god.id);
      } else if (state.activeFilter === 'racas') {
        matchesFilter = god.reinoCanonical === 'racas' || ['torre-relogio', 'vampiros'].includes(god.id);
      }

      if (!matchesFilter) return false;

      // 1.5. Filtro por Classe Perpétua
      if (state.selectedClassFilter && state.selectedClassFilter !== 'all') {
        const classesList = god.classes || [god.primaryClass];
        const matchesClassFilter = classesList.some(cId => cId.toLowerCase() === state.selectedClassFilter.toLowerCase());
        if (!matchesClassFilter) return false;
      }

      // 2. Filtro por Busca Textual (com normalização de diacríticos e busca em subpoderes)
      if (q === '') return true;

      // Nomes, títulos e tags de lore
      if (normalizeQuery(god.id).includes(q)) return true;
      if (normalizeQuery(god.name).includes(q)) return true;
      if (normalizeQuery(god.heroTitle).includes(q)) return true;
      if (normalizeQuery(god.title).includes(q)) return true;
      if (normalizeQuery(god.combatRole).includes(q)) return true;
      if (normalizeQuery(god.macroClasse).includes(q)) return true;
      if (normalizeQuery(god.reinoName).includes(q)) return true;
      if (normalizeQuery(god.passivaUnica).includes(q)) return true;
      if (normalizeQuery(god.quote).includes(q)) return true;

      // Classes Perpétuas (por ID e por nome com diacríticos como 'Destruição')
      const classesList = god.classes || [god.primaryClass];
      const matchesClass = classesList.some(cId => {
        if (normalizeQuery(cId).includes(q)) return true;
        const cMeta = state.classesInfo[cId];
        return cMeta && (normalizeQuery(cMeta.name).includes(q) || normalizeQuery(cMeta.role).includes(q));
      });
      if (matchesClass) return true;

      // Habilidades canônicas e subpoderes / escolhas por nível
      const abilitiesList = god.abilities || [];
      const matchesAbilities = abilitiesList.some(ab => {
        if (normalizeQuery(ab.name).includes(q)) return true;
        if (normalizeQuery(ab.desc).includes(q)) return true;
        if (ab.choices && ab.choices.length > 0) {
          return ab.choices.some(ch => 
            normalizeQuery(ch.name).includes(q) || normalizeQuery(ch.desc).includes(q)
          );
        }
        return false;
      });
      if (matchesAbilities) return true;

      return false;
    });
  }

  function updateFilterCounts() {
    const hasTag = (d, pattern) => {
      if (!Array.isArray(d.tags)) return false;
      return d.tags.some(t => pattern.test(t));
    };

    const allCount = state.divinities.length;
    const tresGrandesCount = state.divinities.filter(d => hasTag(d, /três grande|tres grande/i)).length;
    const olimpianosCount = state.divinities.filter(d => hasTag(d, /olimpian/i)).length;
    const ctonicosCount = state.divinities.filter(d => hasTag(d, /ctônic|ctonic/i)).length;
    const monarquiaInfernalCount = state.divinities.filter(d => hasTag(d, /monarquia infernal/i)).length;
    const encruzilhadaCount = state.divinities.filter(d => hasTag(d, /encruzilhada/i)).length;
    const perpetuosCount = state.divinities.filter(d => hasTag(d, /perpétuo|perpetuo/i)).length;
    const reisCount = state.divinities.filter(d => hasTag(d, /deus maior|deusa maior/i)).length;
    const menoresCount = state.divinities.filter(d => hasTag(d, /deuses menor/i)).length;
    const atlanteCount = state.divinities.filter(d => hasTag(d, /atlant/i)).length;
    const organizacoesCount = state.divinities.filter(d => d.reinoCanonical === 'organizacoes' || ['congregacao-bruxas', 'santa-igreja', 'ordem-merlin'].includes(d.id)).length;
    const racasCount = state.divinities.filter(d => d.reinoCanonical === 'racas' || ['torre-relogio', 'vampiros'].includes(d.id)).length;

    const setBadge = (id, count) => {
      const el = document.getElementById(id);
      if (el) el.textContent = `(${count})`;
    };

    setBadge('count-all', allCount);
    setBadge('count-tres-grandes', tresGrandesCount);
    setBadge('count-olimpianos', olimpianosCount);
    setBadge('count-ctonicos', ctonicosCount);
    setBadge('count-monarquia-infernal', monarquiaInfernalCount);
    setBadge('count-encruzilhada', encruzilhadaCount);
    setBadge('count-perpetuos', perpetuosCount);
    setBadge('count-reis', reisCount);
    setBadge('count-menores', menoresCount);
    setBadge('count-atlante', atlanteCount);
    setBadge('count-organizacoes', organizacoesCount);
    setBadge('count-racas', racasCount);
  }

  // ===========================================================================
  // 10.1 SINCRONIZAÇÃO DE ESTADO VIA URL & HISTÓRICO DO NAVEGADOR
  // ===========================================================================
  function syncUrlState() {
    try {
      const params = new URLSearchParams(window.location.search);
      if (state.selectedGodId) {
        params.set('god', state.selectedGodId);
      }
      if (state.selectedLevel !== undefined && state.selectedLevel !== null) {
        params.set('level', state.selectedLevel);
      }
      if (state.selectedGodId === 'torre-relogio' && state.selectedFaculty) {
        params.set('faculty', state.selectedFaculty);
      } else {
        params.delete('faculty');
      }

      const god = state.divinities.find(d => d.id === state.selectedGodId);
      if (god && god.abilities) {
        const ab = god.abilities.find(a => isLevelMatch(a, state.selectedLevel)) || god.abilities[0];
        if (ab) {
          let choices = (ab.choices && ab.choices.length > 0) ? ab.choices : [{ name: ab.name }];
          if (god.id === 'torre-relogio') {
            if (state.selectedFaculty && state.selectedFaculty !== 'Todas') {
              const filtered = choices.filter(c => c.faculty === state.selectedFaculty);
              if (filtered.length > 0) choices = filtered;
            } else {
              const passivas = choices.filter(c => c.faculty === 'Passivas da Torre');
              if (passivas.length > 0) choices = passivas;
            }
          }
          const currentChoice = choices[state.selectedChoiceIndex || 0] || choices[0];
          if (currentChoice && currentChoice.name) {
            params.set('power', currentChoice.name);
          } else {
            params.delete('power');
          }
        } else {
          params.delete('power');
        }
      } else {
        params.delete('power');
      }

      if (state.viewMode === 'cascade') {
        params.set('view', 'cascade');
      } else {
        params.delete('view');
      }

      const newQuery = params.toString();
      const newRelativePathQuery = window.location.pathname + (newQuery ? '?' + newQuery : '');
      if (window.location.search !== (newQuery ? '?' + newQuery : '')) {
        window.history.replaceState({
          god: state.selectedGodId,
          level: state.selectedLevel,
          faculty: state.selectedFaculty,
          choiceIndex: state.selectedChoiceIndex,
          view: state.viewMode
        }, '', newRelativePathQuery);
      }
    } catch (err) {
      console.warn('Falha ao sincronizar URL:', err);
    }
  }

  function restoreStateFromUrl() {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const godParam = urlParams.get('god');
      const levelParam = urlParams.get('level');
      const powerParam = urlParams.get('power');
      const facultyParam = urlParams.get('faculty');
      const viewParam = urlParams.get('view');

      if (godParam && state.divinities.some(d => d.id === godParam)) {
        state.selectedGodId = godParam;
      }
      if (facultyParam) {
        state.selectedFaculty = facultyParam;
      }
      state.viewMode = 'current';
      if (levelParam) {
        const parsedLvl = parseInt(levelParam, 10);
        state.selectedLevel = !isNaN(parsedLvl) ? parsedLvl : levelParam;
      }

      if (powerParam) {
        const god = state.divinities.find(d => d.id === state.selectedGodId);
        if (god && god.abilities) {
          const normPwr = normalizeQuery(powerParam);
          for (const ab of god.abilities) {
            let choices = (ab.choices && ab.choices.length > 0) ? ab.choices : [{ name: ab.name }];
            const foundIdx = choices.findIndex(c => normalizeQuery(c.name) === normPwr || normalizeQuery(c.name).includes(normPwr));
            if (foundIdx >= 0) {
              state.selectedLevel = ab.level;
              state.selectedChoiceIndex = foundIdx;
              if (choices[foundIdx].faculty && choices[foundIdx].faculty !== 'Passivas da Torre') {
                state.selectedFaculty = choices[foundIdx].faculty;
              }
              break;
            }
          }
        }
      }
    } catch (err) {
      console.warn('Falha ao restaurar URL state:', err);
    }
  }

  function initUrlPopstateListener() {
    window.addEventListener('popstate', () => {
      restoreStateFromUrl();
      renderGodSelector(state.selectedGodId);
      renderBottomCarousel();
    });
  }

  // ===========================================================================
  // 10.2 MOTOR DE BUSCA PROFUNDA (LISTA → NÍVEL → PODER COM AUTOCOMPLETE)
  // ===========================================================================
  function searchCanonDeep(query) {
    const q = normalizeQuery(query);
    if (!q || q.length < 2) return [];

    const results = [];
    const divinities = state.divinities || [];

    for (const god of divinities) {
      const godShortName = (god.name || '').split('/')[0].trim();
      const godNormName = normalizeQuery(god.name);
      const godNormHero = normalizeQuery(god.heroTitle);

      // 1. Correspondência direta no Nome ou Título da Divindade
      if (godNormName.includes(q) || godNormHero.includes(q)) {
        results.push({
          type: 'god',
          godId: god.id,
          godName: godShortName,
          thumb: god.thumbnail || god.image || 'assets/custodio.webp',
          level: 1,
          choiceIndex: 0,
          levelLabel: 'Visão Geral',
          powerName: god.title || 'Divindade Patrona',
          snippet: god.combatRole || god.gameplaySummary || '',
          score: godNormName === q ? 100 : 80
        });
      }

      // 2. Correspondência na Passiva Única Canônica
      if (god.passivaUnica) {
        const normPassive = normalizeQuery(god.passivaUnica);
        if (normPassive.includes(q)) {
          const pName = god.passivaUnica.split(':')[0].trim();
          results.push({
            type: 'passive',
            godId: god.id,
            godName: godShortName,
            thumb: god.thumbnail || god.image || 'assets/custodio.webp',
            level: 1,
            choiceIndex: 0,
            levelLabel: 'Passiva Única',
            powerName: pName,
            snippet: god.passivaUnica,
            score: normalizeQuery(pName).includes(q) ? 95 : 65
          });
        }
      }

      // 3. Correspondência em Habilidades & Subpoderes (Choices Canônicas)
      const abilities = god.abilities || [];
      for (const ab of abilities) {
        if (!ab) continue;
        const lvlNum = ab.level;
        const lvlLabel = typeof lvlNum === 'number' ? `Nível ${lvlNum}` : (ab.key || ab.name);

        const choices = (ab.choices && ab.choices.length > 0)
          ? ab.choices
          : [{ name: ab.name, type: ab.type, desc: ab.desc }];

        choices.forEach((choice, choiceIdx) => {
          const cName = choice.name || ab.name;
          const cDesc = choice.desc || ab.desc || '';
          const normCName = normalizeQuery(cName);
          const normCDesc = normalizeQuery(cDesc);

          // 3.1 Busca em Variantes / Caminhos Internos
          if (choice.variants && choice.variants.length > 0) {
            choice.variants.forEach((v, vIdx) => {
              const vName = v.name || '';
              const vDesc = v.desc || '';
              const normVName = normalizeQuery(vName);
              const normVDesc = normalizeQuery(vDesc);

              let vMatch = false;
              let vScore = 0;

              if (normVName.includes(q)) {
                vMatch = true;
                vScore = (normVName === q) ? 140 : 105;
              } else if (normVDesc.includes(q)) {
                vMatch = true;
                vScore = 75;
              }

              if (vMatch) {
                results.push({
                  type: 'variant',
                  godId: god.id,
                  godName: godShortName,
                  faculty: choice.faculty,
                  thumb: god.thumbnail || god.image || 'assets/custodio.webp',
                  level: lvlNum,
                  choiceIndex: choiceIdx,
                  variantIndex: vIdx,
                  levelLabel: lvlLabel,
                  powerName: `${cName} ➔ ${vName}`,
                  snippet: vDesc.slice(0, 140) + '...',
                  score: vScore
                });
              }
            });
          }

          let matchFound = false;
          let score = 0;

          if (normCName.includes(q)) {
            matchFound = true;
            score = (normCName === q) ? 120 : (normCName.startsWith(q) ? 95 : 80);
          } else if (normCDesc.includes(q)) {
            matchFound = true;
            score = 60;
          }

          if (matchFound) {
            let snippet = cDesc;
            const matchPos = normCDesc.indexOf(q);
            if (matchPos >= 0) {
              const start = Math.max(0, matchPos - 30);
              const end = Math.min(cDesc.length, matchPos + q.length + 65);
              snippet = (start > 0 ? '...' : '') + cDesc.slice(start, end).trim() + (end < cDesc.length ? '...' : '');
            } else {
              snippet = cDesc.slice(0, 95) + (cDesc.length > 95 ? '...' : '');
            }

            results.push({
              type: 'ability',
              godId: god.id,
              godName: godShortName,
              thumb: god.thumbnail || god.image || 'assets/custodio.webp',
              level: lvlNum,
              choiceIndex: choiceIdx,
              faculty: choice.faculty || (god.id === 'torre-relogio' ? 'Todas' : null),
              levelLabel: lvlLabel,
              powerName: cName,
              snippet: snippet,
              score: score
            });
          }
        });
      }
    }

    results.sort((a, b) => b.score - a.score);
    return results.slice(0, 10);
  }

  function renderDeepSearchResults(results, dropdown, activeIndex) {
    if (!dropdown) return;
    if (!results || results.length === 0) {
      dropdown.innerHTML = `
        <div style="padding: 0.85rem 1rem; color: #94a3b8; font-size: 0.82rem; font-family: var(--font-game); text-align: center;">
          <i class="ph ph-warning-circle" style="color: var(--nt-crimson-bright); margin-right: 0.35rem;"></i>
          Nenhum poder ou divindade correspondente a esta busca.
        </div>
      `;
      dropdown.style.display = 'flex';
      return;
    }

    dropdown.innerHTML = results.map((res, idx) => {
      const isSel = idx === activeIndex;
      const facultyPart = res.faculty ? `<span class="res-sep">•</span><span style="color: var(--nt-gold); font-size: 0.7rem;">[${res.faculty}]</span>` : '';
      return `
        <div class="search-deep-result-item ${isSel ? 'is-selected' : ''}" data-idx="${idx}" role="option" aria-selected="${isSel}">
          <img class="res-thumb" src="${res.thumb}" alt="${res.godName}" onerror="this.src='assets/custodio.webp';" />
          <div class="res-info">
            <div class="res-breadcrumb">
              <span class="res-god">${res.godName}</span>
              <span class="res-sep">→</span>
              <span class="res-lvl">${res.levelLabel}</span>
              <span class="res-sep">→</span>
              <span class="res-pwr">${res.powerName}</span>
              ${facultyPart}
            </div>
            <div class="res-snippet">${res.snippet}</div>
          </div>
        </div>
      `;
    }).join('');

    dropdown.style.display = 'flex';

    dropdown.querySelectorAll('.search-deep-result-item').forEach(itemEl => {
      itemEl.addEventListener('click', () => {
        const idx = parseInt(itemEl.getAttribute('data-idx'), 10);
        if (results[idx]) {
          applyDeepSearchResult(results[idx]);
        }
      });
    });
  }

  function applyDeepSearchResult(res) {
    if (!res) return;
    state.selectedGodId = res.godId;
    state.selectedLevel = res.level;
    state.selectedChoiceIndex = res.choiceIndex !== undefined ? res.choiceIndex : 0;
    state.selectedVariantIndex = res.variantIndex !== undefined ? res.variantIndex : 0;

    if (res.faculty && res.godId === 'torre-relogio') {
      state.selectedFaculty = res.faculty;
    }

    renderGodSelector(res.godId);

    const dropdown = document.getElementById('search-deep-dropdown');
    if (dropdown) dropdown.style.display = 'none';

    syncUrlState();

    const selectorSection = document.getElementById('god-selector');
    if (selectorSection) {
      selectorSection.scrollIntoView({ behavior: 'smooth' });
    }
  }

  function initFiltersAndSearch() {
    updateFilterCounts();

    const filterButtons = document.querySelectorAll('.filter-pill-btn');
    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        filterButtons.forEach(b => {
          b.classList.remove('active');
          b.setAttribute('aria-selected', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');
        state.activeFilter = btn.getAttribute('data-filter') || 'all';
        renderBottomCarousel();

        // Se o deus ativo não estiver na lista filtrada, seleciona o primeiro disponível
        const filtered = getFilteredDivinities();
        if (filtered.length > 0 && !filtered.some(d => d.id === state.selectedGodId)) {
          renderGodSelector(filtered[0].id);
        }
      });
    });

    const classFilterButtons = document.querySelectorAll('.class-filter-btn');
    classFilterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        classFilterButtons.forEach(b => {
          b.classList.remove('active');
          b.setAttribute('aria-selected', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');
        state.selectedClassFilter = btn.getAttribute('data-class') || 'all';
        renderBottomCarousel();

        // Se o deus ativo não estiver na lista filtrada, seleciona o primeiro disponível
        const filtered = getFilteredDivinities();
        if (filtered.length > 0 && !filtered.some(d => d.id === state.selectedGodId)) {
          renderGodSelector(filtered[0].id);
        }
      });
    });

    const searchInput = document.getElementById('god-search-input');
    const searchDropdown = document.getElementById('search-deep-dropdown');
    let currentDeepResults = [];
    let highlightedIndex = -1;

    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        state.searchQuery = e.target.value;
        const q = normalizeQuery(state.searchQuery);

        renderBottomCarousel();
        const filtered = getFilteredDivinities();
        if (filtered.length > 0 && !filtered.some(d => d.id === state.selectedGodId)) {
          renderGodSelector(filtered[0].id);
        }

        if (searchDropdown) {
          if (q.length >= 2) {
            currentDeepResults = searchCanonDeep(state.searchQuery);
            highlightedIndex = -1;
            renderDeepSearchResults(currentDeepResults, searchDropdown, highlightedIndex);
          } else {
            currentDeepResults = [];
            searchDropdown.style.display = 'none';
          }
        }
      });

      searchInput.addEventListener('keydown', (e) => {
        if (!searchDropdown || searchDropdown.style.display === 'none' || currentDeepResults.length === 0) {
          return;
        }

        if (e.key === 'ArrowDown') {
          e.preventDefault();
          highlightedIndex = (highlightedIndex + 1) % currentDeepResults.length;
          renderDeepSearchResults(currentDeepResults, searchDropdown, highlightedIndex);
          const activeItem = searchDropdown.querySelector('.search-deep-result-item.is-selected');
          if (activeItem) activeItem.scrollIntoView({ block: 'nearest' });
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          highlightedIndex = (highlightedIndex - 1 + currentDeepResults.length) % currentDeepResults.length;
          renderDeepSearchResults(currentDeepResults, searchDropdown, highlightedIndex);
          const activeItem = searchDropdown.querySelector('.search-deep-result-item.is-selected');
          if (activeItem) activeItem.scrollIntoView({ block: 'nearest' });
        } else if (e.key === 'Enter') {
          e.preventDefault();
          const target = (highlightedIndex >= 0 && currentDeepResults[highlightedIndex])
            ? currentDeepResults[highlightedIndex]
            : currentDeepResults[0];
          if (target) {
            applyDeepSearchResult(target);
          }
        } else if (e.key === 'Escape') {
          searchDropdown.style.display = 'none';
          searchInput.blur();
        }
      });

      // Fechar dropdown ao clicar fora
      document.addEventListener('click', (e) => {
        if (searchDropdown && !searchInput.contains(e.target) && !searchDropdown.contains(e.target)) {
          searchDropdown.style.display = 'none';
        }
      });
    }

    const btnStageClear = document.getElementById('btn-stage-clear-empty');
    if (btnStageClear) {
      btnStageClear.addEventListener('click', resetSearchAndFilters);
    }
  }

  // ===========================================================================
  // 11. MODAL: ÁRVORE COMPLETA DOSSIÊ (NÍVEIS 1 A 7)
  // ===========================================================================
  function initPowerModal() {
    const modal = document.getElementById('power-modal');
    const openBtn = document.getElementById('btn-open-modal');
    const closeBtn = document.getElementById('modal-close-btn');
    const modalTitle = document.getElementById('modal-title');
    const modalContent = document.getElementById('modal-content');

    if (!modal || !openBtn) return;

    let lastActiveElement = null;

    openBtn.addEventListener('click', () => {
      lastActiveElement = document.activeElement;
      const god = state.divinities.find(d => d.id === state.selectedGodId);
      if (!god) return;

      if (modalTitle) {
        modalTitle.textContent = `${god.name.toUpperCase()} // ÁRVORE COMPLETA (N1 A N7)`;
      }

      if (modalContent) {
        modalContent.innerHTML = `
          <div style="background: rgba(12, 16, 28, 0.85); border: 1px solid var(--nt-gold); padding: 1rem; border-radius: 6px; margin-bottom: 1rem;">
            <div style="font-family: var(--font-game); font-size: 0.75rem; color: var(--nt-gold-bright); font-weight: 800; letter-spacing: 0.15em;">
              PASSIVA ÚNICA INATA
            </div>
            <div style="font-family: var(--font-body); font-size: 1rem; color: #fff; margin-top: 0.3rem;">
              ${god.passivaUnica || 'Nenhuma passiva cadastrada.'}
            </div>
          </div>
          <div style="display: flex; flex-direction: column; gap: 1rem;">
            ${(god.abilities || []).map(ab => `
              <div style="background: rgba(16, 22, 34, 0.9); border: 1px solid rgba(255,255,255,0.1); border-radius: 6px; padding: 1rem;">
                <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 0.4rem; margin-bottom: 0.5rem;">
                  <div style="display: flex; align-items: center; gap: 0.5rem;">
                    <i class="ph ${ab.icon || 'ph-sparkle'}" style="color: var(--nt-gold-bright); font-size: 1.2rem;"></i>
                    <span style="font-family: var(--font-display); font-weight: 700; color: #fff; font-size: 1.05rem;">${ab.name}</span>
                  </div>
                  <div style="display: flex; gap: 0.4rem;">
                    <span class="stat-tag tag-level">NÍVEL ${ab.level}</span>
                    <span class="stat-tag tag-type">${(ab.type || 'Ativo').toUpperCase()}</span>
                  </div>
                </div>
                <div style="font-family: var(--font-game); font-size: 0.75rem; color: var(--nt-gold-bright); margin-bottom: 0.4rem;">
                  ${ab.cost ? `${ab.cost} • ` : ''}${ab.range ? `Alcance: ${ab.range}` : ''}
                </div>
                <div style="font-family: var(--font-body); font-size: 0.95rem; line-height: 1.55; color: #cbd5e1;">
                  ${ab.desc}
                </div>
                ${ab.choices && ab.choices.length > 0 ? `
                  <div style="margin-top: 0.75rem; padding-top: 0.5rem; border-top: 1px dashed rgba(212,175,55,0.25);">
                    <div style="font-family: var(--font-game); font-size: 0.7rem; font-weight: 800; color: var(--nt-gold-bright); margin-bottom: 0.4rem;">
                      OPÇÕES DE ESCOLHA (SELECIONE UMA NA SUA FICHA):
                    </div>
                    <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 0.5rem;">
                      ${ab.choices.map(c => `
                        <div style="background: rgba(0,0,0,0.4); border: 1px solid rgba(255,255,255,0.08); border-radius: 4px; padding: 0.5rem;">
                          <div style="font-weight: 700; font-size: 0.85rem; color: #fff; display: flex; justify-content: space-between;">
                            <span>${c.name}</span>
                            <span style="font-size: 0.65rem; color: var(--nt-gold-bright);">[${c.type || 'Efeito'}]</span>
                          </div>
                          <div style="font-size: 0.85rem; color: #94a3b8; margin-top: 0.2rem; line-height: 1.4;">
                            ${c.desc}
                          </div>
                        </div>
                      `).join('')}
                    </div>
                  </div>
                ` : ''}
              </div>
            `).join('')}
          </div>
        `;
      }

      modal.classList.add('open');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      if (closeBtn) closeBtn.focus();
    });

    function closeModal() {
      modal.classList.remove('open');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      if (lastActiveElement && typeof lastActiveElement.focus === 'function') {
        lastActiveElement.focus();
      }
    }

    if (closeBtn) closeBtn.addEventListener('click', closeModal);

    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('open')) {
        closeModal();
      }
    });

    // Focus Trap Acessível
    modal.addEventListener('keydown', (e) => {
      if (e.key === 'Tab' && modal.classList.contains('open')) {
        const focusable = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    });
  }

  // ===========================================================================
  // 12. TECLAS DE ATALHO DO TECLADO
  // ===========================================================================
  function initKeyboardShortcuts() {
    window.addEventListener('keydown', (e) => {
      // Ignora se estiver digitando em input, textarea ou elemento editável
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.isContentEditable) return;

      // Ignora atalhos de palco se qualquer modal estiver aberto
      const isAnyModalOpen = document.querySelector('.modal-backdrop.open, #power-modal.open, #classes-modal.open, #compare-modal.open');
      if (isAnyModalOpen) return;

      // Teclas 1 a 7 selecionam níveis
      const num = parseInt(e.key);
      if (!isNaN(num) && num >= 1 && num <= 7) {
        state.selectedLevel = num;
        state.selectedChoiceIndex = 0;
        document.querySelectorAll('.ability-slot-btn').forEach(b => {
          const isActive = b.getAttribute('data-level').toString() === num.toString();
          b.classList.toggle('active', isActive);
          b.setAttribute('aria-selected', isActive ? 'true' : 'false');
        });
        const god = state.divinities.find(d => d.id === state.selectedGodId);
        if (god) {
          renderTacticalAbilityDeck(god);
          syncUrlState();
        }
      } else if (e.key === '8' || e.key === 'm' || e.key === 'M') {
        const god = state.divinities.find(d => d.id === state.selectedGodId);
        if (god && god.abilities && god.abilities.length > 7) {
          const specialAb = god.abilities[7];
          if (specialAb) {
            state.selectedLevel = specialAb.level;
            state.selectedChoiceIndex = 0;
            document.querySelectorAll('.ability-slot-btn').forEach(b => {
              const isActive = b.getAttribute('data-level').toString() === specialAb.level.toString();
              b.classList.toggle('active', isActive);
              b.setAttribute('aria-selected', isActive ? 'true' : 'false');
            });
            renderTacticalAbilityDeck(god);
            syncUrlState();
          }
        }
      }


      // Tecla '/' foca na busca
      if (e.key === '/') {
        e.preventDefault();
        const search = document.getElementById('god-search-input');
        if (search) {
          search.focus();
          search.select();
        }
      }

      // Navegação por setas (ArrowLeft / ArrowRight) entre divindades filtradas
      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        const filtered = getFilteredDivinities();
        if (filtered.length <= 1) return;
        const currentIndex = filtered.findIndex(d => d.id === state.selectedGodId);
        let nextIndex = 0;
        if (e.key === 'ArrowRight') {
          nextIndex = (currentIndex + 1) % filtered.length;
        } else {
          nextIndex = (currentIndex - 1 + filtered.length) % filtered.length;
        }
        if (filtered[nextIndex]) {
          state.selectedGodId = filtered[nextIndex].id;
          state.selectedLevel = 1;
          state.selectedChoiceIndex = 0;
          renderGodSelector(state.selectedGodId);
          const activeCard = document.querySelector(`.carousel-god-card[data-god-id="${state.selectedGodId}"]`);
          if (activeCard) {
            activeCard.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
          }
        }
      }
    });
  }

  // ===========================================================================
  // 13. GUIA MODAL DE CLASSES PERPÉTUAS
  // ===========================================================================
  function initClassesGuideModal() {
    const modal = document.getElementById('classes-modal');
    const content = document.getElementById('classes-modal-content');
    const closeBtn = document.getElementById('classes-modal-close-btn') || document.getElementById('close-classes-modal');
    const triggerBtns = [
      document.getElementById('btn-open-classes-guide'),
      document.getElementById('btn-hero-classes-guide')
    ].filter(Boolean);

    if (!modal || !content) return;

    function renderClassesContent() {
      const classesList = Object.values(state.classesInfo || {});
      if (classesList.length === 0) {
        content.innerHTML = '<p style="color: #94a3b8; text-align: center;">Nenhuma informação de classe disponível.</p>';
        return;
      }

      content.innerHTML = `
        <!-- Manifesto Pedagógico: Individualidades vs Ofício, Papel Tático e Classes Perpétuas -->
        <div class="classes-guide-manifesto">
          <div class="manifesto-card">
            <div class="manifesto-header">
              <div class="manifesto-icon-wrap">
                <i class="ph ph-lightning"></i>
              </div>
              <div>
                <span class="manifesto-kicker">CONCEITO FUNDAMENTAL</span>
                <h3 class="manifesto-title">Individualidades vs. Ofício</h3>
              </div>
            </div>
            <p class="manifesto-text">
              Mais importante que seu ofício, serão os seus poderes — ou como gostamos de chamar por aqui: <strong class="manifesto-highlight">individualidades</strong>. O ofício é apenas seu papel e disfarce social na sociedade humana; as individualidades são o sangue sagrado que dita quem você realmente é e como você sobrevive aos perigos do oculto.
            </p>
          </div>

          <div class="manifesto-card">
            <div class="manifesto-header">
              <div class="manifesto-icon-wrap">
                <i class="ph ph-crosshair"></i>
              </div>
              <div>
                <span class="manifesto-kicker">CONSTRUÇÃO DE COMBATE</span>
                <h3 class="manifesto-title">Papel Tático</h3>
              </div>
            </div>
            <p class="manifesto-text">
              Em termos de sistemática de RPG, cada lista de poderes possui um foco de gameplay intencional desenhado no ato de sua criação: o <strong class="manifesto-highlight">Papel Tático</strong> (podendo variar entre <em>DPS em Área, Tank de Bloqueio, Healer / Suporte, Controle Territorial</em> e etc.). Isso define profundamente como será o seu estilo de combate na mesa.
            </p>
          </div>

          <div class="manifesto-card rule-card">
            <div class="manifesto-header">
              <div class="manifesto-icon-wrap">
                <i class="ph ph-lock-key"></i>
              </div>
              <div>
                <span class="manifesto-kicker">REGRA FÉRREA DE BUILD</span>
                <h3 class="manifesto-title">Classes Perpétuas & Restrição Rígida</h3>
              </div>
            </div>
            <p class="manifesto-text">
              Além do estilo de jogo, cada lista é regida por uma das <strong class="manifesto-highlight">7 Classes Perpétuas</strong> (nomeadas após os Perpétuos). Elas ditam quais <strong class="manifesto-highlight">bênçãos, artefatos e armas</strong> você pode equipar. A regra é rígida: você <em>nunca</em> poderá usar bênçãos ou artefatos de uma classe diferente da sua individualidade (ex.: se você tem uma individualidade de Destruição, só poderá usar bênçãos e artefatos de Destruição, nenhuma outra).
            </p>
          </div>
        </div>

        <div class="classes-guide-grid">
          ${classesList.map(cls => {
            const associated = state.divinities.filter(d => {
              const normClass = normalizeQuery(d.classePerpetua || '');
              return normClass.includes(cls.id) || normalizeQuery(cls.name) === normClass;
            });

            return `
              <div class="class-guide-card" style="--class-accent: ${cls.color}; --class-glow: ${cls.colorGlow};">
                <div class="class-guide-header">
                  <div class="class-guide-icon-badge" style="background: ${cls.colorGlow}; border-color: ${cls.color}; color: ${cls.color};">
                    <i class="ph ${cls.icon || 'ph-sparkle'}" aria-hidden="true"></i>
                  </div>
                  <div class="class-guide-titles">
                    <h3 class="class-guide-name" style="color: #fff;">${cls.name}</h3>
                    <span class="class-guide-role" style="color: ${cls.color}; font-weight: 700; font-size: 0.75rem; letter-spacing: 0.08em; text-transform: uppercase;">
                      ${cls.role}
                    </span>
                  </div>
                </div>

                <p class="class-guide-desc" style="color: #cbd5e1; font-size: 0.85rem; line-height: 1.5; margin: 0.75rem 0;">
                  ${cls.desc}
                </p>

                <div class="class-guide-divinities">
                  <div style="font-size: 0.7rem; color: #64748b; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 0.35rem;">
                    Divindades Afiliadas (${associated.length})
                  </div>
                  <div style="display: flex; flex-wrap: wrap; gap: 0.4rem;">
                    ${associated.length > 0 ? associated.map(god => `
                      <button type="button" class="class-god-chip" data-god-id="${god.id}" style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.12); border-radius: 4px; padding: 0.2rem 0.5rem; font-size: 0.75rem; color: #e2e8f0; cursor: pointer; transition: 0.2s ease; transition-property: color, background-color, border-color, box-shadow, opacity, transform, filter;">
                        ${god.name.split('/')[0].trim()}
                      </button>
                    `).join('') : '<span style="font-size: 0.75rem; color: #64748b; font-style: italic;">Nenhuma divindade vinculada</span>'}
                  </div>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      `;

      // Delegação de clique nos chips de divindade dentro do modal
      content.querySelectorAll('.class-god-chip').forEach(chip => {
        chip.addEventListener('click', () => {
          const godId = chip.getAttribute('data-god-id');
          if (godId) {
            closeClassesModal();
            state.selectedGodId = godId;
            state.selectedLevel = 1;
            state.selectedChoiceIndex = 0;
            renderGodSelector(godId);
            const stage = document.getElementById('god-selector');
            if (stage) stage.scrollIntoView({ behavior: 'smooth' });
          }
        });
      });
    }

    let lastFocusedElement = null;

    function openClassesModal() {
      lastFocusedElement = document.activeElement;
      renderClassesContent();
      modal.classList.add('open');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      if (closeBtn) closeBtn.focus();
    }

    function closeClassesModal() {
      modal.classList.remove('open');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
        lastFocusedElement.focus();
      }
    }

    triggerBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        openClassesModal();
      });
    });

    if (closeBtn) closeBtn.addEventListener('click', closeClassesModal);

    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeClassesModal();
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('open')) {
        closeClassesModal();
      }
    });

    // Expor globalmente para abrir ao clicar no badge de classe do palco
    window.openClassesGuideModal = openClassesModal;
  }

  // ===========================================================================
  // 13.1 MODAL DE DOCUMENTOS COMPLEMENTARES EDITORIAIS (OFICIAL)
  // ===========================================================================
  function formatComplementContent(rawText) {
    if (!rawText) return '<p class="complement-empty-msg">Nenhum texto adicional registrado para este documento.</p>';

    // Escapar tags HTML básicas
    let safe = rawText
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    // Títulos como "NÍVEL UM", "PASSIVA ÚNICA", "História", etc.
    safe = safe.replace(/^(NÍVEL\s+[A-ZÀ-Ú]+|PASSIVA\s+ÚNICA|História|Subdivisões|Traços de Personalidade|Itens da Santa Igreja|Apóstolos da Abundância|Katádesmos das Sombras)/gim, '<h3 class="complement-section-heading">$1</h3>');

    // Nomes de poderes no padrão "Nome: Descrição"
    safe = safe.replace(/^([A-ZÀ-Úa-zà-ú0-9\s'–—\-()]+):/gm, '<strong class="complement-power-name">$1:</strong>');

    // Quebras de linha limpas
    safe = safe.replace(/\n\n+/g, '</p><p class="complement-p">');
    safe = safe.replace(/\n/g, '<br>');

    return `<div class="complement-formatted-body"><p class="complement-p">${safe}</p></div>`;
  }

  let powerDocsPending = null;

  function renderComplementDocument(god, comp) {
    const titleEl = document.getElementById('complement-modal-title');
    const subtitleEl = document.getElementById('complement-modal-subtitle');
    const contentEl = document.getElementById('complement-modal-content');
    if (!contentEl) return;

    if (titleEl) titleEl.textContent = comp.label.toUpperCase();
    if (subtitleEl) {
      const notePart = comp.note ? ` · ${comp.note}` : '';
      subtitleEl.textContent = `${god.name.toUpperCase()} // ${comp.status ? comp.status.toUpperCase() : 'CANÔNICO'}${notePart}`;
    }

    const docId = comp.documentId;
    // Os textos integrais (2 MB) só descem quando alguém abre o primeiro documento
    if (docId && !window.VALIDATION_DOCUMENTS) {
      contentEl.innerHTML = '<p class="complement-p">Abrindo o documento…</p>';
      if (!powerDocsPending) {
        powerDocsPending = new Promise((resolve, reject) => {
          const s = document.createElement('script');
          s.src = 'content/poderes/powers_docs.js';
          s.onload = resolve;
          s.onerror = () => { powerDocsPending = null; s.remove(); reject(); };
          document.head.appendChild(s);
        });
      }
      powerDocsPending.then(() => renderComplementDocument(god, comp), () => {
        contentEl.innerHTML = '<p class="complement-p">Não foi possível carregar o documento. Verifique a conexão e tente de novo.</p>';
      });
      return;
    }
    const docObj = (window.VALIDATION_DOCUMENTS && docId) ? window.VALIDATION_DOCUMENTS[docId] : null;
    const rawText = docObj ? (docObj.text || docObj) : (comp.note || 'Documento em processo de catalogação canônica.');

    let navHtml = '';
    if (god.complements && god.complements.length > 1) {
      navHtml = `
        <div class="complement-modal-tabs" role="tablist" aria-label="Documentos Complementares">
          ${god.complements.map((c, idx) => `
            <button type="button" class="complement-tab-btn ${c.label === comp.label ? 'active' : ''}" data-idx="${idx}">
              <i class="ph ph-scroll"></i>
              <span>${c.label}</span>
            </button>
          `).join('')}
        </div>
      `;
    }

    contentEl.innerHTML = `
      ${navHtml}
      <div class="complement-doc-container">
        ${comp.docLink ? `
          <div style="margin: 0 0 1.25rem 0;">
            <a href="${comp.docLink}" target="_blank" rel="noopener noreferrer" class="btn-canonical-doc" style="display: inline-flex; align-items: center; gap: 0.5rem; text-decoration: none; padding: 0.65rem 1.2rem; background: linear-gradient(135deg, rgba(212, 175, 55, 0.25) 0%, rgba(13, 22, 38, 0.95) 100%); border: 1px solid rgba(212, 175, 55, 0.6); color: #f1d27a; font-family: var(--font-game, 'Cinzel', serif); font-size: 0.82rem; font-weight: 700; border-radius: 6px; box-shadow: 0 4px 14px rgba(0,0,0,0.5);">
              <i class="ph ph-arrow-square-out" style="font-size: 1.1rem;"></i>
              <span>ACESSAR DOCUMENTO OFICIAL NO GOOGLE DOCS</span>
            </a>
          </div>
        ` : ''}
        ${comp.note ? `
          <div class="complement-note-banner">
            <i class="ph ph-info"></i>
            <span><strong>DIRETRIZ EDITORIAL:</strong> ${comp.note}</span>
          </div>
        ` : ''}
        ${formatComplementContent(typeof rawText === 'string' ? rawText : JSON.stringify(rawText, null, 2))}
      </div>
    `;

    // Listeners das abas de múltiplos complementos
    if (god.complements && god.complements.length > 1) {
      contentEl.querySelectorAll('.complement-tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const idx = parseInt(btn.getAttribute('data-idx'), 10);
          if (god.complements[idx]) {
            renderComplementDocument(god, god.complements[idx]);
          }
        });
      });
    }
  }

  function openComplementModalForGod(god) {
    const modal = document.getElementById('complement-modal');
    const closeBtn = document.getElementById('complement-modal-close-btn');
    if (!modal || !god || !god.complements || god.complements.length === 0) return;

    renderComplementDocument(god, god.complements[0]);
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    if (closeBtn) closeBtn.focus();
  }

  function closeComplementModal() {
    const modal = document.getElementById('complement-modal');
    if (!modal) return;
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function initComplementModal() {
    const modal = document.getElementById('complement-modal');
    const closeBtn = document.getElementById('complement-modal-close-btn');
    if (!modal) return;

    if (closeBtn) {
      closeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        closeComplementModal();
      });
    }

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeComplementModal();
      }
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('open')) {
        closeComplementModal();
      }
    });

    window.openComplementModalForGod = openComplementModalForGod;
    window.closeComplementModal = closeComplementModal;
  }

  // ===========================================================================
  // 14. SISTEMA TÁTICO DE COMPARAÇÃO DE DIVINDADES (DOCK + MODAL)
  // ===========================================================================
  function initCompareSystem() {
    const compareToggleBtn = document.getElementById('btn-toggle-compare');
    const compareDock = document.getElementById('compare-dock');
    const compareDockCount = document.getElementById('compare-dock-count');
    const compareDockChips = document.getElementById('compare-dock-chips');
    const btnOpenCompare = document.getElementById('btn-dock-open-compare') || document.getElementById('btn-open-compare-modal');
    const btnClearCompare = document.getElementById('btn-dock-clear') || document.getElementById('btn-clear-compare');
    const modal = document.getElementById('compare-modal');
    const content = document.getElementById('compare-modal-content');
    const closeBtn = document.getElementById('compare-modal-close-btn') || document.getElementById('close-compare-modal');

    // Sincroniza o botão do palco com o estado de inclusão no comparador
    window.updateCompareButtonState = function () {
      if (!compareToggleBtn) return;
      const isIncluded = state.comparedGodIds.includes(state.selectedGodId);
      const span = compareToggleBtn.querySelector('span');
      const icon = compareToggleBtn.querySelector('i');

      if (isIncluded) {
        compareToggleBtn.classList.add('active');
        if (span) span.textContent = 'Remover da Comparação';
        if (icon) icon.className = 'ph ph-minus-circle';
      } else {
        compareToggleBtn.classList.remove('active');
        if (span) span.textContent = 'Comparar Divindade (+)';
        if (icon) icon.className = 'ph ph-plus-circle';
      }
    };

    function updateDockUI() {
      if (!compareDock) return;

      const total = state.comparedGodIds.length;
      if (total === 0) {
        compareDock.classList.add('hidden');
        compareDock.setAttribute('aria-hidden', 'true');
        return;
      }

      compareDock.classList.remove('hidden');
      compareDock.setAttribute('aria-hidden', 'false');

      if (compareDockCount) {
        compareDockCount.textContent = `${total} / 3`;
      }

      if (compareDockChips) {
        compareDockChips.innerHTML = state.comparedGodIds.map(id => {
          const god = state.divinities.find(d => d.id === id);
          if (!god) return '';
          return `
            <div class="compare-chip" data-god-id="${god.id}">
              <span class="compare-chip-name">${god.name.split('/')[0].trim()}</span>
              <button type="button" class="compare-chip-remove" data-remove-god="${god.id}" aria-label="Remover ${god.name} da comparação">
                <i class="ph ph-x" aria-hidden="true"></i>
              </button>
            </div>
          `;
        }).join('');

        // Remove ao clicar no [x] do chip
        compareDockChips.querySelectorAll('.compare-chip-remove').forEach(btn => {
          btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const removeId = btn.getAttribute('data-remove-god');
            state.comparedGodIds = state.comparedGodIds.filter(id => id !== removeId);
            updateDockUI();
            window.updateCompareButtonState();
            if (modal && modal.classList.contains('open')) {
              renderCompareModalContent();
            }
          });
        });
      }
    }

    function toggleCurrentGodComparison() {
      const currentId = state.selectedGodId;
      const index = state.comparedGodIds.indexOf(currentId);

      if (index >= 0) {
        state.comparedGodIds.splice(index, 1);
      } else {
        if (state.comparedGodIds.length >= 3) {
          showComparisonNotice('Limite de 3 divindades simultâneas atingido.');
          return;
        }
        state.comparedGodIds.push(currentId);
      }

      updateDockUI();
      window.updateCompareButtonState();
    }

    function showComparisonNotice(msg) {
      if (!compareToggleBtn) return;
      const origText = compareToggleBtn.querySelector('span')?.textContent;
      const span = compareToggleBtn.querySelector('span');
      if (span) span.textContent = msg;
      compareToggleBtn.style.borderColor = 'var(--nt-crimson-bright)';
      setTimeout(() => {
        if (span && origText) span.textContent = origText;
        compareToggleBtn.style.borderColor = '';
        window.updateCompareButtonState();
      }, 2000);
    }

    function renderCompareModalContent() {
      if (!content) return;

      const gods = state.comparedGodIds
        .map(id => state.divinities.find(d => d.id === id))
        .filter(Boolean);

      if (gods.length === 0) {
        content.innerHTML = `
          <div style="text-align: center; padding: 3rem 1rem; color: #94a3b8;">
            <i class="ph ph-scales" style="font-size: 3rem; color: #475569; display: block; margin-bottom: 1rem;"></i>
            <h3 style="color: #fff; margin-bottom: 0.5rem;">Nenhuma divindade selecionada</h3>
            <p style="font-size: 0.85rem; max-width: 400px; margin: 0 auto;">Adicione até 3 divindades usando o botão "Comparar Divindade (+)" no palco tático para visualizar matriz de poderes lado a lado.</p>
          </div>
        `;
        return;
      }

      content.innerHTML = `
        <div style="overflow-x: auto; -webkit-overflow-scrolling: touch;">
          <table class="compare-table" style="width: 100%; border-collapse: collapse; min-width: 640px;">
            <thead>
              <tr>
                <th style="width: 160px; text-align: left; padding: 1rem; background: rgba(0,0,0,0.4); border-bottom: 1px solid rgba(255,255,255,0.1); color: var(--nt-gold-bright); font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.1em;">
                  Critério Tático
                </th>
                ${gods.map(g => `
                  <th style="padding: 1rem; background: rgba(0,0,0,0.3); border-bottom: 1px solid rgba(255,255,255,0.1); border-left: 1px solid rgba(255,255,255,0.06); text-align: center;">
                    <div style="font-family: var(--nt-font-cinzel); font-size: 1.1rem; color: #fff; font-weight: 700;">${g.name.split('/')[0].trim()}</div>
                    <div style="font-size: 0.75rem; color: #94a3b8; margin-top: 0.2rem;">${g.title || g.pantheon}</div>
                    <button type="button" class="btn-select-compared-god" data-god-id="${g.id}" style="margin-top: 0.6rem; padding: 0.3rem 0.8rem; background: rgba(212,175,55,0.15); border: 1px solid rgba(212,175,55,0.4); border-radius: 4px; color: var(--nt-gold-bright); font-size: 0.75rem; font-weight: 700; cursor: pointer; transition: 0.2s ease; transition-property: color, background-color, border-color, box-shadow, opacity, transform, filter;">
                      Visualizar no Palco
                    </button>
                  </th>
                `).join('')}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style="padding: 0.8rem 1rem; font-weight: 700; font-size: 0.75rem; color: #94a3b8; text-transform: uppercase; border-bottom: 1px solid rgba(255,255,255,0.06);">
                  Reino Cósmico
                </td>
                ${gods.map(g => `
                  <td style="padding: 0.8rem 1rem; text-align: center; border-bottom: 1px solid rgba(255,255,255,0.06); border-left: 1px solid rgba(255,255,255,0.06); color: #e2e8f0; font-size: 0.85rem;">
                    ${g.reino || g.pantheon}
                  </td>
                `).join('')}
              </tr>
              <tr>
                <td style="padding: 0.8rem 1rem; font-weight: 700; font-size: 0.75rem; color: #94a3b8; text-transform: uppercase; border-bottom: 1px solid rgba(255,255,255,0.06);">
                  Classe Perpétua
                </td>
                ${gods.map(g => `
                  <td style="padding: 0.8rem 1rem; text-align: center; border-bottom: 1px solid rgba(255,255,255,0.06); border-left: 1px solid rgba(255,255,255,0.06); color: #fff; font-size: 0.85rem; font-weight: 700;">
                    <span style="display: inline-block; padding: 0.25rem 0.6rem; border-radius: 4px; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.12);">
                      ${g.classePerpetua}
                    </span>
                  </td>
                `).join('')}
              </tr>
              <tr>
                <td style="padding: 0.8rem 1rem; font-weight: 700; font-size: 0.75rem; color: #94a3b8; text-transform: uppercase; border-bottom: 1px solid rgba(255,255,255,0.06);">
                  Passiva Única Canônica
                </td>
                ${gods.map(g => `
                  <td style="padding: 0.8rem 1rem; text-align: left; border-bottom: 1px solid rgba(255,255,255,0.06); border-left: 1px solid rgba(255,255,255,0.06); color: #cbd5e1; font-size: 0.8rem; line-height: 1.45;">
                    <strong style="color: var(--nt-gold-bright); display: block; margin-bottom: 0.25rem;">
                      ${(g.passivaUnica || '').split(':')[0] || 'Passiva'}
                    </strong>
                    ${(g.passivaUnica || '').split(':').slice(1).join(':').trim() || g.passivaUnica}
                  </td>
                `).join('')}
              </tr>
              <tr>
                <td style="padding: 0.8rem 1rem; font-weight: 700; font-size: 0.75rem; color: #94a3b8; text-transform: uppercase; border-bottom: 1px solid rgba(255,255,255,0.06);">
                  Habilidade Nível 1 (Inicial)
                </td>
                ${gods.map(g => {
                  const n1 = g.abilities ? g.abilities.find(a => a.level === 1) : null;
                  return `
                    <td style="padding: 0.8rem 1rem; text-align: left; border-bottom: 1px solid rgba(255,255,255,0.06); border-left: 1px solid rgba(255,255,255,0.06); color: #cbd5e1; font-size: 0.8rem; line-height: 1.45;">
                      ${n1 ? `
                        <div style="font-weight: 700; color: #fff; margin-bottom: 0.2rem;">${n1.name}</div>
                        <div style="font-size: 0.7rem; color: var(--nt-gold-bright); margin-bottom: 0.3rem;">${n1.custo || '0'} Éter • ${n1.acao || 'Ação'}</div>
                        <div style="font-size: 0.75rem; color: #94a3b8; max-height: 90px; overflow-y: auto;">${n1.desc}</div>
                      ` : '<span style="color: #64748b;">N/A</span>'}
                    </td>
                  `;
                }).join('')}
              </tr>
              <tr>
                <td style="padding: 0.8rem 1rem; font-weight: 700; font-size: 0.75rem; color: #94a3b8; text-transform: uppercase; border-bottom: 1px solid rgba(255,255,255,0.06);">
                  Habilidade Nível 7 (Suprema)
                </td>
                ${gods.map(g => {
                  const n7 = g.abilities ? g.abilities.find(a => a.level === 7) : null;
                  return `
                    <td style="padding: 0.8rem 1rem; text-align: left; border-bottom: 1px solid rgba(255,255,255,0.06); border-left: 1px solid rgba(255,255,255,0.06); color: #cbd5e1; font-size: 0.8rem; line-height: 1.45;">
                      ${n7 ? `
                        <div style="font-weight: 700; color: #fff; margin-bottom: 0.2rem;">${n7.name}</div>
                        <div style="font-size: 0.7rem; color: var(--nt-crimson-bright); margin-bottom: 0.3rem;">${n7.custo || '0'} Éter • ${n7.acao || 'Ação'}</div>
                        <div style="font-size: 0.75rem; color: #94a3b8; max-height: 90px; overflow-y: auto;">${n7.desc}</div>
                      ` : '<span style="color: #64748b;">N/A</span>'}
                    </td>
                  `;
                }).join('')}
              </tr>
              <tr>
                <td style="padding: 0.8rem 1rem; font-weight: 700; font-size: 0.75rem; color: #94a3b8; text-transform: uppercase;">
                  Perfil de Combate
                </td>
                ${gods.map(g => `
                  <td style="padding: 0.8rem 1rem; text-align: left; border-left: 1px solid rgba(255,255,255,0.06); color: #94a3b8; font-size: 0.8rem; line-height: 1.4;">
                    ${g.gameplaySummary || 'Especialista divino em combate arquetípico.'}
                  </td>
                `).join('')}
              </tr>
            </tbody>
          </table>
        </div>
      `;

      // Conecta botões "Visualizar no Palco"
      content.querySelectorAll('.btn-select-compared-god').forEach(btn => {
        btn.addEventListener('click', () => {
          const godId = btn.getAttribute('data-god-id');
          if (godId) {
            closeCompareModal();
            state.selectedGodId = godId;
            state.selectedLevel = 1;
            state.selectedChoiceIndex = 0;
            renderGodSelector(godId);
            const stage = document.getElementById('god-selector');
            if (stage) stage.scrollIntoView({ behavior: 'smooth' });
          }
        });
      });
    }

    let lastFocusedElement = null;

    function openCompareModal() {
      lastFocusedElement = document.activeElement;
      renderCompareModalContent();
      modal.classList.add('open');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      if (closeBtn) closeBtn.focus();
    }

    function closeCompareModal() {
      modal.classList.remove('open');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
        lastFocusedElement.focus();
      }
    }

    if (compareToggleBtn) {
      compareToggleBtn.addEventListener('click', toggleCurrentGodComparison);
    }

    if (btnOpenCompare) {
      btnOpenCompare.addEventListener('click', openCompareModal);
    }

    if (btnClearCompare) {
      btnClearCompare.addEventListener('click', () => {
        state.comparedGodIds = [];
        updateDockUI();
        window.updateCompareButtonState();
      });
    }

    if (closeBtn) closeBtn.addEventListener('click', closeCompareModal);

    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) closeCompareModal();
      });
    }

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal && modal.classList.contains('open')) {
        closeCompareModal();
      }
    });
  }

  // ===========================================================================
  // 15. AÇÃO DE CRIAÇÃO DE PERSONAGEM (EXPORTAÇÃO TÁTICA / CLIPBOARD)
  // ===========================================================================
  function initCreateCharacterAction() {
    const btn = document.getElementById('btn-create-character');
    if (!btn) return;

    btn.addEventListener('click', () => {
      const god = state.divinities.find(d => d.id === state.selectedGodId);
      if (!god) return;

      const ability = (god.abilities && god.abilities.find(a => isLevelMatch(a, state.selectedLevel))) || (god.abilities && god.abilities[0]);
      let choices = (ability && ability.choices && ability.choices.length > 0) ? ability.choices : [{ name: ability ? ability.name : 'Poder', desc: ability ? ability.desc : '' }];

      if (god.id === 'torre-relogio' && state.selectedFaculty && state.selectedFaculty !== 'Todas') {
        const filtered = choices.filter(c => c.faculty === state.selectedFaculty);
        if (filtered.length > 0) choices = filtered;
      }

      const activeChoice = choices[state.selectedChoiceIndex || 0] || choices[0];
      const parsed = parseTacticalAbility(activeChoice, ability, god);

      let variantText = '';
      if (activeChoice.variants && activeChoice.variants.length > 0) {
        const v = activeChoice.variants[state.selectedVariantIndex || 0] || activeChoice.variants[0];
        variantText = `\nVARIANTE SELECIONADA: [${v.name}]\n${v.desc}\n`;
      }

      const currentUrl = new URL(window.location.href);
      currentUrl.searchParams.set('god', god.id);
      currentUrl.searchParams.set('level', state.selectedLevel);
      if (activeChoice.name) currentUrl.searchParams.set('power', activeChoice.name);
      if (god.id === 'torre-relogio' && state.selectedFaculty) currentUrl.searchParams.set('faculty', state.selectedFaculty);

      const characterData = [
        '==================================================',
        'Midnight City RPG — CONSULTA CANÔNICA DE HABILIDADE',
        '==================================================',
        `Linhagem / Patrono : ${god.name} (${god.heroTitle || ''})`,
        `Panteão & Reino    : ${god.reinoName || 'Cânone Midnight City'}`,
        `Classes            : ${(god.classes || []).map(c => c.toUpperCase()).join(' & ')}`,
        `Papel Tático       : ${god.combatRole || god.macroClasse || 'Especialista'}`,
        `Passiva Única      : ${god.passivaUnica || 'N/A (Conforme regra documental)'}`,
        '--------------------------------------------------',
        `PODER EM CONSULTA  : NÍVEL ${ability ? ability.level : 1} — ${parsed.name}`,
        `Classificação      : [${(parsed.type || 'Ativo').toUpperCase()}]`,
        `Custo & Cooldown   : ${parsed.chips.map(c => `${c.label}: ${c.val}`).join(' • ')}`,
        `Narrativa Canônica :`,
        `${parsed.interpretive}`,
        `Regra Mecânica     :`,
        `${parsed.mechanics}`,
        variantText,
        '--------------------------------------------------',
        `Link de Consulta   : ${currentUrl.href}`,
        '=================================================='
      ].filter(line => line !== '').join('\n');

      function provideFeedback() {
        const origHtml = btn.innerHTML;
        btn.innerHTML = '<i class="ph ph-check" aria-hidden="true"></i> <span>PODER COPIADO!</span>';
        btn.style.background = 'rgba(34, 197, 94, 0.2)';
        btn.style.borderColor = 'rgba(34, 197, 94, 0.6)';
        btn.style.color = '#86efac';

        if (typeof showTacticalToast === 'function') {
          showTacticalToast('Ficha do poder copiada com sucesso para a área de transferência!', 'success');
        }

        setTimeout(() => {
          btn.innerHTML = origHtml;
          btn.style.background = '';
          btn.style.borderColor = '';
          btn.style.color = '';
        }, 2400);
      }

      function fallbackCopyText(text) {
        try {
          const ta = document.createElement('textarea');
          ta.value = text;
          ta.style.position = 'fixed';
          ta.style.left = '-9999px';
          document.body.appendChild(ta);
          ta.select();
          document.execCommand('copy');
          document.body.removeChild(ta);
          provideFeedback();
        } catch (e) {
          console.error('Falha ao copiar:', e);
        }
      }

      if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
        navigator.clipboard.writeText(characterData).then(provideFeedback).catch(() => {
          fallbackCopyText(characterData);
        });
      } else {
        fallbackCopyText(characterData);
      }
    });
  }

  // ===========================================================================
  // 16. OTIMIZAÇÃO DE PERFORMANCE (OFFSCREEN THROTTLING & PREFERS-REDUCED-MOTION)
  // ===========================================================================
  function initOffscreenThrottling() {
    // Listener de acessibilidade para prefers-reduced-motion
    if (window.matchMedia) {
      const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      state.reducedMotion = motionQuery.matches;
      try {
        motionQuery.addEventListener('change', (e) => {
          state.reducedMotion = e.matches;
        });
      } catch (e) {
        // Fallback para navegadores legados
        if (typeof motionQuery.addListener === 'function') {
          motionQuery.addListener((e) => {
            state.reducedMotion = e.matches;
          });
        }
      }
    }

    // IntersectionObserver para pausar loops de canvas/paralaxe quando fora da tela
    if ('IntersectionObserver' in window) {
      const stage = document.getElementById('god-selector');
      if (stage) {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            state.isStageVisible = entry.isIntersecting;
          });
        }, { threshold: 0.05 });
        observer.observe(stage);
      }
    }

    // Scroll suave do botão [ Explorar Divindades ] do Hero
    const heroExploreBtn = document.getElementById('btn-hero-explore');
    if (heroExploreBtn) {
      heroExploreBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const stage = document.getElementById('god-selector');
        if (stage) {
          stage.scrollIntoView({ behavior: 'smooth' });
        }
      });
    }
  }

  // ===========================================================================
  // 17. MENU MOBILE DRAWER
  // ===========================================================================
  function initMobileMenu() {
    const btn = document.getElementById('mobile-menu-btn');
    const drawer = document.getElementById('mobile-menu');
    if (btn && drawer) {
      btn.addEventListener('click', () => {
        drawer.classList.toggle('hidden');
      });
    }
  }

  // ===========================================================================
  // 18. INICIALIZAÇÃO ROBUSTA & SEGURA
  // ===========================================================================
  function boot() {
    try {
      // 1. Carrega divindades canônicas de powers_data.js
      state.divinities = window.VALIDATION_DIVINITIES || [];
      state.classesInfo = window.PERPETUAL_CLASSES || {};
      state.reinosInfo = window.CANONICAL_REINOS || {};

      // 1.5 Restaura estado completo a partir da URL (?god=, ?level=, ?power=, ?faculty=, ?view=)
      try {
        restoreStateFromUrl();
      } catch (e) {
        console.warn('Restore State from URL:', e);
      }

      // 2. Inicializa Módulos Defensivamente
      try { initHeroPanoramicFx(); } catch (e) { console.warn('Hero Panoramic FX:', e); }
      try { initArchitectureClassesGrid(); } catch (e) { console.warn('Architecture Classes Grid:', e); }
      try { initZoomScaleController(); } catch (e) { console.warn('Zoom Scale Controller:', e); }
      try { initAgentStageParallax(); } catch (e) { console.warn('Stage Parallax:', e); }
      try { initAgentStageParticles(); } catch (e) { console.warn('Stage Particles:', e); }
      try { initAgent2DLiveFx(); } catch (e) { console.warn('Agent 2D Live FX:', e); }
      try { initCarouselNav(); } catch (e) { console.warn('Carousel Nav:', e); }
      try { initFiltersAndSearch(); } catch (e) { console.warn('Filters & Search:', e); }
      try { initPowerModal(); } catch (e) { console.warn('Power Modal:', e); }
      try { initClassesGuideModal(); } catch (e) { console.warn('Classes Guide Modal:', e); }
      try { initComplementModal(); } catch (e) { console.warn('Complement Modal:', e); }
      try { initCompareSystem(); } catch (e) { console.warn('Compare System:', e); }
      try { initCreateCharacterAction(); } catch (e) { console.warn('Create Character Action:', e); }
      try { initOffscreenThrottling(); } catch (e) { console.warn('Offscreen Throttling:', e); }
      try { initKeyboardShortcuts(); } catch (e) { console.warn('Keyboard Shortcuts:', e); }
      try { initMobileMenu(); } catch (e) { console.warn('Mobile Menu:', e); }
      try { init3DHudButtons(); } catch (e) { console.warn('3D HUD Buttons (Lazy):', e); }
      try { initUrlPopstateListener(); } catch (e) { console.warn('URL Popstate Listener:', e); }

      // 3. Atualiza contadores dinâmicos dos botões de filtro
      try { updateFilterCounts(); } catch (e) { console.warn('Update Filter Counts:', e); }

      // 4. Renderização Inicial
      renderGodSelector(state.selectedGodId);
      renderBottomCarousel();
      syncUrlState();

      // Suporte a rolagem direta para o seletor via hash ou param
      try {
        if (window.location.hash === '#god-selector' || new URLSearchParams(window.location.search).get('scroll') === 'selector') {
          const sel = document.getElementById('god-selector');
          if (sel) {
            sel.scrollIntoView({ behavior: 'auto' });
          }
        }
      } catch (e) {
        // Fallback silencioso
      }
    } catch (err) {
      console.error('Fatal initialization error in powers.js:', err);
    }
  }

  if (typeof window !== 'undefined') {
    window.renderGodSelector = renderGodSelector;
    window.selectGodAndScroll = selectGodAndScroll;
    window.buildProceduralRelic = buildProceduralRelic;
    window.restoreStateFromUrl = restoreStateFromUrl;
    window.syncUrlState = syncUrlState;
    window.searchCanonDeep = searchCanonDeep;
    window.applyDeepSearchResult = applyDeepSearchResult;
    window.FACULTIES = FACULTIES;
    Object.defineProperty(window, 'isSlabFlipped', { get: () => isSlabFlipped });
    Object.defineProperty(window, 'is3DModeActive', { get: () => is3DModeActive });
    Object.defineProperty(window, 'state', { get: () => state });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }

})();