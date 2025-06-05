const Card = ({ children, className = '', padding = true, shadow = true, hover = false }) => {
  return (
    <div className={`
      bg-white rounded-xl border border-gray-200 
      ${padding ? 'p-6' : ''} 
      ${shadow ? 'shadow-sm' : ''} 
      ${hover ? 'hover:shadow-md transition-shadow duration-200' : ''}
      ${className}
    `}>
      {children}
    </div>
  );
};

export default Card;