import React, { useState } from "react";
import { User, Lock } from "lucide-react";

interface GlassmorphismInputProps {
  label: string;
  type?: string;
  name: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  icon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const GlassmorphismInput: React.FC<GlassmorphismInputProps> = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  icon,
  rightIcon,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const isActive = isFocused || value.length > 0;
  
  return (
    <div className="relative mb-6 group">
      {/* Container with border */}
      <div className={`absolute inset-0 rounded-lg border border-white/50 ${isFocused ? 'border-blue-500' : ''} transition-colors`}></div>
      
      {/* Border gap for label when active */}
      {isActive && (
        <div className="absolute top-0 left-3 right-0 h-px">
          <div className="absolute left-0 w-2 h-px bg-white/50"></div>
          <div className="absolute h-px bg-white/5 px-2">
            <span className="opacity-0">{label}</span>
          </div>
          <div className={`absolute left-0 right-0 h-px bg-white/50 ${isFocused ? 'bg-blue-500' : ''} transition-colors`}
               style={{ left: `calc(${label.length * 0.5}rem + 1rem)` }}></div>
        </div>
      )}
      
      {/* Input field - no border of its own */}
      <div className="relative flex items-center">
        {icon && <span className="absolute left-3 text-gray-400">{icon}</span>}
        <input
          type={type}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`relative z-10 block w-full h-12 px-4 pt-1 pb-1 bg-white/20 backdrop-blur-md rounded-lg text-gray-900 appearance-none focus:outline-none border-0 focus:ring-0 ${icon ? 'pl-10' : 'pl-4'} ${rightIcon ? 'pr-10' : 'pr-4'}`}
          placeholder=" "
        />
        {rightIcon && (
          <div className="absolute right-3 z-20 text-gray-400">
            {rightIcon}
          </div>
        )}
      </div>
      
      {/* Label */}
      <label
        htmlFor={name}
        className={`absolute z-20 px-1 transition-all duration-200 ${
          isActive
            ? 'text-xs -top-2 left-3 rounded-md bg-black/5 backdrop-blur-md text-blue-600'
            : 'text-gray-500 top-3 left-8'
        }`}
      >
        {label}
      </label>
    </div>
  );
};

export default GlassmorphismInput;