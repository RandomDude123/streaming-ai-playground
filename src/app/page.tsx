'use client';

import { useChat } from 'ai/react';

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  return (
    <div className="flex flex-col w-full max-w-4xl py-24 mx-auto stretch">
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
          className="w-full p-4 mb-8 border border-gray-300 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={input}
          placeholder="Type your message..."
          onChange={handleInputChange}
        />
      </form>
    </div>
  );
}