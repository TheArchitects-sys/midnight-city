/**
 * MIDNIGHT CITY — OPERAÇÕES, BANNERS & NOVATO PREMIUM ENGINE
 * Unified interactive controller for operacoes.html
 * Powered by OPERATIONS_DATABASE (content/operacoes/operacoes_data.js)
 */

(function () {
  'use strict';

  // Ensure database exists
  const DB = window.OPERATIONS_DATABASE;
  if (!DB) {
    console.error('MIDNIGHT CITY: OPERATIONS_DATABASE not found.');
    return;
  }

  // State Management
  const state = {
    currentView: 'operacoes', // 'operacoes' | 'banners' | 'novato'
    
    // Operações Filters
    missionSearch: '',
    missionType: 'todas', // 'todas' | 'permanentes' | 'temporarias'
    missionVariant: 'todas', // 'todas' | 'verde' | 'amarela' | 'vermelha'
    missionSort: 'original', // 'original' | 'nome'
    
    // Banners State
    activeBannerId: 'novo-mundo-bruxo',
    activePrizeId: 'marca-de-merlin',
    activeRefineLevel: 'R1', // 'R1'..'R5'
    
    // Novato State
    activeChamadoPathIndex: 0,
    activeEstudoIndex: 0,
    activeTreinoIndex: 0,
    activeConclusaoIndex: 0,
    
    // Active Modal
    activeModal: false
  };

  // Safe data getters
  function getFixedMissions() {
    return Array.isArray(DB.fixedMissions) ? DB.fixedMissions : [];
  }

  function getSeasonalMissions() {
    if (!DB.seasonalMissions) return [];
    if (Array.isArray(DB.seasonalMissions)) return DB.seasonalMissions;
    if (Array.isArray(DB.seasonalMissions.missions)) return DB.seasonalMissions.missions;
    return [];
  }

  function getAllMissions() {
    return [...getFixedMissions(), ...getSeasonalMissions()];
  }

  function getCurrentBanners() {
    return Array.isArray(DB.currentBanners) ? DB.currentBanners : (Array.isArray(DB.banners) ? DB.banners : []);
  }

  // DOM Elements Cache (populated in cacheDom)
  const dom = {};

  function cacheDom() {
    dom.tabBtns = document.querySelectorAll('.hub-tab-btn');
    dom.views = {
      operacoes: document.getElementById('view-operacoes'),
      banners: document.getElementById('view-banners'),
      novato: document.getElementById('view-novato')
    };
    
    // Operações Containers
    dom.campaignsGrid = document.getElementById('campaigns-grid');
    dom.missionsGrid = document.getElementById('missions-grid');
    dom.missionSearchInput = document.getElementById('mission-search-input');
    dom.missionTypePills = document.querySelectorAll('[data-filter-type]');
    dom.missionVariantPills = document.querySelectorAll('[data-filter-variant]');
    dom.missionSortSelect = document.getElementById('mission-sort-select');
    dom.missionCountDisplay = document.getElementById('mission-count-display');
    dom.btnClearFilters = document.getElementById('btn-clear-filters');
    
    // Banners Containers
    dom.bannerTabList = document.getElementById('banner-tab-list');
    dom.bannerShowcase = document.getElementById('banner-showcase-container');
    dom.prizesGrid = document.getElementById('prizes-grid');
    dom.prizeInspector = document.getElementById('prize-inspector-container');
    dom.rollTablesContainer = document.getElementById('roll-tables-container');
    dom.archiveGrid = document.getElementById('archive-grid');
    
    // Novato Containers
    dom.chamadoPathsContainer = document.getElementById('chamado-paths-container');
    dom.chamadoDetailsContainer = document.getElementById('chamado-details-container');
    dom.estudosPathsContainer = document.getElementById('estudos-paths-container');
    dom.estudosDetailsContainer = document.getElementById('estudos-details-container');
    dom.treinosPathsContainer = document.getElementById('treinos-paths-container');
    dom.treinosDetailsContainer = document.getElementById('treinos-details-container');
    dom.conclusaoPathsContainer = document.getElementById('conclusao-paths-container');
    dom.conclusaoDetailsContainer = document.getElementById('conclusao-details-container');
    
    // Universal Modal
    dom.modalBackdrop = document.getElementById('op-modal-backdrop');
    dom.modalBox = document.getElementById('op-modal-box');
    dom.modalTitle = document.getElementById('op-modal-title');
    dom.modalBody = document.getElementById('op-modal-body');
    dom.modalFooter = document.getElementById('op-modal-footer');
    dom.modalCloseBtn = document.getElementById('op-modal-close-btn');
  }

  /* ==========================================================================
     1. ROUTING & VIEW NAVIGATION
     ========================================================================== */

  function initRouting() {
    const params = new URLSearchParams(window.location.search);
    const viewParam = params.get('view');
    const bannerParam = params.get('banner');
    const prizeParam = params.get('premio');
    const refineParam = params.get('refino');
    const missionParam = params.get('missao');

    // Migration: If user visits /operacoes?view=banners, smoothly forward to /banners
    if (viewParam === 'banners') {
      const forwardParams = new URLSearchParams();
      if (bannerParam) forwardParams.set('banner', bannerParam);
      if (prizeParam) forwardParams.set('premio', prizeParam);
      if (refineParam) forwardParams.set('refino', refineParam);
      const queryString = forwardParams.toString();
      window.location.replace(`banners.html${queryString ? '?' + queryString : ''}`);
      return;
    }

    if (viewParam && ['operacoes', 'novato'].includes(viewParam)) {
      state.currentView = viewParam;
    }

    if (bannerParam && getCurrentBanners().find(b => b.id === bannerParam)) {
      state.activeBannerId = bannerParam;
    }

    if (prizeParam && DB.prizes[prizeParam]) {
      state.activePrizeId = prizeParam;
    }

    if (refineParam && ['R1', 'R2', 'R3', 'R4', 'R5'].includes(refineParam)) {
      state.activeRefineLevel = refineParam;
    }

    // Set initial active tab & view
    switchView(state.currentView, false);

    // Direct mission modal deep-link
    if (missionParam) {
      const targetMission = getAllMissions().find(m => m.id === missionParam || m.code === missionParam);
      if (targetMission) {
        setTimeout(() => openMissionModal(targetMission), 300);
      }
    }

    // Tab Button Handlers
    dom.tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const view = btn.getAttribute('data-view');
        switchView(view, true);
      });
    });

    // History popstate
    window.addEventListener('popstate', () => {
      const p = new URLSearchParams(window.location.search);
      const v = p.get('view') || 'operacoes';
      switchView(v, false);
    });
  }

  function switchView(viewName, updateUrl = true) {
    if (!dom.views[viewName]) return;
    state.currentView = viewName;

    // Toggle Tab Button Styles
    dom.tabBtns.forEach(btn => {
      const isTarget = btn.getAttribute('data-view') === viewName;
      btn.classList.toggle('active', isTarget);
      btn.setAttribute('aria-selected', isTarget ? 'true' : 'false');
    });

    // Toggle View Containers
    Object.keys(dom.views).forEach(vKey => {
      const viewEl = dom.views[vKey];
      if (viewEl) {
        if (vKey === viewName) {
          viewEl.classList.add('active');
        } else {
          viewEl.classList.remove('active');
        }
      }
    });

    if (updateUrl) {
      const url = new URL(window.location);
      url.searchParams.set('view', viewName);
      window.history.pushState({ view: viewName }, '', url);
    }

    // Render components on switch
    if (viewName === 'banners') {
      renderBannersView();
    } else if (viewName === 'operacoes') {
      renderMissionsCatalog();
    } else if (viewName === 'novato') {
      renderChamadoPaths();
      renderEstudosPaths();
      renderTreinosPaths();
      renderConclusaoPaths();
    }
  }

  /* ==========================================================================
     2. OPERAÇÕES VIEW: CAMPANHAS & CATÁLOGO DE MISSÕES
     ========================================================================== */

  function initOperacoesView() {
    renderCampaigns();
    renderMissionsCatalog();

    // Mission Search
    if (dom.missionSearchInput) {
      dom.missionSearchInput.addEventListener('input', (e) => {
        state.missionSearch = e.target.value.trim().toLowerCase();
        renderMissionsCatalog();
      });
    }

    // Mission Type Filter Pills
    dom.missionTypePills.forEach(pill => {
      pill.addEventListener('click', () => {
        dom.missionTypePills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        state.missionType = pill.getAttribute('data-filter-type');

        // Variant filters only enabled when not filtering strictly fixed
        const enableVariants = state.missionType !== 'permanentes';
        dom.missionVariantPills.forEach(vp => {
          vp.classList.toggle('disabled', !enableVariants);
        });

        renderMissionsCatalog();
      });
    });

    // Mission Variant Filter Pills
    dom.missionVariantPills.forEach(pill => {
      pill.addEventListener('click', () => {
        if (pill.classList.contains('disabled')) return;
        dom.missionVariantPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        state.missionVariant = pill.getAttribute('data-filter-variant');
        renderMissionsCatalog();
      });
    });

    // Mission Sort Dropdown
    if (dom.missionSortSelect) {
      dom.missionSortSelect.addEventListener('change', (e) => {
        state.missionSort = e.target.value;
        renderMissionsCatalog();
      });
    }

    // Clear Filters
    if (dom.btnClearFilters) {
      dom.btnClearFilters.addEventListener('click', () => {
        state.missionSearch = '';
        state.missionType = 'todas';
        state.missionVariant = 'todas';
        state.missionSort = 'original';

        if (dom.missionSearchInput) dom.missionSearchInput.value = '';
        if (dom.missionSortSelect) dom.missionSortSelect.value = 'original';

        dom.missionTypePills.forEach(p => p.classList.toggle('active', p.getAttribute('data-filter-type') === 'todas'));
        dom.missionVariantPills.forEach(p => {
          p.classList.remove('disabled');
          p.classList.toggle('active', p.getAttribute('data-filter-variant') === 'todas');
        });

        renderMissionsCatalog();
      });
    }

    // Scroll Anchor Links
    document.querySelectorAll('[data-scroll-anchor]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = btn.getAttribute('data-scroll-anchor');
        const targetEl = document.getElementById(targetId);
        if (targetEl) {
          targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });

    // Teasers
    const btnGoBanners = document.getElementById('btn-go-to-banners');
    if (btnGoBanners) {
      btnGoBanners.addEventListener('click', () => {
        switchView('banners', true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    const btnGoNovato = document.getElementById('btn-go-to-novato');
    if (btnGoNovato) {
      btnGoNovato.addEventListener('click', () => {
        switchView('novato', true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  }

  function renderCampaigns() {
    if (!dom.campaignsGrid) return;
    const campaigns = DB.campaigns || [];

    dom.campaignsGrid.innerHTML = campaigns.map((camp, idx) => {
      const isValiria = idx === 0;
      const badgeClass = isValiria ? 'badge-risk' : 'badge-sensitive';

      return `
        <div class="campaign-card" data-campaign-id="${camp.id}">
          <div class="campaign-card-img-wrap">
            <img src="${camp.image}" alt="${camp.title}" class="campaign-card-img" loading="lazy" onerror="this.onerror=null;this.src='assets/valiria_mission.jpg';">
            <div class="campaign-card-img-overlay"></div>
            <span class="campaign-badge ${badgeClass}">${camp.badge}</span>
          </div>
          <div class="campaign-card-body">
            <h3 class="campaign-card-title">${camp.title}</h3>
            <p class="text-sm text-[#cfc7b4] mb-4 leading-relaxed">${camp.summary}</p>
            
            <div class="campaign-meta-item">
              <span class="campaign-meta-label">LOCAL:</span>
              <span>${camp.location}</span>
            </div>
            <div class="campaign-meta-item">
              <span class="campaign-meta-label">FOCO:</span>
              <span>${camp.focus}</span>
            </div>
            <div class="campaign-meta-item mb-5">
              <span class="campaign-meta-label">ACESSO:</span>
              <span>${camp.participation}</span>
            </div>

            <div class="mt-auto flex flex-col sm:flex-row items-center gap-2 pt-2 border-t border-white/10">
              <button class="btn-gold-secondary w-full sm:w-auto flex-1 btn-read-dossier" data-campaign="${camp.id}">
                Ler dossiê
              </button>
              <a href="${DB.discordInvite}" target="_blank" rel="noopener noreferrer" class="btn-gold-primary w-full sm:w-auto flex-1 text-center" title="Acesse o canal de missões no Discord">
                Inscrever-se no Discord ↗
              </a>
            </div>
            <div class="text-xs text-[#8e8778] text-center mt-2.5">
              A inscrição é feita no canal de missões do Discord. Entre no servidor e consulte a convocação.
            </div>
          </div>
        </div>
      `;
    }).join('');

    // Attach Dossier Modal Triggers
    dom.campaignsGrid.querySelectorAll('.btn-read-dossier').forEach(btn => {
      btn.addEventListener('click', () => {
        const campId = btn.getAttribute('data-campaign');
        const camp = DB.campaigns.find(c => c.id === campId);
        if (camp) openCampaignDossierModal(camp);
      });
    });
  }

  function openCampaignDossierModal(camp) {
    const objectivesList = (camp.objectives || []).map(obj => `<li class="flex items-start gap-2 mb-1.5"><span class="text-[#f1d27a]">❖</span><span>${obj}</span></li>`).join('');

    const bodyHtml = `
      <div class="space-y-4">
        <div class="flex items-center gap-3">
          <span class="op-eyebrow mb-0">${camp.badge}</span>
          <span class="text-xs text-[#8e8778] font-mono">${camp.deadline}</span>
        </div>
        
        <div class="p-3.5 bg-black/40 border border-white/10 rounded-lg text-xs space-y-1.5 font-mono">
          <div><span class="text-[#f1d27a]">LOCAL:</span> ${camp.location}</div>
          <div><span class="text-[#f1d27a]">FOCO:</span> ${camp.focus}</div>
          <div><span class="text-[#f1d27a]">PARTICIPAÇÃO:</span> ${camp.participation}</div>
        </div>

        <div>
          <h4 class="font-cinzel text-sm text-[#f1d27a] font-bold uppercase tracking-wider mb-2">Dossiê Completo</h4>
          <div class="text-sm text-[#cfc7b4] leading-relaxed whitespace-pre-line bg-[#050608]/70 p-4 rounded border border-white/5 font-serif italic">
            ${camp.dossierFull}
          </div>
        </div>

        <div>
          <h4 class="font-cinzel text-sm text-[#f1d27a] font-bold uppercase tracking-wider mb-2">Objetivos Oficiais da Operação</h4>
          <ul class="text-xs text-[#cfc7b4] pl-1">
            ${objectivesList}
          </ul>
        </div>

        <div class="p-3 bg-[#d4af37]/10 border border-[#d4af37]/30 rounded text-xs text-[#f1d27a]">
          <strong>Instrução de Alistamento:</strong> A inscrição é feita no canal de missões do Discord. Entre no servidor e consulte a convocação da campanha escolhida.
        </div>
      </div>
    `;

    const footerHtml = `
      <button class="btn-gold-secondary" onclick="window.closeOpModal()">Fechar</button>
      <a href="${DB.discordInvite}" target="_blank" rel="noopener noreferrer" class="btn-gold-primary">
        Inscrever-se no Discord ↗
      </a>
    `;

    openModal(camp.title, bodyHtml, footerHtml);
  }

  function renderMissionsCatalog() {
    if (!dom.missionsGrid) return;

    let missions = [];

    // Filter by Type
    if (state.missionType === 'todas') {
      missions = getAllMissions();
    } else if (state.missionType === 'permanentes') {
      missions = getFixedMissions();
    } else if (state.missionType === 'temporarias') {
      missions = getSeasonalMissions();
    }

    // Filter by Variant (only for seasonal)
    if (state.missionVariant !== 'todas' && state.missionType !== 'permanentes') {
      missions = missions.filter(m => {
        if (m.type === 'fixa') return false;
        return m.variant === state.missionVariant;
      });
    }

    // Filter by Search Query
    if (state.missionSearch) {
      missions = missions.filter(m => {
        const text = `${m.title} ${m.location} ${m.summary} ${m.description || ''}`.toLowerCase();
        return text.includes(state.missionSearch);
      });
    }

    // Sort
    if (state.missionSort === 'nome') {
      missions.sort((a, b) => a.title.localeCompare(b.title));
    }

    // Counter Display
    if (dom.missionCountDisplay) {
      dom.missionCountDisplay.textContent = `${missions.length} atividade${missions.length === 1 ? '' : 's'} encontrada${missions.length === 1 ? '' : 's'}`;
    }

    // Empty State
    if (missions.length === 0) {
      dom.missionsGrid.innerHTML = `
        <div class="col-span-full py-16 text-center bg-[#0a0912] border border-white/10 rounded-xl p-8">
          <div class="text-3xl mb-3 text-[#d4af37]">❖</div>
          <h4 class="font-cinzel text-lg text-white font-bold mb-1">Nenhuma missão corresponde aos filtros.</h4>
          <p class="text-sm text-[#8e8778]">Tente outro termo ou limpe os filtros para ver todas as atividades.</p>
        </div>
      `;
      return;
    }

    dom.missionsGrid.innerHTML = missions.map(m => {
      const isFixed = m.type === 'fixa';
      let variantBadge = '';
      if (!isFixed && m.variant) {
        variantBadge = `
          <span class="mission-card-badge border border-white/10 bg-white/5 flex items-center">
            <span class="var-pip ${m.variant}"></span>
            ${m.variant.toUpperCase()}
          </span>
        `;
      } else {
        variantBadge = `<span class="mission-card-badge bg-[#d4af37]/15 text-[#f1d27a] border border-[#d4af37]/30">FIXA</span>`;
      }

      // Compact Rewards
      let rewardsHtml = '';
      if (m.rewardsList && m.rewardsList.length > 0) {
        rewardsHtml = m.rewardsList.map(r => {
          let extraClass = '';
          if (r.type === 'gold') extraClass = 'gold';
          else if (r.type === 'contas') extraClass = 'contas';
          else if (r.type === 'oracoes') extraClass = 'oracoes';
          return `<span class="reward-pill ${extraClass}">${r.label}</span>`;
        }).join('');
      } else if (m.rewards) {
        rewardsHtml = `<span class="reward-pill">${m.rewards}</span>`;
      }

      return `
        <div class="mission-card" data-mission-id="${m.id}">
          <div>
            <div class="mission-card-header">
              <h4 class="mission-card-title">${m.title}</h4>
              ${variantBadge}
            </div>

            <p class="mission-card-desc">${m.summary}</p>

            <div class="mission-card-meta">
              <div><strong class="text-[#cfc7b4]">Local:</strong> ${m.location}</div>
              ${m.frequency ? `<div><strong class="text-[#cfc7b4]">Frequência:</strong> ${m.frequency}</div>` : ''}
              ${m.recommendation ? `<div><strong class="text-[#cfc7b4]">Indicação:</strong> ${m.recommendation}</div>` : ''}
            </div>
          </div>

          <div>
            <div class="text-xs font-mono text-[#8e8778] uppercase tracking-wider mb-1.5 font-bold">Recompensas:</div>
            <div class="mission-reward-row">
              ${rewardsHtml}
            </div>

            <button class="btn-gold-secondary w-full py-2 text-xs font-bold btn-view-mission" data-mission="${m.id}">
              Ver procedimento
            </button>
          </div>
        </div>
      `;
    }).join('');

    // Attach Click Handlers
    dom.missionsGrid.querySelectorAll('.btn-view-mission').forEach(btn => {
      btn.addEventListener('click', () => {
        const mId = btn.getAttribute('data-mission');
        const mission = getAllMissions().find(x => x.id === mId);
        if (mission) openMissionModal(mission);
      });
    });
  }

  function openMissionModal(m) {
    const isFixed = m.type === 'fixa';

    const bodyHtml = `
      <div class="space-y-4">
        <div class="flex flex-wrap items-center justify-between gap-2">
          <span class="op-eyebrow mb-0">${isFixed ? 'MISSÃO PERMANENTE' : `MISSÃO TEMPORÁRIA • ${(m.variant || '').toUpperCase()}`}</span>
          ${m.frequency ? `<span class="text-xs font-mono text-[#8e8778]">${m.frequency}</span>` : ''}
        </div>

        <div class="p-3.5 bg-black/40 border border-white/10 rounded-lg text-xs space-y-1.5 font-mono">
          <div><span class="text-[#f1d27a]">LOCAL:</span> ${m.location}</div>
          ${m.recommendation ? `<div><span class="text-[#f1d27a]">INDICAÇÃO:</span> ${m.recommendation}</div>` : ''}
          ${m.delivery ? `<div><span class="text-[#f1d27a]">ENTREGA:</span> ${m.delivery}</div>` : ''}
        </div>

        <div>
          <h4 class="font-cinzel text-sm text-[#f1d27a] font-bold uppercase tracking-wider mb-2">Roteiro Canônico & Procedimento</h4>
          <div class="text-sm text-[#cfc7b4] leading-relaxed bg-[#050608]/70 p-4 rounded border border-white/5 font-serif whitespace-pre-line">
            ${m.description}
          </div>
        </div>

        <div class="p-3.5 bg-[#d4af37]/10 border border-[#d4af37]/30 rounded text-xs text-[#f1d27a]">
          <div class="font-bold font-mono uppercase tracking-wider mb-1">Recompensas da Conclusão:</div>
          <div class="text-sm font-bold">${m.rewards}</div>
        </div>
        ${isFixed ? `<p class="text-xs text-[#cfc7b4] leading-relaxed">Ao concluir, registre a atividade no <strong class="text-[#f1d27a]">Hub</strong> com o link dos seus turnos para receber a recompensa na ficha.</p>` : ''}
      </div>
    `;

    const footerHtml = `
      <button class="btn-gold-secondary" onclick="window.closeOpModal()">Fechar</button>
      ${isFixed
        ? `<a href="${DB.hubUrl}" target="_blank" rel="noopener noreferrer" class="btn-gold-primary">Registrar atividade no Hub ↗</a>`
        : `<a href="${DB.discordInvite}" target="_blank" rel="noopener noreferrer" class="btn-gold-primary">Inscrever-se no Discord ↗</a>`}
    `;

    openModal(m.title, bodyHtml, footerHtml);
  }

  /* ==========================================================================
     3. BANNERS MÍTICOS VIEW: CICLOS, PRÊMIOS, REFINOS & ROLAGENS
     ========================================================================== */

  function initBannersView() {
    renderBannerTabs();
    renderActiveBanner();
    renderArchiveGrid();

    const btnGoDiscordPray = document.getElementById('btn-go-discord-pray');
    if (btnGoDiscordPray) {
      btnGoDiscordPray.addEventListener('click', () => {
        window.open(DB.discordInvite, '_blank', 'noopener,noreferrer');
      });
    }
  }

  function renderBannersView() {
    renderBannerTabs();
    renderActiveBanner();
  }

  function renderBannerTabs() {
    if (!dom.bannerTabList) return;
    const banners = getCurrentBanners();

    dom.bannerTabList.innerHTML = banners.map(banner => {
      const isActive = banner.id === state.activeBannerId;
      return `
        <button class="banner-tab-item ${isActive ? 'active' : ''}" data-banner-id="${banner.id}">
          <div class="banner-tab-label">${banner.title}</div>
          <div class="banner-tab-sub">${banner.badge}</div>
        </button>
      `;
    }).join('');

    dom.bannerTabList.querySelectorAll('.banner-tab-item').forEach(btn => {
      btn.addEventListener('click', () => {
        const bId = btn.getAttribute('data-banner-id');
        const banner = getCurrentBanners().find(b => b.id === bId);
        if (banner) {
          state.activeBannerId = bId;
          if (banner.prizes && banner.prizes.length > 0) {
            state.activePrizeId = banner.prizes[0];
            state.activeRefineLevel = 'R1';
          }
          renderBannerTabs();
          renderActiveBanner();

          const url = new URL(window.location);
          url.searchParams.set('view', 'banners');
          url.searchParams.set('banner', bId);
          window.history.pushState({}, '', url);
        }
      });
    });
  }

  function renderActiveBanner() {
    const banner = getCurrentBanners().find(b => b.id === state.activeBannerId);
    if (!banner || !dom.bannerShowcase) return;

    // Featured art
    const firstPrizeKey = banner.prizes[0];
    const firstPrize = DB.prizes[firstPrizeKey] || {};
    const featuredArt = 'assets/valiria_mission.jpg';

    dom.bannerShowcase.innerHTML = `
      <div class="banner-featured-art-frame">
        <img src="${featuredArt}" alt="${banner.title}" class="banner-featured-art" onerror="this.onerror=null;this.src='assets/valiria_mission.jpg';">
        <div class="absolute bottom-3 left-3 bg-black/80 px-2.5 py-1 rounded text-xs font-mono border border-white/10 text-[#f1d27a]">
          ✦ COLEÇÃO ATIVA: ${banner.prizes.length} PRÊMIOS
        </div>
      </div>
      <div class="banner-details-col">
        <div class="flex items-center gap-2">
          <span class="op-eyebrow mb-0">${banner.type.toUpperCase()}</span>
          <span class="text-xs font-mono text-[#f1d27a]">${banner.deadline}</span>
        </div>

        <h2 class="font-cinzel text-2xl sm:text-3xl font-bold text-white leading-tight">
          ${banner.title}
        </h2>

        <p class="text-sm sm:text-base text-[#cfc7b4] leading-relaxed">
          ${banner.description}
        </p>

        <div class="p-3 bg-black/40 border border-white/10 rounded-lg text-xs font-mono text-[#cfc7b4] space-y-1">
          <div><span class="text-[#f1d27a]">Contador:</span> ${banner.type === 'temporario' ? 'Compartilhado entre banners temporários' : 'Separado (Permanente)'}</div>
          <div><span class="text-[#f1d27a]">Regra de Transição:</span> Preservado entre ciclos após encerramento</div>
          <div><span class="text-[#f1d27a]">Orações:</span> feitas no Hub, com pity salvo na sua conta</div>
        </div>

        <div class="flex flex-wrap items-center gap-3 pt-2">
          <a href="#prizes-catalog-anchor" class="btn-gold-primary">
            Ver prêmios da coleção ↓
          </a>
          <a href="#prayer-instructions-anchor" class="btn-gold-secondary">
            Como realizar orações
          </a>
        </div>
        <div class="text-xs text-[#8e8778]">
          Escolha o banner e marque o prêmio exclusivo desejado no Hub antes de orar.
        </div>
      </div>
    `;

    renderPrizesGrid(banner);
    renderPrizeInspector();
    renderRollTables(banner);
  }

  function renderPrizesGrid(banner) {
    if (!dom.prizesGrid) return;
    const prizeKeys = banner.prizes || [];

    dom.prizesGrid.innerHTML = prizeKeys.map(pKey => {
      const p = DB.prizes[pKey];
      if (!p) return '';
      const isSelected = p.id === state.activePrizeId;

      return `
        <div class="prize-card ${isSelected ? 'selected' : ''}" data-prize-id="${p.id}">
          <div>
            <span class="prize-nature-tag">${p.nature} ${p.classe ? `• ${p.classe}` : ''}</span>
            <h4 class="prize-card-title">${p.name}</h4>
            <div class="text-xs text-[#8e8778] mb-1 font-mono">${p.code}</div>
            <p class="text-xs text-[#cfc7b4] leading-relaxed mb-3">${p.summary}</p>
          </div>
          <button class="btn-gold-secondary w-full py-1.5 text-xs font-bold btn-inspect-prize" data-prize="${p.id}">
            Ver efeitos e refinamentos
          </button>
        </div>
      `;
    }).join('');

    dom.prizesGrid.querySelectorAll('.prize-card, .btn-inspect-prize').forEach(el => {
      el.addEventListener('click', () => {
        const pId = el.getAttribute('data-prize-id') || el.getAttribute('data-prize');
        if (pId && DB.prizes[pId]) {
          state.activePrizeId = pId;
          state.activeRefineLevel = 'R1';
          renderPrizesGrid(banner);
          renderPrizeInspector();

          const inspectorEl = document.getElementById('prize-inspector-anchor');
          if (inspectorEl) {
            inspectorEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          }
        }
      });
    });
  }

  function renderPrizeInspector() {
    if (!dom.prizeInspector) return;
    const prize = DB.prizes[state.activePrizeId];
    if (!prize) {
      dom.prizeInspector.innerHTML = `<div class="text-center py-8 text-[#8e8778]">Selecione um prêmio da lista acima.</div>`;
      return;
    }

    const currentLevel = state.activeRefineLevel;
    const isR1 = currentLevel === 'R1';
    const refineDelta = prize.refinements[currentLevel] || 'Sem alterações registradas.';

    dom.prizeInspector.innerHTML = `
      <div id="prize-inspector-anchor">
        <div class="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-4 mb-4">
          <div>
            <div class="flex items-center gap-2 mb-1">
              <span class="prize-nature-tag">${prize.nature}</span>
              ${prize.classe ? `<span class="text-xs font-mono text-[#f1d27a]">[${prize.classe}]</span>` : ''}
              <span class="text-xs font-mono text-[#8e8778]">• ${prize.code}</span>
            </div>
            <h3 class="font-cinzel text-xl sm:text-2xl font-bold text-white">${prize.name}</h3>
          </div>
          <button class="btn-gold-secondary text-xs btn-compare-refines" data-prize="${prize.id}">
            Comparar refinamentos (R1 a R5)
          </button>
        </div>

        <div class="mb-5">
          <h4 class="font-cinzel text-xs text-[#f1d27a] font-bold uppercase tracking-wider mb-2">Descrição Interpretativa & Origem</h4>
          <div class="text-xs sm:text-sm text-[#cfc7b4] leading-relaxed bg-[#050608]/70 p-4 rounded border border-white/5 font-serif italic">
            ${prize.interpretive}
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between mb-1">
            <h4 class="font-cinzel text-xs text-[#f1d27a] font-bold uppercase tracking-wider">Efeitos & Refinamentos</h4>
            <span class="text-xs font-mono text-[#8e8778]">Selecione o nível:</span>
          </div>

          <div class="refine-selector-bar">
            ${['R1', 'R2', 'R3', 'R4', 'R5'].map(lvl => `
              <button class="refine-pill-btn ${lvl === currentLevel ? 'active' : ''}" data-refine-level="${lvl}">
                ${lvl} ${lvl === 'R1' ? '(Base)' : ''}
              </button>
            `).join('')}
          </div>

          <div class="p-4 bg-black/60 border border-white/10 rounded-lg space-y-3">
            <div>
              <div class="font-mono text-xs font-bold text-[#f1d27a] uppercase mb-1">EFEITO BASE (R1):</div>
              <div class="text-xs sm:text-sm text-white font-mono leading-relaxed bg-[#050608] p-3 rounded border border-white/5">
                ${prize.r1Effect}
              </div>
            </div>

            ${!isR1 ? `
              <div>
                <div class="font-mono text-xs font-bold text-[#93c5fd] uppercase mb-1">ALTERAÇÕES ESPECÍFICAS DESTE NÍVEL (${currentLevel}):</div>
                <div class="text-xs sm:text-sm text-[#93c5fd] font-mono leading-relaxed bg-blue-950/20 p-3 rounded border border-blue-500/30">
                  ${refineDelta}
                </div>
              </div>
            ` : ''}

            <div class="text-xs text-[#8e8778] italic pt-1 border-t border-white/5 flex items-center gap-1.5">
              <svg class="w-3.5 h-3.5 text-amber-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
              <span><strong>Aviso Canônico:</strong> Leia o efeito base em conjunto com as alterações deste refinamento.</span>
            </div>
          </div>
        </div>
      </div>
    `;

    // Refinement Pill Buttons
    dom.prizeInspector.querySelectorAll('.refine-pill-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        state.activeRefineLevel = btn.getAttribute('data-refine-level');
        renderPrizeInspector();
      });
    });

    // Compare Refinements Modal
    const btnCompare = dom.prizeInspector.querySelector('.btn-compare-refines');
    if (btnCompare) {
      btnCompare.addEventListener('click', () => {
        openRefineComparisonModal(prize);
      });
    }
  }

  function openRefineComparisonModal(prize) {
    const tableRows = ['R1', 'R2', 'R3', 'R4', 'R5'].map(lvl => {
      const val = lvl === 'R1' ? prize.r1Effect : (prize.refinements[lvl] || '—');
      return `
        <tr>
          <td class="font-mono font-bold text-[#f1d27a] whitespace-nowrap">${lvl}</td>
          <td class="font-mono text-xs text-[#cfc7b4] leading-relaxed">${val}</td>
        </tr>
      `;
    }).join('');

    const bodyHtml = `
      <div class="space-y-4">
        <div class="text-xs text-[#8e8778]">
          Tabela comparativa dos cinco níveis de refinamento de <strong>${prize.name}</strong>. O refino é feito no Hub: cada nível consome uma cópia R1 livre do mesmo prêmio.
        </div>
        <table class="roll-table">
          <thead>
            <tr>
              <th style="width: 70px;">Nível</th>
              <th>Efeitos e Modificadores Canônicos</th>
            </tr>
          </thead>
          <tbody>
            ${tableRows}
          </tbody>
        </table>
        <div class="text-xs text-[#8e8778] italic">
          Leia o efeito base em conjunto com as alterações de cada nível. Prêmios refinados alcançam a marca de seis estrelas e não podem ser alterados por outras vias.
        </div>
      </div>
    `;

    const footerHtml = `
      <button class="btn-gold-secondary" onclick="window.closeOpModal()">Fechar</button>
    `;

    openModal(`Comparativo de Refinos: ${prize.name}`, bodyHtml, footerHtml);
  }

  function renderRollTables(banner) {
    if (!dom.rollTablesContainer) return;

    let tablesHtml = '';

    if (banner.id === 'vestigios-da-divergencia') {
      tablesHtml = `
        <div class="space-y-4">
          <div class="p-3.5 bg-[#d4af37]/10 border border-[#d4af37]/30 rounded text-xs text-[#f1d27a]">
            <strong>Joia do Destino:</strong> Objeto utilizado para aprimorar a criação de artefatos. Permite definir um atributo principal e um subatributo. Se usada com outra joia, a segunda define dois subatributos. A variante lendária acrescenta +1; a variante morte súbita acrescenta +3, conforme a regra original.
          </div>

          <div>
            <h4 class="font-cinzel text-xs font-bold text-white uppercase tracking-wider mb-2">Primeira Rolagem (1d30) — Vestígios</h4>
            <table class="roll-table">
              <thead><tr><th>Dado (1d30)</th><th>Resultado</th><th>Premiação Concedida</th></tr></thead>
              <tbody>
                ${banner.firstRollTable.ranges.map(f => `<tr><td class="font-mono text-[#f1d27a]">1d30</td><td class="font-mono">${f.range}</td><td>${f.result}</td></tr>`).join('')}
              </tbody>
            </table>
          </div>

          <div>
            <h4 class="font-cinzel text-xs font-bold text-white uppercase tracking-wider mb-2">Segunda Rolagem (1d30) — Prêmios Exclusivos</h4>
            <div class="p-2.5 bg-yellow-950/20 border border-yellow-500/30 rounded text-xs text-yellow-200 mb-2 flex items-start gap-2">
              <svg class="w-4 h-4 text-amber-400 shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
              <span><strong>Pendência Canônica do Resultado 26:</strong> O resultado 26 aparece tanto para <em>The List</em> quanto para <em>Fenthras</em> na documentação original. O resultado 26 deve ser confirmado pela moderação no Discord antes da definição do prêmio.</span>
            </div>
            <table class="roll-table">
              <thead><tr><th>Resultado</th><th>Prêmio Exclusivo Atribuído</th></tr></thead>
              <tbody>
                ${banner.secondRollTable.ranges.map(f => `<tr><td class="font-mono text-[#f1d27a] font-bold">${f.range}</td><td>${f.result}</td></tr>`).join('')}
              </tbody>
            </table>
          </div>
        </div>
      `;
    } else {
      const hasTerceira = !!banner.thirdRollTable;

      tablesHtml = `
        <div class="space-y-4">
          <div class="p-2.5 bg-yellow-950/20 border border-yellow-500/30 rounded text-xs text-yellow-200 flex items-start gap-2">
            <svg class="w-4 h-4 text-amber-400 shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
            <span><strong>Instrução da Moderação:</strong> A sequência de rolagens de bênçãos (19–20 na segunda rolagem e desdobramento da terceira) deve ser confirmada com a moderação antes de usar suas orações.</span>
          </div>

          <div>
            <h4 class="font-cinzel text-xs font-bold text-white uppercase tracking-wider mb-2">Primeira Rolagem (1d20) — Geral</h4>
            <table class="roll-table">
              <thead><tr><th>Dado</th><th>Resultado</th><th>Prêmio</th></tr></thead>
              <tbody>
                ${banner.firstRollTable.ranges.map(f => `<tr><td class="font-mono text-[#f1d27a]">1d20</td><td class="font-mono">${f.range}</td><td>${f.result}</td></tr>`).join('')}
              </tbody>
            </table>
            <div class="text-xs text-[#8e8778] italic mt-1">${banner.firstRollTable.note || ''}</div>
          </div>

          <div>
            <h4 class="font-cinzel text-xs font-bold text-white uppercase tracking-wider mb-2">Segunda Rolagem (1d20) — ${banner.title}</h4>
            <table class="roll-table">
              <thead><tr><th>Resultado</th><th>Prêmio Atribuído</th></tr></thead>
              <tbody>
                ${banner.secondRollTable.ranges.map(f => `<tr><td class="font-mono text-[#f1d27a] font-bold">${f.range}</td><td>${f.result}</td></tr>`).join('')}
              </tbody>
            </table>
          </div>

          ${hasTerceira ? `
            <div>
              <h4 class="font-cinzel text-xs font-bold text-white uppercase tracking-wider mb-2">Terceira Rolagem (1d20) — Bênçãos Especiais</h4>
              <table class="roll-table">
                <thead><tr><th>Resultado</th><th>Bênção Exclusiva</th></tr></thead>
                <tbody>
                  ${banner.thirdRollTable.ranges.map(f => `<tr><td class="font-mono text-[#f1d27a] font-bold">${f.range}</td><td>${f.result}</td></tr>`).join('')}
                </tbody>
              </table>
              <div class="text-xs text-[#8e8778] italic mt-1">${banner.thirdRollTable.note || ''}</div>
            </div>
          ` : ''}
        </div>
      `;
    }

    dom.rollTablesContainer.innerHTML = tablesHtml;
  }

  function renderArchiveGrid() {
    if (!dom.archiveGrid) return;
    const collections = DB.historicalBanners || [];

    dom.archiveGrid.innerHTML = collections.map(col => {
      return `
        <div class="bg-[#0f0e1a] border border-white/10 rounded-lg p-5 flex flex-col justify-between hover:border-[#d4af37]/40 transition">
          <div>
            <div class="flex items-center justify-between mb-2">
              <span class="text-xs font-mono uppercase bg-white/5 border border-white/10 text-[#8e8778] px-2 py-0.5 rounded">${col.badge}</span>
              <span class="text-xs text-[#d4af37]">✦ ${col.code}</span>
            </div>
            <h4 class="font-cinzel text-base font-bold text-white mb-2">${col.title}</h4>
            <p class="text-xs text-[#cfc7b4] leading-relaxed mb-4">${col.summary}</p>
          </div>
          <button class="btn-gold-secondary w-full py-2 text-xs font-bold btn-open-archive" data-archive="${col.id}">
            Consultar coleção e prêmios
          </button>
        </div>
      `;
    }).join('');

    dom.archiveGrid.querySelectorAll('.btn-open-archive').forEach(btn => {
      btn.addEventListener('click', () => {
        const aId = btn.getAttribute('data-archive');
        const col = DB.historicalBanners.find(c => c.id === aId);
        if (col) openArchiveModal(col);
      });
    });
  }

  function openArchiveModal(col) {
    const bodyHtml = `
      <div class="space-y-4">
        <div class="flex items-center gap-2">
          <span class="text-xs font-mono uppercase bg-white/10 text-[#f1d27a] px-2.5 py-1 rounded">${col.badge}</span>
          <span class="text-xs text-[#8e8778]">Coleção Histórica Preservada</span>
        </div>
        <p class="text-xs text-[#cfc7b4] leading-relaxed">
          ${col.summary} Banners arquivados permanecem disponíveis para consulta de lore e refinamentos, mas não aceitam novas orações ativas.
        </p>
        <div class="border-t border-white/10 pt-4">
          <h4 class="font-cinzel text-sm text-[#f1d27a] font-bold uppercase tracking-wider mb-2">Registro Textual Integral do Acervo</h4>
          <div class="text-xs text-[#cfc7b4] leading-relaxed whitespace-pre-line bg-[#050608] p-4 rounded border border-white/5 font-mono max-h-[480px] overflow-y-auto">
            ${col.contentFull}
          </div>
        </div>
      </div>
    `;

    const footerHtml = `
      <button class="btn-gold-secondary" onclick="window.closeOpModal()">Fechar</button>
    `;

    openModal(col.title, bodyHtml, footerHtml);
  }

  /* ==========================================================================
     4. NOVATO PREMIUM VIEW: ATO I, INGRESSO, ESTUDOS, TREINOS & PROVA
     ========================================================================== */

  function initNovatoView() {
    renderChamadoPaths();
    renderEstudosPaths();
    renderTreinosPaths();
    renderConclusaoPaths();
  }

  function getAct1Missions() {
    return (DB.novatoPremium && Array.isArray(DB.novatoPremium.act1Missions))
      ? DB.novatoPremium.act1Missions
      : ((DB.novatoAtoI && Array.isArray(DB.novatoAtoI.missions)) ? DB.novatoAtoI.missions : []);
  }

  function formatParagraphs(text) {
    if (!text) return '';
    return text.split(/\n\n+/).map(p => `<p class="mb-3 last:mb-0 leading-relaxed">${p.replace(/\n/g, '<br>')}</p>`).join('');
  }

  // ── 4.1. INGRESSO: O CHAMADO DO HERÓI (4 CAMINHOS) ──
  function renderChamadoPaths() {
    if (!dom.chamadoPathsContainer || !dom.chamadoDetailsContainer) return;
    const missions = getAct1Missions();
    const chamado = missions.find(m => m.id === 'n-01');
    if (!chamado) return;

    const paths = chamado.paths || chamado.options || [];
    if (!paths.length) return;
    const activeIdx = Math.min(state.activeChamadoPathIndex, paths.length - 1);

    // Render path selection cards
    dom.chamadoPathsContainer.innerHTML = paths.map((p, idx) => {
      const isSelected = idx === activeIdx;
      return `
        <div class="path-choice-card ${isSelected ? 'selected' : ''}" data-path-idx="${idx}">
          <div class="flex items-center justify-between mb-1.5">
            <span class="font-cinzel text-xs font-bold text-white">${p.code || ('Opção ' + (idx + 1))}</span>
            ${isSelected ? '<span class="text-xs text-[#f1d27a] font-bold">Ativa</span>' : ''}
          </div>
          <div class="font-cinzel text-sm font-bold text-[#f1d27a] mb-1 leading-snug">${p.name}</div>
          <p class="text-xs text-[#cfc7b4] line-clamp-2">${p.summary || p.desc}</p>
        </div>
      `;
    }).join('');

    // Render active path details
    const activePath = paths[activeIdx];
    dom.chamadoDetailsContainer.innerHTML = `
      <div class="p-6 bg-[#100e08] border border-[#d4af37]/30 rounded-xl space-y-5 shadow-2xl">
        <div class="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
          <div>
            <span class="op-eyebrow mb-1">CAMINHO ESCOLHIDO • ${activePath.code || ('OPÇÃO ' + (activeIdx + 1))}</span>
            <h4 class="font-cinzel text-xl font-bold text-white">${activePath.name}</h4>
          </div>
          <div class="text-xs font-mono text-[#f1d27a] bg-[#d4af37]/10 px-3.5 py-1.5 rounded border border-[#d4af37]/25">
            Local: ${activePath.location}
          </div>
        </div>

        <div>
          <h5 class="font-cinzel text-xs text-[#f1d27a] font-bold uppercase tracking-wider mb-2 flex items-center gap-2">
            <svg class="w-4 h-4 text-[#f1d27a]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
            <span>Roteiro Canônico de Narrativa (Texto Integral)</span>
          </h5>
          <div class="text-xs sm:text-sm text-[#e2ded6] bg-[#070604] p-5 rounded-lg border border-white/10 font-serif italic">
            ${formatParagraphs(activePath.desc)}
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
          <div class="p-4 bg-white/5 border border-white/10 rounded-lg space-y-1">
            <div class="font-bold text-white flex items-center gap-1.5 mb-1 text-sm font-cinzel">
              <svg class="w-4 h-4 text-[#f1d27a]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 14 14"/></svg>
              <span>Requisitos de Finalização:</span>
            </div>
            <div class="text-[#cfc7b4] font-sans">${activePath.requirements || 'Pelo menos 2 turnos. Em algumas será necessário um veterano, nem que seja como NPC.'}</div>
          </div>
          <div class="p-4 bg-white/5 border border-white/10 rounded-lg space-y-1">
            <div class="font-bold text-white flex items-center gap-1.5 mb-1 text-sm font-cinzel">
              <svg class="w-4 h-4 text-[#f1d27a]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              <span>Local para Postar:</span>
            </div>
            <div class="text-[#cfc7b4] font-sans">${activePath.location}</div>
          </div>
        </div>

        <!-- Reward Breakdown -->
        <div class="p-5 bg-gradient-to-r from-[#d4af37]/15 to-[#f1d27a]/10 border border-[#d4af37]/35 rounded-xl space-y-2.5 text-xs font-mono">
          <div class="font-bold font-cinzel text-sm text-[#f1d27a] uppercase tracking-wider flex items-center gap-2">
            <svg class="w-4 h-4 text-[#f1d27a]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 12 20 22 4 22 4 12"/><rect x="2" y="7" width="20" height="5"/><line x1="12" y1="22" x2="12" y2="7"/><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/></svg>
            <span>Premiações do Chamado do Herói:</span>
          </div>
          <div class="text-[#e2ded6]"><strong class="text-white">Individual / Todas as Opções:</strong> ${chamado.rewardsStandard || '300 gold, 200 Contas Celestiais e 100 Fragmentos de Aura.'}</div>
          <div class="text-[#e2ded6]"><strong class="text-white">Em Grupo (Mínimo 3 pessoas):</strong> ${chamado.rewardsGroup || '500 Golds, 500 Contas Celestiais e 200 Fragmentos de Aura.'}</div>
          <div class="pt-2 border-t border-[#d4af37]/20 text-[#f1d27a]">
            <strong>Veteranos que auxiliam:</strong> ${chamado.veteranRewards || 'Por ajudar a salvar as crianças, ganham o prêmio da Scylla (1.200 XP, 1.000 Contas Celestiais e 25 Orações) e não conta no limite semanal.'}
          </div>
        </div>
      </div>
    `;

    // Click handlers
    dom.chamadoPathsContainer.querySelectorAll('.path-choice-card').forEach(card => {
      card.addEventListener('click', () => {
        const idx = parseInt(card.getAttribute('data-path-idx'), 10);
        if (!isNaN(idx)) {
          state.activeChamadoPathIndex = idx;
          renderChamadoPaths();
        }
      });
    });
  }

  // ── 4.2. ESTUDOS TEÓRICOS (6 MÓDULOS NO HEPHAESTUS TECH) ──
  function renderEstudosPaths() {
    if (!dom.estudosPathsContainer || !dom.estudosDetailsContainer) return;
    const missions = getAct1Missions();
    const estudos = missions.filter(m => m.category === 'Estudos' || (m.code && m.code.startsWith('N-0') && parseInt(m.code.slice(2)) >= 2 && parseInt(m.code.slice(2)) <= 7));
    if (!estudos.length) return;

    const activeIdx = Math.min(state.activeEstudoIndex, estudos.length - 1);

    // Render choice cards
    dom.estudosPathsContainer.innerHTML = estudos.map((est, idx) => {
      const isSelected = idx === activeIdx;
      return `
        <div class="estudo-choice-card ${isSelected ? 'selected' : ''}" data-estudo-idx="${idx}">
          <div>
            <div class="flex items-center justify-between mb-2">
              <span class="text-xs font-mono text-[#f1d27a] font-bold uppercase">${est.studyNumber || ('Estudo ' + (idx + 1))}</span>
              <span class="text-xs font-mono bg-green-500/15 text-green-300 border border-green-500/30 px-2 py-0.5 rounded">+1 na Prova</span>
            </div>
            <h4 class="font-cinzel text-sm font-bold text-white mb-1.5 leading-snug">${est.title}</h4>
            <div class="text-xs font-mono text-[#8e8778] mb-2">${est.notebookNotice || 'Notebook Hephaestus Tech'}</div>
          </div>
          <div class="pt-2 border-t border-white/10 flex items-center justify-between text-xs font-mono">
            <span class="text-[#cfc7b4]">50 Aura • 200 Gold</span>
            <span class="text-[#f1d27a] font-bold">${isSelected ? 'Selecionado' : 'Ler estudo →'}</span>
          </div>
        </div>
      `;
    }).join('');

    // Render active estudo details
    const activeEstudo = estudos[activeIdx];
    const hasLoreBreak = activeEstudo.loreBreak && activeEstudo.loreBreak.content;

    dom.estudosDetailsContainer.innerHTML = `
      <div class="p-6 bg-[#100e08] border border-[#d4af37]/30 rounded-xl space-y-5 shadow-2xl">
        <div class="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
          <div>
            <span class="op-eyebrow mb-1">${activeEstudo.studyNumber || 'ESTUDO'} • NOTEBOOK HEPHAESTUS TECH</span>
            <h4 class="font-cinzel text-xl font-bold text-white">${activeEstudo.title}</h4>
            <div class="text-xs font-mono text-[#f1d27a] mt-1">${activeEstudo.notebookNotice || 'Notebook Hephaestus Tech'}</div>
          </div>
          <div class="text-xs font-mono bg-green-500/15 text-green-300 border border-green-500/30 px-3 py-1.5 rounded">
            ${activeEstudo.examBonus || '+1 Sucesso na Prova Escrita'}
          </div>
        </div>

        <div>
          <h5 class="font-cinzel text-xs text-[#f1d27a] font-bold uppercase tracking-wider mb-2 flex items-center gap-2">
            <svg class="w-4 h-4 text-[#f1d27a]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
            <span>Roteiro Canônico de Estudo (Texto Integral)</span>
          </h5>
          <div class="text-xs sm:text-sm text-[#e2ded6] bg-[#070604] p-5 rounded-lg border border-white/10 font-serif leading-relaxed">
            ${formatParagraphs(activeEstudo.desc)}
          </div>
        </div>

        ${hasLoreBreak ? `
          <!-- Pausa para a Lore -->
          <div class="lore-break-box space-y-2.5">
            <div class="flex items-center gap-2 text-sm font-cinzel font-bold text-[#f1d27a]">
              <svg class="w-4 h-4 text-[#f1d27a]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
              <span>${activeEstudo.loreBreak.title}</span>
            </div>
            <div class="text-xs sm:text-sm text-[#f3e5ab] font-serif leading-relaxed">
              ${formatParagraphs(activeEstudo.loreBreak.content)}
            </div>
          </div>
        ` : ''}

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
          <div class="p-4 bg-white/5 border border-white/10 rounded-lg space-y-1">
            <div class="font-bold text-white flex items-center gap-1.5 mb-1 font-cinzel text-xs">
              <svg class="w-3.5 h-3.5 text-[#f1d27a]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 14 14"/></svg>
              <span>Requisitos:</span>
            </div>
            <div class="text-[#cfc7b4] font-sans">${activeEstudo.requirements || 'Pelo menos 1 turno do seu personagem.'}</div>
          </div>
          <div class="p-4 bg-white/5 border border-white/10 rounded-lg space-y-1">
            <div class="font-bold text-white flex items-center gap-1.5 mb-1 font-cinzel text-xs">
              <svg class="w-3.5 h-3.5 text-[#f1d27a]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              <span>Local de Postagem:</span>
            </div>
            <div class="text-[#cfc7b4] font-sans">${activeEstudo.location}</div>
          </div>
          <div class="p-4 bg-[#d4af37]/10 border border-[#d4af37]/25 rounded-lg space-y-1">
            <div class="font-bold text-[#f1d27a] flex items-center gap-1.5 mb-1 font-cinzel text-xs">
              <svg class="w-3.5 h-3.5 text-[#f1d27a]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 12 20 22 4 22 4 12"/><rect x="2" y="7" width="20" height="5"/><line x1="12" y1="22" x2="12" y2="7"/></svg>
              <span>Premiação:</span>
            </div>
            <div class="text-white">${activeEstudo.rewards}</div>
            <div class="text-green-300 text-xs font-bold">${activeEstudo.examBonus}</div>
          </div>
        </div>
      </div>
    `;

    // Click handlers
    dom.estudosPathsContainer.querySelectorAll('.estudo-choice-card').forEach(card => {
      card.addEventListener('click', () => {
        const idx = parseInt(card.getAttribute('data-estudo-idx'), 10);
        if (!isNaN(idx)) {
          state.activeEstudoIndex = idx;
          renderEstudosPaths();
        }
      });
    });
  }

  // ── 4.3. TREINAMENTOS PRÁTICOS (2 MÓDULOS DE COMBATE) ──
  function renderTreinosPaths() {
    if (!dom.treinosPathsContainer || !dom.treinosDetailsContainer) return;
    const missions = getAct1Missions();
    const treinos = missions.filter(m => m.category === 'Treinamentos' || m.id === 'n-08' || m.id === 'n-09');
    if (!treinos.length) return;

    const activeIdx = Math.min(state.activeTreinoIndex, treinos.length - 1);

    // Render choice cards
    dom.treinosPathsContainer.innerHTML = treinos.map((tr, idx) => {
      const isSelected = idx === activeIdx;
      return `
        <div class="treino-choice-card ${isSelected ? 'selected' : ''}" data-treino-idx="${idx}">
          <div>
            <div class="flex items-center justify-between mb-2">
              <span class="text-xs font-mono text-[#f1d27a] font-bold uppercase">${tr.trainingNumber || ('Treino ' + (idx + 1))}</span>
              <span class="text-xs font-mono text-blue-300 bg-blue-950/40 border border-blue-500/30 px-2.5 py-0.5 rounded">Combate Físico</span>
            </div>
            <h4 class="font-cinzel text-base font-bold text-white mb-1.5">${tr.title}</h4>
            <p class="text-xs text-[#cfc7b4] mb-2">${tr.subtitle || ''}</p>
          </div>
          <div class="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono">
            <span class="text-green-300">Sucesso: 70 Aura + 10 Orações</span>
            <span class="text-[#f1d27a] font-bold">${isSelected ? 'Selecionado' : 'Acessar treino →'}</span>
          </div>
        </div>
      `;
    }).join('');

    // Render active treino details
    const activeTreino = treinos[activeIdx];
    dom.treinosDetailsContainer.innerHTML = `
      <div class="p-6 bg-[#100e08] border border-[#d4af37]/30 rounded-xl space-y-5 shadow-2xl">
        <div class="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
          <div>
            <span class="op-eyebrow mb-1">${activeTreino.trainingNumber || 'TREINAMENTO'} • SIMULAÇÃO DE COMBATE</span>
            <h4 class="font-cinzel text-xl font-bold text-white">${activeTreino.title}</h4>
            <div class="text-xs font-mono text-[#f1d27a] mt-1">${activeTreino.subtitle || ''}</div>
          </div>
          <div class="text-xs font-mono text-[#cfc7b4] bg-white/5 border border-white/10 px-3 py-1.5 rounded">
            Local: ${activeTreino.location}
          </div>
        </div>

        <div>
          <h5 class="font-cinzel text-xs text-[#f1d27a] font-bold uppercase tracking-wider mb-2 flex items-center gap-2">
            <svg class="w-4 h-4 text-[#f1d27a]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.5 17.5L3 6V3h3l11.5 11.5M13 19l6 2 2-6-4.5-4.5"/></svg>
            <span>Roteiro Canônico da Simulação (Texto Integral)</span>
          </h5>
          <div class="text-xs sm:text-sm text-[#e2ded6] bg-[#070604] p-5 rounded-lg border border-white/10 font-serif leading-relaxed">
            ${formatParagraphs(activeTreino.desc)}
          </div>
        </div>

        <!-- Mechanics Box -->
        <div class="p-5 bg-white/5 border border-white/10 rounded-xl space-y-2 text-xs font-mono">
          <div class="font-cinzel font-bold text-sm text-[#f1d27a] uppercase mb-2 flex items-center gap-2">
            <svg class="w-4 h-4 text-[#f1d27a]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
            <span>Procedimento e Sistema de Dados:</span>
          </div>
          <div><strong class="text-white">Ações Permitidas:</strong> ${activeTreino.mechanics.actionsAllowed}</div>
          <div><strong class="text-white">Rolagem do Adversário:</strong> <code class="bg-black/60 px-2 py-0.5 rounded text-[#f1d27a] border border-white/10">${activeTreino.mechanics.androidRoll}</code></div>
          <div><strong class="text-white">Condição de Vitória:</strong> ${activeTreino.mechanics.condition}</div>
          ${activeTreino.mechanics.bonus ? `<div class="text-yellow-300 font-bold mt-1">✦ ${activeTreino.mechanics.bonus}</div>` : ''}
        </div>

        <!-- Rewards Dual Cards -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
          <div class="p-4 bg-green-950/20 border border-green-500/40 rounded-xl space-y-1.5 text-green-300">
            <div class="font-bold text-white text-sm font-cinzel flex items-center gap-1.5">
              <svg class="w-4 h-4 text-green-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h2"/><path d="M18 9h2a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2h-2"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.45 1-1 1H7v4h10v-4h-2c-.55 0-1-.45-1-1v-2.34"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2z"/></svg>
              <span>Em Caso de Sucesso:</span>
            </div>
            <div class="text-base text-green-400 font-bold">${activeTreino.rewardsSuccess}</div>
          </div>
          <div class="p-4 bg-red-950/20 border border-red-500/40 rounded-xl space-y-1.5 text-red-300">
            <div class="font-bold text-white text-sm font-cinzel flex items-center gap-1.5">
              <svg class="w-4 h-4 text-red-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
              <span>Em Caso de Falha:</span>
            </div>
            <div class="text-base text-red-400 font-bold">${activeTreino.rewardsFail}</div>
          </div>
        </div>
      </div>
    `;

    // Click handlers
    dom.treinosPathsContainer.querySelectorAll('.treino-choice-card').forEach(card => {
      card.addEventListener('click', () => {
        const idx = parseInt(card.getAttribute('data-treino-idx'), 10);
        if (!isNaN(idx)) {
          state.activeTreinoIndex = idx;
          renderTreinosPaths();
        }
      });
    });
  }

  // ── 4.4. CONCLUSÃO DO ATO I (ENTREVISTA E PROVA ESCRITA) ──
  function renderConclusaoPaths() {
    if (!dom.conclusaoPathsContainer || !dom.conclusaoDetailsContainer) return;
    const missions = getAct1Missions();
    const conclusoes = missions.filter(m => m.category === 'Conclusão' || m.id === 'n-10' || m.id === 'n-11');
    if (!conclusoes.length) return;

    const activeIdx = Math.min(state.activeConclusaoIndex, conclusoes.length - 1);

    // Render choice cards
    dom.conclusaoPathsContainer.innerHTML = conclusoes.map((conc, idx) => {
      const isSelected = idx === activeIdx;
      const isExam = conc.id === 'n-11';
      return `
        <div class="conclusao-choice-card ${isSelected ? 'selected' : ''}" data-conclusao-idx="${idx}">
          <div>
            <div class="flex items-center justify-between mb-2">
              <span class="text-xs font-mono text-[#f1d27a] font-bold uppercase">${conc.conclusionNumber || ('Etapa ' + (idx + 1))}</span>
              <span class="text-xs font-mono ${isExam ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/40' : 'bg-white/10 text-white border border-white/20'} px-2.5 py-0.5 rounded">
                ${isExam ? 'Prova Final' : 'Escolha de Ofício'}
              </span>
            </div>
            <h4 class="font-cinzel text-base font-bold text-white mb-1.5">${conc.title}</h4>
            <p class="text-xs text-[#cfc7b4] mb-2">${conc.subtitle || ''}</p>
          </div>
          <div class="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono">
            <span class="text-[#f1d27a] font-bold">${isExam ? '1.100 XP (Atinge Nível 3)' : '200 Contas + 200 Aura'}</span>
            <span class="text-white font-bold">${isSelected ? 'Selecionada' : 'Ver detalhes →'}</span>
          </div>
        </div>
      `;
    }).join('');

    // Render active conclusao details
    const activeConc = conclusoes[activeIdx];
    const isExam = activeConc.id === 'n-11';

    dom.conclusaoDetailsContainer.innerHTML = `
      <div class="p-6 bg-[#100e08] border border-[#d4af37]/35 rounded-xl space-y-5 shadow-2xl">
        <div class="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
          <div>
            <span class="op-eyebrow mb-1">${activeConc.conclusionNumber || 'CONCLUSÃO'} • RITO DE PASSAGEM</span>
            <h4 class="font-cinzel text-xl font-bold text-white">${activeConc.title}</h4>
            <div class="text-xs font-mono text-[#f1d27a] mt-1">${activeConc.subtitle || ''}</div>
          </div>
          <div class="text-xs font-mono text-[#cfc7b4] bg-white/5 border border-white/10 px-3 py-1.5 rounded">
            Local: ${activeConc.location}
          </div>
        </div>

        <div>
          <h5 class="font-cinzel text-xs text-[#f1d27a] font-bold uppercase tracking-wider mb-2 flex items-center gap-2">
            <svg class="w-4 h-4 text-[#f1d27a]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
            <span>Roteiro Canônico (Texto Integral)</span>
          </h5>
          <div class="text-xs sm:text-sm text-[#e2ded6] bg-[#070604] p-5 rounded-lg border border-white/10 font-serif leading-relaxed">
            ${formatParagraphs(activeConc.desc)}
          </div>
        </div>

        <!-- Rules & Dices Box -->
        <div class="p-5 bg-white/5 border border-white/10 rounded-xl space-y-2.5 text-xs font-mono">
          <div class="font-cinzel font-bold text-sm text-[#f1d27a] uppercase mb-1.5 flex items-center gap-2">
            <svg class="w-4 h-4 text-[#f1d27a]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="4" ry="4"/><circle cx="8" cy="8" r="1.5" fill="currentColor"/><circle cx="16" cy="16" r="1.5" fill="currentColor"/><circle cx="12" cy="12" r="1.5" fill="currentColor"/></svg>
            <span>Sistema de Dados e Procedimentos:</span>
          </div>
          <div class="text-[#cfc7b4]"><strong class="text-white">Requisitos:</strong> ${activeConc.requirements}</div>
          <div class="text-[#e2ded6] font-sans leading-relaxed pt-2 border-t border-white/10">
            ${formatParagraphs(activeConc.diceRules)}
          </div>
        </div>

        <!-- Reward Card -->
        <div class="p-5 ${isExam ? 'bg-gradient-to-r from-[#d4af37]/25 via-[#f1d27a]/20 to-[#d4af37]/25 border border-[#f1d27a]/50' : 'bg-[#d4af37]/10 border border-[#d4af37]/30'} rounded-xl space-y-2 text-xs font-mono">
          <div class="font-cinzel font-bold text-sm text-[#f1d27a] uppercase flex items-center gap-2">
            <svg class="w-4 h-4 text-[#f1d27a]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 4l3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14v2H5v-2z"/></svg>
            <span>Premiação Canônica de Conclusão:</span>
          </div>
          <div class="text-sm font-bold text-white">${activeConc.rewards}</div>
        </div>
      </div>
    `;

    // Click handlers
    dom.conclusaoPathsContainer.querySelectorAll('.conclusao-choice-card').forEach(card => {
      card.addEventListener('click', () => {
        const idx = parseInt(card.getAttribute('data-conclusao-idx'), 10);
        if (!isNaN(idx)) {
          state.activeConclusaoIndex = idx;
          renderConclusaoPaths();
        }
      });
    });
  }

  /* ==========================================================================
     5. UNIVERSAL ACCESSIBLE MODAL CONTROLLER
     ========================================================================== */

  function openModal(title, bodyHtml, footerHtml = '') {
    if (!dom.modalBackdrop || !dom.modalTitle || !dom.modalBody) return;

    dom.modalTitle.textContent = title;
    dom.modalBody.innerHTML = bodyHtml;
    dom.modalFooter.innerHTML = footerHtml;

    dom.modalBackdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
    state.activeModal = true;

    if (dom.modalCloseBtn) {
      dom.modalCloseBtn.focus();
    }
  }

  function closeModal() {
    if (!dom.modalBackdrop) return;
    dom.modalBackdrop.classList.remove('open');
    document.body.style.overflow = '';
    state.activeModal = false;
  }

  window.closeOpModal = closeModal;

  function initModalEvents() {
    if (dom.modalCloseBtn) {
      dom.modalCloseBtn.addEventListener('click', closeModal);
    }

    if (dom.modalBackdrop) {
      dom.modalBackdrop.addEventListener('click', (e) => {
        if (e.target === dom.modalBackdrop) {
          closeModal();
        }
      });
    }

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && state.activeModal) {
        closeModal();
      }
    });
  }

  /* ==========================================================================
     6. INITIALIZATION RUNNER
     ========================================================================== */

  function initAll() {
    cacheDom();
    initRouting();
    initOperacoesView();
    initBannersView();
    initNovatoView();
    initModalEvents();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
  } else {
    initAll();
  }
})();
