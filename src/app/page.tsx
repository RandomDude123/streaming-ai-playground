'use client';

import React from 'react';
import { useChat } from '@ai-sdk/react';
import LoadingOverlay from '@/components/LoadingOverlay';
import ChatHeader from '@/components/ChatHeader';
import MessageBubble from '@/components/MessageBubble';
import ChatInput from '@/components/ChatInput';

export default function Chat() {
  const [isLoading, setIsLoading] = React.useState(true);
  const { messages, input, handleInputChange, handleSubmit, setMessages } = useChat({
    id: 'chat',
    initialMessages: [],
  });

  // Load messages from localStorage on component mount
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedMessages = localStorage.getItem('chat-messages');
      if (savedMessages) {
        try {
          const parsedMessages = JSON.parse(savedMessages);
          setMessages(parsedMessages);
        } catch (error) {
          console.error('Failed to load chat history:', error);
        }
      }
    }
    setIsLoading(false);
  }, [setMessages]);

  // Save messages to localStorage whenever messages change
  React.useEffect(() => {
    if (typeof window !== 'undefined' && messages.length > 0) {
      localStorage.setItem('chat-messages', JSON.stringify(messages));
    }
  }, [messages]);

  const clearChat = () => {
    setMessages([]);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('chat-messages');
    }
  };

  if (isLoading) {
    return <LoadingOverlay message="Loading chat..." color="blue" />;
  }

  return (
    <div className="flex flex-col w-full max-w-4xl pt-12 pb-24 mx-auto stretch bg-white min-h-screen">
      <ChatHeader
        currentPage="basic"
        title="Basic AI Chat"
        description="Direct Anthropic Claude streaming with Web Search"
        onClearChat={clearChat}
      />
      
      {messages.map(message => (
        <MessageBubble key={message.id} message={message} variant="basic" />
      ))}

      <ChatInput
        value={input}
        onChange={handleInputChange}
        onSubmit={handleSubmit}
        placeholder="Ask me anything - I can search the web for current information..."
        variant="basic"
      />
    </div>
  );
}