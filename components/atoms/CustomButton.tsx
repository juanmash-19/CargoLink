// import { link } from "fs";

interface CustomButtonProps {
  text: string;
  variant: 'primary' | 'secondary' | 'danger' | 'ghost' | 'green';
  type?: 'button' | 'submit';
  onClick?: () => void;
  disabled?: boolean;
  // href?: string;
  // typeButton?: Boolean;
}

export default function CustomButton({
  text,
  variant,
  type = 'button',
  onClick,
  disabled = false,
  // href = '',
  // typeButton = false,
}: CustomButtonProps) {
  const variantStyles = {
    primary: 'bg-primary-200 border-primary-200 text-white hover:bg-transparent hover:text-primary-200',
    secondary: 'bg-secondary-200 border-secondary-200 text-white hover:bg-transparent hover:text-secondary-200',
    danger: 'bg-red-500 border-red-500 text-white hover:bg-transparent hover:text-red-500',
    ghost: 'bg-transparent border-white text-white hover:bg-white/10',
    green: 'bg-green-800 border-green-800 text-white hover:bg-transparent hover:text-green-800'
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

    // typeButton?
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
    >
      {text}
    </button>
  );
}