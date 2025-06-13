'use client';

import React from 'react';
import { useChat } from '@ai-sdk/react';

export default function Chat() {
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

  return (
    <div className="flex flex-col w-full max-w-4xl pt-12 pb-24 mx-auto stretch bg-white min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Basic AI Chat</h1>
          <p className="text-sm text-gray-600">Direct Anthropic Claude streaming with Web Search</p>
        </div>
        <div className="flex gap-2">
          <a
            href="/langgraph"
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
          >
            LangGraph Chat
          </a>
          <button
            onClick={clearChat}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            Clear Chat
          </button>
        </div>
      </div>
      
      {messages.map(m => (
        <div
          key={m.id}
          className={`mb-4 p-4 rounded-lg min-w-[200px] ${
            m.role === 'user'
              ? 'bg-blue-500 text-white ml-auto max-w-[80%]'
              : 'bg-gray-100 text-gray-900 mr-auto max-w-[80%]'
          }`}
        >
          <div className="text-xs font-semibold mb-1 opacity-70">
            {m.role === 'user' ? 'You' : 'AI'}
          </div>
          <div className="whitespace-pre-wrap">{m.content}</div>
        </div>
      ))}

      <form onSubmit={handleSubmit} className="fixed bottom-0 w-full max-w-4xl px-4">
        <input
          className="w-full p-4 mb-8 border border-gray-300 rounded-lg shadow-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={input}
          placeholder="Ask me anything - I can search the web for current information..."
          onChange={handleInputChange}
        />
      </form>
    </div>
  );
}