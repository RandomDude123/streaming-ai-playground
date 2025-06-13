'use client';

import React from 'react';
import { useChat } from '@ai-sdk/react';
import LoadingOverlay from '@/components/LoadingOverlay';
import ChatHeader from '@/components/ChatHeader';
import MessageBubble from '@/components/MessageBubble';
import ChatInput from '@/components/ChatInput';
import LoadingMessage from '@/components/LoadingMessage';

export default function LangGraphChat() {
  const [isLoading, setIsLoading] = React.useState(true);
  const { messages, input, handleInputChange, handleSubmit, setMessages, status } = useChat({
    api: '/api/langgraph',
    id: 'langgraph-chat',
    initialMessages: [],
  });

  // Load messages from localStorage on component mount
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedMessages = localStorage.getItem('langgraph-chat-messages');
      if (savedMessages) {
        try {
          const parsedMessages = JSON.parse(savedMessages);
          setMessages(parsedMessages);
        } catch (error) {
          console.error('Failed to load LangGraph chat history:', error);
        }
      }
    }
    setIsLoading(false);
  }, [setMessages]);

  // Save messages to localStorage whenever messages change
  React.useEffect(() => {
    if (typeof window !== 'undefined' && messages.length > 0) {
      localStorage.setItem('langgraph-chat-messages', JSON.stringify(messages));
    }
  }, [messages]);

  const clearChat = () => {
    setMessages([]);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('langgraph-chat-messages');
    }
  };

  if (isLoading) {
    return <LoadingOverlay message="Loading LangGraph chat..." color="green" />;
  }

  return (
    <div className="flex flex-col w-full max-w-4xl pt-12 pb-24 mx-auto stretch bg-white min-h-screen">
      <ChatHeader
        currentPage="langgraph"
        title="LangGraph Chat"
        description="Powered by LangGraph + Anthropic Claude with Web Search"
        onClearChat={clearChat}
      />
      
      {messages.map(message => (
        <MessageBubble key={message.id} message={message} variant="langgraph" />
      ))}

      {(status === 'streaming' || status === 'submitted') && (
        <LoadingMessage variant="langgraph" />
      )}

      <ChatInput
        value={input}
        onChange={handleInputChange}
        onSubmit={handleSubmit}
        placeholder="Ask me anything - I can search the web for current information..."
        disabled={status === 'streaming' || status === 'submitted'}
        variant="langgraph"
      />
    </div>
  );
}