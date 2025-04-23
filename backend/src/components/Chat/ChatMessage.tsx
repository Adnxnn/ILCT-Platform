import React from 'react';
<ChatMessage message={message} currentUserId="user123" /><ChatMessage message={message} currentUserId="user123" /><ChatMessage message={message} currentUserId="user123" /><ChatMessage message={message} currentUserId="user123" /><ChatMessage message={message} currentUserId="user123" /><ChatMessage message={message} currentUserId="user123" /><ChatMessage message={message} currentUserId="user123" />import styles from './ChatMessage.module.css';

interface Message {
  id: string;
  content: string;
  sender: string;
  timestamp: Date;
}

interface ChatMessageProps {
  message: Message;
  currentUserId?: string;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message, currentUserId }) => {
  const isOwnMessage = message.sender === currentUserId;
  
  const formatTimestamp = (date: Date) => {
    try {
      return new Date(date).toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit' 
      });
    } catch (error) {
      return 'Invalid time';
    }
  };

  return (
    <div className={`${styles.chatMessage} ${isOwnMessage ? styles.ownMessage : ''}`}>
      <div className={styles.messageHeader}>
        <span className={styles.sender}>{message.sender}</span>
        <span className={styles.timestamp}>{formatTimestamp(message.timestamp)}</span>
      </div>
      <div className={styles.messageContent}>{message.content}</div>
    </div>
  );
};