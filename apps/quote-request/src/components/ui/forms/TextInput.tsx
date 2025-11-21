import React from 'react';

interface TextInputProps {
  type?: 'text' | 'email' | 'tel' | 'number';
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  required?: boolean;
  icon?: React.ComponentType<{ className?: string }>;
  disabled?: boolean;
  min?: string | number;
  className?: string;
}

function TextInput({
  type = 'text',
  value,
  onChange,
  placeholder,
  label,
  required = false,
  icon: IconComponent,
  disabled = false,
  min,
  className = '',
}: TextInputProps) {
  return (
    <div>
      {label && (
        <label className="block text-sm font-semibold text-gray-900 mb-2">
          {label} {required && <span className="text-red-600">*</span>}
        </label>
      )}
      <div className="relative">
        {IconComponent && (
          <IconComponent className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
        )}
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          min={min}
          className={`w-full ${IconComponent ? 'pl-10' : 'pl-4'} pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed ${className}`}
        />
      </div>
    </div>
  );
}

export default TextInput;
