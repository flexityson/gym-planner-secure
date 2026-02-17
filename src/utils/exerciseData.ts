export interface ExerciseMetadata {
    tiktokLink: string;
}

export const exerciseMetadata: Record<string, ExerciseMetadata> = {
    // Chest
    'Bench Press': {
        tiktokLink: 'https://www.tiktok.com/@fitnesscoach/video/bench-press-form',
    },
    'Push-ups': {
        tiktokLink: 'https://www.tiktok.com/@calisthenics/video/pushup-proper-form',
    },
    'Chest Flyes': {
        tiktokLink: 'https://www.tiktok.com/@bodybuilding/video/chest-fly-technique',
    },
    'Incline Dumbbell Press': {
        tiktokLink: 'https://www.tiktok.com/@strengthcoach/video/incline-press-form',
    },
    'Cable Crossovers': {
        tiktokLink: 'https://www.tiktok.com/@chestday/video/cable-crossover-form',
    },
    'Dips': {
        tiktokLink: 'https://www.tiktok.com/@fitness/video/dips-form',
    },

    // Legs
    'Squats': {
        tiktokLink: 'https://www.tiktok.com/@squatuniversity/video/proper-squat-form',
    },
    'Lunges': {
        tiktokLink: 'https://www.tiktok.com/@pt.coach/video/lunge-tutorial',
    },
    'Leg Press': {
        tiktokLink: 'https://www.tiktok.com/@gymguide/video/leg-press-technique',
    },
    'Calf Raises': {
        tiktokLink: 'https://www.tiktok.com/@lowerbody/video/calf-raise-form',
    },
    'Leg Extensions': {
        tiktokLink: 'https://www.tiktok.com/@legday/video/leg-extension',
    },
    'Deadlifts': {
        tiktokLink: 'https://www.tiktok.com/@deadlift/video/form',
    },
    'Leg Curls': {
        tiktokLink: 'https://www.tiktok.com/@hamstrings/video/curls',
    },

    // Back
    'Pull-ups': {
        tiktokLink: 'https://www.tiktok.com/@calisthenics/video/pullup-form',
    },
    'Rows': {
        tiktokLink: 'https://www.tiktok.com/@backday/video/row-variations',
    },
    'Lat Pulldowns': {
        tiktokLink: 'https://www.tiktok.com/@gymtok/video/lat-pulldown',
    },
    'Shrugs': {
        tiktokLink: 'https://www.tiktok.com/@traps/video/shrugs',
    },
    'Face Pulls': {
        tiktokLink: 'https://www.tiktok.com/@shoulders/video/face-pulls',
    },

    // Shoulders
    'Shoulder Press': {
        tiktokLink: 'https://www.tiktok.com/@shoulderking/video/press-form',
    },
    'Lateral Raises': {
        tiktokLink: 'https://www.tiktok.com/@fitness/video/lateral-raise',
    },
    'Front Raises': {
        tiktokLink: 'https://www.tiktok.com/@shoulders/video/front-raise',
    },
    'Arnold Press': {
        tiktokLink: 'https://www.tiktok.com/@shoulders/video/arnold-press',
    },

    // Arms
    'Bicep Curls': {
        tiktokLink: 'https://www.tiktok.com/@armday/video/curl-variations',
    },
    'Tricep Extensions': {
        tiktokLink: 'https://www.tiktok.com/@triceps/video/extension-form',
    },
    'Hammer Curls': {
        tiktokLink: 'https://www.tiktok.com/@arms/video/hammer-curls',
    },
    'Skull Crushers': {
        tiktokLink: 'https://www.tiktok.com/@triceps/video/skull-crushers',
    },
    'Concentration Curls': {
        tiktokLink: 'https://www.tiktok.com/@biceps/video/concentration-curls',
    },
};

export function getExerciseData(name: string): ExerciseMetadata | undefined {
    return exerciseMetadata[name];
}
