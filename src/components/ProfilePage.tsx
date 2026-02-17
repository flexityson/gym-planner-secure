import React, { useState, useEffect } from 'react';
import OptionPicker, { OptionItem } from './OptionPicker';

const GENDER_OPTIONS: OptionItem[] = [
  { id: 'male', label: 'Male' },
  { id: 'female', label: 'Female' },
  { id: 'other', label: 'Other' },
];

const UNITS_OPTIONS: OptionItem[] = [
  { id: 'metric', label: 'Metric (kg, cm)' },
  { id: 'imperial', label: 'Imperial (lb, in)' },
];

const ACTIVITY_OPTIONS: OptionItem[] = [
  { id: 'sedentary', label: 'Sedentary' },
  { id: 'light', label: 'Light' },
  { id: 'moderate', label: 'Moderate' },
  { id: 'active', label: 'Active' },
  { id: 'very_active', label: 'Very Active' },
];

const GOAL_OPTIONS: OptionItem[] = [
  { id: 'weight_loss', label: 'Weight Loss', icon: 'fas fa-weight-scale' },
  { id: 'muscle_gain', label: 'Muscle Gain', icon: 'fas fa-dumbbell' },
  { id: 'maintenance', label: 'Maintenance', icon: 'fas fa-chart-line' },
  { id: 'endurance', label: 'Endurance', icon: 'fas fa-person-running' },
];

interface ProfilePageProps {
  profile: any;
  onProfileUpdate: (profile: any) => void;
  useMetric: boolean;
  onUnitChange: (metric: boolean) => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({
  profile,
  onProfileUpdate,
  useMetric,
  onUnitChange,
}) => {
  const [local, setLocal] = useState(profile);

  useEffect(() => {
    // Only sync if the profile actually changed from outside (e.g. loaded from storage)
    // Avoid syncing while the user is actively typing in this component.
    setLocal((prev: any) => ({ ...prev, ...profile }));
  }, [profile]);

  const update = (field: string, value: any) => {
    const next = { ...local, [field]: value };
    setLocal(next);
    onProfileUpdate(next);
  };

  const bmi = local.weight && local.height
    ? (local.weight / ((local.height / 100) ** 2)).toFixed(1)
    : null;
  const bmiCategory = bmi
    ? parseFloat(bmi) < 18.5
      ? 'Underweight'
      : parseFloat(bmi) < 25
        ? 'Normal'
        : parseFloat(bmi) < 30
          ? 'Overweight'
          : 'Obese'
    : null;

  return (
    <div className="profile-page">
      <div className="page-card">
        <div className="section-header">
          <i className="fas fa-user"></i>
          <h2>Profile</h2>
        </div>
        <div className="option-picker-row">
          <OptionPicker
            label="Gender"
            value={local.gender}
            options={GENDER_OPTIONS}
            onChange={(v) => update('gender', v)}
            placeholder="Select gender"
          />
          <OptionPicker
            label="Units"
            value={useMetric ? 'metric' : 'imperial'}
            options={UNITS_OPTIONS}
            onChange={(v) => onUnitChange(v === 'metric')}
            placeholder="Units"
          />
          <OptionPicker
            label="Activity level"
            value={local.activityLevel}
            options={ACTIVITY_OPTIONS}
            onChange={(v) => update('activityLevel', v)}
            placeholder="Select activity"
          />
          <OptionPicker
            label="Fitness goal"
            value={local.fitnessGoal}
            options={GOAL_OPTIONS}
            onChange={(v) => update('fitnessGoal', v)}
            placeholder="Select goal"
          />
        </div>
        <div className="profile-numbers">
          <div className="profile-number-item">
            <label>Age</label>
            <input
              type="number"
              min={14}
              max={80}
              value={local.age || ''}
              onChange={(e) => {
                const val = e.target.value;
                const parsed = parseInt(val, 10);
                update('age', isNaN(parsed) ? 0 : parsed);
              }}
              className="profile-input"
            />
          </div>
          <div className="profile-number-item">
            <label>Weight ({useMetric ? 'kg' : 'lb'})</label>
            <input
              type="number"
              min={useMetric ? 20 : 44}
              max={200}
              step={0.1}
              value={useMetric ? local.weight : (local.weight * 2.20462).toFixed(1)}
              onChange={(e) =>
                update('weight', useMetric ? parseFloat(e.target.value) : parseFloat(e.target.value) / 2.20462)
              }
              className="profile-input"
            />
          </div>
          <div className="profile-number-item">
            <label>Height ({useMetric ? 'cm' : 'in'})</label>
            <input
              type="number"
              min={useMetric ? 100 : 40}
              max={useMetric ? 250 : 100}
              value={
                useMetric
                  ? local.height
                  : Math.round(local.height / 2.54)
              }
              onChange={(e) =>
                update('height', useMetric ? parseInt(e.target.value, 10) : parseInt(e.target.value, 10) * 2.54)
              }
              className="profile-input"
            />
          </div>
        </div>
        {bmi && (
          <div className="bmi-display">
            <div className="bmi-header">
              <i className="fas fa-heart-pulse"></i>
              <span className="bmi-header-text">
                Your BMI: <strong>{bmi}</strong> ({bmiCategory})
              </span>
            </div>
            <div className="bmi-scale">
              {['Underweight', 'Normal', 'Overweight', 'Obese'].map((cat) => (
                <div
                  key={cat}
                  className={`bmi-segment ${bmiCategory === cat ? 'active' : ''}`}
                  style={{
                    backgroundColor:
                      cat === 'Underweight'
                        ? '#60a5fa'
                        : cat === 'Normal'
                          ? '#10b981'
                          : cat === 'Overweight'
                            ? '#f59e0b'
                            : '#ef4444',
                  }}
                >
                  <span className="bmi-segment-label">{cat}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
