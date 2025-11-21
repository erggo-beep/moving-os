
interface TextAreaProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  required?: boolean;
  rows?: number;
  disabled?: boolean;
  className?: string;
}

function TextArea({
  value,
  onChange,
  placeholder,
  label,
  required = false,
  rows = 4,
  disabled = false,
  className = '',
}: TextAreaProps) {
  return (
    <div>
      {label && (
        <label className="block text-sm font-semibold text-gray-900 mb-2">
          {label} {required && <span className="text-red-600">*</span>}
        </label>
      )}
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        disabled={disabled}
        className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none disabled:bg-gray-100 disabled:cursor-not-allowed ${className}`}
      />
    </div>
  );
}

export default TextArea;
