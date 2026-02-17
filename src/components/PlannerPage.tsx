import React, { useState, useEffect } from 'react';
import useWorkoutGenerator, { WorkoutExercise } from '../hooks/useWorkoutGenerator';
import WeeklyPlanView from './WeeklyPlanView';

interface Nutrition {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  tdee: number;
}

const MUSCLE_GROUPS = [
  { id: 'chest', label: 'Chest', icon: 'fas fa-user' },
  { id: 'legs', label: 'Legs', icon: 'fas fa-running' },
  { id: 'back', label: 'Back', icon: 'fas fa-mountain' },
  { id: 'shoulders', label: 'Shoulders', icon: 'fas fa-chevron-up' },
  { id: 'arms', label: 'Arms', icon: 'fas fa-hand-rock' },
];

const DURATIONS = [30, 45, 60, 75, 90];
const INTENSITIES = [
  { id: 'light', label: 'Light' },
  { id: 'medium', label: 'Medium' },
  { id: 'high', label: 'High' },
];

const STORAGE_KEY = 'gym-planner-session';

interface PlannerPageProps {
  userProfile: any;
  weeklyPlan: WorkoutExercise[][];
  nutrition: Nutrition | null;
  protocolSummary: string;
  onSavePlan: (days: WorkoutExercise[][], nutrition: Nutrition, summary: string) => void;
  onUpdateExerciseImage?: (dayIndex: number, exerciseIndex: number, imageUrl: string) => void;
}

const PlannerPage: React.FC<PlannerPageProps> = ({
  userProfile,
  weeklyPlan,
  nutrition,
  protocolSummary,
  onSavePlan,
  onUpdateExerciseImage,
}) => {
  const { generateWeeklyPlan, generateWorkout } = useWorkoutGenerator();
  const [genMode, setGenMode] = useState<'weekly' | 'single'>(() => {
    try {
      const s = localStorage.getItem(STORAGE_KEY);
      if (s) {
        const data = JSON.parse(s);
        return data.genMode || 'weekly';
      }
    } catch (_) { }
    return 'weekly';
  });

  const [selectedGroups, setSelectedGroups] = useState<string[]>(() => {
    try {
      const s = localStorage.getItem(STORAGE_KEY);
      if (s) {
        const data = JSON.parse(s);
        return Array.isArray(data.selectedGroups) ? data.selectedGroups : ['chest', 'legs'];
      }
    } catch (_) { }
    return ['chest', 'legs'];
  });
  const [duration, setDuration] = useState<number>(() => {
    try {
      const s = localStorage.getItem(STORAGE_KEY);
      if (s) {
        const data = JSON.parse(s);
        return typeof data.duration === 'number' ? data.duration : 60;
      }
    } catch (_) { }
    return 60;
  });
  const [intensity, setIntensity] = useState<string>(() => {
    try {
      const s = localStorage.getItem(STORAGE_KEY);
      if (s) {
        const data = JSON.parse(s);
        return data.intensity || 'medium';
      }
    } catch (_) { }
    return 'medium';
  });

  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          genMode,
          selectedGroups,
          duration,
          intensity,
          savedAt: new Date().toISOString(),
        })
      );
    } catch (_) { }
  }, [genMode, selectedGroups, duration, intensity]);

  const toggleGroup = (id: string) => {
    setSelectedGroups((prev) =>
      prev.includes(id) ? prev.filter((g) => g !== id) : prev.length < 5 ? [...prev, id] : prev
    );
  };

  const handleGenerate = () => {
    const isSingle = genMode === 'single';
    const days = isSingle
      ? [generateWorkout(selectedGroups, duration, userProfile)]
      : generateWeeklyPlan(selectedGroups, duration, userProfile);

    const nut = {
      calories: Math.round(duration * 12),
      protein: Math.round(duration * 0.6),
      carbs: Math.round(duration * 0.8),
      fat: Math.round(duration * 0.4),
      tdee: 2200,
    };
    const summary = `${isSingle ? 'Single workout' : 'Weekly plan'} · ${duration} min · ${intensity} intensity · Focus: ${selectedGroups
      .map((g) => g.charAt(0).toUpperCase() + g.slice(1))
      .join(', ')}`;
    onSavePlan(days, nut, summary);
  };

  return (
    <div className="planner-page">
      <div className="page-card planner-config">
        <div className="section-header">
          <i className="fas fa-dumbbell"></i>
          <h2>Workout Planner</h2>
          <button type="button" className="btn btn-generate" onClick={handleGenerate}>
            <i className="fas fa-bolt"></i> {genMode === 'single' ? 'Generate 1-Time Workout' : 'Generate Weekly Plan'}
          </button>
        </div>

        <div className="planner-option-block">
          <label className="planner-option-label">Program Mode</label>
          <div className="planner-option-chips">
            <button
              type="button"
              className={`planner-chip ${genMode === 'weekly' ? 'selected' : ''}`}
              onClick={() => setGenMode('weekly')}
            >
              <i className="fas fa-calendar-week"></i>
              <span>Weekly Program (7 Days)</span>
            </button>
            <button
              type="button"
              className={`planner-chip ${genMode === 'single' ? 'selected' : ''}`}
              onClick={() => setGenMode('single')}
            >
              <i className="fas fa-bolt"></i>
              <span>1-Time Workout</span>
            </button>
          </div>
        </div>

        <div className="planner-option-block">
          <label className="planner-option-label">Target muscle groups (choose 2–5)</label>
          <div className="planner-option-chips">
            {MUSCLE_GROUPS.map((g) => (
              <button
                key={g.id}
                type="button"
                className={`planner-chip ${selectedGroups.includes(g.id) ? 'selected' : ''}`}
                onClick={() => toggleGroup(g.id)}
              >
                <i className={g.icon}></i>
                <span>{g.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="planner-option-block">
          <label className="planner-option-label">Duration per day</label>
          <div className="planner-option-chips">
            {DURATIONS.map((d) => (
              <button
                key={d}
                type="button"
                className={`planner-chip planner-chip-duration ${duration === d ? 'selected' : ''}`}
                onClick={() => setDuration(d)}
              >
                {d} min
              </button>
            ))}
          </div>
        </div>

        <div className="planner-option-block">
          <label className="planner-option-label">Intensity</label>
          <div className="planner-option-chips">
            {INTENSITIES.map((i) => (
              <button
                key={i.id}
                type="button"
                className={`planner-chip ${intensity === i.id ? 'selected' : ''}`}
                onClick={() => setIntensity(i.id)}
              >
                {i.label}
              </button>
            ))}
          </div>
        </div>

        <div className="planner-option-block planner-days-note">
          <span className="planner-days-badge">{genMode === 'single' ? '1 Workout' : 'Day 1 → Day 7'}</span>
          <span>{genMode === 'single' ? 'Single focused session.' : 'Complete weekly split program.'} Generate, then print or save as PDF.</span>
        </div>
      </div>

      <WeeklyPlanView
        weeklyPlan={weeklyPlan}
        nutrition={nutrition}
        protocolSummary={protocolSummary}
        onUpdateExerciseImage={onUpdateExerciseImage}
      />
    </div>
  );
};

export default PlannerPage;
