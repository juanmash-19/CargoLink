'use client';

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { standarTextLink, standarNavLink, standarNavLinkSelect } from '@/utils/Tokens';
import CustomButton from '@/components/atoms/CustomButton';
import { useRouter } from "next/navigation";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const router = useRouter();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const registerClick = () => {
    router.push('/register')
  };

  return (
    <nav className="bg-primary-100 w-full z-20 top-0 start-0 border-b fixed">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link href="/#" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap bg-[#D9D9D9] p-1 rounded-[10px]">
            <span className="text-orange-600">Cargo</span>
            <span className="text-blue-600">Link</span>
          </span>
        </Link>
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <div className="mx-10 text-xs">
            <CustomButton 
                        text='Registrarse'
                        variant='secondary'
                        type='button'
                        onClick={registerClick}
                        />
          </div>
          <Link className={`${standarTextLink} my-auto text-sm text-primary-300`} rel="noopener noreferrer" href="/login">Iniciar Sesión</Link>
          <button
            onClick={toggleMenu}
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
            aria-controls="navbar-sticky"
            aria-expanded={isMenuOpen}
          >
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
        <div
          className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${
            isMenuOpen ? "block" : "hidden"
          }`}
          id="navbar-sticky"
        >
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-primary-100 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-primary-100">
            <li>
              <Link
                href="/"
                className={`${standarNavLinkSelect}`}
                aria-current="page"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className={`${standarNavLink}`}
              >
                Ejemplo
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className={`${standarNavLink}`}
              >
                Services
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className={`${standarNavLink}`}
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}