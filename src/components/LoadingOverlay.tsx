interface LoadingOverlayProps {
  message: string;
  color?: 'blue' | 'green';
}

export default function LoadingOverlay({ message, color = 'blue' }: LoadingOverlayProps) {
  const borderColor = color === 'blue' ? 'border-blue-500' : 'border-green-500';

  return (
    <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
      <div className="text-center">
        <div className={`animate-spin rounded-full h-12 w-12 border-b-2 ${borderColor} mx-auto mb-4`}></div>
        <p className="text-gray-600">{message}</p>
      </div>
    </div>
  );
}