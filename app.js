/**
 * MIDNIGHT CITY — GSAP POWERED MOTION & VOLUMETRIC MIST ENGINE
 * Featuring: Official Avalon Soundtrack (tema-avalon.mp3),
 * Real-Time WebGL Volumetric Mist Shader, Stardust Particles,
 * Interactive 9 Ofícios Character Selection Stage,
 * and Playable System Preview Resolution Simulator.
 */

// 1. DATA: Dossiês da Temporada 2 (Com as artes autênticas)
const DOSSIERS = {
  valiria: {
    titulo: "OPERAÇÃO VALÍRIA: A CIDADE IMPERIAL DE VANAHEIM",
    subtitulo: "Convocação Aberta da Égide • Temporada 2 • A partir do Nível 1 (1 a 10)",
    local: "Vanaheim / Cidade Fortaleza de Valíria",
    ameaca: "Rhaenys Targaryen & Forças Dracônicas",
    imagem: "assets/valiria_mission.jpg",
    objetivos: [
      "Infiltração em território imperial fora da jurisdição da Égide.",
      "Resgate de agentes capturados e mantidos em celas rúnicas.",
      "Investigação dos rastros diretos dos Fragmentos do Caos.",
      "Reconhecimento das defesas antes da ofensiva às Ilhas de Sempre Inverno."
    ],
    relatorio: `Por ordem do Conselho de Mármore, a Égide abre inscrições para uma operação de risco elevado em território inimigo. Após os acontecimentos no Jardim de Avalon, ficou evidente que a movimentação conduzida por Rhaenys Targaryen deixou de ser isolada: Vanaheim se tornou o centro de uma nova força imperial, e Valíria ergue-se como fortaleza, prisão e declaração aberta de guerra.

Esta convocação não se limita aos agentes mais experientes: todos os personagens poderão se inscrever a partir do Nível 1, abrangendo desde novatos até os veteranos nos Níveis 9 e 10. A Égide não procura apenas poder bruto, mas agentes capazes de sobreviver, investigar, obedecer ordens, improvisar e carregar uma missão que pode mudar o equilíbrio entre reinos, deuses e mortais.

Depois de resgatar os agentes raptados, tudo levará às Ilhas de Sempre Inverno, onde um Fragmento do Caos está escondido — alvo declarado da Rainha Dragão. Inscrições abertas no canal de missões do Discord!`,
    linkDiscord: "https://discord.gg/5xJp9PEZwC"
  },
  cairo: {
    titulo: "OPERAÇÃO CAIRO: O FILHO PROIBIDO NAS AREIAS DO OÁSIS FALSO",
    subtitulo: "Convocação Sensível da Égide • Temporada 2 • A partir do Nível 1 (1 a 10)",
    local: "Cairo / Oásis Falso & Profundezas do Duat",
    ameaca: "Reivindicação de Ísis & Ecos da Tragédia do Submundo",
    imagem: "assets/cairo_mission.jpg",
    objetivos: [
      "Proteção e resgate do filho adotivo de Cleópatra e Iskandar.",
      "Investigação espiritual sobre o contato profético com a deusa Ísis.",
      "Análise dos ecos deixados pelo relato final de Lin Faust sobre o Duat e os Abandonados.",
      "Interferência diplomática e mística antes da repetição de uma tragédia temporal."
    ],
    relatorio: `O Cairo encontra-se sob grave tensão profética. Visões recentes de Cleópatra, reconhecida por seu povo como profeta, indicam que uma ameaça silenciosa está se formando antes de se revelar por completo. O centro da missão é o filho adotivo da rainha e de Iskandar, que corre risco iminente de ser raptado ou reivindicado por Ísis.

Esta convocação é aberta para agentes a partir do Nível 1 (acolhendo tanto novatos em início de carreira quanto combatentes de elite nos Níveis 9 e 10): fé, percepção, sensibilidade, coragem e capacidade de fazer escolhas difíceis serão tão vitais quanto armas afiadas. No Cairo, nem toda ameaça surgirá como inimiga declarada: algumas virão como promessa, herança, amor, fé ou chamado divino.

O objetivo é impedir que o Cairo seja preparado para repetir um destino terrível que outra linha temporal não conseguiu conter. Inscreva-se diretamente pelo Discord!`,
    linkDiscord: "https://discord.gg/5xJp9PEZwC"
  }
};

// 2. DATA: OS 9 OFÍCIOS DA ÉGIDE (Imagens locais de alta performance)
const OFICIOS_DATA = [
  {
    id: "custodios",
    numero: "I",
    nome: "CUSTÓDIOS",
    categoria: "Linha de Frente & Combate",
    iconSvg: '<svg class="w-3.5 h-3.5 text-[#f1d27a] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>',
    subtitulo: "Semideuses fortes · Caçadores experientes",
    imagem: "assets/custodio.png",
    descricao: "A linha de frente da Égide. Soldados e guerreiros que executam ordens diretas do Conselho, encarregados de combate corpo a corpo, neutralização de ameaças dracônicas e guarda armada dos locais sagrados.",
    afinidades: ["Força", "Disciplina", "Proteção", "Arsenal Pesado"],
    papelSugerido: "TANKER / DPS FÍSICO",
    formValue: "Custódio"
  },
  {
    id: "vigilantes",
    numero: "II",
    nome: "VIGILANTES",
    categoria: "Infiltração & Reconhecimento",
    iconSvg: '<svg class="w-3.5 h-3.5 text-[#f1d27a] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>',
    subtitulo: "Filhos de Hermes · Mortais astutos",
    imagem: "assets/vigilante.png",
    descricao: "Espiões, informantes e agentes infiltrados nas entranhas da metrópole. Especialistas em observar sem serem vistos, manipular redes de dados e desarticular facções rivais antes que um ataque ocorra.",
    afinidades: ["Sombra", "Segredo", "Engano", "Velocidade"],
    papelSugerido: "DPS ÁGIL / EMBOSCADA",
    formValue: "Vigilante"
  },
  {
    id: "arcanistas",
    numero: "III",
    nome: "ARCANISTAS",
    categoria: "Artes Místicas & Oráculos",
    iconSvg: '<svg class="w-3.5 h-3.5 text-[#f1d27a] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/></svg>',
    subtitulo: "Filhos de Hécate · Descendentes de Apolo",
    imagem: "assets/arcanista.png",
    descricao: "Mestres das energias transcendentais, oráculos e manipulação sobrenatural. Estudam artefatos antigos, profecias estelares e rituais rúnicos de proteção, ataque massivo ou controle elemental.",
    afinidades: ["Conhecimento", "Ritual", "Poder Oculto", "Controle"],
    papelSugerido: "DPS MÁGICO / CONTROLE",
    formValue: "Arcanista"
  },
  {
    id: "inquisidores",
    numero: "IV",
    nome: "INQUISIDORES",
    categoria: "Disciplina Interna & Julgamento",
    iconSvg: '<svg class="w-3.5 h-3.5 text-[#f1d27a] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"/></svg>',
    subtitulo: "Filhos de Nêmesis · Juramentados",
    imagem: "assets/inquisidores.png",
    descricao: "Agentes de disciplina interna encarregados de investigar traições, julgar suspeitos de corrupção e fazer cumprir as leis invioláveis da Ordem. Onde há suspeita, o Inquisidor é a resposta absoluta.",
    afinidades: ["Ordem", "Julgamento", "Temor", "Verdade"],
    papelSugerido: "DPS / CAÇADOR DE TRAIDORES",
    formValue: "Inquisidor"
  },
  {
    id: "mediadores",
    numero: "V",
    nome: "MEDIADORES",
    categoria: "Diplomacia & Pactos",
    iconSvg: '<svg class="w-3.5 h-3.5 text-[#f1d27a] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>',
    subtitulo: "Filhos de Apolo, Afrodite ou Hermes",
    imagem: "assets/mediadores.png",
    descricao: "Diplomatas e negociadores que representam o Conselho em encontros com divindades, espíritos e reis mortais. Usam carisma, retórica e lógica mística para evitar guerras e firmar alianças táticas.",
    afinidades: ["Política", "Influência", "Palavra", "Carisma"],
    papelSugerido: "SUPORTE SOCIAL & BUFF",
    formValue: "Mediador"
  },
  {
    id: "teceloes",
    numero: "VI",
    nome: "TECELÕES DO VÉU",
    categoria: "Ocultação & Ilusionismo",
    iconSvg: '<svg class="w-3.5 h-3.5 text-[#f1d27a] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18"/></svg>',
    subtitulo: "Descendentes do destino ou da ilusão",
    imagem: "assets/tecelao.png",
    descricao: "Especialistas na manipulação da percepção coletiva: alteração de memórias mortais, criação de barreiras invisíveis e ilusões de grande escala. Mantêm a humanidade alheia à guerra dos deuses.",
    afinidades: ["Silêncio", "Mentira", "Encobrimento", "Ilusão"],
    papelSugerido: "SUPORTE & ILUSÃO",
    formValue: "Tecelão do Véu"
  },
  {
    id: "arquivistas",
    numero: "VII",
    nome: "ARQUIVISTAS DE AVALON",
    categoria: "Biblioteca Secreta & Tomos",
    iconSvg: '<svg class="w-3.5 h-3.5 text-[#f1d27a] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>',
    subtitulo: "Estudiosos · Oráculos · Visionários",
    imagem: "assets/arquivistas.png",
    descricao: "Guardiões dos segredos na Biblioteca de Alexandria, sob as águas do Tâmisa. Possuem acesso exclusivo a tomos proibidos, línguas mortas e nomes verdadeiros de divindades esquecidas.",
    afinidades: ["Saber", "Segredo", "Memória", "Profecia"],
    papelSugerido: "SUPORTE DE CONHECIMENTO",
    formValue: "Arquivista"
  },
  {
    id: "artifices",
    numero: "VIII",
    nome: "ARTÍFICES DE ÉBANO",
    categoria: "Forja Divina & Alquimia",
    iconSvg: '<svg class="w-3.5 h-3.5 text-[#f1d27a] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>',
    subtitulo: "Descendentes de Hefesto ou Atena",
    imagem: "assets/artifices.png",
    descricao: "Mestres da forja de metais divinos, alquimia bélica e criação de talismãs protetores. Desenvolvem as armas rúnicas, armaduras encantadas e mecanismos de defesa dos postos da Égide.",
    afinidades: ["Criação", "Engenho", "Arsenal", "Metalurgia"],
    papelSugerido: "SUPORTE BÉLICO & BUFFS",
    formValue: "Artífice de Ébano"
  },
  {
    id: "sanctificadores",
    numero: "IX",
    nome: "SANCTIFICADORES",
    categoria: "Restauração & Cura",
    iconSvg: '<svg class="w-3.5 h-3.5 text-[#f1d27a] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>',
    subtitulo: "Filhos de Apolo, Asclépio ou Hígia",
    imagem: "assets/sanctificadores.png",
    descricao: "Médicos de campo e restauradores espirituais da Ordem. Tratam ferimentos em batalha, purificam maldições profundas e estabilizam corpos corrompidos pelos Fragmentos do Caos.",
    afinidades: ["Cura", "Purificação", "Vida", "Proteção"],
    papelSugerido: "HEALER / SUPORTE PURO",
    formValue: "Sanctificador"
  }
];

// STATE & AUDIO ENGINE
let mouseNormX = 0.5, mouseNormY = 0.5;
let bgAudio = null;
let isAudioPlaying = false;
let currentOficioIndex = 0;

// INITIALIZATION
document.addEventListener('DOMContentLoaded', () => {
  const isSistemaPage = document.body && document.body.dataset.page === 'sistema';

  // No Terminal da Égide, desativar Initiation Gate, Neblina WebGL contínua, partículas de hero e simulador legado
  if (!isSistemaPage) {
    initAudioEngine();
    initInitiationGate();
    initVolumetricFogShader();
    initGsapHeroParticlesAndMotion();
    initSubtleGsapTilt();
    initScrollParallax();
    initOficiosStage();
    initDecryptReveal();
    initSimLimitModal();
    applySimulatorBuild(0);
    initCharacterBuilder();
    initUniversoPage();
    initPowersPage();
    initSistemaPage();
    initAgentePage();
    initEndgamePage();
  }

  // Funções compartilhadas indispensáveis
  initMobileMenu();
  if (typeof window.initPremiumMedia === 'function') {
    window.initPremiumMedia(document);
  }
});

// ── 1. AUDIO ENGINE (TEMA-AVALON.MP3) ──
function initAudioEngine() {
  bgAudio = new Audio('assets/tema-avalon.mp3');
  bgAudio.loop = true;
  bgAudio.volume = 0;

  const btn = document.getElementById('audio-toggle-btn');
  if (!btn) return;

  btn.addEventListener('click', () => {
    if (!isAudioPlaying) {
      playAudioWithFade(0.4, 1.5);
      showToast('Trilha sonora de Avalon ativada.');
    } else {
      pauseAudioWithFade(1.0);
      showToast('Áudio pausado.');
    }
  });
}

function playAudioWithFade(targetVolume = 0.35, duration = 2.0) {
  if (!bgAudio) return;
  const btn = document.getElementById('audio-toggle-btn');

  bgAudio.play().then(() => {
    isAudioPlaying = true;
    if (btn) btn.classList.add('audio-playing');

    if (typeof gsap !== 'undefined') {
      gsap.to(bgAudio, { volume: targetVolume, duration: duration, ease: 'power2.out' });
    } else {
      bgAudio.volume = targetVolume;
    }
  }).catch((err) => {
    console.warn("Autoplay impedido pelo navegador:", err);
  });
}

function pauseAudioWithFade(duration = 1.0) {
  if (!bgAudio) return;
  const btn = document.getElementById('audio-toggle-btn');

  if (typeof gsap !== 'undefined') {
    gsap.to(bgAudio, {
      volume: 0,
      duration: duration,
      ease: 'power2.in',
      onComplete: () => {
        bgAudio.pause();
        isAudioPlaying = false;
        if (btn) btn.classList.remove('audio-playing');
      }
    });
  } else {
    bgAudio.pause();
    bgAudio.volume = 0;
    isAudioPlaying = false;
    if (btn) btn.classList.remove('audio-playing');
  }
}

// ── 2. DARK RED LIQUID PORTAL SHADER & TACTICAL GLOVE INTERACTION ──
let liquidGl = null;
let liquidProgram = null;
let liquidPosAttr, liquidResLoc, liquidTimeLoc, liquidMouseLoc, liquidPressLoc, liquidDragLoc, liquidTrailLoc;
let portalMouseX = 0.5, portalMouseY = 0.5;
let portalPress = 0.0;
let portalDragProgress = 0.0;
let trailCanvas = null, trailCtx = null, trailTexture = null;
let lastTrailX = -1, lastTrailY = -1;

function initLiquidPortalShader() {
  const canvas = document.getElementById('portal-liquid-canvas');
  if (!canvas) return;

  const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
  if (!gl) return;
  liquidGl = gl;

  // Create Trail Canvas for Viscous Fluid Wakes (Active ONLY when clicked)
  trailCanvas = document.createElement('canvas');
  trailCanvas.width = Math.min(512, Math.floor(window.innerWidth / 2));
  trailCanvas.height = Math.min(512, Math.floor(window.innerHeight / 2));
  trailCtx = trailCanvas.getContext('2d');
  trailCtx.fillStyle = '#000000';
  trailCtx.fillRect(0, 0, trailCanvas.width, trailCanvas.height);

  // Create WebGL Trail Texture
  trailTexture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, trailTexture);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, trailCanvas);

  const vsSource = `
    attribute vec2 position;
    varying vec2 v_uv;
    void main() {
      v_uv = position * 0.5 + 0.5;
      gl_Position = vec4(position, 0.0, 1.0);
    }
  `;

  // High-Viscosity Organic Blood Wine Liquid Shader (FBM Domain Warping & Liquid Stirring)
  const fsSource = `
    precision highp float;
    varying vec2 v_uv;
    uniform vec2 u_resolution;
    uniform float u_time;
    uniform vec2 u_mouse;
    uniform float u_press;
    uniform float u_drag_progress;
    uniform sampler2D u_trail;

    vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

    float snoise(vec2 v) {
      const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
      vec2 i  = floor(v + dot(v, C.yy) );
      vec2 x0 = v - i + dot(i, C.xx);
      vec2 i1  = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
      vec4 x12 = x0.xyxy + C.xxzz;
      x12.xy -= i1;
      i = mod289(i);
      vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 )) + i.x + vec3(0.0, i1.x, 1.0 ));
      vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
      m = m*m;
      m = m*m;
      vec3 x = 2.0 * fract(p * C.www) - 1.0;
      vec3 h = abs(x) - 0.5;
      vec3 ox = floor(x + 0.5);
      vec3 a0 = x - ox;
      m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
      vec3 g;
      g.x  = a0.x  * x0.x  + h.x  * x0.y;
      g.yz = a0.yz * x12.xz + h.yz * x12.yw;
      return 130.0 * dot(m, g);
    }

    float fbm(vec2 p) {
      float f = 0.0;
      float w = 0.5;
      for (int i = 0; i < 5; i++) {
        f += w * snoise(p);
        p *= 2.05;
        w *= 0.5;
      }
      return f;
    }

    void main() {
      vec2 uv = gl_FragCoord.xy / u_resolution.xy;
      vec2 trailUV = vec2(uv.x, 1.0 - uv.y);
      vec4 trailData = texture2D(u_trail, trailUV);
      float trailIntensity = trailData.r;

      vec2 st = gl_FragCoord.xy / u_resolution.xy;
      st.x *= u_resolution.x / u_resolution.y;

      // Displacement from dragging through liquid
      vec2 trailDisplacement = (trailData.gb - 0.5) * trailIntensity * 0.55;
      st += trailDisplacement;

      vec2 mouseNorm = u_mouse;
      mouseNorm.x *= u_resolution.x / u_resolution.y;
      float distToMouse = length(st - mouseNorm);

      // Organic liquid ripples only on click
      float ripple = sin(distToMouse * 28.0 - u_time * 6.0) * exp(-distToMouse * 5.5) * u_press * 0.16;
      vec2 p = st * 1.45 + ripple;

      float t = u_time * 0.045;

      // High-End Viscous Fluid Domain Warping
      vec2 q = vec2(
        fbm(p + vec2(t * 0.35, t * 0.18)),
        fbm(p + vec2(5.2, 1.3) + vec2(-t * 0.25, t * 0.3))
      );
      vec2 r = vec2(
        fbm(p + 3.2 * q + vec2(1.7, 9.2) + t * 0.12),
        fbm(p + 3.2 * q + vec2(8.3, 2.8) - t * 0.2)
      );
      float f = fbm(p + 3.4 * r + trailIntensity * 0.6);

      // Deep, Rich, Luxurious Arterial Blood Wine Palette
      vec3 abyssBlack = vec3(0.045, 0.005, 0.008);    // Deep dark void
      vec3 bloodWine = vec3(0.32, 0.022, 0.038);      // Rich fluid wine body
      vec3 crimsonFlow = vec3(0.68, 0.065, 0.11);     // Flowing red currents
      vec3 rubySpecular = vec3(0.92, 0.25, 0.32);     // Liquid surface reflection

      // Smooth liquid mixing
      vec3 col = mix(abyssBlack, bloodWine, clamp(f * f * 3.4, 0.0, 1.0));
      col = mix(col, crimsonFlow, clamp(length(q), 0.0, 1.0) * 0.65);
      col = mix(col, rubySpecular, pow(clamp(r.x, 0.0, 1.0), 4.2) * 0.35);

      // Fluid Stirring Wake on Drag
      if (trailIntensity > 0.01) {
        float stirGlow = sin(trailIntensity * 8.0 - u_time * 4.0) * 0.5 + 0.5;
        vec3 wakeCol = mix(abyssBlack, crimsonFlow, stirGlow);
        col = mix(col, wakeCol, clamp(trailIntensity * 1.4, 0.0, 0.88));
        col += rubySpecular * pow(trailIntensity, 2.5) * 0.5;
      }

      // Contact Water Depression on Click
      if (u_press > 0.01) {
        float contactDip = exp(-distToMouse * 7.5) * u_press;
        col = mix(col, abyssBlack, contactDip * 0.85);
        col += rubySpecular * pow(contactDip, 2.0) * 0.5;
      }

      // Drag dissipation
      if (u_drag_progress > 0.0) {
        col = mix(col, abyssBlack, u_drag_progress * 0.4);
      }

      gl_FragColor = vec4(col, 1.0);
    }
  `;

  function createShader(gl, type, source) {
    const s = gl.createShader(type);
    gl.shaderSource(s, source);
    gl.compileShader(s);
    return s;
  }

  const vs = createShader(gl, gl.VERTEX_SHADER, vsSource);
  const fs = createShader(gl, gl.FRAGMENT_SHADER, fsSource);
  liquidProgram = gl.createProgram();
  gl.attachShader(liquidProgram, vs);
  gl.attachShader(liquidProgram, fs);
  gl.linkProgram(liquidProgram);
  gl.useProgram(liquidProgram);

  const posBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]), gl.STATIC_DRAW);

  liquidPosAttr = gl.getAttribLocation(liquidProgram, "position");
  gl.enableVertexAttribArray(liquidPosAttr);
  gl.vertexAttribPointer(liquidPosAttr, 2, gl.FLOAT, false, 0, 0);

  liquidResLoc = gl.getUniformLocation(liquidProgram, "u_resolution");
  liquidTimeLoc = gl.getUniformLocation(liquidProgram, "u_time");
  liquidMouseLoc = gl.getUniformLocation(liquidProgram, "u_mouse");
  liquidPressLoc = gl.getUniformLocation(liquidProgram, "u_press");
  liquidDragLoc = gl.getUniformLocation(liquidProgram, "u_drag_progress");
  liquidTrailLoc = gl.getUniformLocation(liquidProgram, "u_trail");

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    gl.viewport(0, 0, canvas.width, canvas.height);

    if (trailCanvas) {
      trailCanvas.width = Math.min(512, Math.floor(window.innerWidth / 2));
      trailCanvas.height = Math.min(512, Math.floor(window.innerHeight / 2));
      trailCtx.fillStyle = '#000000';
      trailCtx.fillRect(0, 0, trailCanvas.width, trailCanvas.height);
    }
  }

  resize();
  window.addEventListener('resize', resize);

  let startTime = performance.now();
  function renderLiquid() {
    const gate = document.getElementById('initiation-gate');
    if (gate && gate.classList.contains('gate-closed')) return;

    const now = performance.now();
    const timeSec = (now - startTime) * 0.001;

    // Decay fluid dark trail on offscreen canvas
    if (trailCtx && trailCanvas) {
      trailCtx.fillStyle = 'rgba(0, 0, 0, 0.04)';
      trailCtx.fillRect(0, 0, trailCanvas.width, trailCanvas.height);

      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, trailTexture);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, trailCanvas);
    }

    gl.useProgram(liquidProgram);
    gl.uniform2f(liquidResLoc, canvas.width, canvas.height);
    gl.uniform1f(liquidTimeLoc, timeSec);
    gl.uniform2f(liquidMouseLoc, portalMouseX, portalMouseY);
    gl.uniform1f(liquidPressLoc, portalPress);
    gl.uniform1f(liquidDragLoc, portalDragProgress);
    gl.uniform1i(liquidTrailLoc, 0);

    gl.drawArrays(gl.TRIANGLES, 0, 6);
    requestAnimationFrame(renderLiquid);
  }

  renderLiquid();
}

function initInitiationGate() {
  const gate = document.getElementById('initiation-gate');
  if (!gate) return;

  // WCAG 2.2 / Returning Visitor Bypass: Skip gate if already crossed in session
  if (sessionStorage.getItem('neotheon_veil_crossed') === 'true') {
    gate.classList.add('gate-closed');
    gate.style.display = 'none';
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';
    return;
  }

  // Lock scrolling while initiation gate is displayed
  document.documentElement.style.overflow = 'hidden';
  document.body.style.overflow = 'hidden';

  const handCursor = document.getElementById('portal-hand-cursor');
  const openGlove = handCursor ? handCursor.querySelector('.glove-state-open') : null;
  const closedGlove = handCursor ? handCursor.querySelector('.glove-state-closed') : null;
  const whispersContainer = document.getElementById('portal-whispers-container');
  const dragFill = document.getElementById('portal-drag-fill');
  const promptWrap = document.getElementById('portal-prompt-wrap');
  const actionsWrap = document.getElementById('portal-revealed-actions');
  const enterBtn = document.getElementById('gate-enter-btn');
  const denyBtn = document.getElementById('gate-deny-btn');

  initLiquidPortalShader();

  let isMouseDown = false;
  let isVeilUnlocked = false;
  let totalDragDistance = 0;
  let lastX = window.innerWidth / 2, lastY = window.innerHeight / 2;
  let lastWhisperTime = 0;

  const horrorPhrases = [
    "BEWARE",
    "THEY WATCH",
    "NO",
    "SILENCE",
    "HE CAN HEAR YOU",
    "RUN"
  ];

  // GSAP quickTo for ultra-smooth hand cursor tracking
  let setHandX, setHandY;
  if (handCursor && typeof gsap !== 'undefined') {
    setHandX = gsap.quickTo(handCursor, "x", { duration: 0.14, ease: "power2.out" });
    setHandY = gsap.quickTo(handCursor, "y", { duration: 0.14, ease: "power2.out" });
  }

  function spawnHorrorWhisper() {
    if (isVeilUnlocked || !whispersContainer) return;
    const now = performance.now();
    // Subtler, more spaced out cooldown (1.8 seconds)
    if (now - lastWhisperTime < 1800) return;
    
    // Max 2 words active on screen to prevent stacking
    if (whispersContainer.children.length >= 2) return;
    lastWhisperTime = now;

    const phrase = horrorPhrases[Math.floor(Math.random() * horrorPhrases.length)];
    const whisper = document.createElement('div');
    whisper.className = 'horror-whisper';
    whisper.textContent = phrase;

    // Pick spaced out quadrants (corners / edges of the screen)
    const quadrants = [
      { x: Math.random() * 0.22 + 0.08, y: Math.random() * 0.22 + 0.15 }, // Top Left
      { x: Math.random() * 0.22 + 0.70, y: Math.random() * 0.22 + 0.15 }, // Top Right
      { x: Math.random() * 0.22 + 0.08, y: Math.random() * 0.22 + 0.68 }, // Bottom Left
      { x: Math.random() * 0.22 + 0.70, y: Math.random() * 0.22 + 0.68 }  // Bottom Right
    ];
    const quad = quadrants[Math.floor(Math.random() * quadrants.length)];
    const posX = quad.x * window.innerWidth;
    const posY = quad.y * window.innerHeight;

    whisper.style.left = `${posX}px`;
    whisper.style.top = `${posY}px`;
    whispersContainer.appendChild(whisper);

    const rot = (Math.random() - 0.5) * 14;

    if (typeof gsap !== 'undefined') {
      gsap.fromTo(whisper, 
        { opacity: 0, scale: 0.8, rotation: rot, y: 15, filter: "blur(3px)" },
        { 
          opacity: 0.8, 
          scale: 1.0, 
          y: -20, 
          filter: "blur(0px)",
          duration: 1.2, 
          ease: "power2.out",
          onComplete: () => {
            gsap.to(whisper, {
              opacity: 0,
              y: -40,
              filter: "blur(5px)",
              duration: 1.8,
              ease: "power1.in",
              onComplete: () => {
                if (whisper.parentNode) whisper.parentNode.removeChild(whisper);
              }
            });
          }
        }
      );
    } else {
      setTimeout(() => whisper.remove(), 2800);
    }
  }

  const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || window.innerWidth < 768;
  const dragTargetDistance = isTouchDevice ? 320 : 1300;

  const portalUniformTarget = { press: 0 };

  function handlePressDown(e) {
    if (gate.classList.contains('gate-closed')) return;

    // CRITICAL FIX: If touching a button, link or interactive control, do NOT preventDefault or intercept
    if (e.target && e.target.closest('button, a, .portal-actions, .portal-btn-skip, #portal-revealed-actions')) {
      return;
    }

    if (e.cancelable) e.preventDefault();
    isMouseDown = true;
    portalPress = 1.0;

    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    lastX = clientX;
    lastY = clientY;

    if (trailCanvas) {
      lastTrailX = (clientX / window.innerWidth) * trailCanvas.width;
      lastTrailY = (clientY / window.innerHeight) * trailCanvas.height;
    }

    // On touch devices, activate and position the tactical glove directly at the touch point
    if (handCursor) {
      handCursor.style.opacity = '1';
      if (setHandX && setHandY) {
        setHandX(clientX);
        setHandY(clientY);
      } else {
        handCursor.style.left = `${clientX}px`;
        handCursor.style.top = `${clientY}px`;
      }
    }

    // Animate glove closing into clenched fist / grasp
    if (openGlove && closedGlove && typeof gsap !== 'undefined') {
      gsap.to(openGlove, { opacity: 0, scale: 0.85, duration: 0.16, ease: "power2.in" });
      gsap.to(closedGlove, { opacity: 1, scale: 1.0, duration: 0.22, ease: "back.out(1.5)" });
      if (handCursor) {
        gsap.to(handCursor, { scale: 0.9, rotateZ: -5, duration: 0.2, ease: "power2.out" });
      }
    }
  }

  function handlePressUp() {
    isMouseDown = false;
    lastTrailX = -1;
    lastTrailY = -1;

    if (typeof gsap !== 'undefined') {
      portalUniformTarget.press = portalPress;
      gsap.to(portalUniformTarget, {
        press: 0.0,
        duration: 0.5,
        ease: "power2.out",
        onUpdate: () => { portalPress = portalUniformTarget.press; }
      });
    } else {
      portalPress = 0.0;
    }

    // Animate glove opening back up
    if (openGlove && closedGlove && typeof gsap !== 'undefined') {
      gsap.to(closedGlove, { opacity: 0, scale: 0.88, duration: 0.18, ease: "power2.in" });
      gsap.to(openGlove, { opacity: 1, scale: 1.0, duration: 0.24, ease: "power2.out" });
      if (handCursor) {
        gsap.to(handCursor, { scale: 1.0, rotateZ: 0, duration: 0.25, ease: "power2.out" });
      }
    }

    // On touch device, fade out hand cursor smoothly after touch releases
    if (isTouchDevice && handCursor) {
      setTimeout(() => {
        if (!isMouseDown) {
          handCursor.style.opacity = '0';
        }
      }, 400);
    }
  }

  function handlePointerMove(e) {
    if (gate.classList.contains('gate-closed')) return;
    if (e.target && e.target.closest('button, a, .portal-actions, .portal-btn-skip, #portal-revealed-actions')) {
      return;
    }
    if (e.cancelable && (e.touches || isMouseDown)) e.preventDefault();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    // Normalizing mouse coordinates to match WebGL correctly
    portalMouseX = clientX / window.innerWidth;
    portalMouseY = 1.0 - (clientY / window.innerHeight);

    if (setHandX && setHandY) {
      setHandX(clientX);
      setHandY(clientY);
    } else if (handCursor) {
      handCursor.style.left = `${clientX}px`;
      handCursor.style.top = `${clientY}px`;
    }

    // Update Fluid Trail Texture ONLY WHEN CLICKED AND DRAGGED
    if (isMouseDown && trailCtx && trailCanvas) {
      const tx = (clientX / window.innerWidth) * trailCanvas.width;
      const ty = (clientY / window.innerHeight) * trailCanvas.height;

      if (lastTrailX >= 0 && lastTrailY >= 0) {
        const radius = 36;
        const dx = tx - lastTrailX;
        const dy = ty - lastTrailY;

        const vx = Math.max(0, Math.min(255, Math.floor(128 + dx * 3.5)));
        const vy = Math.max(0, Math.min(255, Math.floor(128 + dy * 3.5)));

        const grad = trailCtx.createRadialGradient(tx, ty, 0, tx, ty, radius);
        grad.addColorStop(0, `rgba(255, ${vx}, ${vy}, 0.95)`);
        grad.addColorStop(0.5, `rgba(180, ${vx}, ${vy}, 0.45)`);
        grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

        trailCtx.beginPath();
        trailCtx.arc(tx, ty, radius, 0, Math.PI * 2);
        trailCtx.fillStyle = grad;
        trailCtx.fill();
      }

      lastTrailX = tx;
      lastTrailY = ty;
    }

    // Subtle spaced horror whispers
    if (!isVeilUnlocked) {
      spawnHorrorWhisper();
    }

    // Handle Dragging with Dynamic Threshold (320px on mobile, 1300px on desktop)
    if (isMouseDown && !isVeilUnlocked) {
      const dx = clientX - lastX;
      const dy = clientY - lastY;
      const dist = Math.hypot(dx, dy);
      totalDragDistance += dist;
      lastX = clientX;
      lastY = clientY;

      const progress = Math.min(1.0, totalDragDistance / dragTargetDistance);
      portalDragProgress = progress;
      if (dragFill) {
        dragFill.style.width = `${progress * 100}%`;
      }

      if (progress >= 1.0) {
        unlockVeil();
      }
    }
  }

  function unlockVeil() {
    if (isVeilUnlocked) return;
    isVeilUnlocked = true;

    // Clear and remove all horror whispers
    if (whispersContainer) {
      if (typeof gsap !== 'undefined') {
        gsap.to(whispersContainer.children, {
          opacity: 0,
          scale: 0.5,
          duration: 0.5,
          onComplete: () => { whispersContainer.innerHTML = ''; }
        });
      } else {
        whispersContainer.innerHTML = '';
      }
    }

    // Hide instruction and meter
    if (promptWrap && typeof gsap !== 'undefined') {
      gsap.to(promptWrap, {
        opacity: 0,
        y: -15,
        duration: 0.5,
        ease: "power2.in",
        onComplete: () => {
          promptWrap.classList.add('hidden');
        }
      });
    }

    // Reveal Action Buttons
    if (actionsWrap && typeof gsap !== 'undefined') {
      actionsWrap.classList.remove('hidden');
      gsap.fromTo(actionsWrap, 
        { opacity: 0, y: 30, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.9, delay: 0.25, ease: "back.out(1.4)" }
      );
    }
  }

  // Event Listeners on gate
  gate.addEventListener('mousedown', handlePressDown);
  window.addEventListener('mouseup', handlePressUp);
  gate.addEventListener('mousemove', handlePointerMove);

  gate.addEventListener('touchstart', handlePressDown, { passive: false });
  window.addEventListener('touchend', handlePressUp, { passive: true });
  gate.addEventListener('touchmove', handlePointerMove, { passive: false });

  // Handle Entrance from Buttons
  function handleEnter(withAudio = true) {
    sessionStorage.setItem('neotheon_veil_crossed', 'true');

    if (withAudio) {
      playAudioWithFade(0.35, 2.5);
    }

    if (handCursor) {
      handCursor.style.opacity = '0';
    }

    if (typeof gsap !== 'undefined') {
      gsap.to('#initiation-gate', {
        opacity: 0,
        scale: 1.08,
        duration: 0.9,
        ease: 'power3.inOut',
        onComplete: () => {
          gate.classList.add('gate-closed');
          gate.style.display = 'none';
          document.documentElement.style.overflow = '';
          document.body.style.overflow = '';
        }
      });

      gsap.fromTo('.hero-3d-wrap', 
        { opacity: 0, y: 30, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, duration: 1.2, delay: 0.2, ease: 'power3.out' }
      );
    } else {
      gate.classList.add('gate-closed');
      gate.style.display = 'none';
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    }
  }



  const skipBtn = document.getElementById('gate-skip-btn');

  function bindGateBtn(btn, withAudio) {
    if (!btn) return;
    const execute = (e) => {
      if (e) {
        e.stopPropagation();
      }
      handleEnter(withAudio);
    };
    btn.addEventListener('click', execute);
    btn.addEventListener('touchend', (e) => {
      e.stopPropagation();
      if (e.cancelable) e.preventDefault();
      execute(e);
    }, { passive: false });
    btn.addEventListener('pointerup', execute);
  }

  bindGateBtn(enterBtn, true);
  bindGateBtn(denyBtn, false);
  bindGateBtn(skipBtn, true);
}

// ── 3. VOLUMETRIC WEBGL FOG SHADER (EXACT AUTHENTIC SHADER FROM NEOTHEON-V2) ──
function initVolumetricFogShader() {
  const canvas = document.getElementById('fog-canvas');
  if (!canvas) return;

  const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
  if (!gl) {
    initCanvasFallbackFog(canvas);
    return;
  }

  const vsSource = `
    attribute vec2 position;
    void main() {
      gl_Position = vec4(position, 0.0, 1.0);
    }
  `;

  const fsSource = `
    precision highp float;
    uniform vec2 u_resolution;
    uniform float u_time;
    uniform vec2 u_mouse;

    vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

    float snoise(vec2 v) {
      const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
      vec2 i  = floor(v + dot(v, C.yy) );
      vec2 x0 = v - i + dot(i, C.xx);
      vec2 i1  = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
      vec4 x12 = x0.xyxy + C.xxzz;
      x12.xy -= i1;
      i = mod289(i);
      vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 )) + i.x + vec3(0.0, i1.x, 1.0 ));
      vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
      m = m*m;
      m = m*m;
      vec3 x = 2.0 * fract(p * C.www) - 1.0;
      vec3 h = abs(x) - 0.5;
      vec3 ox = floor(x + 0.5);
      vec3 a0 = x - ox;
      m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
      vec3 g;
      g.x  = a0.x  * x0.x  + h.x  * x0.y;
      g.yz = a0.yz * x12.xz + h.yz * x12.yw;
      return 130.0 * dot(m, g);
    }

    float fbm(vec2 p) {
      float f = 0.0;
      float w = 0.5;
      for (int i = 0; i < 5; i++) {
        f += w * snoise(p);
        p *= 2.05;
        w *= 0.5;
      }
      return f;
    }

    void main() {
      vec2 st = gl_FragCoord.xy / u_resolution.xy;
      st.x *= u_resolution.x / u_resolution.y;

      vec2 mouseOffset = (u_mouse - 0.5) * 0.08;
      vec2 p = st * 1.4 + mouseOffset;

      float t = u_time * 0.03;

      float n1 = fbm(p + vec2(t * 0.35, t * 0.18));
      float n2 = fbm(p + vec2(-t * 0.2, t * 0.4) + n1 * 0.65);
      float n3 = fbm(p + n2 * 1.05 + vec2(t * 0.12, -t * 0.25));

      vec3 baseVoid = vec3(0.02, 0.023, 0.031); // #050608
      vec3 mistViolet = vec3(0.05, 0.045, 0.08); // Deep occult purple mist
      vec3 mistLight = vec3(0.09, 0.08, 0.13); // Soft drifting fog
      vec3 goldGlow = vec3(0.83, 0.69, 0.35); // Champagne specular

      vec3 col = mix(baseVoid, mistViolet, smoothstep(-0.4, 0.7, n2));
      col = mix(col, mistLight, smoothstep(0.05, 0.95, n3));
      col += goldGlow * pow(max(0.0, n3), 5.0) * 0.05;

      gl_FragColor = vec4(col, 1.0);
    }
  `;

  function createShader(gl, type, source) {
    const s = gl.createShader(type);
    gl.shaderSource(s, source);
    gl.compileShader(s);
    return s;
  }

  const vs = createShader(gl, gl.VERTEX_SHADER, vsSource);
  const fs = createShader(gl, gl.FRAGMENT_SHADER, fsSource);
  const prog = gl.createProgram();
  gl.attachShader(prog, vs);
  gl.attachShader(prog, fs);
  gl.linkProgram(prog);
  gl.useProgram(prog);

  const posBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]), gl.STATIC_DRAW);

  const posAttr = gl.getAttribLocation(prog, "position");
  gl.enableVertexAttribArray(posAttr);
  gl.vertexAttribPointer(posAttr, 2, gl.FLOAT, false, 0, 0);

  const resLoc = gl.getUniformLocation(prog, "u_resolution");
  const timeLoc = gl.getUniformLocation(prog, "u_time");
  const mouseLoc = gl.getUniformLocation(prog, "u_mouse");

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    gl.viewport(0, 0, canvas.width, canvas.height);
  }

  resize();
  window.addEventListener('resize', resize);

  let startTime = performance.now();
  function render() {
    const now = performance.now();
    const timeSec = (now - startTime) * 0.001;

    gl.uniform2f(resLoc, canvas.width, canvas.height);
    gl.uniform1f(timeLoc, timeSec);
    gl.uniform2f(mouseLoc, mouseNormX, mouseNormY);

    gl.drawArrays(gl.TRIANGLES, 0, 6);
    requestAnimationFrame(render);
  }

  render();
}

function initCanvasFallbackFog(canvas) {
  const ctx = canvas.getContext('2d');
  let W, H;
  function resize() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
  function draw() {
    ctx.fillStyle = '#050608';
    ctx.fillRect(0, 0, W, H);
    requestAnimationFrame(draw);
  }
  resize();
  draw();
}

// ── 4. SACRED GOLDEN STARDUST & GSAP HERO MOTION ──
function initGsapHeroParticlesAndMotion() {
  const canvas = document.getElementById('hero-particles');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H;
  const particles = [];
  const particleCount = 45;

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  // Initialize Ethereal Dust Particles
  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * W,
      y: Math.random() * H,
      radius: Math.random() * 1.8 + 0.6,
      color: Math.random() > 0.4 ? 'rgba(241, 210, 122, ' : 'rgba(212, 175, 55, ',
      baseAlpha: Math.random() * 0.4 + 0.2,
      alpha: Math.random() * 0.4 + 0.2,
      vx: (Math.random() - 0.5) * 0.3,
      vy: -(Math.random() * 0.5 + 0.2),
      phase: Math.random() * Math.PI * 2
    });
  }

  function renderParticles() {
    ctx.clearRect(0, 0, W, H);

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.vx + (mouseNormX - 0.5) * 0.4;
      p.y += p.vy;
      p.phase += 0.02;
      p.alpha = p.baseAlpha + Math.sin(p.phase) * 0.15;

      if (p.y < -10) {
        p.y = H + 10;
        p.x = Math.random() * W;
      }
      if (p.x < -10) p.x = W + 10;
      if (p.x > W + 10) p.x = -10;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `${p.color}${Math.max(0, p.alpha)})`;
      ctx.shadowBlur = 8;
      ctx.shadowColor = 'rgba(212, 175, 55, 0.4)';
      ctx.fill();
    }

    requestAnimationFrame(renderParticles);
  }
  renderParticles();

  // Scroll Indicator Continuous GSAP Animation
  const scrollIndicator = document.getElementById('hero-scroll-indicator');
  if (scrollIndicator && typeof gsap !== 'undefined') {
    gsap.to(scrollIndicator.querySelector('.scroll-cue-arrow'), {
      y: 6,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
      duration: 1.1
    });
  }
}

// ── 5. SUBTLE & ELEGANT GSAP MOUSE TILT ──
function initSubtleGsapTilt() {
  const heroWrap = document.querySelector('.hero-3d-wrap');
  const heroAura = document.querySelector('.hero-sacred-aura');
  if (!heroWrap) return;

  let setTiltX, setTiltY, setAuraX, setAuraY;

  if (typeof gsap !== 'undefined') {
    setTiltX = gsap.quickTo(heroWrap, "rotationX", { duration: 0.7, ease: "power2.out" });
    setTiltY = gsap.quickTo(heroWrap, "rotationY", { duration: 0.7, ease: "power2.out" });
    if (heroAura) {
      setAuraX = gsap.quickTo(heroAura, "x", { duration: 1.2, ease: "power2.out" });
      setAuraY = gsap.quickTo(heroAura, "y", { duration: 1.2, ease: "power2.out" });
    }
  }

  window.addEventListener('mousemove', (e) => {
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    mouseNormX = e.clientX / window.innerWidth;
    mouseNormY = 1.0 - (e.clientY / window.innerHeight);

    const normX = (e.clientX - cx) / cx;
    const normY = (e.clientY - cy) / cy;

    const targetTiltY = normX * 3.5;
    const targetTiltX = -normY * 3.0;

    if (setTiltX && setTiltY) {
      setTiltX(targetTiltX);
      setTiltY(targetTiltY);
      if (setAuraX && setAuraY) {
        setAuraX(normX * 25);
        setAuraY(normY * 20);
      }
    } else {
      heroWrap.style.transform = `perspective(1400px) rotateX(${targetTiltX}deg) rotateY(${targetTiltY}deg)`;
    }
  });
}

// ── 6. SCROLL-DRIVEN PARALLAX ──
function initScrollParallax() {
  const heroWrap = document.querySelector('.hero-3d-wrap');
  const scrollIndicator = document.getElementById('hero-scroll-indicator');

  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    if (heroWrap) {
      const opacity = Math.max(0, 1 - scrollY / 500);
      heroWrap.style.opacity = opacity;
      heroWrap.style.transform = `translateY(${scrollY * 0.2}px)`;
    }
    if (scrollIndicator) {
      scrollIndicator.style.opacity = Math.max(0, 1 - scrollY / 200);
    }
  }, { passive: true });
}

// ── 7. INTERACTIVE 9 OFÍCIOS SELECTION STAGE (CHARACTER SELECT) ──
function initOficiosStage() {
  const navList = document.getElementById('oficios-nav-list');
  const showcase = document.getElementById('oficio-showcase');
  if (!navList || !showcase) return;

  // Render left vertical nav
  navList.innerHTML = OFICIOS_DATA.map((oficio, idx) => `
    <button class="oficio-nav-btn ${idx === 0 ? 'active' : ''}" data-index="${idx}">
      <div class="flex items-center gap-3">
        <span class="oficio-nav-number">${oficio.numero}</span>
        <span class="font-cinzel text-sm font-bold">${oficio.nome}</span>
      </div>
      <span class="text-xs opacity-70 flex items-center">${oficio.iconSvg}</span>
    </button>
  `).join('');

  let confirmedOficioIndex = 0;
  let currentOficioIndex = 0;

  // Function to render showcase stage with GSAP animation
  function renderOficioShowcase(index) {
    currentOficioIndex = index;
    const data = OFICIOS_DATA[index];
    if (!data) return;

    // Update active button and aria-selected state
    navList.querySelectorAll('.oficio-nav-btn').forEach((btn, i) => {
      btn.classList.toggle('active', i === index);
      btn.setAttribute('aria-selected', i === confirmedOficioIndex ? 'true' : 'false');
    });

    showcase.innerHTML = `
      <div class="grid grid-cols-1 md:grid-cols-12 gap-8 items-center h-full">
        <!-- Big Hero Artwork -->
        <div class="md:col-span-5 relative h-72 md:h-full min-h-[320px] rounded-xl overflow-hidden border border-[#d4af37]/40 shadow-2xl">
          <img src="${data.imagem}" alt="${data.nome}" class="w-full h-full object-cover object-top filter brightness-95">
          <div class="absolute inset-0 bg-gradient-to-t from-[#0a0912] via-transparent to-transparent"></div>
          <span class="absolute top-3 left-3 text-[10px] font-mono-code px-2.5 py-1 rounded bg-black/80 border border-[#d4af37]/40 text-[#f1d27a] font-bold">
            OFÍCIO ${data.numero}
          </span>
        </div>

        <!-- Class Details -->
        <div class="md:col-span-7 flex flex-col justify-between h-full py-2">
          <div>
            <div class="flex items-center gap-3 mb-2">
              <span class="text-xs font-mono-code px-2 py-0.5 rounded bg-[#d4af37]/15 text-[#f1d27a] font-bold inline-flex items-center gap-1.5">
                ${data.iconSvg}
                <span>${data.categoria}</span>
              </span>
              <span class="text-xs font-mono-code text-gray-400">
                ${data.papelSugerido}
              </span>
            </div>

            <h3 class="font-cinzel-dec text-2xl sm:text-3xl font-bold text-white mb-1">
              ${data.nome}
            </h3>
            <div class="text-xs font-cinzel text-[#d4af37] uppercase tracking-wider mb-4">
              ${data.subtitulo}
            </div>

            <p class="font-garamond text-lg sm:text-xl italic text-[#ded8cb] leading-relaxed mb-6">
              ${data.descricao}
            </p>

            <div class="mb-6">
              <span class="text-[10px] font-mono-code uppercase text-gray-400 block mb-2 font-bold">✦ AFINIDADES TÁTICAS</span>
              <div class="flex flex-wrap gap-2 text-xs font-mono-code">
                ${data.afinidades.map(af => `
                  <span class="px-2.5 py-1 bg-black/60 border border-[#d4af37]/20 rounded text-[#f1d27a]">${af}</span>
                `).join('')}
              </div>
            </div>
          </div>

          <div class="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
            <button onclick="selectOficioForBuilder('${data.formValue}')" class="btn-gold px-6 py-3 rounded text-xs flex items-center gap-2">
              <span>ESCOLHER ESTE OFÍCIO NO RASCUNHO DE FICHA</span>
              <span>↓</span>
            </button>
          </div>
        </div>
      </div>
    `;

    if (typeof gsap !== 'undefined') {
      gsap.fromTo(showcase, 
        { opacity: 0.7, scale: 0.98 },
        { opacity: 1, scale: 1, duration: 0.35, ease: "power2.out" }
      );
    }
  }

  // Click & Hover listeners: separar seleção confirmada de prévia visual
  navList.querySelectorAll('.oficio-nav-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.dataset.index);
      confirmedOficioIndex = idx;
      currentOficioIndex = idx;
      renderOficioShowcase(idx);
    });
    btn.addEventListener('mouseenter', () => {
      const idx = parseInt(btn.dataset.index);
      renderOficioShowcase(idx);
    });
  });

  // Ao mover o cursor para fora da lista (ex: até o CTA), restaura a seleção confirmada
  navList.addEventListener('mouseleave', () => {
    if (currentOficioIndex !== confirmedOficioIndex) {
      renderOficioShowcase(confirmedOficioIndex);
    }
  });

  // Initial render
  renderOficioShowcase(0);
}

// Function to auto-select oficio in builder and smooth scroll
window.selectOficioForBuilder = function(oficioValue) {
  const select = document.getElementById('char-oficio');
  if (select) {
    select.value = oficioValue;
    updateSheetPreview();
  }
  const builder = document.getElementById('fichario');
  if (builder) {
    builder.scrollIntoView({ behavior: 'smooth' });
    showToast(`Ofício "${oficioValue}" selecionado no Rascunho de Ficha.`);
  }
};

// ── 7.5. CANVAS DECRYPT REVEAL COMPONENT (CANVASUI INSPIRED) ──
function initDecryptReveal() {
  const wrappers = document.querySelectorAll('.decrypt-card-wrapper');
  if (!wrappers.length) return;

  const CIPHER_CHARS = "018XZ#%&*§ØΨΩΔ✦🜂🜁🜄🜃0x7F!<>?+=/\\ABCDEF".split('');

  wrappers.forEach(wrapper => {
    const canvas = wrapper.querySelector('.decrypt-reveal-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const theme = wrapper.getAttribute('data-theme') || 'valiria';
    const isValiria = theme === 'valiria';
    const primaryColor = isValiria ? '#ff4444' : '#7df9ff';
    const accentColor = isValiria ? '#f1d27a' : '#38bdf8';
    const bgFill = isValiria ? 'rgba(8, 7, 12, 0.96)' : 'rgba(6, 8, 14, 0.96)';

    let width = 0;
    let height = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const cellSize = 18;
    let cols = 0;
    let rows = 0;
    let grid = [];

    function resize() {
      const rect = wrapper.getBoundingClientRect();
      width = Math.floor(rect.width);
      height = Math.floor(rect.height);
      if (width <= 0 || height <= 0) return;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';

      cols = Math.ceil(width / cellSize);
      rows = Math.ceil(height / cellSize);

      grid = [];
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          grid.push({
            char: CIPHER_CHARS[Math.floor(Math.random() * CIPHER_CHARS.length)],
            scrambleRate: 0.05 + Math.random() * 0.15,
            glow: Math.random() < 0.15
          });
        }
      }
    }

    resize();
    window.addEventListener('resize', resize, { passive: true });

    let isHovered = false;
    let mouseX = width / 2;
    let mouseY = height / 2;
    let currentRadius = 0;
    let targetRadius = 0;
    let maxRadius = 0;

    function updateMaxRadius() {
      maxRadius = Math.hypot(width, height) * 1.1;
    }
    updateMaxRadius();

    wrapper.addEventListener('mouseenter', (e) => {
      isHovered = true;
      const rect = wrapper.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
      updateMaxRadius();
      targetRadius = maxRadius;
      wrapper.classList.add('is-decrypted');
    });

    wrapper.addEventListener('mousemove', (e) => {
      const rect = wrapper.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
      if (!isHovered) {
        isHovered = true;
        updateMaxRadius();
        targetRadius = maxRadius;
        wrapper.classList.add('is-decrypted');
      }
    });

    wrapper.addEventListener('mouseleave', () => {
      isHovered = false;
      targetRadius = 0;
      wrapper.classList.remove('is-decrypted');
    });

    // Touch support for mobile devices
    wrapper.addEventListener('touchstart', (e) => {
      if (e.touches && e.touches[0]) {
        const rect = wrapper.getBoundingClientRect();
        mouseX = e.touches[0].clientX - rect.left;
        mouseY = e.touches[0].clientY - rect.top;
      }
      isHovered = !isHovered;
      updateMaxRadius();
      targetRadius = isHovered ? maxRadius : 0;
      wrapper.classList.toggle('is-decrypted', isHovered);
    }, { passive: true });

    // Visibility observer to pause RAF when offscreen
    let isVisible = false;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        isVisible = entry.isIntersecting;
      });
    }, { threshold: 0.05 });
    observer.observe(wrapper);

    let frame = 0;

    function draw() {
      if (!isVisible) {
        requestAnimationFrame(draw);
        return;
      }

      frame++;
      const speed = isHovered ? 0.08 : 0.06;
      currentRadius += (targetRadius - currentRadius) * speed;

      if (!isHovered && currentRadius < 1) {
        currentRadius = 0;
      }

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, width, height);

      // If fully revealed, don't draw cipher (pure transparency)
      if (currentRadius > maxRadius * 0.98) {
        ctx.restore();
        requestAnimationFrame(draw);
        return;
      }

      // Step 1: Draw dark cipher background
      ctx.fillStyle = bgFill;
      ctx.fillRect(0, 0, width, height);

      // Step 2: Draw the cipher characters
      ctx.font = '11px "Fira Code", monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      const wavefrontBand = 70;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const idx = r * cols + c;
          const item = grid[idx];
          if (!item) continue;

          const cx = c * cellSize + cellSize / 2;
          const cy = r * cellSize + cellSize / 2;
          const dist = Math.hypot(cx - mouseX, cy - mouseY);

          if (dist < currentRadius - wavefrontBand / 2) {
            continue;
          }

          if (Math.random() < item.scrambleRate || frame % 10 === 0) {
            item.char = CIPHER_CHARS[Math.floor(Math.random() * CIPHER_CHARS.length)];
          }

          const isAtWavefront = Math.abs(dist - currentRadius) <= wavefrontBand;

          if (isAtWavefront) {
            item.char = CIPHER_CHARS[Math.floor(Math.random() * CIPHER_CHARS.length)];
            ctx.fillStyle = accentColor;
            ctx.shadowColor = primaryColor;
            ctx.shadowBlur = 8;
          } else if (item.glow) {
            ctx.fillStyle = primaryColor;
            ctx.shadowColor = primaryColor;
            ctx.shadowBlur = 4;
          } else {
            ctx.fillStyle = 'rgba(150, 160, 180, 0.45)';
            ctx.shadowBlur = 0;
          }

          ctx.fillText(item.char, cx, cy);
        }
      }

      // Step 3: Punch a smooth hole in the canvas using destination-out
      if (currentRadius > 0) {
        ctx.globalCompositeOperation = 'destination-out';
        const grad = ctx.createRadialGradient(mouseX, mouseY, Math.max(0, currentRadius - wavefrontBand), mouseX, mouseY, currentRadius);
        grad.addColorStop(0, 'rgba(0,0,0,1)');
        grad.addColorStop(0.7, 'rgba(0,0,0,0.9)');
        grad.addColorStop(1, 'rgba(0,0,0,0)');

        ctx.beginPath();
        ctx.arc(mouseX, mouseY, currentRadius, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
        ctx.globalCompositeOperation = 'source-over';
      }

      ctx.restore();
      requestAnimationFrame(draw);
    }

    requestAnimationFrame(draw);
  });
}

// ── 8. SYSTEM PREVIEW PLAYABLE MOCK SIMULATOR ──
const SIMULATOR_BUILDS = [
  {
    name: "Lyra Vale · Arcanista de Avalon",
    role: "Nível 5 · Suporte & Controle Elemental",
    hp: 200,
    atk: 70,
    def: 90,
    spd: 130,
    maxMana: 340,
    skillCost: 60,
    skillTitle: "Criomancia Ancestral (Custo: 60 Mana)",
    skillDesc: "Conjura estacas de gelo místico para paralisar a linha defensiva inimiga.",
    diceRollDesc: "10d10 t5 (10 dados com dificuldade 5)",
    diceResults: "[ 7, 5, 8, 9, 6, 2, 4, 3, 1, 5 ] ➔ <strong>5 SUCESSOS OBTIDOS!</strong>",
    actionResolution: "✦ AÇÃO BEM-SUCEDIDA: Estacas de gelo congelam o alvo por 2 turnos e dissipam sua barreira mística."
  },
  {
    name: "Eric Bauman · Inquisidor da Chama Solar",
    role: "Nível 6 · DPS Físico & Fogo Sagrado",
    hp: 260,
    atk: 140,
    def: 110,
    spd: 115,
    maxMana: 180,
    skillCost: 45,
    skillTitle: "Lâmina Radiante de Pégaso (Custo: 45 Mana)",
    skillDesc: "Canaliza a essência solar na montante para desferir um corte que incendeia a armadura do alvo.",
    diceRollDesc: "12d10 t6 (12 dados com dificuldade 6)",
    diceResults: "[ 9, 8, 7, 6, 10, 6, 4, 3, 2, 1, 8, 9 ] ➔ <strong>7 SUCESSOS (CRÍTICO COM 10)!</strong>",
    actionResolution: "✦ CRÍTICO DEVASTADOR: Corte ígneo atinge ponto vulnerável, causando 185 de dano puro e queima contínua."
  },
  {
    name: "Morgan Vance · Custódio de Ferro & Éter",
    role: "Nível 7 · Tanker Implacável & Baluarte",
    hp: 380,
    atk: 85,
    def: 175,
    spd: 90,
    maxMana: 220,
    skillCost: 50,
    skillTitle: "Fortaleza de Égide: Muralha Gravitacional (Custo: 50 Mana)",
    skillDesc: "Crava o escudo rúnico no solo, erguendo um vórtice cinético que intercepta e repele projéteis.",
    diceRollDesc: "11d10 t5 (11 dados com dificuldade 5)",
    diceResults: "[ 8, 6, 5, 9, 7, 8, 3, 2, 1, 6, 7 ] ➔ <strong>7 SUCESSOS DEFENSIVOS!</strong>",
    actionResolution: "✦ DEFESA PERFEITA: Barreira gravitacional absorve 100% do impacto e concede +40 de Armadura ao esquadrão."
  }
];

let currentBuildIndex = 0;
let hasCastedSpell = false;
let simCycleCount = 0;

function applySimulatorBuild(index) {
  const build = SIMULATOR_BUILDS[index];
  if (!build) return;

  const nameEl = document.getElementById('mock-char-name');
  const roleEl = document.getElementById('mock-char-role');
  const hpEl = document.getElementById('mock-hp-val');
  const atkEl = document.getElementById('mock-atk-val');
  const defEl = document.getElementById('mock-def-val');
  const spdEl = document.getElementById('mock-spd-val');
  const manaEl = document.getElementById('mock-mana-val');
  const skillTitleEl = document.getElementById('mock-skill-title');
  const skillDescEl = document.getElementById('mock-skill-desc');

  if (nameEl) nameEl.textContent = build.name;
  if (roleEl) roleEl.textContent = build.role;
  if (hpEl) hpEl.textContent = build.hp;
  if (atkEl) atkEl.textContent = build.atk;
  if (defEl) defEl.textContent = build.def;
  if (spdEl) spdEl.textContent = build.spd;
  if (manaEl) manaEl.textContent = `${build.maxMana} / ${build.maxMana}`;
  if (skillTitleEl) skillTitleEl.textContent = build.skillTitle;
  if (skillDescEl) skillDescEl.textContent = build.skillDesc;
}

let simIsExploded = false;
let simIsDestroyed = false;

window.simulateSpellCast = function() {
  if (simIsDestroyed) {
    showToast("✦ Não insista! O botão virou carvão. A sessão tá esperando no Discord!");
    return;
  }

  // Teimosia extra após o estágio 3 (Explosão): o clique destrói o botão na hora!
  if (simIsExploded) {
    destroySimulatorButton();
    return;
  }

  if (hasCastedSpell) return;
  hasCastedSpell = true;

  const build = SIMULATOR_BUILDS[currentBuildIndex];
  if (!build) return;

  const remainingMana = Math.max(0, build.maxMana - build.skillCost);
  const manaVal = document.getElementById('mock-mana-val');
  const output = document.getElementById('mock-spell-output');
  const castBtn = document.getElementById('btn-cast-spell');
  const resetBtn = document.getElementById('btn-reset-spell');

  if (manaVal) manaVal.textContent = `${remainingMana} / ${build.maxMana} (-${build.skillCost} MANA)`;
  if (castBtn) castBtn.classList.add('opacity-50', 'pointer-events-none');
  if (resetBtn) resetBtn.classList.remove('hidden');

  if (output) {
    output.classList.remove('hidden');
    output.innerHTML = `
      <div class="text-[#f1d27a] font-bold mb-2">› 1. Consumo de Recurso: -${build.skillCost} Mana registrado.</div>
      <div class="text-cyan-300 mb-2">› 2. Rolagem no Discord: <strong>${build.diceRollDesc}</strong></div>
      <div class="text-emerald-400 font-bold mb-2">› 3. Resultado: ${build.diceResults}</div>
      <div class="text-white font-bold p-2 bg-[#d4af37]/20 border border-[#d4af37]/40 rounded mt-2">
        ${build.actionResolution}
      </div>
    `;

    if (typeof gsap !== 'undefined') {
      gsap.fromTo(output, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" });
    }
  }

  simCycleCount++;
  if (simCycleCount >= 3) {
    setTimeout(() => {
      openSimLimitModal();
    }, 700);
  }
};

let simResetAfterLimitCount = 0;

window.resetSpellCast = function() {
  if (simIsDestroyed) {
    showToast("✦ O circuito fundiu! Sem energia para reiniciar. Vá para o Discord!");
    return;
  }

  hasCastedSpell = false;
  const output = document.getElementById('mock-spell-output');
  const castBtn = document.getElementById('btn-cast-spell');
  const resetBtn = document.getElementById('btn-reset-spell');

  if (castBtn) castBtn.classList.remove('opacity-50', 'pointer-events-none');
  if (resetBtn) resetBtn.classList.add('hidden');
  if (output) output.classList.add('hidden');

  // Rotate to another random build from the 3 variations
  let nextIdx = (currentBuildIndex + 1 + Math.floor(Math.random() * (SIMULATOR_BUILDS.length - 1))) % SIMULATOR_BUILDS.length;
  currentBuildIndex = nextIdx;
  applySimulatorBuild(currentBuildIndex);

  showToast(`✦ Nova build selecionada: ${SIMULATOR_BUILDS[currentBuildIndex].name.split('·')[0].trim()}`);

  if (simCycleCount >= 3) {
    simResetAfterLimitCount++;
    if (simResetAfterLimitCount >= 2) {
      simResetAfterLimitCount = 0;
      setTimeout(() => {
        openSimLimitModal();
      }, 500);
    }
  }
};

// ── 8.5. SIMULATOR USAGE LIMIT MODAL (DYNAMIC 3-STAGE ESCALATION) ──
const SIM_LIMIT_STAGES = [
  {
    stage: 1,
    name: "dado",
    iconBg: "bg-[#d4af37]/15 border-[#d4af37]/50",
    iconSvg: `<svg class="w-10 h-10 text-[#f1d27a]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="m12 2 8 4.5v9L12 22l-8-4.5v-9L12 2Z"/>
      <path d="m12 2 4.5 9-4.5 4.5-4.5-4.5L12 2Z"/>
      <path d="M4 6.5 7.5 11M20 6.5 16.5 11M4 15.5l3.5-4.5M20 15.5l-3.5-4.5M12 15.5V22"/>
    </svg>`,
    badgeText: "✦ CHEGA DE TREINO NO VENTO ✦",
    badgeClass: "bg-[#d4af37]/20 border-[#d4af37]/40 text-[#f1d27a]",
    titleHtml: `JÁ DEU DE CLICAR NESSE BOTÃO, NÉ?<br><span class="text-[#f1d27a]">VEM JOGAR DE VERDADE!</span>`,
    desc: `Você já testou essa build três vezes seguidas... O painel de testes não vai conter as aberrações de Londres sozinho. Chega de fingir que tá salvando o mundo aqui e vem rolar dado de verdade no Discord!`,
    primaryBtnText: "BORA JOGAR DE VERDADE!",
    secondaryBtnText: "Só mais um clique, juro!",
    cardBorder: "border-[#d4af37]/60 shadow-[0_0_50px_rgba(212,175,55,0.25)]"
  },
  {
    stage: 2,
    name: "carinha-brava",
    iconBg: "bg-[#f1a842]/15 border-[#f1a842]/50",
    iconSvg: `<svg class="w-10 h-10 text-[#f1a842]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" stroke-width="1.6"/>
      <path d="M7.5 8.5 10 9.5M16.5 8.5 14 9.5"/>
      <circle cx="9" cy="11.5" r="1" fill="currentColor"/>
      <circle cx="15" cy="11.5" r="1" fill="currentColor"/>
      <path d="M9 16h6"/>
    </svg>`,
    badgeText: "✦ O MESTRE TÁ PERDENDO A PACIÊNCIA ✦",
    badgeClass: "bg-[#f1a842]/20 border-[#f1a842]/40 text-[#f1a842]",
    titleHtml: `VOCÊ AQUI DE NOVO?!<br><span class="text-[#f1a842]">A SESSÃO TÁ ESPERANDO!</span>`,
    desc: `Sério mesmo? Clicar no botão do site não dá XP, não dropa item lendário e não mata boss. Os outros agentes já tão na chamada montando a equipe e você aí gastando mana no vazio. Entra logo no servidor!`,
    primaryBtnText: "TÁ BOM, INDO PRO DISCORD!",
    secondaryBtnText: "Só tava testando seu limite...",
    cardBorder: "border-[#f1a842]/60 shadow-[0_0_50px_rgba(241,168,66,0.25)]"
  },
  {
    stage: 3,
    name: "explosao",
    iconBg: "bg-[#f87171]/15 border-[#f87171]/50",
    iconSvg: `<svg class="w-10 h-10 text-[#f87171]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="m12 2 2.5 5 5-2.5-2.5 5 5 2.5-5 2.5 2.5 5-5-2.5-2.5 5-2.5-5-5 2.5 2.5-5-5-2.5 5-2.5-2.5-5 5 2.5L12 2Z"/>
      <circle cx="12" cy="12" r="3" fill="currentColor" opacity="0.3"/>
      <path d="M12 9v6M9 12h6"/>
    </svg>`,
    badgeText: "✦ ALERTA VERMELHO: AUTODESTRUIÇÃO ✦",
    badgeClass: "bg-[#f87171]/20 border-[#f87171]/40 text-[#f87171]",
    titleHtml: `CHEGA! O SIMULADOR VAI EXPLODIR!<br><span class="text-[#f87171]">PARA DE BRINCAR E VAMOS JOGAR!</span>`,
    desc: `Se você apertar esse botão mais uma vez, o Mestre vai rolar 10d100 de dano direto na sua sanidade mental! A Égide de Avalon já desistiu de você: larga esse simulador e vem jogar de verdade!`,
    primaryBtnText: "FUI, ANTES QUE EXPLODA!",
    secondaryBtnText: "Socorro, já entendi (Fechar)",
    cardBorder: "border-[#f87171]/60 shadow-[0_0_50px_rgba(248,113,113,0.35)]"
  }
];

let simLimitStageIndex = 0;

function triggerScreenShake(level) {
  const target = document.body;
  const shakeClass = level === 1 
    ? 'sim-screen-shake-mild' 
    : level === 2 
      ? 'sim-screen-shake-medium' 
      : 'sim-screen-shake-intense';

  target.classList.remove('sim-screen-shake-mild', 'sim-screen-shake-medium', 'sim-screen-shake-intense');
  void target.offsetWidth;
  target.classList.add(shakeClass);

  if (level >= 3) {
    const flash = document.createElement('div');
    flash.className = 'sim-spark-flash';
    document.body.appendChild(flash);
    setTimeout(() => { flash.remove(); }, 450);
  }

  setTimeout(() => {
    target.classList.remove(shakeClass);
  }, 500);
}

function renderSimLimitModal(stageIdx) {
  const card = document.getElementById('sim-limit-card');
  if (!card) return;

  const stage = SIM_LIMIT_STAGES[Math.min(stageIdx, SIM_LIMIT_STAGES.length - 1)];

  card.className = `glass-panel w-full max-w-lg rounded-2xl border p-6 sm:p-8 relative text-center transition-all duration-300 ${stage.cardBorder}`;

  // Sem botão de fechar (✕) - fechamento estrito apenas pelos botões
  card.innerHTML = `
    <!-- Vector Icon: Clean SVG (No emojis) -->
    <div class="w-16 h-16 mx-auto mb-4 rounded-full ${stage.iconBg} border flex items-center justify-center shadow-lg transition-transform hover:scale-105">
      ${stage.iconSvg}
    </div>

    <!-- Status Badge -->
    <span class="text-[10px] font-mono-code px-3 py-1 rounded border ${stage.badgeClass} uppercase font-bold tracking-widest inline-block mb-3">
      ${stage.badgeText}
    </span>

    <!-- Heading -->
    <h3 id="sim-limit-title" class="font-cinzel-dec text-2xl sm:text-3xl font-bold text-white mb-3">
      ${stage.titleHtml}
    </h3>

    <!-- Description -->
    <p class="font-garamond italic text-lg sm:text-xl text-[#ded8cb] leading-relaxed mb-6">
      ${stage.desc}
    </p>

    <!-- Action Buttons -->
    <div class="flex flex-col sm:flex-row gap-3 items-stretch justify-center pt-2">
      <a href="https://discord.gg/5xJp9PEZwC" target="_blank" rel="noopener noreferrer" class="btn-gold py-3.5 px-6 rounded text-xs font-bold tracking-wider flex items-center justify-center gap-2 shadow-lg">
        <span>${stage.primaryBtnText}</span>
        <span>→</span>
      </a>
      <button onclick="closeSimLimitModal()" class="btn-secondary-gold py-3.5 px-5 rounded text-xs">
        ${stage.secondaryBtnText}
      </button>
    </div>
  `;

  if (typeof gsap !== 'undefined') {
    gsap.fromTo(card, 
      { scale: 0.92, opacity: 0, y: 15 }, 
      { scale: 1, opacity: 1, y: 0, duration: 0.35, ease: "back.out(1.4)" }
    );
  }
}

window.openSimLimitModal = function() {
  const modal = document.getElementById('sim-limit-modal');
  if (!modal) return;

  const currentLevel = Math.min(simLimitStageIndex + 1, 3);
  triggerScreenShake(currentLevel);

  setTimeout(() => {
    renderSimLimitModal(simLimitStageIndex);
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';

    // Se alcançou o estágio 3 (explosão), armar para que o próximo clique teimoso destrua o botão
    if (simLimitStageIndex >= SIM_LIMIT_STAGES.length - 1) {
      simIsExploded = true;
    } else {
      simLimitStageIndex++;
    }
  }, 250);
};

window.closeSimLimitModal = function() {
  const modal = document.getElementById('sim-limit-modal');
  if (!modal) return;
  modal.classList.add('hidden');
  document.body.style.overflow = '';
};

function rejectModalDismissal() {
  const card = document.getElementById('sim-limit-card');
  if (!card) return;
  card.classList.remove('modal-reject-nudge');
  void card.offsetWidth;
  card.classList.add('modal-reject-nudge');
  setTimeout(() => {
    card.classList.remove('modal-reject-nudge');
  }, 400);
}

function initSimLimitModal() {
  const modal = document.getElementById('sim-limit-modal');
  if (!modal) return;

  // Clicar fora no backdrop rejeita e treme o card
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      rejectModalDismissal();
    }
  });

  // Pressionar Escape rejeita e treme o card
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
      e.preventDefault();
      rejectModalDismissal();
    }
  });
}

// Inicializar listeners do modal imediatamente ou no DOMContentLoaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initSimLimitModal);
} else {
  initSimLimitModal();
}

function destroySimulatorButton() {
  simIsDestroyed = true;
  triggerScreenShake(3);

  const castBtn = document.getElementById('btn-cast-spell');
  const resetBtn = document.getElementById('btn-reset-spell');
  const output = document.getElementById('mock-spell-output');

  if (resetBtn) resetBtn.classList.add('hidden');
  if (output) {
    output.classList.remove('hidden');
    output.innerHTML = `
      <div class="text-red-400 font-bold mb-2">› 1. FALHA CRÍTICA: Sobrecarga rúnica total no simulador.</div>
      <div class="text-gray-400 mb-2">› 2. Status do Dispositivo: <strong>CIRCUITO FUNDIDO (0% EFICÁCIA)</strong></div>
      <div class="text-[#ded8cb] font-bold p-3 bg-red-950/40 border border-red-500/40 rounded mt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
        <span>O botão não suportou a teimosia e explodiu. A aventura real acontece na mesa oficial do Discord!</span>
        <a href="https://discord.gg/5xJp9PEZwC" target="_blank" rel="noopener noreferrer" class="btn-gold py-2 px-4 rounded text-xs whitespace-nowrap shadow-lg">ENTRAR AGORA →</a>
      </div>
    `;
    if (typeof gsap !== 'undefined') {
      gsap.fromTo(output, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" });
    }
  }

  if (castBtn) {
    castBtn.className = "btn-destroyed px-6 py-3 rounded text-xs flex items-center gap-2 relative";
    castBtn.onclick = function() {
      showToast("✦ Não insista! O botão virou carvão. A sessão tá esperando no Discord!");
    };
    castBtn.innerHTML = `
      <svg class="w-4 h-4 text-red-400 animate-pulse" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
      </svg>
      <span class="text-red-300/80 font-mono-code font-bold">CIRCUITO FUNDIDO // VÁ PARA O DISCORD</span>
    `;

    // Criar e acoplar container de fumaça com Lottie + CSS wisps
    const existingSmoke = document.getElementById('btn-smoke-container');
    if (existingSmoke) existingSmoke.remove();

    const smokeContainer = document.createElement('div');
    smokeContainer.id = 'btn-smoke-container';
    smokeContainer.className = 'smoke-lottie-container';
    smokeContainer.innerHTML = `
      <div id="lottie-smoke-mount" class="w-full h-full flex items-center justify-center"></div>
      <div class="smoke-wisp"></div>
      <div class="smoke-wisp"></div>
      <div class="smoke-wisp"></div>
    `;
    castBtn.appendChild(smokeContainer);

    initLottieSmoke();
  }

  showToast("✦ CRÍTICO! O botão do simulador explodiu de vez!");
}

function initLottieSmoke() {
  const mount = document.getElementById('lottie-smoke-mount');
  if (!mount || typeof lottie === 'undefined') return;

  const smokeLottieData = {
    v: "5.7.4",
    fr: 30,
    ip: 0,
    op: 90,
    w: 120,
    h: 100,
    nm: "smoke",
    ddd: 0,
    assets: [],
    layers: [
      {
        ddd: 0, ind: 1, ty: 4, nm: "SmokePuff1", sr: 1, ks: {
          o: { k: [{ t: 0, s: [0] }, { t: 20, s: [60] }, { t: 70, s: [40] }, { t: 90, s: [0] }] },
          r: { k: [{ t: 0, s: [0] }, { t: 90, s: [45] }] },
          p: { k: [{ t: 0, s: [60, 85, 0] }, { t: 90, s: [50, 15, 0] }] },
          a: { k: [0, 0, 0] },
          s: { k: [{ t: 0, s: [40, 40, 100] }, { t: 90, s: [140, 140, 100] }] }
        },
        shapes: [
          {
            ty: "gr", it: [
              { ty: "el", p: { k: [0, 0] }, s: { k: [26, 22] } },
              { ty: "fl", c: { k: [0.82, 0.8, 0.76, 1] }, o: { k: 100 } },
              { ty: "tr", p: { k: [0, 0] }, a: { k: [0, 0] }, s: { k: [100, 100] }, r: { k: 0 }, o: { k: 100 } }
            ]
          }
        ]
      },
      {
        ddd: 0, ind: 2, ty: 4, nm: "SmokePuff2", sr: 1, ks: {
          o: { k: [{ t: 15, s: [0] }, { t: 35, s: [55] }, { t: 80, s: [30] }, { t: 90, s: [0] }] },
          r: { k: [{ t: 15, s: [-10] }, { t: 90, s: [-50] }] },
          p: { k: [{ t: 15, s: [65, 80, 0] }, { t: 90, s: [75, 10, 0] }] },
          a: { k: [0, 0, 0] },
          s: { k: [{ t: 15, s: [30, 30, 100] }, { t: 90, s: [130, 130, 100] }] }
        },
        shapes: [
          {
            ty: "gr", it: [
              { ty: "el", p: { k: [0, 0] }, s: { k: [22, 26] } },
              { ty: "fl", c: { k: [0.75, 0.72, 0.68, 1] }, o: { k: 100 } },
              { ty: "tr", p: { k: [0, 0] }, a: { k: [0, 0] }, s: { k: [100, 100] }, r: { k: 0 }, o: { k: 100 } }
            ]
          }
        ]
      },
      {
        ddd: 0, ind: 3, ty: 4, nm: "SmokePuff3", sr: 1, ks: {
          o: { k: [{ t: 30, s: [0] }, { t: 50, s: [50] }, { t: 85, s: [20] }, { t: 90, s: [0] }] },
          r: { k: [{ t: 30, s: [5] }, { t: 90, s: [30] }] },
          p: { k: [{ t: 30, s: [58, 85, 0] }, { t: 90, s: [62, 5, 0] }] },
          a: { k: [0, 0, 0] },
          s: { k: [{ t: 30, s: [25, 25, 100] }, { t: 90, s: [120, 120, 100] }] }
        },
        shapes: [
          {
            ty: "gr", it: [
              { ty: "el", p: { k: [0, 0] }, s: { k: [20, 20] } },
              { ty: "fl", c: { k: [0.88, 0.85, 0.8, 1] }, o: { k: 100 } },
              { ty: "tr", p: { k: [0, 0] }, a: { k: [0, 0] }, s: { k: [100, 100] }, r: { k: 0 }, o: { k: 100 } }
            ]
          }
        ]
      }
    ]
  };

  try {
    lottie.loadAnimation({
      container: mount,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: smokeLottieData
    });
  } catch (err) {
    console.warn("Lottie render fallback to CSS wisps:", err);
  }
}

// ── 9. DOSSIER MODAL ──
window.__lastFocusedDossierTrigger = null;

window.openDossierModal = function(key) {
  window.__lastFocusedDossierTrigger = document.activeElement;
  const dossier = DOSSIERS[key];
  if (!dossier) return;

  const modal = document.getElementById('dossier-modal');
  const modalBody = document.getElementById('modal-content');
  if (!modal || !modalBody) return;

  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-modal', 'true');
  modal.setAttribute('aria-labelledby', 'modal-dossier-title');

  modalBody.innerHTML = `
    <div class="p-6 md:p-8 relative">
      <!-- Botão de Sair no Topo Direito Sobre a Imagem -->
      <button onclick="closeDossierModal()" aria-label="Fechar Dossiê" class="absolute top-4 right-4 z-30 w-10 h-10 rounded-full bg-black/85 hover:bg-[#c82924] border border-[#d4af37]/40 hover:border-white text-white flex items-center justify-center font-mono-code text-xl transition-all shadow-2xl cursor-pointer" title="Fechar Dossiê">
        ✕
      </button>

      <div class="relative h-64 w-full rounded-lg overflow-hidden mb-6 border border-[#d4af37]/30">
        <img src="${dossier.imagem}" alt="${dossier.titulo}" class="w-full h-full object-cover object-center filter brightness-95">
        <div class="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
        <div class="absolute bottom-4 left-4 right-4 flex items-center justify-between">
          <span class="text-[10px] font-mono-code px-3 py-1 rounded bg-black/80 border border-[#d4af37]/40 text-[#f1d27a] uppercase font-bold">
            ${dossier.subtitulo}
          </span>
        </div>
      </div>

      <h2 id="modal-dossier-title" class="text-2xl md:text-3xl font-cinzel font-bold text-white mb-4">${dossier.titulo}</h2>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 text-xs font-mono-code">
        <div class="p-3 rounded bg-white/5 border border-white/10">
          <span class="text-gray-400 mb-1 flex items-center gap-1.5"><svg class="w-3.5 h-3.5 text-[#f1d27a]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg> LOCAL:</span>
          <span class="text-white font-bold text-sm">${dossier.local}</span>
        </div>
        <div class="p-3 rounded bg-white/5 border border-white/10">
          <span class="text-gray-400 mb-1 flex items-center gap-1.5"><svg class="w-3.5 h-3.5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg> AMEAÇA:</span>
          <span class="text-red-400 font-bold text-sm">${dossier.ameaca}</span>
        </div>
      </div>

      <div class="mb-6">
        <h4 class="text-xs font-mono-code uppercase tracking-wider text-[#f1d27a] mb-3">✦ DIRETRIZES OPERACIONAIS</h4>
        <ul class="space-y-2.5">
          ${dossier.objetivos.map(obj => `
            <li class="flex items-start gap-3 text-base md:text-lg text-[#ded8cb] font-garamond leading-relaxed">
              <span class="text-[#f1d27a] font-bold text-lg">›</span>
              <span>${obj}</span>
            </li>
          `).join('')}
        </ul>
      </div>

      <div class="mb-8">
        <h4 class="text-xs font-mono-code uppercase tracking-wider text-[#f1d27a] mb-3">✦ RELATÓRIO CONFIDENCIAL</h4>
        <div class="p-5 md:p-6 rounded-xl bg-black/60 border border-white/10 text-base md:text-lg text-[#ded8cb] leading-relaxed font-garamond whitespace-pre-line tracking-wide">
          ${dossier.relatorio}
        </div>
      </div>

      <div class="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-white/10">
        <a href="${dossier.linkDiscord}" target="_blank" class="btn-gold px-8 py-3.5 rounded text-xs tracking-wider flex items-center gap-2">
          <svg class="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
          <span>INSCREVER-SE PELO DISCORD</span>
          <span>→</span>
        </a>
        <button onclick="closeDossierModal()" class="btn-secondary-gold px-6 py-3 rounded text-xs">
          FECHAR DOSSIÊ
        </button>
      </div>
    </div>
  `;

  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
  const closeBtn = modal.querySelector('button');
  if (closeBtn) closeBtn.focus();
};

window.closeDossierModal = function() {
  const modal = document.getElementById('dossier-modal');
  if (modal) {
    modal.classList.add('hidden');
    document.body.style.overflow = 'auto';
    if (window.__lastFocusedDossierTrigger && typeof window.__lastFocusedDossierTrigger.focus === 'function') {
      window.__lastFocusedDossierTrigger.focus();
    }
  }
};

// ── 10. CHARACTER BUILDER (PADRÃO CENTRAL DA ÉGIDE & MACRO-CLASSES) ──
const CANONICAL_FILIACOES = [
  { id: 'nenhum', name: 'Nenhum / Independente (Mortal)', classes: ['all', 'destruicao', 'destino', 'morte', 'sonho', 'desespero', 'desejo', 'delirio'], hasEncruzilhada: false },
  { id: 'santa-igreja', name: 'Santa Igreja (Assembleia do 8º Sacramento)', classes: ['destruicao', 'destino'], hasEncruzilhada: false },
  { id: 'torre-relogio', name: 'Torre do Relógio (Magos da Torre)', classes: ['destino', 'sonho'], hasEncruzilhada: true },
  { id: 'vampiros', name: 'Vampiros (Linhagem Sobrenatural)', classes: ['desejo', 'morte'], hasEncruzilhada: false },
  { id: 'zeus', name: 'Zeus / Júpiter', classes: ['destruicao', 'sonho'], hasEncruzilhada: false },
  { id: 'poseidon', name: 'Poseidon / Netuno', classes: ['destino', 'delirio'], hasEncruzilhada: false },
  { id: 'hades', name: 'Hades / Plutão', classes: ['morte', 'desespero'], hasEncruzilhada: false },
  { id: 'hera', name: 'Hera / Juno', classes: ['destruicao', 'sonho'], hasEncruzilhada: false },
  { id: 'anfitrite', name: 'Anfitrite / Salácia', classes: ['destino', 'delirio'], hasEncruzilhada: true },
  { id: 'persefone', name: 'Perséfone / Prosérpina', classes: ['morte', 'desejo'], hasEncruzilhada: false },
  { id: 'demeter', name: 'Deméter / Ceres', classes: ['destruicao', 'sonho', 'desespero'], hasEncruzilhada: false },
  { id: 'hestia', name: 'Héstia / Vesta', classes: ['sonho', 'desejo'], hasEncruzilhada: false },
  { id: 'afrodite', name: 'Afrodite / Vênus', classes: ['desejo', 'destruicao'], hasEncruzilhada: false },
  { id: 'apolo', name: 'Apolo / Phoebus', classes: ['destino', 'desejo', 'sonho'], hasEncruzilhada: false },
  { id: 'ares', name: 'Ares / Marte', classes: ['destruicao', 'desespero'], hasEncruzilhada: false },
  { id: 'atena', name: 'Atena / Minerva', classes: ['destino', 'sonho'], hasEncruzilhada: false },
  { id: 'dionisio', name: 'Dionísio / Baco', classes: ['desespero', 'desejo'], hasEncruzilhada: false },
  { id: 'hefesto', name: 'Hefesto / Vulcano', classes: ['destino', 'desespero'], hasEncruzilhada: false },
  { id: 'hermes', name: 'Hermes / Mercúrio', classes: ['destruicao', 'sonho'], hasEncruzilhada: false },
  { id: 'hecate', name: 'Hécate / Trívia', classes: ['sonho', 'morte'], hasEncruzilhada: true },
  { id: 'melinoe', name: 'Melinoe / Phantessa', classes: ['desespero', 'morte', 'delirio'], hasEncruzilhada: true },
  { id: 'oberon', name: 'Oberon / Tenebrus', classes: ['delirio', 'desejo', 'sonho'], hasEncruzilhada: false },
  { id: 'tanatos', name: 'Tânatos / Letus', classes: ['morte', 'desespero', 'sonho'], hasEncruzilhada: false },
  { id: 'hypnos', name: 'Hipnos / Somnus', classes: ['sonho', 'desespero'], hasEncruzilhada: false },
  { id: 'morfeu', name: 'Morfeu / Somnia', classes: ['sonho', 'delirio', 'desespero'], hasEncruzilhada: false },
  { id: 'paraphronia', name: 'Paraphronia / Delírio', classes: ['delirio', 'sonho', 'morte'], hasEncruzilhada: true },
  { id: 'circe', name: 'Circe', classes: ['sonho', 'desespero'], hasEncruzilhada: true },
  { id: 'despina', name: 'Despina / Bruma', classes: ['delirio', 'sonho', 'destino'], hasEncruzilhada: false },
  { id: 'eros', name: 'Eros / Cupido', classes: ['desejo', 'desespero', 'destruicao'], hasEncruzilhada: false },
  { id: 'psique', name: 'Psiquê / Cibele', classes: ['sonho', 'desespero'], hasEncruzilhada: false },
  { id: 'tique', name: 'Tique / Fortuna', classes: ['sonho', 'desespero'], hasEncruzilhada: true },
  { id: 'macaria', name: 'Macária / Suda', classes: ['morte', 'delirio'], hasEncruzilhada: false },
  { id: 'zagreu', name: 'Zagreu / Zagreus', classes: ['morte', 'sonho'], hasEncruzilhada: false }
];

const CANONICAL_AFILIACOES = [
  { id: 'nenhuma', name: 'Nenhuma / Independente', classes: ['all', 'destruicao', 'destino', 'morte', 'sonho', 'desespero', 'desejo', 'delirio'], requiresEncruzilhada: false },
  { id: 'cacadoras-artemis', name: 'Caçadoras de Ártemis', classes: ['all', 'destruicao', 'delirio', 'sonho'], requiresEncruzilhada: false },
  { id: 'ordem-merlin', name: 'A Ordem de Merlin (Merlinianos)', classes: ['all', 'desespero', 'sonho'], requiresEncruzilhada: true },
  { id: 'congregacao-bruxas', name: 'Congregação das Bruxas (Dark Coven)', classes: ['all', 'morte', 'desespero'], requiresEncruzilhada: true }
];

const MACRO_CLASS_NAMES = {
  all: 'Todas as Classes (Livre)',
  destruicao: 'Destruição (ATK & Crítico)',
  destino: 'Destino (DEF & Crítico)',
  morte: 'Morte (HP & Crítico)',
  sonho: 'Sonho (Buffs Poderosos)',
  desespero: 'Desespero (Debuffs & DOT)',
  desejo: 'Desejo (Curas & Buffs/Debuffs)',
  delirio: 'Delírio (Invocações & Pets)'
};

let currentMacroFilter = 'all';

function initCharacterBuilder() {
  const form = document.getElementById('char-builder-form');
  if (!form) return;

  // Setup Macro-Class filter buttons
  const macroPills = document.querySelectorAll('#macro-class-pills .macro-pill');
  macroPills.forEach(pill => {
    pill.addEventListener('click', () => {
      macroPills.forEach(p => {
        p.classList.remove('active', 'bg-[#d4af37]', 'text-black', 'font-bold');
        p.classList.add('bg-white/5', 'text-gray-300');
      });
      pill.classList.add('active', 'bg-[#d4af37]', 'text-black', 'font-bold');
      pill.classList.remove('bg-white/5', 'text-gray-300');

      currentMacroFilter = pill.getAttribute('data-macro') || 'all';
      populateFiliacaoAndAfiliacao(currentMacroFilter);
      updateSheetPreview();
    });
  });

  // Re-filter afiliacoes when filiacao changes (for encruzilhada check)
  const filiacaoSelect = document.getElementById('char-filiacao');
  if (filiacaoSelect) {
    filiacaoSelect.addEventListener('change', () => {
      updateAfiliacoesForSelectedFiliacao();
      updateSheetPreview();
    });
  }

  // Initial population of select options
  populateFiliacaoAndAfiliacao('all');

  const inputs = form.querySelectorAll('input, select, textarea');
  inputs.forEach(input => {
    input.addEventListener('input', updateSheetPreview);
    input.addEventListener('change', updateSheetPreview);
  });

  const copyBtn = document.getElementById('btn-copy-sheet');
  if (copyBtn) {
    copyBtn.addEventListener('click', copySheetToClipboard);
  }

  updateSheetPreview();
}

function updateAfiliacoesForSelectedFiliacao() {
  const filiacaoSelect = document.getElementById('char-filiacao');
  const afiliacaoSelect = document.getElementById('char-afiliacao');
  const afiliacaoCountEl = document.getElementById('afiliacao-count');
  if (!filiacaoSelect || !afiliacaoSelect) return;

  const currentFiliacaoId = filiacaoSelect.value;
  const filiacaoObj = CANONICAL_FILIACOES.find(f => f.id === currentFiliacaoId);
  const isEncruzilhada = filiacaoObj ? !!filiacaoObj.hasEncruzilhada : false;

  const currentAfiliacaoVal = afiliacaoSelect.value;

  // Eligible afiliacoes:
  // Non-encruzilhada characters cannot pick Merlinianos or Dark Coven
  const eligibleAfiliacoes = CANONICAL_AFILIACOES.filter(af => {
    if (af.requiresEncruzilhada && !isEncruzilhada) return false;
    return currentMacroFilter === 'all' || af.classes.includes(currentMacroFilter) || af.classes.includes('all');
  });

  afiliacaoSelect.innerHTML = eligibleAfiliacoes.map(item => {
    const note = item.requiresEncruzilhada ? ' [Magia / Encruzilhada]' : '';
    return `<option value="${item.id}">${item.name}${note}</option>`;
  }).join('');

  if (eligibleAfiliacoes.some(i => i.id === currentAfiliacaoVal)) {
    afiliacaoSelect.value = currentAfiliacaoVal;
  } else {
    afiliacaoSelect.value = 'nenhuma';
  }

  if (afiliacaoCountEl) {
    afiliacaoCountEl.textContent = `${eligibleAfiliacoes.length} disponíveis`;
  }
}

function populateFiliacaoAndAfiliacao(macroFilter) {
  const filiacaoSelect = document.getElementById('char-filiacao');
  const filiacaoCountEl = document.getElementById('filiacao-count');
  const macroLabelEl = document.getElementById('macro-class-count-label');

  if (!filiacaoSelect) return;

  const currentFiliacaoVal = filiacaoSelect.value;

  // Filter Filiações (Raça/Parentesco)
  const eligibleFiliacoes = CANONICAL_FILIACOES.filter(item => {
    if (item.id === 'nenhum') return true;
    return macroFilter === 'all' || item.classes.includes(macroFilter);
  });

  // Populate Filiações
  filiacaoSelect.innerHTML = eligibleFiliacoes.map(item => {
    const classBadge = item.classes.filter(c => c !== 'all').join(', ');
    const tagSuffix = item.hasEncruzilhada ? ' ✦ [Encruzilhada]' : '';
    return `<option value="${item.id}">${item.name}${classBadge ? ' [' + classBadge + ']' : ''}${tagSuffix}</option>`;
  }).join('');

  // Preserve previous selection if still available
  if (eligibleFiliacoes.some(i => i.id === currentFiliacaoVal)) {
    filiacaoSelect.value = currentFiliacaoVal;
  } else if (eligibleFiliacoes.length > 0) {
    filiacaoSelect.value = eligibleFiliacoes[0].id;
  }

  // Update counter badges
  if (filiacaoCountEl) filiacaoCountEl.textContent = `${eligibleFiliacoes.length} disponíveis`;
  if (macroLabelEl) {
    if (macroFilter === 'all') {
      macroLabelEl.textContent = 'Exibindo todas as linhagens e raças';
    } else {
      macroLabelEl.textContent = `Filtro ativo: ${MACRO_CLASS_NAMES[macroFilter] || macroFilter}`;
    }
  }

  // Update Afiliações dependent on the currently active filiação (encruzilhada check)
  updateAfiliacoesForSelectedFiliacao();
}

// ==========================================================================
// CANONICAL SYSTEM DATA (NÍVEIS 1 A 10)
// ==========================================================================
const CANONICAL_RANKS = [
  "Noviço (Ato I)",
  "Juramentado",
  "Custódio Menor (Ato II)",
  "Custódio Pleno",
  "Vigia da Égide (Ato III)",
  "Arauto de Mármore",
  "Sentinela de Avalon",
  "Mão de Avalon",
  "Campeão de Avalon",
  "Soberano de Avalon"
];

function updateSheetPreview() {
  const numFicha = document.getElementById('char-num-ficha')?.value || '#142';
  const email = document.getElementById('char-email')?.value || 'agente@exemplo.com';
  const nomeOff = document.getElementById('char-nome-off')?.value || 'Julian Vance';
  const nome = document.getElementById('char-nome')?.value || 'Cassian Vance';
  const idade = document.getElementById('char-idade')?.value || '23';
  const shape = document.getElementById('char-shape')?.value || 'Timothée Chalamet';

  const filiacaoSelect = document.getElementById('char-filiacao');
  const filiacaoText = filiacaoSelect?.options[filiacaoSelect.selectedIndex]?.text || 'Nenhum / Independente (Mortal)';
  
  const afiliacaoSelect = document.getElementById('char-afiliacao');
  const afiliacaoText = afiliacaoSelect?.options[afiliacaoSelect.selectedIndex]?.text || 'Nenhuma / Independente';

  const oficioSelect = document.getElementById('char-oficio');
  const oficio = oficioSelect?.value || 'Custódio';
  
  const resumo = document.getElementById('char-resumo')?.value || 'Nenhum histórico informado.';

  const macroText = MACRO_CLASS_NAMES[currentMacroFilter] || 'Todas';

  const formattedText = `══════════════════════════════════════════════════
🏛️ PEDIDO OFICIAL DE FICHA · ÉGIDE DE AVALON
══════════════════════════════════════════════════
Nº DA FICHA GERAL: ${numFicha}
E-MAIL (GOOGLE DRIVE): ${email}
NOME EM OFF: ${nomeOff}
NOME DO PERSONAGEM: ${nome}
IDADE & SHAPE: ${idade} anos | ${shape}
MACRO-CLASSE PERPÉTUA: ${macroText}

FILIAÇÃO (RAÇA/PARENTESCO): ${filiacaoText}
AFILIAÇÃO: ${afiliacaoText}
OFÍCIO NA ÉGIDE: ${oficio} (Posto: Nível 1 · ${CANONICAL_RANKS[0]})

HISTÓRICO & MOTIVAÇÃO EM LONDRES:
"${resumo}"

══════════════════════════════════════════════════
✦ Submeta este pedido no tópico oficial da Central no Discord.
✦ Protocolo Égide de Avalon • Temporada 2 • Londres 2047
══════════════════════════════════════════════════`;

  const previewBox = document.getElementById('char-sheet-preview');
  if (previewBox) {
    previewBox.textContent = formattedText;
  }
}

function copySheetToClipboard() {
  const previewBox = document.getElementById('char-sheet-preview');
  if (!previewBox) return;

  navigator.clipboard.writeText(previewBox.textContent).then(() => {
    showToast('Ficha formatada copiada com sucesso! Cole no canal de fichas do Discord.');
  }).catch(() => {
    showToast('Erro ao copiar ficha. Selecione o texto manualmente.');
  });
}

// Toast
function showToast(message) {
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toast-msg');
  if (!toast || !toastMsg) return;

  toastMsg.textContent = message;
  toast.classList.remove('translate-y-20', 'opacity-0');
  toast.classList.add('translate-y-0', 'opacity-100');

  setTimeout(() => {
    toast.classList.remove('translate-y-0', 'opacity-100');
    toast.classList.add('translate-y-20', 'opacity-0');
  }, 4000);
}

// Mobile Menu
function initMobileMenu() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  if (!menuBtn || !mobileMenu) return;

  menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
  });

  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
    });
  });
}

// ==========================================================================
// 11. BASE DE DADOS: DIVINDADES & INDIVIDUALIDADES (DIVINITIES_DATA)
// ==========================================================================
const DIVINITIES_DATA = [
  {
    id: "zeus",
    name: "Zeus / Júpiter",
    titulo: "Rei do Olimpo • Deus do céu, trovão, relâmpago, realeza e justiça",
    panteao: "greco-romano",
    panteaoLabel: "Greco-Romano",
    reino: "tres-grandes",
    reinoLabel: "Três Grandes",
    classes: ["destruicao", "sonho"],
    icon: "⚡",
    descricao: "Soberano dos céus e das tempestades. Seus descendentes manipulam a energia estática, o plasma atmosférico e exercem uma presença de liderança esmagadora em batalha.",
    arvore: [
      {
        nivel: 1,
        titulo: "Nível 1 — Despertar do Trovão",
        poderes: [
          { nome: "Eletrocinese I", tipo: "Ativo", continuidade: "I", descricao: "Gera pequenas descargas elétricas nas pontas dos dedos e eletriza objetos metálicos para infligir choque adicional." },
          { nome: "Presença Majestosa", tipo: "Passivo", continuidade: null, descricao: "Voz firme que inspira coragem a aliados próximos e intimida inimigos de nível inferior." },
          { nome: "Senso Atmosférico", tipo: "Passivo", continuidade: null, descricao: "Percepção instintiva de mudanças na pressão do ar, tempestades iminentes e alvos condutores no campo." }
        ]
      },
      {
        nivel: 2,
        titulo: "Nível 2 — Condução e Vento",
        poderes: [
          { nome: "Eletrocinese II", tipo: "Ativo", continuidade: "II", descricao: "Dispara arcos elétricos concentrados capazes de paralisar temporariamente um alvo e romper blindagens leves." },
          { nome: "Aerocinese I", tipo: "Ativo", continuidade: "I", descricao: "Gera rajadas de vento pressurizado que afastam oponentes ou amortecem quedas fatais." },
          { nome: "Corpo Condutor", tipo: "Passivo", continuidade: null, descricao: "Imunidade completa a danos elétricos e ganho de 10% de velocidade ao sofrer descargas." }
        ]
      },
      {
        nivel: 3,
        titulo: "Nível 3 — Tormenta de Íons",
        poderes: [
          { nome: "Raios Teleguiados", tipo: "Ativo", continuidade: null, descricao: "Dispara feixes de plasma que saltam em cadeia entre até 3 inimigos próximos." },
          { nome: "Chamado da Tormenta", tipo: "Ativo", continuidade: null, descricao: "Escurece os céus num raio de 50 metros, obscurecendo a visão inimiga com nuvens de chuva ácida." },
          { nome: "Escudo de Íons", tipo: "Reativo", continuidade: null, descricao: "Ergue uma barreira de plasma estático que reflete projéteis metálicos e absorve feitiços." }
        ]
      },
      {
        nivel: 4,
        titulo: "Nível 4 — A Cólera dos Céus",
        poderes: [
          { nome: "Trovoada Sísmica", tipo: "Ativo", continuidade: null, descricao: "Golpeia o solo canalizando um relâmpago que causa uma onda de choque atordoante em área." },
          { nome: "Voo dos Céus", tipo: "Ativo", continuidade: null, descricao: "Permite levitar e voar a velocidades supersônicas impulsionado por correntes de vento e éter." },
          { nome: "Julgamento Real", tipo: "Passivo", continuidade: null, descricao: "Aumenta a taxa de acerto crítico em 25% contra alvos que cometeram traição ou quebra de pacto." }
        ]
      },
      {
        nivel: 5,
        titulo: "Nível 5 — O Mestre dos Relâmpagos",
        poderes: [
          { nome: "Eletrocinese Final", tipo: "Ativo", continuidade: "Final", descricao: "Converte o próprio corpo em pura energia elétrica e materializa lanças de plasma divino destruidoras." },
          { nome: "Tempestade Eterna", tipo: "Ativo", continuidade: null, descricao: "Chama relâmpagos contínuos em um ponto fixo durante 3 turnos, destruindo estruturas sólidas." },
          { nome: "Imposição Soberana", tipo: "Ativo", continuidade: null, descricao: "Onda de pressão divina que força todos os adversários de menor escalão a se ajoelharem." }
        ]
      },
      {
        nivel: 6,
        titulo: "Nível 6 — Avatar do Olimpo",
        poderes: [
          { nome: "Manto do Rei dos Deuses", tipo: "Passivo", continuidade: null, descricao: "Aura dourada que dobra todo dano elétrico desferido e concede resistência absoluta a paralisia." },
          { nome: "Convocação das Águias Celestiais", tipo: "Ativo", continuidade: null, descricao: "Invoca 2 espíritos de águias divinas com asas de relâmpago para patrulhar e atacar do ar." },
          { nome: "Chuva de Fagulhas Sagradas", tipo: "Ativo", continuidade: null, descricao: "Despeja milhares de micro-raios incandescentes em uma área massiva de combate." }
        ]
      },
      {
        nivel: 7,
        titulo: "Nível 7 — O Raio Mestre Primordial",
        poderes: [
          { nome: "O Raio Mestre de Júpiter", tipo: "Supremo", continuidade: null, descricao: "Invoca a lança primordial do rei dos deuses. Causa dano cataclísmico que ignora 50% de toda armadura e resistência mágica." },
          { nome: "Onipresença na Tempestade", tipo: "Passivo", continuidade: null, descricao: "Teletransporta-se instantaneamente para qualquer local sob a chuva ou tempestade no reino." },
          { nome: "Vontade Inviolável da Realeza", tipo: "Passivo", continuidade: null, descricao: "Imunidade total a qualquer forma de controle mental, medo, fascínio ou manipulação cósmica." }
        ]
      }
    ]
  },
  {
    id: "poseidon",
    name: "Poseidon / Netuno",
    titulo: "Rei dos Mares • Deus dos oceanos, tempestades, abismos e terremotos",
    panteao: "greco-romano",
    panteaoLabel: "Greco-Romano",
    reino: "tres-grandes",
    reinoLabel: "Três Grandes",
    classes: ["destruicao", "destino"],
    icon: "🔱",
    descricao: "Senhor dos mares e dos abismos profundos. Seus herdeiros moldam a água como lâminas pressurizadas, provocam tremores de terra e comunicam-se com criaturas marinhas e cavalos.",
    arvore: [
      {
        nivel: 1,
        titulo: "Nível 1 — Gota Primordial",
        poderes: [
          { nome: "Hidrocinese I", tipo: "Ativo", continuidade: "I", descricao: "Controla pequenos volumes de água líquida para criar dardos ou chicotes curtos." },
          { nome: "Afinidade com Cavalos e Seres Marinhos", tipo: "Passivo", continuidade: null, descricao: "Comunicação telepática instintiva com animais marinhos e equinos." },
          { nome: "Resistência Abissal", tipo: "Passivo", continuidade: null, descricao: "Imunidade à pressão hidrostática extrema e capacidade de respirar debaixo d'água." }
        ]
      },
      {
        nivel: 2,
        titulo: "Nível 2 — Correntes e Tremores",
        poderes: [
          { nome: "Hidrocinese II", tipo: "Ativo", continuidade: "II", descricao: "Condensa água em lâminas de corte pressurizado capazes de cortar concreto e armaduras leves." },
          { nome: "Tremor Sísmico Menor", tipo: "Ativo", continuidade: null, descricao: "Bate no solo provocando uma fissura que derruba e desorienta inimigos em linha reta." },
          { nome: "Nado Veloz", tipo: "Passivo", continuidade: null, descricao: "Velocidade na água multiplicada por 4, permitindo manobras aquáticas sem penalidade." }
        ]
      },
      {
        nivel: 3,
        titulo: "Nível 3 — A Lança do Tridente",
        poderes: [
          { nome: "Lança Tridente de Gelo e Água", tipo: "Ativo", continuidade: null, descricao: "Projeta um tridente de água densa que congela no impacto perfurando o peito do alvo." },
          { nome: "Cura pelas Águas", tipo: "Passivo", continuidade: null, descricao: "Em contato com água limpa ou do mar, regenera 15% de HP e cura ferimentos leves." },
          { nome: "Névoa Salina Cegante", tipo: "Ativo", continuidade: null, descricao: "Ergue uma densa névoa marítima que bloqueia a visão de atiradores e radares." }
        ]
      },
      {
        nivel: 4,
        titulo: "Nível 4 — Fúria dos Abismos",
        poderes: [
          { nome: "Hidrocinese III", tipo: "Ativo", continuidade: "III", descricao: "Cria esferas gigantes de água para aprisionar alvos e sufocá-los sob pressão." },
          { nome: "Geocinese Sísmica", tipo: "Ativo", continuidade: null, descricao: "Provoca um tremor de terra que destrói barricadas, muros e trincheiras inimigas." },
          { nome: "Chamado do Hipocampo", tipo: "Ativo", continuidade: null, descricao: "Invoca um espírito de cavalo marinho feito de espuma para transporte rápido e ataque aquático." }
        ]
      },
      {
        nivel: 5,
        titulo: "Nível 5 — Vórtice dos Mares",
        poderes: [
          { nome: "Hidrocinese Final", tipo: "Ativo", continuidade: "Final", descricao: "Controle absoluto de massas colossais de água, podendo criar tsunamis localizados." },
          { nome: "Vórtice Gravitacional Marinho", tipo: "Ativo", continuidade: null, descricao: "Gera um redemoinho de sucção que arrasta inimigos para o centro do combate." },
          { nome: "Armadura de Coral Titânico", tipo: "Reativo", continuidade: null, descricao: "Reveste a pele em carapaça de coral fóssil que absorve 40% de todo dano físico." }
        ]
      },
      {
        nivel: 6,
        titulo: "Nível 6 — O Fervor do Deus dos Terremotos",
        poderes: [
          { nome: "Despertar do Monstro das Fossas", tipo: "Ativo", continuidade: null, descricao: "Invoca tentáculos colossais de Kraken para esmagar veículos blindados e fortalezas." },
          { nome: "Pântano Rúnico dos Afogados", tipo: "Ativo", continuidade: null, descricao: "Liquefaz o solo transformando o terreno em areia movediça para todo o pelotão inimigo." },
          { nome: "Maré Restauradora", tipo: "Ativo", continuidade: null, descricao: "Restaura o vigor e remove todos os venenos e sangramentos de aliados próximos." }
        ]
      },
      {
        nivel: 7,
        titulo: "Nível 7 — O Grande Cataclismo dos Oceanos",
        poderes: [
          { nome: "Cataclismo de Netuno", tipo: "Supremo", continuidade: null, descricao: "Desencadeia um tsunami de éter e terremoto de escala máxima, inundando o campo e dizimando estruturas." },
          { nome: "Soberania dos Abismos Infinitos", tipo: "Passivo", continuidade: null, descricao: "O agente é considerado indestrutível enquanto estiver completamente submerso em água." },
          { nome: "O Tridente do Destino", tipo: "Passivo", continuidade: null, descricao: "Ataques com armas de haste causam ondas de choque sísmicas automáticas em cada acerto." }
        ]
      }
    ]
  },
  {
    id: "hades",
    name: "Hades / Plutão",
    titulo: "Rei do Submundo • Deus dos mortos, necromancia, sombras e minérios preciosos",
    panteao: "greco-romano",
    panteaoLabel: "Greco-Romano",
    reino: "tres-grandes",
    reinoLabel: "Três Grandes",
    classes: ["morte", "desespero"],
    icon: "💀",
    descricao: "Governante silencioso do Érebo. Seus herdeiros manipulam sombras tangíveis, detectam minérios no subsolo, viajam através da escuridão e erguem esqueletos do pó.",
    arvore: [
      {
        nivel: 1,
        titulo: "Nível 1 — Véu do Érebo",
        poderes: [
          { nome: "Umbracinese I", tipo: "Ativo", continuidade: "I", descricao: "Molda sombras para criar dardos afiados e escurecer a iluminação ao redor do corpo." },
          { nome: "Detecção de Riquezas Minerais", tipo: "Passivo", continuidade: null, descricao: "Sente veios de ouro, prata, pedras preciosas e ligas metálicas enterradas no solo." },
          { nome: "Sentido dos Moribundos", tipo: "Passivo", continuidade: null, descricao: "Sente a localização exata de criaturas vivas com ferimentos graves ou à beira da morte." }
        ]
      },
      {
        nivel: 2,
        titulo: "Nível 2 — Tentáculos Noturnos",
        poderes: [
          { nome: "Umbracinese II", tipo: "Ativo", continuidade: "II", descricao: "Molda tentáculos de sombra sólida para amarrar, puxar e estrangular adversários à distância." },
          { nome: "Viagem pelas Sombras I", tipo: "Ativo", continuidade: "I", descricao: "Mergulha em uma sombra e ressurge em outra a até 15 metros de distância." },
          { nome: "Toque Necrótico Menor", tipo: "Ativo", continuidade: null, descricao: "Necrosa a carne tocada, impedindo a cicatrização natural durante 2 turnos." }
        ]
      },
      {
        nivel: 3,
        titulo: "Nível 3 — Convocação dos Ossos",
        poderes: [
          { nome: "Invocação de Soldados Esqueléticos", tipo: "Ativo", continuidade: null, descricao: "Ergue 2 guerreiros de ossos com escudos e espadas antigas para lutar ao seu lado." },
          { nome: "Elmo da Ocultação Noturna", tipo: "Ativo", continuidade: null, descricao: "Fica completamente invisível para olhos humanos e câmeras térmicas na penumbra." },
          { nome: "Cristalização de Minérios", tipo: "Ativo", continuidade: null, descricao: "Endurece a pele com pó de diamante negro, aumentando a defesa física em 30%." }
        ]
      },
      {
        nivel: 4,
        titulo: "Nível 4 — As Chamas Negras do Tártaro",
        poderes: [
          { nome: "Umbracinese III", tipo: "Ativo", continuidade: "III", descricao: "Cria uma cúpula de escuridão total que drena a sanidade e o mana dos que estão dentro." },
          { nome: "Fogo do Submundo", tipo: "Ativo", continuidade: null, descricao: "Dispara chamas negras inextinguíveis que queimam a alma e não apagam com água." },
          { nome: "Aura de Pavor Mortífero", tipo: "Passivo", continuidade: null, descricao: "Inimigos que encaram o agente tremem, sofrendo penalidade de -20% de precisão." }
        ]
      },
      {
        nivel: 5,
        titulo: "Nível 5 — O Senhor das Almas",
        poderes: [
          { nome: "Umbracinese Final", tipo: "Ativo", continuidade: "Final", descricao: "Domínio absoluto das trevas. Cria lâminas e muralhas de escuridão indestrutíveis." },
          { nome: "Viagem pelas Sombras II", tipo: "Ativo", continuidade: "II", descricao: "Teletransporte de longa distância para qualquer local de Londres onde haja escuridão." },
          { nome: "Dreno de Vida Cadavérico", tipo: "Ativo", continuidade: null, descricao: "Rouba 30% do HP de um alvo ferido para restaurar a própria vitalidade instantaneamente." }
        ]
      },
      {
        nivel: 6,
        titulo: "Nível 6 — Falange do Subterrâneo",
        poderes: [
          { nome: "Exército de Almas Vingativas", tipo: "Ativo", continuidade: null, descricao: "Invoca uma legião de espíritos guerreiros que atacam e atravessam armaduras físicas." },
          { nome: "Gelo do Rio Estige", tipo: "Ativo", continuidade: null, descricao: "Congela o sangue dos adversários com água amaldiçoada do submundo." },
          { nome: "Imunidade à Necrose e Veneno", tipo: "Passivo", continuidade: null, descricao: "Imunidade completa a venenos biológicos, apodrecimento e maldições cadavéricas." }
        ]
      },
      {
        nivel: 7,
        titulo: "Nível 7 — O Julgamento de Plutão",
        poderes: [
          { nome: "Abertura dos Portões do Tártaro", tipo: "Supremo", continuidade: null, descricao: "Abre uma fenda direta para o Tártaro sob os pés dos inimigos, consumindo suas almas no abismo." },
          { nome: "Coroa dos Mortos Imortais", tipo: "Passivo", continuidade: null, descricao: "Ao sofrer dano letal, o agente revive imediatamente com 50% de HP uma vez por missão." },
          { nome: "Mestre da Morte e das Riquezas", tipo: "Passivo", continuidade: null, descricao: "Garante o dobro de recompensas em ouro, dracmas e relíquias raras em todas as operações." }
        ]
      }
    ]
  },
  {
    id: "hera",
    name: "Hera / Juno",
    titulo: "Rainha dos Deuses • Deusa do matrimônio, fidelidade, nobreza e soberania",
    panteao: "greco-romano",
    panteaoLabel: "Greco-Romano",
    reino: "olimpianos",
    reinoLabel: "Monarquia Olimpiana",
    classes: ["destino", "sonho"],
    icon: "👑",
    descricao: "Matriarca do Olimpo. Seus herdeiros tecem laços de lealdade inquebráveis, punem traições com maldições de fraqueza e erguem auras de autoridade real.",
    arvore: [
      {
        nivel: 1,
        titulo: "Nível 1 — Aura da Matriarca",
        poderes: [
          { nome: "Voz de Comando Matriarcal", tipo: "Ativo", continuidade: null, descricao: "Emite uma ordem inquestionável que força um oponente a hesitar por 1 turno." },
          { nome: "Sentido de Fidelidade", tipo: "Passivo", continuidade: null, descricao: "Detecta intenções desonestas, mentiras em pactos e planos de traição." },
          { nome: "Bênção da União", tipo: "Passivo", continuidade: null, descricao: "Aliados que lutam lado a lado recebem +10% de resistência a dano." }
        ]
      },
      {
        nivel: 7,
        titulo: "Nível 7 — Soberania Imutável",
        poderes: [
          { nome: "Sentença da Rainha Celestial", tipo: "Supremo", continuidade: null, descricao: "Anula todos os poderes divinos do traidor por 3 rodadas completas." },
          { nome: "Pavão de Cem Olhos de Argos", tipo: "Ativo", continuidade: null, descricao: "Vigia todos os movimentos no campo de batalha, impedindo ataques surpresa." },
          { nome: "Pacto de Honra Eterna", tipo: "Passivo", continuidade: null, descricao: "Nenhum membro do esquadrão pode ser morto instantaneamente enquanto a rainha estiver de pé." }
        ]
      }
    ]
  },
  {
    id: "demeter",
    name: "Deméter / Ceres",
    titulo: "Deusa da agricultura, colheita, estações e nutrição",
    panteao: "greco-romano",
    panteaoLabel: "Greco-Romano",
    reino: "olimpianos",
    reinoLabel: "Monarquia Olimpiana",
    classes: ["desejo", "destino"],
    icon: "🌾",
    descricao: "Senhora da terra fértil e dos ciclos da natureza. Seus filhos controlam raízes espinhosas, aceleram o crescimento de plantas medicinais e manipulam as estações.",
    arvore: [
      {
        nivel: 1,
        titulo: "Nível 1 — Broto Sagrado",
        poderes: [
          { nome: "Fitocinese I", tipo: "Ativo", continuidade: "I", descricao: "Faz brotar vinhas e grama espessa do solo para prender os pés de um adversário." },
          { nome: "Bênção dos Grãos", tipo: "Ativo", continuidade: null, descricao: "Cria frutos que saciam a fome e removem fadiga extrema de um aliado." },
          { nome: "Sentido da Terra", tipo: "Passivo", continuidade: null, descricao: "Sente vibrações no solo causadas por passos subterrâneos ou emboscadas." }
        ]
      },
      {
        nivel: 7,
        titulo: "Nível 7 — O Grande Inverno e Renascimento",
        poderes: [
          { nome: "Fome de Ceres / Colheita Amaldiçoada", tipo: "Supremo", continuidade: null, descricao: "Seca a energia vital dos inimigos em área, transferindo todo o vigor para o esquadrão." },
          { nome: "Muralha de Espinhos Milenares", tipo: "Ativo", continuidade: null, descricao: "Ergue florestas impenetráveis de troncos de carvalho sagrado em segundos." },
          { nome: "Ciclo Imortal das Estações", tipo: "Passivo", continuidade: null, descricao: "Concede imunidade a efeitos de frio e calor extremos para todo o esquadrão." }
        ]
      }
    ]
  },
  {
    id: "hestia",
    name: "Héstia / Vesta",
    titulo: "Deusa do lar, fogo sagrado, lareira e família",
    panteao: "greco-romano",
    panteaoLabel: "Greco-Romano",
    reino: "olimpianos",
    reinoLabel: "Monarquia Olimpiana",
    classes: ["destino", "desejo"],
    icon: "🕯️",
    descricao: "Guardiã da chama viva que nunca se apaga. Seus seguidores criam zonas de refúgio absoluto, curam o cansaço dos feridos e queimam impurezas espirituais.",
    arvore: [
      {
        nivel: 1,
        titulo: "Nível 1 — Centelha da Lareira",
        poderes: [
          { nome: "Chama Restauradora I", tipo: "Ativo", continuidade: "I", descricao: "Gera fogo branco que não queima carne saudável, mas fecha cortes leves e remove o frio." },
          { nome: "Aura de Paz Doméstica", tipo: "Passivo", continuidade: null, descricao: "Reduz a agressividade de bestas selvagens e diminui o pânico do grupo." },
          { nome: "Luz Acolhedora", tipo: "Ativo", continuidade: null, descricao: "Ilumina a escuridão mística e afasta pequenos espíritos errantes." }
        ]
      },
      {
        nivel: 7,
        titulo: "Nível 7 — O Santuário Inviolável",
        poderes: [
          { nome: "A Lareira Eterna de Avalon", tipo: "Supremo", continuidade: null, descricao: "Cria uma cúpula impenetrável de fogo sagrado onde nenhum aliado pode ser ferido por 2 turnos." },
          { nome: "Chama Purificadora de Vesta", tipo: "Ativo", continuidade: null, descricao: "Queima todas as maldições, venenos e possessões demoníacas presentes no local." },
          { nome: "Presença Incorruptível", tipo: "Passivo", continuidade: null, descricao: "O agente é completamente imune a insanidade, corrupção abissal e desespero." }
        ]
      }
    ]
  },
  {
    id: "afrodite",
    name: "Afrodite / Vênus",
    titulo: "Deusa do amor, beleza, sedução, paixão e fertilidade",
    panteao: "greco-romano",
    panteaoLabel: "Greco-Romano",
    reino: "olimpianos",
    reinoLabel: "Monarquia Olimpiana",
    classes: ["desejo", "desespero"],
    icon: "🕊️",
    descricao: "Senhora da atração irresistível e dos desejos mais ardentes. Seus herdeiros encantam mentes mortais e divinas, forçam inimigos a lutar entre si e curam com o toque.",
    arvore: [
      {
        nivel: 1,
        titulo: "Nível 1 — Charme dos Espelhos",
        poderes: [
          { nome: "Charme Vocal I", tipo: "Ativo", continuidade: "I", descricao: "Palavras doces que fazem guardas hesitarem ou concederem favores menores sem desconfiança." },
          { nome: "Beleza Incomparável", tipo: "Passivo", continuidade: null, descricao: "Inimigos hesitam em desferir o primeiro golpe contra o personagem." },
          { nome: "Toque Calmante", tipo: "Ativo", continuidade: null, descricao: "Acalma o estresse mental de um aliado, restaurando sua precisão." }
        ]
      },
      {
        nivel: 7,
        titulo: "Nível 7 — A Dança da Paixão Destrutiva",
        poderes: [
          { nome: "Sedução Primordial da Espuma do Mar", tipo: "Supremo", continuidade: null, descricao: "Enfeitiça o chefe inimigo, forçando-o a atacar seus próprios aliados por 1 turno inteiro." },
          { nome: "Coração Despedaçado", tipo: "Ativo", continuidade: null, descricao: "Inflige dano mental devastador ao romper uma ilusão amorosa na mente do alvo." },
          { nome: "Cinturão de Ouro de Afrodite", tipo: "Passivo", continuidade: null, descricao: "Multiplica o carisma e a eficácia de todas as habilidades de suporte e barganha por 3." }
        ]
      }
    ]
  },
  {
    id: "apolo",
    name: "Apolo / Phoebus",
    titulo: "Deus do sol, medicina, música, arco e profecias",
    panteao: "greco-romano",
    panteaoLabel: "Greco-Romano",
    reino: "olimpianos",
    reinoLabel: "Monarquia Olimpiana",
    classes: ["desejo", "destruicao"],
    icon: "☀️",
    descricao: "Senhor da luz radiante, mestre arqueiro e médico supremo. Seus filhos desferem flechas de luz solar incandescente, curam feridas fatais e vislumbram o futuro próximo.",
    arvore: [
      {
        nivel: 1,
        titulo: "Nível 1 — Flecha do Amanhecer",
        poderes: [
          { nome: "Fotocinese I", tipo: "Ativo", continuidade: "I", descricao: "Gera feixes de luz solar concentrada que cegam momentaneamente e queimam alvos das sombras." },
          { nome: "Pontaria Solar Instintiva", tipo: "Passivo", continuidade: null, descricao: "Visão aguçada que elimina penalidades de distância para armas de longo alcance." },
          { nome: "Canto Harmonioso", tipo: "Ativo", continuidade: null, descricao: "Entoa uma melodia que acelera a cicatrização natural de aliados em descanso." }
        ]
      },
      {
        nivel: 7,
        titulo: "Nível 7 — A Carruagem do Sol Radiante",
        poderes: [
          { nome: "O Disparo do Sol Invictus", tipo: "Supremo", continuidade: null, descricao: "Dispara uma flecha de puro fogo solar que explode como uma supernova em miniatura." },
          { nome: "Profecia do Oráculo de Delfos", tipo: "Passivo", continuidade: null, descricao: "Permite esquivar automaticamente do primeiro ataque mortal recebido em cada combate." },
          { nome: "Milagre Médico de Asclépio", tipo: "Ativo", continuidade: null, descricao: "Cura completamente todo o HP e regenera membros amputados de um companheiro caído." }
        ]
      }
    ]
  },
  {
    id: "ares",
    name: "Ares / Marte",
    titulo: "Deus da guerra sangrenta, fúria bélica e massacre",
    panteao: "greco-romano",
    panteaoLabel: "Greco-Romano",
    reino: "olimpianos",
    reinoLabel: "Monarquia Olimpiana",
    classes: ["destruicao", "morte"],
    icon: "⚔️",
    descricao: "A personificação da brutalidade e da violência nos campos de batalha. Seus filhos entram em frenesi berserk, dominam qualquer arma corpo a corpo e se fortalecem com o sangue derramado.",
    arvore: [
      {
        nivel: 1,
        titulo: "Nível 1 — Sangue e Ferro",
        poderes: [
          { nome: "Fúria Bélica I", tipo: "Ativo", continuidade: "I", descricao: "Aumenta o dano de ataques físicos em +20% durante 3 turnos, reduzindo o medo da dor." },
          { nome: "Maestria em Armas Brancas", tipo: "Passivo", continuidade: null, descricao: "Habilidade inata de lutar perfeitamente com espadas, lanças, machados e adagas." },
          { nome: "Intimidação Sangrenta", tipo: "Passivo", continuidade: null, descricao: "Grito de guerra que faz os mais fracos recuarem com medo nos olhos." }
        ]
      },
      {
        nivel: 7,
        titulo: "Nível 7 — O Massacre do Deus da Guerra",
        poderes: [
          { nome: "Carnificina de Marte", tipo: "Supremo", continuidade: null, descricao: "Entra em transe de destruição total onde cada golpe desferido espalha dano em 360 graus." },
          { nome: "Imortalidade na Batalha", tipo: "Passivo", continuidade: null, descricao: "O agente não cai inconsciente mesmo chegando a 0 de HP enquanto houver inimigos vivos." },
          { nome: "Armamento Forjado no Sangue", tipo: "Passivo", continuidade: null, descricao: "Suas armas causam ferimentos profundos que não podem ser curados durante a luta." }
        ]
      }
    ]
  },
  {
    id: "artemis",
    name: "Ártemis / Diana",
    titulo: "Deusa da lua, caça, feras selvagens e florestas",
    panteao: "greco-romano",
    panteaoLabel: "Greco-Romano",
    reino: "olimpianos",
    reinoLabel: "Monarquia Olimpiana",
    classes: ["destruicao", "delirio"],
    icon: "🏹",
    descricao: "Senhora da lua prateada e caçadora implacável. Seus herdeiros movem-se em silêncio absoluto, invocam matilhas de lobos espectrais e disparam flechas de prata lunar.",
    arvore: [
      {
        nivel: 1,
        titulo: "Nível 1 — Rastro Silencioso",
        poderes: [
          { nome: "Passo da Caçadora I", tipo: "Passivo", continuidade: "I", descricao: "Passos que não fazem som em nenhuma superfície e não deixam pegadas rastreáveis." },
          { nome: "Tiro de Prata Lunar", tipo: "Ativo", continuidade: null, descricao: "Dispara flechas com brilho argênteo que causam dano triplo contra monstros e licantropos." },
          { nome: "Comunicação com Canídeos e Feras", tipo: "Passivo", continuidade: null, descricao: "Pacto de respeito com lobos, cães de caça e felinos da floresta." }
        ]
      },
      {
        nivel: 7,
        titulo: "Nível 7 — A Caçada Selvagem Eterna",
        poderes: [
          { nome: "Flecha da Lua Cheia de Diana", tipo: "Supremo", continuidade: null, descricao: "Disparo que perfura múltiplos alvos em linha reta e invoca uma chuva de meteoros lunares." },
          { nome: "Matilha Sagrada de Lobos Argênteos", tipo: "Ativo", continuidade: null, descricao: "Invoca 4 lobos espectrais indestrutíveis para caçar e estraçalhar a presa marcada." },
          { nome: "Olhar da Predadora Suprema", tipo: "Passivo", continuidade: null, descricao: "Nenhum alvo que tenha sido ferido pela caçadora consegue se esconder ou fugir do campo." }
        ]
      }
    ]
  },
  {
    id: "atena",
    name: "Atena / Minerva",
    titulo: "Deusa da sabedoria, estratégia militar, artesanato e justiça tática",
    panteao: "greco-romano",
    panteaoLabel: "Greco-Romano",
    reino: "olimpianos",
    reinoLabel: "Monarquia Olimpiana",
    classes: ["destino", "sonho"],
    icon: "🦉",
    descricao: "Mente brilhante da vitória tática. Seus filhos calculam as probabilidades de combate em milissegundos, expõem fraquezas nos planos inimigos e comandam esquadrões com precisão milimétrica.",
    arvore: [
      {
        nivel: 1,
        titulo: "Nível 1 — Olho da Coruja",
        poderes: [
          { nome: "Cálculo Estratégico I", tipo: "Passivo", continuidade: "I", descricao: "Antecipa o primeiro golpe do adversário, ganhando +20% de chance de esquiva ou apara." },
          { nome: "Memória Fotográfica Rúnica", tipo: "Passivo", continuidade: null, descricao: "Memoriza mapas, códigos e idiomas antigos instantaneamente com uma única olhada." },
          { nome: "Golpe Tático no Ponto Fraco", tipo: "Ativo", continuidade: null, descricao: "Identifica a brecha na postura do alvo e desfere um golpe de dano ampliado." }
        ]
      },
      {
        nivel: 7,
        titulo: "Nível 7 — O Trunfo da Vitória Tática",
        poderes: [
          { nome: "A Égide de Minerva", tipo: "Supremo", continuidade: null, descricao: "Ergue o escudo com a face da Górgona, petrificando alvos fracos e bloqueando todo ataque frontal." },
          { nome: "Comando Perfeito da Vitória", tipo: "Ativo", continuidade: null, descricao: "Concede a todos os membros do esquadrão ação extra e crítico garantido na rodada." },
          { nome: "Mente Onisciente de Batalha", tipo: "Passivo", continuidade: null, descricao: "Impossível de ser surpreendido, flanqueado ou desarmado por qualquer técnica militar." }
        ]
      }
    ]
  },
  {
    id: "dionisio",
    name: "Dionísio / Baco",
    titulo: "Deus do vinho, êxtase, loucura, teatro e festas",
    panteao: "greco-romano",
    panteaoLabel: "Greco-Romano",
    reino: "olimpianos",
    reinoLabel: "Monarquia Olimpiana",
    classes: ["delirio", "desespero"],
    icon: "🍇",
    descricao: "Senhor da embriaguez mística e da insanidade. Seus seguidores induzem delírios alucinatórios nos adversários, transformam água em vinho e removem as inibições do esquadrão.",
    arvore: [
      {
        nivel: 1,
        titulo: "Nível 1 — Névoa do Êxtase",
        poderes: [
          { nome: "Toque Ébrio I", tipo: "Ativo", continuidade: "I", descricao: "Induz vertigem e perda de equilíbrio no oponente tocado, reduzindo sua velocidade." },
          { nome: "Imunidade a Toxinas e Álcool", tipo: "Passivo", continuidade: null, descricao: "O corpo metaboliza qualquer veneno ou bebida sem sofrer efeitos nocivos." },
          { nome: "Manipulação de Vinhas e Uvas", tipo: "Ativo", continuidade: null, descricao: "Faz crescer parreiras que prendem os braços de um atirador inimigo." }
        ]
      },
      {
        nivel: 7,
        titulo: "Nível 7 — A Loucura dos Mistérios Báquicos",
        poderes: [
          { nome: "O Surto de Loucura Báquica", tipo: "Supremo", continuidade: null, descricao: "Provoca alucinações incontroláveis em todos os inimigos, fazendo-os rir, chorar e lutar entre si." },
          { nome: "Convocação das Mênades Furiosas", tipo: "Ativo", continuidade: null, descricao: "Invoca espíritos de sacerdotisas selvagens que dilaceram o alvo com fúria animalesca." },
          { nome: "Teatro da Realidade Distorcida", tipo: "Passivo", continuidade: null, descricao: "Transforma ferimentos sofridos em ilusões temporárias, adiando o dano recebido." }
        ]
      }
    ]
  },
  {
    id: "hefesto",
    name: "Hefesto / Vulcano",
    titulo: "Deus das forjas, vulcões, fogo divino, artesanato e tecnologia",
    panteao: "greco-romano",
    panteaoLabel: "Greco-Romano",
    reino: "olimpianos",
    reinoLabel: "Monarquia Olimpiana",
    classes: ["destruicao", "destino"],
    icon: "🔨",
    descricao: "Mestre supremo dos ferreiros e artífices. Seus descendentes forjam autômatos mecânicos, encantam armaduras com runas antigas e manipulam metal incandescente e lava.",
    arvore: [
      {
        nivel: 1,
        titulo: "Nível 1 — Calor da Bigorna",
        poderes: [
          { nome: "Resistência ao Fogo e Calor I", tipo: "Passivo", continuidade: "I", descricao: "Pele imune a queimaduras de primeiro e segundo grau e a metais quentes." },
          { nome: "Reparo Rápido de Equipamentos", tipo: "Ativo", continuidade: null, descricao: "Conserta lâminas quebradas, armas travadas ou blindagens em poucos segundos." },
          { nome: "Golpe de Bigorna", tipo: "Ativo", continuidade: null, descricao: "Golpe contundente que destrói a armadura ou o escudo de madeira do alvo." }
        ]
      },
      {
        nivel: 7,
        titulo: "Nível 7 — A Forja Primordial do Vulcão",
        poderes: [
          { nome: "O Martelo de Vulcano e Lava", tipo: "Supremo", continuidade: null, descricao: "Desencadeia uma erupção de lava subterrânea e forja armas divinas instantaneamente no combate." },
          { nome: "Criação de Autômato Titânico", tipo: "Ativo", continuidade: null, descricao: "Constrói um colosso de bronze vivo (Talos) para proteger a retaguarda do grupo." },
          { nome: "Mestre da Engenharia Divina", tipo: "Passivo", continuidade: null, descricao: "Todas as armas e armaduras usadas pelo esquadrão recebem +30% de durabilidade e ataque." }
        ]
      }
    ]
  },
  {
    id: "hermes",
    name: "Hermes / Mercúrio",
    titulo: "Deus dos viajantes, ladrões, velocidade, comércio, mensageiros e astúcia",
    panteao: "greco-romano",
    panteaoLabel: "Greco-Romano",
    reino: "olimpianos",
    reinoLabel: "Monarquia Olimpiana",
    classes: ["sonho", "delirio"],
    icon: "🪽",
    descricao: "O mais rápido e engenhoso dos deuses. Seus filhos possuem velocidade espantosa, maestria no arrombamento de cofres e portas místicas, e lábia inigualável.",
    arvore: [
      {
        nivel: 1,
        titulo: "Nível 1 — Asas nos Pés",
        poderes: [
          { nome: "Velocidade Acelerada I", tipo: "Passivo", continuidade: "I", descricao: "Move-se 30% mais rápido que qualquer humano comum e salta grandes distâncias." },
          { nome: "Mãos Leves de Mercúrio", tipo: "Ativo", continuidade: null, descricao: "Furta chaves, carteiras ou pequenos amuletos sem que o alvo perceba o contato." },
          { nome: "Poliglota Universal", tipo: "Passivo", continuidade: null, descricao: "Capaz de compreender e falar línguas mortas, dialetos modernos e gírias de rua." }
        ]
      },
      {
        nivel: 7,
        titulo: "Nível 7 — O Voo dos Deuses Mensageiros",
        poderes: [
          { nome: "O Passo Dimensional de Hermes", tipo: "Supremo", continuidade: null, descricao: "Move-se tão rápido que para o tempo ao seu redor durante 1 turno completo para agir livremente." },
          { nome: "O Caduceu dos Sonhos e Paz", tipo: "Ativo", continuidade: null, descricao: "Faz todos os combatentes menores caírem em sono profundo instantâneo." },
          { nome: "Gatuno do Destino", tipo: "Passivo", continuidade: null, descricao: "Capaz de 'furtar' o buff temporário de um inimigo e aplicá-lo em si mesmo." }
        ]
      }
    ]
  },
  {
    id: "hecate",
    name: "Hécate / Trívia",
    titulo: "Senhora de Érebos • Deusa da magia arcana, encruzilhadas, noite e lua tríplice",
    panteao: "greco-romano",
    panteaoLabel: "Greco-Romano",
    reino: "ctonicos",
    reinoLabel: "Monarquia Infernal",
    classes: ["desespero", "sonho"],
    icon: "🔮",
    descricao: "Mãe da feitiçaria e guardiã dos portais entre mundos. Seus herdeiros (Bruxos) utilizam encantamentos com comandos vocais, invocam chamas espectrais e manipulam o Véu.",
    arvore: [
      {
        nivel: 1,
        titulo: "Nível 1 — Tocha de Trívia",
        poderes: [
          { nome: "Visão das Três Luas", tipo: "Passivo", continuidade: null, descricao: "Enxerga o fluxo de mana e detecta runas mágicas ou armadilhas ocultas." },
          { nome: "Chama Espectral Verde", tipo: "Ativo", continuidade: null, descricao: "Dispara fogo místico que queima o mana do alvo em vez de queimar a pele." },
          { nome: "Feitiço Menor Vocal: 'Lumos Occultus'", tipo: "Ativo", continuidade: null, descricao: "Ilumina o invisível e dissipa névoas artificiais com comando de voz." }
        ]
      },
      {
        nivel: 7,
        titulo: "Nível 7 — A Encruzilhada dos Três Mundos",
        poderes: [
          { nome: "A Dança da Lua Negra de Hécate", tipo: "Supremo", continuidade: null, descricao: "Rasga o Véu entre a Terra e o Érebo, convocando um turbilhão arcano que desintegra magias inimigas." },
          { nome: "Cães Infernais da Noite", tipo: "Ativo", continuidade: null, descricao: "Invoca 2 bestas espectrais com tochas acesas para caçar traidores da magia." },
          { nome: "Mestre dos Feitiços sem Vocal", tipo: "Passivo", continuidade: null, descricao: "Pode conjurar qualquer magia do Grimório apenas com a força do pensamento." }
        ]
      }
    ]
  },
  {
    id: "ra",
    name: "Rá",
    titulo: "Soberano Solar do Zep Tepi • Criador primordial e senhor da luz do Duat",
    panteao: "egipcio",
    panteaoLabel: "Panteão Egípcio",
    reino: "egipcios-nobres",
    reinoLabel: "Monarquia do Duat",
    role: "dps",
    classes: ["destino", "sonho"],
    icon: "𓋹",
    descricao: "O grande Sol que viaja na barca de ouro e derrota a serpente Apófis toda noite. Seus descendentes comandam raios solares purificadores e a luz da criação.",
    arvore: [
      {
        nivel: 1,
        titulo: "Nível 1 — Olho do Sol Nascente",
        poderes: [
          { nome: "Luminocinese Sagrada I", tipo: "Ativo", continuidade: "I", descricao: "Emana calor e radiação suave que cega mortais e purifica toxinas do sangue." },
          { nome: "Hieróglifos de Fogo", tipo: "Ativo", continuidade: null, descricao: "Inscreve no ar símbolos egípcios que explodem ao serem tocados por inimigos." },
          { nome: "Trono das Eras", tipo: "Passivo", continuidade: null, descricao: "Imunidade à desidratação, calor extremo e miragens das areias do Duat." }
        ]
      },
      {
        nivel: 7,
        titulo: "Nível 7 — A Barca Solar de Milhões de Anos",
        poderes: [
          { nome: "A Ira do Meio-Dia de Rá", tipo: "Supremo", continuidade: null, descricao: "Desce um pilar de luz solar cósmica que reduz abominações do caos a cinzas instantâneas." },
          { nome: "Destruição de Apófis", tipo: "Passivo", continuidade: null, descricao: "Causa dano quádruplo contra entidades de sombras, serpentes e demônios do caos." },
          { nome: "O Renascimento da Fênix Bennu", tipo: "Passivo", continuidade: null, descricao: "Ao morrer em batalha, ressurge em uma explosão de brasas restaurando a vida." }
        ]
      }
    ]

  },
  {
    id: "relogio",
    name: "Torre do Relógio",
    titulo: "Associação Britânica de Magos e Alquimistas Herméticos de Londres",
    panteao: "organizacoes",
    panteaoLabel: "Organizações & Raças",
    reino: "menores",
    reinoLabel: "Organizações & Raças",
    classes: ["destino", "sonho"],
    icon: "🕰️",
    descricao: "A mais prestigiada facção acadêmica de magia ocidental. Seus membros utilizam circuitos mágicos gravados na pele, alquimia de éter e manipulação cronal do tempo.",
    arvore: [
      {
        nivel: 1,
        titulo: "Nível 1 — Circuito Gravado",
        poderes: [
          { nome: "Ativação de Circuitos Mágicos I", tipo: "Ativo", continuidade: "I", descricao: "Canaliza éter através de linhas gravadas na pele para reforçar socos e chutes com força de impacto." },
          { nome: "Alquimia de Transmutação Menor", tipo: "Ativo", continuidade: null, descricao: "Converte terra em ferro ou madeira em água para utilidades de campo." },
          { nome: "Análise Estrutural Hermética", tipo: "Passivo", continuidade: null, descricao: "Enxerga linhas de tensão em paredes, pontes e armaduras para encontrar o ponto de quebra." }
        ]
      },
      {
        nivel: 7,
        titulo: "Nível 7 — O Trunfo da Magia Verdadeira",
        poderes: [
          { nome: "Aceleração Temporal Cronal", tipo: "Supremo", continuidade: null, descricao: "Multiplica a velocidade do próprio tempo por 5, realizando 5 ações antes que o inimigo pisque." },
          { nome: "Projeção de Cristais de Éter Puro", tipo: "Ativo", continuidade: null, descricao: "Dispara uma barragem de 50 lâminas de éter condensado teleguiadas." },
          { nome: "Mente Compartilhada dos Mestres", tipo: "Passivo", continuidade: null, descricao: "Acesso instantâneo a todos os conhecimentos registrados na Biblioteca de Alexandria." }
        ]
      }
    ]
  },
  {
    id: "vampiros",
    name: "Vampiros (Apóstolos Mortos)",
    titulo: "Predadores Noturnos Milenares e Nobreza de Sangue de Londres",
    panteao: "organizacoes",
    panteaoLabel: "Organizações & Raças",
    reino: "ctonicos",
    reinoLabel: "Organizações & Raças",
    classes: ["morte", "destruicao"],
    icon: "🦇",
    descricao: "Criaturas imortais da noite que dominam a manipulação biológica do sangue, regeneração celular hiper-acelerada e hipnose predatória.",
    arvore: [
      {
        nivel: 1,
        titulo: "Nível 1 — Sangue Noturno",
        poderes: [
          { nome: "Regeneração Celular Rápida I", tipo: "Passivo", continuidade: "I", descricao: "Cura automaticamente pequenos cortes e fraturas a cada turno." },
          { nome: "Presas Predatórias e Mordida", tipo: "Ativo", continuidade: null, descricao: "Morde um alvo imobilizado para drenar sangue, recuperando vigor e mana." },
          { nome: "Visão Noturna Perfeita", tipo: "Passivo", continuidade: null, descricao: "Enxerga no escuro total como se fosse pleno dia e detecta batimentos cardíacos." }
        ]
      },
      {
        nivel: 7,
        titulo: "Nível 7 — O Verdadeiro Ancestral de Sangue",
        poderes: [
          { nome: "O Mar de Sangue Carmesim", tipo: "Supremo", continuidade: null, descricao: "Desintegra o corpo em uma névoa de morcegos e sangue líquido impenetrável por ataques físicos." },
          { nome: "Hipnose dos Olhos Carmesins", tipo: "Ativo", continuidade: null, descricao: "Controla a mente de mortais e semideuses fracos transformando-os em servos obedientes." },
          { nome: "Imortalidade da Noite Eterna", tipo: "Passivo", continuidade: null, descricao: "Regenera qualquer ferimento letal contanto que o coração não seja atravessado por madeira sagrada." }
        ]
      }
    ]
  },
  {
    id: "persefone",
    name: "Perséfone / Proserpina",
    titulo: "Rainha do Submundo • Senhora da Primavera e dos Ciclos",
    panteao: "greco-romano",
    panteaoLabel: "Greco-Romano",
    reino: "ctonicos",
    reinoLabel: "Monarquia Infernal",
    classes: ["desejo", "morte"],
    icon: "🌺",
    docUrl: "https://docs.google.com/document/d/e/2PACX-1vSIXyEfmFMbFYeHYBzAHytwF3DecAnlCvMCdmHC7O5EN_BFK-UlTAGR9xxZ4G3xcQ46S2xn0rCdmdqe/pub",
    descricao: "Soberana que transita entre a vida e a morte. Seus herdeiros manipulam sementes de romã estígias, flores venenosas e o sono profundo que precede o renascimento primaveril.",
    arvore: [
      {
        nivel: 1,
        titulo: "Nível 1 — Pétala do Submundo",
        poderes: [
          { nome: "Flor de Asfódelo I", tipo: "Ativo", continuidade: "I", descricao: "Gera flores espectrais que acalmam almas errantes e drenam a fúria de inimigos." },
          { nome: "Sabor da Romã", tipo: "Passivo", continuidade: null, descricao: "Imunidade ao desespero e vínculos de lealdade com criaturas do submundo." },
          { nome: "Aroma Entorpecente", tipo: "Ativo", continuidade: null, descricao: "Libera pólen que reduz em 15% a velocidade e os reflexos dos adversários." }
        ]
      },
      {
        nivel: 7,
        titulo: "Nível 7 — O Despertar da Rainha",
        poderes: [
          { nome: "A Caixa do Sono Estígio", tipo: "Supremo", continuidade: null, descricao: "Libera o sono das profundezas, mergulhando todos os inimigos em coma espiritual." },
          { nome: "Primavera no Inferno", tipo: "Ativo", continuidade: null, descricao: "Faz brotar vida verdejante em solo corrompido, purificando qualquer maldição em área." },
          { nome: "Dualidade Imortal", tipo: "Passivo", continuidade: null, descricao: "Pode alternar entre postura de Cura Radiante e Postura de Dreno Ctônico livremente." }
        ]
      }
    ]
  },
  {
    id: "melinoe",
    name: "Melinoe / Phantessa",
    titulo: "Princesa dos Perdidos • Deusa dos fantasmas, ritos funerários e loucura noturna",
    panteao: "greco-romano",
    panteaoLabel: "Greco-Romano",
    reino: "ctonicos",
    reinoLabel: "Monarquia Infernal",
    classes: ["desespero", "delirio"],
    icon: "👻",
    docUrl: "https://docs.google.com/document/d/e/2PACX-1vTzTAJMx2OVTOj_8Txj0FuMMGfg1mC76JsJjdXOfrnxYlqm9O4k5Ndp_P9LiNqJhFyI71c78UsvWyZ6/pub",
    descricao: "Filha de Hades e Perséfone de corpo meio luz e meio escuridão. Seus seguidores lideram cortejos espectrais que enlouquecem quem ousa cruzar o caminho noturno.",
    arvore: [
      {
        nivel: 1,
        titulo: "Nível 1 — Ecos Funerários",
        poderes: [
          { nome: "Toque Espectral I", tipo: "Ativo", continuidade: "I", descricao: "Atravessa barreiras físicas com as mãos, tocando diretamente o órgão vital do alvo." },
          { nome: "Lamento dos Sem Sepultura", tipo: "Ativo", continuidade: null, descricao: "Grito aterrorizante que desorienta os cinco sentidos de alvos vivos." },
          { nome: "Manto Bicolor", tipo: "Passivo", continuidade: null, descricao: "Camufla-se tanto na luz pura quanto na escuridão profunda com a mesma eficácia." }
        ]
      },
      {
        nivel: 7,
        titulo: "Nível 7 — O Cortejo das Sombras Errantes",
        poderes: [
          { nome: "A Dança dos Espectros Vingativos", tipo: "Supremo", continuidade: null, descricao: "Invoca uma procissão de almas que atravessa o campo de batalha, arrancando a alma dos inimigos." },
          { nome: "Possessão Fantasmagórica", tipo: "Ativo", continuidade: null, descricao: "Assume o controle físico do corpo do adversário por 2 turnos completos." },
          { nome: "Imaterialidade Quase Absoluta", tipo: "Passivo", continuidade: null, descricao: "70% de chance de ignorar completamente ataques físicos não encantados com ferro estígio." }
        ]
      }
    ]
  },
  {
    id: "tanatos",
    name: "Tânatos / Letus",
    titulo: "A Personificação da Morte Pacífica • O Ceifador das Almas Mortais",
    panteao: "greco-romano",
    panteaoLabel: "Greco-Romano",
    reino: "ctonicos",
    reinoLabel: "Monarquia Infernal",
    classes: ["morte", "destruicao"],
    icon: "⚔️",
    docUrl: "https://docs.google.com/document/d/e/2PACX-1vRQMmqEiYFfw00_IEOK1A77DQvhrMpSMqI6E7ziLedOuNkCX5-JNzgngoZ9wH5iiaKpeCsY6ikyCLfr/pub",
    descricao: "Irmão gêmeo de Hipnos. Seus arautos portam lâminas de corte inevitável e desferem o toque gélido que encerra a respiração sem dor ou hesitação.",
    arvore: [
      {
        nivel: 1,
        titulo: "Nível 1 — O Fio da Vida",
        poderes: [
          { nome: "Toque de Gelo Letal I", tipo: "Ativo", continuidade: "I", descricao: "Congela o fluxo sanguíneo local com um toque na artéria carótida." },
          { nome: "Visão do Fim", tipo: "Passivo", continuidade: null, descricao: "Enxerga o tempo de vida restante e a barra de integridade biológica do alvo." },
          { nome: "Passo da Morte", tipo: "Ativo", continuidade: null, descricao: "Move-se sem emitir calor, som ou rastro dimensional por 10 metros." }
        ]
      },
      {
        nivel: 7,
        titulo: "Nível 7 — A Foice Inevitável",
        poderes: [
          { nome: "Corte do Fio do Destino", tipo: "Supremo", continuidade: null, descricao: "Executa instantaneamente qualquer criatura com menos de 25% de vida máxima." },
          { nome: "Asas de Ébano do Ceifador", tipo: "Ativo", continuidade: null, descricao: "Projeta asas negras que bloqueiam feitiços divinos e concedem voo supersônico." },
          { nome: "Imunidade ao Óbito", tipo: "Passivo", continuidade: null, descricao: "Não pode ter a alma roubada, ceifada ou manipulada por nenhuma outra entidade." }
        ]
      }
    ]
  },
  {
    id: "hipnos",
    name: "Hipnos / Somnus",
    titulo: "Personificação do Sono • Irmão da Morte e senhor do descanso profundo",
    panteao: "greco-romano",
    panteaoLabel: "Greco-Romano",
    reino: "ctonicos",
    reinoLabel: "Monarquia Infernal",
    classes: ["sonho", "desespero"],
    icon: "🪶",
    docUrl: "https://docs.google.com/document/d/e/2PACX-1vQRDMcFbbtI39gJNZ_azZOcuEKLnGx9Fo9EI1kvrMIQMfGar3F3cr8f-8XrU4fIA4MAfDkd8q45uxAg/pub",
    descricao: "Habita a caverna do rio Lete onde o silêncio é sagrado. Seus filhos fazem exércitos inteiros desmoronarem em sono letárgico e apagam memórias dolorosas.",
    arvore: [
      {
        nivel: 1,
        titulo: "Nível 1 — Gotas do Rio Lete",
        poderes: [
          { nome: "Gota do Esquecimento I", tipo: "Ativo", continuidade: "I", descricao: "Faz o alvo esquecer os últimos 5 minutos ou o comando de ataque recém-preparado." },
          { nome: "Sussurro Sonolento", tipo: "Ativo", continuidade: null, descricao: "Induz bocejos e sonolência severa, reduzindo a precisão do inimigo em 20%." },
          { nome: "Descanso Reparador", tipo: "Passivo", continuidade: null, descricao: "Aliados recuperam mana e vigor com o dobro da velocidade durante descansos curtos." }
        ]
      },
      {
        nivel: 7,
        titulo: "Nível 7 — O Sono Eterno dos Deuses",
        poderes: [
          { nome: "O Adormecer do Olimpo", tipo: "Supremo", continuidade: null, descricao: "Mergulha toda a zona de batalha em torpor estúpido, paralisando alvos por até 3 rodadas." },
          { nome: "Apagamento de Memória Permanente", tipo: "Ativo", continuidade: null, descricao: "Apaga por completo o conhecimento de magia ou técnicas do oponente." },
          { nome: "Incorpóreo no Sonho", tipo: "Passivo", continuidade: null, descricao: "Se atacado enquanto dorme, transfere o dano sofrido para o plano onírico." }
        ]
      }
    ]
  },
  {
    id: "morfeu",
    name: "Morfeu / Somnia",
    titulo: "Líder dos Oneiros • Moldador das formas humanas nos sonhos",
    panteao: "greco-romano",
    panteaoLabel: "Greco-Romano",
    reino: "ctonicos",
    reinoLabel: "Monarquia Infernal",
    classes: ["sonho", "delirio"],
    icon: "🦋",
    docUrl: "https://docs.google.com/document/d/e/2PACX-1vTQmRWw4y7E7Vphq6pG9IVr93DDkZ136mCnCn_Pz3SEbf4LtlV-Fh1W6CRqUHEXqtDweENsN5XJNIyP/pub",
    descricao: "Mestre das ilusões e dos palácios oníricos. Seus seguidores materializam fantasias em realidade física e assumem a aparência exata de qualquer ente querido do alvo.",
    arvore: [
      {
        nivel: 1,
        titulo: "Nível 1 — Tecelão de Sonhos",
        poderes: [
          { nome: "Mimetismo Onírico I", tipo: "Ativo", continuidade: "I", descricao: "Muda o rosto e voz para imitar perfeitamente alguém conhecido pelo interlocutor." },
          { nome: "Névoa Ilusória", tipo: "Ativo", continuidade: null, descricao: "Projeta cópias imóveis de si mesmo para desviar tiros e feitiços." },
          { nome: "Leitura de Desejos Noturnos", tipo: "Passivo", continuidade: null, descricao: "Descobre com facilidade o maior segredo ou trauma do oponente ao tocá-lo." }
        ]
      },
      {
        nivel: 7,
        titulo: "Nível 7 — A Realidade Onírica Desperta",
        poderes: [
          { nome: "Materialização do Pesadelo", tipo: "Supremo", continuidade: null, descricao: "Puxa a pior fobia do inimigo diretamente para o mundo real com atributos equivalentes ao chefe." },
          { nome: "Labirinto de Espelhos do Sonho", tipo: "Ativo", continuidade: null, descricao: "Prende o alvo em uma dimensão de reflexos infinitos onde o tempo passa 100x mais devagar." },
          { nome: "Arquiteto da Mente", tipo: "Passivo", continuidade: null, descricao: "Imunidade total a ilusões, feitiços mentais e torturas psicológicas." }
        ]
      }
    ]
  },
  {
    id: "paraphronia",
    name: "Paraphronia / Delírio",
    titulo: "Deusa da Irrealidade • Senhora da insanidade caótica e das leis distorcidas",
    panteao: "greco-romano",
    panteaoLabel: "Greco-Romano",
    reino: "ctonicos",
    reinoLabel: "Monarquia Infernal",
    classes: ["delirio", "desespero"],
    icon: "🌀",
    docUrl: "https://docs.google.com/document/d/e/2PACX-1vT39piSY62DBuFruxrDLp2eIdujvnZ9Zks4Fi9PFkqMUXr8XBppqfpLzZ-3XhcAriuLYVJ6pBwIySj0/pub",
    descricao: "Herdeira direta das perturbações da mente. Seus herdeiros alteram a física local, fazem cores terem gosto e sons causarem sangramento nos ouvidos inimigos.",
    arvore: [
      {
        nivel: 1,
        titulo: "Nível 1 — O Desvio dos Sentidos",
        poderes: [
          { nome: "Sinestesia Aberrante I", tipo: "Ativo", continuidade: "I", descricao: "Confunde os sentidos do inimigo fazendo a visão soar como ruído e o tato arder como fogo." },
          { nome: "Riso Involuntário", tipo: "Ativo", continuidade: null, descricao: "Provoca acessos de gargalhada histérica que impedem a conjuração verbal de feitiços." },
          { nome: "Imprevisibilidade Rúnica", tipo: "Passivo", continuidade: null, descricao: "Inimigos não conseguem calcular a probabilidade de acerto contra o personagem." }
        ]
      },
      {
        nivel: 7,
        titulo: "Nível 7 — A Fratura da Lógica",
        poderes: [
          { nome: "O Colapso da Sanidade Primordial", tipo: "Supremo", continuidade: null, descricao: "Reescreve as leis locais: projéteis voam para trás, a gravidade se inverte e o dano cura os aliados." },
          { nome: "Fera do Delírio Puro", tipo: "Ativo", continuidade: null, descricao: "Invoca uma abominação sem forma fixa que devora a lógica e as certezas do oponente." },
          { nome: "Mente Inquebrável pelo Caos", tipo: "Passivo", continuidade: null, descricao: "Por já viver na mais pura loucura, o agente não pode sofrer danos mentais ou trauma." }
        ]
      }
    ]
  },
  {
    id: "circe",
    name: "Circe / Kirke",
    titulo: "Deusa das Poções • Senhora dos metamorfos, trapaça e feitiçaria sombria",
    panteao: "greco-romano",
    panteaoLabel: "Greco-Romano",
    reino: "menores",
    reinoLabel: "Ctônicos Menores",
    classes: ["desespero", "desejo"],
    icon: "🧪",
    docUrl: "https://docs.google.com/document/d/e/2PACX-1vTb7vTEKpm4F0PBVOH-PPMAQLpQ__MIxUuRDYEsr7l0x1uEHVZHSmrLCznCl-Lzr7UqE8RbLbs2lZRK/pub",
    descricao: "A feiticeira da ilha de Eeia. Seus herdeiros destilam elixires de transmutação zoológica, encantam banquetes envenenados e dobram a vontade de guerreiros arrogantes.",
    arvore: [
      {
        nivel: 1,
        titulo: "Nível 1 — Caldeirão de Eeia",
        poderes: [
          { nome: "Mistura Transmutadora I", tipo: "Ativo", continuidade: "I", descricao: "Lança um frasco alquímico que transforma temporariamente a arma do inimigo em um galho seco." },
          { nome: "Encanto do Festim", tipo: "Ativo", continuidade: null, descricao: "Oferece comida ou bebida que força quem ingere a obedecer ordens simples sem violência." },
          { nome: "Herbalismo Sobrenatural", tipo: "Passivo", continuidade: null, descricao: "Identifica e sintetiza antídotos para qualquer veneno botânico em poucos minutos." }
        ]
      },
      {
        nivel: 7,
        titulo: "Nível 7 — A Apoteose da Feiticeira",
        poderes: [
          { nome: "A Metamorfose dos Homens em Feras", tipo: "Supremo", continuidade: null, descricao: "Transforma permanentemente um esquadrão de soldados adversários em porcos ou lobos obedientes." },
          { nome: "O Elixir da Imortalidade Menor", tipo: "Ativo", continuidade: null, descricao: "Restaura instantaneamente a juventude, mana total e todos os ferimentos graves de um aliado." },
          { nome: "Voz de Sereia Terrestre", tipo: "Passivo", continuidade: null, descricao: "Homens e seres com foco físico sofrem desvantagem constante contra suas mágicas." }
        ]
      }
    ]
  },
  {
    id: "tique",
    name: "Tique / Fortuna",
    titulo: "Deusa da Sorte • Regente dos jogos de azar, destino errante e coincidências",
    panteao: "greco-romano",
    panteaoLabel: "Greco-Romano",
    reino: "menores",
    reinoLabel: "Olimpianos Menores",
    classes: ["destino", "sonho"],
    icon: "🎲",
    docUrl: "https://docs.google.com/document/d/e/2PACX-1vSXpLoh9qAhDhLVT-u-On6Cey-PeFthcTm6ApLpqBeigvuj--3v2m1HpIO9FUm6MG7WT2TRaQRNh1rT/pub",
    descricao: "A senhora da Cornucópia e da Roda da Fortuna. Seus escolhidos manipulam rolagens de dados, provocam falhas catastróficas nas armas inimigas e acham tesouros por puro acaso.",
    arvore: [
      {
        nivel: 1,
        titulo: "Nível 1 — Roda da Sorte",
        poderes: [
          { nome: "Moeda de Duas Caras I", tipo: "Ativo", continuidade: "I", descricao: "Lança uma moeda mágica: se cair cara, garante crítico no próximo golpe; coroa garante esquiva perfeita." },
          { nome: "Tropeço Inconveniente", tipo: "Ativo", continuidade: null, descricao: "Faz o oponente tropeçar em uma pedra solta bem na hora do seu ataque mais forte." },
          { nome: "O Olho dos Cassinos", tipo: "Passivo", continuidade: null, descricao: "Sabe exatamente as cartas na mão do oponente e vence qualquer aposta casual." }
        ]
      },
      {
        nivel: 7,
        titulo: "Nível 7 — O Giro da Roda da Fortuna",
        poderes: [
          { nome: "A Cornucópia dos Milagres", tipo: "Supremo", continuidade: null, descricao: "Derrama bênçãos celestiais que revertem qualquer derrota certa em vitória miraculosa no último turno." },
          { nome: "Azar Catastrófico Universal", tipo: "Ativo", continuidade: null, descricao: "Faz todas as armas inimigas emperrarem e todos os seus feitiços sofrerem queima reversa." },
          { nome: "Protegido pelos Acasos", tipo: "Passivo", continuidade: null, descricao: "Qualquer tiro mortal mirado no agente é desviado por um pássaro, vento ou reflexo aleatório." }
        ]
      }
    ]
  },
  {
    id: "igreja",
    name: "Igreja (Guardiões do Equilíbrio)",
    titulo: "Os Executores da Fé Ortodoxa e os Caçadores das Sombras de Londres",
    panteao: "organizacoes",
    panteaoLabel: "Organizações & Raças",
    reino: "menores",
    reinoLabel: "Organizações & Raças",
    classes: ["destino", "desejo"],
    icon: "✝️",
    docUrl: "https://docs.google.com/document/d/1A0YUP_AV6og5zRyBydGJ4eUUUYgTIxk3djMLtfPiPUU/preview",
    descricao: "Ordem templária que opera nos santuários secretos de Westminster e na Catedral de São Paulo. Seus executores consagram lâminas de prata, erguem cruzes de luz e exorcizam demônios.",
    arvore: [
      {
        nivel: 1,
        titulo: "Nível 1 — Fé de Ferro",
        poderes: [
          { nome: "Água Benta Consagrada I", tipo: "Ativo", continuidade: "I", descricao: "Asperge água abençoada que queima a carne de não-mortos e entidades ctônicas como ácido." },
          { nome: "Oração de Fortalecimento", tipo: "Ativo", continuidade: null, descricao: "Aumenta a resistência a venenos e o vigor físico de todo o pelotão por 3 rodadas." },
          { nome: "Sentido dos Profanos", tipo: "Passivo", continuidade: null, descricao: "Detecta vampiros, demônios e bruxos das trevas em um raio de 30 metros." }
        ]
      },
      {
        nivel: 7,
        titulo: "Nível 7 — O Exorcismo Sagrado de Avalon",
        poderes: [
          { nome: "A Luz dos Santos Mártires", tipo: "Supremo", continuidade: null, descricao: "Um pilar de fogo celestial desce do céu desintegrando completamente demônios e vampiros." },
          { nome: "Chaves de São Pedro", tipo: "Ativo", continuidade: null, descricao: "Tranca portais dimensionais e impede a fuga ou teletransporte de qualquer criatura mágica." },
          { nome: "Manto Incorruptível da Fé", tipo: "Passivo", continuidade: null, descricao: "Imunidade absoluta a qualquer maldição, vampirismo ou contaminação de sangue." }
        ]
      }
    ]
  },
  {
    id: "isis",
    name: "Ísis",
    titulo: "Grande Mãe da Magia • Guardiã dos elementos, da cura e da vida",
    panteao: "egipcio",
    panteaoLabel: "Panteão Egípcio",
    reino: "egipcios-nobres",
    reinoLabel: "1ª Neteru (Demon Days)",
    classes: ["sonho", "desejo"],
    icon: "𓋹",
    descricao: "A mais sábia das magas divinas, conhecedora do Nome Secreto de Rá. Seus seguidores restauram corpos despedaçados, conjuram com gestos no ar e dominam todas as correntes arcanas.",
    arvore: [
      {
        nivel: 1,
        titulo: "Nível 1 — As Asas da Protetora",
        poderes: [
          { nome: "Hieróglifo de Cura I", tipo: "Ativo", continuidade: "I", descricao: "Desenha o símbolo Ankh no ar com pura mana, fechando lacerações e reanimando aliados." },
          { nome: "Sussurro do Nome Secreto", tipo: "Passivo", continuidade: null, descricao: "Capaz de conjurar feitiços egípcios sem a necessidade de recitar a fórmula em voz alta." },
          { nome: "Véu das Asas de Ísis", tipo: "Ativo", continuidade: null, descricao: "Projeta asas emplumadas translúcidas que protegem um companheiro contra rajadas arcanas." }
        ]
      },
      {
        nivel: 7,
        titulo: "Nível 7 — A Ressurreição de Osíris",
        poderes: [
          { nome: "O Milagre dos Catorze Pedaços", tipo: "Supremo", continuidade: null, descricao: "Ressuscita um aliado morto em combate com vida e mana totalmente restauradas." },
          { nome: "Comando dos Quatro Ventos de Ísis", tipo: "Ativo", continuidade: null, descricao: "Varre o campo de batalha com tempestades elementais que desarmam todo o exército rival." },
          { nome: "Soberania Arcana Absoluta", tipo: "Passivo", continuidade: null, descricao: "Reduz o custo de mana de todos os feitiços do grupo em 50% de forma permanente." }
        ]
      }
    ]
  },
  {
    id: "osiris",
    name: "Osíris",
    titulo: "Senhor da Vida e da Ressurreição • Soberano do Submundo e Juiz dos Mortos",
    panteao: "egipcio",
    panteaoLabel: "Panteão Egípcio",
    reino: "egipcios-nobres",
    reinoLabel: "1ª Neteru (Demon Days)",
    classes: ["morte", "desejo"],
    icon: "𓁹",
    descricao: "O rei que foi despedaçado e retornou como soberano do Duat. Seus herdeiros manipulam a vegetação fértil que brota da lama do Nilo e comandam as cortes do além.",
    arvore: [
      {
        nivel: 1,
        titulo: "Nível 1 — O Trono Verdejante",
        poderes: [
          { nome: "Lama Fértil do Nilo I", tipo: "Ativo", continuidade: "I", descricao: "Cobre o solo de lodo sagrado que cicatriza feridas de aliados e prende os passos inimigos." },
          { nome: "Cetro e Mangual do Faraó", tipo: "Passivo", continuidade: null, descricao: "Maestria absoluta com armas tradicionais da realeza egípcia e autoridade indiscutível." },
          { nome: "Presença dos Ancestrais", tipo: "Ativo", continuidade: null, descricao: "Invoca conselhos de faraós do passado para resolver enigmas e antecipar emboscadas." }
        ]
      },
      {
        nivel: 7,
        titulo: "Nível 7 — O Julgamento no Salão das Duas Verdades",
        poderes: [
          { nome: "A Balança do Duat", tipo: "Supremo", continuidade: null, descricao: "Arranca a alma do traidor para o julgamento final, banindo-o da existência terrena." },
          { nome: "A Ressurreição do Trono Solar", tipo: "Ativo", continuidade: null, descricao: "Restaura todas as estruturas destruídas e cura todos os combatentes aliados caídos." },
          { nome: "Corpo de Ouro e Jade", tipo: "Passivo", continuidade: null, descricao: "Pele imune a qualquer tipo de apodrecimento, veneno necrótico ou petrificação." }
        ]
      }
    ]
  },
  {
    id: "set",
    name: "Set",
    titulo: "Senhor dos Desertos • Deus da tempestade de areia, caos, violência e desejo ardente",
    panteao: "egipcio",
    panteaoLabel: "Panteão Egípcio",
    reino: "egipcios-nobres",
    reinoLabel: "1ª Neteru (Demon Days)",
    classes: ["destruicao", "desejo"],
    icon: "🦂",
    descricao: "O usurpador feroz que defende a barca solar de Rá e assassinou Osíris. Seus herdeiros desencadeiam tempestades de areia ardente, veneno de escorpião e violência desenfreada.",
    arvore: [
      {
        nivel: 1,
        titulo: "Nível 1 — O Vento Vermelho",
        poderes: [
          { nome: "Tempestade de Areia Cortante I", tipo: "Ativo", continuidade: "I", descricao: "Gera redemoinhos de areia abrasiva que rasgam os olhos e a armadura do oponente." },
          { nome: "Ferrão de Escorpião do Deserto", tipo: "Ativo", continuidade: null, descricao: "Injeta toxina abrasiva que ferve o sangue do alvo causando dor incapacitante." },
          { nome: "Fome de Conquista", tipo: "Passivo", continuidade: null, descricao: "Ganha bônus de dano cumulativo a cada golpe desferido contra alvos de maior patente." }
        ]
      },
      {
        nivel: 7,
        titulo: "Nível 7 — A Fúria do Deus Vermelho",
        poderes: [
          { nome: "O Simum do Caos Total", tipo: "Supremo", continuidade: null, descricao: "Desencadeia uma tempestade de fogo e areia que soterra quarteirões inteiros sob dunas ferventes." },
          { nome: "A Lança que Empalou Apófis", tipo: "Ativo", continuidade: null, descricao: "Golpe contundente que desintegra monstros colossais e deuses menores em um único impacto." },
          { nome: "Tirano Indomável", tipo: "Passivo", continuidade: null, descricao: "Impossível de ser submetido por qualquer autoridade divina ou encantamento de submissão." }
        ]
      }
    ]
  },
  {
    id: "horus",
    name: "Hórus",
    titulo: "Faraó Divino • Deus do céu, da vingança honrada e protetor da humanidade",
    panteao: "egipcio",
    panteaoLabel: "Panteão Egípcio",
    reino: "egipcios-nobres",
    reinoLabel: "Neteru Menor",
    classes: ["destruicao", "destino"],
    icon: "🦅",
    descricao: "Filho de Ísis e Osíris que derrotou Set para reaver a coroa do Egito. Seus guerreiros possuem o Olho de Hórus (Wedjat), asas de falcão e golpes de precisão fulminante.",
    arvore: [
      {
        nivel: 1,
        titulo: "Nível 1 — Olhar do Falcão Sagrado",
        poderes: [
          { nome: "Olho de Hórus (Wedjat) I", tipo: "Passivo", continuidade: "I", descricao: "Visão telescópica que enxerga através de ilusões, fumaça e paredes de até 1 metro." },
          { nome: "Garras do Falcão Celestial", tipo: "Ativo", continuidade: null, descricao: "Ataque aéreo rasante com lâminas curvas que corta armas de metal com facilidade." },
          { nome: "Voo das Alturas", tipo: "Ativo", continuidade: null, descricao: "Projeta asas de falcão que permitem planar em alta velocidade e escapar de armadilhas." }
        ]
      },
      {
        nivel: 7,
        titulo: "Nível 7 — A Coroa Pschent do Alto e Baixo Egito",
        poderes: [
          { nome: "A Vingança dos Céus de Hórus", tipo: "Supremo", continuidade: null, descricao: "Mergulha dos céus como um cometa dourado desferindo um impacto que abre crateras no solo." },
          { nome: "O Olho Wedjat Restaurado", tipo: "Ativo", continuidade: null, descricao: "Restaura todos os sentidos e a integridade de qualquer aliado com um feixe de luz pura." },
          { nome: "Herdeiro Legítimo do Trono", tipo: "Passivo", continuidade: null, descricao: "Garante imunidade a ataques furtivos e golpes pelas costas." }
        ]
      }
    ]
  },
  {
    id: "sekhmet",
    name: "Sekhmet",
    titulo: "A Poderosa Leoa Escarlate • Deusa da calamidade, cura bélica e da fúria de Rá",
    panteao: "egipcio",
    panteaoLabel: "Panteão Egípcio",
    reino: "egipcios-nobres",
    reinoLabel: "Neteru Menor",
    classes: ["destruicao", "desespero"],
    icon: "🦁",
    descricao: "A deusa da peste e da carnificina solar. Curiosamente, a maioria de seus seguidores busca combatê-la ou contê-la, servindo como o escudo do mundo caso ela escape do Duat.",
    arvore: [
      {
        nivel: 1,
        titulo: "Nível 1 — Rugido de Sangue",
        poderes: [
          { nome: "Frenesi da Leoa Escarlate I", tipo: "Ativo", continuidade: "I", descricao: "Canaliza a agressividade primal, ignorando 20% do dano sofrido para golpear duas vezes." },
          { nome: "Miasma da Peste Vermelha", tipo: "Ativo", continuidade: null, descricao: "Exala um vapor sufocante que infecta feridas abertas com febre imediata." },
          { nome: "Escudo do Caçador de Deusas", tipo: "Passivo", continuidade: null, descricao: "Resistência especial contra ataques de calor solar e magias de perversão divina." }
        ]
      },
      {
        nivel: 7,
        titulo: "Nível 7 — A Calamidade do Fim do Mundo",
        poderes: [
          { nome: "O Banquete de Sangue de Sekhmet", tipo: "Supremo", continuidade: null, descricao: "Transforma a sede de sangue em poder destrutivo puro, incinerando o exército inimigo." },
          { nome: "Purificação pela Calamidade", tipo: "Ativo", continuidade: null, descricao: "Cura completamente o usuário absorvendo as enfermidades e debuffs de todos os aliados." },
          { nome: "A Executora Solitária", tipo: "Passivo", continuidade: null, descricao: "Quando luta sozinho sem aliados em campo, seu ATK e sua Taxa Crítica aumentam em 50%." }
        ]
      }
    ]
  },
  {
    id: "tot",
    name: "Tot",
    titulo: "Deus da Sabedoria • Senhor da escrita, do tempo, da lua e dos registros cósmicos",
    panteao: "egipcio",
    panteaoLabel: "Panteão Egípcio",
    reino: "egipcios-nobres",
    reinoLabel: "Neteru Menor",
    classes: ["sonho", "destino"],
    icon: "𓅃",
    descricao: "O escriba dos deuses que arbitrou as disputas entre Hórus e Set. Seus herdeiros compreendem todos os alfabetos mágicos do universo e dobram o tempo com cálculos matemáticos.",
    arvore: [
      {
        nivel: 1,
        titulo: "Nível 1 — Papiro da Verdade",
        poderes: [
          { nome: "Escrita Instantânea I", tipo: "Ativo", continuidade: "I", descricao: "Inscreve fórmulas hieroglíficas no ar em frações de segundo para ativar escudos." },
          { nome: "Cálculo Cronal do Escriba", tipo: "Passivo", continuidade: null, descricao: "Permite prever a ordem de ação dos combatentes com precisão absoluta." },
          { nome: "Registro Imutável", tipo: "Ativo", continuidade: null, descricao: "Grava o estado de um aliado: se ele for ferido no próximo turno, retorna ao estado anterior." }
        ]
      },
      {
        nivel: 7,
        titulo: "Nível 7 — O Livro Sagrado de Tot",
        poderes: [
          { nome: "A Parada do Tempo do Escriba", tipo: "Supremo", continuidade: null, descricao: "Interrompe o fluxo do tempo por 2 rodadas completas enquanto apenas o mago se move e conjura." },
          { nome: "Reescrita do Destino", tipo: "Ativo", continuidade: null, descricao: "Modifica o resultado de um teste fracassado de um aliado para um acerto crítico perfeito." },
          { nome: "Memória Cósmica do Duat", tipo: "Passivo", continuidade: null, descricao: "Pode copiar e aprender instantaneamente qualquer feitiço ou individualidade vista em combate." }
        ]
      }
    ]
  }
];

// ==========================================================================
// 12. PÁGINA DE PODERES: FILTROS, BUSCA E MODAL RÚNICO (poderes.html)
// ==========================================================================
window.__lastFocusedPowerTrigger = null;

window.closePowerModal = function() {
  const modal = document.getElementById('power-modal');
  if (modal) {
    modal.classList.add('opacity-0', 'pointer-events-none');
    document.body.style.overflow = 'auto';
    if (window.__lastFocusedPowerTrigger && typeof window.__lastFocusedPowerTrigger.focus === 'function') {
      window.__lastFocusedPowerTrigger.focus();
    }
  }
};

function getDivinityIconSvg(godId) {
  const iconMap = {
    zeus: `<svg class="w-7 h-7 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>`,
    poseidon: `<svg class="w-7 h-7 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v18m-6-12v4a6 6 0 0012 0V9m-6-6l-3 3m3-3l3 3"/></svg>`,
    hades: `<svg class="w-7 h-7 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4a7 7 0 00-7 7c0 3 2 5.5 4 6.5V20h6v-2.5c2-1 4-3.5 4-6.5a7 7 0 00-7-7z"/></svg>`,
    hera: `<svg class="w-7 h-7 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 2l3 5 5-2-2 10H6L4 5l5 2 3-5z"/></svg>`,
    demeter: `<svg class="w-7 h-7 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v18m-4-14a4 4 0 018 0m-8 6a4 4 0 018 0"/></svg>`,
    hestia: `<svg class="w-7 h-7 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"/></svg>`,
    afrodite: `<svg class="w-7 h-7 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>`,
    apolo: `<svg class="w-7 h-7 text-amber-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/></svg>`,
    ares: `<svg class="w-7 h-7 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>`,
    artemis: `<svg class="w-7 h-7 text-teal-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/></svg>`,
    atena: `<svg class="w-7 h-7 text-indigo-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>`,
    dionisio: `<svg class="w-7 h-7 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v13m0-13V4m0 0a3 3 0 013 3v1H9V7a3 3 0 013-3z"/></svg>`,
    hefesto: `<svg class="w-7 h-7 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/></svg>`,
    hermes: `<svg class="w-7 h-7 text-amber-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>`,
    hecate: `<svg class="w-7 h-7 text-purple-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/></svg>`
  };
  return iconMap[godId] || `<svg class="w-7 h-7 text-[#f1d27a]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/></svg>`;
}

function initPowersPage() {
  const grid = document.getElementById('powers-grid');
  if (!grid) return;

  const searchInput = document.getElementById('powers-search-input');
  const panteonSelect = document.getElementById('filter-panteon');
  const reinoSelect = document.getElementById('filter-reino');
  const classeSelect = document.getElementById('filter-classe');
  const resetBtn = document.getElementById('reset-filters-btn');
  const countSpan = document.getElementById('count-number');

  function renderGrid() {
    const q = (searchInput?.value || '').toLowerCase().trim();
    const panteon = panteonSelect?.value || 'all';
    const reino = reinoSelect?.value || 'all';
    const classe = classeSelect?.value || 'all';

    let filtered = DIVINITIES_DATA.filter(god => {
      const matchSearch = !q || 
        god.name.toLowerCase().includes(q) || 
        god.titulo.toLowerCase().includes(q) || 
        god.descricao.toLowerCase().includes(q) ||
        god.classes.some(c => c.toLowerCase().includes(q));

      const matchPanteon = (panteon === 'all') || (god.panteao === panteon);
      const matchReino = (reino === 'all') || (god.reino === reino);
      const matchClasse = (classe === 'all') || (god.classes.includes(classe));

      return matchSearch && matchPanteon && matchReino && matchClasse;
    });

    // Priority Sort: Exact match and name prefix matches come first
    if (q) {
      filtered.sort((a, b) => {
        const aName = a.name.toLowerCase();
        const bName = b.name.toLowerCase();
        if (aName === q && bName !== q) return -1;
        if (bName === q && aName !== q) return 1;
        if (aName.startsWith(q) && !bName.startsWith(q)) return -1;
        if (!aName.startsWith(q) && bName.startsWith(q)) return 1;
        return 0;
      });
    }

    if (countSpan) {
      countSpan.textContent = `${filtered.length} ${filtered.length === 1 ? 'linhagem encontrada' : 'linhagens encontradas'}`;
    }

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div class="col-span-full py-16 text-center text-gray-400 font-garamond italic text-lg">
          Nenhuma linhagem divina encontrada com os filtros selecionados. Tente limpar os filtros.
        </div>
      `;
      return;
    }

    grid.innerHTML = filtered.map(god => `
      <div tabindex="0" role="button" aria-label="Abrir árvore de poderes de ${god.name}" onkeydown="if(event.key==='Enter'||event.key===' '){openPowerModal('${god.id}'); event.preventDefault();}" class="glass-panel p-6 rounded-2xl border border-white/10 hover:border-[#d4af37]/60 transition-all cursor-pointer flex flex-col justify-between group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f1d27a]" onclick="openPowerModal('${god.id}')">
        <div>
          <div class="flex items-center justify-between mb-3">
            <span class="w-9 h-9 rounded-lg bg-black/60 border border-[#d4af37]/30 flex items-center justify-center p-1">${getDivinityIconSvg(god.id)}</span>
            <div class="flex items-center gap-1.5">
              ${god.role ? `<span class="text-[9px] font-mono-code px-2 py-0.5 rounded bg-[#f1d27a]/15 text-[#f1d27a] uppercase border border-[#f1d27a]/30 font-bold">${god.role.toUpperCase()}</span>` : ''}
              <span class="text-[10px] font-mono-code px-2.5 py-1 rounded bg-black/60 border border-[#d4af37]/30 text-[#f1d27a] uppercase">${god.panteaoLabel}</span>
            </div>
          </div>
          <h3 class="font-cinzel text-xl font-bold text-white group-hover:text-[#f1d27a] transition-colors mb-1">${god.name}</h3>
          <div class="text-xs font-mono-code text-gray-400 mb-3">${god.titulo}</div>
          <p class="font-garamond italic text-sm text-[#cfc7b4] leading-relaxed mb-4 line-clamp-3">${god.descricao}</p>
        </div>
        <div class="pt-4 border-t border-white/10 flex items-center justify-between">
          <div class="flex flex-wrap gap-1.5">
            ${god.classes.map(c => `<span class="text-[9px] font-mono-code px-2 py-0.5 rounded bg-white/5 border border-white/10 text-gray-300 uppercase">${c}</span>`).join('')}
          </div>
          <div class="flex items-center gap-2">
            ${god.docUrl ? `<span class="text-[10px] font-mono-code text-cyan-400 bg-cyan-950/60 border border-cyan-500/30 px-2 py-0.5 rounded">Docs ↗</span>` : ''}
            <span class="text-xs text-[#f1d27a] font-mono-code group-hover:translate-x-1 transition-transform">Ver Árvore →</span>
          </div>
        </div>
      </div>
    `).join('');
  }

  searchInput?.addEventListener('input', renderGrid);
  panteonSelect?.addEventListener('change', renderGrid);
  reinoSelect?.addEventListener('change', renderGrid);
  classeSelect?.addEventListener('change', renderGrid);
  resetBtn?.addEventListener('click', () => {
    if (searchInput) searchInput.value = '';
    if (panteonSelect) panteonSelect.value = 'all';
    if (reinoSelect) reinoSelect.value = 'all';
    if (classeSelect) classeSelect.value = 'all';
    renderGrid();
  });

  // Modal Closers
  const modal = document.getElementById('power-modal');
  const closeBtn1 = document.getElementById('close-power-modal-btn');
  const closeBtn2 = document.getElementById('close-power-modal-btn-2');

  closeBtn1?.addEventListener('click', window.closePowerModal);
  closeBtn2?.addEventListener('click', window.closePowerModal);
  modal?.addEventListener('click', (e) => {
    if (e.target === modal) window.closePowerModal();
  });

  renderGrid();
}

window.openPowerModal = function(godId) {
  window.__lastFocusedPowerTrigger = document.activeElement;
  const god = DIVINITIES_DATA.find(g => g.id === godId);
  if (!god) return;

  const modal = document.getElementById('power-modal');
  const icon = document.getElementById('modal-god-icon');
  const name = document.getElementById('modal-god-name');
  const title = document.getElementById('modal-god-title');
  const panteon = document.getElementById('modal-god-panteon');
  const classesContainer = document.getElementById('modal-god-classes');
  const levelsContainer = document.getElementById('modal-levels-container');
  const docLink = document.getElementById('modal-god-doc-link');

  if (icon) icon.innerHTML = getDivinityIconSvg(god.id);
  if (name) name.textContent = god.name;
  if (title) title.textContent = god.titulo;
  if (panteon) panteon.textContent = `${god.panteaoLabel} • ${god.reinoLabel}`;

  if (modal) {
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-labelledby', 'modal-god-name');
  }

  if (docLink) {
    if (god.docUrl) {
      docLink.href = god.docUrl;
      docLink.classList.remove('hidden');
    } else {
      docLink.classList.add('hidden');
    }
  }

  if (classesContainer) {
    classesContainer.innerHTML = god.classes.map(c => `
      <span class="px-3 py-1 rounded-full bg-[#d4af37]/20 border border-[#d4af37]/40 text-xs font-mono-code text-[#f1d27a] uppercase font-bold">
        ${c}
      </span>
    `).join('');
  }

  if (levelsContainer) {
    levelsContainer.innerHTML = god.arvore.map(lvl => `
      <div class="p-5 rounded-xl bg-[#050608]/80 border border-white/10 space-y-3">
        <div class="flex items-center justify-between pb-2 border-b border-white/10">
          <span class="font-cinzel text-sm font-bold text-[#f1d27a] uppercase">${lvl.titulo}</span>
          <span class="text-[10px] font-mono-code text-gray-400">3 Escolhas Disponíveis</span>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
          ${lvl.poderes.map(p => `
            <div class="p-3.5 rounded-lg bg-white/5 border border-white/5 flex flex-col justify-between">
              <div>
                <div class="flex items-center justify-between mb-1">
                  <span class="font-cinzel text-xs font-bold text-white">${p.nome}</span>
                  <span class="text-[9px] font-mono-code px-1.5 py-0.5 rounded bg-white/10 text-gray-300">${p.tipo}</span>
                </div>
                <p class="font-garamond italic text-xs text-[#cfc7b4] leading-relaxed mb-2">${p.descricao}</p>
              </div>
              ${p.continuidade ? `<div class="text-[9px] font-mono-code text-cyan-400">› Requer Cadeia ${p.continuidade}</div>` : ''}
            </div>
          `).join('')}
        </div>
      </div>
    `).join('');
  }

  if (modal) {
    modal.classList.remove('opacity-0', 'pointer-events-none');
    document.body.style.overflow = 'hidden';
    const closeBtn = document.getElementById('close-power-modal-btn');
    if (closeBtn) closeBtn.focus();
  }
};

// Global Escape Key Listener for Modals
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    const dossierModal = document.getElementById('dossier-modal');
    if (dossierModal && !dossierModal.classList.contains('hidden')) {
      window.closeDossierModal();
    }
    const powerModal = document.getElementById('power-modal');
    if (powerModal && !powerModal.classList.contains('opacity-0')) {
      window.closePowerModal();
    }
  }
});

// ==========================================================================
// 13. PÁGINA DE SISTEMA: SIMULADOR DE COMBATE & REGRAS (sistema.html)
// ==========================================================================
function initSistemaPage() {
  // Seletor de Tomos (sistema.html)
  const tomoBtns = document.querySelectorAll('#tomo-selector button[data-tomo]');
  const tomoContents = document.querySelectorAll('.tomo-content');
  if (tomoBtns.length > 0) {
    tomoBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetId = btn.getAttribute('data-tomo');
        tomoBtns.forEach(b => {
          b.classList.remove('active', 'border-[#d4af37]', 'bg-[#d4af37]/20', 'text-[#f1d27a]', 'font-bold');
          b.classList.add('border-white/10', 'text-[#cfc7b4]');
        });
        btn.classList.add('active', 'border-[#d4af37]', 'bg-[#d4af37]/20', 'text-[#f1d27a]', 'font-bold');
        btn.classList.remove('border-white/10', 'text-[#cfc7b4]');

        tomoContents.forEach(content => {
          if (content.id === targetId) {
            content.classList.remove('hidden');
            if (typeof gsap !== 'undefined') {
              gsap.fromTo(content, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.35 });
            }
          } else {
            content.classList.add('hidden');
          }
        });
      });
    });
  }
  const btn = document.getElementById('run-simulation-btn');
  const resultBox = document.getElementById('sim-result-box');
  const modeSelect = document.getElementById('sim-mode');
  const rdGroup = document.getElementById('sim-rd-group');
  if (!btn || !resultBox) return;

  if (modeSelect && rdGroup) {
    modeSelect.addEventListener('change', () => {
      if (modeSelect.value === 'poderes') {
        rdGroup.classList.remove('hidden');
      } else {
        rdGroup.classList.add('hidden');
      }
    });
  }

  btn.addEventListener('click', () => {
    const level = Math.max(1, Math.min(10, parseInt(document.getElementById('sim-level')?.value || '1', 10)));
    const simClass = document.getElementById('sim-class')?.value || 'destruicao';
    const mode = document.getElementById('sim-mode')?.value || 'classico';
    const enemyDef = Math.max(0, parseInt(document.getElementById('sim-enemy-def')?.value || '15', 10));
    const enemyRd = Math.max(0, Math.min(90, parseInt(document.getElementById('sim-enemy-rd')?.value || '20', 10)));

    const baseData = CANONICAL_BASE_ATTRIBUTES[level] || CANONICAL_BASE_ATTRIBUTES[1];
    const baseAtk = baseData.atk;

    // Roll d20
    const d20 = Math.floor(Math.random() * 20) + 1;
    const isCrit = d20 >= 18;

    let classBonusText = "";
    let classMultiplier = 1.0;

    if (simClass === 'destruicao') {
      classMultiplier = 1.35;
      classBonusText = "Destruição (+35% Dano & Escala Crítica)";
    } else if (simClass === 'destino') {
      classMultiplier = 1.15;
      classBonusText = "Destino (+15% Dano & +40% Postura Defensiva)";
    } else if (simClass === 'morte') {
      classMultiplier = 1.40;
      classBonusText = "Morte (+40% Dano Sacrificial & Dreno)";
    } else if (simClass === 'sonho') {
      classMultiplier = 1.25;
      classBonusText = "Sonho (+25% Multiplicador de Equipe)";
    } else if (simClass === 'desespero') {
      classMultiplier = 1.30;
      classBonusText = "Desespero (+30% DoT Contínuo & Quebra)";
    } else if (simClass === 'desejo') {
      classMultiplier = 1.20;
      classBonusText = "Desejo (+20% Dano & +35% Eficiência Curativa)";
    } else if (simClass === 'delirio') {
      classMultiplier = 1.30;
      classBonusText = "Delírio (+30% Ataque de Familiares Convocados)";
    }

    let critMultiplier = isCrit ? 1.5 : 1.0;
    const rawAtk = Math.floor(baseAtk * classMultiplier * critMultiplier);

    let finalDamage = 0;
    let stepDescription = "";

    if (mode === 'classico') {
      // Modo 1: Dano = ATK - DEF
      finalDamage = Math.max(0, rawAtk - enemyDef);
      stepDescription = `
        <div>• <strong>Modo de Combate:</strong> <svg class="w-3.5 h-3.5 inline mr-1 text-red-400 align-sub" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg> Combate Clássico (Dano = ATK - DEF)</div>
        <div>• <strong>ATK Base (Tabela 3 • Nível ${level}):</strong> ${baseAtk} pts</div>
        <div>• <strong>Multiplicador de Classe:</strong> x${classMultiplier.toFixed(2)} (${classBonusText})</div>
        <div>• <strong>Dado d20 Rolado:</strong> [ ${d20} ] ${isCrit ? '<span class="text-amber-300 font-bold">★ ACERTO CRÍTICO (x1.5)!</span>' : (d20 <= 3 ? '<span class="text-gray-400">Falha Menor</span>' : '<span class="text-emerald-400">Sucesso Rúnico</span>')}</div>
        <div>• <strong>Ataque Bruto Total:</strong> ${rawAtk} pts</div>
        <div>• <strong>Defesa Inimiga Subtraída:</strong> -${enemyDef} pts</div>
      `;
    } else {
      // Modo 2: Dano = Bruto * (1 - RD%) - DEF
      const afterRd = Math.floor(rawAtk * (1 - enemyRd / 100));
      finalDamage = Math.max(0, afterRd - enemyDef);
      stepDescription = `
        <div>• <strong>Modo de Combate:</strong> <svg class="w-3.5 h-3.5 inline mr-1 text-purple-400 align-sub" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/></svg> Habilidade Ativa / Poder Rúnico (Bruto * (1 - RD%) - DEF)</div>
        <div>• <strong>ATK Base (Tabela 3 • Nível ${level}):</strong> ${baseAtk} pts</div>
        <div>• <strong>Multiplicador de Classe:</strong> x${classMultiplier.toFixed(2)} (${classBonusText})</div>
        <div>• <strong>Dado d20 Rolado:</strong> [ ${d20} ] ${isCrit ? '<span class="text-amber-300 font-bold">★ ACERTO CRÍTICO (x1.5)!</span>' : (d20 <= 3 ? '<span class="text-gray-400">Falha Menor</span>' : '<span class="text-emerald-400">Sucesso Rúnico</span>')}</div>
        <div>• <strong>Dano Bruto do Feitiço:</strong> ${rawAtk} pts</div>
        <div>• <strong>Redução Percentual Inimiga (-${enemyRd}% RD):</strong> ${afterRd} pts restantes</div>
        <div>• <strong>Defesa Inimiga Subtraída:</strong> -${enemyDef} pts</div>
      `;
    }

    resultBox.innerHTML = `
      <div class="text-[#f1d27a] font-bold text-sm mb-2 font-cinzel flex items-center gap-1.5"><svg class="w-4 h-4 text-[#f1d27a] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg> RESOLUÇÃO MATEMÁTICA RÚNICA (NÍVEL ${level} • POSTO: ${CANONICAL_RANKS[level - 1]}):</div>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs mb-3 text-[#cfc7b4]">
        ${stepDescription}
      </div>
      <div class="p-3.5 rounded-lg bg-[#d4af37]/20 border border-[#d4af37]/40 text-white font-cinzel text-center font-bold text-base shadow-lg flex items-center justify-center gap-2">
        <svg class="w-5 h-5 text-amber-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg> DANO FINAL INFLIGIDO NO ALVO: <span class="text-[#f1d27a]">${finalDamage}</span> PONTOS
      </div>
    `;

    if (typeof gsap !== 'undefined') {
      gsap.fromTo(resultBox, { scale: 0.98, opacity: 0.8 }, { scale: 1.0, opacity: 1.0, duration: 0.3 });
    }
  });
}

// ==========================================================================
// 14. PÁGINA DO AGENTE: CONSTRUTOR DE FICHAS PARA DISCORD (agente.html)
// ==========================================================================
function initAgentePage() {
  const btn = document.getElementById('generate-sheet-text-btn');
  const exportContainer = document.getElementById('sheet-export-container');
  const exportTextarea = document.getElementById('sheet-export-textarea');
  const copyBtn = document.getElementById('copy-sheet-btn');
  if (!btn || !exportContainer || !exportTextarea) return;

  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      exportTextarea.select();
      navigator.clipboard.writeText(exportTextarea.value).then(() => {
        showToast('ðŸ“‹ Ficha copiada com sucesso para o Discord!');
      }).catch(() => {
        showToast('Texto selecionado! Pressione Ctrl+C para copiar.');
      });
    });
  }

  btn.addEventListener('click', () => {
    const name = (document.getElementById('builder-name')?.value || document.getElementById('sheet-name')?.value || '').trim();
    if (!name) {
      showToast('âš ï¸ Por favor, preencha o Nome do Agente antes de gerar a ficha.');
      return;
    }

    const age = document.getElementById('builder-age')?.value || '18';
    const god = document.getElementById('builder-god')?.value || document.getElementById('sheet-god')?.value || 'Herdeiro do Olimpo';
    const panteao = document.getElementById('builder-pantheon')?.value || document.getElementById('sheet-panteao')?.value || 'Greco-Romano';
    const oficio = document.getElementById('builder-job')?.value || document.getElementById('sheet-oficio')?.value || 'CustÃ³dio de Sangue';
    const charClass = document.getElementById('builder-class')?.value || document.getElementById('sheet-class')?.value || 'DestruiÃ§Ã£o';
    const weapon = document.getElementById('builder-weapon')?.value || document.getElementById('sheet-weapon')?.value || 'Glaive de Prata Estelar (+10 ATK)';
    const photoplayer = document.getElementById('builder-faceclaim')?.value || document.getElementById('sheet-photoplayer')?.value || 'Dark Fantasy';
    const level = Math.max(1, Math.min(10, parseInt(document.getElementById('sheet-level')?.value || '1', 10)));

    const base = CANONICAL_BASE_ATTRIBUTES[level] || CANONICAL_BASE_ATTRIBUTES[1];
    let hp = base.hp;
    let mana = base.mana;
    let atk = base.atk;
    let def = base.def;
    let spd = base.spd;
    let crit = base.crit;
    let critDmg = base.critDmg;
    let dice = base.dice;

    // Big Three Bonus (Zeus, Poseidon, Hades)
    const isBigThree = /zeus|poseidon|hades|jÃºpiter|netuno|plutÃ£o/i.test(god);
    if (isBigThree) {
      hp += 30;
      crit += 10;
    }

    // Perpetuals Bonus (DestruiÃ§Ã£o, Destino, Morte, Sonho, Desespero, Desejo, DelÃ­rio)
    const isPerpetual = /destrui|destino|morte|sonho|desespero|desejo|delÃ­rio/i.test(charClass);
    if (isPerpetual) {
      hp += 30;
      crit += 10;
      mana += 200;
      spd += 10;
    }

    const rankTitle = CANONICAL_RANKS[level - 1] || CANONICAL_RANKS[0];

    const template = `\`\`\`yaml
==========================================================================
PEDIDO DE FICHA OFICIAL â€” Ã‰GIDE DE AVALON
==========================================================================
STATUS: RASCUNHO OFICIAL (Aguardando submissÃ£o no Discord da Ã‰gide)
NOME DO AGENTE: ${name}
IDADE CANÃ”NICA: ${age} anos
PHOTOPLAYER: ${photoplayer} (Status: Aprovado Dark Fantasy)
PATRONO / LINHAGEM: ${god} (PanteÃ£o: ${panteao})
OFÃCIO NA ORDEM: ${oficio}
CLASSE DOS PERPÃ‰TUOS: ${charClass}
POSTO HIERÃRQUICO: NÃ­vel ${level} (${rankTitle})

ATRIBUTOS DE COMBATE CANÃ”NICOS (TABELA 3 OFICIAL):
â€¢ Pontos de Vida (HP): ${hp} / ${hp} ${isBigThree || isPerpetual ? '(BÃ´nus Aplicado)' : ''}
â€¢ Pontos de Mana: ${mana} / ${mana} ${isPerpetual ? '(+200 BÃ´nus PerpÃ©tuo)' : ''}
â€¢ Ataque FÃ­sico/MÃ¡gico (ATK): ${atk}
â€¢ Defesa & Blindagem (DEF): ${def}
â€¢ Velocidade de ReaÃ§Ã£o (SPD): ${spd} ${isPerpetual ? '(+10 BÃ´nus PerpÃ©tuo)' : ''}
â€¢ Chance de Acerto CrÃ­tico: ${crit}%
â€¢ Dano CrÃ­tico: ${critDmg}%
â€¢ Rolagem PadrÃ£o de Testes: ${dice}

EQUIPAMENTOS DE COMBATE (SLOTS ATIVOS):
â€¢ Arma Principal Equipada: ${weapon}
â€¢ BÃªnÃ§Ã£o PrimÃ¡ria de Combate: BÃªnÃ§Ã£o da Classe ${charClass}
â€¢ Slots de Artefatos: 4 Slots DisponÃ­veis (BaÃº Coletivo de Avalon)

HISTÃ“RICO & DIRETRIZ EM LONDRES:
"Agente registrado sob os auspÃ­cios do Conselho de MÃ¡rmore para atuaÃ§Ã£o nas operaÃ§Ãµes de contenÃ§Ã£o do VÃ©u."

PROTOCOLO DA ORDEM:
â€¢ Status: Agente em FormaÃ§Ã£o â€¢ Registrado na Fortaleza de Avalon
â€¢ Limite Operacional: 1 BÃªnÃ§Ã£o Ativa â€¢ 1 Arma Principal â€¢ 4 Artefatos
==========================================================================
\`\`\``;

    exportTextarea.value = template;
    exportContainer.classList.remove('hidden');

    navigator.clipboard.writeText(template).then(() => {
      showToast('Ficha gerada e copiada para a área de transferência!');
    }).catch(() => {
      showToast('Ficha gerada! Selecione o texto para copiar.');
    });
  });
}
// ==========================================================================
// 15. PÁGINA ENDGAME: ABISMO, BERÇÁRIO E UNIVERSO SIMULADO (endgame.html)
// ==========================================================================
const ABYSS_FLOORS = {
  1: { title: "POSTO AVANÇADO DE RESSON (FRONTEIRA NAVARRE / POROMIEL)", level: "NÍVEL 1+", danger: "35%", modifier: "Névoa de Resson: Maldição de Poromiel dobra o custo de mana. Bênção de Amari concede imunidade a debuffs aos Empyreans.", boss: "Catriona Cordella (Rota 11A) / Ondas de Keres & Harpias", rewards: "+600 Golds • +1.500 EXP • 30 Orações • 4 Artefatos • 2 Joias do Destino" },
  2: { title: "A FÚRIA DE POROMIEL (CAMPE & CATRIONA CORDELLA)", level: "NÍVEL 3+", danger: "55%", modifier: "Geada Laminar: Reduz velocidade em 30%. Garras de Cristal e Heartbreak infligem estilhaçamento.", boss: "Campe (Carcereira do Tártaro) & Catriona Cordella (6.800 HP)", rewards: "+1.200 Golds • +3.000 EXP • 60 Orações • 8 Artefatos • 4 Joias do Destino" },
  3: { title: "BERÇÁRIO ABISSAL: O ÚTERO DO TÁRTARO (LÂMIA)", level: "NÍVEL 7+", danger: "75%", modifier: "Canção do Desespero: Teste de Vontade para não perder a ação. Familiares sofrem dano de reflexo.", boss: "Lâmia (A Devoradora de Esperança)", rewards: "+900 Golds • +2.500 EXP • 30 a 60 Orações • 4 a 6 Artefatos • 1 a 4 Joias do Destino" },
  4: { title: "BERÇÁRIO ABISSAL: O ÚTERO DO TÁRTARO (MEDUSA)", level: "NÍVEL 7+", danger: "85%", modifier: "Olhar Petrificante: Sempre age 1º na rodada. Buff de +1k a +5k HP e +50 a +200 DEF.", boss: "Medusa (A Rainha das Górgones)", rewards: "+900 Golds • +2.500 EXP • 40 a 60 Orações • 5 Artefatos • 2 Joias do Destino" },
  5: { title: "BERÇÁRIO ABISSAL: O ÚTERO DO TÁRTARO (PORCA CARMONIANA)", level: "NÍVEL 7+", danger: "95%", modifier: "Colosso de Gaia (30 metros): Sempre age 1º. Buff colossal de até +370k HP e +400 DEF em Morte Súbita!", boss: "Porca Carmoniana (Matriarca das Aberrações)", rewards: "+1.800 Golds • +5.000 EXP • 60 Orações • 6 Artefatos • 4 Joias do Destino" },
  6: { title: "UNIVERSO SIMULADO: MATRIZ DE RESSONÂNCIA", level: "LIVRE", danger: "40%", modifier: "Simulação Holográfica: Buffs de dano de Perpétuos amplificados em 30%.", boss: "Construto de Avalon α", rewards: "+500 Golds • +1.000 EXP • Cristais de Memória • Orações da Temporada" },
  7: { title: "UNIVERSO SIMULADO: MATRIZ DE DESOLAÇÃO", level: "NÍVEL 4+", danger: "65%", modifier: "Simulação Gravitacional: Custo de movimentação e corrida duplicado.", boss: "Simulacro de Tífon Primordial", rewards: "+800 Golds • +2.000 EXP • Cristais de Memória Raros" },
  8: { title: "UNIVERSO SIMULADO: MATRIZ DO VAZIO PROFUNDO", level: "NÍVEL 6+", danger: "80%", modifier: "Anulação de Luz: Reduz cura recebida em 50%. Inimigos ganham invisibilidade parcial.", boss: "Eco de Nyx Desperta", rewards: "+1.200 Golds • +3.500 EXP • Tomos Proibidos da Matriz" },
  9: { title: "FENDA DO CAOS 01: SOHO DA MEIA-NOITE", level: "NÍVEL 3+", danger: "60%", modifier: "O Beco das Vozes Perdidas: Reflexos e murmúrios reduzem precisão mental.", boss: "Sombras Vorazes & Ecos de Nêmesis", rewards: "+600 Golds • +1.500 EXP • Fragmentos do Caos Menores" },
  10: { title: "FENDA DO CAOS 02: DOCAS DO TÂMISA OCULTO", level: "NÍVEL 4+", danger: "75%", modifier: "O Porto dos Afogados: Águas sangram fogo fátuo e drenam mana.", boss: "Quimeras Marinhas & Keres Abissais", rewards: "+900 Golds • +2.200 EXP • Matéria Corrompida do Tâmisa" },
  11: { title: "FENDA DO CAOS 03: CATEDRAL SUBTERRÂNEA", level: "NÍVEL 5+", danger: "85%", modifier: "O Altar da Heresia Antiga: Gravidade invertida e rituais de sacrifício.", boss: "Bruxos Apóstatas & Inquisidores Renegados", rewards: "+1.400 Golds • +3.200 EXP • Relíquias Hereges de Avalon" },
  12: { title: "FENDA DO CAOS 04: ILHAS DE SEMPRE INVERNO", level: "NÍVEL 8 (CLÍMAX)", danger: "99%", modifier: "A Fortaleza Congelada: Ventos gélidos absolutos que congelam almas mortais.", boss: "Rhaenys Targaryen (A Rainha Dragão & Fragmento Ômega)", rewards: "+5.000 Golds • +15.000 EXP • 1x FRAGMENTO DO CAOS DESPERTO" }
};

window.selectAbyssFloor = function(floorNum) {
  const data = ABYSS_FLOORS[floorNum];
  if (!data) return;

  // Toggle active button
  document.querySelectorAll('.abyss-floor-btn').forEach(btn => {
    const f = parseInt(btn.getAttribute('data-floor'), 10);
    if (f === floorNum) {
      btn.classList.add('bg-red-950/60', 'border-red-500', 'text-white');
    } else {
      btn.classList.remove('bg-red-950/60', 'border-red-500', 'text-white');
    }
  });

  const badge = document.getElementById('abyss-level-badge');
  const title = document.getElementById('abyss-floor-title');
  const recLevel = document.getElementById('abyss-rec-level');
  const dangerPercent = document.getElementById('abyss-danger-percent');
  const dangerBar = document.getElementById('abyss-danger-bar');
  const modifier = document.getElementById('abyss-floor-modifier');
  const boss = document.getElementById('abyss-floor-boss');
  const rewards = document.getElementById('abyss-floor-rewards');

  if (badge) badge.textContent = `ANDAR ${floorNum < 10 ? '0' + floorNum : floorNum} · ${data.title}`;
  if (title) title.textContent = data.title;
  if (recLevel) recLevel.textContent = data.level;
  if (dangerPercent) dangerPercent.textContent = data.danger;
  if (dangerBar) dangerBar.style.width = data.danger;
  if (modifier) modifier.textContent = data.modifier;
  if (boss) boss.textContent = data.boss;
  if (rewards) {
    rewards.innerHTML = data.rewards.split('•').map(r => `
      <span class="px-2.5 py-1 rounded bg-black/60 border border-white/10">${r.trim()}</span>
    `).join('');
  }
};

function initEndgamePage() {
  // Incubator
  const incBtn = document.getElementById('calc-incubation-btn');
  const incResult = document.getElementById('incubation-result');
  if (incBtn && incResult) {
    incBtn.addEventListener('click', () => {
      const type = document.getElementById('egg-type')?.value || 'menor';
      const essence = parseInt(document.getElementById('essence-amount')?.value || '25', 10);
      const affinity = document.getElementById('egg-affinity')?.value || 'delirio';

      const mutationChance = Math.min(95, Math.floor(essence * 0.75 + 12));
      const powerBonus = Math.floor(essence * 1.5);

      incResult.innerHTML = `
        <div class="text-[#f1d27a] font-bold mb-1 flex items-center gap-1.5"><svg class="w-4 h-4 text-[#f1d27a] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/></svg> RESULTADO DA INCULAÇÃO RÚNICA:</div>
        <div>• <strong>Probabilidade de Mutação Rara:</strong> <span class="text-purple-400 font-bold">${mutationChance}%</span></div>
        <div>• <strong>Afinidade Genética:</strong> Perpétuo do ${affinity.toUpperCase()} (+${powerBonus} ATK Familiar)</div>
        <div>• <strong>Tempo de Choco Estimado:</strong> ${Math.max(6, Math.floor(48 - essence * 0.3))} horas</div>
        <div class="text-emerald-400 font-bold mt-2">✦ OVO ESTÁVEL: Pronto para incubação na câmara de Avalon.</div>
      `;
    });
  }

  // Simulated Universe Wave Calc
  const waveBtn = document.getElementById('calc-sim-wave-btn');
  const waveOutput = document.getElementById('sim-wave-output');
  if (waveBtn && waveOutput) {
    waveBtn.addEventListener('click', () => {
      const wave = parseInt(document.getElementById('sim-wave-input')?.value || '15', 10);
      const score = wave * 320;
      const crystals = Math.floor(wave / 5) + 1;
      const prayers = Math.floor(wave / 3) + 3;

      waveOutput.innerHTML = `
        <div>› Onda Alcançada: <strong>Onda ${wave}</strong> ➔ <strong>${score.toLocaleString()} Pontos</strong> • <strong>${crystals}x Cristais de Memória</strong> • <span class="text-[#f1d27a] font-bold">+${prayers} Orações Celestiais</span></div>
      `;
    });
  }
}

// ── 16. ACCORDION SYSTEM ──
function toggleAccordion(id) {
  const item = document.getElementById(id);
  if (!item) return;
  const isOpen = item.classList.contains('active') || item.classList.contains('open');
  document.querySelectorAll('.acc-item').forEach(i => {
    i.classList.remove('active');
    i.classList.remove('open');
  });
  if (!isOpen) {
    item.classList.add('active');
    item.classList.add('open');
  }
}
window.toggleAccordion = toggleAccordion;
window.toggle = toggleAccordion;


// ==========================================================================
// 16. PÃGINA UNIVERSO: ABAS DE LORE & LEITOR DE CRÃ”NICAS (universo.html)
// ==========================================================================
function initUniversoPage() {
  const tabBtns = document.querySelectorAll('#lore-tabs button[data-tab]');
  const tabContainers = {
    cosmologia: document.getElementById('tab-cosmologia'),
    profecia: document.getElementById('tab-profecia'),
    cronicas: document.getElementById('tab-cronicas'),
  };

  if (tabBtns.length > 0) {
    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetTab = btn.getAttribute('data-tab');
        tabBtns.forEach(b => {
          b.classList.remove('active', 'border-[#d4af37]', 'text-[#f1d27a]', 'bg-[#d4af37]/20');
          b.classList.add('border-white/10', 'text-[#cfc7b4]');
        });
        btn.classList.add('active', 'border-[#d4af37]', 'text-[#f1d27a]', 'bg-[#d4af37]/20');
        btn.classList.remove('border-white/10', 'text-[#cfc7b4]');

        Object.entries(tabContainers).forEach(([key, container]) => {
          if (container) {
            if (key === targetTab) {
              container.classList.remove('hidden');
              if (typeof gsap !== 'undefined') {
                gsap.fromTo(container, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.35 });
              }
            } else {
              container.classList.add('hidden');
            }
          }
        });
      });
    });
  }

  // Chapter Pagination for Chronicles (1 to 5)
  let currentChapter = 1;
  const maxChapters = 5;
  const prevBtn = document.getElementById('prev-chapter-btn');
  const nextBtn = document.getElementById('next-chapter-btn');
  const indicator = document.getElementById('chapter-indicator');
  const slides = document.querySelectorAll('.chapter-slide');

  function showChapter(n) {
    currentChapter = Math.max(1, Math.min(maxChapters, n));
    slides.forEach(slide => {
      const chap = parseInt(slide.getAttribute('data-chapter'), 10);
      if (chap === currentChapter) {
        slide.classList.remove('hidden');
        if (typeof gsap !== 'undefined') {
          gsap.fromTo(slide, { opacity: 0, x: 15 }, { opacity: 1, x: 0, duration: 0.35 });
        }
      } else {
        slide.classList.add('hidden');
      }
    });
    if (indicator) {
      indicator.textContent = `CapÃ­tulo ${currentChapter} de ${maxChapters}`;
    }
    if (prevBtn) prevBtn.disabled = currentChapter === 1;
    if (nextBtn) nextBtn.disabled = currentChapter === maxChapters;
  }

  if (prevBtn && nextBtn && slides.length > 0) {
    prevBtn.addEventListener('click', () => showChapter(currentChapter - 1));
    nextBtn.addEventListener('click', () => showChapter(currentChapter + 1));
    showChapter(1);
  }
}