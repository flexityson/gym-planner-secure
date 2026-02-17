
const OPENAI_API_KEY = process.env.VITE_OPENAI_API_KEY;
const SYSTEM_PROMPT = 'You are an Elite AI Fitness Coach. Answer strictly about fitness.';

async function testAI() {
  console.log('Testing OpenAI connection...');
  if (!OPENAI_API_KEY) {
    console.error('Error: VITE_OPENAI_API_KEY is not set in environment.');
    return;
  }

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + OPENAI_API_KEY
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: 'What is the best exercise for chest?' }
        ],
        temperature: 0.7,
      })
    });

    const data = await response.json();
    if (data.error) {
      console.error('API Error:', data.error.message);
    } else {
      console.log('AI Response:', data.choices[0].message.content);
      console.log('Test Passed!');
    }
  } catch (error) {
    console.error('Fetch Error:', error);
  }
}

testAI();
