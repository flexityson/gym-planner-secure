import React from 'react';
import type { PageId } from './MainNav';

interface HomePageProps {
  onNavigate: (page: PageId) => void;
  userProfile: any;
}

const HomePage: React.FC<HomePageProps> = ({ onNavigate, userProfile }) => {
  return (
    <div className="home-page">
      <div className="page-card home-welcome">
        <h2>Welcome to GYM PLANNER CAMTECH</h2>
        <p>Use the menu to jump to any section. No scrolling required.</p>
        <div className="home-quick-actions">
          <button type="button" className="home-action-btn" onClick={() => onNavigate('planner')}>
            <i className="fas fa-dumbbell"></i>
            <span>Planner</span>
            <small>Build your workout</small>
          </button>
          <button type="button" className="home-action-btn" onClick={() => onNavigate('profile')}>
            <i className="fas fa-user"></i>
            <span>Profile</span>
            <small>Gender, units, activity, goal</small>
          </button>
          <button type="button" className="home-action-btn" onClick={() => onNavigate('activity-log')}>
            <i className="fas fa-clipboard-list"></i>
            <span>Activity Log</span>
            <small>Track progress</small>
          </button>
          <button type="button" className="home-action-btn" onClick={() => onNavigate('performance')}>
            <i className="fas fa-chart-line"></i>
            <span>Performance</span>
            <small>Analytics &amp; stats</small>
          </button>
          <button type="button" className="home-action-btn" onClick={() => onNavigate('community')}>
            <i className="fas fa-users"></i>
            <span>Community</span>
            <small>Share &amp; connect</small>
          </button>
        </div>
        <p className="home-profile-summary">
          Logged in as: {userProfile?.gender === 'male' ? 'Male' : userProfile?.gender === 'female' ? 'Female' : 'Other'} · 
          Activity: {userProfile?.activityLevel?.replace('_', ' ') ?? '—'} · 
          Goal: {userProfile?.fitnessGoal?.replace('_', ' ') ?? '—'}
        </p>
      </div>
    </div>
  );
};

export default HomePage;
