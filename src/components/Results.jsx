export default function Results({ result, onBack }) {
  return (
    <div className="card">
      <b>After-Action Review</b>
      <div className="kpis">
        <div><b>{result.score}</b><span>Session score</span></div>
        <div><b>{result.accuracy}%</b><span>Accuracy</span></div>
        <div><b>{result.avgReaction}s</b><span>Avg reaction</span></div>
      </div>
      <div className="sub">
        {result.drones.map((d) => (
          <div key={d.id}>
            Target {d.id + 1}: truth <b>{d.truth}</b>,{' '}
            {d.missed
              ? <span className="bad">missed</span>
              : `tagged ${d.tag}, ${d.response}, ${d.reactionTime.toFixed(1)}s`}
            {' '}→ {d.points} pts
          </div>
        ))}
      </div>
      <button className="on" style={{ marginTop: 10 }} onClick={onBack}>Back to menu</button>
    </div>
  );
}
