const Alert = ({ type = 'info', message, onClose, className = '' }) => {
  const types = {
    success: 'bg-green-50 text-green-700 border-green-200',
    error: 'bg-red-50 text-red-700 border-red-200',
    warning: 'bg-yellow-50 text-yellow-700 border-yellow-200',
    info: 'bg-blue-50 text-blue-700 border-blue-200'
  };

  return (
    <div className={`p-4 rounded-lg border flex items-center justify-between ${types[type]} ${className}`}>
      <span className="text-sm font-medium">{message}</span>
      {onClose && (
        <button
          onClick={onClose}
          className="ml-4 text-current hover:opacity-70 transition-opacity"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
};


export default Alert;