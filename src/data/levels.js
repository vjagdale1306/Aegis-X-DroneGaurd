// Scenario templates. Ranges are randomised on every run so trainees cannot memorise answers.
// count: drones per run | speed: px/sec | noise: 0-1 sensor degradation
// hostileRatio: share of hostile drones | swarm: clustered, similar bearing
export const LEVELS = {
  1: { name: 'Single drone',            count: [1, 1],   speed: [14, 20], noise: 0,    night: false, hostileRatio: 0.5,  swarm: false },
  2: { name: 'Multiple drones',         count: [3, 4],   speed: [14, 24], noise: 0.3,  night: false, hostileRatio: 0.6,  swarm: false },
  3: { name: 'Swarm · Night',           count: [8, 10],  speed: [18, 28], noise: 0.5,  night: true,  hostileRatio: 0.8,  swarm: true  },
  4: { name: 'Swarm · Degraded sensor', count: [12, 15], speed: [22, 34], noise: 0.85, night: true,  hostileRatio: 0.85, swarm: true  },
};

export const TAGS = ['friendly', 'hostile', 'unknown'];
export const RESPONSES = ['ignore', 'track', 'engage'];
