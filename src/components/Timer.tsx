import React, { useState } from 'react';
import { useTimer } from '../hooks/useTimer';

const Timer: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const timer = useTimer();

  const timerPresets = [
    { seconds: 60, label: '1:00 min' },
    { seconds: 90, label: '1:30 min' },
    { seconds: 120, label: '2:00 min' },
    { seconds: 150, label: '2:30 min' },
    { seconds: 180, label: '3:00 min' },
    { seconds: 45, label: '0:45 sec' }
  ];

  return (
    <div className="timer-container">
      <button className="timer-btn" onClick={() => setIsOpen(!isOpen)}>
        <i className="fas fa-clock"></i>
      </button>
      
      <div className="timer-window" style={{ display: isOpen ? 'flex' : 'none' }}>
        <div className="timer-header">
          <h3><i className="fas fa-stopwatch"></i> Workout Timer</h3>
          <button className="timer-close" onClick={() => setIsOpen(false)}>&times;</button>
        </div>
        
        <div className="timer-content">
          <div className="timer-display">{timer.displayTime}</div>
          
          <div className="timer-controls">
            <button 
              className="timer-start" 
              onClick={timer.start}
              disabled={timer.isRunning || timer.seconds === 0}
            >
              <i className="fas fa-play"></i> Start
            </button>
            <button 
              className="timer-pause" 
              onClick={timer.pause}
              disabled={!timer.isRunning}
            >
              <i className="fas fa-pause"></i> Pause
            </button>
            <button className="timer-reset" onClick={timer.reset}>
              <i className="fas fa-redo"></i> Reset
            </button>
          </div>
          
          <div className="timer-presets">
            {timerPresets.map((preset) => (
              <div
                key={preset.seconds}
                className={`timer-preset ${timer.seconds === preset.seconds ? 'active' : ''}`}
                onClick={() => timer.setTime(preset.seconds)}
              >
                {preset.label}
              </div>
            ))}
          </div>
          
          <div style={{ marginTop: '15px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            <i className="fas fa-info-circle"></i> Max rest time between sets: 3 minutes
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timer;
