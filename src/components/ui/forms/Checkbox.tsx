
interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  description?: string;
  disabled?: boolean;
  className?: string;
  id?: string;
}

function Checkbox({
  checked,
  onChange,
  label,
  description,
  disabled = false,
  className = '',
  id,
}: CheckboxProps) {
  return (
    <label htmlFor={id} className={`flex items-start space-x-3 cursor-pointer ${disabled ? 'opacity-60 cursor-not-allowed' : ''} ${className}`}>
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        disabled={disabled}
        className="w-5 h-5 text-red-600 border-gray-300 rounded focus:ring-red-500 mt-0.5 disabled:cursor-not-allowed"
      />
      <div className="flex-1">
        {label && (
          <span className="text-gray-900 font-medium block">
            {label}
          </span>
        )}
        {description && (
          <span className="text-sm text-gray-600 block mt-0.5">
            {description}
          </span>
        )}
      </div>
    </label>
  );
}

export default Checkbox;
