// Rule-based scoring (no ML): classification + speed + response.
export function scoreDecision(drone, response) {
  let s = 0;

  if (drone.tag === drone.truth) s += 50;
  else if (drone.tag === 'unknown') s += 10; // cautious, partial credit

  if (drone.reactionTime < 8) s += 30;
  else if (drone.reactionTime < 15) s += 15;

  if (drone.truth === 'hostile' && response === 'engage') s += 20;
  if (drone.truth === 'friendly' && response === 'ignore') s += 20;
  if (drone.truth === 'friendly' && response === 'engage') s -= 40; // friendly fire
  if (drone.truth === 'hostile' && response === 'ignore') s -= 20;  // let a threat through
  return s;
}

export function scoreMiss(drone) {
  return drone.truth === 'hostile' ? -20 : 0;
}

export function summarize(drones, score, levelKey) {
  const decided = drones.filter((d) => d.reactionTime != null);
  const accuracy = Math.round((drones.filter((d) => d.correct).length / drones.length) * 100);
  const avgReaction = decided.length
    ? decided.reduce((sum, d) => sum + d.reactionTime, 0) / decided.length
    : 0;
  return {
    date: Date.now(),
    level: levelKey,
    score,
    accuracy,
    avgReaction: +avgReaction.toFixed(1),
    drones: drones.map(({ id, truth, tag, response, reactionTime, points, missed }) => ({
      id, truth, tag, response, reactionTime, points, missed,
    })),
  };
}
