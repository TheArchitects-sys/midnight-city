/* ==========================================================================
   MIDNIGHT CITY — Medição de visitas e cliques (GoatCounter, sem cookies)
   Para ligar: crie um site grátis em https://www.goatcounter.com e cole o
   código abaixo (ex.: 'midnightcity'). Vazio = nada é carregado nem enviado.
   ========================================================================== */
(function () {
  var GOATCOUNTER_CODE = '';
  if (!GOATCOUNTER_CODE) return;

  var s = document.createElement('script');
  s.async = true;
  s.src = 'https://gc.zgo.at/count.js';
  s.setAttribute('data-goatcounter', 'https://' + GOATCOUNTER_CODE + '.goatcounter.com/count');
  document.head.appendChild(s);

  // Cliques que interessam: entrar no Discord, abrir o Hub e ir para o Yoble
  var TARGETS = [
    [/discord\.gg|discord\.com/, 'clique-discord'],
    [/midnight-city\.cloud/, 'clique-hub'],
    [/yoble\.us/, 'clique-yoble']
  ];
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href]');
    if (!a || !window.goatcounter || !window.goatcounter.count) return;
    for (var i = 0; i < TARGETS.length; i++) {
      if (TARGETS[i][0].test(a.href)) {
        window.goatcounter.count({ path: TARGETS[i][1], title: location.pathname.replace(/.*\//, '') || 'index', event: true });
        return;
      }
    }
  }, true);
})();
