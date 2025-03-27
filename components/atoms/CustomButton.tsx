// import { link } from "fs";

import { standarPrimaryButton, standarSecondaryButton, standarDangerButton, standarGhostButton, standarGreenButton } from "@/utils/Tokens";

interface CustomButtonProps {
  text: string;
  variant: 'primary' | 'secondary' | 'danger' | 'ghost' | 'green';
  type?: 'button' | 'submit';
  onClick?: () => void;
  disabled?: boolean;
  extraAttributes?: { [key: string]: string };
  tooltipText?: string;
}

export default function CustomButton({
  text,
  variant,
  type = 'button',
  onClick,
  disabled = false,
  extraAttributes = {},
  tooltipText,
}: CustomButtonProps) {
  const variantStyles = {
    primary: standarPrimaryButton,
    secondary: standarSecondaryButton,
    danger: standarDangerButton,
    ghost: standarGhostButton,
    green: standarGreenButton
  };

  // const buttonType = typeButton ? 'submit' : 'button';

  // if (href) {
  //   return (
  //     <Link href={href}>
  //       <a
  //         className={`
  //           ${variantStyles[variant]}
  //           block w-full p-3 text-center rounded-lg
  //           border transition-colors duration-300
  //           disabled:opacity-50 disabled:cursor-not-allowed
  //         `}
  //       >
  //         {text}
  //       </a>
  //     </Link>
  //   );
  // }

  return (

    <div className="relative group">
      <button
        className={`
          ${variantStyles[variant]}
          block w-full p-3 text-center rounded-lg
          border transition-colors duration-300
          disabled:opacity-50 disabled:cursor-not-allowed
        `}
        type={type}
        onClick={onClick}
        disabled={disabled}
        aria-label={text}
        {...extraAttributes}
      >
        {text}
      </button>
      {tooltipText && ( // Solo renderiza el tooltip si hay texto
          <div className="absolute bottom-full mb-2 hidden group-hover:block bg-gray-800 text-white text-sm px-2 py-1 rounded">
              {tooltipText}
          </div>
      )}
    </div>
  );
}