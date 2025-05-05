'use client';
import { useState } from "react";
import { ArrowDown } from "@/components/atoms/ReactIcons";

interface DropdownOption {
  text: string;
  onClick: () => void;
}

interface DropdownProps {
  buttonText: string;
  options: DropdownOption[];
  variant: 'primary' | 'secondary' | 'danger' | 'ghost' | 'green';
}

export default function CustomDropdown({
  buttonText,
  options,
  variant,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const variantStyles = {
    primary: 'bg-primary-200 border-primary-200 text-white hover:bg-white hover:text-primary-200',
    secondary: 'bg-secondary-200 border-secondary-200 text-white hover:bg-white hover:text-secondary-200',
    danger: 'bg-red-500 border-red-500 text-white hover:bg-white hover:text-red-500',
    ghost: 'bg-transparent border-white text-white hover:bg-white/10',
    green: 'bg-green-800 border-green-800 text-white hover:bg-white hover:text-green-800',
  };

  const variantBackground = {
    primary: 'bg-primary-200',
    secondary: 'bg-secondary-200',
    danger: 'bg-red-500',
    ghost: 'bg-transparent',
    green: 'bg-green-800',
  };

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleOptionClick = (onClick: () => void) => {
    onClick();
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <button
        type="button"
        className={`
          ${variantStyles[variant]}
          flex items-center justify-between
          w-full p-3 text-center rounded-md border
          transition-colors duration-300 px-4 py-2
        `}
        onClick={toggleDropdown}
        aria-expanded={isOpen}
        data-testid="dropdown-button"
      >
        <span>{buttonText}</span>
        <span className={`transition-transform duration-300 ${isOpen ? '-rotate-180' : ''}`}>
          <ArrowDown />
        </span>
      </button>

      {isOpen && (
        <ul
          className={`
            absolute z-10 mt-2 w-64
            ${variantBackground[variant]}
            rounded-md shadow-lg py-1
          `}
          role="menu"
        >
          {options.map((option, index) => (
            <li
              key={index}
              className={`
                ${variantStyles[variant]}
                w-full px-4 py-2 cursor-pointer border
                transition-colors duration-300
              `}
              onClick={() => handleOptionClick(option.onClick)}
              role="menuitem"
              data-testid={`dropdown-option-${index}`}
            >
              {option.text}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
