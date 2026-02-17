import React from 'react';

interface Exercise {
  name: string;
  sets: number;
  reps: string;
  tiktokLink?: string;
}

interface Nutrition {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  tdee: number;
}

interface ResultsPanelProps {
  protocol: string;
  exercises: Exercise[];
  nutrition: Nutrition | null;
}

const ResultsPanel: React.FC<ResultsPanelProps> = ({ protocol, exercises, nutrition }) => {
  return (
    <div>
      <div className="card" style={{ minHeight: '520px' }}>
        <div className="section-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <i className="fas fa-clipboard-check"></i>
            <h2>Personalized Protocol</h2>
          </div>
          <button className="btn" style={{ padding: '8px 16px', fontSize: '0.8rem', width: 'auto' }}>
            <i className="fas fa-sync-alt"></i> Refresh
          </button>
        </div>
        
        <div id="result">
          {protocol ? (
            <div className="fade-in">
              <div style={{ whiteSpace: 'pre-line', lineHeight: '1.8' }}>{protocol}</div>
              
              {nutrition && (
                <div className="nutrition-info fade-in">
                  <div className="nutrition-title">
                    <i className="fas fa-utensils"></i> Daily Nutrition Targets
                  </div>
                  <div>Based on your profile, here are your daily targets:</div>
                  <div className="macro-row">
                    <div className="macro-item">
                      <div className="macro-value">{nutrition.calories}</div>
                      <div className="macro-label">CALORIES</div>
                    </div>
                    <div className="macro-item">
                      <div className="macro-value">{nutrition.protein}g</div>
                      <div className="macro-label">PROTEIN</div>
                    </div>
                    <div className="macro-item">
                      <div className="macro-value">{nutrition.carbs}g</div>
                      <div className="macro-label">CARBS</div>
                    </div>
                    <div className="macro-item">
                      <div className="macro-value">{nutrition.fat}g</div>
                      <div className="macro-label">FAT</div>
                    </div>
                  </div>
                </div>
              )}
              
              {exercises.length > 0 && (
                <div className="exercise-video fade-in">
                  <div className="video-title">
                    <i className="fas fa-play-circle"></i> Exercise Videos
                  </div>
                  <div style={{ marginTop: '10px' }}>
                    {exercises.map((exercise, index) => (
                      <div key={index} style={{ marginBottom: '12px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                          <div>
                            <strong>{exercise.name}</strong>: {exercise.sets}x{exercise.reps}
                          </div>
                          {exercise.tiktokLink && (
                            <div style={{ marginLeft: '10px', flexShrink: 0 }}>
                              <a 
                                href={exercise.tiktokLink} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                style={{
                                  fontSize: '12px',
                                  color: '#007bff',
                                  textDecoration: 'none',
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '4px'
                                }}
                              >
                                <span style={{ 
                                  backgroundColor: '#000', 
                                  color: '#fff', 
                                  padding: '2px 6px', 
                                  borderRadius: '3px',
                                  fontSize: '10px',
                                  fontWeight: 'bold'
                                }}>
                                  TT
                                </span>
                                Watch Form
                              </a>
                            </div>
                          )}
                        </div>
                        {exercise.tiktokLink && (
                          <div style={{ 
                            fontSize: '11px', 
                            color: '#666', 
                            marginTop: '2px',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap'
                          }}>
                            TikTok: {exercise.tiktokLink.replace('https://www.', '').substring(0, 40)}...
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div style={{ textAlign: 'center', paddingTop: '100px', color: 'var(--text-muted)' }}>
              <i className="fas fa-dumbbell" style={{ fontSize: '3rem', opacity: '0.1', marginBottom: '20px' }}></i>
              <p>Configure parameters to see your full routine.</p>
              <p style={{ fontSize: '0.8rem', marginTop: '10px' }}>APIs will provide exercise videos & nutrition info</p>
            </div>
          )}
        </div>
        <div id="quoteBox" className="quote-box" style={{ display: 'none' }}></div>
      </div>

      <div className="stats-bar" id="statsContainer" style={{ display: protocol ? 'grid' : 'none' }}>
        <div className="stat-card">
          <span className="stat-num" id="totalExercises">{exercises.length}</span>
          <span className="stat-lab">Exercises</span>
        </div>
        <div className="stat-card">
          <span className="stat-num" id="workoutDuration">45m</span>
          <span className="stat-lab">Duration</span>
        </div>
        <div className="stat-card">
          <span className="stat-num" id="intensityLevel">Medium</span>
          <span className="stat-lab">Intensity</span>
        </div>
      </div>
    </div>
  );
};

export default ResultsPanel;
