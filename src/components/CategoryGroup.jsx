import React, { useState } from 'react';
import TimerCard from './TimerCard';

export default function CategoryGroup({ category, timers, dispatch }) {
  const [expanded, setExpanded] = useState(true);

  const bulkAction = (type) => {
    timers.forEach((timer) => {
      dispatch({
        type: 'UPDATE_TIMER',
        payload: {
          category,
          id: timer.id,
          updates:
            type === 'RESET'
              ? { remaining: timer.duration, status: 'Idle', halfwayTriggered: false }
              : { status: type === 'START' ? 'Running' : 'Paused' }
        }
      });
    });
  };

  return (
    <div className="category-group">
      <h2 onClick={() => setExpanded(!expanded)}>{category}</h2>
      <div className="bulk-actions d-flex gap-3 mb-3">
        <button className='btn btn-success' onClick={() => bulkAction('START')}>Start All</button>
        <button className='btn btn-secondary' onClick={() => bulkAction('PAUSE')}>Pause All</button>
        <button className='btn btn-danger' onClick={() => bulkAction('RESET')}>Reset All</button>
      </div>
      {expanded &&
        timers.map((timer) => (
          <TimerCard key={timer.id} timer={timer} category={category} dispatch={dispatch} />
        ))}
    </div>
  );
}
