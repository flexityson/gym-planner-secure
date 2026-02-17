import React, { useState, useEffect } from 'react';

interface ProfilePanelProps {
  onProfileUpdate: (profile: any) => void;
  initialProfile?: any;
  useMetric?: boolean;
}

const ProfilePanel: React.FC<ProfilePanelProps> = ({ onProfileUpdate, initialProfile, useMetric: useMetricProp }) => {
  const [useMetric, setUseMetric] = useState<boolean>(useMetricProp ?? true);
  const [profile, setProfile] = useState({
    age: initialProfile?.age || 25,
    gender: initialProfile?.gender || 'male',
    weight: initialProfile?.weight || 70,
    height: initialProfile?.height || 175,
    heightFeet: initialProfile?.heightFeet || 5,
    heightInches: initialProfile?.heightInches || 9,
    activityLevel: initialProfile?.activityLevel || 'moderate',
    fitnessGoal: initialProfile?.fitnessGoal || 'muscle_gain',
    experienceLevel: initialProfile?.experienceLevel || 'intermediate',
  });
  const [experienceOpen, setExperienceOpen] = useState(false);
  const metric = useMetricProp ?? useMetric;

  // Calculate height in cm from feet/inches
  const calculateHeightCM = (feet: number, inches: number): number => {
    const totalInches = (feet * 12) + inches;
    return Math.round(totalInches * 2.54);
  };

  // Calculate height in feet/inches from cm
  const calculateHeightImperial = (cm: number) => {
    const totalInches = cm / 2.54;
    const feet = Math.floor(totalInches / 12);
    const inches = Math.round(totalInches % 12);
    return { feet, inches };
  };

  useEffect(() => {
    if (!metric && profile.height && profile.height > 0) {
      const { feet, inches } = calculateHeightImperial(profile.height);
      setProfile(prev => ({ ...prev, heightFeet: feet, heightInches: inches }));
    }
  }, [metric]);

  useEffect(() => {
    if (initialProfile) {
      setProfile(prev => ({ ...prev, ...initialProfile }));
    }
  }, [initialProfile?.age, initialProfile?.gender, initialProfile?.weight, initialProfile?.height, initialProfile?.activityLevel, initialProfile?.fitnessGoal, initialProfile?.experienceLevel]);

  const handleInputChange = (field: string, value: any) => {
    const updated = { ...profile, [field]: value };
    
    // Handle height conversions
    if (field === 'heightFeet' || field === 'heightInches') {
      if (!useMetric) {
        const heightCM = calculateHeightCM(
          field === 'heightFeet' ? value : profile.heightFeet,
          field === 'heightInches' ? value : profile.heightInches
        );
        updated.height = heightCM;
      }
    } else if (field === 'height' && useMetric) {
      updated.height = value;
    }
    
    setProfile(updated);
    onProfileUpdate(updated);
  };

  const activityLevels = [
    { id: 'sedentary', label: 'Sedentary', description: 'Little or no exercise' },
    { id: 'light', label: 'Light', description: 'Light exercise 1-3 days/week' },
    { id: 'moderate', label: 'Moderate', description: 'Moderate exercise 3-5 days/week' },
    { id: 'active', label: 'Active', description: 'Hard exercise 6-7 days/week' },
    { id: 'very_active', label: 'Very Active', description: 'Very hard exercise & physical job' }
  ];

  const fitnessGoals = [
    { id: 'weight_loss', label: 'Weight Loss', icon: 'fas fa-weight-scale', color: '#10b981' },
    { id: 'muscle_gain', label: 'Muscle Gain', icon: 'fas fa-dumbbell', color: '#3b82f6' },
    { id: 'maintenance', label: 'Maintenance', icon: 'fas fa-chart-line', color: '#8b5cf6' },
    { id: 'endurance', label: 'Endurance', icon: 'fas fa-person-running', color: '#ef4444' }
  ];

  const experienceLevels = [
    { id: 'beginner', label: 'Beginner', description: '0-6 months training' },
    { id: 'intermediate', label: 'Intermediate', description: '6 months - 2 years' },
    { id: 'advanced', label: 'Advanced', description: '2+ years training' }
  ];

  const calculateBMI = () => {
    if (!profile.weight || !profile.height) return null;
    const heightInMeters = profile.height / 100;
    return (profile.weight / (heightInMeters * heightInMeters)).toFixed(1);
  };

  const bmi = calculateBMI();
  const bmiCategory = bmi ? 
    parseFloat(bmi) < 18.5 ? 'Underweight' :
    parseFloat(bmi) < 25 ? 'Normal' :
    parseFloat(bmi) < 30 ? 'Overweight' : 'Obese' : null;

  return (
    <div className="profile-panel">
      <div className="card">
        <div className="section-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <i className="fas fa-user-circle" style={{ color: '#3b82f6', fontSize: '1.5rem' }}></i>
            <h2 style={{ margin: 0 }}>Your Profile</h2>
          </div>
        </div>

        {/* BMI + Activity + Goals + Optional Experience */}
        <div className="config-section">
          <div className="section-title">
            <i className="fas fa-heart-pulse"></i>
            <div>
              <h3 style={{ margin: 0 }}>BMI &amp; Health</h3>
              <p style={{ margin: '4px 0 0 0', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                Based on your weight and height
              </p>
            </div>
          </div>
          {bmi && (
            <div className="bmi-display">
              <div className="bmi-header">
                <i className="fas fa-heart-pulse" style={{ color: 'var(--accent)' }}></i>
                <span className="bmi-header-text">Your BMI: <strong>{bmi}</strong> ({bmiCategory})</span>
              </div>
              <div className="bmi-scale">
                {['Underweight', 'Normal', 'Overweight', 'Obese'].map((cat) => (
                  <div
                    key={cat}
                    className={`bmi-segment ${bmiCategory === cat ? 'active' : ''}`}
                    style={{
                      backgroundColor:
                        cat === 'Underweight' ? '#60a5fa' :
                        cat === 'Normal' ? '#10b981' :
                        cat === 'Overweight' ? '#f59e0b' : '#ef4444'
                    }}
                  >
                    <span className="bmi-segment-label">{cat}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Activity Level */}
        <div className="config-section">
          <div className="section-title">
            <i className="fas fa-person-running"></i>
            <div>
              <h3 style={{ margin: 0 }}>Activity Level</h3>
              <p style={{ margin: '4px 0 0 0', fontSize: '0.9rem', color: '#64748b' }}>
                How active are you in daily life?
              </p>
            </div>
          </div>
          
          <div className="activity-grid">
            {activityLevels.map(level => (
              <div
                key={level.id}
                className={`activity-card ${profile.activityLevel === level.id ? 'selected' : ''}`}
                onClick={() => handleInputChange('activityLevel', level.id)}
              >
                <div className="activity-icon">
                  <i className={`fas fa-${level.id === 'sedentary' ? 'couch' : 
                                  level.id === 'light' ? 'walking' : 
                                  level.id === 'moderate' ? 'bicycle' : 
                                  level.id === 'active' ? 'person-running' : 'fire'}`}></i>
                </div>
                <div className="activity-info">
                  <strong>{level.label}</strong>
                  <small>{level.description}</small>
                </div>
                {profile.activityLevel === level.id && (
                  <div className="activity-check">
                    <i className="fas fa-check"></i>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Fitness Goal */}
        <div className="config-section">
          <div className="section-title">
            <i className="fas fa-bullseye"></i>
            <div>
              <h3 style={{ margin: 0 }}>Fitness Goal</h3>
              <p style={{ margin: '4px 0 0 0', fontSize: '0.9rem', color: '#64748b' }}>
                What are you trying to achieve?
              </p>
            </div>
          </div>
          
          <div className="goal-grid">
            {fitnessGoals.map(goal => (
              <div
                key={goal.id}
                className={`goal-card ${profile.fitnessGoal === goal.id ? 'selected' : ''}`}
                onClick={() => handleInputChange('fitnessGoal', goal.id)}
                style={profile.fitnessGoal === goal.id ? { 
                  borderColor: goal.color,
                  boxShadow: `0 4px 12px ${goal.color}40`
                } : {}}
              >
                <div className="goal-icon" style={{ color: goal.color }}>
                  <i className={goal.icon}></i>
                </div>
                <div className="goal-info">
                  <strong>{goal.label}</strong>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Optional: Experience Level (collapsible) */}
        <div className="config-section config-section-collapsible">
          <button
            type="button"
            className="section-title section-title-toggle"
            onClick={() => setExperienceOpen((o) => !o)}
            aria-expanded={experienceOpen}
          >
            <i className="fas fa-graduation-cap"></i>
            <div>
              <h3 style={{ margin: 0 }}>Optional: Experience Level</h3>
              <p style={{ margin: '4px 0 0 0', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                How long have you been training? (default: Intermediate)
              </p>
            </div>
            <i className={`fas fa-chevron-down section-toggle-icon ${experienceOpen ? 'open' : ''}`}></i>
          </button>
          {experienceOpen && (
            <div className="experience-grid">
              {experienceLevels.map(level => (
                <div
                  key={level.id}
                  className={`experience-card ${profile.experienceLevel === level.id ? 'selected' : ''}`}
                  onClick={() => handleInputChange('experienceLevel', level.id)}
                >
                  <div className="experience-level">
                    {level.id === 'beginner' ? '🏁' :
                     level.id === 'intermediate' ? '⚡' : '🏆'}
                  </div>
                  <div className="experience-info">
                    <strong>{level.label}</strong>
                    <small>{level.description}</small>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Summary */}
        <div className="profile-summary">
          <h4>
            <i className="fas fa-chart-bar" style={{ marginRight: '10px', color: '#3b82f6' }}></i>
            Profile Summary
          </h4>
          <div className="summary-grid">
            <div className="summary-item">
              <span className="summary-label">TDEE Estimate</span>
              <span className="summary-value">~{Math.round(profile.weight * 30)} kcal</span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Protein Target</span>
              <span className="summary-value">~{Math.round(profile.weight * 1.8)}g</span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Workout Level</span>
              <span className="summary-value">{profile.experienceLevel.charAt(0).toUpperCase() + profile.experienceLevel.slice(1)}</span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Goal</span>
              <span className="summary-value">
                {profile.fitnessGoal === 'weight_loss' ? 'Weight Loss' :
                 profile.fitnessGoal === 'muscle_gain' ? 'Muscle Gain' :
                 profile.fitnessGoal === 'maintenance' ? 'Maintenance' : 'Endurance'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePanel;
