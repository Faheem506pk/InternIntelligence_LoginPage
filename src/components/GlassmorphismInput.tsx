import React from "react";

interface GlassmorphismInputProps {
  label: string;
  type?: string;
  name: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const GlassmorphismInput: React.FC<GlassmorphismInputProps> = ({
  label,
  type = "text",
  name,
  value,
  onChange,
}) => {
  return (
    <div className="relative w-full mb-8">
      {/* Floating Label */}
      <label
        className={`absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-700 transition-all ${
          value
            ? "-top-4 left-2 text-md font-semibold text-blue-500 "
            : "text-gray-500"
        }`}
      >
        {label}
      </label>

      {/* Input Field */}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full px-4 pt-5 pb-2 bg-white/20 backdrop-blur-md border border-white/50 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
        placeholder=" " // Keeps the label floating effect
      />
    </div>
  );
};

export default GlassmorphismInput;
