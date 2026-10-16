/**
 * MIDNIGHT CITY — BANNERS MÍTICOS STANDALONE CONTROLLER
 * Architecture & Interaction Engine for banners.html
 * Powered by OPERATIONS_DATABASE (content/operacoes/operacoes_data.js)
 */

(function () {
  'use strict';

  const DB = window.OPERATIONS_DATABASE;
  if (!DB) {
    console.error('MIDNIGHT CITY: OPERATIONS_DATABASE not loaded.');
    return;
  }

  // Safe data getters
  function getCurrentBanners() {
    return Array.isArray(DB.banners) ? DB.banners : (Array.isArray(DB.currentBanners) ? DB.currentBanners : []);
  }

  function getPrize(id) {
    return (DB.prizes && DB.prizes[id]) ? DB.prizes[id] : null;
  }

  function getHistoricalBanners() {
    return Array.isArray(DB.historicalBanners) ? DB.historicalBanners : [];
  }

  // State Management
  const state = {
    activeBannerId: 'novo-mundo-bruxo',
    activePrizeId: 'marca-de-merlin',
    activeRefineLevel: 'R1', // 'R1'..'R5'
    prizeFilterNature: 'all', // 'all' | 'bencao' | 'equipamento'
    characterSheetCode: localStorage.getItem('neotheon_sheet_code') || '#001',
    activeModal: null
  };

  // DOM Cache
  const dom = {};

  function cacheDom() {
    dom.bannerTabsContainer = document.getElementById('banner-tabs-container');
    dom.bannerShowcaseMount = document.getElementById('banner-showcase-mount');
    dom.prizesGridContainer = document.getElementById('prizes-grid-container');
    dom.prizesCountBadge = document.getElementById('prizes-count-badge');
    dom.prizeFilterChips = document.getElementById('prize-filter-chips');
    dom.prizeInspectorMount = document.getElementById('prize-inspector-mount');
    dom.historicalArchiveGrid = document.getElementById('historical-archive-grid');
    
    // Modals
    dom.modalDiscord = document.getElementById('modal-discord-prepare');
    dom.inputSheetCode = document.getElementById('input-character-sheet');
    dom.discordPreview = document.getElementById('discord-formatted-preview');
    dom.btnCopyDiscord = document.getElementById('btn-copy-discord-msg');
    dom.discordToast = document.getElementById('discord-copy-toast');
    
    dom.modalRefine = document.getElementById('modal-refine-comparison');
    dom.modalRefineTitle = document.getElementById('modal-refine-title');
    dom.modalRefineBody = document.getElementById('modal-refine-body');
  }

  // ── ROUTING & URL SYNC ──
  function initRouting() {
    const params = new URLSearchParams(window.location.search);
    const bParam = params.get('banner');
    const pParam = params.get('premio');
    const rParam = params.get('refino');

    const banners = getCurrentBanners();
    if (bParam && banners.find(b => b.id === bParam)) {
      state.activeBannerId = bParam;
    } else if (banners.length > 0) {
      state.activeBannerId = banners[0].id;
    }

    const currentBanner = banners.find(b => b.id === state.activeBannerId);
    if (pParam && currentBanner && currentBanner.prizes.includes(pParam) && getPrize(pParam)) {
      state.activePrizeId = pParam;
    } else if (currentBanner && currentBanner.prizes.length > 0) {
      state.activePrizeId = currentBanner.prizes[0];
    }

    if (rParam && ['R1', 'R2', 'R3', 'R4', 'R5'].includes(rParam)) {
      state.activeRefineLevel = rParam;
    } else {
      state.activeRefineLevel = 'R1';
    }

    updateUrl(false);
  }

  function updateUrl(push = true) {
    const url = new URL(window.location);
    url.searchParams.set('banner', state.activeBannerId);
    url.searchParams.set('premio', state.activePrizeId);
    url.searchParams.set('refino', state.activeRefineLevel);

    if (push) {
      window.history.pushState({}, '', url);
    } else {
      window.history.replaceState({}, '', url);
    }
  }

  window.addEventListener('popstate', () => {
    initRouting();
    renderAll();
  });

  // ── RENDERING FUNCTIONS ──

  function renderAll() {
    renderBannerTabs();
    renderBannerShowcase();
    renderPrizesGrid();
    renderPrizeInspector();
    renderHistoricalArchive();
  }

  // 1. Banner Tabs
  function renderBannerTabs() {
    if (!dom.bannerTabsContainer) return;
    const banners = getCurrentBanners();

    dom.bannerTabsContainer.innerHTML = banners.map(banner => {
      const isActive = banner.id === state.activeBannerId;
      return `
        <button type="button" class="collection-tab-btn ${isActive ? 'active' : ''}" data-banner-id="${banner.id}" role="tab" aria-selected="${isActive}">
          <div class="tab-status">${banner.badge}</div>
          <div class="tab-title">${banner.title}</div>
          <div class="tab-desc">${banner.summary || banner.description}</div>
        </button>
      `;
    }).join('');

    dom.bannerTabsContainer.querySelectorAll('.collection-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const bId = btn.getAttribute('data-banner-id');
        if (bId === state.activeBannerId) return;

        state.activeBannerId = bId;
        const banner = getCurrentBanners().find(b => b.id === bId);
        if (banner && banner.prizes && banner.prizes.length > 0) {
          state.activePrizeId = banner.prizes[0];
          state.activeRefineLevel = 'R1';
        }
        updateUrl(true);
        renderAll();
      });
    });
  }

  const BANNER_MEDIA_MAP = {
    'novo-mundo-bruxo': 'banner-bruxo',
    'grito-da-guerra': 'banner-grito',
    'amor-esta-no-ar': 'banner-amor',
    'sombra-do-abandonado': 'banner-sombra',
    'vestigios-da-divergencia': 'banner-vestigios'
  };

  // 2. Banner Showcase (Full-Width Panoramic Presentation com Loop Higgsfield / Merlin)
  function renderBannerShowcase() {
    if (!dom.bannerShowcaseMount) return;
    const banner = getCurrentBanners().find(b => b.id === state.activeBannerId);
    if (!banner) return;

    if (window._premiumMediaCleanup) {
      window._premiumMediaCleanup();
      window._premiumMediaCleanup = null;
    }

    const mediaPrefix = BANNER_MEDIA_MAP[banner.id] || 'banner-bruxo';
    const mediaBase = 'assets/neotheon-premium/';

    dom.bannerShowcaseMount.innerHTML = `
      <div class="banner-showcase-fullwidth">
        <!-- Panoramic Key Art spanning lateral width -->
        <div class="banner-panoramic-frame">
          <div class="premium-stage" data-premium-media data-video-720="${mediaBase}${mediaPrefix}-720.mp4" data-video-1080="${mediaBase}${mediaPrefix}-1080.mp4">
            <picture>
              <source srcset="${mediaBase}${mediaPrefix}-1920.webp" media="(min-width: 1280px)" type="image/webp">
              <source srcset="${mediaBase}${mediaPrefix}-1280.webp" media="(min-width: 641px)" type="image/webp">
              <source srcset="${mediaBase}${mediaPrefix}-640.webp" type="image/webp">
              <source srcset="${mediaBase}${mediaPrefix}-1920.png" media="(min-width: 1280px)">
              <source srcset="${mediaBase}${mediaPrefix}-1280.png" media="(min-width: 641px)">
              <source srcset="${mediaBase}${mediaPrefix}-640.png">
              <img src="${mediaBase}${mediaPrefix}-fallback.jpg" alt="${banner.title}" loading="lazy">
            </picture>
            <video muted playsinline loop autoplay aria-hidden="true"></video>
            <div class="banner-panoramic-overlay"></div>
            <div class="banner-panoramic-badge font-mono">${banner.badge}</div>
            <div class="banner-overlay-caption">
              <span class="banner-overlay-type font-mono">${banner.type === 'permanente' ? 'CICLO PERMANENTE' : 'CICLO TEMPORÁRIO'}</span>
              <h2 class="banner-overlay-name">${banner.title}</h2>
            </div>
          </div>
        </div>

        <!-- Meta Info & Quick Actions Bar -->
        <div class="banner-showcase-bar">
          <div class="space-y-3 max-w-4xl">
            <div>
              <span class="banner-eyebrow mb-1">${banner.type === 'permanente' ? 'CICLO PERMANENTE' : 'CICLO TEMPORÁRIO'}</span>
              <h2 class="font-cinzel text-2xl sm:text-3xl font-black text-white leading-tight">${banner.title}</h2>
            </div>

            <p class="text-sm text-[#b8b2a5] leading-relaxed font-serif">
              ${banner.description}
            </p>

            <!-- Canonical Guarantee Stats -->
            <div class="p-3.5 bg-black/60 border border-white/10 rounded-lg space-y-1.5 text-xs font-mono">
              <div class="text-[#f1d27a]">
                <strong>Garantia Canônica:</strong> ${banner.type === 'permanente' ? 'Garantia na 91ª oração (contador permanente separado).' : 'Garantia na 41ª oração / 4º pretendido garantido.'}
              </div>
              <div class="text-[#7e786b]">
                <strong>Contador de Orações:</strong> ${banner.type === 'permanente' ? 'Permanente exclusivo • Não herda nem compartilha contagem com temporários' : 'Compartilhado entre todos os temporários ativos • Preservado entre ciclos'}
              </div>
            </div>
          </div>

          <!-- Actions -->
          <div class="flex flex-wrap gap-3 pt-2 lg:pt-0">
            <a href="#prizes-catalog-section" class="btn-gold-primary text-xs">
              <span>Ver Prêmios (${(banner.prizes || []).length})</span>
              <span>↓</span>
            </a>
            <button type="button" class="btn-gold-secondary text-xs" onclick="window.openDiscordPrepareModal()">
              <span>Preparar Oração no Discord</span>
              <span>➔</span>
            </button>
          </div>
        </div>
      </div>
    `;

    if (window.initPremiumMedia) {
      window._premiumMediaCleanup = window.initPremiumMedia(dom.bannerShowcaseMount);
    }
  }

  // 3. Prizes Grid
  function renderPrizesGrid() {
    if (!dom.prizesGridContainer) return;
    const banner = getCurrentBanners().find(b => b.id === state.activeBannerId);
    if (!banner) return;

    let prizeIds = banner.prizes || [];

    // Filter by nature if active
    if (state.prizeFilterNature !== 'all') {
      prizeIds = prizeIds.filter(pId => {
        const p = getPrize(pId);
        if (!p) return false;
        const nat = (p.nature || '').toLowerCase();
        if (state.prizeFilterNature === 'bencao') {
          return nat.includes('bênção') || nat.includes('bencao');
        }
        if (state.prizeFilterNature === 'pet') {
          return nat.includes('pet');
        }
        if (state.prizeFilterNature === 'arma') {
          return nat.includes('arma');
        }
        if (state.prizeFilterNature === 'artefato') {
          return nat.includes('artefato') || nat.includes('manto') || nat.includes('vestígio') || nat.includes('vestigio') || nat.includes('relíquia') || nat.includes('reliquia');
        }
        if (state.prizeFilterNature === 'equipamento') {
          return nat.includes('arma') || nat.includes('artefato') || (!nat.includes('bênção') && !nat.includes('bencao') && !nat.includes('pet'));
        }
        return true;
      });
    }

    if (dom.prizesCountBadge) {
      dom.prizesCountBadge.textContent = `${prizeIds.length} prêmio${prizeIds.length === 1 ? '' : 's'}`;
    }

    if (prizeIds.length === 0) {
      dom.prizesGridContainer.innerHTML = `
        <div class="col-span-full py-12 text-center bg-[#0d1017] border border-white/10 rounded-xl p-8">
          <div class="text-2xl text-[#d4af37] mb-2">❖</div>
          <h4 class="font-cinzel text-base text-white font-bold">Nenhum prêmio corresponde ao filtro selecionado.</h4>
        </div>
      `;
      return;
    }

    dom.prizesGridContainer.innerHTML = prizeIds.map(pId => {
      const p = getPrize(pId);
      if (!p) return '';
      const isSelected = p.id === state.activePrizeId;
      const imgSrc = p.image || 'assets/valiria_mission.jpg';

      const nat = (p.nature || '').toLowerCase();
      const isBencao = nat.includes('bênção') || nat.includes('bencao');
      let natureLabel = `[${(p.nature || 'EXCLUSIVO').toUpperCase()}]`;
      let natureTextClass = 'text-nature-silver';
      let badgeClass = 'nature-silver';

      if (nat.includes('bênção') || nat.includes('bencao')) {
        natureLabel = '[BÊNÇÃO EXCLUSIVA]';
        natureTextClass = 'text-nature-rubro';
        badgeClass = 'nature-rubro';
      } else if (nat.includes('pet')) {
        natureLabel = p.nature.toUpperCase().includes('SUPORTE') ? '[PET EXCLUSIVO (SUPORTE)]' : (p.nature.toUpperCase().includes('COMBATE') ? '[PET EXCLUSIVO (COMBATE)]' : '[PET EXCLUSIVO]');
        natureTextClass = 'text-nature-gold';
        badgeClass = 'nature-gold';
      } else if (nat.includes('artefato')) {
        natureLabel = '[ARTEFATO EXCLUSIVO]';
        natureTextClass = 'text-amber-300';
        badgeClass = 'nature-gold';
      } else if (nat.includes('arma')) {
        natureLabel = '[ARMA EXCLUSIVA]';
        natureTextClass = 'text-nature-silver';
        badgeClass = 'nature-silver';
      }

      return `
        <button type="button" class="prize-card ${isSelected ? 'selected' : ''}" data-prize-id="${p.id}" role="button" aria-selected="${isSelected}">
          <div class="prize-card-media">
            <img src="${imgSrc}" alt="${p.name}" loading="lazy" onerror="this.onerror=null;this.src='assets/valiria_mission.jpg';">
            <span class="prize-card-badge ${badgeClass}">${p.code || 'EXCLUSIVO'}</span>
          </div>

          <div class="prize-card-body">
            <div>
              <div class="prize-card-nature font-mono ${natureTextClass}">${natureLabel}</div>
              <h3 class="prize-card-title">${p.name}</h3>
              <p class="prize-card-desc">${p.summary || ''}</p>
            </div>

            <div class="prize-card-action-bar">
              <span class="flex items-center gap-1.5">
                <span class="text-xs ${isBencao ? 'text-rose-400' : 'text-slate-300'}">${isSelected ? '●' : '○'}</span>
                <span>${isSelected ? 'Inspecionando' : 'Inspecionar'}</span>
              </span>
              <span class="text-xs">➔</span>
            </div>
          </div>
        </button>
      `;
    }).join('');

    // Single event listener delegation for prize selection
    dom.prizesGridContainer.querySelectorAll('.prize-card').forEach(card => {
      card.addEventListener('click', () => {
        const pId = card.getAttribute('data-prize-id');
        if (pId === state.activePrizeId) return;

        state.activePrizeId = pId;
        state.activeRefineLevel = 'R1';
        updateUrl(true);
        renderPrizesGrid();
        renderPrizeInspector();

        // Smooth scroll to inspector (com compensação de cabeçalho)
        const inspector = document.getElementById('prize-inspector-section');
        if (inspector) {
          inspector.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  // 4. Vitrine Mítica & Inspector
  function renderPrizeInspector() {
    if (!dom.prizeInspectorMount) return;
    const p = getPrize(state.activePrizeId);
    if (!p) return;

    const imgSrc = p.image || 'assets/valiria_mission.jpg';
    const activeLevel = state.activeRefineLevel || 'R1';

    const nat = (p.nature || '').toLowerCase();
    let natureLabel = `[${(p.nature || 'EXCLUSIVO').toUpperCase()}]`;
    let natureTextClass = 'text-nature-silver';
    let badgeClass = 'nature-silver';

    if (nat.includes('bênção') || nat.includes('bencao')) {
      natureLabel = '[BÊNÇÃO EXCLUSIVA]';
      natureTextClass = 'text-nature-rubro';
      badgeClass = 'nature-rubro';
    } else if (nat.includes('pet')) {
      natureLabel = p.nature.toUpperCase().includes('SUPORTE') ? '[PET EXCLUSIVO (SUPORTE)]' : (p.nature.toUpperCase().includes('COMBATE') ? '[PET EXCLUSIVO (COMBATE)]' : '[PET EXCLUSIVO]');
      natureTextClass = 'text-nature-gold';
      badgeClass = 'nature-gold';
    } else if (nat.includes('artefato')) {
      natureLabel = '[ARTEFATO EXCLUSIVO]';
      natureTextClass = 'text-amber-300';
      badgeClass = 'nature-gold';
    } else if (nat.includes('arma')) {
      natureLabel = '[ARMA EXCLUSIVA]';
      natureTextClass = 'text-nature-silver';
      badgeClass = 'nature-silver';
    }

    // Get refinement delta
    let refineDeltaText = '';
    if (activeLevel === 'R1') {
      refineDeltaText = 'Efeito base ativado em R1.';
    } else if (p.refinements && p.refinements[activeLevel]) {
      refineDeltaText = p.refinements[activeLevel];
    } else {
      refineDeltaText = 'Alterações não documentadas neste nível.';
    }

    // Full interpretive lore narrative
    const fullLore = p.interpretive || p.description || p.summary || 'Descrição canônica em catalogação.';

    dom.prizeInspectorMount.innerHTML = `
      <div class="prize-inspector-stage">
        <!-- Left: Sticky Sidebar containing Art & Action Buttons (never overlapped on scroll) -->
        <div class="inspector-sidebar-sticky">
          <div class="inspector-art-box">
            <img src="${imgSrc}" alt="${p.name}" onerror="this.onerror=null;this.src='assets/valiria_mission.jpg';">
            <div class="absolute top-3 left-3 px-2.5 py-1 rounded text-xs font-mono ${badgeClass}">
              ${p.code || 'EXCLUSIVO'}
            </div>
          </div>

          <div class="grid grid-cols-2 gap-3">
            <button type="button" class="btn-gold-primary w-full text-xs" onclick="window.openDiscordPrepareModal()">
              <span>Preparar Oração</span>
              <span>↗</span>
            </button>
            <button type="button" class="btn-gold-secondary w-full text-xs" onclick="window.openRefineComparisonModal()">
              <span>Comparar R1–R5</span>
              <span>☷</span>
            </button>
          </div>
        </div>

        <!-- Right: Canonical Mechanics, Refinements & Complete Lore Narrative -->
        <div class="space-y-5">
          <!-- Title & Badges -->
          <div>
            <div class="flex items-center gap-2 mb-1">
              <span class="banner-eyebrow mb-0 font-mono ${natureTextClass}">${natureLabel}</span>
              ${(p.class || p.classe) ? `<span class="text-xs font-mono text-[#f1d27a] bg-[#d4af37]/10 px-2 py-0.5 rounded border border-[#d4af37]/20">${p.class || p.classe}</span>` : ''}
            </div>
            <h3 class="font-cinzel text-2xl sm:text-3xl font-bold text-white leading-tight">${p.name}</h3>
            ${p.alias ? `<div class="text-xs font-mono text-[#7e786b] mt-0.5">Identificado também como: ${p.alias}</div>` : ''}
            <p class="text-sm text-[#b8b2a5] mt-2 leading-relaxed font-serif">${p.summary || ''}</p>
          </div>

          <!-- Refinements Selector Bar -->
          <div class="p-4 bg-black/60 border border-white/10 rounded-xl space-y-3">
            <div class="flex items-center justify-between">
              <span class="font-cinzel text-xs font-bold text-white uppercase tracking-wider">Nível de Refinamento:</span>
              <span class="text-xs font-mono text-[#f1d27a]">Custo fixo: 50 Golds + Cópia Idêntica</span>
            </div>

            <div class="inspector-refine-pills">
              ${['R1', 'R2', 'R3', 'R4', 'R5'].map(lvl => `
                <button type="button" class="refine-pill-btn ${lvl === activeLevel ? 'active' : ''}" data-refine-level="${lvl}">
                  ${lvl === 'R1' ? 'R1 (Base)' : lvl}
                </button>
              `).join('')}
            </div>

            <!-- Canonical Base Effect (R1) -->
            <div class="p-3.5 bg-[#050608] border border-white/5 rounded text-xs sm:text-sm text-[#f0ece1] leading-relaxed font-mono">
              <div class="text-[11px] font-bold text-[#f1d27a] uppercase mb-1 font-sans">Efeito Base Canônico (R1):</div>
              <div class="whitespace-pre-line text-[#cfc7b4]">${p.r1Effect || 'Efeito base conforme catálogo.'}</div>
            </div>

            <!-- Specific Refinement Delta -->
            ${activeLevel !== 'R1' ? `
              <div id="inspector-refine-delta" class="p-3 bg-[#d4af37]/10 border border-[#d4af37]/30 rounded text-xs font-mono text-[#f1d27a]">
                <div class="font-bold uppercase text-[11px] mb-1">Alterações Específicas Deste Nível (${activeLevel}):</div>
                <div>${refineDeltaText}</div>
              </div>
            ` : ''}

            <div class="text-[11px] text-[#7e786b] font-serif italic">
              * Nota: Leia o efeito base em conjunto com as alterações do refinamento selecionado.
            </div>
          </div>

          <!-- Expandable Complete Lore Narrative (Vitrine Mítica) -->
          <div class="banner-accordion">
            <details open>
              <summary>
                <span class="flex items-center gap-2">
                  <svg class="w-4 h-4 text-[#d4af37] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
                  <span>História & Descrição Interpretativa Canônica</span>
                </span>
                <span class="text-xs font-mono text-[#7e786b]">Recolher ▾</span>
              </summary>
              <div class="accordion-body font-serif text-sm text-[#cfc7b4] leading-relaxed pt-3 whitespace-pre-line">
                ${fullLore}
              </div>
            </details>
          </div>
        </div>
      </div>
    `;

    // Attach Refinement Pills Click Handlers
    dom.prizeInspectorMount.querySelectorAll('.refine-pill-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const lvl = btn.getAttribute('data-refine-level');
        if (lvl === state.activeRefineLevel) return;

        state.activeRefineLevel = lvl;
        updateUrl(true);
        renderPrizeInspector();
      });
    });
  }

  // 5. Historical Archive (Direct links to official Docs)
  function renderHistoricalArchive() {
    if (!dom.historicalArchiveGrid) return;
    const history = getHistoricalBanners();

    dom.historicalArchiveGrid.innerHTML = history.map(arch => `
      <div class="bg-[#0c0e14] border border-white/10 rounded-xl p-5 flex flex-col justify-between hover:border-white/20 transition-all">
        <div class="space-y-2">
          <div class="flex items-center justify-between">
            <span class="text-[10px] font-mono text-[#7e786b] uppercase">${arch.number || 'BANNER ARQUIVADO'}</span>
            <span class="text-[10px] font-mono text-amber-500/80 bg-amber-500/10 px-2 py-0.5 rounded">Arquivado</span>
          </div>
          <h4 class="font-cinzel text-base font-bold text-white">${arch.title}</h4>
          <p class="text-xs text-[#b8b2a5] leading-relaxed line-clamp-3">${arch.summary}</p>
        </div>

        <div class="pt-4 border-t border-white/5 mt-4">
          <a href="${arch.docsUrl}" target="_blank" rel="noopener noreferrer" class="btn-gold-secondary w-full text-xs py-2.5 flex items-center justify-center gap-2 font-bold tracking-wider hover:border-[#d4af37]">
            <span>Abrir Documento Oficial no Docs</span>
            <span class="text-xs">↗</span>
          </a>
        </div>
      </div>
    `).join('');
  }

  // ── MODALS IMPLEMENTATION ──

  window.openDiscordPrepareModal = function () {
    if (!dom.modalDiscord) return;
    const banner = getCurrentBanners().find(b => b.id === state.activeBannerId);
    const prize = getPrize(state.activePrizeId);

    const sheetCode = state.characterSheetCode || '#001';
    if (dom.inputSheetCode) {
      dom.inputSheetCode.value = sheetCode;
    }

    updateDiscordPreview();

    dom.modalDiscord.classList.add('open');
    state.activeModal = dom.modalDiscord;
  };

  function updateDiscordPreview() {
    const banner = getCurrentBanners().find(b => b.id === state.activeBannerId);
    const prize = getPrize(state.activePrizeId);
    const sheet = (dom.inputSheetCode && dom.inputSheetCode.value.trim()) ? dom.inputSheetCode.value.trim() : '#001';

    state.characterSheetCode = sheet;
    localStorage.setItem('neotheon_sheet_code', sheet);

    const bTitle = banner ? banner.title : 'Banner Mítico';
    const pTitle = prize ? prize.name : 'Prêmio Pretendido';

    const msg = `Gostaria de realizar uma oração no banner **${bTitle}**. Meu prêmio pretendido é **${pTitle}**. Ficha: \`${sheet}\`. Aguardo o acompanhamento de um ADM.`;

    if (dom.discordPreview) {
      dom.discordPreview.textContent = msg;
    }
  }

  function initModalEvents() {
    if (dom.inputSheetCode) {
      dom.inputSheetCode.addEventListener('input', updateDiscordPreview);
    }

    if (dom.btnCopyDiscord) {
      dom.btnCopyDiscord.addEventListener('click', () => {
        if (!dom.discordPreview) return;
        const text = dom.discordPreview.textContent;
        navigator.clipboard.writeText(text).then(() => {
          if (dom.discordToast) {
            dom.discordToast.classList.remove('hidden');
            setTimeout(() => dom.discordToast.classList.add('hidden'), 3500);
          }
        });
      });
    }
  }

  // Comparison Modal
  window.openRefineComparisonModal = function () {
    const p = getPrize(state.activePrizeId);
    if (!p || !dom.modalRefine) return;

    if (dom.modalRefineTitle) {
      dom.modalRefineTitle.textContent = `Comparativo de Refinos: ${p.name}`;
    }

    const ref = p.refinements || {};

    if (dom.modalRefineBody) {
      dom.modalRefineBody.innerHTML = `
        <div class="space-y-4">
          <div class="text-xs text-[#b8b2a5] leading-relaxed">
            Consulte a progressão de cada nível de refinamento (R1 a R5). O procedimento é realizado com um <strong>Forjador</strong> (armas/itens) ou <strong>Manipulador Genético</strong> (pets) ao custo fixo de <strong>50 Golds + prêmio idêntico</strong>.
          </div>

          <div class="p-3 bg-black/60 border border-white/10 rounded font-mono text-xs">
            <div class="text-[#f1d27a] font-bold uppercase mb-1">Efeito Base (R1):</div>
            <div class="text-[#cfc7b4] whitespace-pre-line">${p.r1Effect}</div>
          </div>

          <div class="overflow-x-auto">
            <table class="w-full text-left text-xs font-mono border-collapse">
              <thead>
                <tr class="border-b border-white/10 text-[#7e786b]">
                  <th class="py-2.5 px-3">Nível</th>
                  <th class="py-2.5 px-3">Alterações Específicas do Refinamento</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-white/5 text-[#cfc7b4]">
                <tr class="bg-white/5">
                  <td class="py-2.5 px-3 font-bold text-[#f1d27a]">R1 (Base)</td>
                  <td class="py-2.5 px-3">Valores padrão descritos no efeito base.</td>
                </tr>
                <tr>
                  <td class="py-2.5 px-3 font-bold text-white">R2</td>
                  <td class="py-2.5 px-3">${ref.R2 || 'Sem alteração explícita.'}</td>
                </tr>
                <tr>
                  <td class="py-2.5 px-3 font-bold text-white">R3</td>
                  <td class="py-2.5 px-3">${ref.R3 || 'Sem alteração explícita.'}</td>
                </tr>
                <tr>
                  <td class="py-2.5 px-3 font-bold text-white">R4</td>
                  <td class="py-2.5 px-3">${ref.R4 || 'Sem alteração explícita.'}</td>
                </tr>
                <tr class="bg-[#d4af37]/10">
                  <td class="py-2.5 px-3 font-bold text-[#f1d27a]">R5 (Máximo)</td>
                  <td class="py-2.5 px-3 text-[#f1d27a] font-bold">${ref.R5 || 'Sem alteração explícita.'}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      `;
    }

    dom.modalRefine.classList.add('open');
    state.activeModal = dom.modalRefine;
  };

  window.closeBannersModal = function () {
    if (state.activeModal) {
      state.activeModal.classList.remove('open');
      state.activeModal = null;
    }
  };

  // Escape key closes modals
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && state.activeModal) {
      window.closeBannersModal();
    }
  });

  // Filter chips
  function updateFilterChipStyles() {
    if (!dom.prizeFilterChips) return;
    dom.prizeFilterChips.querySelectorAll('button').forEach(btn => {
      const filter = btn.getAttribute('data-filter-nature');
      const isActive = filter === state.prizeFilterNature;
      if (isActive) {
        btn.className = 'px-3.5 py-1.5 rounded-full text-xs font-mono font-bold bg-[#d4af37] text-black shadow-md border border-[#f1d27a]';
      } else {
        btn.className = 'px-3.5 py-1.5 rounded-full text-xs font-mono font-bold bg-white/5 text-[#b8b2a5] border border-white/10 hover:bg-white/10 hover:text-white transition-all';
      }
    });
  }

  function initFilterChips() {
    if (!dom.prizeFilterChips) return;
    dom.prizeFilterChips.querySelectorAll('button').forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.getAttribute('data-filter-nature');
        state.prizeFilterNature = filter;
        updateFilterChipStyles();
        renderPrizesGrid();
      });
    });
    updateFilterChipStyles();
  }

  // ── SIMULADOR CANÔNICO DE ORAÇÕES & PITY ──
  const simState = {
    tempPity: 0, // 0..40 (shared across temporary banners)
    permPity: 0, // 0..90 (for permanent banner)
    offBannerCount: 0, // 0..3 (failures before 4th exclusive guarantee)
    totalPulls: 0,
    exclusiveWins: 0,
    activeBannerId: 'novo-mundo-bruxo',
    intendedPrizeId: 'marca-de-merlin'
  };

  const PERMANENT_D46_MAP = {
    3: "Deathwalker’s Ward", 13: "Deathwalker’s Ward", 23: "Deathwalker’s Ward", 42: "Deathwalker’s Ward", 45: "Deathwalker’s Ward",
    17: "Mythcarver", 19: "Mythcarver", 32: "Mythcarver", 33: "Mythcarver", 43: "Mythcarver",
    2: "Titanstone Knuckles", 5: "Titanstone Knuckles", 11: "Titanstone Knuckles", 18: "Titanstone Knuckles", 37: "Titanstone Knuckles",
    12: "Whisper", 16: "Whisper", 29: "Whisper", 31: "Whisper", 41: "Whisper",
    9: "Cabal’s Ruin", 20: "Cabal’s Ruin", 30: "Cabal’s Ruin", 38: "Cabal’s Ruin", 44: "Cabal’s Ruin",
    8: "The Plate of the Dawnmartyr", 10: "The Plate of the Dawnmartyr", 21: "The Plate of the Dawnmartyr", 26: "The Plate of the Dawnmartyr", 40: "The Plate of the Dawnmartyr",
    14: "The List", 22: "The List", 25: "The List", 28: "The List", 34: "The List",
    1: "Fenthras, o Arco da Traição Selvagem", 4: "Fenthras, o Arco da Traição Selvagem", 24: "Fenthras, o Arco da Traição Selvagem", 27: "Fenthras, o Arco da Traição Selvagem", 39: "Fenthras, o Arco da Traição Selvagem",
    6: "Spire of Conflux", 7: "Spire of Conflux", 15: "Spire of Conflux", 35: "Spire of Conflux", 36: "Spire of Conflux",
    46: "✦ ESCOLHA LIVRE (Qualquer relíquia da lista à sua escolha!)"
  };

  function rollDice(max) {
    return Math.floor(Math.random() * max) + 1;
  }

  function initPrayerSimulator() {
    const elBannerSelect = document.getElementById('sim-banner-select');
    const elIntendedWrap = document.getElementById('sim-intended-wrap');
    const elIntendedSelect = document.getElementById('sim-intended-select');
    const elResetBtn = document.getElementById('sim-reset-btn');
    const elPull1Btn = document.getElementById('sim-pull-1-btn');
    const elPull10Btn = document.getElementById('sim-pull-10-btn');
    const elPityCurrent = document.getElementById('sim-pity-current');
    const elPityMax = document.getElementById('sim-pity-max');
    const elPityBar = document.getElementById('sim-pity-bar');
    const elOffBannerCount = document.getElementById('sim-off-banner-count');
    const elIntendedStatus = document.getElementById('sim-intended-status');
    const elTotalPulls = document.getElementById('sim-total-pulls');
    const elExclusiveWins = document.getElementById('sim-exclusive-wins');
    const elLastSummary = document.getElementById('sim-last-summary');
    const elResultsFeed = document.getElementById('sim-results-feed');

    if (!elBannerSelect || !elPull1Btn) return;

    function populateIntendedOptions() {
      const bannerId = elBannerSelect.value;
      simState.activeBannerId = bannerId;

      if (bannerId === 'vestigios-da-divergencia') {
        if (elIntendedWrap) elIntendedWrap.classList.add('opacity-40', 'pointer-events-none');
        if (elIntendedSelect) {
          elIntendedSelect.innerHTML = '<option value="">Permanente não possui garantia do 4º (Escolha Livre no 46)</option>';
        }
      } else {
        if (elIntendedWrap) elIntendedWrap.classList.remove('opacity-40', 'pointer-events-none');
        const banner = getCurrentBanners().find(b => b.id === bannerId);
        if (banner && elIntendedSelect) {
          elIntendedSelect.innerHTML = banner.prizes.map(pId => {
            const p = getPrize(pId);
            const title = p ? (p.name || p.title) : pId;
            return `<option value="${pId}">${title}</option>`;
          }).join('');
          if (banner.prizes.length > 0) {
            simState.intendedPrizeId = banner.prizes[0];
            elIntendedSelect.value = banner.prizes[0];
          }
        }
      }
      updateSimCounters();
    }

    function updateSimCounters() {
      const isPerm = simState.activeBannerId === 'vestigios-da-divergencia';
      const curPity = isPerm ? simState.permPity : simState.tempPity;
      const maxPity = isPerm ? 90 : 40;
      const pct = Math.min(100, Math.round((curPity / maxPity) * 100));

      if (elPityCurrent) elPityCurrent.textContent = curPity;
      if (elPityMax) elPityMax.textContent = `/ ${maxPity}`;
      if (elPityBar) elPityBar.style.width = `${pct}%`;

      if (elOffBannerCount) elOffBannerCount.textContent = isPerm ? '-' : simState.offBannerCount;
      if (elIntendedStatus) {
        if (isPerm) {
          elIntendedStatus.textContent = 'Não aplicável ao permanente';
          elIntendedStatus.className = 'text-[10px] font-mono-code text-gray-500 block mt-2';
        } else if (simState.offBannerCount >= 3) {
          elIntendedStatus.textContent = 'PRÓXIMO EXCLUSIVO GARANTIDO!';
          elIntendedStatus.className = 'text-[10px] font-mono-code text-amber-300 font-bold animate-pulse block mt-2';
        } else {
          elIntendedStatus.textContent = `${3 - simState.offBannerCount} falhas restantes para a garantia`;
          elIntendedStatus.className = 'text-[10px] font-mono-code text-gray-400 block mt-2';
        }
      }

      if (elTotalPulls) elTotalPulls.textContent = simState.totalPulls;
      if (elExclusiveWins) elExclusiveWins.textContent = `${simState.exclusiveWins} prêmios exclusivos obtidos`;
    }

    function executeSinglePull() {
      simState.totalPulls++;
      const isPerm = simState.activeBannerId === 'vestigios-da-divergencia';
      let outcome = {
        pullNum: simState.totalPulls,
        isExclusive: false,
        isPity: false,
        diceDetails: '',
        rewardName: '',
        typeClass: 'text-[#cfc7b4]'
      };

      if (isPerm) {
        // PERMANENTE (1d50)
        let roll1;
        if (simState.permPity >= 90) {
          roll1 = 50;
          outcome.isPity = true;
          outcome.isExclusive = true;
        } else {
          roll1 = rollDice(50);
          if (roll1 === 50) {
            outcome.isExclusive = true;
          }
        }

        if (outcome.isExclusive) {
          simState.permPity = 0;
          simState.exclusiveWins++;
          const roll2 = rollDice(46);
          const prizeName = PERMANENT_D46_MAP[roll2] || "Relíquia da Divergência";
          outcome.rewardName = prizeName;
          outcome.diceDetails = outcome.isPity 
            ? `[PITY 90 ATIVADO: 1d50 = 50] ➔ [1d46 = ${roll2}]` 
            : `[1d50 = ${roll1}] ➔ [1d46 = ${roll2}]`;
          outcome.typeClass = 'text-[#f1d27a] font-bold';
        } else {
          simState.permPity++;
          outcome.diceDetails = `[1d50 = ${roll1}]`;
          if (roll1 <= 30) {
            outcome.rewardName = '10 Golds';
            outcome.typeClass = 'text-gray-400';
          } else if (roll1 <= 40) {
            outcome.rewardName = '1x Artefato Roletável';
            outcome.typeClass = 'text-sky-300';
          } else if (roll1 <= 44) {
            outcome.rewardName = '1x Artefato Roletável (+1 Sub Status)';
            outcome.typeClass = 'text-cyan-300 font-semibold';
          } else if (roll1 <= 46) {
            outcome.rewardName = '1x Artefato Roletável (+2 Sub Status)';
            outcome.typeClass = 'text-purple-300 font-semibold';
          } else {
            outcome.rewardName = '1x Joias do Destino (Aprimoramento)';
            outcome.typeClass = 'text-amber-300 font-semibold';
          }
        }
      } else {
        // TEMPORÁRIO (1d20 com Dif 5, 2ª e 3ª rolagens)
        let roll1;
        if (simState.tempPity >= 40) {
          roll1 = 20;
          outcome.isPity = true;
          outcome.isExclusive = true;
        } else {
          roll1 = rollDice(20);
          if (roll1 === 20) {
            outcome.isExclusive = true;
          }
        }

        if (outcome.isExclusive) {
          simState.tempPity = 0;
          simState.exclusiveWins++;

          const intendedPrize = getPrize(simState.intendedPrizeId);
          const intendedTitle = intendedPrize ? (intendedPrize.name || intendedPrize.title) : 'Prêmio Pretendido';

          if (simState.offBannerCount >= 3) {
            // Garantia do 4º ativada
            outcome.rewardName = `✦ ${intendedTitle} [GARANTIA DO 4º ATIVADA]`;
            outcome.diceDetails = outcome.isPity 
              ? `[PITY 40: 1d20 = 20] ➔ [GARANTIA 4º]` 
              : `[1d20 = 20] ➔ [GARANTIA 4º]`;
            outcome.typeClass = 'text-[#f1d27a] font-bold';
            simState.offBannerCount = 0;
          } else {
            // Segunda rolagem de 1d20
            const roll2 = rollDice(20);
            const bannerId = simState.activeBannerId;

            if (bannerId === 'novo-mundo-bruxo') {
              if (roll2 <= 2) {
                outcome.rewardName = "Firebolt S30";
                outcome.diceDetails = `[1d20 = ${roll1}] ➔ [1d20 = ${roll2}]`;
              } else if (roll2 <= 12) {
                outcome.rewardName = "VARINHA (Madeira), (Núcleo Mágico), (Tamanho), (Flexibilidade)";
                outcome.diceDetails = `[1d20 = ${roll1}] ➔ [1d20 = ${roll2}]`;
              } else if (roll2 <= 18) {
                outcome.rewardName = "A Mala de Quadribol";
                outcome.diceDetails = `[1d20 = ${roll1}] ➔ [1d20 = ${roll2}]`;
              } else {
                // Bênção ou Pet Exclusivo -> 3ª rolagem
                const roll3 = rollDice(20);
                if (roll3 <= 10) outcome.rewardName = "A Marca de Merlin, Aspecto do Espírito";
                else if (roll3 <= 15) outcome.rewardName = "Fênix";
                else outcome.rewardName = "Basilisco";
                outcome.diceDetails = `[1d20 = ${roll1}] ➔ [1d20 = ${roll2}] ➔ [1d20 = ${roll3}]`;
              }
            } else if (bannerId === 'grito-da-guerra') {
              if (roll2 <= 5) {
                outcome.rewardName = "Baluarte de Pallas & Lança Promachos";
                outcome.diceDetails = `[1d20 = ${roll1}] ➔ [1d20 = ${roll2}]`;
              } else if (roll2 <= 10) {
                outcome.rewardName = "Fear’s Sword";
                outcome.diceDetails = `[1d20 = ${roll1}] ➔ [1d20 = ${roll2}]`;
              } else if (roll2 <= 14) {
                outcome.rewardName = "Panic’s Guns";
                outcome.diceDetails = `[1d20 = ${roll1}] ➔ [1d20 = ${roll2}]`;
              } else if (roll2 <= 18) {
                outcome.rewardName = "Presas Noturnas";
                outcome.diceDetails = `[1d20 = ${roll1}] ➔ [1d20 = ${roll2}]`;
              } else {
                // Bênção Exclusiva -> 3ª rolagem
                const roll3 = rollDice(20);
                if (roll3 <= 10) outcome.rewardName = "Compasso do Sangue e Ferro";
                else if (roll3 <= 15) outcome.rewardName = "Vanguarda de Pallas";
                else outcome.rewardName = "Treze Meses no Bronze, O Grito da Guerra";
                outcome.diceDetails = `[1d20 = ${roll1}] ➔ [1d20 = ${roll2}] ➔ [1d20 = ${roll3}]`;
              }
            } else if (bannerId === 'amor-esta-no-ar') {
              if (roll2 <= 5) {
                outcome.rewardName = "Corrente do Êxtase Carmesim";
                outcome.diceDetails = `[1d20 = ${roll1}] ➔ [1d20 = ${roll2}]`;
              } else if (roll2 <= 10) {
                outcome.rewardName = "Réquiem de Putto";
                outcome.diceDetails = `[1d20 = ${roll1}] ➔ [1d20 = ${roll2}]`;
              } else if (roll2 <= 14) {
                outcome.rewardName = "Jóia da Alma";
                outcome.diceDetails = `[1d20 = ${roll1}] ➔ [1d20 = ${roll2}]`;
              } else if (roll2 <= 18) {
                outcome.rewardName = "Desejo da Alma";
                outcome.diceDetails = `[1d20 = ${roll1}] ➔ [1d20 = ${roll2}]`;
              } else {
                const roll3 = rollDice(20);
                if (roll3 === 1) outcome.rewardName = "Amor Infernal — Death Scythe";
                else if (roll3 <= 5) outcome.rewardName = "Ídolo Perpétuo";
                else if (roll3 <= 10) outcome.rewardName = "Sombra Divina Não Nomeada";
                else if (roll3 <= 15) outcome.rewardName = "O Despertar de uma Nova Era";
                else outcome.rewardName = "Por Favor, Me Liberte do Sono Estígio…";
                outcome.diceDetails = `[1d20 = ${roll1}] ➔ [1d20 = ${roll2}] ➔ [1d20 = ${roll3}]`;
              }
            } else {
              // A Sombra do Abandonado
              if (roll2 <= 9) {
                outcome.rewardName = "Diário Abandonado";
                outcome.diceDetails = `[1d20 = ${roll1}] ➔ [1d20 = ${roll2}]`;
              } else if (roll2 <= 19) {
                outcome.rewardName = "Lanterna de Mashadar e a Lâmina de Shadar Logoth";
                outcome.diceDetails = `[1d20 = ${roll1}] ➔ [1d20 = ${roll2}]`;
              } else {
                const roll3 = rollDice(20);
                if (roll3 <= 12) outcome.rewardName = "A Coroa da Noite Absoluta";
                else if (roll3 === 13) outcome.rewardName = "Mythcarver (Vestígio)";
                else if (roll3 <= 17) outcome.rewardName = "A Coroa da Noite Absoluta";
                else outcome.rewardName = "Son of Forsaken";
                outcome.diceDetails = `[1d20 = ${roll1}] ➔ [1d20 = ${roll2}] ➔ [1d20 = ${roll3}]`;
              }
            }

            outcome.typeClass = 'text-[#f1d27a] font-bold';

            // Check if won prize is intended
            if (outcome.rewardName.toLowerCase().includes(intendedTitle.toLowerCase())) {
              simState.offBannerCount = 0;
            } else {
              simState.offBannerCount = Math.min(3, simState.offBannerCount + 1);
            }
          }
        } else {
          simState.tempPity++;
          outcome.diceDetails = `[1d20 = ${roll1}]`;
          if (roll1 <= 12) {
            outcome.rewardName = '10 Golds';
            outcome.typeClass = 'text-gray-400';
          } else {
            if (simState.activeBannerId === 'novo-mundo-bruxo') {
              outcome.rewardName = '1 kg de Prata Estelar';
              outcome.typeClass = 'text-cyan-300';
            } else {
              outcome.rewardName = '1 kg de Matéria do Vazio';
              outcome.typeClass = 'text-purple-300';
            }
          }
        }
      }

      return outcome;
    }

    function appendResults(outcomes) {
      if (!elResultsFeed) return;
      if (elResultsFeed.querySelector('.italic')) {
        elResultsFeed.innerHTML = '';
      }

      const frag = document.createDocumentFragment();
      outcomes.forEach(out => {
        const item = document.createElement('div');
        item.className = `p-2 rounded border flex flex-col sm:flex-row sm:items-center justify-between gap-1 ${
          out.isExclusive 
            ? 'bg-[#d4af37]/15 border-[#d4af37]/40 text-[#f1d27a]' 
            : 'bg-white/5 border-white/5 text-[#cfc7b4]'
        }`;

        item.innerHTML = `
          <div class="flex items-center gap-2">
            <span class="text-[10px] font-mono text-gray-500">#${String(out.pullNum).padStart(3, '0')}</span>
            <span class="text-[11px] font-mono font-semibold text-gray-400">${out.diceDetails}</span>
          </div>
          <div class="text-xs font-mono ${out.typeClass} flex items-center gap-1.5">
            ${out.isExclusive ? '<span>★</span>' : ''}
            <span>${out.rewardName}</span>
          </div>
        `;
        frag.appendChild(item);
      });

      elResultsFeed.insertBefore(frag, elResultsFeed.firstChild);

      if (elLastSummary) {
        const last = outcomes[outcomes.length - 1];
        elLastSummary.textContent = `Última oração: #${last.pullNum} ➔ ${last.rewardName}`;
      }

      updateSimCounters();
    }

    // Event Listeners
    elBannerSelect.addEventListener('change', populateIntendedOptions);
    if (elIntendedSelect) {
      elIntendedSelect.addEventListener('change', () => {
        simState.intendedPrizeId = elIntendedSelect.value;
      });
    }

    elPull1Btn.addEventListener('click', () => {
      const res = executeSinglePull();
      appendResults([res]);
    });

    elPull10Btn.addEventListener('click', () => {
      const list = [];
      for (let i = 0; i < 10; i++) {
        list.push(executeSinglePull());
      }
      appendResults(list);
    });

    if (elResetBtn) {
      elResetBtn.addEventListener('click', () => {
        simState.tempPity = 0;
        simState.permPity = 0;
        simState.offBannerCount = 0;
        simState.totalPulls = 0;
        simState.exclusiveWins = 0;
        if (elResultsFeed) {
          elResultsFeed.innerHTML = `
            <div class="text-gray-500 italic text-center py-6">
              Contadores zerados. Faça novas orações para testar as probabilidades.
            </div>
          `;
        }
        if (elLastSummary) elLastSummary.textContent = 'Contadores reiniciados.';
        updateSimCounters();
      });
    }

    populateIntendedOptions();
  }

  // Initialize
  function init() {
    cacheDom();
    initRouting();
    initFilterChips();
    initModalEvents();
    renderAll();
    initPrayerSimulator();

    // Quick compare button
    const btnQuickComp = document.getElementById('btn-quick-compare-all');
    if (btnQuickComp) {
      btnQuickComp.addEventListener('click', window.openRefineComparisonModal);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();

