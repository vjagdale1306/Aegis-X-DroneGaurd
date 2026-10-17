const KEY = 'droneguard.sessions';

export function loadSessions() {
  try {
    return JSON.parse(localStorage.getItem(KEY) || '[]');
  } catch {
    return [];
  }
}

export function saveSession(session) {
  const all = loadSessions();
  all.push(session);
  try { localStorage.setItem(KEY, JSON.stringify(all)); } catch { /* storage unavailable */ }
  return all;
}

export function clearSessions() {
  try { localStorage.removeItem(KEY); } catch { /* ignore */ }
  return [];
}
