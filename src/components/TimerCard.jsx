import React, { useEffect, useRef, useState } from 'react';
import ProgressBar from './ProgressBar';

export default function TimerCard({ timer, category, dispatch }) {
  const intervalRef = useRef(null);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  useEffect(() => {
    if (timer.status === 'Running' && intervalRef.current === null) {
      intervalRef.current = setInterval(() => {
        dispatch({
          type: 'TICK_TIMER',
          payload: {
            category,
            id: timer.id,
          }
        });
      }, 1000);
    }

    if (timer.status !== 'Running') {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    return () => {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    };
  }, [timer.status]);



  const handleStart = () => {
    if (timer.status !== 'Running') {
      dispatch({
        type: 'UPDATE_TIMER',
        payload: {
          category,
          id: timer.id,
          updates: { status: 'Running' }
        }
      });
    }
  };

  const handlePause = () => {
    dispatch({
      type: 'UPDATE_TIMER',
      payload: {
        category,
        id: timer.id,
        updates: { status: 'Paused' }
      }
    });
  };

  const handleReset = () => {
    dispatch({ type: 'RESET_TIMER', payload: { category, id: timer.id } });
  };
  useEffect(() => {
    if (timer.remaining <= 0 && timer.status === 'Running') {
      clearInterval(intervalRef.current);
      intervalRef.current = null;

      dispatch({
        type: 'UPDATE_TIMER',
        payload: {
          category,
          id: timer.id,
          updates: { status: 'Completed' }
        }
      });

      dispatch({ type: 'COMPLETE_TIMER', payload: { timer } });

      setModalMessage(`🎉 ${timer.name} completed!`);
      setShowModal(true);
    }

    if (
      timer.halfwayAlert &&
      !timer.halfwayTriggered &&
      timer.remaining <= timer.duration / 2
    ) {
        console.log('timer===',timer)
      dispatch({
        type: 'UPDATE_TIMER',
        payload: {
          category,
          id: timer.id,
          updates: { halfwayTriggered: true }
        }
      });

      setModalMessage(`⏳ ${timer.name} is halfway there!`);
      setShowModal(true);
      handlePause()
    }
  }, [timer.remaining]);

  return (
    <>
      <div className="card p-3 mb-3 shadow-sm">
        <h5 className="card-title">{timer.name}</h5>
        <p className="mb-1">Status: {timer.status}</p>
        <p className="mb-1">Time Left: {timer.remaining}s</p>
        <ProgressBar value={(1 - timer.remaining / timer.duration) * 100} />
        <div className="timer-controls d-flex gap-2 mt-3">
          <button className="btn btn-success" onClick={handleStart}>Start</button>
          <button className="btn btn-secondary" onClick={handlePause}>Pause</button>
          <button className="btn btn-danger" onClick={handleReset}>Reset</button>
        </div>
      </div>

      {showModal && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Timer Alert</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <p>{modalMessage}</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-primary"
                 onClick={() => {
                    setShowModal(false) 
                    if( timer.halfwayAlert && timer.duration / 2 === timer.remaining){
                        handleStart()
                    }}}>
                OK</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
