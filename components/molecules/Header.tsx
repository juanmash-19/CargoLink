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
  const router = useRouter();
  const pathname = usePathname();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const logOutClick = () => {
    logout();
  };
  const registerClick = () => router.push('/register');
  const isLinkActive = (href: string) => pathname?.startsWith(href);

  const navItems: { href: string; label: string }[] = [
    { href: "/", label: "Home" },
    { href: "/admin", label: "Admin" },
    { href: "/services", label: "Services" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav className="bg-primary-100 w-full z-20 top-0 start-0 border-b fixed">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <CargoLinkLogo />
        </Link>

        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          {userRole ? (
            <CustomButton text='Cerrar sesión' variant='danger' type='button' onClick={logOutClick} />
          ) : (
            <div className="flex flex-row">
              <CustomButton text='Registrarse' variant='secondary' type='button' onClick={registerClick} />
              <Link className={`${standarTextLink} my-auto text-sm text-primary-300`} href="/login">Iniciar Sesión</Link>
            </div>
          )}
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

        <div className={`md:flex md:w-auto md:order-1 ${isMenuOpen ? "block" : "hidden"}`} id="navbar-sticky">
          <ul className="flex flex-col md:flex-row p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-primary-100 md:space-x-8 md:mt-0 md:border-0 md:bg-primary-100">
            {navItems.map(({ href, label }) => (
              <li key={href}>
                <Link href={href} className={isLinkActive(href) ? standarNavLinkSelect : standarNavLink}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}