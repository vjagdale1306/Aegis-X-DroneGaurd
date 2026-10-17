# DroneGuard — Drone Threat Simulation Trainer (MVP)

A browser-based training simulator. Trainees see a radar, spot incoming drones, tag them
(friendly / hostile / unknown), choose a response, and get scored. Progress is tracked on a dashboard.
No backend, no ML, no real hardware — scenarios are generated and scored by rules.

## Run
```bash
npm install
npm run dev      # open http://localhost:5173
npm run build    # production build in /dist
```

## Structure
```
src/
  data/levels.js            scenario templates (4 levels) + tag/response options
  engine/generator.js       randomised scenario generator
  engine/simulation.js      per-frame movement, base-reached detection
  engine/scoring.js         rule-based scoring + session summary
  engine/storage.js         localStorage session history
  components/Radar.jsx      canvas radar, animation loop, click-to-select
  components/DecisionPanel  tag + respond controls
  components/Results.jsx    after-action review
  components/Dashboard.jsx  Chart.js progress graph
  components/Menu.jsx       level picker
  screens/Simulation.jsx    runs one training session
  App.jsx                   menu -> sim -> results flow
```

## Tune it
- Difficulty: edit `src/data/levels.js`
- Scoring rules: `src/engine/scoring.js`
- Hostile vs friendly traits (speed, altitude, IFF): `src/engine/generator.js`

## Future scope
VR/3D view, adaptive difficulty, terrain types, scripted swarm formations, instructor dashboard, backend sync.
