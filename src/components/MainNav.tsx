import React from 'react';

export type PageId =
  | 'home'
  | 'profile'
  | 'planner'
  | 'activity-log'
  | 'performance'
  | 'community'
  | 'faq'
  | 'feedback';

interface NavItem {
  id: PageId;
  label: string;
  icon: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'home', label: 'Home', icon: 'fas fa-home' },
  { id: 'profile', label: 'Profile', icon: 'fas fa-user' },
  { id: 'planner', label: 'Planner', icon: 'fas fa-dumbbell' },
  { id: 'activity-log', label: 'Activity Log', icon: 'fas fa-clipboard-list' },
  { id: 'performance', label: 'Performance Analysis', icon: 'fas fa-chart-line' },
  { id: 'community', label: 'Community', icon: 'fas fa-users' },
  { id: 'faq', label: 'FAQ', icon: 'fas fa-question-circle' },
  { id: 'feedback', label: 'Feedback', icon: 'fas fa-comment-dots' },
];

interface MainNavProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
}

const MainNav: React.FC<MainNavProps> = ({ currentPage, onNavigate }) => {
  return (
    <nav className="main-nav">
      <ul className="main-nav-list">
        {NAV_ITEMS.map((item) => (
          <li key={item.id}>
            <button
              type="button"
              className={`main-nav-btn ${currentPage === item.id ? 'active' : ''}`}
              onClick={() => onNavigate(item.id)}
            >
              <i className={item.icon}></i>
              <span>{item.label}</span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default MainNav;

