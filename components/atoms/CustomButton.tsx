interface CustomButtonProps {
  text: string;
  color: 'primary' | 'secondary-200' | 'danger';
  typeButton?: 'button' | 'submit';
  onClickButton: () => void;
}

const colorClasses = {
  primary: {
    bg: 'bg-primary', // Clase para el fondo
    border: 'border-primary', // Clase para el borde
    text: 'text-primary', // Clase para el texto
  },
  'secondary-200': {
    bg: 'bg-secondary-200',
    border: 'border-secondary-200',
    text: 'text-secondary-200',
  },
  danger: {
    bg: 'bg-danger',
    border: 'border-danger',
    text: 'text-danger',
  },
};

export default function CustomButton({ text, color, onClickButton, typeButton }: CustomButtonProps) {
  const { bg, border, text: textColor } = colorClasses[color];

  return (
    <button
      className={`
        ${bg}
        border
        block w-full p-3 text-center rounded-lg text-white 
        hover:bg-white 
        hover:${border} 
        hover:${textColor}
        transition-colors duration-500
      `}
      type={typeButton || 'button'}
      onClick={onClickButton}
    >
      {text}
    </button>
  );
}