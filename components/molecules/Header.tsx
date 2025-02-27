'use client';

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from 'next/navigation';
import { standarTextLink, standarNavLink, standarNavLinkSelect } from '@/utils/Tokens';
import CustomButton from '@/components/atoms/CustomButton';
import { useRouter } from "next/navigation";
import { useAuth } from "@/utils/AuthContext";
import logo from "../atoms/logo";

export default function Header() {
  const { userRole, logout } = useAuth();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const router = useRouter();

  const pathname = usePathname();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const registerClick = () => {
    router.push('/register')
  };
  
  const isLinkActive = (href: string) => {
    return pathname === href;
  };

  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const logOutClick = () => {
    logout();
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
          {userRole ? (
            <div className="relative">
              <button
                type="button"
                className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                id="user-menu-button"
                aria-expanded={isUserMenuOpen}
                onClick={toggleUserMenu}
              >
                <span className="sr-only">Open user menu</span>
                <img className="w-8 h-8 rounded-full" src="profile.png" alt="user photo" />
              </button>

              <div
                className={`z-50 ${
                  isUserMenuOpen ? 'block' : 'hidden'
                } my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow-sm dark:bg-gray-700 dark:divide-gray-600 absolute right-0`}
                id="user-dropdown"
              >
                <div className="px-4 py-3">
                  <span className="block text-sm text-gray-900 dark:text-white">Bonnie Green</span>
                  <span className="block text-sm text-gray-500 truncate dark:text-gray-400">name@flowbite.com</span>
                </div>
                <ul className="py-2" aria-labelledby="user-menu-button">
                  <li>
                    <Link href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                      Settings
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                      Earnings
                    </Link>
                  </li>
                  <li>
                    <CustomButton 
                            text='Sign out'
                            variant='secondary'
                            type='button'
                            onClick={logOutClick}
                            />
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="flex flex-row">
              <div className="mx-0 text-xs">
                <CustomButton 
                            text='Registrarse'
                            variant='secondary'
                            type='button'
                            onClick={registerClick}
                            />
              </div>
              <Link className={`${standarTextLink} my-auto text-sm text-primary-300`} rel="noopener noreferrer" href="/login">
              Iniciar Sesión
              </Link>
            </div>
          )}
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
                className={`${isLinkActive('/') ? standarNavLinkSelect : standarNavLink}`}
                aria-current="page"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/administrator"
                className={`${isLinkActive('/administrator') ? standarNavLinkSelect : standarNavLink}`}
              >
                Admin
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className={`${isLinkActive('/services') ? standarNavLinkSelect : standarNavLink}`}
              >
                Services
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className={`${isLinkActive('/contact') ? standarNavLinkSelect : standarNavLink}`}
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
