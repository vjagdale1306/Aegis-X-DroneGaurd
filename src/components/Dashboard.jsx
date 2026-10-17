import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

export default function Dashboard({ sessions, onClear }) {
  const data = {
    labels: sessions.map((_, i) => `#${i + 1}`),
    datasets: [
      { label: 'Score', data: sessions.map((s) => s.score), borderColor: '#3ddc84', tension: 0.3 },
      { label: 'Accuracy %', data: sessions.map((s) => s.accuracy), borderColor: '#ffb020', tension: 0.3 },
      { label: 'Avg reaction (s)', data: sessions.map((s) => s.avgReaction), borderColor: '#5aa9ff', tension: 0.3 },
    ],
  };
  return (
    <div className="card">
      <b>Performance dashboard</b> <span className="sub">(saved in this browser)</span>
      <div className="chart-wrap">
        <Line data={data} options={{ maintainAspectRatio: false, animation: false }} />
      </div>
      <button style={{ marginTop: 8 }} onClick={onClear}>Clear history</button>
    </div>
  );
}
