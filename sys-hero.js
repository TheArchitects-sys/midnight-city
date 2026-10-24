/* Hero do Terminal da Égide: entrada com GSAP, poeira dourada e parallax leve. */
(function () {
  'use strict';
  var hero = document.getElementById('sys-hero');
  if (!hero) return;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Entrada coreografada
  if (window.gsap && !reduce) {
    document.documentElement.classList.add('js-hero-ready');
    var tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
    tl.from('.sys-hero-img', { scale: 1.12, opacity: 0, duration: 1.2, ease: 'power2.out' }, 0)
      .to('[data-hero-in]', { opacity: 1, y: 0, duration: 1, stagger: 0.08 }, 0.35)
      .to('[data-hero-line]', { y: 0, duration: 1.15, stagger: 0.07 }, 0.45);
    // segurança: se algo falhar, nada fica escondido
    setTimeout(function () { document.documentElement.classList.remove('js-hero-ready'); }, 2600);

    // Saída ligada ao scroll: a foto aproxima e o texto sobe e some
    if (window.ScrollTrigger) {
      gsap.registerPlugin(ScrollTrigger);
      gsap.timeline({ scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: 0.6 } })
        .to('.sys-hero-media', { yPercent: 12, scale: 1.06, ease: 'none' }, 0)
        .to('.sys-hero-copy', { yPercent: -10, opacity: 0.15, ease: 'none' }, 0);
      // o Cinzel muda a altura dos títulos ao carregar: recalcula os pontos de scroll
      if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { ScrollTrigger.refresh(); });
    }

    // Parallax do cursor (só desktop)
    if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      // quickTo reaproveita um único tween por eixo (sem criar um tween novo a cada pointermove)
      var media = hero.querySelector('.sys-hero-media picture');
      var glow = hero.querySelector('.sys-hero-crystal');
      var mx = gsap.quickTo(media, 'x', { duration: 1.2, ease: 'power3.out' });
      var my = gsap.quickTo(media, 'y', { duration: 1.2, ease: 'power3.out' });
      var gx = glow && gsap.quickTo(glow, 'x', { duration: 1.4, ease: 'power3.out' });
      var gy = glow && gsap.quickTo(glow, 'y', { duration: 1.4, ease: 'power3.out' });
      hero.addEventListener('pointermove', function (e) {
        var r = hero.getBoundingClientRect();
        var x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
        mx(x * -18); my(y * -12);
        if (gx) { gx(x * 10); gy(y * 8); }
      });
    }
  }

  // Poeira dourada no ar
  var c = document.getElementById('sys-hero-dust');
  if (!c || reduce) return;
  var ctx = c.getContext('2d'), dpr = Math.min(window.devicePixelRatio || 1, 2), W, H, motes = [], raf, visible = true;
  function size() {
    W = c.clientWidth; H = c.clientHeight; c.width = W * dpr; c.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    var n = Math.round(Math.min(90, W / 16));
    motes = Array.from({ length: n }, function () {
      return { x: Math.random() * W, y: Math.random() * H, r: Math.random() * 1.6 + .3, vx: (Math.random() - .3) * .18, vy: -(Math.random() * .25 + .05), a: Math.random() * .6 + .15, t: Math.random() * 6.28 };
    });
  }
  function tick() {
    ctx.clearRect(0, 0, W, H);
    for (var i = 0; i < motes.length; i++) {
      var m = motes[i]; m.x += m.vx; m.y += m.vy; m.t += .02;
      if (m.y < -5) { m.y = H + 5; m.x = Math.random() * W; }
      if (m.x > W + 5) m.x = -5;
      // mais brilho na faixa de luz (lado direito, alto)
      var inLight = m.x > W * .55 ? 1.6 : .7;
      ctx.globalAlpha = Math.max(0, Math.min(1, m.a * inLight * (.6 + .4 * Math.sin(m.t))));
      ctx.fillStyle = '#f5d98e';
      ctx.beginPath(); ctx.arc(m.x, m.y, m.r, 0, 6.283); ctx.fill();
    }
    ctx.globalAlpha = 1;
    if (visible) raf = requestAnimationFrame(tick);
  }
  size(); tick();
  window.addEventListener('resize', size, { passive: true });
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (es) {
      visible = es[0].isIntersecting; cancelAnimationFrame(raf); if (visible) tick();
    }).observe(hero);
  }
})();
