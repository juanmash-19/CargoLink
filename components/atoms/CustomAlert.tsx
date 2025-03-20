interface CustomAlertProps {
    title: string;
    message: string;
    variant: 'success' | 'error';
    onClose: () => void;
  }
  
  export default function CustomAlert({
    title,
    message,
    variant,
    onClose,
  }: CustomAlertProps) {
    const alertVariantStyles = {
      success: 'bg-green-100 border-green-400 text-green-800',
      error: 'bg-red-100 border-red-400 text-red-800',
    };
  
    return (
      <div
        className={`${alertVariantStyles[variant]} border-l-4 p-4 rounded-lg relative`}
        role="alert"
      >
        <div className="flex flex-col">
          <h3 className="font-bold text-lg mb-1">{title}</h3>
          <p className="text-sm">{message}</p>
        </div>
        <button
          onClick={onClose}
          className="absolute top-3 right-3 hover:opacity-75 transition-opacity"
          aria-label="Close alert"
        >
          <svg
            className={`w-5 h-5 ${variant === 'success' ? 'text-green-800' : 'text-red-800'}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    );
  }