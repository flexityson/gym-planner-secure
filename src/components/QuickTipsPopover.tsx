import React, { useState } from 'react';

const TIPS = [
  'Select 2-3 muscle groups for optimal focus',
  '60 minutes is ideal for a complete workout',
  'Medium intensity works best for most people',
  'Each exercise includes TikTok form guidance',
];

const QuickTipsPopover: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="quick-tips-wrap">
      <button
        type="button"
        className="quick-tips-btn"
        onClick={() => setOpen((o) => !o)}
        title="Quick tips"
        aria-label="Toggle quick tips"
      >
        <i className="fas fa-lightbulb"></i>
      </button>
      {open && (
        <>
          <div className="quick-tips-backdrop" onClick={() => setOpen(false)} aria-hidden="true" />
          <div className="quick-tips-popover">
            <div className="quick-tips-popover-header">
              <span>Quick Tips</span>
              <button type="button" className="quick-tips-close" onClick={() => setOpen(false)} aria-label="Close">
                <i className="fas fa-times"></i>
              </button>
            </div>
            <ul className="quick-tips-list">
              {TIPS.map((tip, i) => (
                <li key={i}>{tip}</li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default QuickTipsPopover;
