import { standarPrimaryButton, standarSecondaryButton, standarDangerButton, standarGhostButton, standarGreenButton } from "@/utils/Tokens";

interface CustomIconButtonProps {
  variant: "primary" | "secondary" | "danger" | "ghost" | "green";
  type?: "button" | "submit";
  onClick?: () => void;
  disabled?: boolean;
  icon: React.ReactNode; // Icono que se mostrará dentro del botón
  ariaLabel: string; // Texto descriptivo para accesibilidad
  className?: string; // Clases adicionales para personalización
  tooltipText?: string;
}

export default function CustomIconButton({
  variant,
  type = "button",
  onClick,
  disabled = false,
  icon,
  ariaLabel,
  className = "",
  tooltipText,
}: CustomIconButtonProps) {
  // Estilos base para el botón
  const baseStyles = "p-2 rounded-lg transition-colors duration-300 border flex items-center justify-center";

  // Estilos de variante
  const variantStyles = {
      primary: standarPrimaryButton,
      secondary: standarSecondaryButton,
      danger: standarDangerButton,
      ghost: standarGhostButton,
      green: standarGreenButton
  };

  return (
    <div className="relative group">
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            aria-label={ariaLabel}
            className={`${baseStyles} ${variantStyles[variant]} ${className}`}
        >
            {icon}
        </button>
        {tooltipText && ( // Solo renderiza el tooltip si hay texto
            <div className="absolute bottom-full mb-2 hidden group-hover:block bg-gray-800 text-white text-sm px-2 py-1 rounded">
                {tooltipText}
            </div>
        )}
    </div>
  );
}