import React, { useState } from 'react';
import useWorkoutGenerator from '../hooks/useWorkoutGenerator';

interface ConfigPanelProps {
  userProfile?: any;
  onGenerate: (protocol: string, exercises: any[], nutrition: any) => void;
}

const ConfigPanel: React.FC<ConfigPanelProps> = ({ userProfile, onGenerate }) => {
  const { generateWorkout } = useWorkoutGenerator();
  const [selectedGroups, setSelectedGroups] = useState<string[]>(['chest', 'legs']);
  const [duration, setDuration] = useState<number>(60);
  const [intensity, setIntensity] = useState<string>('medium');

  const muscleGroups = [
    { id: 'chest', label: 'Chest', icon: 'fas fa-user', color: '#3b82f6' },
    { id: 'legs', label: 'Legs', icon: 'fas fa-running', color: '#10b981' },
    { id: 'back', label: 'Back', icon: 'fas fa-mountain', color: '#8b5cf6' },
    { id: 'shoulders', label: 'Shoulders', icon: 'fas fa-chevron-up', color: '#f59e0b' },
    { id: 'arms', label: 'Arms', icon: 'fas fa-hand-rock', color: '#ef4444' }
  ];

  const intensityLevels = [
    { id: 'light', label: 'Light', description: 'Beginner friendly' },
    { id: 'medium', label: 'Medium', description: 'Balanced workout' },
    { id: 'high', label: 'High', description: 'Advanced intensity' }
  ];

  const durationOptions = [30, 45, 60, 75, 90];

  const handleGenerate = async () => {
    try {
      const exercises = generateWorkout(selectedGroups, duration, userProfile);
      const protocol = `🎯 ${duration}-minute ${intensity} intensity workout
      💪 Focus: ${selectedGroups.map(g => g.charAt(0).toUpperCase() + g.slice(1)).join(' & ')}
      📊 ${exercises.length} exercises with TikTok form guides
      ⏱️ ${Math.floor(duration / exercises.length)} minutes per exercise`;
      
      const nutrition = {
        calories: Math.round(duration * 12),
        protein: Math.round(duration * 0.6),
        carbs: Math.round(duration * 0.8),
        fat: Math.round(duration * 0.4),
        tdee: 2200
      };
      
      onGenerate(protocol, exercises, nutrition);
    } catch (error) {
      console.error('Error generating workout:', error);
    }
  };

  const toggleMuscleGroup = (groupId: string) => {
    setSelectedGroups(prev =>
      prev.includes(groupId)
        ? prev.filter(id => id !== groupId)
        : [...prev, groupId]
    );
  };

  return (
    <div className="config-panel">
      <div className="card">
        <div className="section-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <i className="fas fa-sliders-h" style={{ color: '#3b82f6' }}></i>
            <h2 style={{ margin: 0 }}>Workout Configuration</h2>
          </div>
          <button 
            className="btn" 
            onClick={handleGenerate}
            style={{ 
              padding: '12px 28px', 
              fontSize: '1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <i className="fas fa-bolt"></i>
            Generate Workout Plan
          </button>
        </div>

        {/* Muscle Groups Section */}
        <div className="config-section">
          <div className="section-title">
            <i className="fas fa-dumbbell"></i>
            <div>
              <h3 style={{ margin: 0 }}>Target Muscle Groups</h3>
              <p style={{ margin: '4px 0 0 0', fontSize: '0.9rem', color: '#64748b' }}>
                Select 2-3 groups for balanced workout
              </p>
            </div>
          </div>
          
          <div className="muscle-group-grid">
            {muscleGroups.map(group => (
              <div
                key={group.id}
                className={`muscle-group-card ${selectedGroups.includes(group.id) ? 'selected' : ''}`}
                onClick={() => toggleMuscleGroup(group.id)}
                style={selectedGroups.includes(group.id) ? { 
                  background: `linear-gradient(135deg, ${group.color} 0%, ${group.color}80 100%)` 
                } : {}}
              >
                <i className={group.icon} style={{ 
                  color: selectedGroups.includes(group.id) ? 'white' : group.color,
                  fontSize: '2rem'
                }}></i>
                <span>{group.label}</span>
                {selectedGroups.includes(group.id) && (
                  <div style={{ 
                    marginTop: '8px', 
                    fontSize: '0.75rem',
                    opacity: 0.9
                  }}>
                    ✓ Selected
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <div style={{ 
            marginTop: '15px', 
            fontSize: '0.85rem', 
            color: '#64748b',
            textAlign: 'center'
          }}>
            Selected: {selectedGroups.length} of {muscleGroups.length} muscle groups
          </div>
        </div>

        {/* Duration Section */}
        <div className="config-section">
          <div className="section-title">
            <i className="fas fa-clock"></i>
            <div>
              <h3 style={{ margin: 0 }}>Workout Duration</h3>
              <p style={{ margin: '4px 0 0 0', fontSize: '0.9rem', color: '#64748b' }}>
                Adjust based on your available time
              </p>
            </div>
          </div>
          
          <div className="slider-container">
            <input
              type="range"
              min="30"
              max="90"
              step="15"
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              className="slider"
            />
            <div className="slider-labels">
              {durationOptions.map(time => (
                <span 
                  key={time}
                  style={{ 
                    fontWeight: duration === time ? 'bold' : 'normal',
                    color: duration === time ? '#3b82f6' : '#64748b'
                  }}
                >
                  {time}m
                </span>
              ))}
            </div>
            <div className="selected-value">
              <i className="fas fa-hourglass-half" style={{ marginRight: '8px' }}></i>
              Selected: <strong>{duration} minutes</strong>
            </div>
          </div>
        </div>

        {/* Intensity Section */}
        <div className="config-section">
          <div className="section-title">
            <i className="fas fa-fire"></i>
            <div>
              <h3 style={{ margin: 0 }}>Workout Intensity</h3>
              <p style={{ margin: '4px 0 0 0', fontSize: '0.9rem', color: '#64748b' }}>
                Choose your challenge level
              </p>
            </div>
          </div>
          
          <div className="intensity-buttons">
            {intensityLevels.map(level => (
              <button
                key={level.id}
                className={`intensity-btn ${intensity === level.id ? 'active' : ''}`}
                onClick={() => setIntensity(level.id)}
                style={{ 
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  padding: '16px 12px'
                }}
              >
                <span style={{ 
                  fontSize: '1rem',
                  fontWeight: '600',
                  marginBottom: '4px'
                }}>
                  {level.label}
                </span>
                <span style={{ 
                  fontSize: '0.8rem',
                  opacity: intensity === level.id ? 0.9 : 0.6
                }}>
                  {level.description}
                </span>
              </button>
            ))}
          </div>
          
          <div style={{ 
            marginTop: '15px', 
            padding: '12px',
            background: intensity === 'light' ? '#f0fdf4' : 
                       intensity === 'medium' ? '#fffbeb' : '#fef2f2',
            border: `1px solid ${
              intensity === 'light' ? '#bbf7d0' : 
              intensity === 'medium' ? '#fde68a' : '#fecaca'
            }`,
            borderRadius: '8px',
            textAlign: 'center',
            fontSize: '0.9rem',
            color: intensity === 'light' ? '#065f46' : 
                   intensity === 'medium' ? '#92400e' : '#991b1b'
          }}>
            <i className={`fas ${
              intensity === 'light' ? 'fa-seedling' : 
              intensity === 'medium' ? 'fa-balance-scale' : 'fa-fire'
            }`} style={{ marginRight: '8px' }}></i>
            {intensity === 'light' ? 'Perfect for beginners or recovery days' :
             intensity === 'medium' ? 'Balanced workout for consistent progress' :
             'High intensity for maximum results'}
          </div>
        </div>

      </div>
    </div>
  );
};

export default ConfigPanel;
