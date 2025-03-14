'use client';

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image"; 
import { usePathname, useRouter } from 'next/navigation';
import { standarTextLink, standarNavLink, standarNavLinkSelect } from '@/utils/Tokens';
import CustomButton from '@/components/atoms/CustomButton';
import { useAuth } from "@/utils/AuthContext";
import CargoLinkLogo from "@/components/atoms/Logo";

export default function Header() {
  const { userRole, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleUserMenu = () => setIsUserMenuOpen(!isUserMenuOpen);
  const logOutClick = () => {
    logout();
    setIsUserMenuOpen(false);
  };
  const registerClick = () => router.push('/register');
  const isLinkActive = (href: string) => pathname?.startsWith(href);

  return (
    <nav className="bg-primary-100 w-full z-20 top-0 start-0 border-b fixed">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <CargoLinkLogo />
        </Link>

        {/* Contenedor derecho: Menú y usuario */}
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          
          {userRole ? (
            <div className="relative">
              {/* Botón del usuario */}
              <button
                type="button"
                className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                aria-expanded={isUserMenuOpen}
                onClick={toggleUserMenu}
              >
                <span className="sr-only">Abrir menú de usuario</span>
                <Image 
                  src="/profile.png" 
                  alt="Foto de usuario" 
                  width={32} 
                  height={32} 
                  className="rounded-full" 
                />
              </button>

              {/* Menú de usuario */}
              <div className={`absolute right-0 z-50 bg-white rounded-lg shadow-sm dark:bg-gray-700 divide-y divide-gray-100 dark:divide-gray-600 ${isUserMenuOpen ? 'block' : 'hidden'}`}>
                <div className="px-4 py-3">
                  <span className="block text-sm text-gray-900 dark:text-white">Bonnie Green</span>
                  <span className="block text-sm text-gray-500 truncate dark:text-gray-400">name@flowbite.com</span>
                </div>
                <ul className="py-2">
                  <li><Link href="/user/profile" className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600">Perfil</Link></li>
                  <li><Link href="#" className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600">Ajustes</Link></li>
                  <li><Link href="#" className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600">Información</Link></li>
                  <li>
                    <CustomButton text='Cerrar sesión' variant='danger' type='button' onClick={logOutClick} />
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="flex flex-row">
              <CustomButton text='Registrarse' variant='secondary' type='button' onClick={registerClick} />
              <Link className={`${standarTextLink} my-auto text-sm text-primary-300`} href="/login">Iniciar Sesión</Link>
            </div>
          )}

          {/* Botón del menú hamburguesa en móviles */}
          <button 
            onClick={toggleMenu} 
            type="button" 
            className="md:hidden p-2 w-10 h-10 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:ring-2 focus:ring-gray-200"
            aria-expanded={isMenuOpen}
          >
            <span className="sr-only">Abrir menú principal</span>
            <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
            </svg>
          </button>
        </div>

        {/* Menú de navegación principal */}
        <div className={`md:flex md:w-auto md:order-1 ${isMenuOpen ? "block" : "hidden"}`} id="navbar-sticky">
          <ul className="flex flex-col md:flex-row p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-primary-100 md:space-x-8 md:mt-0 md:border-0 md:bg-primary-100">
            <li><Link href="/" className={isLinkActive('/') ? standarNavLinkSelect : standarNavLink}>Home</Link></li>
            <li><Link href="/administrator" className={isLinkActive('/administrator') ? standarNavLinkSelect : standarNavLink}>Admin</Link></li>
            <li><Link href="/services" className={isLinkActive('/services') ? standarNavLinkSelect : standarNavLink}>Services</Link></li>
            <li><Link href="/contact" className={isLinkActive('/contact') ? standarNavLinkSelect : standarNavLink}>Contact</Link></li>
          </ul>
        </div>

      </div>
    </nav>
  );
}
