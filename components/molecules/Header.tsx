'use client';

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image"; 
import { usePathname, useRouter } from 'next/navigation';
import { standarTextLink, standarNavLink, standarNavLinkSelect } from '@/utils/Tokens';
import CustomButton from '@/components/atoms/CustomButton';
import { useAuth } from "@/utils/AuthContext";
import CargoLinkLogo from "@/components/atoms/Logo";
import { ArrowDown } from "../atoms/ReactIcons";
import { useTranslations } from "next-intl";

export default function Header() {
  const { userRole, userEmail, userName, userLastname, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isShipmentMenuOpen, setIsShipmentMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleUserMenu = () => setIsUserMenuOpen(!isUserMenuOpen);
  const toggleShipmentMenu = () => setIsShipmentMenuOpen(!isShipmentMenuOpen);
  const logOutClick = () => {
    logout();
    setIsUserMenuOpen(false);
  };
  const registerClick = () => router.push('/register');

  const isLinkActive = (path: string, exact: boolean = false) => {
    if (exact) {
      return pathname === path; // Comparación exacta
    } else {
      return pathname.startsWith(path); // Comparación para subrutas
    }
  };

  console.log("User Role:", userRole); // Verificar el rol en consola
  console.log("User Email:", userEmail); // Verificar el email en consola
  console.log("User Name:", userName); // Verificar el nombre en consola
  console.log("User Lastname:", userLastname); // Verificar el apellido en consola

  return (
    <nav className="bg-primary-100 w-full z-20 top-0 start-0 border-b fixed">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-2">
        
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse my-3">
          <CargoLinkLogo />
        </Link>

        {/* Contenedor derecho: Menú y usuario */}
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          {userRole ? (
            <div className="relative">
              {/* Botón del usuario */}
              <button
                type="button"
                className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300"
                aria-expanded={isUserMenuOpen}
                onClick={toggleUserMenu}
              >
                <span className="sr-only">{t('header.openUserMenu')}</span>
                <Image 
                  src="/profile.png" 
                  alt={t('header.userImageAlt')} 
                  width={32} 
                  height={32} 
                  className="rounded-full" 
                />
              </button>

              {/* Menú de usuario */}
              <div className={`absolute right-0 z-50 bg-white rounded-lg shadow-sm divide-gray-100 ${isUserMenuOpen ? 'block' : 'hidden'}`}>
                <div className="px-4 py-3">
                  <span className="block text-sm text-gray-900 ">{userName} {userLastname}</span>
                  <span className="block text-sm text-gray-500 truncate">{userEmail}</span>
                </div>
                <ul className="pt-2 text-gray-500">
                  <li><Link href="/user/profile" className="block px-4 py-2 text-sm hover:bg-gray-100">{t('header.profile')}</Link></li>
                  <li><Link href="#" className="block px-4 py-2 text-sm hover:bg-gray-100">{t('header.settings')}</Link></li>
                  <li><Link href="#" className="block px-4 py-2 text-sm hover:bg-gray-100">{t('header.information')}</Link></li>
                  <li>
                    <CustomButton text={t('header.logout')} variant='danger' type='button' onClick={logOutClick} />
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="flex flex-row">
              <CustomButton text={t('header.register')} variant='secondary' type='button' onClick={registerClick} />
              <Link className={`${isLinkActive('/login', true) ? standarNavLinkSelect : standarNavLink} my-auto text-sm text-white ml-4`} href="/login">{t('header.login')}</Link>
            </div>
          )}

          <button 
            onClick={toggleMenu} 
            type="button" 
            className="md:hidden p-2 w-10 h-10 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:ring-2 focus:ring-gray-200"
            aria-expanded={isMenuOpen}
          >
            <span className="sr-only">{t('header.openMainMenu')}</span>
            <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
            </svg>
          </button>
        </div>

        {/* Menú de navegación principal basado en el rol */}
        <div className={`md:flex md:w-auto md:order-1 ${isMenuOpen ? "block" : "hidden"}`} id="navbar-sticky">
          <ul className="flex flex-col md:flex-row p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-primary-100 md:space-x-8 md:mt-0 md:border-0 md:bg-primary-100">

            {/*Seccion para usuarios no logueados*/}
            {userRole === null &&(
              <>
                <li><Link href="/" className={isLinkActive('/', true) ? standarNavLinkSelect : standarNavLink}>{t('header.home')}</Link></li>
                <li><Link href="#about-section" className={isLinkActive('/services') ? standarNavLinkSelect : standarNavLink}>{t('header.services')}</Link></li>
                <li><Link href="#what-are" className={isLinkActive('/services') ? standarNavLinkSelect : standarNavLink}>{t('header.whatWeAre')}</Link></li>
                <li><Link href="#about-us" className={isLinkActive('/us') ? standarNavLinkSelect : standarNavLink}>{t('header.aboutUs')}</Link></li>
              </>
            )}
            
            {/*Seccion para usuarios logueados*/}
            {userRole === 'admin' && (
              <>
                <li><Link href="/admin" className={isLinkActive('/admin', true) ? standarNavLinkSelect : standarNavLink}>{t('header.adminDashboard')}</Link></li>
                <li>
                  <details className="group [&_summary::-webkit-details-marker]:hidden">
                    <summary
                      className={`${isLinkActive('/admin') ? standarNavLinkSelect : standarNavLink} flex cursor-pointer items-center justify-between`}
                    >
                      <span>{t('header.adminSection')}</span>

                      <span className="transition-transform duration-300 group-open:-rotate-180">
                        <ArrowDown />
                      </span>
                    </summary>

                    <ul className="absolute mx-auto mt-2 space-y-1 bg-primary-100 pb-2 px-3 rounded-lg">
                      <li>
                        <Link 
                          href="/admin/users" 
                          className={isLinkActive('/admin/users') ? standarNavLinkSelect : standarNavLink}>
                          {t('header.manageUsers')}
                        </Link>
                      </li>

                      <li>
                        <Link 
                          href="/admin/shipments" 
                          className={isLinkActive('/admin/shipments') ? standarNavLinkSelect : standarNavLink}>
                          {t('header.manageShipments')}
                        </Link>
                      </li>
                    </ul>
                  </details>
                </li>
              </>
            )}

            {userRole === 'transporter' && (
              <>
                <li><Link href="/transporter" className={isLinkActive('/transporter', true) ? standarNavLinkSelect : standarNavLink}>{t('header.transporterDashboard')}</Link></li>
                <li>
                  <details className="group [&_summary::-webkit-details-marker]:hidden">
                    <summary
                      className={`${isLinkActive('/transporter/shipments') ? standarNavLinkSelect : standarNavLink} flex cursor-pointer items-center justify-between`}
                    >
                      <span>{t('header.transporterShipments')}</span>
                      <span className="transition-transform duration-300 group-open:-rotate-180">
                        <ArrowDown />
                      </span>
                    </summary>
                    <ul className="absolute mx-auto mt-2 space-y-1 bg-primary-100 pb-2 px-3 rounded-lg">
                      <li>
                        <Link 
                          href="/transporter/shipments/available" 
                          className={isLinkActive('/transporter/shipments/available') ? standarNavLinkSelect : standarNavLink}>
                          {t('header.availableShipments')}
                        </Link>
                      </li>
                      <li>
                        <Link 
                          href="/transporter/shipments/actives" 
                          className={isLinkActive('/transporter/shipments/actives') ? standarNavLinkSelect : standarNavLink}>
                          {t('header.activeShipments')}
                        </Link>
                      </li>
                      <li>
                        <Link 
                          href="/transporter/shipments/all" 
                          className={isLinkActive('/transporter/shipments/all') ? standarNavLinkSelect : standarNavLink}>
                          {t('header.allShipments')}
                        </Link>
                      </li>
                    </ul>
                  </details>
                </li>
                <li><Link href="/transporter/wallet" className={isLinkActive('/transporter/wallet') ? standarNavLinkSelect : standarNavLink}>{t('header.wallet')}</Link></li>
                <li><Link href="/transporter/current" className={isLinkActive('/transporter/current') ? standarNavLinkSelect : standarNavLink}>{t('header.currentStatus')}</Link></li>
              </>
            )}

            {userRole === 'user' && (
              <>
                <li>
                  <details className="group [&_summary::-webkit-details-marker]:hidden">
                    <summary
                      className={`${isLinkActive('/user/shipments') ? standarNavLinkSelect : standarNavLink} flex cursor-pointer items-center justify-between`}
                    >
                      <span>{t('header.userShipments')}</span>
                      <span className="transition-transform duration-300 group-open:-rotate-180">
                        <ArrowDown />
                      </span>
                    </summary>
                    <ul className="absolute mx-auto mt-2 space-y-1 bg-primary-100 pb-2 px-3 rounded-lg group-open:-translate-x-6">
                      <li>
                        <Link 
                          href="/user/shipments/create" 
                          className={isLinkActive('/user/shipments/create') ? standarNavLinkSelect : standarNavLink}>
                          {t('header.createShipment')}
                        </Link>
                      </li>
                      <li>
                        <Link 
                          href="/user/shipments/me/all" 
                          className={isLinkActive('/user/shipments/me/all') ? standarNavLinkSelect : standarNavLink}>
                          {t('header.myShipments')}
                        </Link>
                      </li>
                      <li>
                        <Link 
                          href="/user/shipments/actives" 
                          className={isLinkActive('/user/shipments/actives') ? standarNavLinkSelect : standarNavLink}>
                          {t('header.activeShipments')}
                        </Link>
                      </li>
                    </ul>
                  </details>
                </li>
                <li><Link href="/user/reports" className={isLinkActive('/user/reports') ? standarNavLinkSelect : standarNavLink}>{t('header.reports')}</Link></li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
