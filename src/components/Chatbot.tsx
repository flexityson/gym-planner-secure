import React, { useState, useRef, useEffect } from 'react';
import { useChatbot } from '../hooks/useChatbot';
import { UserProfile } from '../types/user.types';

interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface ChatbotProps {
  userProfile?: UserProfile;
}

const Chatbot: React.FC<ChatbotProps> = ({ userProfile }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const { messages, isTyping, sendMessage, clearMessages } = useChatbot(userProfile);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    await sendMessage(inputValue);
    setInputValue('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="chatbot-container">
      <button className="chatbot-btn" onClick={() => setIsOpen(!isOpen)}>
        <i className="fas fa-dumbbell"></i>
      </button>

      <div className="chatbot-window" style={{ display: isOpen ? 'flex' : 'none' }}>
        <div className="chatbot-header">
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ margin: 0, fontSize: '1.1rem' }}><i className="fas fa-robot"></i> Elite AI Coach</h3>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '2px' }}>Science-Based • Fitness Only</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button
              onClick={clearMessages}
              style={{
                background: 'none',
                border: '1px solid var(--glass-border)',
                color: 'var(--text-muted)',
                padding: '4px 10px',
                borderRadius: '6px',
                fontSize: '0.7rem',
                cursor: 'pointer'
              }}
            >
              Reset
            </button>
            <button className="chatbot-close" onClick={() => setIsOpen(false)}>&times;</button>
          </div>
        </div>

        <div className="chatbot-messages">
          {messages.map((message: ChatMessage) => (
            <div
              key={message.id}
              className={`message ${message.sender === 'user' ? 'user-message' : 'bot-message'}`}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                <strong>{message.sender === 'user' ? 'You' : 'Coach'}</strong>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
              <div style={{ whiteSpace: 'pre-line' }}>{message.text}</div>
            </div>
          ))}

          {isTyping && (
            <div className="message bot-message">
              <div className="typing-indicator" style={{ display: 'flex', gap: '5px' }}>
                <div className="typing-dot"></div>
                <div className="typing-dot"></div>
                <div className="typing-dot"></div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="chatbot-input">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about training, macros, or recovery..."
            disabled={isTyping}
          />
          <button onClick={handleSend} disabled={isTyping}>
            <i className="fas fa-paper-plane"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
