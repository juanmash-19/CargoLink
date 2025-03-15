'use client';
import { useState, forwardRef } from 'react';
import { UseFormRegister } from 'react-hook-form'; // Importamos UseFormRegister

// Definimos una interfaz para las props
interface QuantityInputProps {
    id: string; // Identificador único del input
    name: string; // Nombre del campo en React Hook Form
    initialValue?: number; // Valor inicial (opcional, por defecto: 1)
    min?: number; // Valor mínimo permitido (opcional, por defecto: 1)
    max?: number; // Valor máximo permitido (opcional, por defecto: Infinity)
    step?: number; // Incremento/decremento (opcional, por defecto: 1)
    onValueChange?: (newValue: number) => void; // Función callback (opcional)
    className?: string; // Clases CSS personalizadas (opcional)
    register?: UseFormRegister<any>; // Función register de React Hook Form (opcional)
}

// Usamos forwardRef para permitir el uso de refs
const QuantityInput = forwardRef<HTMLInputElement, QuantityInputProps>(
    (
        {
            id,
            name,
            initialValue = 1,
            min = 1,
            max = Infinity,
            step = 1,
            onValueChange,
            className = "",
            register,
        },
        ref
    ) => {
        const [value, setValue] = useState(initialValue);

        // Función para incrementar el valor
        const handleIncrement = () => {
            const newValue = Math.min(max, value + step); // No superar el máximo
            setValue(newValue);
            if (onValueChange) onValueChange(newValue); // Notificar el cambio
        };

        // Función para decrementar el valor
        const handleDecrement = () => {
            const newValue = Math.max(min, value - step); // No ser menor que el mínimo
            setValue(newValue);
            if (onValueChange) onValueChange(newValue); // Notificar el cambio
        };

        // Función para manejar cambios en el input
        const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const numericValue = Number(e.target.value);
            if (!isNaN(numericValue)) {
                const newValue = Math.max(min, Math.min(max, numericValue)); // Asegurar que esté dentro del rango
                setValue(newValue);
                if (onValueChange) onValueChange(newValue); // Notificar el cambio
            }
        };

        return (
            <div className={`flex items-center rounded-md bg-gray-200 text-gray-700 hover:shadow-lg shadow-transition duration-500 ${className}`}>
                <button
                    type="button"
                    className="size-10 leading-10 text-gray-600 transition hover:opacity-75"
                    onClick={handleDecrement}
                    disabled={value <= min} // Deshabilitar si el valor es el mínimo
                >
                    -
                </button>

                <input
                    type="number"
                    id={id}
                    name={name} // Nombre del campo para React Hook Form
                    value={value}
                    onChange={handleInputChange}
                    className="h-10 w-16 text-center 
                    [-moz-appearance:_textfield] sm:text-sm 
                    [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none 
                    [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none bg-gray-200 text-gray-700 focus:outline-primary-400"
                    min={min} // Valor mínimo
                    max={max} // Valor máximo
                    step={step} // Incremento/decremento
                    ref={ref} // Ref para React Hook Form
                    {...(register && register(name))} // Aplicar register si está disponible
                />

                <button
                    type="button"
                    className="size-10 leading-10 text-gray-600 transition hover:opacity-75"
                    onClick={handleIncrement}
                    disabled={value >= max} // Deshabilitar si el valor es el máximo
                >
                    +
                </button>
            </div>
        );
    }
);

QuantityInput.displayName = 'QuantityInput'; // Asignamos un nombre al componente para debugging

export default QuantityInput;