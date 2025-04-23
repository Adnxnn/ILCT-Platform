import React, { useState, useEffect } from 'react';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';

interface Message {
  id: string;
  content: string;
  sender: string;
  timestamp: Date;
}

interface PremiumChatProps {
  isPremiumUser: boolean;
  userId?: string;
}

const PremiumChat: React.FC<PremiumChatProps> = ({ isPremiumUser, userId }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleUpgradeToPremium = async () => {
    try {
      setIsLoading(true);
      // Implement premium upgrade logic here
      // Example: await upgradeToPremium(userId);
      console.log('Upgrading to premium...');
    } catch (err) {
      setError('Failed to upgrade to premium');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async (content: string) => {
    try {
      const newMessage: Message = {
        id: Date.now().toString(),
        content,
        sender: userId || 'anonymous',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, newMessage]);
      // Here you would typically send the message to your backend
      // await sendMessage(newMessage);
    } catch (err) {
      setError('Failed to send message');
    }
  };

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!isPremiumUser) {
    return (
      <div className="premium-chat-locked">
        <h3>Premium Chat</h3>
        <p>This feature is available for premium users only</p>
        <button 
          onClick={handleUpgradeToPremium}
          disabled={isLoading}
        >
          {isLoading ? 'Upgrading...' : 'Upgrade to Premium'}
        </button>
      </div>
    );
  }

  return (
    <div className="premium-chat">
      <div className="chat-messages">
        {messages.map((msg) => (
          <ChatMessage key={msg.id} message={msg} />
        ))}
      </div>
      <ChatInput onSend={handleSendMessage} />
    </div>
  );
};

export default PremiumChat;