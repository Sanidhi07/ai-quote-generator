import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  variant?: "default" | "ghost" | "outline"; // Add the variant property
  size?: "default" | "icon";                 // Add the size property
}

export function Button({ 
  children, 
  isLoading, 
  className, 
  variant = "default", // Default to your blue button
  size = "default",
  ...props 
}: ButtonProps) {
  
  // Define our styles based on the variant
  const variants = {
    default: "bg-blue-500 hover:bg-blue-600 text-white",
    ghost: "bg-transparent hover:bg-gray-200 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300",
    outline: "bg-transparent border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"
  };

  const sizes = {
    default: "px-4 py-2",
    icon: "p-2" // Square padding for the theme toggle icon
  };

  return (
    <button
      disabled={isLoading || props.disabled}
      className={`
        transition-all duration-200 rounded flex items-center justify-center
        ${isLoading ? "opacity-50 cursor-not-allowed" : "active:scale-95"}
        ${variants[variant]} 
        ${sizes[size]}
        ${className}
      `}
      {...props}
    >
      {isLoading ? "Generating..." : children}
    </button>
  );
}