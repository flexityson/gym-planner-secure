const axios = require('axios');

exports.handler = async function(event, context) {
  // Allow CORS
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type'
  };

  // Only GET requests
  if (event.httpMethod !== 'GET') {
    return { 
      statusCode: 405, 
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }) 
    };
  }

  try {
    // Get location from query
    const { lat, lon } = event.queryStringParameters;
    
    if (!lat || !lon) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Missing lat/lon parameters' })
      };
    }

    // Get API key from environment
    const apiKey = process.env.OPENWEATHER_API_KEY;
    
    // If no API key, return demo data
    if (!apiKey || apiKey.includes('your-openweather')) {
      console.log('Using demo weather data - no API key found');
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          temp: 22,
          feelsLike: 24,
          humidity: 65,
          description: 'Partly cloudy (demo)',
          windSpeed: 12,
          demo: true,
          message: 'Add OPENWEATHER_API_KEY in Netlify for real data'
        })
      };
    }

    // Try real API call
    console.log('Attempting OpenWeather API call with key:', apiKey.substring(0, 8) + '...');
    
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`,
      { timeout: 10000 }
    );

    console.log('OpenWeather API response received');
    
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        temp: Math.round(response.data.main.temp),
        feelsLike: Math.round(response.data.main.feels_like),
        humidity: response.data.main.humidity,
        description: response.data.weather[0].description,
        windSpeed: Math.round(response.data.wind.speed * 3.6),
        demo: false
      })
    };

  } catch (error) {
    console.error('Weather API error:', error.message);
    
    // Return demo data on error
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        temp: 22,
        feelsLike: 24,
        humidity: 65,
        description: 'Partly cloudy (error fallback)',
        windSpeed: 12,
        demo: true,
        error: error.message
      })
    };
  }
};