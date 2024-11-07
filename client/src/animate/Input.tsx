import React from 'react';
import type { LucideIcon } from "lucide-react";

interface InputProps {
  icon: LucideIcon;
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  iconClassName?: string;
}

const Input: React.FC<InputProps> = ({ icon: Icon, iconClassName, ...props }) => {
  return (
    <div className="relative mb-4">
      <Icon className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${iconClassName}`} />
      <input
        className="w-full pl-10 pr-3 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
        {...props}
      />
    </div>
  );
};

export default Input;
