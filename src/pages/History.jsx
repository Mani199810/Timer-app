import React, { useEffect, useState } from 'react';

export default function History() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const data = localStorage.getItem('timers');
    if (data) {
      const parsed = JSON.parse(data);
      setHistory(parsed.history || []);
    }
  }, []);

  const exportAsJSON = () => {
    const blob = new Blob([JSON.stringify(history, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'timer-history.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="mb-0">Completed Timers</h2>
        <button className="btn btn-outline-primary" onClick={exportAsJSON}>
          📤 Export JSON
        </button>
      </div>

      {history.length === 0 ? (
        <p className="text-muted">No completed timers yet.</p>
      ) : (
        <ul className="list-group">
          {history.map((item, index) => (
            <li key={index} className="list-group-item d-flex justify-content-between">
              <span><strong>{item.name}</strong></span>
              <span>{new Date(item.completedAt).toLocaleString()}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
