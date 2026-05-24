import React from "react";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
}

export function Select({ label, children, ...props }: SelectProps) {
  return (
    <div className="flex flex-col gap-2 mt-4">
      <label className="text-sm font-semibold text-white">{label}</label>
      <select
        {...props}
        className="p-2 border border-gray-300 rounded bg-black text-white w-64 focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer"
      >
        {children}
      </select>
    </div>
  );
}