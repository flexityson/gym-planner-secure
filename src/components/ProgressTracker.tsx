import React, { useState } from 'react';

interface ProgressEntry {
  id: string;
  date: string;
  weight?: number;
  photo?: string;
  notes: string;
  mood: 'great' | 'good' | 'ok' | 'poor';
}

const ProgressTracker: React.FC = () => {
  const [entries, setEntries] = useState<ProgressEntry[]>([
    {
      id: '1',
      date: '2024-01-15',
      weight: 75,
      notes: 'Feeling strong! Increased bench press by 5kg.',
      mood: 'great'
    },
    {
      id: '2',
      date: '2024-01-08',
      weight: 76,
      notes: 'Consistent workouts this week.',
      mood: 'good'
    }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [newEntry, setNewEntry] = useState({
    weight: '',
    notes: '',
    mood: 'good' as 'great' | 'good' | 'ok' | 'poor'
  });

  const addEntry = () => {
    if (!newEntry.notes.trim()) return;

    const entry: ProgressEntry = {
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      weight: newEntry.weight ? parseFloat(newEntry.weight) : undefined,
      notes: newEntry.notes,
      mood: newEntry.mood
    };

    setEntries([entry, ...entries]);
    setNewEntry({ weight: '', notes: '', mood: 'good' });
    setShowForm(false);
  };

  const getMoodIcon = (mood: string) => {
    switch (mood) {
      case 'great': return '😊';
      case 'good': return '🙂';
      case 'ok': return '😐';
      case 'poor': return '😔';
      default: return '🙂';
    }
  };

  return (
    <div className="card progress-tracker">
      <div className="section-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <i className="fas fa-camera-retro" style={{ color: 'var(--secondary)' }}></i>
          <h2>Progress Tracker</h2>
        </div>
        <button 
          className="btn btn-small" 
          onClick={() => setShowForm(!showForm)}
        >
          <i className="fas fa-plus"></i> Add Entry
        </button>
      </div>

      {showForm && (
        <div className="progress-form">
          <div className="form-row">
            <div className="form-group">
              <label>Weight (kg)</label>
              <input
                type="number"
                value={newEntry.weight}
                onChange={(e) => setNewEntry({...newEntry, weight: e.target.value})}
                placeholder="Optional"
              />
            </div>
            <div className="form-group">
              <label>Mood</label>
              <select
                value={newEntry.mood}
                onChange={(e) => setNewEntry({...newEntry, mood: e.target.value as any})}
              >
                <option value="great">Great 😊</option>
                <option value="good">Good 🙂</option>
                <option value="ok">OK 😐</option>
                <option value="poor">Poor 😔</option>
              </select>
            </div>
          </div>
          <div className="form-group">
            <label>Notes</label>
            <textarea
              value={newEntry.notes}
              onChange={(e) => setNewEntry({...newEntry, notes: e.target.value})}
              placeholder="How was your workout? Any achievements?"
              rows={3}
            />
          </div>
          <div className="form-actions">
            <button className="btn btn-secondary" onClick={() => setShowForm(false)}>
              Cancel
            </button>
            <button className="btn btn-primary" onClick={addEntry}>
              Save Entry
            </button>
          </div>
        </div>
      )}

      <div className="progress-timeline">
        {entries.map((entry) => (
          <div key={entry.id} className="timeline-entry">
            <div className="timeline-date">
              <div className="date-day">{new Date(entry.date).getDate()}</div>
              <div className="date-month">
                {new Date(entry.date).toLocaleDateString('en-US', { month: 'short' })}
              </div>
            </div>
            <div className="timeline-content">
              <div className="timeline-header">
                <div className="timeline-mood">
                  <span className="mood-icon">{getMoodIcon(entry.mood)}</span>
                  <span className="mood-text">{entry.mood}</span>
                </div>
                {entry.weight && (
                  <div className="timeline-weight">
                    <i className="fas fa-weight-scale"></i> {entry.weight}kg
                  </div>
                )}
              </div>
              <p className="timeline-notes">{entry.notes}</p>
              <div className="timeline-actions">
                <button className="action-btn">
                  <i className="fas fa-edit"></i> Edit
                </button>
                <button className="action-btn">
                  <i className="fas fa-image"></i> Add Photo
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="progress-stats">
        <div className="progress-stat">
          <div className="stat-value">{entries.length}</div>
          <div className="stat-label">Total Entries</div>
        </div>
        <div className="progress-stat">
          <div className="stat-value">
            {entries.length > 1 
              ? `${((entries[0].weight || 0) - (entries[entries.length - 1].weight || 0)).toFixed(1)}kg`
              : '0kg'
            }
          </div>
          <div className="stat-label">Progress</div>
        </div>
        <div className="progress-stat">
          <div className="stat-value">
            {entries.filter(e => e.mood === 'great' || e.mood === 'good').length}
          </div>
          <div className="stat-label">Positive Days</div>
        </div>
      </div>
    </div>
  );
};

export default ProgressTracker;
