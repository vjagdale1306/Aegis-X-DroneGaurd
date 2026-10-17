import { LEVELS } from '../data/levels.js';

export default function Menu({ level, onLevel, onStart }) {
  return (
    <div className="card">
      <div className="row">
        <b>Level:</b>
        {Object.entries(LEVELS).map(([k, v]) => (
          <button key={k} className={+k === level ? 'on' : ''} onClick={() => onLevel(+k)}>
            {k} {v.name}
          </button>
        ))}
        <button className="on" style={{ marginLeft: 'auto' }} onClick={onStart}>Start</button>
      </div>
      <p className="sub" style={{ margin: '10px 0 0' }}>
        Click a blip, tag it (friendly / hostile / unknown), then choose a response before it reaches the base.
        Hint: hostiles tend to be faster, lower and have no IFF reply.
      </p>
    </div>
  );
}
