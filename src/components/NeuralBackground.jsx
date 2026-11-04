import React, { useEffect, useRef } from 'react';

/**
 * NeuralBackground — canvas animation of a deep neural network.
 * Layers of neurons drift gently, signals (pulses) travel along synapses,
 * neurons "fire" when a pulse arrives, and the cursor excites nearby nodes.
 * Dependency-free; pauses off-screen / when the tab is hidden.
 */
const PALETTE = [
  [255, 255, 255],
  [34, 211, 238],
  [168, 85, 247],
];

export default function NeuralBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

    let w = 0, h = 0, dpr = 1;
    let layers = [];       // layers[l] = [node, ...]
    let edges = [];        // {a, b, w}
    let pulses = [];
    let raf = 0, running = false, visible = true;
    const mouse = { x: -9999, y: -9999 };

    const rand = (a, b) => a + Math.random() * (b - a);

    function build() {
      const rect = canvas.parentElement.getBoundingClientRect();
      w = rect.width; h = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const small = w < 700;
      const layerCount = small ? 5 : w < 1100 ? 7 : 9;
      const maxNodes = small ? 7 : 11;
      const marginX = w * 0.04;

      layers = [];
      edges = [];
      pulses = [];
      for (let l = 0; l < layerCount; l++) {
        // bell-shaped layer sizes: narrow ends, wide middle
        const mid = (layerCount - 1) / 2;
        const f = 1 - Math.abs(l - mid) / (mid + 1);
        const count = Math.max(3, Math.round(3 + f * (maxNodes - 3) + rand(-1, 1)));
        const x = marginX + (l / (layerCount - 1)) * (w - marginX * 2);
        const layer = [];
        for (let i = 0; i < count; i++) {
          const y = ((i + 0.5) / count) * h * 0.9 + h * 0.05;
          layer.push({
            bx: x + rand(-14, 14), by: y + rand(-12, 12),
            x: 0, y: 0,
            ph: rand(0, Math.PI * 2), sp: rand(0.25, 0.7), amp: rand(4, 12),
            r: rand(1.8, 3.4), act: 0,
            c: PALETTE[Math.floor(Math.random() * PALETTE.length)],
          });
        }
        layers.push(layer);
      }
      for (let l = 0; l < layers.length - 1; l++) {
        for (const a of layers[l]) {
          const targets = [...layers[l + 1]]
            .sort((p, q) => Math.abs(p.by - a.by) - Math.abs(q.by - a.by))
            .slice(0, 3 + (Math.random() < 0.4 ? 1 : 0));
          for (const b of targets) edges.push({ a, b, w: rand(0.4, 1) });
        }
      }
    }

    function spawnPulse() {
      if (!edges.length || pulses.length > 70) return;
      const e = edges[Math.floor(Math.random() * edges.length)];
      pulses.push({ e, t: 0, v: rand(0.35, 0.8), c: e.a.c });
    }

    function frame(time) {
      const t = time / 1000;
      ctx.clearRect(0, 0, w, h);

      // positions
      for (const layer of layers) for (const n of layer) {
        n.x = n.bx + Math.sin(t * n.sp + n.ph) * n.amp * 0.6;
        n.y = n.by + Math.cos(t * n.sp * 0.9 + n.ph) * n.amp;
        const dx = n.x - mouse.x, dy = n.y - mouse.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < 22000) { n.act = Math.max(n.act, 1 - d2 / 22000); }
        n.act *= 0.955;
      }

      ctx.globalCompositeOperation = 'lighter';

      // synapses
      ctx.lineWidth = 1;
      for (const e of edges) {
        const a = e.a, b = e.b;
        const alpha = 0.05 + 0.09 * e.w + 0.5 * Math.max(a.act, b.act) * e.w;
        ctx.strokeStyle = `rgba(${a.c[0]},${a.c[1]},${a.c[2]},${alpha})`;
        ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
      }

      // pulses
      for (let i = pulses.length - 1; i >= 0; i--) {
        const p = pulses[i];
        p.t += p.v * 0.016;
        if (p.t >= 1) {
          p.e.b.act = 1;
          // propagate forward through the network
          const next = edges.filter(x => x.a === p.e.b);
          if (next.length && Math.random() < 0.85) {
            const n = next[Math.floor(Math.random() * next.length)];
            pulses.push({ e: n, t: 0, v: rand(0.35, 0.8), c: p.c });
            if (Math.random() < 0.35) {
              const m = next[Math.floor(Math.random() * next.length)];
              pulses.push({ e: m, t: 0, v: rand(0.35, 0.8), c: p.c });
            }
          }
          pulses.splice(i, 1);
          continue;
        }
        const { a, b } = p.e;
        const x = a.x + (b.x - a.x) * p.t, y = a.y + (b.y - a.y) * p.t;
        const tx = a.x + (b.x - a.x) * Math.max(0, p.t - 0.12);
        const ty = a.y + (b.y - a.y) * Math.max(0, p.t - 0.12);
        const g = ctx.createLinearGradient(tx, ty, x, y);
        g.addColorStop(0, `rgba(${p.c[0]},${p.c[1]},${p.c[2]},0)`);
        g.addColorStop(1, `rgba(${p.c[0]},${p.c[1]},${p.c[2]},0.95)`);
        ctx.strokeStyle = g; ctx.lineWidth = 1.8;
        ctx.beginPath(); ctx.moveTo(tx, ty); ctx.lineTo(x, y); ctx.stroke();
        ctx.fillStyle = `rgba(${p.c[0]},${p.c[1]},${p.c[2]},0.95)`;
        ctx.beginPath(); ctx.arc(x, y, 1.8, 0, Math.PI * 2); ctx.fill();
      }

      // neurons
      for (const layer of layers) for (const n of layer) {
        const glow = n.r * (3 + n.act * 7);
        const g = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, glow);
        g.addColorStop(0, `rgba(${n.c[0]},${n.c[1]},${n.c[2]},${0.25 + n.act * 0.6})`);
        g.addColorStop(1, `rgba(${n.c[0]},${n.c[1]},${n.c[2]},0)`);
        ctx.fillStyle = g;
        ctx.beginPath(); ctx.arc(n.x, n.y, glow, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = `rgba(${n.c[0]},${n.c[1]},${n.c[2]},${0.55 + n.act * 0.45})`;
        ctx.beginPath(); ctx.arc(n.x, n.y, n.r + n.act * 1.6, 0, Math.PI * 2); ctx.fill();
      }
      ctx.globalCompositeOperation = 'source-over';
    }

    function loop(time) {
      if (!running) return;
      if (Math.random() < 0.28) spawnPulse();
      frame(time);
      raf = requestAnimationFrame(loop);
    }
    const start = () => { if (!running && visible && !document.hidden && !reduceMotion) { running = true; raf = requestAnimationFrame(loop); } };
    const stop = () => { running = false; cancelAnimationFrame(raf); };

    build();
    if (reduceMotion) { for (let i = 0; i < 25; i++) spawnPulse(); frame(0); }
    else { for (let i = 0; i < 20; i++) spawnPulse(); start(); }

    const ro = new ResizeObserver(() => { build(); if (reduceMotion) frame(0); });
    ro.observe(canvas.parentElement);
    const io = new IntersectionObserver(([en]) => { visible = en.isIntersecting; visible ? start() : stop(); });
    io.observe(canvas);
    const onVis = () => (document.hidden ? stop() : start());
    const onMove = e => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top;
    };
    const onLeave = () => { mouse.x = mouse.y = -9999; };
    document.addEventListener('visibilitychange', onVis);
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerleave', onLeave);

    return () => {
      stop(); ro.disconnect(); io.disconnect();
      document.removeEventListener('visibilitychange', onVis);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className="hp-neural-canvas" aria-hidden="true" />;
}
