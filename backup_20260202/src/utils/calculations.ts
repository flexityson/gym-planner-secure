export const calculateNutrition = (profile: any): any => {
  const { weight, height, age, gender, activity, goal } = profile;
  
  // Calculate BMR
  let bmr;
  if (gender === 'Male') {
    bmr = 10 * weight + 6.25 * height - 5 * age + 5;
  } else if (gender === 'Female') {
    bmr = 10 * weight + 6.25 * height - 5 * age - 161;
  } else {
    bmr = ((10 * weight + 6.25 * height - 5 * age + 5) + 
           (10 * weight + 6.25 * height - 5 * age - 161)) / 2;
  }
  
  // Calculate TDEE
  const tdee = bmr * activity;
  
  // Adjust for goal
  let targetCalories, proteinMult, fatMult;
  
  switch(goal) {
    case 'Build muscle':
      targetCalories = tdee * 1.1;
      proteinMult = 2.2;
      fatMult = 0.8;
      break;
    case 'Lose fat':
      targetCalories = tdee * 0.85;
      proteinMult = 2.4;
      fatMult = 0.7;
      break;
    default:
      targetCalories = tdee;
      proteinMult = 1.8;
      fatMult = 0.8;
  }
  
  // Calculate macros
  const proteinGrams = Math.round((weight * proteinMult));
  const fatGrams = Math.round((weight * fatMult));
  const proteinCal = proteinGrams * 4;
  const fatCal = fatGrams * 9;
  const carbCal = targetCalories - proteinCal - fatCal;
  const carbGrams = Math.round(carbCal / 4);
  
  return {
    calories: Math.round(targetCalories),
    protein: proteinGrams,
    carbs: carbGrams,
    fat: fatGrams,
    tdee: Math.round(tdee)
  };
};

export const generateWorkoutSchedule = (workoutsPerWeek: number): string[] => {
  if (workoutsPerWeek === 2) return ['Mon', 'Thu'];
  if (workoutsPerWeek === 3) return ['Mon', 'Wed', 'Fri'];
  if (workoutsPerWeek === 4) return ['Mon', 'Tue', 'Thu', 'Fri'];
  if (workoutsPerWeek === 5) return ['Mon', 'Tue', 'Wed', 'Fri', 'Sat'];
  if (workoutsPerWeek === 6) return ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  return ['Mon', 'Wed', 'Fri'];
};

export const getExercisesByFocus = (focus: string): string[] => {
  const exercises: Record<string, string[]> = {
    'chest': ['Bench Press', 'Push-ups', 'Chest Flyes', 'Incline Dumbbell Press', 'Cable Crossovers'],
    'back': ['Pull-ups', 'Deadlifts', 'Bent Over Rows', 'Lat Pulldowns', 'Face Pulls'],
    'legs': ['Squats', 'Lunges', 'Leg Press', 'Calf Raises', 'Leg Extensions'],
    'arms': ['Bicep Curls', 'Tricep Dips', 'Hammer Curls', 'Tricep Pushdowns', 'Skull Crushers'],
    'shoulders': ['Overhead Press', 'Lateral Raises', 'Front Raises', 'Face Pulls', 'Shrugs'],
    'full body': ['Burpees', 'Thrusters', 'Kettlebell Swings', 'Mountain Climbers', 'Box Jumps']
  };
  
  return exercises[focus.toLowerCase()] || exercises['full body'];
};