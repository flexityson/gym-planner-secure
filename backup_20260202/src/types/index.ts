// User and workout types
export interface UserProfile {
  gender: string;
  age: number;
  weight: number;
  height: number;
  level: 'New' | 'Intermediate' | 'Advanced';
  goal: 'Build muscle' | 'Lose fat' | 'Stay fit';
  focus: 'Chest' | 'Back' | 'Legs' | 'Arms' | 'Shoulders' | 'Full body';
  workoutsPerWeek: number;
  activity: number;
  intensityMod: number;
}

export interface Exercise {
  name: string;
  sets: number;
  reps: string;
  videoUrl?: string;
}

export interface WorkoutPlan {
  warmup: string[];
  mainExercises: Exercise[];
  cooldown: string[];
  duration: number;
  intensity: string;
}

export interface NutritionPlan {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  tdee: number;
}

export interface SpotifyPlaylist {
  name: string;
  description: string;
  embedUrl: string;
  color: string;
}
