/**
 * ==========================================================================
 * MIDNIGHT CITY — ZONAS DE END GAME
 * Lógica de navegação das 4 modalidades, deep links, riscos e mapas
 * ==========================================================================
 */

const MODALITIES = ['abismo-espiral', 'bercario-abissal', 'reino-do-caos', 'universo-simulado'];

let currentMediaCleanup = null;

// 1. Gerenciamento de Modalidade Ativa e Deep Linking
function selectModality(modeId, updateUrl = true) {
  if (!MODALITIES.includes(modeId)) {
    modeId = 'abismo-espiral';
  }

  // Atualiza cartões de seleção (tabs acessíveis)
  const cards = document.querySelectorAll('.eg-mode-card');
  cards.forEach(card => {
    const isSelected = card.dataset.mode === modeId;
    card.classList.toggle('active', isSelected);
    card.setAttribute('aria-selected', isSelected ? 'true' : 'false');
    card.setAttribute('tabindex', isSelected ? '0' : '-1');
  });

  // Atualiza visualização das seções (painéis de tab)
  document.querySelectorAll('.eg-mode-view').forEach(view => {
    const isSelected = view.id === `view-${modeId}`;
    view.classList.toggle('active', isSelected);
    if (!isSelected) {
      view.setAttribute('hidden', '');
    } else {
      view.removeAttribute('hidden');
    }
  });

  // Gerencia ciclo de vida da mídia de cenário Higgsfield
  if (currentMediaCleanup) {
    currentMediaCleanup();
    currentMediaCleanup = null;
  }
  const activeView = document.getElementById(`view-${modeId}`);
  if (activeView && typeof window.initPremiumMedia === 'function') {
    currentMediaCleanup = window.initPremiumMedia(activeView);
  }

  // Atualiza URL sem recarregar
  if (updateUrl) {
    const newUrl = new URL(window.location.href);
    newUrl.searchParams.set('modalidade', modeId);
    window.history.pushState({ mode: modeId }, '', newUrl.toString());
  }

  // Atualiza scroll suave para a área de conteúdo se acionado pelo usuário
  const contentEl = document.getElementById('eg-content-anchor');
  if (contentEl && updateUrl) {
    contentEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  // Atualiza observador de índice da modalidade
  initIndexObserver(modeId);
}

// 2. Seletor Interativo de Risco no Berçário Abissal
const RISK_DATA = {
  veterano: {
    title: 'Risco Veterano (Modo Convencional)',
    roundsDesc: 'Sem limite fixo de rodadas ou morte súbita.',
    enemiesDesc: 'Inimigos padrão (1 por desafio: Lâmia ➔ Medusa ➔ Porca Carmoniana).',
    eligibility: 'Acesso liberado para agentes Nível 7+ homologados pelo Conselho de Mármore.',
    medusaBuff: '+1.000 HP • +50 DEF',
    porcaBuff: '+120.000 HP • +100 DEF',
    rewards: {
      xp: '2.500 XP',
      gold: '900 Golds',
      prayers: '30 Orações Celestiais',
      artifacts: '4 Artefatos Aleatórios',
      gems: '1 Joia do Destino'
    }
  },
  lendario: {
    title: 'Risco Lendário (Fome Acelerada)',
    roundsDesc: 'Limite estrito de 5 rodadas ou morte instantânea pela fome do Berçário.',
    enemiesDesc: 'Dois inimigos simultâneos nos desafios das etapas 1 e 2.',
    eligibility: 'Combatentes veteranos de alta patente Nível 7+ com sinergia de esquadrão.',
    medusaBuff: '+2.500 HP • +100 DEF',
    porcaBuff: '+235.000 HP • +200 DEF',
    rewards: {
      xp: '2.500 XP',
      gold: '900 Golds',
      prayers: '40 Orações Celestiais (+10)',
      artifacts: '5 Artefatos Aleatórios (+1)',
      gems: '2 Joias do Destino (+1)'
    }
  },
  'morte-subita': {
    title: 'Risco Morte Súbita (Apocalipse Ctônico)',
    roundsDesc: 'Limite estrito de 2 rodadas por desafio ou aniquilação imediata.',
    enemiesDesc: '3 monstros nas etapas 1 e 2, e 2 monstros na etapa 3.',
    eligibility: 'Apenas personagens formados em seu nível máximo alcançável (Nível 10 ou 13 conforme a lista).',
    medusaBuff: '+5.000 HP • +200 DEF',
    porcaBuff: '+370.000 HP • +400 DEF',
    rewards: {
      xp: '2.500 XP',
      gold: '900 Golds',
      prayers: '60 Orações Celestiais (+30)',
      artifacts: '6 Artefatos Aleatórios (+2)',
      gems: '4 Joias do Destino (+3)'
    }
  }
};

function selectRisk(riskKey) {
  const data = RISK_DATA[riskKey];
  if (!data) return;

  // Atualiza botões
  document.querySelectorAll('.eg-risk-tab-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.risk === riskKey);
  });

  // Atualiza campos de texto no painel
  const titleEl = document.getElementById('risk-display-title');
  const roundsEl = document.getElementById('risk-display-rounds');
  const enemiesEl = document.getElementById('risk-display-enemies');
  const eligEl = document.getElementById('risk-display-elig');
  const medusaEl = document.getElementById('risk-display-medusa');
  const porcaEl = document.getElementById('risk-display-porca');

  if (titleEl) titleEl.textContent = data.title;
  if (roundsEl) roundsEl.textContent = data.roundsDesc;
  if (enemiesEl) enemiesEl.textContent = data.enemiesDesc;
  if (eligEl) eligEl.textContent = data.eligibility;
  if (medusaEl) medusaEl.textContent = data.medusaBuff;
  if (porcaEl) porcaEl.textContent = data.porcaBuff;

  // Atualiza Recompensas em Destaque
  const rewXp = document.getElementById('risk-rew-xp');
  const rewGold = document.getElementById('risk-rew-gold');
  const rewPrayers = document.getElementById('risk-rew-prayers');
  const rewArt = document.getElementById('risk-rew-art');
  const rewGems = document.getElementById('risk-rew-gems');

  if (rewXp) rewXp.textContent = data.rewards.xp;
  if (rewGold) rewGold.textContent = data.rewards.gold;
  if (rewPrayers) rewPrayers.textContent = data.rewards.prayers;
  if (rewArt) rewArt.textContent = data.rewards.artifacts;
  if (rewGems) rewGems.textContent = data.rewards.gems;
}

// 3. Modal de Zoom de Imagem do Mapa
function initMapModal() {
  const modal = document.getElementById('eg-map-modal');
  const modalImg = document.getElementById('eg-modal-img');
  const modalTitle = document.getElementById('eg-modal-title');
  const closeBtn = document.getElementById('eg-modal-close');

  if (!modal || !modalImg) return;

  document.querySelectorAll('.eg-expandable-map').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const src = trigger.dataset.fullSrc || trigger.getAttribute('src');
      const title = trigger.dataset.title || 'Visualização Tática Ampliada';
      modalImg.src = src;
      if (modalTitle) modalTitle.textContent = title;
      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  const closeModal = () => {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  };

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeModal();
    }
  });
}

// 4. Observador de Scroll para Links de Índice Lateral
function initIndexObserver(modeId) {
  const links = document.querySelectorAll(`#view-${modeId} .eg-index-link`);
  if (!links.length) return;

  const targets = Array.from(links).map(link => {
    const id = link.getAttribute('href').replace('#', '');
    return document.getElementById(id);
  }).filter(Boolean);

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        links.forEach(l => {
          const match = l.getAttribute('href') === `#${entry.target.id}`;
          l.classList.toggle('active', match);
        });
      }
    });
  }, {
    rootMargin: '-20% 0px -70% 0px'
  });

  targets.forEach(t => observer.observe(t));
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
  // Lê parâmetro da URL ou padrão 'abismo-espiral'
  const params = new URLSearchParams(window.location.search);
  const initialMode = params.get('modalidade') || 'abismo-espiral';
  selectModality(initialMode, false);

  // Listeners dos cards de seleção (teclado e clique)
  const modeCards = Array.from(document.querySelectorAll('.eg-mode-card'));
  modeCards.forEach((card, index) => {
    card.addEventListener('click', () => {
      selectModality(card.dataset.mode, true);
    });

    card.addEventListener('keydown', (e) => {
      let nextIndex = null;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        nextIndex = (index + 1) % modeCards.length;
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        nextIndex = (index - 1 + modeCards.length) % modeCards.length;
      } else if (e.key === 'Home') {
        e.preventDefault();
        nextIndex = 0;
      } else if (e.key === 'End') {
        e.preventDefault();
        nextIndex = modeCards.length - 1;
      }

      if (nextIndex !== null) {
        modeCards[nextIndex].focus();
        selectModality(modeCards[nextIndex].dataset.mode, true);
      }
    });
  });

  // Listener para botões de risco no Berçário
  document.querySelectorAll('.eg-risk-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      selectRisk(btn.dataset.risk);
    });
  });

  // Inicializa modal de mapa e histórico popstate
  initMapModal();

  window.addEventListener('popstate', (e) => {
    const mode = (e.state && e.state.mode) || new URLSearchParams(window.location.search).get('modalidade') || 'abismo-espiral';
    selectModality(mode, false);
  });
});
