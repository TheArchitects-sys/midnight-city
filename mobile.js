/* ==========================================================================
   MIDNIGHT CITY — Leitura confortável no celular
   Em telas de até 767px:
   • textos corridos (parágrafos, listas, descrições) sobem para no mínimo ~14px;
   • etiquetas e selos minúsculos sobem para no mínimo 11px;
   • instruções de "passe o cursor" viram "toque" em telas de toque.
   Também reage a conteúdo que as páginas montam depois (abas, filtros, modais).
   ========================================================================== */
(function () {
  'use strict';
  var mq = window.matchMedia('(max-width: 767px)');
  var touch = window.matchMedia('(hover: none)').matches;
  var LABEL_MIN = 11;      // etiquetas, selos, legendas
  var BODY_MIN = 14;       // texto corrido
  var BODY_TAGS = { P: 1, LI: 1, DD: 1, BLOCKQUOTE: 1, TD: 1, FIGCAPTION: 1 };
  var SKIP = { SCRIPT: 1, STYLE: 1, SVG: 1, TEXT: 1, TSPAN: 1, CANVAS: 1, INPUT: 1, SELECT: 1, OPTION: 1, TEXTAREA: 1, PRE: 1, CODE: 1, KBD: 1 };
  var KEEP = '.uni-oficio-name'; // nomes que precisam caber em grade fixa
  var done = new WeakSet();

  function ownText(el) {
    var t = '';
    for (var n = el.firstChild; n; n = n.nextSibling) if (n.nodeType === 3) t += n.textContent;
    return t.trim();
  }

  function isBody(el, text, cs) {
    if (BODY_TAGS[el.tagName]) return true;
    var words = text.split(/\s+/).length;
    // blocos longos em minúsculas costumam ser descrições, não etiquetas
    var all = el.textContent.trim().split(/\s+/).length;
    return (words >= 10 || all >= 6) && cs.textTransform !== 'uppercase' && cs.display !== 'inline' &&
      el.tagName !== 'BUTTON' && el.tagName !== 'A' && el.tagName !== 'LABEL' && !/^H[1-6]$/.test(el.tagName);
  }

  function fix(el) {
    if (done.has(el) || SKIP[el.tagName.toUpperCase()] || el.closest('svg, pre, code') || el.matches(KEEP)) return;
    var text = ownText(el);
    if (!text) return;
    var cs = getComputedStyle(el);
    if (cs.display === 'none') return;
    var fs = parseFloat(cs.fontSize);
    var target = 0;
    if (isBody(el, text, cs)) {
      if (fs < BODY_MIN) target = Math.min(BODY_MIN + 1, Math.max(BODY_MIN, fs + 2.5));
    } else if (fs < LABEL_MIN) {
      target = LABEL_MIN;
    }
    if (target) {
      el.style.setProperty('font-size', target + 'px', 'important');
      // filhos inline que tinham o mesmo tamanho acompanham o pai
      var kids = el.querySelectorAll('strong, em, b, i, span, a, mark, small');
      for (var i = 0; i < kids.length; i++) {
        var k = kids[i];
        if (k.closest('svg')) continue;
        var kfs = parseFloat(getComputedStyle(k).fontSize);
        if (Math.abs(kfs - fs) < 0.6 && getComputedStyle(k).display.indexOf('inline') === 0) {
          k.style.setProperty('font-size', 'inherit', 'important');
          done.add(k);
        }
      }
    }
    done.add(el);
  }

  function sweep(root) {
    if (!mq.matches) return;
    var all = (root || document.body).querySelectorAll('*');
    for (var i = 0; i < all.length; i++) fix(all[i]);
    if (root && root.nodeType === 1) fix(root);
  }

  function touchCopy(root) {
    if (!touch) return;
    var all = (root || document.body).querySelectorAll('span, p, div, small');
    for (var i = 0; i < all.length; i++) {
      var el = all[i];
      if (el.children.length) continue;
      var t = el.textContent;
      if (/passe o cursor/i.test(t)) el.textContent = t.replace(/passe o cursor/i, 'Toque');
      else if (/passe o mouse/i.test(t)) el.textContent = t.replace(/passe o mouse/i, 'Toque');
    }
  }

  var queued = [];
  var timer = null;
  function flush() {
    timer = null;
    var list = queued; queued = [];
    for (var i = 0; i < list.length; i++) { sweep(list[i]); touchCopy(list[i]); }
  }

  function start() {
    sweep(); touchCopy();
    new MutationObserver(function (muts) {
      if (!mq.matches && !touch) return;
      for (var i = 0; i < muts.length; i++) {
        var added = muts[i].addedNodes;
        for (var j = 0; j < added.length; j++) if (added[j].nodeType === 1) queued.push(added[j]);
      }
      if (queued.length && !timer) timer = setTimeout(flush, 120);
    }).observe(document.body, { childList: true, subtree: true });
    // conteúdos que só aparecem depois das animações de entrada
    setTimeout(function () { sweep(); }, 1500);
    if (mq.addEventListener) mq.addEventListener('change', function () { if (mq.matches) sweep(); });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();
