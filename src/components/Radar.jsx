import { useEffect, useRef } from 'react';
import { LEVELS } from '../data/levels.js';
import { CENTER } from '../engine/generator.js';

function draw(ctx, drones, cfg, selectedId, now) {
  const line = cfg.night ? '#3ddc84' : '#1d5f8a';
  ctx.globalAlpha = 1;
  ctx.fillStyle = cfg.night ? '#06120b' : '#dfe9ee';
  ctx.fillRect(0, 0, 600, 600);

  // rings + crosshair
  ctx.strokeStyle = line; ctx.lineWidth = 1; ctx.globalAlpha = 0.35;
  for (let r = 60; r <= 300; r += 60) { ctx.beginPath(); ctx.arc(CENTER, CENTER, r, 0, Math.PI * 2); ctx.stroke(); }
  ctx.beginPath(); ctx.moveTo(CENTER, 0); ctx.lineTo(CENTER, 600); ctx.moveTo(0, CENTER); ctx.lineTo(600, CENTER); ctx.stroke();

  // sweep line
  const a = (now / 1500) % (Math.PI * 2);
  ctx.globalAlpha = 0.5; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(CENTER, CENTER); ctx.lineTo(CENTER + 300 * Math.cos(a), CENTER + 300 * Math.sin(a)); ctx.stroke();

  // base
  ctx.globalAlpha = 1; ctx.fillStyle = line;
  ctx.beginPath(); ctx.arc(CENTER, CENTER, 6, 0, Math.PI * 2); ctx.fill();

  // sensor noise speckle
  for (let i = 0; i < cfg.noise * 60; i++) {
    ctx.globalAlpha = Math.random() * 0.5;
    ctx.fillRect(Math.random() * 600, Math.random() * 600, 2, 2);
  }

  // drones
  for (const d of drones) {
    if (d.done) continue;
    const jitter = cfg.noise * 5;
    const x = d.x + (Math.random() - 0.5) * jitter;
    const y = d.y + (Math.random() - 0.5) * jitter;
    const selected = d.id === selectedId;

    ctx.globalAlpha = 0.3; ctx.strokeStyle = line; ctx.lineWidth = 1;
    ctx.beginPath();
    d.trail.forEach((p, i) => (i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])));
    ctx.stroke();

    ctx.globalAlpha = cfg.noise > 0.6 && Math.random() < 0.2 ? 0.3 : 1; // flicker
    ctx.fillStyle = selected ? '#ffb020' : line;
    ctx.fillRect(x - 5, y - 5, 10, 10);
    if (selected) { ctx.strokeStyle = '#ffb020'; ctx.lineWidth = 2; ctx.strokeRect(x - 12, y - 12, 24, 24); }
  }
  ctx.globalAlpha = 1;
}

export default function Radar({ dronesRef, levelKey, selectedId, onSelect, onFrame }) {
  const canvasRef = useRef(null);
  const live = useRef({ onFrame, selectedId });
  live.current = { onFrame, selectedId };
  const cfg = LEVELS[levelKey];

  useEffect(() => {
    const ctx = canvasRef.current.getContext('2d');
    let raf;
    let last = performance.now();
    const loop = (now) => {
      const dt = Math.min((now - last) / 1000, 0.1);
      last = now;
      live.current.onFrame(dt, now);
      draw(ctx, dronesRef.current, cfg, live.current.selectedId, now);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [cfg, dronesRef]);

  const handleClick = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const k = 600 / rect.width;
    const x = (e.clientX - rect.left) * k;
    const y = (e.clientY - rect.top) * k;
    let best = null;
    let bestDist = 28;
    for (const d of dronesRef.current) {
      if (d.done) continue;
      const m = Math.hypot(d.x - x, d.y - y);
      if (m < bestDist) { bestDist = m; best = d; }
    }
    if (best) onSelect(best.id);
  };

  return (
    <div className={cfg.noise > 0.6 ? 'radar noisy' : 'radar'}>
      <canvas ref={canvasRef} width="600" height="600" onClick={handleClick} />
    </div>
  );
}
