import Link from "next/link";

interface SidebarProps {
  items: {
    name: string;
    href: string;
  }[];
  variant: 'primary' | 'secondary' | 'danger' | 'ghost';
}

export default function Sidebar({ items, variant }: SidebarProps) {
  const variantStyles = {
    primary: 'border-l-primary-400 text-primary-400 hover:border-l-primary-400 hover:text-primary-400',
    secondary: 'border-l-secondary-200 text-secondary-200 hover:border-l-secondary-200 hover:text-secondary-200',
    danger: 'border-l-red-500 text-red-500 hover:border-l-red-500 hover:text-red-500',
    ghost: 'border-l-white text-white hover:border-l-white hover:text-white/10'
  };

  return (
    <div className="bg-blue-900 text-white w-64 min-h-screen p-4">
      <h2 className="text-2xl font-bold mb-6">Panel de Administrador</h2>
      <ul>
        {items.map((item, index) => (
          <li key={index} className="mt-5">
            <Link 
              href={item.href}
              className={`
                block
                cursor-pointer 
                border-l-2 
                ${index === 0 ? variantStyles[variant] : 'border-transparent'} 
                px-2 
                py-2 
                font-semibold 
                transition 
                hover:${variantStyles[variant]}
              `}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
  