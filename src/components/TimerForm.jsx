import React, { useState } from 'react';

export default function TimerForm({ dispatch }) {
  const [name, setName] = useState('');
  const [duration, setDuration] = useState('');
  const [category, setCategory] = useState('');
  const [halfwayAlert, setHalfwayAlert] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !duration || !category) return;

    dispatch({
      type: 'ADD_TIMER',
      payload: {
        name,
        duration: parseInt(duration),
        category,
        halfwayAlert
      }
    });

    setName('');
    setDuration('');
    setCategory('');
    setHalfwayAlert(false);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded bg-light shadow-sm mb-4">
    <div className="mb-3">
        <label className="form-label">Timer Name</label>
        <input
        type="text"
        className="form-control"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Timer Name"
        required
        />
    </div>

    <div className="mb-3">
        <label className="form-label">Duration (seconds)</label>
        <input
        type="number"
        className="form-control"
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
        placeholder="Duration in seconds"
        required
        />
    </div>

    <div className="mb-3">
        <label className="form-label">Category</label>
        <input
        type="text"
        className="form-control"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        placeholder="e.g. Workout, Study"
        required
        />
    </div>

    <div className="form-check mb-3">
        <input
        type="checkbox"
        className="form-check-input"
        id="halfwayCheck"
        checked={halfwayAlert}
        onChange={() => setHalfwayAlert(!halfwayAlert)}
        />
        <label className="form-check-label" htmlFor="halfwayCheck">
        Halfway Alert
        </label>
    </div>

    <button type="submit" className="btn btn-success w-100">
        Add Timer
    </button>
    </form>
  );
}
