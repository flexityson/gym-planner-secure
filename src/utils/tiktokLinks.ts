// TikTok links for common exercises
export const exerciseTikTokLinks: Record<string, string> = {
  // Chest exercises
  'Bench Press': 'https://www.tiktok.com/@fitnesscoach/video/bench-press-form',
  'Push-ups': 'https://www.tiktok.com/@calisthenics/video/pushup-proper-form',
  'Chest Flyes': 'https://www.tiktok.com/@bodybuilding/video/chest-fly-technique',
  'Incline Dumbbell Press': 'https://www.tiktok.com/@strengthcoach/video/incline-press-form',
  'Cable Crossovers': 'https://www.tiktok.com/@chestday/video/cable-crossover-form',
  'Dips': 'https://www.tiktok.com/@fitness/video/dips-form',

  // Leg exercises
  'Squats': 'https://www.tiktok.com/@squatuniversity/video/proper-squat-form',
  'Lunges': 'https://www.tiktok.com/@pt.coach/video/lunge-tutorial',
  'Leg Press': 'https://www.tiktok.com/@gymguide/video/leg-press-technique',
  'Calf Raises': 'https://www.tiktok.com/@lowerbody/video/calf-raise-form',
  'Leg Extensions': 'https://www.tiktok.com/@legday/video/leg-extension',
  'Deadlifts': 'https://www.tiktok.com/@deadlift/video/form',
  'Leg Curls': 'https://www.tiktok.com/@hamstrings/video/curls',

  // Back exercises
  'Pull-ups': 'https://www.tiktok.com/@calisthenics/video/pullup-form',
  'Rows': 'https://www.tiktok.com/@backday/video/row-variations',
  'Lat Pulldowns': 'https://www.tiktok.com/@gymtok/video/lat-pulldown',
  'Shrugs': 'https://www.tiktok.com/@traps/video/shrugs',
  'Face Pulls': 'https://www.tiktok.com/@shoulders/video/face-pulls',

  // Shoulders
  'Shoulder Press': 'https://www.tiktok.com/@shoulderking/video/press-form',
  'Lateral Raises': 'https://www.tiktok.com/@fitness/video/lateral-raise',
  'Front Raises': 'https://www.tiktok.com/@shoulders/video/front-raise',
  'Arnold Press': 'https://www.tiktok.com/@shoulders/video/arnold-press',

  // Arms
  'Bicep Curls': 'https://www.tiktok.com/@armday/video/curl-variations',
  'Tricep Extensions': 'https://www.tiktok.com/@triceps/video/extension-form',
  'Hammer Curls': 'https://www.tiktok.com/@arms/video/hammer-curls',
  'Skull Crushers': 'https://www.tiktok.com/@triceps/video/skull-crushers',
  'Concentration Curls': 'https://www.tiktok.com/@biceps/video/concentration-curls'
};

// Helper function to get TikTok link for an exercise
export function getTikTokLink(exerciseName: string): string | undefined {
  return exerciseTikTokLinks[exerciseName];
}

// Function to add TikTok link to exercise object
export function addTikTokLinkToExercise(exercise: any): any {
  if (!exercise.tiktokLink && exercise.name) {
    return {
      ...exercise,
      tiktokLink: getTikTokLink(exercise.name)
    };
  }
  return exercise;
}
