import { CENTER } from './generator.js';

const BASE_RADIUS = 14;

// Moves every active drone toward the base. Returns drones that reached it unresolved.
export function stepDrones(drones, dt) {
  const missed = [];
  for (const d of drones) {
    if (d.done) continue;
    const dx = CENTER - d.x;
    const dy = CENTER - d.y;
    const dist = Math.hypot(dx, dy);

    if (dist < BASE_RADIUS) {
      d.done = true;
      d.missed = true;
      d.correct = false;
      missed.push(d);
      continue;
    }
    d.x += (dx / dist) * d.speed * dt;
    d.y += (dy / dist) * d.speed * dt;
    d.trail.push([d.x, d.y]);
    if (d.trail.length > 25) d.trail.shift();
  }
  return missed;
}

export function headingDeg(d) {
  const rad = Math.atan2(CENTER - d.y, CENTER - d.x);
  return Math.round(((rad * 180) / Math.PI + 450) % 360);
}
