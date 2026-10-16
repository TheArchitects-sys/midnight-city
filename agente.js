/**
 * ==========================================================================
 * MIDNIGHT CITY — CENTRAL DE VIGILÂNCIA DA ÉGIDE (AGENTE)
 * Lógica corporativa, telemetria distrital, mapa SVG e diretrizes
 * ==========================================================================
 */

// 1. Dados dos Distritos e Telemetria (Ambientação Fictícia Autorizada pelo Relatório)
const DISTRICTS_DATA = {
  whitechapel: {
    id: 'whitechapel',
    name: 'Whitechapel',
    classification: 'Perímetro Leste · Zona de Contenção Operacional',
    corruption: 61,
    veilIntegrity: 72,
    occurrencesCount: 3,
    risk: 'alto',
    riskLabel: 'Alto',
    // 7 pontos fixos de observação (D-6 a D-0)
    history: [52, 54, 58, 63, 60, 62, 61],
    incidents: [
      {
        id: 'wh-01',
        title: 'Ressonância sem origem identificada',
        description: 'Leituras divergentes foram registradas no perímetro residencial abandonado. Observação em andamento pelos batedores da Égide.',
        origin: 'ambient',
        timestamp: 'D-1 · 22:40'
      },
      {
        id: 'wh-02',
        title: 'Variação térmica em linha de esgoto vitoriana',
        description: 'Emissão de vapor etéreo com resíduos de cinzas ctônicas. Não há registro de combate mortal nas imediações.',
        origin: 'ambient',
        timestamp: 'D-2 · 14:15'
      },
      {
        id: 'wh-03',
        title: 'Distorção acústica em sino desativado',
        description: 'Frequência de 14Hz ressoando em estruturas de ferro forjado. Monitoramento sem instrução de deslocamento imediato.',
        origin: 'ambient',
        timestamp: 'D-4 · 03:20'
      }
    ]
  },
  soho: {
    id: 'soho',
    name: 'Soho',
    classification: 'Distrito Central · Entreposto Mercantil Sob o Véu',
    corruption: 44,
    veilIntegrity: 81,
    occurrencesCount: 2,
    risk: 'moderado',
    riskLabel: 'Moderado',
    history: [38, 40, 42, 45, 46, 43, 44],
    incidents: [
      {
        id: 'so-01',
        title: 'Interferência em comunicação de campo',
        description: 'Flutuações de frequência detectadas na malha de comunicação arcana dos becos do Soho. Patrulhas orientadas a manter silêncio rúnico.',
        origin: 'ambient',
        timestamp: 'D-0 · 18:30'
      },
      {
        id: 'so-02',
        title: 'Flutuação de densidade em beco comercial',
        description: 'Ressonância provocada por trânsito de relíquias menores autorizadas no mercado noturno da Égide.',
        origin: 'ambient',
        timestamp: 'D-3 · 21:05'
      }
    ]
  },
  westminster: {
    id: 'westminster',
    name: 'Westminster',
    classification: 'Complexo Governamental & Templário da Égide',
    corruption: 28,
    veilIntegrity: 91,
    occurrencesCount: 1,
    risk: 'baixo',
    riskLabel: 'Baixo',
    history: [25, 26, 24, 28, 29, 27, 28],
    incidents: [
      {
        id: 'we-01',
        title: 'Calibração rotineira dos geradores rúnicos',
        description: 'Varredura de segurança confirmou integridade das barreiras primárias da Cidadela de Mármore sem desvios anômalos.',
        origin: 'ambient',
        timestamp: 'D-1 · 09:00'
      }
    ]
  },
  highgate: {
    id: 'highgate',
    name: 'Highgate',
    classification: 'Colina Norte · Necrópole Ancestral & Fronteira Férica',
    corruption: 73,
    veilIntegrity: 64,
    occurrencesCount: 4,
    risk: 'critico',
    riskLabel: 'Crítico',
    history: [65, 68, 70, 75, 72, 74, 73],
    incidents: [
      {
        id: 'hg-01',
        title: 'Persistência de assinatura ectoplasmática',
        description: 'Persistência de rastro ectoplasmático denso na encosta norte. Afinidade ctônica confirmada nas proximidades da necrópole ancestral.',
        origin: 'ambient',
        timestamp: 'D-0 · 04:12'
      },
      {
        id: 'hg-02',
        title: 'Emanação ectoplasmática em mausoléus',
        description: 'Aumento na atividade de almas errantes nas criptas profundas. Patrulha noturna em prontidão defensiva.',
        origin: 'ambient',
        timestamp: 'D-2 · 01:50'
      },
      {
        id: 'hg-03',
        title: 'Ruptura tênue em selo de ferro frio',
        description: 'Barreira perimetral com perda de 12% de condutividade rúnica. Reparação despachada para a divisão de Artífices.',
        origin: 'ambient',
        timestamp: 'D-3 · 16:30'
      },
      {
        id: 'hg-04',
        title: 'Eco sonoro de matilha não catalogada',
        description: 'Testemunhas relatam uivos sob a névoa sem pegadas físicas visíveis no solo calcificado.',
        origin: 'ambient',
        timestamp: 'D-5 · 23:45'
      }
    ]
  }
};

// 2. Recursos Operacionais para Filtro Rápido
const RESOURCES_DATA = [
  {
    id: 'loja',
    title: 'Central de Requisições',
    subtitle: 'Loja de equipamentos e recursos',
    desc: 'Consulte o catálogo de recursos antes de preparar sua solicitação de suprimentos, armas e relíquias.',
    keywords: ['loja', 'requisicoes', 'equipamentos', 'armas', 'recursos', 'golds', 'compras', 'catalogo'],
    url: 'https://docs.google.com/document/d/e/2PACX-1vTwVW9hn28fi4aVOOjtTPGOYzPNuR0IPQV0GNcxowZOIdLNF2kMAdvta23JUs_ZQSkvxdizhx5CV_n-/pub',
    code: 'DOC-EXT // REQ-01'
  },
  {
    id: 'bestiario',
    title: 'Dossiê de Entidades',
    subtitle: 'Controle de Seres Fantásticos',
    desc: 'Acesse o registro de criaturas catalogadas para preparar sua consulta e tática de combate em campo.',
    keywords: ['bestiario', 'criaturas', 'monstros', 'entidades', 'seres', 'dossie', 'tartaro', 'grifos'],
    url: 'https://docs.google.com/document/d/1qcm_0sXNu9IK01qRUQXINCBLPbB_H6rYoIo-LAzVpSA/preview',
    code: 'DOC-EXT // ENT-02'
  },
  {
    id: 'materiais',
    title: 'Inventário de Insumos Arcanos',
    subtitle: 'Guia de Materiais',
    desc: 'Consulte materiais, ligas nobres e componentes ctônicos para planejar equipamentos, forjas e serviços.',
    keywords: ['materiais', 'metais', 'insumos', 'forja', 'artifice', 'prata', 'ouro', 'ferro', 'guia'],
    url: 'https://docs.google.com/document/d/e/2PACX-1vTCCuHj-YECwWmKFk-mq4eK_yWd2ar2X3A1hJmQjeiCKJrPGwbaKoTSnhc0a8JGAUNf8-yWbX7xO94r/pub',
    code: 'DOC-EXT // MAT-03'
  },
  {
    id: 'fichario',
    title: 'Registro de Operadores',
    subtitle: 'Fichário de jogadores e photoplayers',
    desc: 'Consulte os registros existentes, vagas de deuses e photoplayers antes de organizar seu personagem.',
    keywords: ['fichas', 'fichario', 'photoplayer', 'jogadores', 'operadores', 'registro', 'vagas', 'personagens'],
    url: 'https://docs.google.com/document/d/1nAKfM2Tu1UkCRlSoMmNHVN4_-QBfG_hdK0uaCxqPYJw/preview?tab=t.0',
    code: 'DOC-EXT // OPR-04'
  }
];

// 3. Inicialização e Renderização do Painel de Vigilância
let currentDistrictId = 'highgate';

function selectDistrict(distId) {
  if (!DISTRICTS_DATA[distId]) return;
  currentDistrictId = distId;
  const dist = DISTRICTS_DATA[distId];

  // Atualiza botões de distrito
  document.querySelectorAll('.district-tab-btn').forEach(btn => {
    const isSelected = btn.dataset.district === distId;
    btn.classList.toggle('border-[#d4af37]', isSelected);
    btn.classList.toggle('bg-[#d4af37]/15', isSelected);
    btn.classList.toggle('text-[#f1d27a]', isSelected);
    btn.classList.toggle('border-white/10', !isSelected);
    btn.classList.toggle('bg-white/5', !isSelected);
    btn.classList.toggle('text-gray-300', !isSelected);
  });

  // Atualiza elementos interativos do SVG
  document.querySelectorAll('.district-zone').forEach(zone => {
    zone.classList.toggle('active', zone.dataset.district === distId);
  });
  document.querySelectorAll('.district-pin').forEach(pin => {
    pin.classList.toggle('active', pin.dataset.district === distId);
  });

  // Atualiza Painel de Métricas
  const nameEl = document.getElementById('ag-dist-name');
  const classEl = document.getElementById('ag-dist-class');
  const corrEl = document.getElementById('ag-dist-corr');
  const corrBarEl = document.getElementById('ag-dist-corr-bar');
  const veilEl = document.getElementById('ag-dist-veil');
  const veilBarEl = document.getElementById('ag-dist-veil-bar');
  const riskBadgeEl = document.getElementById('ag-dist-risk-badge');
  const countEl = document.getElementById('ag-dist-count');

  if (nameEl) nameEl.textContent = dist.name;
  if (classEl) classEl.textContent = dist.classification;
  if (corrEl) corrEl.textContent = dist.corruption;
  if (corrBarEl) corrBarEl.style.width = `${dist.corruption}%`;
  if (veilEl) veilEl.textContent = `${dist.veilIntegrity}%`;
  if (veilBarEl) veilBarEl.style.width = `${dist.veilIntegrity}%`;
  if (countEl) countEl.textContent = dist.occurrencesCount;

  if (riskBadgeEl) {
    riskBadgeEl.className = `ag-badge-risk ${dist.risk}`;
    riskBadgeEl.innerHTML = `<span class="ag-dot bg-current"></span> RISCO: ${dist.riskLabel}`;
  }

  // Atualiza Gráfico SVG de 7 pontos
  renderChart(dist.history);

  // Atualiza Lista de Ocorrências
  renderIncidents(dist.incidents);
}

// Renderizador do Gráfico Temporal SVG (escala 0-100, 7 pontos: D-6 a D-0)
function renderChart(history) {
  const chartPath = document.getElementById('ag-chart-line');
  const chartArea = document.getElementById('ag-chart-area');
  const dotsContainer = document.getElementById('ag-chart-dots');
  if (!chartPath || !chartArea) return;

  const width = 420;
  const height = 110;
  const paddingX = 25;
  const paddingY = 15;
  const usableWidth = width - (paddingX * 2);
  const usableHeight = height - (paddingY * 2);

  const points = history.map((val, idx) => {
    const x = paddingX + (idx * (usableWidth / (history.length - 1)));
    const y = height - paddingY - ((val / 100) * usableHeight);
    return { x, y, val };
  });

  const lineD = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ');
  const areaD = `${lineD} L ${points[points.length - 1].x.toFixed(1)} ${height} L ${points[0].x.toFixed(1)} ${height} Z`;

  chartPath.setAttribute('d', lineD);
  chartArea.setAttribute('d', areaD);

  if (dotsContainer) {
    dotsContainer.innerHTML = points.map((p, i) => `
      <circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="3.5" class="ag-chart-dot" title="D-${6 - i}: ${p.val} pts">
        <title>Dia D-${6 - i}: Índice de Corrupção = ${p.val}/100</title>
      </circle>
    `).join('');
  }
}

// Renderizador de Lista de Ocorrências
function renderIncidents(incidents) {
  const container = document.getElementById('ag-incidents-list');
  if (!container) return;

  container.innerHTML = incidents.map(item => `
    <div class="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 hover:border-white/15 transition-all space-y-1.5">
      <div class="flex items-center justify-between text-[11px] font-mono">
        <span class="text-[#f1d27a] font-bold">› ${item.title}</span>
        <span class="text-gray-400 text-[10px]">${item.timestamp}</span>
      </div>
      <p class="text-xs text-gray-300 leading-relaxed font-sans">
        ${item.description}
      </p>
      <div class="pt-1 flex items-center justify-between text-[10px] text-gray-400 font-mono">
        <span class="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-white/5 border border-white/10 text-gray-300">
          <svg class="w-3 h-3 text-[#f1d27a]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
          ${item.origin === 'campaign' ? 'Boletim do Conselho' : 'Patrulha Operacional'}
        </span>
        <span class="text-gray-400">ID: ${item.id}</span>
      </div>
    </div>
  `).join('');
}

// 4. Filtro de Recursos Operacionais
function initResourceSearch() {
  const searchInput = document.getElementById('ag-resource-search');
  if (!searchInput) return;

  searchInput.addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase().trim();
    document.querySelectorAll('.ag-resource-item').forEach(el => {
      const id = el.dataset.resourceId;
      const res = RESOURCES_DATA.find(r => r.id === id);
      if (!res) return;

      const matches = !term || 
        res.title.toLowerCase().includes(term) ||
        res.subtitle.toLowerCase().includes(term) ||
        res.desc.toLowerCase().includes(term) ||
        res.keywords.some(k => k.includes(term));

      el.style.display = matches ? 'flex' : 'none';
    });
  });
}

// 5. Accordion de Diretrizes e Apoio
function initAccordions() {
  document.querySelectorAll('.ag-accordion-header').forEach(header => {
    header.addEventListener('click', () => {
      const item = header.closest('.ag-accordion-item');
      if (item) {
        item.classList.toggle('open');
      }
    });
  });
}

// Execução ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
  // Inicializa mapa e distrito padrão (Highgate)
  selectDistrict('highgate');

  // Listeners para botões de distrito
  document.querySelectorAll('.district-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      selectDistrict(btn.dataset.district);
    });
  });

  // Listeners para cliques diretamente nas zonas do mapa SVG
  document.querySelectorAll('.district-zone, .district-pin').forEach(el => {
    el.addEventListener('click', () => {
      selectDistrict(el.dataset.district);
    });
  });

  // Inicializa busca e accordions
  initResourceSearch();
  initAccordions();
});
