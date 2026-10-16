/**
 * MIDNIGHT CITY — CONTROLADOR DO TERMINAL DA ÉGIDE & CÓDICE TÁTICO
 * Implementação 100% conforme Relatório de Auditoria e Orientação de Engenharia:
 * - Bootstrap desacoplado (Core funcional monta ANTES dos efeitos gráficos; falha de WebGL não quebra a página)
 * - Busca lexical robusta (sem tags HTML, acentos normalizados, trechos com <mark>, paginação)
 * - Guia do Novato estruturado em 6 etapas claras com navegação bidirecional e links canônicos
 * - Remoção do simulador de 100 pontos inválido e inclusão de Simulador Didático de Tentativas (10d10)
 * - Mascote unificado: A Presença Aprisionada (margem segura, comentários contextuais, diálogo acessível)
 * - Suporte dinâmico a prefers-reduced-motion e navegação por teclado nativa
 */

(function () {
  'use strict';

  // Ícones SVG Herméticos Oficiais
  const ICONS = {
    compass: `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>`,
    chart: `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>`,
    daggers: `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="14.5 17.5 3 6 3 3 6 3 17.5 14.5"/><line x1="13" y1="19" x2="19" y2="13"/><line x1="16" y1="16" x2="20" y2="20"/><line x1="19" y1="21" x2="21" y2="19"/></svg>`,
    coins: `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="8" cy="8" r="6"/><path d="M18.09 10.37A6 6 0 1 1 10.34 18"/><path d="M7 6h1v4"/><path d="M16.5 12h.5v3"/></svg>`,
    hourglass: `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 22h14"/><path d="M5 2h14"/><path d="M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22"/><path d="M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2"/></svg>`,
    anvil: `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 10H2v2h2v7h16v-7h2v-2h-5l-3-4H9l-2 4z"/><circle cx="12" cy="14" r="1.5"/></svg>`,
    scales: `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="M7 21h10"/><path d="M12 3v18"/><path d="M3 7h18"/></svg>`,
    helix: `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m10 10-1.5 1.5"/><path d="m14 14 1.5-1.5"/><path d="m15.5 8.5-7 7"/><path d="m8.5 15.5 7-7"/><path d="M2 12a10 10 0 0 0 20 0 10 10 0 0 0-20 0Z"/></svg>`,
    index: `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"/><polyline points="10 2 10 10 13 7 16 10 16 2"/></svg>`
  };

  // Estado da Aplicação
  const state = {
    currentMode: 'novato', // 'novato' ou 'arquivo'
    currentCategory: 'convivencia-interpretacao',
    currentDoc: null,
    searchQuery: '',
    searchDebounceTimer: null,
    searchResultsList: [],
    searchVisibleLimit: 10,
    isPresenceOpen: false,
    presenceTipIdx: 0,
    presenceCollapsed: false,
    isBubblePinned: false,
    bubbleAutoHideTimer: null,
    lastAutoCommentTime: 0,
    lastAutoCommentContext: '',
    activeGuideStep: 1,
    isNavigatingProgrammatically: false,
    navProgrammaticTimer: null,
    reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    mouse: { x: 0, y: 0, targetX: 0, targetY: 0 },
    threeEngine: {
      renderer: null,
      scene: null,
      camera: null,
      mesh: null,
      animId: null,
      isRunning: false
    }
  };

  const dom = {};

  // ==========================================================================
  // BOOTSTRAP DESACOPLADO (S01 / Seção 12.1)
  // Ordem estrita:
  // 1. DOM cache & validação dos dados
  // 2. Montar guia do novato em 6 apresentações editoriais, índice e FAQs
  // 3. Vincular navegação e acessibilidade
  // 4. Restaurar estado de rota
  // 5. Inicializar efeitos gráficos de forma isolada com fallback gracioso
  // ==========================================================================
  document.addEventListener('DOMContentLoaded', () => {
    initDom();
    if (!dom.terminalRoot) return;

    if (typeof TERMINAL_DATABASE === 'undefined') {
      console.error('[Terminal da Égide] TERMINAL_DATABASE não carregada.');
      return;
    }

    // 1. Núcleo funcional essencial do Guia e Arquivo
    renderNovatoStations();
    initSquadDiagram();
    initOriginDossier();
    initRequisitionCopy();
    initCurrencyVault();
    initDiceSimulator();
    renderCategoriesList();
    renderPresenceFaqs();
    initGuideNavigation();
    initGuideScrollspy();
    bindEvents();
    initPresenceControls();

    // 2. Rota inicial
    restoreStateFromUrl();

    // 3. Efeitos visuais e 3D isolados (NUNCA bloqueiam a página)
    initGuideMotion();
    initPresence3D();
    initReducedMotionListener();
    initVisibilityObserver();
  });

  function initDom() {
    dom.terminalRoot = document.getElementById('egide-terminal');
    dom.modeBtnNovato = document.getElementById('mode-btn-novato');
    dom.modeBtnArquivo = document.getElementById('mode-btn-arquivo');
    dom.novatoView = document.getElementById('novato-mode-view');
    dom.archiveView = document.getElementById('archive-mode-view');
    
    // Modo Novato — Dossiê Editorial
    dom.novatoStationsGrid = document.getElementById('novato-stations-grid');
    dom.guideScrollFirstBtn = document.getElementById('guide-scroll-first-btn');
    dom.guideGotoArchiveBtn = document.getElementById('guide-goto-archive-btn');
    dom.guideMobileCurrentLabel = document.getElementById('guide-mobile-current-label');
    dom.guideMobileToggleBtn = document.getElementById('guide-mobile-toggle-btn');
    dom.guideNavListWrap = document.getElementById('guide-nav-list-wrap');
    dom.guideBackToTopBtn = document.getElementById('guide-back-to-top-btn');
    dom.guideStickyNav = document.getElementById('guide-sticky-nav');

    // Modo Arquivo
    dom.categoriesList = document.getElementById('sidebar-categories-list');
    dom.sidebarToggleBtn = document.getElementById('terminal-sidebar-toggle');
    dom.sidebar = document.getElementById('terminal-sidebar');
    dom.sidebarArrow = document.getElementById('sidebar-toggle-arrow');
    dom.categoryView = document.getElementById('terminal-category-view');
    dom.catCodeTag = document.getElementById('cat-code-tag');
    dom.catNameTitle = document.getElementById('cat-name-title');
    dom.catDescText = document.getElementById('cat-desc-text');
    dom.categoryDocCards = document.getElementById('category-doc-cards');
    
    // Leitor de Documento
    dom.docReader = document.getElementById('terminal-doc-reader');
    dom.readerBreadcrumbLink = document.getElementById('reader-breadcrumb-link');
    dom.readerBreadcrumbCurrent = document.getElementById('reader-breadcrumb-current');
    dom.readerDocTitle = document.getElementById('reader-doc-title');
    dom.readerDocSubtitle = document.getElementById('reader-doc-subtitle');
    dom.readerDocSource = document.getElementById('reader-doc-source');
    dom.readerDocContent = document.getElementById('reader-doc-content');
    dom.readerToc = document.getElementById('reader-toc');
    dom.readerTocList = document.getElementById('reader-toc-list');
    dom.readerCopyLinkBtn = document.getElementById('reader-copy-link-btn');

    // Busca Lexical
    dom.searchInput = document.getElementById('terminal-search-input');
    dom.searchClearBtn = document.getElementById('terminal-search-clear');
    dom.searchResults = document.getElementById('terminal-search-results');
    dom.searchResultsCount = document.getElementById('search-results-count');
    dom.searchResultsList = document.getElementById('search-results-list');
    dom.searchPaginationWrap = document.getElementById('search-pagination-wrap');
    dom.searchShowMoreBtn = document.getElementById('search-show-more-btn');

    // Companion da Presença
    dom.presenceDock = document.getElementById('janitor-floating-dock');
    dom.presenceSpeechBubble = document.getElementById('janitor-speech-bubble');
    dom.presenceCloseBubbleBtn = document.getElementById('presence-close-bubble-btn');
    dom.presenceBubbleQuote = document.getElementById('janitor-bubble-quote');
    dom.presenceBubbleNote = document.getElementById('janitor-bubble-note');
    dom.presenceTipCounter = document.getElementById('janitor-tip-counter');
    dom.presencePrevBtn = document.getElementById('janitor-prev-tip-btn');
    dom.presenceNextBtn = document.getElementById('janitor-next-tip-btn');
    dom.presenceCanvasCard = document.getElementById('janitor-canvas-card');
    dom.presenceCanvas = document.getElementById('janitor-floating-canvas');
    dom.presenceFallback = document.getElementById('presence-fallback-visual');
    dom.presenceToggleBtn = document.getElementById('janitor-toggle-btn');

    // Modal da Presença
    dom.openPresenceBtn = document.getElementById('open-presence-btn') || document.getElementById('janitor-canvas-card');
    dom.presenceBackdrop = document.getElementById('presence-modal-backdrop');
    dom.closePresenceBtn = document.getElementById('close-presence-btn');
    dom.presenceResponseBox = document.getElementById('presence-response-box');
    dom.presenceResponseQ = document.getElementById('presence-response-q');
    dom.presenceResponseA = document.getElementById('presence-response-a');
    dom.presenceDocShortcut = document.getElementById('presence-doc-shortcut');
    dom.presenceFaqGrid = document.getElementById('presence-faq-grid');
  }

  // ==========================================================================
  // GUIA DO NOVATO: DOSSIÊ EDITORIAL EM 6 APRESENTAÇÕES (SEÇÃO 6 & 7)
  // Estruturas próprias por etapa • Sem repetição mecânica de cards
  // ==========================================================================

  // Dados Táticos Oficiais para a Formação de Esquadrão (Etapa 01)
  const ROLES_DATA = {
    dps: {
      title: 'DPS (Causadores de Dano)',
      badge: 'IMPACTO & FINALIZAÇÃO',
      desc: 'Os causadores de impacto. Especialistas em bater rápido e forte para eliminar monstros antes que eles reajam. Dois petelecos bem dados podem derrubá-los, mas se conseguirem bater, limpam a área.',
      affiliations: 'Zeus, Hades, Poseidon, Ares, Hermes, Tânatos, Melinoe, Despina.'
    },
    tank: {
      title: 'TANKER (Linha de Frente & Proteção)',
      badge: 'ESCUDO & SUSTENTAÇÃO',
      desc: 'O escudo vivo que impede que o DPS e o Suporte morram. Builds focadas em resistir a golpes brutais com HP alto, Armadura e Redução de Dano (RD). "Meu peito é meu para-brisa."',
      affiliations: 'Poseidon, Atena, Apolo, Hefesto, Hermes, Hécate, Magos Astrológicos.'
    },
    support: {
      title: 'SUPORTE (Cura, Buffs & Controle)',
      badge: 'CURA & AMPLIFICAÇÃO',
      desc: 'O pilar estratégico do time. Curam ferimentos, multiplicam o ataque dos causadores de dano e desestabilizam inimigos reduzindo seus dados ou defesas.',
      affiliations: 'Hera, Afrodite, Dionísio, Perséfone, Hipnos, Morfeu, Circe, Tique.'
    }
  };

  // Dados Canônicos de Moedas e Economia (Etapa 06)
  const CURRENCY_DATA = {
    golds: {
      title: 'Golds (Moeda Corrente)',
      role: 'MOEDA CORRENTE',
      desc: 'Compram suprimentos na loja, pagam as taxas de criação e manutenção aos artesãos e adquirem artefatos e poções comuns para as operações rotineiras da Égide.'
    },
    contas: {
      title: 'Contas Celestiais (Moeda Intermediária)',
      role: 'CONVERSÃO & PROGRESSO',
      desc: 'Moeda intermediária obtida em missões, caronas e eventos. Você pode trocar 100 Contas Celestiais por 1 Oração Celestial no Tesouro da Égide.'
    },
    oracoes: {
      title: 'Orações Celestiais (Recurso Raro)',
      role: 'BANNERS & GACHA DE ELITE',
      desc: 'O recurso mais precioso do sistema. Servem para atirar nos Banners Sazonais. A cada Oração gasta, você rola 1d20: se tirar 20 natural, conquista a bênção ou arma exclusiva do banner!'
    }
  };

  // Modelo Textual para Cópia Oficial (Etapa 03)
  const REQUISITION_MODEL_TEXT = `Nº DA FICHA GERAL: [Escolha um número livre na lista de fichas]
E-MAIL: [Seu e-mail para acesso às planilhas no Google Drive]
NOME DA FICHA GERAL: [Seu nome de jogador em off]
NOME DO PERSONAGEM: [Nome do personagem aceito na aprovação]
FILIAÇÃO: [Divindade paterna/materna ou Linhagem arcana]
OFÍCIO: [Seu emprego na Égide: Custódio, Vigilante, Arcanista, etc.]
IDADE & SHAPE: [Idade do personagem e duas fotos do faceclaim]
INDIVIDUALIDADES: [Escolha 3 poderes por nível disponível na lista]
DISTRIBUIÇÃO: [Onde você vai alocar seus pontos de atributos]`;

  function renderStationCustomContent(station) {
    if (station.step === 1) {
      return `
        <p>Ao ingressar na Égide de Avalon, seu personagem fará parte de esquadrões de campo. A primeira escolha crucial é entender sua vocação tática:</p>
        <div class="squad-tactical-layout">
          <div class="squad-svg-container">
            <svg viewBox="0 0 300 240" class="squad-svg-canvas" aria-label="Diagrama Tático de Formação do Esquadrão">
              <!-- Conectores do Esquadrão traçados -->
              <line x1="150" y1="52" x2="72" y2="168" class="squad-con-line" id="squad-line-tank-dps" />
              <line x1="150" y1="52" x2="228" y2="168" class="squad-con-line" id="squad-line-tank-sup" />
              <line x1="72" y1="168" x2="228" y2="168" class="squad-con-line" id="squad-line-dps-sup" />

              <!-- Nó TANKER (Linha de frente) -->
              <g class="squad-node" data-role="tank" tabindex="0" role="button" aria-pressed="false" aria-label="Selecionar Função: Tanker (Linha de Frente)">
                <circle cx="150" cy="52" r="30" class="squad-node-circle" />
                <text x="150" y="49" text-anchor="middle" class="squad-node-text">TANKER</text>
                <text x="150" y="63" text-anchor="middle" font-size="9" fill="#f1d27a" font-family="Space Mono, monospace">ESCUDO</text>
              </g>

              <!-- Nó DPS (Dano - padrão ativo) -->
              <g class="squad-node active" data-role="dps" tabindex="0" role="button" aria-pressed="true" aria-label="Selecionar Função: DPS (Causadores de Dano)">
                <circle cx="72" cy="168" r="30" class="squad-node-circle" />
                <text x="72" y="165" text-anchor="middle" class="squad-node-text">DPS</text>
                <text x="72" y="179" text-anchor="middle" font-size="9" fill="#f1d27a" font-family="Space Mono, monospace">DANO</text>
              </g>

              <!-- Nó SUPORTE (Controle & Cura) -->
              <g class="squad-node" data-role="support" tabindex="0" role="button" aria-pressed="false" aria-label="Selecionar Função: Suporte (Cura & Controle)">
                <circle cx="228" cy="168" r="30" class="squad-node-circle" />
                <text x="228" y="165" text-anchor="middle" class="squad-node-text">SUPORTE</text>
                <text x="228" y="179" text-anchor="middle" font-size="9" fill="#f1d27a" font-family="Space Mono, monospace">CONTROLE</text>
              </g>
            </svg>

            <div class="squad-role-tabs" role="tablist" aria-label="Seleção rápida de papel tático">
              <button class="squad-role-pill active" data-role="dps" role="tab" aria-selected="true">❖ DPS (Dano)</button>
              <button class="squad-role-pill" data-role="tank" role="tab" aria-selected="false">✦ Tanker (Proteção)</button>
              <button class="squad-role-pill" data-role="support" role="tab" aria-selected="false">✦ Suporte (Cura)</button>
            </div>
          </div>

          <!-- Painel Dinâmico de Detalhes da Função -->
          <div class="squad-role-detail-card" id="squad-role-detail-panel" aria-live="polite">
            <div class="squad-role-detail-header">
              <h4 class="squad-role-detail-title" id="squad-detail-title">DPS (Causadores de Dano)</h4>
              <span class="squad-role-badge" id="squad-detail-badge">IMPACTO & FINALIZAÇÃO</span>
            </div>
            <p class="squad-role-detail-desc" id="squad-detail-desc">
              Os causadores de impacto. Especialistas em bater rápido e forte para eliminar monstros antes que eles reajam. Dois petelecos bem dados podem derrubá-los, mas se conseguirem bater, limpam a área.
            </p>
            <div class="squad-role-affiliations" id="squad-detail-affil">
              <strong>Filiações Recomendadas:</strong> Zeus, Hades, Poseidon, Ares, Hermes, Tânatos, Melinoe, Despina.
            </div>
          </div>
        </div>

        <div class="stencil-quote">
          <strong>A Regra de Ouro do Tio H:</strong> 
          <em>“O pato nada, anda e voa, mas faz os três mal. Não faça seu personagem ser um pato!”</em> Especialista é quem sobrevive.
        </div>
      `;
    }

    if (station.step === 2) {
      return `
        <p>A melhor forma de começar sem medo de errar a ambientação é construir um personagem que acabou de ser descoberto pela Égide de Avalon:</p>
        <div class="origins-dossier-layout">
          <div class="origins-cards-wrap" role="region" aria-label="Possibilidades Narrativas de Origem">
            
            <div class="origin-protocol-card open" data-origin="1">
              <div class="origin-card-header" tabindex="0" role="button" aria-expanded="true" aria-controls="origin-body-1">
                <div class="origin-card-title-group">
                  <span class="origin-card-num">01</span>
                  <h4 class="origin-card-title">O Resgatado das Sombras</h4>
                </div>
                <button class="origin-toggle-btn" aria-label="Expandir ou recolher possibilidade">Fechar ▴</button>
              </div>
              <div class="origin-card-body" id="origin-body-1">
                Seu personagem vivia uma vida normal em Londres quando foi atacado por criaturas sombrias e resgatado por agentes da Ordem. Ele não conhece a hierarquia nem os segredos da Cidadela, aprendendo tudo no seu próprio ritmo em cena.
              </div>
            </div>

            <div class="origin-protocol-card" data-origin="2">
              <div class="origin-card-header" tabindex="0" role="button" aria-expanded="false" aria-controls="origin-body-2">
                <div class="origin-card-title-group">
                  <span class="origin-card-num">02</span>
                  <h4 class="origin-card-title">O Desperto Recente</h4>
                </div>
                <button class="origin-toggle-btn" aria-label="Expandir ou recolher possibilidade">Ler esta possibilidade ▾</button>
              </div>
              <div class="origin-card-body" id="origin-body-2">
                Ele acabou de manifestar seus poderes arcanos ou sua herança mítica e foi conduzido à Cidadela de Avalon para aprender a controlar suas dádivas antes que cause um incidente sob os olhos dos mortais.
              </div>
            </div>

            <div class="origin-protocol-card" data-origin="3">
              <div class="origin-card-header" tabindex="0" role="button" aria-expanded="false" aria-controls="origin-body-3">
                <div class="origin-card-title-group">
                  <span class="origin-card-num">03</span>
                  <h4 class="origin-card-title">Primeiro Dia no Departamento</h4>
                </div>
                <button class="origin-toggle-btn" aria-label="Expandir ou recolher possibilidade">Ler esta possibilidade ▾</button>
              </div>
              <div class="origin-card-body" id="origin-body-3">
                Combine no canal de <em>#interações-ingame</em> uma cena onde um agente mais velho explica a você como funcionam as demandas de seu ofício. Uma ótima porta de entrada para entrosar seu personagem com veteranos.
              </div>
            </div>

          </div>

          <!-- Ambientação Visual em Microfilme -->
          <div class="microfilm-frame origin-microfilm-preview" aria-hidden="true">
            <div class="microfilm-overlay"></div>
            <img src="assets/londres_panorama_mj.png" alt="Panorama de Londres Sob o Véu Místico" class="microfilm-img" loading="lazy">
            <div class="microfilm-caption">
              <span class="microfilm-label">AMBIENTAÇÃO URBANA</span>
              <span class="microfilm-sub">LONDRES SOB O VÉU</span>
            </div>
            <div class="microfilm-crosshairs"></div>
          </div>
        </div>

        <div class="talamasca-callout">
          <strong>Dica dos Moderadores:</strong> Se você estiver com dúvidas sobre o passado ou a linhagem divina do seu personagem, pergunte no privado aos Mestres. Eles adoram ajudar a amarrar tramas de novatos!
        </div>
      `;
    }

    if (station.step === 3) {
      return `
        <p>A ficha geral de atributos é criada por um dos ADMs da Égide no tópico oficial da Central. Preencha o protocolo com os campos obrigatórios:</p>
        <div class="requisition-sheet-wrap">
          <div class="requisition-sheet-header">
            <div class="requisition-stamp">PROTOCOLO DE INGRESSO // CENTRAL DE REGISTROS DA ÉGIDE</div>
            <button id="copy-requisition-model-btn" class="copy-model-btn" aria-label="Copiar modelo de pedido para a área de transferência">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
              <span id="copy-btn-text">Copiar modelo de pedido</span>
            </button>
            <span id="copy-feedback-msg" class="copy-feedback-msg" role="status" aria-live="polite">✓ Modelo copiado. Preencha e envie no canal indicado pela equipe.</span>
          </div>

          <table class="requisition-fields-table" aria-label="Campos Obrigatórios da Ficha Geral">
            <tbody>
              <tr>
                <td class="field-key-cell">Nº DA FICHA GERAL</td>
                <td class="field-inst-cell">Escolha um número livre na lista pública de fichas da Central.</td>
              </tr>
              <tr>
                <td class="field-key-cell">E-MAIL DO JOGADOR</td>
                <td class="field-inst-cell">Seu e-mail oficial para liberação de permissão de edição da planilha no Google Drive.</td>
              </tr>
              <tr>
                <td class="field-key-cell">NOME DA FICHA GERAL</td>
                <td class="field-inst-cell">Seu apelido ou nome de jogador no Discord (em off).</td>
              </tr>
              <tr>
                <td class="field-key-cell">NOME DO PERSONAGEM</td>
                <td class="field-inst-cell">Nome completo do personagem aprovado na triagem de lore.</td>
              </tr>
              <tr>
                <td class="field-key-cell">FILIAÇÃO DIVINA / LINHAGEM</td>
                <td class="field-inst-cell">Divindade patrona, progenitor místico ou linhagem arcana escolhida.</td>
              </tr>
              <tr>
                <td class="field-key-cell">OFÍCIO NA ÉGIDE</td>
                <td class="field-inst-cell">Seu posto operacional: Custódio, Vigilante, Arcanista, etc.</td>
              </tr>
              <tr>
                <td class="field-key-cell">IDADE & FACECLAIM (SHAPE)</td>
                <td class="field-inst-cell">Idade do personagem e links para duas fotos de referência visual.</td>
              </tr>
              <tr>
                <td class="field-key-cell">INDIVIDUALIDADES</td>
                <td class="field-inst-cell">Escolha 3 poderes correspondentes ao Nível 1 na lista oficial da sua filiação.</td>
              </tr>
              <tr>
                <td class="field-key-cell">DISTRIBUIÇÃO DE PONTOS</td>
                <td class="field-inst-cell">Alocação de pontos iniciais nos atributos (Recomendado: 30 HP e 10 ATK ou 10 DEF).</td>
              </tr>
            </tbody>
          </table>

          <div class="talamasca-tip-box">
            <strong>Distribuição Recomendada para Novatos:</strong>
            Coloque sempre <strong>30 HP</strong> e <strong>10 ATK</strong> (se for DPS) ou <strong>10 DEF</strong> (se for Tanker). Essa configuração garante sobrevivência nas primeiras semanas sem dispersar recursos.
          </div>
        </div>
      `;
    }

    if (station.step === 4) {
      return `
        <div class="talamasca-danger-warning">
          <strong>REGRA CAPITAL:</strong> NÃO INVENTE DE LUTAR SOLO ANTES DO NÍVEL 5! Se seu personagem morrer em um combate de farm, a morte é permanente.
        </div>
        <p>Fontes seguras de crescimento para agentes do Nível 1 ao Nível 4:</p>
        
        <div class="activity-progression-trail" aria-label="Trilha de Atividades Seguras para Novatos">
          
          <div class="activity-milestone">
            <div class="milestone-node" aria-hidden="true"></div>
            <div class="milestone-card">
              <div class="milestone-header">
                <h4 class="milestone-title">1. Turnos Livres de Roleplay</h4>
                <span class="milestone-reward-badge">10 XP / 40 PALAVRAS</span>
              </div>
              <p class="milestone-desc">
                Escreva cenas interpretativas com amigos no servidor. A cada 40 palavras escritas no canal adequado, você recebe 10 XP. É perfeitamente viável atingir o Nível 3 apenas desenvolvendo boas histórias e diálogos.
              </p>
            </div>
          </div>

          <div class="activity-milestone">
            <div class="milestone-node" aria-hidden="true"></div>
            <div class="milestone-card">
              <div class="milestone-header">
                <h4 class="milestone-title">2. Carona em Sereias & Scyllas</h4>
                <span class="milestone-reward-badge">1.200 XP + CONTAS + ORAÇÕES</span>
              </div>
              <p class="milestone-desc">
                Junte-se a um veterano experiente uma vez por semana. Ele derrota os monstros de alto escalão e você, como aprendiz, ganha <strong>1.200 XP, 1.000 Contas Celestiais e 25 Orações</strong> com total segurança.
              </p>
            </div>
          </div>

          <div class="activity-milestone">
            <div class="milestone-node" aria-hidden="true"></div>
            <div class="milestone-card">
              <div class="milestone-header">
                <h4 class="milestone-title">3. Missões Sazonais Verdes</h4>
                <span class="milestone-reward-badge">SEM RISCO LETAL</span>
              </div>
              <p class="milestone-desc">
                Roteiros interpretativos em grupo, sem combates letais, que pagam ótimas quantias de XP e Contas. Ideais para conhecer outros novatos e testar perícias sociais e de investigação.
              </p>
            </div>
          </div>

        </div>
      `;
    }

    if (station.step === 5) {
      return `
        <p>Você nunca narra que seu personagem acertou o monstro. Você narra que ele <strong>tenta golpear</strong> — e deixa os dados decidirem o destino:</p>
        <div class="talamasca-steps-mini">
          <div class="step-mini">1. Entre no canal do Discord com o número da sua ficha.</div>
          <div class="step-mini">2. Identifique o personagem e a ação: <em>"Shen — Ataque com Lança"</em>.</div>
          <div class="step-mini">3. Digite o comando: <code>/roll 10d10 t5</code> (exemplo de 10 dados com dificuldade 5).</div>
          <div class="step-mini">4. Cada dado com valor igual ou superior à dificuldade conta como 1 sucesso.</div>
          <div class="step-mini">5. O atacante precisa de mais sucessos que o defensor para acertar. Em caso de empate, o golpe falha.</div>
        </div>

        <div id="novato-dice-simulator-mount" class="novato-dice-simulator-mount"></div>
      `;
    }

    if (station.step === 6) {
      return `
        <p>A economia de Midnight City é dividida em três pilares fundamentais com funções distintas:</p>
        
        <div class="currency-vault-layout">
          <div class="currency-tokens-grid" role="tablist" aria-label="Recursos e Moedas da Égide">
            
            <div class="currency-token-card active" data-currency="golds" role="tab" aria-selected="true" tabindex="0">
              <div class="currency-icon-circle" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="#f1d27a" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><polygon points="12 6 15 12 12 18 9 12 12 6"/><circle cx="12" cy="12" r="1.5" fill="#f1d27a"/></svg>
              </div>
              <h4 class="currency-token-name">Golds</h4>
              <div class="currency-token-role">MOEDA CORRENTE</div>
            </div>

            <div class="currency-token-card" data-currency="contas" role="tab" aria-selected="false" tabindex="0">
              <div class="currency-icon-circle" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="#f1d27a" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="12" rx="8" ry="6"/><circle cx="7" cy="10" r="1.5" fill="#f1d27a"/><circle cx="12" cy="6" r="1.5" fill="#f1d27a"/><circle cx="17" cy="10" r="1.5" fill="#f1d27a"/><circle cx="15" cy="16" r="1.5" fill="#f1d27a"/><circle cx="9" cy="16" r="1.5" fill="#f1d27a"/></svg>
              </div>
              <h4 class="currency-token-name">Contas Celestiais</h4>
              <div class="currency-token-role">CONVERSÃO & PROGRESSO</div>
            </div>

            <div class="currency-token-card" data-currency="oracoes" role="tab" aria-selected="false" tabindex="0">
              <div class="currency-icon-circle" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="#f1d27a" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15 9 22 12 15 15 12 22 9 15 2 12 9 9 12 2"/><circle cx="12" cy="12" r="2" fill="#f1d27a"/></svg>
              </div>
              <h4 class="currency-token-name">Orações Celestiais</h4>
              <div class="currency-token-role">BANNERS & GACHA DE ELITE</div>
            </div>

          </div>

          <div class="currency-detail-panel" id="currency-detail-panel" aria-live="polite">
            <h4 class="currency-detail-title" id="currency-panel-title">Golds (Moeda Corrente)</h4>
            <p class="currency-detail-desc" id="currency-panel-desc">
              Compram suprimentos na loja, pagam as taxas de criação e manutenção aos artesãos e adquirem artefatos e poções comuns para as operações rotineiras da Égide.
            </p>
          </div>
        </div>

        <div class="talamasca-tip-box">
          <strong>Recomendação Estratégica:</strong> Guarde suas orações para o banner que traz a <em>Bênção Assinatura</em> da sua filiação divina. Os banners sazonais têm rotação periódica.
        </div>
      `;
    }

    return station.bodyHtml;
  }

  function renderNovatoStations() {
    if (!dom.novatoStationsGrid || !TERMINAL_DATABASE.novatoGuide) return;

    dom.novatoStationsGrid.innerHTML = TERMINAL_DATABASE.novatoGuide.map((station, index) => {
      const isFirst = index === 0;
      const isLast = index === TERMINAL_DATABASE.novatoGuide.length - 1;
      const prevStep = index; // 1-indexed prev
      const nextStep = index + 2; // 1-indexed next

      return `
        <article class="station-card ${isFirst ? 'active' : ''}" data-station="${station.step}" id="etapa-${station.step}">
          <header class="station-header">
            <div class="station-tag-row">
              <span class="station-tag">${station.tag}</span>
              <span class="station-badge">${station.badge}</span>
            </div>
            <h3 class="station-title" id="etapa-heading-${station.step}">${station.title}</h3>
            <p class="station-objective"><strong>Objetivo:</strong> ${station.objective || station.lead}</p>
          </header>

          <div class="station-content-body">
            <div class="station-section-label">O QUE VOCÊ PRECISA SABER:</div>
            ${renderStationCustomContent(station)}
          </div>

          <footer class="station-footer">
            <div class="station-nav-actions">
              ${!isFirst ? `
                <button class="station-step-btn prev" data-goto="${prevStep}" aria-label="Ir para etapa anterior: Etapa ${prevStep}">
                  ← Etapa anterior
                </button>
              ` : `<span></span>`}

              ${station.docId ? `
                <a href="?mode=arquivo&doc=${station.docId}" class="station-direct-link" data-doc="${station.docId}">
                  <span>Ver regra completa (${station.shortLabel})</span> →
                </a>
              ` : ''}

              ${!isLast ? `
                <button class="station-step-btn next" data-goto="${nextStep}" aria-label="Avançar para próxima etapa: Etapa ${nextStep}">
                  Próxima etapa →
                </button>
              ` : `
                <a href="?mode=arquivo" class="station-step-btn finish" data-action="explore-rules">
                  Explorar Arquivo de Regras ↗
                </a>
              `}
            </div>
          </footer>
        </article>
      `;
    }).join('');

    // Cliques nos botões de navegação das etapas
    dom.novatoStationsGrid.addEventListener('click', (e) => {
      const stepBtn = e.target.closest('.station-step-btn');
      if (stepBtn) {
        const goto = stepBtn.getAttribute('data-goto');
        if (goto) {
          e.preventDefault();
          selectStation(parseInt(goto, 10));
          return;
        }
      }

      const finishBtn = e.target.closest('.station-step-btn.finish');
      if (finishBtn) {
        e.preventDefault();
        switchMode('arquivo', true);
        return;
      }

      const docLink = e.target.closest('.station-direct-link');
      if (docLink) {
        const docId = docLink.getAttribute('data-doc');
        if (docId) {
          e.preventDefault();
          switchMode('arquivo', true);
          openDocument(docId, '', true);
        }
      }
    });
  }

  // ── Interação 01: Diagrama Tático de Esquadrão ──
  function initSquadDiagram() {
    const layout = document.querySelector('.squad-tactical-layout');
    if (!layout) return;

    function setRole(roleKey) {
      const role = ROLES_DATA[roleKey];
      if (!role) return;

      // Atualiza nós SVG
      layout.querySelectorAll('.squad-node').forEach(node => {
        const r = node.getAttribute('data-role');
        const isActive = (r === roleKey);
        node.classList.toggle('active', isActive);
        node.setAttribute('aria-pressed', isActive ? 'true' : 'false');
      });

      // Atualiza pills
      layout.querySelectorAll('.squad-role-pill').forEach(pill => {
        const r = pill.getAttribute('data-role');
        const isActive = (r === roleKey);
        pill.classList.toggle('active', isActive);
        pill.setAttribute('aria-selected', isActive ? 'true' : 'false');
      });

      // Atualiza painel de detalhes com transição rápida
      const title = document.getElementById('squad-detail-title');
      const badge = document.getElementById('squad-detail-badge');
      const desc = document.getElementById('squad-detail-desc');
      const affil = document.getElementById('squad-detail-affil');

      if (title) title.textContent = role.title;
      if (badge) badge.textContent = role.badge;
      if (desc) desc.textContent = role.desc;
      if (affil) affil.innerHTML = `<strong>Filiações Recomendadas:</strong> ${role.affiliations}`;
    }

    // Cliques nos nós SVG
    layout.querySelectorAll('.squad-node').forEach(node => {
      node.addEventListener('click', () => {
        const r = node.getAttribute('data-role');
        if (r) setRole(r);
      });
      node.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const r = node.getAttribute('data-role');
          if (r) setRole(r);
        }
      });
    });

    // Cliques nas pills
    layout.querySelectorAll('.squad-role-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        const r = pill.getAttribute('data-role');
        if (r) setRole(r);
      });
    });
  }

  // ── Interação 02: Dossiê de Origens Narrativas (Accordion) ──
  function initOriginDossier() {
    const wrap = document.querySelector('.origins-cards-wrap');
    if (!wrap) return;

    wrap.addEventListener('click', (e) => {
      const header = e.target.closest('.origin-card-header') || e.target.closest('.origin-toggle-btn');
      if (!header) return;

      const card = header.closest('.origin-protocol-card');
      if (!card) return;

      const isOpen = card.classList.toggle('open');
      const toggleBtn = card.querySelector('.origin-toggle-btn');
      const cardHeader = card.querySelector('.origin-card-header');

      if (cardHeader) cardHeader.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      if (toggleBtn) toggleBtn.textContent = isOpen ? 'Fechar ▴' : 'Ler esta possibilidade ▾';

      if (typeof ScrollTrigger !== 'undefined') {
        ScrollTrigger.refresh();
      }
    });
  }

  // ── Interação 03: Cópia Oficial de Requisição da Ficha ──
  function initRequisitionCopy() {
    const copyBtn = document.getElementById('copy-requisition-model-btn');
    const feedback = document.getElementById('copy-feedback-msg');
    const btnText = document.getElementById('copy-btn-text');
    if (!copyBtn) return;

    function showFeedback() {
      if (feedback) {
        feedback.textContent = '✓ Modelo copiado. Preencha e envie no canal indicado pela equipe.';
        feedback.style.display = 'inline-block';
      }
      if (btnText) btnText.textContent = '✓ Modelo Copiado';
      setTimeout(() => {
        if (feedback) feedback.style.display = 'none';
        if (btnText) btnText.textContent = 'Copiar modelo de pedido';
      }, 3000);
    }

    copyBtn.onclick = () => {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(REQUISITION_MODEL_TEXT)
          .then(showFeedback)
          .catch(() => fallbackCopyModel(REQUISITION_MODEL_TEXT));
      } else {
        fallbackCopyModel(REQUISITION_MODEL_TEXT);
      }
    };

    function fallbackCopyModel(text) {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.left = '-9999px';
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand('copy');
        showFeedback();
      } catch (_) {
        alert('Copie o modelo manualmente:\n\n' + text);
      }
      document.body.removeChild(ta);
    }
  }

  // ── Interação 06: Vitrine do Inventário de Moedas ──
  function initCurrencyVault() {
    const vault = document.querySelector('.currency-vault-layout');
    if (!vault) return;

    vault.querySelectorAll('.currency-token-card').forEach(card => {
      card.addEventListener('click', () => {
        const curKey = card.getAttribute('data-currency');
        const data = CURRENCY_DATA[curKey];
        if (!data) return;

        vault.querySelectorAll('.currency-token-card').forEach(c => {
          const isActive = (c === card);
          c.classList.toggle('active', isActive);
          c.setAttribute('aria-selected', isActive ? 'true' : 'false');
        });

        const panelTitle = document.getElementById('currency-panel-title');
        const panelDesc = document.getElementById('currency-panel-desc');
        if (panelTitle) panelTitle.textContent = data.title;
        if (panelDesc) panelDesc.textContent = data.desc;
      });

      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          card.click();
        }
      });
    });
  }

  // ── Navegação & Scrollspy do Guia do Novato ──
  function selectStation(stepNum) {
    state.activeGuideStep = stepNum;
    state.isNavigatingProgrammatically = true;

    // 1. Atualizar cards
    const cards = document.querySelectorAll('.station-card');
    cards.forEach(card => {
      const s = parseInt(card.getAttribute('data-station'), 10);
      card.classList.toggle('active', s === stepNum);
    });

    // 2. Atualizar pills do índice lateral
    const pills = document.querySelectorAll('.station-nav-btn');
    pills.forEach(pill => {
      const t = parseInt(pill.getAttribute('data-target'), 10);
      const isActive = (t === stepNum);
      pill.classList.toggle('active', isActive);
      if (isActive) {
        pill.setAttribute('aria-current', 'step');
      } else {
        pill.removeAttribute('aria-current');
      }
    });

    // 3. Atualizar barra de status mobile
    const currentData = TERMINAL_DATABASE.novatoGuide.find(st => st.step === stepNum);
    if (dom.guideMobileCurrentLabel && currentData) {
      dom.guideMobileCurrentLabel.textContent = `Etapa ${stepNum} de 6 · ${currentData.shortLabel}`;
    }

    // 4. Scroll suave até o título da etapa compensando cabeçalho (~90px)
    const targetCard = document.getElementById(`etapa-${stepNum}`);
    if (targetCard) {
      const headerOffset = 90;
      const elementPosition = targetCard.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: state.reducedMotion ? 'auto' : 'smooth'
      });

      // Acessibilidade: posicionar foco no título com preventScroll
      const heading = targetCard.querySelector('.station-title');
      if (heading) {
        heading.setAttribute('tabindex', '-1');
        try {
          heading.focus({ preventScroll: true });
        } catch (_) {
          heading.focus();
        }
      }

      suggestContextualTip(`etapa-${stepNum}`);
    }

    // Desbloquear scrollspy após o término do movimento
    clearTimeout(state.navProgrammaticTimer);
    state.navProgrammaticTimer = setTimeout(() => {
      state.isNavigatingProgrammatically = false;
    }, 750);
  }

  function initGuideNavigation() {
    // 1. Botão do Banner: Ir à primeira etapa
    if (dom.guideScrollFirstBtn) {
      dom.guideScrollFirstBtn.onclick = () => selectStation(1);
    }

    // 2. Botão do Banner: Consultar regras
    if (dom.guideGotoArchiveBtn) {
      dom.guideGotoArchiveBtn.onclick = () => switchMode('arquivo', true);
    }

    // 3. Botão Mobile: Expandir lista de etapas
    if (dom.guideMobileToggleBtn && dom.guideNavListWrap) {
      dom.guideMobileToggleBtn.onclick = () => {
        const isOpen = dom.guideNavListWrap.classList.toggle('open');
        dom.guideMobileToggleBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      };
    }

    // 4. Botão: Voltar ao topo
    if (dom.guideBackToTopBtn) {
      dom.guideBackToTopBtn.onclick = () => {
        const target = document.getElementById('egide-terminal');
        if (target) {
          target.scrollIntoView({ behavior: state.reducedMotion ? 'auto' : 'smooth', block: 'start' });
        }
      };
    }

    // 5. Cliques nas etapas da barra lateral / lista
    if (dom.guideStickyNav) {
      dom.guideStickyNav.addEventListener('click', (e) => {
        const btn = e.target.closest('.station-nav-btn');
        if (!btn) return;
        const target = parseInt(btn.getAttribute('data-target'), 10);
        if (target) {
          selectStation(target);

          // Se estiver no mobile, fecha a lista após selecionar
          if (window.innerWidth < 1120 && dom.guideNavListWrap) {
            dom.guideNavListWrap.classList.remove('open');
            if (dom.guideMobileToggleBtn) dom.guideMobileToggleBtn.setAttribute('aria-expanded', 'false');
          }
        }
      });
    }
  }

  function initGuideScrollspy() {
    let scrollTimeout;
    window.addEventListener('scroll', () => {
      if (state.currentMode !== 'novato' || state.isNavigatingProgrammatically) return;

      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        const cards = document.querySelectorAll('.station-card');
        if (!cards.length) return;

        const readingLine = window.innerHeight * 0.35;
        let currentStep = 1;

        cards.forEach(card => {
          const rect = card.getBoundingClientRect();
          if (rect.top <= readingLine && rect.bottom >= readingLine) {
            currentStep = parseInt(card.getAttribute('data-station'), 10);
          }
        });

        if (currentStep !== state.activeGuideStep) {
          state.activeGuideStep = currentStep;

          // Atualiza sidebar sem rolagem forçada
          const pills = document.querySelectorAll('.station-nav-btn');
          pills.forEach(pill => {
            const t = parseInt(pill.getAttribute('data-target'), 10);
            const isActive = (t === currentStep);
            pill.classList.toggle('active', isActive);
            if (isActive) pill.setAttribute('aria-current', 'step');
            else pill.removeAttribute('aria-current');
          });

          // Atualiza borda do card
          cards.forEach(card => {
            const s = parseInt(card.getAttribute('data-station'), 10);
            card.classList.toggle('active', s === currentStep);
          });

          // Atualiza status mobile
          const currentData = TERMINAL_DATABASE.novatoGuide.find(st => st.step === currentStep);
          if (dom.guideMobileCurrentLabel && currentData) {
            dom.guideMobileCurrentLabel.textContent = `Etapa ${currentStep} de 6 · ${currentData.shortLabel}`;
          }

          suggestContextualTip(`etapa-${currentStep}`);
        }
      }, 50);
    }, { passive: true });
  }

  // ── Coreografia com GSAP ScrollTrigger & Acessibilidade ──
  function initGuideMotion() {
    if (typeof gsap === 'undefined') return;

    if (typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
    }

    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      // 1. Estabilização da Moldura de Microfilme do Banner
      const introFrame = document.querySelector('.novato-intro-banner .microfilm-frame');
      if (introFrame) {
        gsap.from(introFrame, {
          opacity: 0.3,
          scale: 0.98,
          duration: 0.65,
          ease: 'power2.out',
          clearProps: 'all'
        });
      }

      // 2. Traçado dos conectores SVG do Esquadrão ao entrar em visualização
      const squadSvg = document.querySelector('.squad-svg-canvas');
      if (squadSvg && typeof ScrollTrigger !== 'undefined') {
        const lines = squadSvg.querySelectorAll('.squad-con-line');
        lines.forEach(line => {
          gsap.fromTo(line, 
            { strokeDashoffset: 40, opacity: 0.3 },
            { 
              strokeDashoffset: 0, 
              opacity: 1, 
              duration: 0.8, 
              ease: 'power1.out',
              scrollTrigger: {
                trigger: squadSvg,
                start: 'top 80%',
                once: true
              }
            }
          );
        });
      }
    });
  }

  // ==========================================================================
  // SIMULADOR DIDÁTICO DE ROLAGENS (S03 / Seção 8.3)
  // Contagem de sucessos, dificuldade configurável e aviso oficial
  // ==========================================================================
  function initDiceSimulator() {
    const mount = document.getElementById('novato-dice-simulator-mount');
    if (!mount) return;

    let rolls = [8, 3, 6, 1, 9, 4, 7, 2, 10, 5];
    let difficulty = 5;
    let numDice = 10;
    let isRolling = false;

    function renderDice() {
      const successes = rolls.filter(r => r >= difficulty).length;
      const fails = rolls.length - successes;

      mount.innerHTML = `
        <div class="dice-sim-box">
          <div class="dice-sim-header">
            <div class="dice-sim-badge">EXEMPLO DIDÁTICO DE ROLAGEM</div>
            <span class="dice-sim-note">Demonstração local • Não substitui o bot no Discord</span>
          </div>

          <div class="dice-sim-formula">
            <span class="font-mono text-xs text-[#cfc7b4]">Comando de tentativa no Discord:</span>
            <code class="dice-cmd-badge">/roll ${numDice}d10 t${difficulty}</code>
          </div>

          <div class="dice-sim-controls">
            <div class="sim-ctrl-group">
              <label for="sim-dice-count">Quantidade de d10:</label>
              <select id="sim-dice-count" class="sim-select" aria-label="Quantidade de dados">
                <option value="6" ${numDice === 6 ? 'selected' : ''}>6 dados</option>
                <option value="8" ${numDice === 8 ? 'selected' : ''}>8 dados</option>
                <option value="10" ${numDice === 10 ? 'selected' : ''}>10 dados (Padrão)</option>
                <option value="12" ${numDice === 12 ? 'selected' : ''}>12 dados</option>
                <option value="15" ${numDice === 15 ? 'selected' : ''}>15 dados</option>
              </select>
            </div>
            <div class="sim-ctrl-group">
              <label for="sim-diff-target">Dificuldade (t):</label>
              <select id="sim-diff-target" class="sim-select" aria-label="Dificuldade da tentativa">
                <option value="4" ${difficulty === 4 ? 'selected' : ''}>Dificuldade 4 (Fácil)</option>
                <option value="5" ${difficulty === 5 ? 'selected' : ''}>Dificuldade 5 (Padrão)</option>
                <option value="6" ${difficulty === 6 ? 'selected' : ''}>Dificuldade 6 (Desafiador)</option>
                <option value="7" ${difficulty === 7 ? 'selected' : ''}>Dificuldade 7 (Extremo)</option>
              </select>
            </div>
          </div>

          <div class="dice-pill-grid" role="group" aria-label="Dados rolados">
            ${rolls.map((r, i) => `
              <div class="dice-pill ${r >= difficulty ? 'success' : 'fail'}" title="Dado ${i + 1}: valor ${r} (${r >= difficulty ? 'Sucesso' : 'Falha'})">
                <span class="dice-num">${r}</span>
                <span class="dice-tag">${r >= difficulty ? '✓' : '✗'}</span>
              </div>
            `).join('')}
          </div>

          <div class="dice-res-explanation" aria-live="polite">
            <div class="dice-count-line">
              ✦ <strong>Total de Sucessos (≥ ${difficulty}):</strong> <span class="highlight-gold">${successes}</span> | <strong>Falhas:</strong> ${fails}
            </div>
            <p class="dice-rule-quote">
              "Esta tentativa obteve <strong>${successes}</strong> ${successes === 1 ? 'sucesso' : 'sucessos'}. O resultado da ação depende da comparação com a defesa do adversário, conforme a regra completa."
            </p>
            <div class="dice-footer-disclaimer">
              Exemplo didático. Não registra uma rolagem oficial. Em disputas reais, o atacante precisa de mais sucessos que o defensor para acertar. Em empate, a tentativa falha. Críticos utilizam atributos próprios em etapa separada.
            </div>
          </div>

          <div class="dice-actions">
            <button id="sim-roll-btn" class="btn-gold px-5 py-2.5 rounded text-xs font-semibold inline-flex items-center gap-2" ${isRolling ? 'disabled' : ''}>
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="8" cy="8" r="1.5" fill="currentColor"/><circle cx="16" cy="16" r="1.5" fill="currentColor"/><circle cx="12" cy="12" r="1.5" fill="currentColor"/></svg>
              <span>${isRolling ? 'Rolando dados...' : 'Rolar Dados Novamente'}</span>
            </button>
            <a href="?mode=arquivo&doc=rolagem-e-tentativa" class="station-direct-link text-xs">
              <span>Ler Regra Completa de Rolagens</span> →
            </a>
          </div>
        </div>
      `;

      const rollBtn = mount.querySelector('#sim-roll-btn');
      if (rollBtn) {
        rollBtn.onclick = () => {
          if (isRolling) return;
          isRolling = true;
          rollBtn.disabled = true;

          // Feedback visual de rolagem de 280ms
          const pills = mount.querySelectorAll('.dice-pill');
          pills.forEach(p => p.style.opacity = '0.45');

          setTimeout(() => {
            rolls = Array.from({ length: numDice }, () => Math.floor(Math.random() * 10) + 1);
            isRolling = false;
            renderDice();
          }, state.reducedMotion ? 40 : 280);
        };
      }

      const diceSelect = mount.querySelector('#sim-dice-count');
      if (diceSelect) {
        diceSelect.onchange = (e) => {
          numDice = parseInt(e.target.value, 10);
          rolls = Array.from({ length: numDice }, () => Math.floor(Math.random() * 10) + 1);
          renderDice();
        };
      }

      const diffSelect = mount.querySelector('#sim-diff-target');
      if (diffSelect) {
        diffSelect.onchange = (e) => {
          difficulty = parseInt(e.target.value, 10);
          renderDice();
        };
      }
    }

    renderDice();
  }

  // ==========================================================================
  // ARQUIVO GERAL DE REGRAS (S07 / Seção 7)
  // 9 categorias, 18 documentos, links nativos <a href>, leitor com TOC
  // ==========================================================================
  function renderCategoriesList() {
    if (!dom.categoriesList || !TERMINAL_DATABASE.categories) return;

    dom.categoriesList.innerHTML = TERMINAL_DATABASE.categories.map(c => {
      const docs = TERMINAL_DATABASE.documents.filter(d => d.categoryId === c.id);
      const isCatActive = c.id === state.currentCategory;
      const isExpanded = isCatActive;

      return `
        <li class="sidebar-category-group ${isCatActive ? 'active-group' : ''}" data-cat-id="${c.id}">
          <div class="sidebar-cat-row">
            <a href="?mode=arquivo&cat=${c.id}" class="sidebar-cat-btn ${isCatActive && !state.currentDoc ? 'active' : ''}" data-cat-id="${c.id}" role="button">
              <span class="sidebar-cat-icon">${ICONS[c.svgIcon] || ICONS.index}</span>
              <span class="sidebar-cat-label">${c.name}</span>
            </a>
            <button class="sidebar-cat-expander" type="button" data-cat-id="${c.id}" aria-label="Alternar subtópicos de ${c.name}" aria-expanded="${isExpanded ? 'true' : 'false'}" title="Expandir/recolher tópicos deste tema">
              <span class="sidebar-cat-chevron ${isExpanded ? 'rotated' : ''}">▾</span>
            </button>
          </div>
          <ul class="sidebar-subtopics-list ${isExpanded ? 'expanded' : ''}" id="subtopics-${c.id}" role="list">
            ${docs.map(doc => {
              const isDocActive = doc.id === state.currentDoc;
              return `
                <li class="sidebar-subtopic-item">
                  <a href="?mode=arquivo&doc=${doc.id}" class="sidebar-subtopic-link ${isDocActive ? 'active' : ''}" data-doc-id="${doc.id}">
                    <span class="subtopic-dot" aria-hidden="true">•</span>
                    <span class="subtopic-text">${escapeHtml(doc.title)}</span>
                  </a>
                </li>
              `;
            }).join('')}
          </ul>
        </li>
      `;
    }).join('');
  }

  function selectCategory(catId, updateHistory = true) {
    const cat = TERMINAL_DATABASE.categories.find(c => c.id === catId);
    if (!cat) return;

    state.currentCategory = catId;
    state.currentDoc = null;

    document.querySelectorAll('.sidebar-category-group').forEach(grp => {
      const isMatch = grp.getAttribute('data-cat-id') === catId;
      grp.classList.toggle('active-group', isMatch);
      const sublist = grp.querySelector('.sidebar-subtopics-list');
      const expander = grp.querySelector('.sidebar-cat-expander');
      const chevron = grp.querySelector('.sidebar-cat-chevron');
      if (sublist) sublist.classList.toggle('expanded', isMatch);
      if (expander) expander.setAttribute('aria-expanded', isMatch ? 'true' : 'false');
      if (chevron) chevron.classList.toggle('rotated', isMatch);

      const catBtn = grp.querySelector('.sidebar-cat-btn');
      if (catBtn) catBtn.classList.toggle('active', isMatch);
      grp.querySelectorAll('.sidebar-subtopic-link').forEach(link => link.classList.remove('active'));
    });

    if (dom.catCodeTag) dom.catCodeTag.textContent = cat.code;
    if (dom.catNameTitle) dom.catNameTitle.textContent = cat.name;
    if (dom.catDescText) dom.catDescText.textContent = cat.desc;

    const docs = TERMINAL_DATABASE.documents.filter(d => d.categoryId === catId);
    if (dom.categoryDocCards) {
      dom.categoryDocCards.innerHTML = docs.map(doc => `
        <a href="?mode=arquivo&doc=${doc.id}" class="doc-row-card" data-doc-id="${doc.id}">
          <div class="doc-card-body">
            <h3 class="doc-row-title">${doc.title}</h3>
            <p class="doc-row-summary">${doc.summary}</p>
            <div class="doc-row-source">Fonte: ${doc.source}</div>
          </div>
          <span class="doc-row-action" aria-hidden="true">Abrir regra →</span>
        </a>
      `).join('');
    }

    if (dom.docReader) dom.docReader.style.display = 'none';
    if (dom.categoryView) dom.categoryView.style.display = 'block';
    if (dom.searchResults) dom.searchResults.style.display = 'none';

    if (updateHistory) {
      const newUrl = `${window.location.pathname}?mode=arquivo&cat=${catId}`;
      window.history.pushState({ mode: 'arquivo', catId }, '', newUrl);
    }

    suggestContextualTip(`cat-${catId}`);
  }

  function openDocument(docId, subtopicHash = '', updateHistory = true) {
    const doc = TERMINAL_DATABASE.documents.find(d => d.id === docId);
    if (!doc) {
      console.warn(`[Terminal] Documento "${docId}" não encontrado.`);
      if (dom.docReader && dom.readerDocContent) {
        dom.docReader.style.display = 'block';
        dom.readerDocTitle.textContent = 'Regra não encontrada';
        dom.readerDocContent.innerHTML = `
          <div class="doc-callout warning">
            <p>O registro solicitado não foi localizado no acervo.</p>
            <p><a href="?mode=arquivo" class="station-direct-link">Voltar ao índice de diretórios →</a></p>
          </div>
        `;
      }
      return;
    }

    state.currentDoc = docId;
    state.currentCategory = doc.categoryId;

    if (state.currentMode !== 'arquivo') {
      state.currentMode = 'arquivo';
      dom.modeBtnNovato.classList.remove('active');
      dom.modeBtnNovato.setAttribute('aria-selected', 'false');
      dom.modeBtnArquivo.classList.add('active');
      dom.modeBtnArquivo.setAttribute('aria-selected', 'true');
      dom.novatoView.style.display = 'none';
      dom.archiveView.style.display = 'block';
    }

    const cat = TERMINAL_DATABASE.categories.find(c => c.id === doc.categoryId);

    // Atualiza sidebar: grupo ativo, submenu aberto e link do doc ativo
    document.querySelectorAll('.sidebar-category-group').forEach(grp => {
      const isMatch = grp.getAttribute('data-cat-id') === doc.categoryId;
      grp.classList.toggle('active-group', isMatch);
      const sublist = grp.querySelector('.sidebar-subtopics-list');
      const expander = grp.querySelector('.sidebar-cat-expander');
      const chevron = grp.querySelector('.sidebar-cat-chevron');
      if (sublist) sublist.classList.toggle('expanded', isMatch);
      if (expander) expander.setAttribute('aria-expanded', isMatch ? 'true' : 'false');
      if (chevron) chevron.classList.toggle('rotated', isMatch);

      const catBtn = grp.querySelector('.sidebar-cat-btn');
      if (catBtn) catBtn.classList.remove('active');

      grp.querySelectorAll('.sidebar-subtopic-link').forEach(link => {
        link.classList.toggle('active', link.getAttribute('data-doc-id') === docId);
      });
    });

    if (dom.readerBreadcrumbLink) {
      dom.readerBreadcrumbLink.textContent = `← Voltar a: ${cat ? cat.name : 'Diretório'}`;
      dom.readerBreadcrumbLink.href = `?mode=arquivo&cat=${doc.categoryId}`;
    }
    if (dom.readerBreadcrumbCurrent) {
      dom.readerBreadcrumbCurrent.textContent = ` / ${doc.title}`;
    }

    if (dom.readerDocTitle) dom.readerDocTitle.textContent = doc.title;
    if (dom.readerDocSubtitle) dom.readerDocSubtitle.textContent = doc.subtitle || '';
    if (dom.readerDocSource) dom.readerDocSource.textContent = `Fonte: ${doc.source}`;
    if (dom.readerDocContent) dom.readerDocContent.innerHTML = doc.contentHtml;

    // Gerar índice de subtópicos a partir dos <h3> da regra
    buildSubtopicsToc(doc);

    // Gerar navegação sequencial (← Tópico Anterior / Próximo Tópico →)
    renderLinearNav(doc);

    if (dom.categoryView) dom.categoryView.style.display = 'none';
    if (dom.searchResults) dom.searchResults.style.display = 'none';
    if (dom.docReader) {
      dom.docReader.style.display = 'block';
      dom.docReader.focus();
    }

    if (updateHistory) {
      const hashStr = subtopicHash ? `#${subtopicHash}` : '';
      const newUrl = `${window.location.pathname}?mode=arquivo&doc=${docId}${hashStr}`;
      window.history.pushState({ mode: 'arquivo', docId, subtopicHash }, '', newUrl);
    }

    if (subtopicHash) {
      const targetHeading = document.getElementById(subtopicHash);
      if (targetHeading) {
        targetHeading.scrollIntoView({ behavior: state.reducedMotion ? 'auto' : 'smooth', block: 'start' });
      }
    } else {
      if (dom.docReader) {
        dom.docReader.scrollIntoView({ behavior: state.reducedMotion ? 'auto' : 'smooth', block: 'start' });
      }
    }

    suggestContextualTip(`doc-${docId}`);
  }

  function renderLinearNav(doc) {
    if (!dom.docReader) return;

    let linearNav = dom.docReader.querySelector('.reader-linear-nav');
    if (!linearNav) {
      linearNav = document.createElement('nav');
      linearNav.className = 'reader-linear-nav';
      linearNav.setAttribute('aria-label', 'Navegação Linear de Tópicos');
      dom.docReader.appendChild(linearNav);
    }

    const docIndex = TERMINAL_DATABASE.documents.findIndex(d => d.id === doc.id);
    const prevDoc = docIndex > 0 ? TERMINAL_DATABASE.documents[docIndex - 1] : null;
    const nextDoc = docIndex < TERMINAL_DATABASE.documents.length - 1 ? TERMINAL_DATABASE.documents[docIndex + 1] : null;

    linearNav.innerHTML = `
      <div class="linear-nav-inner">
        ${prevDoc ? `
          <a href="?mode=arquivo&doc=${prevDoc.id}" class="linear-nav-btn prev" data-goto-doc="${prevDoc.id}">
            <span class="linear-nav-sub">← TÓPICO ANTERIOR</span>
            <span class="linear-nav-title">${escapeHtml(prevDoc.title)}</span>
          </a>
        ` : `<div class="linear-nav-placeholder"></div>`}

        ${nextDoc ? `
          <a href="?mode=arquivo&doc=${nextDoc.id}" class="linear-nav-btn next" data-goto-doc="${nextDoc.id}">
            <span class="linear-nav-sub">PRÓXIMO TÓPICO →</span>
            <span class="linear-nav-title">${escapeHtml(nextDoc.title)}</span>
          </a>
        ` : `
          <a href="?mode=novato" class="linear-nav-btn next finish" data-action="return-novato">
            <span class="linear-nav-sub">FIM DO ACERVO // CONCLUÍDO</span>
            <span class="linear-nav-title">Retornar ao Começar a Jogar ↗</span>
          </a>
        `}
      </div>
    `;

    linearNav.querySelectorAll('.linear-nav-btn').forEach(btn => {
      btn.onclick = (e) => {
        const gotoDoc = btn.getAttribute('data-goto-doc');
        if (gotoDoc) {
          e.preventDefault();
          openDocument(gotoDoc, '', true);
        } else if (btn.getAttribute('data-action') === 'return-novato') {
          e.preventDefault();
          switchMode('novato', true);
        }
      };
    });
  }

  function buildSubtopicsToc(doc) {
    if (!dom.readerToc || !dom.readerTocList) return;
    const headings = dom.readerDocContent.querySelectorAll('h3');

    if (headings.length < 2) {
      dom.readerToc.style.display = 'none';
      return;
    }

    dom.readerTocList.innerHTML = '';
    headings.forEach((h, index) => {
      let slug = h.id;
      if (!slug) {
        slug = normalizeText(h.textContent).replace(/\\s+/g, '-').slice(0, 40) || `sec-${index + 1}`;
        h.id = slug;
      }

      const link = document.createElement('a');
      link.href = `#${slug}`;
      link.className = 'toc-subtopic-link';
      link.textContent = h.textContent;
      link.onclick = (e) => {
        e.preventDefault();
        h.scrollIntoView({ behavior: state.reducedMotion ? 'auto' : 'smooth', block: 'start' });
        window.history.replaceState(null, '', `${window.location.pathname}?mode=arquivo&doc=${doc.id}#${slug}`);
      };
      dom.readerTocList.appendChild(link);
    });

    dom.readerToc.style.display = 'block';
  }

  function closeDocumentToCategory() {
    selectCategory(state.currentCategory, true);
  }

  // ==========================================================================
  // BUSCA LEXICAL ROBUSTA & SEGURA (S08 / Seção 9)
  // Sem tags HTML, acentos normalizados, trechos com <mark>, paginação
  // ==========================================================================
  function stripHtml(html) {
    if (!html) return '';
    return html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
  }

  function normalizeText(str) {
    if (!str) return '';
    return str
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function escapeHtml(str) {
    if (!str) return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function extractHighlightedSnippet(plainText, queryWords, maxLen = 130) {
    if (!plainText) return '';
    const normText = normalizeText(plainText);
    let bestPos = -1;

    for (const w of queryWords) {
      if (w.length < 2) continue;
      const pos = normText.indexOf(w);
      if (pos !== -1 && (bestPos === -1 || pos < bestPos)) {
        bestPos = pos;
      }
    }

    if (bestPos === -1) {
      const excerpt = plainText.slice(0, maxLen);
      return escapeHtml(excerpt) + (plainText.length > maxLen ? '…' : '');
    }

    const start = Math.max(0, bestPos - 35);
    const end = Math.min(plainText.length, bestPos + maxLen - 35);
    const slice = plainText.slice(start, end);
    let result = (start > 0 ? '… ' : '') + escapeHtml(slice) + (end < plainText.length ? ' …' : '');

    // Destacar com <mark>
    queryWords.forEach(w => {
      if (w.length < 2) return;
      const reg = new RegExp(`(${w})`, 'gi');
      result = result.replace(reg, '<mark>$1</mark>');
    });

    return result;
  }

  function executeSearch(query) {
    const rawTrimmed = (query || '').trim();
    const cleanNorm = normalizeText(rawTrimmed);
    state.searchQuery = cleanNorm;
    state.searchResultsPage = 1;

    if (!cleanNorm) {
      dom.searchResults.style.display = 'none';
      if (state.currentMode === 'novato') {
        dom.novatoView.style.display = 'block';
        dom.archiveView.style.display = 'none';
      } else {
        if (state.currentDoc) {
          dom.docReader.style.display = 'block';
          dom.categoryView.style.display = 'none';
        } else {
          dom.categoryView.style.display = 'block';
          dom.docReader.style.display = 'none';
        }
      }
      return;
    }

    const queryTokens = cleanNorm.split(' ').filter(t => t.length > 0);
    const results = [];

    TERMINAL_DATABASE.documents.forEach(doc => {
      const normTitle = normalizeText(doc.title);
      const normSubtitle = normalizeText(doc.subtitle);
      const normSummary = normalizeText(doc.summary);
      const normAliases = (doc.aliases || []).map(a => normalizeText(a)).join(' ');
      const plainBody = stripHtml(doc.contentHtml);
      const normBody = normalizeText(plainBody);

      let score = 0;
      let matchedIn = 'conteúdo';

      // Correspondência exata da frase
      if (normTitle.includes(cleanNorm)) { score += 100; matchedIn = 'título'; }
      else if (normAliases.includes(cleanNorm)) { score += 70; matchedIn = 'aliases'; }
      else if (normSummary.includes(cleanNorm)) { score += 40; matchedIn = 'resumo'; }
      else if (normBody.includes(cleanNorm)) { score += 20; matchedIn = 'texto'; }

      // Correspondência por tokens (múltiplas palavras)
      let tokensMatched = 0;
      queryTokens.forEach(token => {
        if (normTitle.includes(token)) { score += 25; tokensMatched++; }
        else if (normAliases.includes(token)) { score += 18; tokensMatched++; }
        else if (normSubtitle.includes(token)) { score += 12; tokensMatched++; }
        else if (normSummary.includes(token)) { score += 10; tokensMatched++; }
        else if (normBody.includes(token)) { score += 5; tokensMatched++; }
      });

      if (tokensMatched === queryTokens.length) score += 30; // Bônus por todos os termos encontrados

      if (score > 0) {
        const cat = TERMINAL_DATABASE.categories.find(c => c.id === doc.categoryId);
        const snippetSource = normBody.includes(cleanNorm) || tokensMatched > 0 ? plainBody : doc.summary;
        const snippet = extractHighlightedSnippet(snippetSource, queryTokens);

        results.push({
          doc,
          catName: cat ? cat.name : 'Arquivo Geral',
          score,
          snippet
        });
      }
    });

    results.sort((a, b) => b.score - a.score);
    state.searchResultsList = results;

    // Atualizar UI de busca
    dom.novatoView.style.display = 'none';
    dom.archiveView.style.display = 'block';
    dom.categoryView.style.display = 'none';
    dom.docReader.style.display = 'none';
    dom.searchResults.style.display = 'block';

    renderSearchResultsPage();

    const newUrl = `${window.location.pathname}?q=${encodeURIComponent(rawTrimmed)}`;
    window.history.replaceState({ query: rawTrimmed }, '', newUrl);

    if (results.length === 0) {
      suggestContextualTip('busca-vazia');
    }
  }

  function renderSearchResultsPage() {
    const results = state.searchResultsList;
    const total = results.length;
    dom.searchResultsCount.textContent = `${total} resultado(s) encontrado(s) para "${dom.searchInput.value}"`;

    if (total === 0) {
      dom.searchResultsList.innerHTML = `
        <div class="search-empty-state">
          <p>Nenhum resultado para "<strong>${escapeHtml(dom.searchInput.value)}</strong>".</p>
          <p class="search-empty-sub">Tente buscar por termos como <em>primeira ficha</em>, <em>XP</em>, <em>dano</em>, <em>combate</em>, <em>moedas</em> ou escolha uma categoria abaixo.</p>
        </div>
      `;
      dom.searchPaginationWrap.style.display = 'none';
      return;
    }

    const visibleItems = results.slice(0, state.searchVisibleLimit);
    dom.searchResultsList.innerHTML = visibleItems.map(({ doc, catName, snippet }) => `
      <a href="?mode=arquivo&doc=${doc.id}" class="search-result-row" data-doc-id="${doc.id}">
        <div class="search-result-cat">${escapeHtml(catName)}</div>
        <h3 class="search-result-title">${escapeHtml(doc.title)}</h3>
        <p class="search-result-snippet">${snippet}</p>
        <span class="search-result-action">Abrir regra completa →</span>
      </a>
    `).join('');

    // Cliques nos resultados
    dom.searchResultsList.querySelectorAll('.search-result-row').forEach(row => {
      row.onclick = (e) => {
        e.preventDefault();
        const docId = row.getAttribute('data-doc-id');
        openDocument(docId, '', true);
      };
    });

    if (total > state.searchVisibleLimit) {
      dom.searchPaginationWrap.style.display = 'block';
      dom.searchShowMoreBtn.textContent = `Mostrar mais resultados (${state.searchVisibleLimit} de ${total})`;
    } else {
      dom.searchPaginationWrap.style.display = 'none';
    }
  }

  // ==========================================================================
  // COMPANION DA PRESENÇA APRISIONADA (S06, S10, S11 / Seção 10)
  // Balão de orientação contextual, rotatividade de dicas e modal de ajuda
  // ==========================================================================
  function initPresenceControls() {
    // Restaurar estado recolhido do localStorage
    try {
      const savedCollapsed = localStorage.getItem('neotheon_presence_collapsed');
      if (savedCollapsed === 'true') {
        state.presenceCollapsed = true;
        if (dom.presenceDock) dom.presenceDock.classList.add('collapsed');
      }
    } catch (_) {}

    // Botão de minimizar/expandir
    if (dom.presenceToggleBtn) {
      dom.presenceToggleBtn.onclick = () => {
        state.presenceCollapsed = !state.presenceCollapsed;
        dom.presenceDock.classList.toggle('collapsed', state.presenceCollapsed);
        try {
          localStorage.setItem('neotheon_presence_collapsed', state.presenceCollapsed ? 'true' : 'false');
        } catch (_) {}
      };
    }

    // Navegação de dicas no balão
    if (dom.presencePrevBtn) {
      dom.presencePrevBtn.onclick = () => cyclePresenceTip(-1);
    }
    if (dom.presenceNextBtn) {
      dom.presenceNextBtn.onclick = () => cyclePresenceTip(1);
    }
    if (dom.presenceCloseBubbleBtn) {
      dom.presenceCloseBubbleBtn.onclick = () => {
        dom.presenceSpeechBubble.style.display = 'none';
      };
    }

    // Hover / Fixação do Balão com o Cursor ("Para fixar uma mensagem, passe o cursor sobre ela")
    if (dom.presenceSpeechBubble) {
      dom.presenceSpeechBubble.addEventListener('mouseenter', () => {
        state.isBubblePinned = true;
        dom.presenceSpeechBubble.classList.add('pinned');
        clearTimeout(state.bubbleAutoHideTimer);
        const pinText = dom.presenceSpeechBubble.querySelector('.pin-hint-text');
        if (pinText) pinText.textContent = 'Mensagem fixada (cursor sobre o balão)';
      });

      dom.presenceSpeechBubble.addEventListener('mouseleave', () => {
        state.isBubblePinned = false;
        dom.presenceSpeechBubble.classList.remove('pinned');
        const pinText = dom.presenceSpeechBubble.querySelector('.pin-hint-text');
        if (pinText) pinText.textContent = 'Para fixar uma mensagem, passe o cursor sobre ela';
        
        clearTimeout(state.bubbleAutoHideTimer);
        state.bubbleAutoHideTimer = setTimeout(() => {
          if (!state.isBubblePinned && dom.presenceSpeechBubble) {
            dom.presenceSpeechBubble.style.display = 'none';
          }
        }, 8000);
      });
    }

    // Clique no mascote abre a Ajuda da Presença
    if (dom.presenceCanvasCard) {
      dom.presenceCanvasCard.onclick = () => openPresenceModal();
      dom.presenceCanvasCard.onkeydown = (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openPresenceModal();
        }
      };
    }

    updatePresenceBubble(0);
  }

  function updatePresenceBubble(idx) {
    const tips = TERMINAL_DATABASE.presenceTips || [];
    if (tips.length === 0) return;

    state.presenceTipIdx = ((idx % tips.length) + tips.length) % tips.length;
    const tip = tips[state.presenceTipIdx];

    if (dom.presenceBubbleQuote) dom.presenceBubbleQuote.textContent = `"${tip.quote}"`;
    if (dom.presenceBubbleNote) dom.presenceBubbleNote.textContent = tip.note;
    if (dom.presenceTipCounter) dom.presenceTipCounter.textContent = `${state.presenceTipIdx + 1} / ${tips.length}`;
  }

  function cyclePresenceTip(delta) {
    updatePresenceBubble(state.presenceTipIdx + delta);
  }

  function suggestContextualTip(contextKey) {
    const now = Date.now();
    // Cooldown mínimo de 45 segundos entre falas automáticas e evitar repetição contínua
    if (now - state.lastAutoCommentTime < 45000) return;
    if (state.lastAutoCommentContext === contextKey) return;
    if (state.presenceCollapsed) return;

    state.lastAutoCommentTime = now;
    state.lastAutoCommentContext = contextKey;

    let matchedIdx = -1;
    const tips = TERMINAL_DATABASE.presenceTips || [];

    if (contextKey.includes('etapa-5') || contextKey.includes('rolagem')) {
      matchedIdx = tips.findIndex(t => t.docId === 'rolagem-e-tentativa');
    } else if (contextKey.includes('etapa-1') || contextKey.includes('papeis')) {
      matchedIdx = tips.findIndex(t => t.docId === 'papeis-taticos');
    } else if (contextKey.includes('etapa-3') || contextKey.includes('ficha')) {
      matchedIdx = tips.findIndex(t => t.docId === 'pedido-ficha-oficial');
    } else if (contextKey.includes('busca-vazia')) {
      matchedIdx = 2; // Dica de ajuda geral
    }

    if (matchedIdx !== -1) {
      updatePresenceBubble(matchedIdx);
      if (dom.presenceSpeechBubble) {
        dom.presenceSpeechBubble.style.display = 'block';
        clearTimeout(state.bubbleAutoHideTimer);
        state.bubbleAutoHideTimer = setTimeout(() => {
          if (!state.isBubblePinned && dom.presenceSpeechBubble) {
            dom.presenceSpeechBubble.style.display = 'none';
          }
        }, 14000);
      }
    }
  }

  // ==========================================================================
  // MODAL DA PRESENÇA APRISIONADA (S10 / Seção 15)
  // Diálogo acessível, focus trap, tecla Escape e retorno de foco
  // ==========================================================================
  function renderPresenceFaqs() {
    if (!dom.presenceFaqGrid || !TERMINAL_DATABASE.presenceFaqs) return;

    dom.presenceFaqGrid.innerHTML = TERMINAL_DATABASE.presenceFaqs.map(faq => `
      <button class="presence-faq-chip" data-faq-id="${faq.id}">
        <span class="faq-chip-q">${escapeHtml(faq.question)}</span>
        <span class="faq-chip-cat">${escapeHtml(faq.category)}</span>
      </button>
    `).join('');
  }

  function openPresenceModal() {
    state.isPresenceOpen = true;
    dom.presenceBackdrop.style.display = 'flex';
    dom.presenceBackdrop.classList.add('open');
    dom.closePresenceBtn.focus();
  }

  function closePresenceModal() {
    state.isPresenceOpen = false;
    dom.presenceBackdrop.style.display = 'none';
    dom.presenceBackdrop.classList.remove('open');
    if (dom.openPresenceBtn) dom.openPresenceBtn.focus();
  }

  function selectPresenceFaq(faqId) {
    const faq = TERMINAL_DATABASE.presenceFaqs.find(f => f.id === faqId);
    if (!faq) return;

    dom.presenceResponseQ.textContent = faq.question;
    dom.presenceResponseA.textContent = faq.answer;
    dom.presenceDocShortcut.href = `?mode=arquivo&doc=${faq.docId}`;
    dom.presenceDocShortcut.onclick = (e) => {
      e.preventDefault();
      closePresenceModal();
      openDocument(faq.docId, '', true);
    };

    dom.presenceResponseBox.style.display = 'block';
  }

  // ==========================================================================
  // RENDERIZAÇÃO THREE.JS DA PRESENÇA (S01, S06, S11 / Seção 10 & 11)
  // Cena única, isolada em try/catch, com fallback SVG automático se falhar
  // ==========================================================================
  function initPresence3D() {
    if (!dom.presenceCanvas) return;

    try {
      if (typeof THREE === 'undefined') {
        throw new Error('Three.js não carregado.');
      }

      const canvas = dom.presenceCanvas;
      const width = 110;
      const height = 130;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
      camera.position.set(0, 0.3, 3.2);

      const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true,
        antialias: true
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));

      // Iluminação Mística
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
      scene.add(ambientLight);

      const goldLight = new THREE.PointLight(0xf1d27a, 2.2, 8);
      goldLight.position.set(1.5, 2, 2);
      scene.add(goldLight);

      const crimsonRim = new THREE.PointLight(0xc82924, 1.8, 6);
      crimsonRim.position.set(-1.5, -1, 1);
      scene.add(crimsonRim);

      // Modelo Procedural da Presença (Núcleo Místico + Anéis Áureos + Vassoura da Égide)
      const group = new THREE.Group();

      // Orbe Central Negro Estígio
      const orbGeo = new THREE.SphereGeometry(0.42, 24, 24);
      const orbMat = new THREE.MeshStandardMaterial({
        color: 0x050608,
        metalness: 0.85,
        roughness: 0.2,
        emissive: 0x221a08
      });
      const orb = new THREE.Mesh(orbGeo, orbMat);
      group.add(orb);

      // Anéis Dourados Orbitais
      const ringGeo1 = new THREE.TorusGeometry(0.68, 0.024, 12, 48);
      const ringMat1 = new THREE.MeshStandardMaterial({ color: 0xf1d27a, metalness: 0.9, roughness: 0.3 });
      const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
      ring1.rotation.x = Math.PI / 3;
      group.add(ring1);

      const ringGeo2 = new THREE.TorusGeometry(0.78, 0.018, 12, 48);
      const ringMat2 = new THREE.MeshStandardMaterial({ color: 0xd4af37, metalness: 0.8, roughness: 0.4 });
      const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
      ring2.rotation.y = Math.PI / 4;
      group.add(ring2);

      // A Vassoura Mística da Égide (Haste e cerdas estilizadas)
      const broomGroup = new THREE.Group();
      broomGroup.name = 'broom';
      
      const handleGeo = new THREE.CylinderGeometry(0.02, 0.02, 1.3, 10);
      const handleMat = new THREE.MeshStandardMaterial({ color: 0x8c6a2b, roughness: 0.6 });
      const handle = new THREE.Mesh(handleGeo, handleMat);
      handle.position.set(0, 0, 0);
      broomGroup.add(handle);

      const brushGeo = new THREE.ConeGeometry(0.14, 0.35, 12);
      const brushMat = new THREE.MeshStandardMaterial({ color: 0xd4af37, roughness: 0.7 });
      const brush = new THREE.Mesh(brushGeo, brushMat);
      brush.position.set(0, -0.65, 0);
      brush.rotation.x = Math.PI;
      broomGroup.add(brush);

      broomGroup.position.set(0.45, -0.1, 0.2);
      broomGroup.rotation.z = -0.35;
      group.add(broomGroup);

      // Partículas de Poeira Mística da Faxina
      const pCount = 35;
      const pGeo = new THREE.BufferGeometry();
      const pPos = new Float32Array(pCount * 3);
      for (let i = 0; i < pCount * 3; i += 3) {
        pPos[i] = (Math.random() - 0.5) * 1.5;
        pPos[i + 1] = (Math.random() - 0.5) * 1.2 - 0.2;
        pPos[i + 2] = (Math.random() - 0.5) * 1.0;
      }
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
      const pMat = new THREE.PointsMaterial({ color: 0xf1d27a, size: 0.04, transparent: true, opacity: 0.65 });
      const particles = new THREE.Points(pGeo, pMat);
      group.add(particles);

      scene.add(group);

      state.threeEngine = {
        renderer,
        scene,
        camera,
        mesh: group,
        broom: broomGroup,
        ring1,
        ring2,
        particles,
        clock: new THREE.Clock(),
        isRunning: true
      };

      // Loop de Animação Unificado com Acessibilidade e Gestão de Ciclo de Vida
      animatePresence();

      // Tratamento gracioso para perda de contexto WebGL
      canvas.addEventListener('webglcontextlost', (e) => {
        e.preventDefault();
        console.warn('[Terminal] Contexto WebGL perdido. Alternando para representação SVG segura.');
        state.threeEngine.isRunning = false;
        canvas.style.display = 'none';
        if (dom.presenceFallback) dom.presenceFallback.style.display = 'block';
      }, false);

    } catch (err) {
      console.warn('[Terminal da Égide] WebGL indisponível ou bloqueado. Ativando fallback SVG:', err.message);
      if (dom.presenceCanvas) dom.presenceCanvas.style.display = 'none';
      if (dom.presenceFallback) dom.presenceFallback.style.display = 'block';
    }
  }

  // Atualização unificada dos nós 3D da Presença (levitação, anéis, vassoura e partículas)
  function updatePresenceScene(time) {
    if (!state.threeEngine || !state.threeEngine.mesh) return;
    if (!state.reducedMotion && !document.hidden && !state.presenceCollapsed) {
      // Levitação suave
      state.threeEngine.mesh.position.y = Math.sin(time * 1.4) * 0.07;
      state.threeEngine.mesh.position.x = Math.cos(time * 0.9) * 0.03;

      // Rotação dos anéis orbitais
      if (state.threeEngine.ring1) state.threeEngine.ring1.rotation.z = time * 0.45;
      if (state.threeEngine.ring2) state.threeEngine.ring2.rotation.x = time * 0.35;

      // Gesto de varredura com a vassoura mística
      if (state.threeEngine.broom) state.threeEngine.broom.rotation.z = -0.35 + Math.sin(time * 2.2) * 0.12;

      // Rotação suave das partículas de poeira
      if (state.threeEngine.particles) state.threeEngine.particles.rotation.y = time * 0.2;
    }
  }

  function animatePresence() {
    if (!state.threeEngine || !state.threeEngine.isRunning) return;

    if (state.reducedMotion) {
      // Com preferência por redução de movimento, renderiza frame estático sem loop contínuo
      updatePresenceScene(0);
      state.threeEngine.renderer.render(state.threeEngine.scene, state.threeEngine.camera);
      return;
    }

    state.threeEngine.animId = requestAnimationFrame(animatePresence);
    const time = state.threeEngine.clock.getElapsedTime();
    updatePresenceScene(time);
    state.threeEngine.renderer.render(state.threeEngine.scene, state.threeEngine.camera);
  }

  function initReducedMotionListener() {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    mq.addEventListener('change', (e) => {
      state.reducedMotion = e.matches;
      if (state.threeEngine && state.threeEngine.renderer) {
        if (state.reducedMotion) {
          if (state.threeEngine.animId) cancelAnimationFrame(state.threeEngine.animId);
          if (state.threeEngine.mesh) state.threeEngine.mesh.position.set(0, 0, 0);
          state.threeEngine.renderer.render(state.threeEngine.scene, state.threeEngine.camera);
        } else {
          state.threeEngine.isRunning = true;
          state.threeEngine.clock.start();
          animatePresence();
        }
      }
    });
  }

  function initVisibilityObserver() {
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        if (state.threeEngine && state.threeEngine.isRunning) {
          state.threeEngine.isRunning = false;
          if (state.threeEngine.animId) cancelAnimationFrame(state.threeEngine.animId);
        }
      } else {
        if (state.threeEngine && !state.threeEngine.isRunning && state.threeEngine.renderer) {
          state.threeEngine.isRunning = true;
          state.threeEngine.clock.start();
          animatePresence();
        }
      }
    });
  }

  // ==========================================================================
  // EVENTOS E NAVEGAÇÃO GERAL (S09, S13, S15, S16)
  // ==========================================================================
  function switchMode(mode, updateHistory = true) {
    state.currentMode = mode;

    if (mode === 'novato') {
      dom.modeBtnNovato.classList.add('active');
      dom.modeBtnNovato.setAttribute('aria-selected', 'true');
      dom.modeBtnArquivo.classList.remove('active');
      dom.modeBtnArquivo.setAttribute('aria-selected', 'false');

      dom.novatoView.style.display = 'block';
      dom.archiveView.style.display = 'none';
      dom.searchResults.style.display = 'none';

      if (typeof ScrollTrigger !== 'undefined') {
        setTimeout(() => ScrollTrigger.refresh(), 80);
      }
    } else {
      dom.modeBtnNovato.classList.remove('active');
      dom.modeBtnNovato.setAttribute('aria-selected', 'false');
      dom.modeBtnArquivo.classList.add('active');
      dom.modeBtnArquivo.setAttribute('aria-selected', 'true');

      dom.novatoView.style.display = 'none';
      dom.archiveView.style.display = 'block';

      if (state.currentDoc) {
        openDocument(state.currentDoc, '', false);
      } else {
        selectCategory(state.currentCategory, false);
      }
    }

    if (updateHistory) {
      const newUrl = `${window.location.pathname}?mode=${mode}`;
      window.history.pushState({ mode }, '', newUrl);
    }
  }

  function bindEvents() {
    // Alternador de modo
    dom.modeBtnNovato.onclick = () => switchMode('novato', true);
    dom.modeBtnArquivo.onclick = () => switchMode('arquivo', true);

    // Sidebar de categorias e subtópicos dinâmicos
    dom.categoriesList.onclick = (e) => {
      // 1. Clique no botão de expandir/recolher subtópicos (chevron)
      const expander = e.target.closest('.sidebar-cat-expander');
      if (expander) {
        e.preventDefault();
        e.stopPropagation();
        const grp = expander.closest('.sidebar-category-group');
        if (grp) {
          const sublist = grp.querySelector('.sidebar-subtopics-list');
          const chevron = grp.querySelector('.sidebar-cat-chevron');
          if (sublist) {
            const isNowExpanded = sublist.classList.toggle('expanded');
            expander.setAttribute('aria-expanded', isNowExpanded ? 'true' : 'false');
            if (chevron) chevron.classList.toggle('rotated', isNowExpanded);
          }
        }
        return;
      }

      // 2. Clique em um subtópico específico dentro do submenu
      const subtopicLink = e.target.closest('.sidebar-subtopic-link');
      if (subtopicLink) {
        e.preventDefault();
        const docId = subtopicLink.getAttribute('data-doc-id');
        if (docId) {
          openDocument(docId, '', true);
        }
        if (window.innerWidth < 1024 && dom.sidebar) {
          dom.sidebar.classList.remove('open');
          if (dom.sidebarToggleBtn) dom.sidebarToggleBtn.setAttribute('aria-expanded', 'false');
        }
        return;
      }

      // 3. Clique no cabeçalho do tema / categoria
      const catBtn = e.target.closest('.sidebar-cat-btn');
      if (catBtn) {
        e.preventDefault();
        const catId = catBtn.getAttribute('data-cat-id');
        if (catId) {
          selectCategory(catId, true);
        }
        if (window.innerWidth < 1024 && dom.sidebar) {
          dom.sidebar.classList.remove('open');
          if (dom.sidebarToggleBtn) dom.sidebarToggleBtn.setAttribute('aria-expanded', 'false');
        }
        return;
      }
    };

    // Toggle da sidebar mobile (breakpoint unificado 1024px)
    if (dom.sidebarToggleBtn) {
      dom.sidebarToggleBtn.onclick = () => {
        const isOpen = dom.sidebar.classList.toggle('open');
        dom.sidebarToggleBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      };
    }

    // Clique em cartão de documento na categoria
    dom.categoryDocCards.onclick = (e) => {
      const card = e.target.closest('.doc-row-card');
      if (!card) return;
      e.preventDefault();
      const docId = card.getAttribute('data-doc-id');
      openDocument(docId, '', true);
    };

    // Breadcrumb volta para categoria
    dom.readerBreadcrumbLink.onclick = (e) => {
      e.preventDefault();
      closeDocumentToCategory();
    };

    // Copiar link do documento com fallback
    if (dom.readerCopyLinkBtn) {
      dom.readerCopyLinkBtn.onclick = () => {
        const url = window.location.href;
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(url).then(() => {
            const orig = dom.readerCopyLinkBtn.innerHTML;
            dom.readerCopyLinkBtn.innerHTML = '✓ Link Copiado';
            setTimeout(() => dom.readerCopyLinkBtn.innerHTML = orig, 2200);
          }).catch(() => fallbackCopy(url));
        } else {
          fallbackCopy(url);
        }
      };
    }

    function fallbackCopy(text) {
      const input = document.createElement('input');
      input.value = text;
      document.body.appendChild(input);
      input.select();
      try {
        document.execCommand('copy');
        const orig = dom.readerCopyLinkBtn.innerHTML;
        dom.readerCopyLinkBtn.innerHTML = '✓ Link Copiado';
        setTimeout(() => dom.readerCopyLinkBtn.innerHTML = orig, 2200);
      } catch (_) {
        alert('Copie o link: ' + text);
      }
      document.body.removeChild(input);
    }

    // Busca lexical com debounce 180ms
    dom.searchInput.oninput = (e) => {
      clearTimeout(state.searchDebounceTimer);
      const val = e.target.value;
      dom.searchClearBtn.style.display = val.length > 0 ? 'block' : 'none';

      state.searchDebounceTimer = setTimeout(() => {
        executeSearch(val);
      }, 180);
    };

    dom.searchClearBtn.onclick = () => {
      dom.searchInput.value = '';
      dom.searchClearBtn.style.display = 'none';
      executeSearch('');
      dom.searchInput.focus();
    };

    // Paginação da busca ("Mostrar mais resultados")
    if (dom.searchShowMoreBtn) {
      dom.searchShowMoreBtn.onclick = () => {
        state.searchVisibleLimit += 10;
        renderSearchResultsPage();
      };
    }

    // Modal da Presença (SYS-01: Proteção estrita contra elementos nulos)
    if (dom.openPresenceBtn) {
      dom.openPresenceBtn.onclick = openPresenceModal;
    }
    if (dom.presenceCanvasCard && dom.presenceCanvasCard !== dom.openPresenceBtn) {
      dom.presenceCanvasCard.onclick = openPresenceModal;
      dom.presenceCanvasCard.onkeydown = (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openPresenceModal();
        }
      };
    }
    if (dom.closePresenceBtn) {
      dom.closePresenceBtn.onclick = closePresenceModal;
    }

    if (dom.presenceBackdrop) {
      dom.presenceBackdrop.onclick = (e) => {
        if (e.target === dom.presenceBackdrop) closePresenceModal();
      };
    }

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && state.isPresenceOpen) {
        closePresenceModal();
      }
    });

    if (dom.presenceFaqGrid) {
      dom.presenceFaqGrid.onclick = (e) => {
        const chip = e.target.closest('.presence-faq-chip');
        if (!chip) return;
        const faqId = chip.getAttribute('data-faq-id');
        selectPresenceFaq(faqId);
      };
    }

    // Sincronização com histórico do navegador
    window.onpopstate = () => restoreStateFromUrl();
  }

  // ==========================================================================
  // RESTAURAÇÃO DE ESTADO VIA URL (S13 / Seção 9)
  // ==========================================================================
  function restoreStateFromUrl() {
    try {
      const params = new URLSearchParams(window.location.search);
      const modeParam = params.get('mode') || 'novato';
      const docParam = params.get('doc');
      const catParam = params.get('cat');
      const qParam = params.get('q');
      const hash = window.location.hash ? window.location.hash.substring(1) : '';

      if (qParam) {
        if (dom.searchInput) {
          dom.searchInput.value = qParam;
          if (dom.searchClearBtn) dom.searchClearBtn.style.display = 'block';
        }
        executeSearch(qParam);
      } else if (docParam) {
        switchMode('arquivo', false);
        openDocument(docParam, hash, false);
      } else if (catParam) {
        switchMode('arquivo', false);
        selectCategory(catParam, false);
      } else {
        switchMode(modeParam, false);
      }
    } catch (err) {
      console.warn('[Sistema] Erro seguro ao restaurar estado da URL:', err);
    }
  }

})();
