import { useRef, useState } from 'react';
import Radar from '../components/Radar.jsx';
import DecisionPanel from '../components/DecisionPanel.jsx';
import { generateScenario } from '../engine/generator.js';
import { stepDrones } from '../engine/simulation.js';
import { scoreDecision, scoreMiss, summarize } from '../engine/scoring.js';

export default function Simulation({ levelKey, onFinish }) {
  const dronesRef = useRef(null);
  if (!dronesRef.current) dronesRef.current = generateScenario(levelKey);
  const drones = dronesRef.current;

  const startRef = useRef(performance.now());
  const endedRef = useRef(false);
  const totalRef = useRef(0);

  const [selectedId, setSelectedId] = useState(null);
  const [tag, setTag] = useState(null);
  const [elapsed, setElapsed] = useState(0);
  const [, setVersion] = useState(0);
  const bump = () => setVersion((v) => v + 1);

  const selectedIdRef = useRef(null);
  selectedIdRef.current = selectedId;
  const selected = drones.find((d) => d.id === selectedId) || null;

  // Called every animation frame by <Radar>.
  const handleFrame = (dt, now) => {
    if (endedRef.current) return;

    const missed = stepDrones(drones, dt);
    if (missed.length) {
      missed.forEach((d) => { d.points = scoreMiss(d); totalRef.current += d.points; });
      if (missed.some((d) => d.id === selectedIdRef.current)) { setSelectedId(null); setTag(null); }
      bump();
    }
    setElapsed(Math.round((now - startRef.current) / 1000));

    if (drones.every((d) => d.done)) {
      endedRef.current = true;
      onFinish(summarize(drones, totalRef.current, levelKey));
    }
  };

  const handleSelect = (id) => { setSelectedId(id); setTag(null); };

  const handleRespond = (response) => {
    if (!selected || selected.done || !tag) return;
    selected.tag = tag;
    selected.response = response;
    selected.reactionTime = (performance.now() - startRef.current) / 1000;
    selected.correct = tag === selected.truth;
    selected.points = scoreDecision(selected, response);
    selected.done = true;
    totalRef.current += selected.points;
    setSelectedId(null);
    setTag(null);
    bump();
  };

  const resolved = drones.filter((d) => d.done).length;

  return (
    <div className="card">
      <div className="stats">
        <span>Level <b>{levelKey}</b></span>
        <span>Time <b>{elapsed}s</b></span>
        <span>Resolved <b>{resolved}/{drones.length}</b></span>
        <span>Score <b>{totalRef.current}</b></span>
      </div>
      <Radar
        dronesRef={dronesRef}
        levelKey={levelKey}
        selectedId={selectedId}
        onSelect={handleSelect}
        onFrame={handleFrame}
      />
      <DecisionPanel drone={selected} tag={tag} onTag={setTag} onRespond={handleRespond} />
    </div>
  );
}
