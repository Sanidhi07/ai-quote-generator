import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
}

export function Button({ children, isLoading, className,...props}: ButtonProps) {
  return (
    <button
      disabled={isLoading || props.disabled}
      className={`mt-4 px-4 py-2 text-white rounded transition-all duration-200 ${
        isLoading ? "bg-gray-600 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600 active:scale-95"
      } ${className}`}
      {...props}
    >
      {isLoading ? "Generating..." : children}
    </button>
  );
}