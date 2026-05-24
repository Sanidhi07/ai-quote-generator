import React from "react";

export function Card({ children, className="" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`mt-10 p-8 max-w-lg bg-[#111111] border-2 border-purple-400 rounded-2xl shadow-xl text-center transform transition-all animate-in fade-in zoom-in duration-500 ${className}`}>
      {children}
    </div>
  );
}