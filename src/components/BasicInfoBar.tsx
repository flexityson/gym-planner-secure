import React, { useState } from 'react';

interface BasicInfoBarProps {
  profile: {
    age: number;
    gender: string;
    weight: number;
    height: number;
  };
  onUpdate: (field: string, value: number | string) => void;
  useMetric: boolean;
  onUnitChange: (metric: boolean) => void;
}

const BasicInfoBar: React.FC<BasicInfoBarProps> = ({
  profile,
  onUpdate,
  useMetric,
  onUnitChange,
}) => {
  const weightDisplay = useMetric ? profile.weight : (profile.weight * 2.20462).toFixed(1);
  const weightUnit = useMetric ? 'kg' : 'lbs';
  const heightLabel = useMetric ? 'cm' : 'in';
  const heightValue = useMetric ? profile.height : Math.round(profile.height / 2.54);
  const heightMin = useMetric ? 100 : 40;
  const heightMax = useMetric ? 250 : 100;

  return (
    <div className="basic-info-bar">
      <div className="basic-info-bar-inner">
        <div className="basic-info-item">
          <label>Age</label>
          <input
            type="number"
            min={14}
            max={80}
            value={profile.age}
            onChange={(e) => onUpdate('age', parseInt(e.target.value, 10) || 25)}
            className="basic-info-input"
          />
        </div>
        <div className="basic-info-item">
          <label>Gender</label>
          <div className="basic-info-gender">
            {['male', 'female', 'other'].map((g) => (
              <button
                key={g}
                type="button"
                className={`basic-info-gender-btn ${profile.gender === g ? 'active' : ''}`}
                onClick={() => onUpdate('gender', g)}
              >
                {g === 'male' ? 'Male' : g === 'female' ? 'Female' : 'Other'}
              </button>
            ))}
          </div>
        </div>
        <div className="basic-info-item">
          <label>Weight ({weightUnit})</label>
          <input
            type="number"
            min={useMetric ? 20 : 44}
            max={200}
            step={0.1}
            value={weightDisplay}
            onChange={(e) => {
              const v = parseFloat(e.target.value);
              onUpdate('weight', useMetric ? v : v / 2.20462);
            }}
            className="basic-info-input"
          />
        </div>
        <div className="basic-info-item">
          <label>Height ({heightLabel})</label>
          <input
            type="number"
            min={heightMin}
            max={heightMax}
            value={heightValue}
            onChange={(e) => {
              const v = parseInt(e.target.value, 10);
              onUpdate('height', useMetric ? v : v * 2.54);
            }}
            className="basic-info-input"
          />
        </div>
        <div className="basic-info-item basic-info-units">
          <label>Units</label>
          <div className="basic-info-unit-toggle">
            <button
              type="button"
              className={`unit-btn ${useMetric ? 'active' : ''}`}
              onClick={() => onUnitChange(true)}
            >
              Metric
            </button>
            <button
              type="button"
              className={`unit-btn ${!useMetric ? 'active' : ''}`}
              onClick={() => onUnitChange(false)}
            >
              Imperial
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasicInfoBar;
