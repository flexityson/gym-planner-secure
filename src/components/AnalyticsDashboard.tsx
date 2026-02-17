import React from 'react';

interface AnalyticsProps {
  workoutsThisWeek: number;
  caloriesBurned: number;
  progressPercentage: number;
  streakDays: number;
}

const AnalyticsDashboard: React.FC<AnalyticsProps> = ({
  workoutsThisWeek,
  caloriesBurned,
  progressPercentage,
  streakDays
}) => {
  return (
    <div className="card analytics-card">
      <div className="section-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <i className="fas fa-chart-line" style={{ color: 'var(--accent)' }}></i>
          <h2>Performance Analytics</h2>
        </div>
        <span className="api-status online">Live Tracking</span>
      </div>
      <p className="analytics-tracking-note">
        We track your workouts, calories burned, and streak so you can see your progress over time.
      </p>

      <div className="analytics-grid">
        <div className="metric-card">
          <div className="metric-icon">
            <i className="fas fa-dumbbell"></i>
          </div>
          <div className="metric-content">
            <div className="metric-value">{workoutsThisWeek}</div>
            <div className="metric-label">Workouts This Week</div>
          </div>
          <div className="metric-trend positive">
            <i className="fas fa-arrow-up"></i> 12%
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon">
            <i className="fas fa-fire"></i>
          </div>
          <div className="metric-content">
            <div className="metric-value">{caloriesBurned.toLocaleString()}</div>
            <div className="metric-label">Calories Burned</div>
          </div>
          <div className="metric-trend positive">
            <i className="fas fa-arrow-up"></i> 8%
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon">
            <i className="fas fa-trophy"></i>
          </div>
          <div className="metric-content">
            <div className="metric-value">{progressPercentage}%</div>
            <div className="metric-label">Goal Progress</div>
          </div>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon">
            <i className="fas fa-calendar-check"></i>
          </div>
          <div className="metric-content">
            <div className="metric-value">{streakDays}</div>
            <div className="metric-label">Day Streak</div>
          </div>
          <div className="metric-trend positive">
            <i className="fas fa-flame"></i>
          </div>
        </div>
      </div>

      <div className="weekly-chart">
        <div className="chart-header">
          <h4>Weekly Activity</h4>
          <select className="chart-period">
            <option>This Week</option>
            <option>Last Week</option>
            <option>This Month</option>
          </select>
        </div>
        <div className="chart-bars">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
            <div key={day} className="chart-bar-container">
              <div className="chart-bar-label">{day}</div>
              <div className="chart-bar">
                <div 
                  className="chart-bar-fill" 
                  style={{ height: `${40 + Math.random() * 60}%` }}
                ></div>
              </div>
              <div className="chart-bar-value">
                {Math.floor(60 + Math.random() * 90)}min
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
