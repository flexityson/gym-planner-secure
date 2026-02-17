import React, { useState, useRef, useEffect } from 'react';

export interface OptionItem {
  id: string;
  label: string;
  icon?: string;
}

interface OptionPickerProps {
  label: string;
  value: string | string[];
  options: OptionItem[];
  onChange: (value: string | string[]) => void;
  multi?: boolean;
  placeholder?: string;
  className?: string;
}

const OptionPicker: React.FC<OptionPickerProps> = ({
  label,
  value,
  options,
  onChange,
  multi = false,
  placeholder = 'Choose…',
  className = '',
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selected = Array.isArray(value) ? value : value ? [value] : [];
  const displayLabel = Array.isArray(value)
    ? selected.length
      ? options.filter((o) => selected.includes(o.id)).map((o) => o.label).join(', ')
      : placeholder
    : options.find((o) => o.id === value)?.label ?? placeholder;

  const handleSelect = (id: string) => {
    if (multi) {
      const next = selected.includes(id)
        ? selected.filter((s) => s !== id)
        : [...selected, id];
      onChange(next);
    } else {
      onChange(id);
      setOpen(false);
    }
  };

  return (
    <div className={`option-picker ${className}`} ref={ref}>
      <button
        type="button"
        className="option-picker-trigger"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        <span className="option-picker-label">{label}</span>
        <span className="option-picker-value">{displayLabel}</span>
        <i className={`fas fa-chevron-down option-picker-chevron ${open ? 'open' : ''}`}></i>
      </button>
      {open && (
        <div className="option-picker-dropdown" role="listbox">
          {options.map((opt) => {
            const isSelected = selected.includes(opt.id);
            return (
              <button
                key={opt.id}
                type="button"
                role="option"
                aria-selected={isSelected}
                className={`option-picker-option ${isSelected ? 'selected' : ''}`}
                onClick={() => handleSelect(opt.id)}
              >
                {opt.icon && <i className={opt.icon}></i>}
                <span>{opt.label}</span>
                {multi && isSelected && <i className="fas fa-check"></i>}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default OptionPicker;
