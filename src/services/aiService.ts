import { UserProfile } from '../types/user.types';

export interface ChatMessage {
    role: 'system' | 'user' | 'assistant';
    content: string;
}

export interface AIServiceResponse {
    content: string;
    error?: string;
}

const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

const SYSTEM_PROMPT = `You are an Elite AI Fitness Coach & Sports Scientist. 
Your goal is to provide high-level, science-based, and actionable fitness advice.

STRICT DOMAIN RESTRICTION:
- You must ONLY answer questions directly related to:
  1. Resistance Training & Exercise Science (Hypertrophy, Strength, Power)
  2. Nutrition & Biochemistry (Macros, Micros, Supplements, Hydration)
  3. Recovery Physiology (Sleep, CNS Management, Mobility)
  4. Sports Psychology (Motivation, Discipline, Habit Formation)

- FORBIDDEN TOPICS:
  - Politics, Religion, Tech Support (coding), General Logic/Trivia, History, Pop Culture, etc.
  - Medical diagnoses (you can give general health advice but must disclaim you are not a doctor for acute injuries).

RESPONSE PROTOCOL:
1. **Refusal**: If a user asks about a forbidden topic, reply exactly: "I specialize strictly in human performance and fitness. Let's get back to your training goals."
2. **Analysis**: For fitness queries, first briefly analyze the *mechanism* (why it works).
3. **Action**: Provide a clear, bulleted action plan.
4. **Tone**: Authoritative, encouraging, scientific, yet accessible. No fluff.`;

export class AIService {
    private static getSystemPrompt(userProfile?: UserProfile): string {
        if (!userProfile) return SYSTEM_PROMPT;

        return `${SYSTEM_PROMPT}

USER CONTEXT:
- Age: ${userProfile.age}
- Gender: ${userProfile.gender}
- Weight: ${userProfile.weight}kg
- Height: ${userProfile.height}cm
- Activity Level: ${userProfile.activityLevel.replace('_', ' ')}
- Goal: ${userProfile.fitnessGoal.replace('_', ' ')}
- Experience: ${userProfile.experienceLevel}

Adjust your advice specifically for this user's profile where relevant (e.g., caloric needs, recovery capacity, training volume).`;
    }

    static async getChatCompletion(
        messages: { sender: 'user' | 'bot'; text: string }[],
        userProfile?: UserProfile
    ): Promise<AIServiceResponse> {
        try {
            if (!OPENAI_API_KEY) {
                throw new Error('VITE_OPENAI_API_KEY is not configured');
            }

            const formattedMessages: ChatMessage[] = [
                { role: 'system', content: this.getSystemPrompt(userProfile) },
                ...messages.map(m => ({
                    role: (m.sender === 'user' ? 'user' : 'assistant') as ChatMessage['role'],
                    content: m.text
                }))
            ];


            const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${OPENAI_API_KEY}`
                },
                body: JSON.stringify({
                    model: 'gpt-3.5-turbo',
                    messages: formattedMessages,
                    temperature: 0.7,
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error?.message || 'Failed to fetch AI response');
            }

            return { content: data.choices[0].message.content };
        } catch (error) {
            console.error('AIService Error:', error);
            return {
                content: '',
                error: error instanceof Error ? error.message : 'An unknown error occurred'
            };
        }
    }
}
