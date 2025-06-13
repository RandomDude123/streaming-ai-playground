interface LoadingMessageProps {
  variant?: 'basic' | 'langgraph';
}

export default function LoadingMessage({ variant = 'basic' }: LoadingMessageProps) {
  const bgColor = variant === 'basic' ? 'bg-gray-100' : 'bg-green-100';
  const label = variant === 'basic' ? 'AI' : 'LangGraph Agent';

  return (
    <div className={`mb-4 p-4 rounded-lg min-w-[200px] ${bgColor} text-gray-900 mr-auto max-w-[80%]`}>
      <div className="text-xs font-semibold mb-1 opacity-70">
        {label}
      </div>
      <div className="text-gray-600">Processing...</div>
    </div>
  );
}