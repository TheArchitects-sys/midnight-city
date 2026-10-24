/* ==========================================================================
   MIDNIGHT CITY — Aviso legal de primeira visita
   Mostra uma faixa discreta (uma vez por navegador) deixando claro que o
   projeto é uma fanfic gratuita, sem fins lucrativos e com conteúdo +18.
   ========================================================================== */
(function () {
  var KEY = 'mc-legal-ack-v1';
  try { if (localStorage.getItem(KEY)) return; } catch (e) { /* segue mostrando */ }

  var css = '' +
    '.mc-legal-bar{position:fixed;left:18px;bottom:18px;transform:translateY(140%);z-index:400;width:min(430px,calc(100% - 24px));' +
    'display:flex;flex-wrap:wrap;gap:10px 14px;align-items:center;padding:14px 16px 14px 18px;border-radius:14px;' +
    'background:rgba(10,9,18,.96);border:1px solid rgba(212,175,55,.45);box-shadow:0 18px 50px rgba(0,0,0,.7);' +
    'backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);font-family:"Plus Jakarta Sans",system-ui,sans-serif;' +
    'color:#e8e2d5;font-size:.86rem;line-height:1.5;transition:transform .55s cubic-bezier(.2,.9,.25,1)}' +
    '.mc-legal-bar.is-in{transform:translateY(0)}' +
    '.mc-legal-bar__btn{margin-left:auto}' +
    '.mc-legal-bar strong{color:#f1d27a;font-weight:700}' +
    '.mc-legal-bar__icon{flex:0 0 auto;width:34px;height:34px;border-radius:50%;display:grid;place-items:center;border:1px solid rgba(212,175,55,.5);color:#f1d27a;font-size:1rem}' +
    '.mc-legal-bar__txt{flex:1 1 auto;min-width:0}' +
    '.mc-legal-bar__txt a{color:#f1d27a;text-decoration:underline}' +
    '.mc-legal-bar__btn{flex:0 0 auto;cursor:pointer;border:0;border-radius:8px;padding:.6rem 1rem;font:700 .74rem/1 "Plus Jakarta Sans",system-ui,sans-serif;letter-spacing:.04em;' +
    'background:linear-gradient(135deg,#f1d27a,#d4af37);color:#14110a}' +
    '.mc-legal-bar__btn:focus-visible{outline:2px solid #fff;outline-offset:2px}' +
    '@media (max-width:640px){.mc-legal-bar{left:12px;bottom:10px}.mc-legal-bar__icon{display:none}.mc-legal-bar__btn{width:100%;padding:.75rem}}' +
    '@media (prefers-reduced-motion:reduce){.mc-legal-bar{transition:none}}';

  function show() {
    var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);
    var bar = document.createElement('div');
    bar.className = 'mc-legal-bar'; bar.setAttribute('role', 'region'); bar.setAttribute('aria-label', 'Aviso legal');
    bar.innerHTML =
      '<span class="mc-legal-bar__icon" aria-hidden="true">⚖</span>' +
      '<div class="mc-legal-bar__txt"><strong>Fanfic coletiva, gratuita e sem fins lucrativos.</strong> ' +
      'Nada aqui é vendido por dinheiro real, e personagens, mitologias e imagens de referência pertencem aos seus titulares. ' +
      'O jogo tem conteúdo adulto (+18). <a href="aviso-legal.html">Ler o aviso legal</a></div>' +
      '<button type="button" class="mc-legal-bar__btn">Tenho 18+ e entendi</button>';
    document.body.appendChild(bar);
    requestAnimationFrame(function () { requestAnimationFrame(function () { bar.classList.add('is-in'); }); });
    bar.querySelector('button').addEventListener('click', function () {
      try { localStorage.setItem(KEY, String(Date.now())); } catch (e) {}
      bar.classList.remove('is-in');
      setTimeout(function () { bar.remove(); }, 600);
    });
  }

  if (/aviso-legal\.html$/.test(location.pathname)) return;
  // Na Home, só aparece depois que a pessoa atravessa o véu de entrada.
  function gateOpen() {
    var g = document.getElementById('initiation-gate');
    return g && g.style.display !== 'none' && !g.classList.contains('gate-closed') && getComputedStyle(g).display !== 'none' && getComputedStyle(g).opacity !== '0';
  }
  // Só depois da primeira rolagem (ou 10 s parado): não cobre os botões do primeiro contato
  function waitThenShow() {
    if (gateOpen()) return setTimeout(waitThenShow, 800);
    var shown = false;
    function go() { if (shown) return; shown = true; window.removeEventListener('scroll', onScroll); show(); }
    function onScroll() { if (window.scrollY > 240) go(); }
    window.addEventListener('scroll', onScroll, { passive: true });
    setTimeout(go, 10000);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', waitThenShow);
  else waitThenShow();
})();

/* Ações declarativas: substituem os onclick="..." inline, que a política de segurança (CSP) bloqueia.
   data-call="nomeDaFuncao" [data-arg="valor"] chama a função global; data-no-submit impede o envio do form. */
(function () {
  document.addEventListener('click', function (e) {
    var el = e.target.closest && e.target.closest('[data-call]');
    if (!el) return;
    var fn = window[el.getAttribute('data-call')];
    if (typeof fn !== 'function') return;
    if (el.hasAttribute('data-arg')) fn(el.getAttribute('data-arg')); else fn();
  });
  document.addEventListener('submit', function (e) {
    if (e.target.hasAttribute && e.target.hasAttribute('data-no-submit')) e.preventDefault();
  }, true);
})();

/* Cabeçalho ganha fundo ao rolar (no desktop ele flutuava por cima do texto). */
(function () {
  var h = document.querySelector('.santioni-header');
  if (!h) return;
  var on = false;
  function tick() {
    var y = window.scrollY > 24;
    if (y !== on) { on = y; h.classList.toggle('is-scrolled', y); }
  }
  window.addEventListener('scroll', tick, { passive: true });
  tick();
})();
