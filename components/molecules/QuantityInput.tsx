'use client'

import { useState, forwardRef } from 'react';
import { UseFormRegister, FieldValues } from 'react-hook-form';

interface QuantityInputProps {
    id: string;
    name: string;
    initialValue?: number;
    min?: number;
    max?: number;
    step?: number;
    onValueChange?: (newValue: number) => void;
    className?: string;
    register?: UseFormRegister<FieldValues>;
}

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
        }
    ) => {
        const [value, setValue] = useState(initialValue);

        const handleIncrement = () => {
            const newValue = Math.min(max!, value + step!);
            setValue(newValue);
            onValueChange?.(newValue);
        };

        const handleDecrement = () => {
            const newValue = Math.max(min!, value - step!);
            setValue(newValue);
            onValueChange?.(newValue);
        };

        const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const numericValue = Number(e.target.value);
            if (!isNaN(numericValue)) {
                const newValue = Math.max(min!, Math.min(max!, numericValue));
                setValue(newValue);
                onValueChange?.(newValue);
            }
        };

        const registerProps = register ? register(name) : {};

        return (
            <div className={`flex items-center rounded-md bg-gray-200 text-gray-700 hover:shadow-lg shadow-transition duration-500 ${className}`}>
                <button
                    type="button"
                    className="size-10 leading-10 text-gray-600 transition hover:opacity-75"
                    onClick={handleDecrement}
                    disabled={value <= min!}
                >
                    -
                </button>

                <input
                    type="number"
                    id={id}
                    value={value}
                    onChange={handleInputChange}
                    className="h-10 w-16 text-center 
                    [-moz-appearance:_textfield] sm:text-sm 
                    [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none 
                    [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none bg-gray-200 text-gray-700 focus:outline-primary-400"
                    min={min}
                    max={max}
                    step={step}
                    {...registerProps} 
                />

                <button
                    type="button"
                    className="size-10 leading-10 text-gray-600 transition hover:opacity-75"
                    onClick={handleIncrement}
                    disabled={value >= max!}
                >
                    +
                </button>
            </div>
        );
    }
);

QuantityInput.displayName = 'QuantityInput';

export default QuantityInput;
