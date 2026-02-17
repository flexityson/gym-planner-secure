import React, { useRef } from 'react';
import type { WorkoutExercise } from '../hooks/useWorkoutGenerator';

interface Nutrition {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  tdee: number;
}

interface WeeklyPlanViewProps {
  weeklyPlan: WorkoutExercise[][];
  nutrition: Nutrition | null;
  protocolSummary: string;
  onUpdateExerciseImage?: (dayIndex: number, exerciseIndex: number, imageUrl: string) => void;
}

const DAY_LABELS = ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'];

const WeeklyPlanView: React.FC<WeeklyPlanViewProps> = ({
  weeklyPlan,
  nutrition,
  protocolSummary,
  onUpdateExerciseImage,
}) => {
  const printRef = useRef<HTMLDivElement>(null);


  const isSingle = weeklyPlan.length === 1;

  const handlePrint = () => {
    if (!printRef.current) return;
    const printContent = printRef.current.innerHTML;
    const win = window.open('', '_blank');
    if (!win) return;
    win.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>${isSingle ? 'Workout Plan' : 'Weekly Workout Plan'} - GYM PLANNER CAMTECH</title>
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; padding: 24px; color: #1e293b; }
            .print-title { text-align: center; margin-bottom: 20px; border-bottom: 2px solid #6366f1; padding-bottom: 12px; }
            .print-title h1 { margin: 0; font-size: 1.35rem; color: #6366f1; }
            .day-section { break-inside: avoid; margin-bottom: 24px; }
            .day-title { font-size: 1.05rem; font-weight: 700; color: #6366f1; margin: 0 0 10px 0; padding-bottom: 6px; border-bottom: 1px solid #e2e8f0; }
            .exercise-row { display: flex; align-items: center; gap: 12px; margin-bottom: 8px; padding: 6px 0; border-bottom: 1px solid #f1f5f9; }
            .exercise-img, .exercise-img-placeholder { width: 52px; height: 52px; background: #f1f5f9; border-radius: 8px; object-fit: cover; flex-shrink: 0; }
            .exercise-img-placeholder { display: flex; align-items: center; justify-content: center; color: #94a3b8; font-size: 1.1rem; }
            .exercise-info { flex: 1; }
            .exercise-name { display: block; font-weight: 600; color: #1e293b; font-size: 0.95rem; }
            .exercise-sets { display: block; font-size: 0.85rem; color: #64748b; margin-top: 2px; }
            .watch-form-link { display: inline-flex; align-items: center; gap: 4px; font-size: 0.75rem; color: #64748b; margin-top: 4px; text-decoration: none; color: inherit; }
            .tiktok-icon { width: 16px; height: 16px; }
            .weekly-plan-summary { margin-bottom: 16px; font-size: 0.9rem; color: #64748b; }
            .nutrition-info { margin-bottom: 20px; padding: 12px; background: #f0fdf4; border-radius: 8px; border: 1px solid #bbf7d0; }
            .macro-row { display: flex; gap: 16px; flex-wrap: wrap; margin-top: 8px; }
            .macro-item { font-size: 0.9rem; }
            .exercise-img-add { font-size: 0.65rem; margin-top: 2px; }
            .no-print { display: none !important; }
            @media print { body { padding: 12px; } .exercise-img-add { display: none !important; } }
          </style>
        </head>
        <body>
          <div class="print-title"><h1>${isSingle ? 'Workout Plan' : 'Weekly Workout Plan'} · GYM PLANNER CAMTECH</h1></div>
          <div class="print-content">${printContent}</div>
          <script>window.onload = function() { window.print(); window.close(); }</script>
        </body>
      </html>
    `);
    win.document.close();
  };

  const hasPlan = weeklyPlan.length > 0 && weeklyPlan.some((day) => day.length > 0);

  return (
    <div className="weekly-plan-view">
      <div className="page-card weekly-plan-card" ref={printRef}>
        <div className="section-header section-header-actions">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <i className={isSingle ? 'fas fa-bolt' : 'fas fa-calendar-week'}></i>
            <h2>{isSingle ? 'Your Workout Plan' : 'Your Weekly Plan'}</h2>
          </div>
          {hasPlan && (
            <button
              type="button"
              className="btn btn-print no-print"
              onClick={handlePrint}
              aria-label="Print or save as PDF"
            >
              <i className="fas fa-print"></i> Print / Save PDF
            </button>
          )}
        </div>

        <div className="weekly-plan-content">
          {!hasPlan ? (
            <div className="weekly-plan-empty">
              <i className="fas fa-calendar-plus"></i>
              <p>Set your options above and click <strong>Generate</strong> to create your plan.</p>
            </div>
          ) : (
            <>
              {protocolSummary && (
                <p className="weekly-plan-summary">{protocolSummary}</p>
              )}
              {nutrition && (
                <div className="nutrition-info weekly-plan-nutrition">
                  <div className="nutrition-title">
                    <i className="fas fa-utensils"></i> Daily nutrition targets
                  </div>
                  <div className="macro-row">
                    <div className="macro-item">
                      <span className="macro-value">{nutrition.calories}</span>
                      <span className="macro-label">Cal</span>
                    </div>
                    <div className="macro-item">
                      <span className="macro-value">{nutrition.protein}g</span>
                      <span className="macro-label">Protein</span>
                    </div>
                    <div className="macro-item">
                      <span className="macro-value">{nutrition.carbs}g</span>
                      <span className="macro-label">Carbs</span>
                    </div>
                    <div className="macro-item">
                      <span className="macro-value">{nutrition.fat}g</span>
                      <span className="macro-label">Fat</span>
                    </div>
                  </div>
                </div>
              )}
              <div className="weekly-days">
                {weeklyPlan.map((exercises, dayIndex) => (
                  <div key={dayIndex} className="day-section">
                    {!isSingle && <h3 className="day-title">{DAY_LABELS[dayIndex]}</h3>}
                    <div className="day-exercises">
                      {exercises.map((ex, idx) => (
                        <div key={idx} className="exercise-row">
                          <div className="exercise-img-wrap">
                            {ex.imageUrl ? (
                              <img
                                src={ex.imageUrl}
                                alt={ex.name}
                                className="exercise-img"
                              />
                            ) : (
                              <div className="exercise-img-placeholder">
                                <i className="fas fa-dumbbell"></i>
                              </div>
                            )}
                          </div>
                          <div className="exercise-info">
                            <span className="exercise-name">{ex.name}</span>
                            <span className="exercise-sets">
                              {ex.sets} × {ex.reps}
                            </span>
                            {ex.tiktokLink && (
                              <a
                                href={ex.tiktokLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="watch-form-link"
                                aria-label="Watch form on TikTok"
                              >
                                <img src="/tiktok-icon.svg" alt="" className="tiktok-icon" />
                                <span>Watch form</span>
                              </a>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default WeeklyPlanView;
