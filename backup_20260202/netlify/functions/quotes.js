// Serverless function for quotes
const axios = require('axios');

exports.handler = async function(event, context) {
  if (event.httpMethod !== 'GET') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }
  
  try {
    const response = await axios.get('https://type.fit/api/quotes', {
      timeout: 3000
    });
    
    if (response.data && response.data.length > 0) {
      const randomQuote = response.data[Math.floor(Math.random() * response.data.length)];
      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({ 
          text: randomQuote.text,
          author: randomQuote.author || 'Unknown'
        })
      };
    }
    
    throw new Error('No quotes received');
    
  } catch (error) {
    console.error('Quotes API error:', error);
    
    // Fallback quotes
    const fallbackQuotes = [
      "The only bad workout is the one that didn't happen.",
      "Consistency beats intensity every time.",
      "Stronger than yesterday, weaker than tomorrow.",
      "Your body can stand almost anything. It's your mind you have to convince.",
      "Don't wish for a good body, work for it."
    ];
    
    const randomQuote = fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)];
    
    return {
      statusCode: 200,
      body: JSON.stringify({ 
        text: randomQuote,
        author: 'Fitness Wisdom',
        source: 'fallback'
      })
    };
  }
};