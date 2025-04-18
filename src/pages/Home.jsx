import React, { useEffect, useReducer, useState } from 'react'; 
import TimerForm from '../components/TimerForm';
import CategoryGroup from '../components/CategoryGroup';
import { saveToStorage, loadFromStorage } from '../utils/storage';
import { initialState, timerReducer } from '../context/TimerContext';

export default function Home() {
  const [state, dispatch] = useReducer(timerReducer, initialState, loadFromStorage);
  const [filterCategory, setFilterCategory] = useState('All');

  // Save timers to localStorage on change
  useEffect(() => {
    saveToStorage(state);
  }, [state]);

  const allCategories = ['All', ...Object.keys(state.timersByCategory)];

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center mt-4 mb-3">
        <h2 className="mb-0">Timers</h2>
        <div className="d-flex align-items-center gap-2">
          <label htmlFor="filterCategory" className="form-label me-2 mb-0">Filter:</label>
          <select
            id="filterCategory"
            className="form-select"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            style={{ width: '180px' }}
          >
            {allCategories.map((cat, idx) => (
              <option key={idx} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      <TimerForm dispatch={dispatch} />

      {Object.entries(state.timersByCategory)
        .filter(([category]) => filterCategory === 'All' || filterCategory === category)
        .map(([category, timers]) => (
          <CategoryGroup
            key={category}
            category={category}
            timers={timers}
            dispatch={dispatch}
          />
        ))}
    </div>
  );
}
