import { LEVELS } from '../data/levels.js';

export const CENTER = 300; // radar is a 600x600 canvas, base at the centre
const SPAWN_RADIUS = 285;

const rand = ([a, b]) => a + Math.random() * (b - a);

export function generateScenario(levelKey) {
  const cfg = LEVELS[levelKey];
  const count = Math.round(rand(cfg.count));
  const swarmBearing = Math.random() * Math.PI * 2;

  return Array.from({ length: count }, (_, id) => {
    const hostile = Math.random() < cfg.hostileRatio;
    // A swarm arrives from a similar bearing; otherwise drones come from anywhere.
    const angle = cfg.swarm ? swarmBearing + rand([-0.3, 0.3]) : Math.random() * Math.PI * 2;

    return {
      id,
      x: CENTER + SPAWN_RADIUS * Math.cos(angle),
      y: CENTER + SPAWN_RADIUS * Math.sin(angle),
      // Hostiles: faster, lower, rarely answer IFF. Friendlies: slower, higher, usually answer.
      speed: hostile ? rand(cfg.speed) : rand(cfg.speed) * 0.65,
      altitude: Math.round(hostile ? rand([20, 130]) : rand([110, 400])),
      iff: hostile ? Math.random() < 0.1 : Math.random() < 0.9,
      truth: hostile ? 'hostile' : 'friendly',
      // trainee decision state
      tag: null,
      response: null,
      reactionTime: null,
      points: 0,
      correct: false,
      missed: false,
      done: false,
      trail: [],
    };
  });
}
