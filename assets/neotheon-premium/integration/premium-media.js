/* Independent example: keep one owner per mounted stage; cleanup before renderAll. */
window.initPremiumMedia = function initPremiumMedia(root = document) {
  const nodes = [...root.querySelectorAll('[data-premium-media]')];
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const visible = new Map();
  const handlers = [];
  let disposed = false;

  function allowed() {
    return !reduced.matches && !navigator.connection?.saveData && !document.hidden;
  }

  function getVideoSrc(node) {
    const isMobile = window.matchMedia('(max-width: 767px)').matches;
    const src720 = node.getAttribute('data-video-720') || (node.dataset ? (node.dataset['video-720'] || node.dataset.video720) : null);
    const src1080 = node.getAttribute('data-video-1080') || (node.dataset ? (node.dataset['video-1080'] || node.dataset.video1080) : null);
    return (isMobile && src720) ? src720 : (src1080 || src720);
  }

  function isNodeVisible(node) {
    if (node.hidden || node.closest('[hidden]')) return false;
    if (visible.has(node)) {
      return (visible.get(node) || 0) > 0.05;
    }
    // Fallback: check DOM bounding box if observer hasn't reported yet
    const r = node.getBoundingClientRect();
    return r.top < window.innerHeight && r.bottom > 0 && r.width > 0 && r.height > 0;
  }

  function refresh() {
    if (disposed) return;
    const isAllowed = allowed();
    const eligible = isAllowed ? nodes.filter(n => !n.dataset.userPaused && isNodeVisible(n)) : [];
    const chosen = eligible.length > 0
      ? eligible.sort((a, b) => (visible.get(b) || 1) - (visible.get(a) || 1))[0]
      : null;

    for (const n of nodes) {
      const video = n.querySelector('video');
      if (!video) continue;

      if (n !== chosen) {
        video.pause();
        n.classList.remove('is-playing');
        continue;
      }

      // Configure video attributes for strict modern autoplay policies
      video.muted = true;
      video.defaultMuted = true;
      video.playsInline = true;
      video.loop = true;
      video.setAttribute('muted', '');
      video.setAttribute('playsinline', '');
      video.setAttribute('webkit-playsinline', '');
      video.setAttribute('loop', '');
      video.setAttribute('autoplay', '');

      const targetSrc = getVideoSrc(n);
      if (targetSrc && (video.getAttribute('src') !== targetSrc || !video.src || video.src.endsWith('undefined'))) {
        video.src = targetSrc;
        video.load();
      }

      const p = video.play();
      if (p !== undefined) {
        p.then(() => {
          n.classList.add('is-playing');
        }).catch(() => {
          // Deferred until user interaction (click/touch/scroll)
          n.classList.remove('is-playing');
        });
      }
    }
  }

  const observer = 'IntersectionObserver' in window ? new IntersectionObserver(entries => {
    entries.forEach(e => visible.set(e.target, e.intersectionRatio));
    refresh();
  }, { threshold: [0, 0.05, 0.15, 0.5, 0.9] }) : null;

  for (const n of nodes) {
    const video = n.querySelector('video');
    if (!video) continue;

    const onPlaying = () => n.classList.add('is-playing');
    const onError = () => n.classList.remove('is-playing');
    const onCanPlay = () => {
      if (allowed() && !video.paused && !n.classList.contains('is-playing')) {
        n.classList.add('is-playing');
      }
    };

    video.addEventListener('playing', onPlaying);
    video.addEventListener('canplay', onCanPlay);
    video.addEventListener('error', onError);

    handlers.push(() => {
      video.removeEventListener('playing', onPlaying);
      video.removeEventListener('canplay', onCanPlay);
      video.removeEventListener('error', onError);
      video.pause();
      n.classList.remove('is-playing');
    });

    observer?.observe(n);
  }

  // Initial trigger immediately and on next microtask
  refresh();
  if (typeof requestAnimationFrame === 'function') {
    requestAnimationFrame(refresh);
  }

  // Handle visibility changes & viewport resizing
  const onVisibilityChange = () => refresh();
  const onMotionChange = () => refresh();
  const onResize = () => refresh();

  document.addEventListener('visibilitychange', onVisibilityChange);
  reduced.addEventListener('change', onMotionChange);
  window.addEventListener('resize', onResize, { passive: true });

  // Unlock browser autoplay policy on first user gesture anywhere
  const unlock = () => { refresh(); };
  window.addEventListener('click', unlock, { once: true, passive: true });
  window.addEventListener('touchstart', unlock, { once: true, passive: true });
  window.addEventListener('scroll', unlock, { once: true, passive: true });
  window.addEventListener('keydown', unlock, { once: true, passive: true });

  return () => {
    disposed = true;
    observer?.disconnect();
    handlers.forEach(fn => fn());
    document.removeEventListener('visibilitychange', onVisibilityChange);
    reduced.removeEventListener('change', onMotionChange);
    window.removeEventListener('resize', onResize);
  };
};
