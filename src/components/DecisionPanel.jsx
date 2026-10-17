import { TAGS, RESPONSES } from '../data/levels.js';
import { headingDeg } from '../engine/simulation.js';

const cap = (s) => s[0].toUpperCase() + s.slice(1);

export default function DecisionPanel({ drone, tag, onTag, onRespond }) {
  const open = drone && !drone.done;
  return (
    <div>
      <p className="sub" style={{ margin: '10px 0 6px' }}>
        {open ? (
          <>
            <b>Target {drone.id + 1}</b> · speed {Math.round(drone.speed * 8)} km/h · alt {drone.altitude} m ·
            heading {headingDeg(drone)}° · IFF: <b>{drone.iff ? 'reply' : 'no reply'}</b>
          </>
        ) : 'Select a blip on the radar.'}
      </p>
      <div className="row">
        <b>Tag:</b>
        {TAGS.map((t) => (
          <button key={t} disabled={!open} className={open && tag === t ? 'on' : ''} onClick={() => onTag(t)}>
            {cap(t)}
          </button>
        ))}
      </div>
      <div className="row" style={{ marginTop: 8 }}>
        <b>Respond:</b>
        {RESPONSES.map((r) => (
          <button key={r} disabled={!open || !tag} onClick={() => onRespond(r)}>
            {cap(r)}
          </button>
        ))}
      </div>
    </div>
  );
}
