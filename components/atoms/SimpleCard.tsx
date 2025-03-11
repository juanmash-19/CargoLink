interface SimpleCardProps {
  title: string;
  value: string;
  variant: 'primary' | 'secondary' | 'danger' | 'ghost';
  icon: string;
  onClick?: () => void;
}

export default function SimpleCard({
  title,
  value,
  variant,
  icon,
  onClick
}: SimpleCardProps) {
  const variantStyles = {
    primary: 'bg-primary-100 border-primary-400 text-white hover:bg-primary-200',
    secondary: 'bg-secondary-200 border-secondary-200 text-white hover:bg-secondary-300',
    danger: 'bg-red-500 border-red-500 text-white hover:bg-red-600',
    ghost: 'bg-transparent border-white text-white hover:bg-white/10'
  };

  return (
    <div
      className={`
        ${variantStyles[variant]}
        p-4 
        rounded-lg 
        shadow-md 
        flex 
        items-center 
        justify-between 
        cursor-pointer
        transition-colors
        duration-200
        border
      `}
      onClick={onClick}
    >
      <div>
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-2xl font-bold">{value}</p>
      </div>
      <div className="text-3xl">{icon}</div>
    </div>
  );
}
