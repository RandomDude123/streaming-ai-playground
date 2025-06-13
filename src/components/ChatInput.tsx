interface ChatInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  placeholder: string;
  disabled?: boolean;
  variant?: 'basic' | 'langgraph';
}

export default function ChatInput({ 
  value, 
  onChange, 
  onSubmit, 
  placeholder, 
  disabled = false,
  variant = 'basic' 
}: ChatInputProps) {
  const focusColor = variant === 'basic' ? 'focus:ring-blue-500' : 'focus:ring-green-500';

  return (
    <form onSubmit={onSubmit} className="fixed bottom-0 w-full max-w-4xl px-4">
      <input
        className={`w-full p-4 mb-8 border border-gray-300 rounded-lg shadow-lg bg-white focus:outline-none focus:ring-2 ${focusColor}`}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        disabled={disabled}
      />
    </form>
  );
}