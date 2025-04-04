'use client'
import { useState } from "react";
import { ArrowDown } from "@/components/atoms/ReactIcons";


interface DropdownOption {
    text: string; // Texto de la opción
    onClick: () => void; // Función al hacer clic
}

interface DropdownProps {
    buttonText: string; // Texto del botón
    options: DropdownOption[]; // Lista de opciones
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
      green: 'bg-green-800 border-green-800 text-white hover:bg-white hover:text-green-800'
    };

    const variantBackground = {
        primary: 'bg-primary-200',
        secondary: 'bg-secondary-200',
        danger: 'bg-red-500',
        ghost: 'bg-transparent',
        green: 'bg-green-800'
    }

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="relative inline-block text-left">
            {/* Botón que abre/cierra el dropdown */}
            <details
                className="cursor-pointer group"
                onToggle={toggleDropdown}
            >
                <summary
                    className={`
                        ${variantStyles[variant]}
                        flex items-center justify-between
                        w-full p-3 text-center rounded-md
                        border transition-colors duration-300
                        disabled:opacity-50 disabled:cursor-not-allowed
                        px-4 py-2
                    `}
                >
                    <span>{buttonText}</span>
                        
                    <span className={`transition-transform duration-300 group-open:-rotate-180`}>
                        <ArrowDown />
                    </span>
                </summary>

                {/* Lista desplegable */}
                {isOpen && (
                    <ul
                        className={`
                            absolute z-10 mt-2 w-64 
                            ${variantBackground[variant]}
                            rounded-md
                            block w-full py-1
                            disabled:opacity-50 disabled:cursor-not-allowed
                        `}
                    >
                        {options.map((option, index) => (
                            <li
                                key={index}
                                className={`
                                    ${variantStyles[variant]}
                                    block w-full p-3
                                    border transition-colors duration-300
                                    disabled:opacity-50 disabled:cursor-not-allowed
                                    px-4 py-2
                                `}
                                onClick={() => {
                                    option.onClick(); // Ejecuta la función personalizada
                                    setIsOpen(false); // Cierra el dropdown después de hacer clic
                                }}
                            >
                                {option.text}
                            </li>
                        ))}
                    </ul>
                )}
            </details>
        </div>
    );
}