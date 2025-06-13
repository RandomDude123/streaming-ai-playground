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
  const toolBgColor = variant === 'basic' 
    ? 'bg-blue-50 border-l-4 border-blue-300' 
    : 'bg-green-50 border-l-4 border-green-300';

  // Handle user messages first
  if (message.role === 'user') {
    return (
      <div
        className={`mb-4 p-4 rounded-lg min-w-[200px] max-w-[80%] ${userBgColor}`}
      >
        <div className="text-xs font-semibold mb-1 opacity-70">
          You
        </div>
        <div className="whitespace-pre-wrap">{message.content}</div>
      </div>
    );
  }

  // If assistant message has parts, render them separately for better UX
  if (message.role === 'assistant' && message.parts && message.parts.length > 0) {
    return (
      <div className="mb-4 space-y-2">
        {message.parts.map((part, index) => {
          if (part.type === 'text') {
            return (
              <div
                key={index}
                className={`p-4 rounded-lg min-w-[200px] max-w-[80%] ${assistantBgColor}`}
              >
                <div className="text-xs font-semibold mb-1 opacity-70">
                  {assistantLabel}
                </div>
                <div className="whitespace-pre-wrap">{part.text}</div>
              </div>
            );
          }
          
          if (part.type === 'tool-invocation') {
            const toolInvocation = part.toolInvocation;
            
            if (toolInvocation.state === 'call') {
              return (
                <div
                  key={index}
                  className={`p-3 rounded-lg max-w-[80%] mr-auto ${toolBgColor}`}
                >
                  <div className="text-xs font-semibold mb-1 opacity-70">
                    🔍 Tool: {toolInvocation.toolName}
                  </div>
                  <div className="text-sm text-gray-600">
                    Searching for: {JSON.stringify(toolInvocation.args)}
                  </div>
                </div>
              );
            }
            
            if (toolInvocation.state === 'result' && toolInvocation.result) {
              return (
                <div
                  key={index}
                  className={`p-3 rounded-lg max-w-[80%] mr-auto ${toolBgColor}`}
                >
                  <div className="text-xs font-semibold mb-1 opacity-70">
                    ✅ Search Results
                  </div>
                  <div className="text-sm text-gray-600">
                    Found {Array.isArray(toolInvocation.result?.results) ? toolInvocation.result.results.length : 0} results
                  </div>
                </div>
              );
            }
          }
          
          return null;
        })}
      </div>
    );
  }

  // Default rendering for assistant messages without parts
  return (
    <div
      className={`mb-4 p-4 rounded-lg min-w-[200px] max-w-[80%] ${assistantBgColor}`}
    >
      <div className="text-xs font-semibold mb-1 opacity-70">
        {assistantLabel}
      </div>
      <div className="whitespace-pre-wrap">{message.content}</div>
    </div>
  );
}