'use client'

import { useEffect, forwardRef } from 'react';
import { UseFormSetValue, UseFormWatch } from 'react-hook-form';

interface QuantityInputProps {
    id: string;
    name: string;
    min?: number;
    max?: number;
    step?: number;
    className?: string;
    setValue: UseFormSetValue<any>;
    watch: UseFormWatch<any>;
}

const QuantityInput = forwardRef<HTMLInputElement, QuantityInputProps>(
    ({ id, name, min = 1, max = Infinity, step = 1, className = "", setValue, watch, ...props }, ref) => {
        const value = watch(name) || min; // Obtenemos el valor actual del campo

        // Registrar el valor inicial al montar el componente
        useEffect(() => {
            setValue(name, min);
        }, [name, min, setValue]);

        const handleIncrement = () => {
            const newValue = Math.min(max, value + step);
            setValue(name, newValue); // Actualizamos el valor en el formulario
        };

        const handleDecrement = () => {
            const newValue = Math.max(min, value - step);
            setValue(name, newValue); // Actualizamos el valor en el formulario
        };

        const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const numericValue = parseFloat(e.target.value);
            if (!isNaN(numericValue)) {
                const clampedValue = Math.max(min, Math.min(max, numericValue));
                setValue(name, clampedValue); // Actualizamos el valor en el formulario
            }
        };

        return (
            <div className={`flex items-center rounded-md bg-gray-200 text-gray-700 hover:shadow-lg shadow-transition duration-500 ${className}`}>
                <button
                    type="button"
                    className="size-10 leading-10 text-gray-600 transition hover:opacity-75"
                    onClick={handleDecrement}
                    disabled={value <= min}
                >
                    -
                </button>

                <input
                    type="number"
                    id={id}
                    value={value}
                    onChange={handleInputChange}
                    ref={ref}
                    className="h-10 w-16 text-center 
                    [-moz-appearance:_textfield] sm:text-sm 
                    [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none 
                    [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none bg-gray-200 text-gray-700 focus:outline-primary-400"
                    min={min}
                    max={max}
                    step={step}
                    {...props}
                />

                <button
                    type="button"
                    className="size-10 leading-10 text-gray-600 transition hover:opacity-75"
                    onClick={handleIncrement}
                    disabled={value >= max}
                >
                    +
                </button>
            </div>
        );
    }
);

QuantityInput.displayName = 'QuantityInput';

export default QuantityInput;
