// Serverless function for exercises
const axios = require('axios');

exports.handler = async function(event, context) {
  if (event.httpMethod !== 'GET') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }
  
  try {
    const { bodyPart } = event.queryStringParameters;
    
    // Category mapping
    const categoryMap = {
      'chest': 11,
      'back': 12,
      'legs': 9,
      'arms': 13,
      'shoulders': 14,
      'full body': 8
    };
    
    const categoryId = categoryMap[bodyPart?.toLowerCase()] || 8;
    
    // Using public API (no key needed)
    const response = await axios.get(
      `https://wger.de/api/v2/exercise/?category=${categoryId}&limit=6&language=2`,
      { timeout: 5000 }
    );
    
    if (response.data.results && response.data.results.length > 0) {
      const exercises = response.data.results.slice(0, 5).map(ex => ex.name);
      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({ exercises, source: 'api' })
      };
    }
    
    // Fallback data
    const fallbackExercises = {
      'chest': ['Bench Press', 'Incline Dumbbell Press', 'Push-ups', 'Chest Flyes', 'Cable Crossovers'],
      'back': ['Deadlifts', 'Pull-ups', 'Bent Over Rows', 'Lat Pulldowns', 'Seated Cable Rows'],
      'legs': ['Squats', 'Lunges', 'Leg Press', 'Romanian Deadlifts', 'Leg Extensions'],
      'arms': ['Bicep Curls', 'Tricep Dips', 'Hammer Curls', 'Skull Crushers', 'Tricep Pushdowns'],
      'shoulders': ['Overhead Press', 'Lateral Raises', 'Front Raises', 'Face Pulls', 'Upright Rows'],
      'full body': ['Burpees', 'Thrusters', 'Clean and Press', 'Kettlebell Swings', 'Mountain Climbers']
    };
    
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ 
        exercises: fallbackExercises[bodyPart?.toLowerCase()] || fallbackExercises['full body'],
        source: 'fallback'
      })
    };
    
  } catch (error) {
    console.error('Exercise API error:', error);
    
    // Fallback data on error
    const fallbackData = {
      'chest': ['Bench Press', 'Incline Press', 'Push-ups'],
      'back': ['Pull-ups', 'Rows', 'Deadlifts'],
      'legs': ['Squats', 'Lunges', 'Leg Press'],
      'arms': ['Bicep Curls', 'Tricep Extensions'],
      'shoulders': ['Overhead Press', 'Lateral Raises'],
      'full body': ['Burpees', 'Mountain Climbers', 'Squats']
    };
    
    return {
      statusCode: 200,
      body: JSON.stringify({ 
        exercises: fallbackData[event.queryStringParameters.bodyPart] || fallbackData['full body'],
        source: 'error-fallback'
      })
    };
  }
};