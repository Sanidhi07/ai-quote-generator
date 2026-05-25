import React from "react";

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`mt-6 p-2 border rounded w-full max-w-sm text-center bg-transparent outline-none transition-all duration-200 
        border-gray-300 text-slate-900 placeholder:text-gray-400
        dark:border-gray-700 dark:text-slate-100 dark:placeholder:text-gray-500
        focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500

        ${props.className}`}
    />
  );
}
