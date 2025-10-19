interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
}

export function Switch({ checked, onChange, label }: SwitchProps) {
  return (
    <label className="flex items-center cursor-pointer">
      <div className="relative">
        <input
          type="checkbox"
          className="sr-only"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
        />
        <div
          className={`block w-14 h-8 rounded-full transition-colors ${
            checked ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'
          }`}
        />
        <div
          className={`absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform ${
            checked ? 'transform translate-x-6' : ''
          }`}
        />
      </div>
      {label && <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-100">{label}</span>}
    </label>
  );
}
