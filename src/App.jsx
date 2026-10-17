import { useState } from 'react';
import Menu from './components/Menu.jsx';
import Results from './components/Results.jsx';
import Dashboard from './components/Dashboard.jsx';
import Simulation from './screens/Simulation.jsx';
import { loadSessions, saveSession, clearSessions } from './engine/storage.js';

export default function App() {
  const [screen, setScreen] = useState('menu'); // 'menu' | 'sim' | 'results'
  const [level, setLevel] = useState(1);
  const [runId, setRunId] = useState(0);
  const [result, setResult] = useState(null);
  const [sessions, setSessions] = useState(loadSessions);

  const start = () => { setRunId((n) => n + 1); setScreen('sim'); };
  const finish = (summary) => { setSessions(saveSession(summary)); setResult(summary); setScreen('results'); };

  return (
    <div className="wrap">
      <h1>DroneGuard</h1>
      <p className="sub">AI-enabled drone &amp; counter-drone threat simulation trainer — prototype</p>

      {screen === 'menu' && <Menu level={level} onLevel={setLevel} onStart={start} />}
      {screen === 'sim' && <Simulation key={runId} levelKey={level} onFinish={finish} />}
      {screen === 'results' && <Results result={result} onBack={() => setScreen('menu')} />}

      <Dashboard sessions={sessions} onClear={() => setSessions(clearSessions())} />
    </div>
  );
}
