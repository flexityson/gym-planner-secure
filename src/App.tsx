import { useState, useEffect } from 'react';
import Header from './components/Header';
import MainNav, { PageId } from './components/MainNav';
import HomePage from './components/HomePage';
import ProfilePage from './components/ProfilePage';
import PlannerPage from './components/PlannerPage';
import AnalyticsDashboard from './components/AnalyticsDashboard';
import ProgressTracker from './components/ProgressTracker';
import CommunitySharing from './components/CommunitySharing';
import FAQ from './components/FAQ';
import Feedback from './components/Feedback';
import Chatbot from './components/Chatbot';
import Timer from './components/Timer';
import QuickTipsPopover from './components/QuickTipsPopover';
import type { WorkoutExercise } from './hooks/useWorkoutGenerator';
import type { UserProfile } from './types/user.types';
import './App.css';


const STORAGE_KEY_PROFILE = 'gym-planner-profile';
const STORAGE_KEY_PLAN = 'gym-planner-weekly-plan';

interface Nutrition {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  tdee: number;
}

// Local interface removed in favor of imported UserProfile


const defaultProfile: UserProfile = {
  age: 25,
  gender: 'male',
  weight: 70,
  height: 175,
  activityLevel: 'moderate',
  fitnessGoal: 'muscle_gain',
  experienceLevel: 'intermediate',
};

function loadProfile(): UserProfile {
  try {
    const s = localStorage.getItem(STORAGE_KEY_PROFILE);
    if (s) {
      const data = JSON.parse(s);
      return { ...defaultProfile, ...data };
    }
  } catch (_) { }
  return defaultProfile;
}

function loadPlan(): {
  weeklyPlan: WorkoutExercise[][];
  nutrition: Nutrition | null;
  protocolSummary: string;
} {
  try {
    const s = localStorage.getItem(STORAGE_KEY_PLAN);
    if (s) {
      const data = JSON.parse(s);
      return {
        weeklyPlan: Array.isArray(data.weeklyPlan) ? data.weeklyPlan : [],
        nutrition: data.nutrition || null,
        protocolSummary: data.protocolSummary || '',
      };
    }
  } catch (_) { }
  return { weeklyPlan: [], nutrition: null, protocolSummary: '' };
}

function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [userProfile, setUserProfile] = useState<UserProfile>(loadProfile);
  const [useMetric, setUseMetric] = useState(true);
  const [weeklyPlan, setWeeklyPlan] = useState<WorkoutExercise[][]>(() => loadPlan().weeklyPlan);
  const [nutrition, setNutrition] = useState<Nutrition | null>(() => loadPlan().nutrition);
  const [protocolSummary, setProtocolSummary] = useState<string>(() => loadPlan().protocolSummary);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_PROFILE, JSON.stringify(userProfile));
    } catch (_) { }
  }, [userProfile]);

  const handleSavePlan = (
    days: WorkoutExercise[][],
    nut: Nutrition,
    summary: string
  ) => {
    setWeeklyPlan(days);
    setNutrition(nut);
    setProtocolSummary(summary);
    persistPlan(days, nut, summary);
  };

  const persistPlan = (
    days: WorkoutExercise[][],
    nut: Nutrition | null,
    summary: string
  ) => {
    try {
      localStorage.setItem(
        STORAGE_KEY_PLAN,
        JSON.stringify({ weeklyPlan: days, nutrition: nut, protocolSummary: summary })
      );
    } catch (_) { }
  };

  const handleUpdateExerciseImage = (
    dayIndex: number,
    exerciseIndex: number,
    imageUrl: string
  ) => {
    setWeeklyPlan((prev) => {
      const next = prev.map((day, d) =>
        d === dayIndex
          ? day.map((ex, i) =>
            i === exerciseIndex ? { ...ex, imageUrl } : ex
          )
          : day
      );
      persistPlan(next, nutrition, protocolSummary);
      return next;
    });
  };

  const handleProfileUpdate = (profile: UserProfile) => {
    setUserProfile(profile);
  };

  const analyticsData = {
    workoutsThisWeek: 4,
    caloriesBurned: 2850,
    progressPercentage: 75,
    streakDays: 14,
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={setCurrentPage} userProfile={userProfile} />;
      case 'profile':
        return (
          <ProfilePage
            profile={userProfile}
            onProfileUpdate={handleProfileUpdate}
            useMetric={useMetric}
            onUnitChange={setUseMetric}
          />
        );
      case 'planner':
        return (
          <PlannerPage
            userProfile={userProfile}
            weeklyPlan={weeklyPlan}
            nutrition={nutrition}
            protocolSummary={protocolSummary}
            onSavePlan={handleSavePlan}
            onUpdateExerciseImage={handleUpdateExerciseImage}
          />
        );
      case 'activity-log':
        return <ProgressTracker />;
      case 'performance':
        return <AnalyticsDashboard {...analyticsData} />;
      case 'community':
        return <CommunitySharing />;
      case 'faq':
        return <FAQ />;
      case 'feedback':
        return <Feedback />;
      default:
        return <HomePage onNavigate={setCurrentPage} userProfile={userProfile} />;
    }
  };

  const [theme, setTheme] = useState<'professional' | 'light' | 'dark'>(() => {
    return (localStorage.getItem('gym-planner-theme') as any) || 'professional';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('gym-planner-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'professional' ? 'light' : prev === 'light' ? 'dark' : 'professional'));
  };

  return (
    <div className="app-container">
      <Timer />
      <Chatbot userProfile={userProfile} />
      <QuickTipsPopover />

      <button
        type="button"
        className="theme-toggle-btn no-print"
        onClick={toggleTheme}
        title={`Current theme: ${theme}. Click to switch.`}
      >
        {theme === 'professional' ? (
          <i className="fas fa-palette"></i>
        ) : theme === 'light' ? (
          <i className="fas fa-sun"></i>
        ) : (
          <i className="fas fa-moon"></i>
        )}
      </button>


      <Header />

      <div className="app-body">
        <MainNav currentPage={currentPage} onNavigate={setCurrentPage} />
        <main className="app-main">{renderPage()}</main>
      </div>
    </div>
  );
}

export default App;
