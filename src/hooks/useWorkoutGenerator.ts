import { getExerciseData } from '../utils/exerciseData';

export interface WorkoutExercise {
  name: string;
  sets: number;
  reps: string;
  tiktokLink?: string;
  imageUrl?: string;
}

const muscleGroups: Record<string, string[]> = {
  chest: ['Bench Press', 'Push-ups', 'Chest Flyes', 'Incline Dumbbell Press', 'Cable Crossovers', 'Dips'],
  legs: ['Squats', 'Lunges', 'Leg Press', 'Calf Raises', 'Leg Extensions', 'Deadlifts', 'Leg Curls'],
  back: ['Pull-ups', 'Rows', 'Lat Pulldowns', 'Shrugs', 'Face Pulls'],
  shoulders: ['Shoulder Press', 'Lateral Raises', 'Front Raises', 'Arnold Press'],
  arms: ['Bicep Curls', 'Tricep Extensions', 'Hammer Curls', 'Skull Crushers', 'Concentration Curls'],
};

function buildExercises(
  selectedGroups: string[],
  duration: number,
  userProfile?: any,
  skipLimit = false
): WorkoutExercise[] {
  const exercises: WorkoutExercise[] = [];
  const experience = userProfile?.experienceLevel || 'intermediate';
  const baseSets = experience === 'beginner' ? 2 : experience === 'intermediate' ? 3 : 4;
  const baseReps = experience === 'beginner' ? '10-12' : experience === 'intermediate' ? '8-10' : '6-8';

  selectedGroups.forEach((group) => {
    const groupExercises = muscleGroups[group] || [];
    groupExercises.forEach((exerciseName) => {
      let sets = baseSets;
      let reps = baseReps;
      if (userProfile?.fitnessGoal === 'weight_loss') {
        reps = '12-15';
        sets = duration > 60 ? 4 : 3;
      } else if (userProfile?.fitnessGoal === 'muscle_gain') {
        reps = '6-8';
        sets = duration > 60 ? 5 : 4;
      } else if (userProfile?.fitnessGoal === 'endurance') {
        reps = '15-20';
        sets = duration > 60 ? 3 : 2;
      }
      const meta = getExerciseData(exerciseName);
      exercises.push({
        name: exerciseName,
        sets,
        reps,
        tiktokLink: meta?.tiktokLink,
      });
    });
  });

  if (skipLimit) return exercises;

  const maxExercises =
    userProfile?.experienceLevel === 'beginner'
      ? Math.floor(duration / 15)
      : Math.floor(duration / 10);
  return exercises.slice(0, Math.max(3, maxExercises));
}

function shuffle<T>(arr: T[], daySeed: number): T[] {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.abs(Math.sin(daySeed + i) * 10000)) % (i + 1);
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

export const useWorkoutGenerator = () => {
  const generateWorkout = (
    selectedGroups: string[],
    duration: number,
    userProfile?: any
  ): WorkoutExercise[] => {
    return buildExercises(selectedGroups, duration, userProfile);
  };

  /** Generate a full week (Day 1–7) with varied exercises per day */
  const generateWeeklyPlan = (
    selectedGroups: string[],
    duration: number,
    userProfile?: any
  ): WorkoutExercise[][] => {
    // Get ALL possible exercises for selected groups
    const pool = buildExercises(selectedGroups, duration, userProfile, true);
    const days: WorkoutExercise[][] = [];

    const maxPerDay =
      userProfile?.experienceLevel === 'beginner'
        ? Math.floor(duration / 15)
        : Math.floor(duration / 10);
    const limit = Math.max(3, maxPerDay);

    for (let d = 0; d < 7; d++) {
      const shuffled = shuffle(pool, d);
      const dayExercises = shuffled.slice(0, limit).map((e) => ({ ...e }));
      days.push(dayExercises);
    }
    return days;
  };

  return { generateWorkout, generateWeeklyPlan };
};

export default useWorkoutGenerator;
