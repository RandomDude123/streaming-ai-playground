import { Message } from '@ai-sdk/react';

interface MessageBubbleProps {
  message: Message;
  variant?: 'basic' | 'langgraph';
}

export default function MessageBubble({ message, variant = 'basic' }: MessageBubbleProps) {
  const userBgColor = 'bg-blue-500 text-white ml-auto';
  const assistantBgColor = variant === 'basic' 
    ? 'bg-gray-100 text-gray-900 mr-auto' 
    : 'bg-green-100 text-gray-900 mr-auto';
  
  const assistantLabel = variant === 'basic' ? 'AI' : 'LangGraph Agent';

  return (
    <div
      className={`mb-4 p-4 rounded-lg min-w-[200px] max-w-[80%] ${
        message.role === 'user' ? userBgColor : assistantBgColor
      }`}
    >
      <div className="text-xs font-semibold mb-1 opacity-70">
        {message.role === 'user' ? 'You' : assistantLabel}
      </div>
      <div className="whitespace-pre-wrap">{message.content}</div>
    </div>
  );
}