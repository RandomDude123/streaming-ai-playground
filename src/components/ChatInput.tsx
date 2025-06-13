interface ChatInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  placeholder: string;
  disabled?: boolean;
  variant?: 'basic' | 'langgraph';
  isLoading?: boolean;
}

export default function ChatInput({ 
  value, 
  onChange, 
  onSubmit, 
  placeholder, 
  disabled = false,
  variant = 'basic',
  isLoading = false
}: ChatInputProps) {
  const focusColor = variant === 'basic' ? 'focus:ring-blue-500' : 'focus:ring-green-500';
  const spinnerColor = variant === 'basic' ? 'text-blue-500' : 'text-green-500';

  return (
    <form onSubmit={onSubmit} className="fixed bottom-0 w-full max-w-4xl px-4">
      <div className="relative mb-8">
        <input
          className={`w-full p-4 pr-12 border border-gray-300 rounded-lg shadow-lg bg-white focus:outline-none focus:ring-2 ${focusColor}`}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          disabled={disabled}
        />
        {isLoading && (
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
            <div className={`animate-spin h-5 w-5 border-2 border-gray-300 border-t-transparent rounded-full ${spinnerColor}`}></div>
          </div>
        )}
      </div>
    </form>
  );
}