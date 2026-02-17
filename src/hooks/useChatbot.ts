import { useState } from 'react';
import { AIService } from '../services/aiService';
import { UserProfile } from '../types/user.types';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export const useChatbot = (userProfile?: UserProfile) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "👋 I am your Elite Performance Coach. I'm here to accept questions on training, nutrition, and recovery science. What is your focus today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = async (text: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date()
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setIsTyping(true);

    try {
      const response = await AIService.getChatCompletion(updatedMessages, userProfile);

      if (response.error) {
        throw new Error(response.error);
      }

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response.content,
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Chatbot error:', error);

      const errorMessage: Message = {
        id: (Date.now() + 2).toString(),
        text: 'I apologize, but I encountered a technical issue. Please try again or ask another fitness-related question.',
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const clearMessages = () => {
    setMessages([
      {
        id: '1',
        text: "👋 I am your Elite Performance Coach. I'm here to accept questions on training, nutrition, and recovery science. What is your focus today?",
        sender: 'bot',
        timestamp: new Date()
      }
    ]);
  };

  return {
    messages,
    isTyping,
    sendMessage,
    clearMessages
  };
};
