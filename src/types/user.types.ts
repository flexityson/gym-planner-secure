
export interface UserProfile {
  age: number;
  gender: 'male' | 'female' | 'other';
  weight: number; // in kg
  height: number; // in cm
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active';
  fitnessGoal: 'weight_loss' | 'muscle_gain' | 'maintenance' | 'endurance';
  experienceLevel: 'beginner' | 'intermediate' | 'advanced';
}

export interface ProfileFormData extends Omit<UserProfile, 'height'> {
  heightFeet?: number;
  heightInches?: number;
  useMetric: boolean;
}
