interface ChatHeaderProps {
  currentPage: 'basic' | 'langgraph';
  title: string;
  description: string;
  onClearChat: () => void;
}

export default function ChatHeader({ currentPage, title, description, onClearChat }: ChatHeaderProps) {
  return (
    <div className="mb-6">
      {/* Navigation Bar */}
      <div className="flex justify-between items-center mb-4 pb-3 border-b border-gray-200">
        <div className="flex gap-1">
          {currentPage === 'basic' ? (
            <>
              <div className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                Basic Chat
              </div>
              <a
                href="/langgraph"
                className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded-full text-sm transition-colors"
              >
                LangGraph Chat
              </a>
            </>
          ) : (
            <>
              <a
                href="/"
                className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded-full text-sm transition-colors"
              >
                Basic Chat
              </a>
              <div className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                LangGraph Chat
              </div>
            </>
          )}
        </div>
        <button
          onClick={onClearChat}
          className="flex items-center gap-1 text-sm text-gray-500 hover:text-red-600 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
          Clear History
        </button>
      </div>
      
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
  );
}