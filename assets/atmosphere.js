/**
 * MIDNIGHT CITY RPG — ATMOSPHERIC ENGINE
 * - WebGL Volumetric Mist Fog Shader (Shared across Operações & Banners)
 * - Golden Matrix Runic Rain (Ascending & Descending Columns for Operações Hero)
 * - Magnetic Submenu & Global Navigation Handlers
 */

(function () {
  'use strict';

  // Mouse normalized coordinates
  let mouseNormX = 0.5;
  let mouseNormY = 0.5;

  window.addEventListener('mousemove', (e) => {
    mouseNormX = e.clientX / window.innerWidth;
    mouseNormY = 1.0 - (e.clientY / window.innerHeight);
  }, { passive: true });

  /* ==========================================================================
     1. VOLUMETRIC WEBGL FOG SHADER (CANONICAL OCCULT MIST)
     ========================================================================== */
  function initVolumetricFog() {
    const canvas = document.getElementById('fog-canvas');
    if (!canvas) return;

    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) {
      console.warn('MIDNIGHT CITY: WebGL not supported, fallback active.');
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
      vec3 permute(vec3 x) { return mod289(((x * 34.0) + 1.0) * x); }

      float snoise(vec2 v) {
        const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
        vec2 i  = floor(v + dot(v, C.yy));
        vec2 x0 = v - i + dot(i, C.xx);
        vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
        vec4 x12 = x0.xyxy + C.xxzz;
        x12.xy -= i1;
        i = mod289(i);
        vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
        vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
        m = m * m;
        m = m * m;
        vec3 x = 2.0 * fract(p * C.www) - 1.0;
        vec3 h = abs(x) - 0.5;
        vec3 ox = floor(x + 0.5);
        vec3 a0 = x - ox;
        m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
        vec3 g;
        g.x  = a0.x * x0.x + h.x * x0.y;
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

        vec3 baseVoid = vec3(0.045, 0.035, 0.015);  // #0b0904 Dark golden-amber void foundation
        vec3 mistAmber = vec3(0.22, 0.165, 0.055);  // Opulent warm antique gold smoke
        vec3 mistLight = vec3(0.36, 0.285, 0.095);  // Luminous drifting celestial gold fog
        vec3 goldGlow = vec3(1.0, 0.84, 0.42);      // Radiant specular gold highlight

        vec3 col = mix(baseVoid, mistAmber, smoothstep(-0.35, 0.75, n2));
        col = mix(col, mistLight, smoothstep(0.05, 0.95, n3));
        col += goldGlow * pow(max(0.0, n3), 4.0) * 0.16;

        gl_FragColor = vec4(col, 1.0);
      }
    `;

    function createShader(glCtx, type, src) {
      const s = glCtx.createShader(type);
      glCtx.shaderSource(s, src);
      glCtx.compileShader(s);
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
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
      -1, -1,  1, -1, -1,  1,
      -1,  1,  1, -1,  1,  1
    ]), gl.STATIC_DRAW);

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
    window.addEventListener('resize', resize, { passive: true });

    const startTime = performance.now();
    function renderFog() {
      const now = performance.now();
      const timeSec = (now - startTime) * 0.001;

      gl.uniform2f(resLoc, canvas.width, canvas.height);
      gl.uniform1f(timeLoc, timeSec);
      gl.uniform2f(mouseLoc, mouseNormX, mouseNormY);

      gl.drawArrays(gl.TRIANGLES, 0, 6);
      requestAnimationFrame(renderFog);
    }
    renderFog();
  }

  /* ==========================================================================
     2. GOLDEN MATRIX RUNIC RAIN (SUBINDO E DESCENDO NA COR DOURADA)
     ========================================================================== */
  function initGoldenMatrix() {
    const canvas = document.getElementById('matrix-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Runic and Occult glyph set
    const chars = "ᚠᚢᚦᚨᚱᚲᚷᚹᚺᚾᛁᛃᛇᛈᛉᛋᛏᛒᛖᛗᛚᛜᛞᛟΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩ0123456789❖✦◈";
    const fontSize = 16;
    let columns = [];
    let W = 0, H = 0;

    function resize() {
      const rect = canvas.parentElement ? canvas.parentElement.getBoundingClientRect() : { width: window.innerWidth, height: 460 };
      W = canvas.width = rect.width;
      H = canvas.height = rect.height;
      const numCols = Math.floor(W / fontSize);
      columns = [];

      for (let i = 0; i < numCols; i++) {
        // Alternate directions: even columns fall down, odd columns rise up
        const direction = (i % 2 === 0) ? 1 : -1;
        columns.push({
          x: i * fontSize,
          y: direction === 1 ? Math.random() * -H : Math.random() * H + H,
          speed: Math.random() * 1.5 + 1.2,
          length: Math.floor(Math.random() * 18) + 10,
          direction: direction, // 1 = descending, -1 = ascending
          charHistory: []
        });
      }
    }

    resize();
    window.addEventListener('resize', resize, { passive: true });

    let lastDraw = 0;
    function renderMatrix(timestamp) {
      if (timestamp - lastDraw < 33) { // ~30 fps for cinematic matrix feel
        requestAnimationFrame(renderMatrix);
        return;
      }
      lastDraw = timestamp;

      // Dark translucent wash to create fading luminous trails
      ctx.fillStyle = "rgba(0, 0, 0, 0.12)";
      ctx.fillRect(0, 0, W, H);

      ctx.font = `${fontSize}px 'JetBrains Mono', 'Cinzel', monospace`;

      for (let i = 0; i < columns.length; i++) {
        const col = columns[i];
        const nextChar = chars[Math.floor(Math.random() * chars.length)];
        col.charHistory.unshift(nextChar);
        if (col.charHistory.length > col.length) {
          col.charHistory.pop();
        }

        for (let j = 0; j < col.charHistory.length; j++) {
          const char = col.charHistory[j];
          const charY = col.y - (j * fontSize * col.direction);

          if (charY < -fontSize || charY > H + fontSize) continue;

          if (j === 0) {
            // Leading character is brilliant radiant white-gold
            ctx.fillStyle = "#fffbe6";
            ctx.shadowColor = "#f1d27a";
            ctx.shadowBlur = 10;
          } else if (j < 3) {
            // Bright gold body
            ctx.fillStyle = "#f1d27a";
            ctx.shadowColor = "#d4af37";
            ctx.shadowBlur = 6;
          } else if (j < 8) {
            // Classical Midnight City gold
            ctx.fillStyle = "rgba(212, 175, 55, " + (1.0 - (j / col.length)) + ")";
            ctx.shadowBlur = 0;
          } else {
            // Fading deep amber/bronze
            ctx.fillStyle = "rgba(140, 106, 43, " + (0.8 - (j / col.length)) + ")";
            ctx.shadowBlur = 0;
          }

          ctx.fillText(char, col.x, charY);
        }

        // Reset shadow
        ctx.shadowBlur = 0;

        // Move column
        col.y += col.speed * fontSize * col.direction;

        // Wrap around when offscreen
        if (col.direction === 1 && col.y - (col.length * fontSize) > H) {
          col.y = Math.random() * -50;
          col.speed = Math.random() * 1.5 + 1.2;
          col.length = Math.floor(Math.random() * 18) + 10;
        } else if (col.direction === -1 && col.y + (col.length * fontSize) < 0) {
          col.y = H + Math.random() * 50;
          col.speed = Math.random() * 1.5 + 1.2;
          col.length = Math.floor(Math.random() * 18) + 10;
        }
      }

      requestAnimationFrame(renderMatrix);
    }

    requestAnimationFrame(renderMatrix);
  }

  /* ==========================================================================
     3. STICKY SUB-MENU MOUSE INTERACTION (SE MOVER COM O MOUSE)
     ========================================================================== */
  function initStickyHubMouseTracker() {
    const track = document.querySelector('.hub-nav-track');
    const hubHeader = document.querySelector('.operacoes-hub-header');
    if (!track || !hubHeader) return;

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    window.addEventListener('mousemove', (e) => {
      // Calculate normalized offset from viewport center
      const normX = (e.clientX / window.innerWidth) - 0.5;
      const normY = (e.clientY / window.innerHeight) - 0.5;

      // Subtle magnetic deflection (max 18px horizontal, 4px vertical)
      targetX = normX * 22;
      targetY = normY * 5;
    }, { passive: true });

    function tick() {
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;

      track.style.transform = `translate3d(${currentX.toFixed(2)}px, ${currentY.toFixed(2)}px, 0)`;
      requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  /* ==========================================================================
     4. GLOBAL MOBILE MENU TOGGLE
     ========================================================================== */
  function initGlobalMobileMenu() {
    const btn = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('mobile-menu');
    if (!btn || !menu) return;

    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      menu.classList.toggle('hidden');
    });

    document.addEventListener('click', (e) => {
      if (!menu.classList.contains('hidden') && !menu.contains(e.target) && e.target !== btn) {
        menu.classList.add('hidden');
      }
    });
  }

  /* ==========================================================================
     INITIALIZER
     ========================================================================== */
  function init() {
    initVolumetricFog();
    initGoldenMatrix();
    initStickyHubMouseTracker();
    initGlobalMobileMenu();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
