import React, { useState } from 'react';

const Feedback: React.FC = () => {
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    // In a real app, send to backend
    setSent(true);
    setMessage('');
  };

  return (
    <div className="page-card">
      <div className="section-header">
        <i className="fas fa-comment-dots"></i>
        <h2>Feedback</h2>
      </div>
      {sent ? (
        <div className="feedback-success">
          <i className="fas fa-check-circle"></i>
          <p>Thanks! Your feedback has been recorded.</p>
        </div>
      ) : (
        <form className="feedback-form" onSubmit={handleSubmit}>
          <label>
            <span>Your feedback</span>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tell us what you think, report a bug, or suggest a feature..."
              rows={5}
              required
            />
          </label>
          <button type="submit" className="btn btn-generate">
            <i className="fas fa-paper-plane"></i> Send Feedback
          </button>
        </form>
      )}
    </div>
  );
};

export default Feedback;
