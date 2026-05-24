import React from "react";

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`mt-6 p-2 border border-gray-300 rounded text-white w-64 text-center bg-transparent focus:ring-2 focus:ring-blue-500 outline-none transition-all ${props.className}`}
    />
  );
}
