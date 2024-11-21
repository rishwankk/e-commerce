import React from 'react';

const Button = ({ children, onClick, className = '', name }) => {
  return (
    <button
      name={name}
      className={`py-2 px-4 rounded-md transition-colors duration-200 ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
