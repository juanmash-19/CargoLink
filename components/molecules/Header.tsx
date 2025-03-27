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

export default function Header() {
  const { userRole, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isShipmentMenuOpen, setIsShipmentMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

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
              <div className={`absolute right-0 z-50 bg-white rounded-lg shadow-sm divide-gray-100 ${isUserMenuOpen ? 'block' : 'hidden'}`}>
                <div className="px-4 py-3">
                  <span className="block text-sm text-gray-900 ">Bonnie Green</span>
                  <span className="block text-sm text-gray-500 truncate">name@flowbite.com</span>
                </div>
                <ul className="py-2 text-gray-500">
                  <li><Link href="/user/profile" className="block px-4 py-2 text-sm hover:bg-gray-100">Perfil</Link></li>
                  <li><Link href="#" className="block px-4 py-2 text-sm hover:bg-gray-100">Ajustes</Link></li>
                  <li><Link href="#" className="block px-4 py-2 text-sm hover:bg-gray-100">Información</Link></li>
                  <li>
                    <CustomButton text='Cerrar sesión' variant='danger' type='button' onClick={logOutClick} />
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="flex flex-row">
              <CustomButton text='Registrarse' variant='secondary' type='button' onClick={registerClick} />
              <Link className={`${isLinkActive('/login', true) ? standarNavLinkSelect : standarNavLink} my-auto text-sm text-white ml-4`} href="/login">Iniciar Sesión</Link>
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

        {/* Menú de navegación principal basado en el rol */}
        <div className={`md:flex md:w-auto md:order-1 ${isMenuOpen ? "block" : "hidden"}`} id="navbar-sticky">
          <ul className="flex flex-col md:flex-row p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-primary-100 md:space-x-8 md:mt-0 md:border-0 md:bg-primary-100">
            
            {/*Este debe de desapareces e incuroporar los home para cada role*/}
            <li><Link href="/" className={isLinkActive('/', true) ? standarNavLinkSelect : standarNavLink}>Inicio</Link></li>

            {/*Seccion para usuarios no logueados*/}
            {userRole === null &&(
              <>
                <li><Link href="#about-section" className={isLinkActive('/services') ? standarNavLinkSelect : standarNavLink}>Servicios</Link></li>
                <li><Link href="#what-are" className={isLinkActive('/services') ? standarNavLinkSelect : standarNavLink}>¿Que somos?</Link></li>
                <li><Link href="#about-us" className={isLinkActive('/us') ? standarNavLinkSelect : standarNavLink}>Nosotros</Link></li>
              </>
            )}
            
            {/*Seccion para usuarios logueados*/}
            {userRole === 'admin' && (
              <>
                <li><Link href="/admin" className={isLinkActive('/admin') ? standarNavLinkSelect : standarNavLink}>Administrador</Link></li>
                <li><Link href="/admin/users" className={isLinkActive('/admin/users') ? standarNavLinkSelect : standarNavLink}>Usuarios</Link></li>
                <li><Link href="/services" className={isLinkActive('/services') ? standarNavLinkSelect : standarNavLink}>Servicios</Link></li>
              </>
            )}

            {userRole === 'transporter' && (
              <>
                <li><Link href="/repartidor/jobs" className={isLinkActive('/repartidor/jobs') ? standarNavLinkSelect : standarNavLink}>Trabajos</Link></li>
                <li>
                  <details className="group [&_summary::-webkit-details-marker]:hidden">
                    <summary
                      className={`${isLinkActive('/transporter/shipments') ? standarNavLinkSelect : standarNavLink} flex cursor-pointer items-center justify-between`}
                    >
                      <span> Fletes </span>

                      <span className="transition-transform duration-300 group-open:-rotate-180">
                        <ArrowDown />
                      </span>
                    </summary>

                    <ul className="absolute mx-auto mt-2 space-y-1 bg-primary-100 pb-2 px-3 rounded-lg">
                      <li>
                        <Link 
                          href="/transporter/shipments/available" 
                          className={isLinkActive('/transporter/shipments/available') ? standarNavLinkSelect : standarNavLink}>
                            Disponibles
                        </Link>
                      </li>

                      <li>
                        <Link 
                          href="/transporter/shipments/actives" 
                          className={isLinkActive('/transporter/shipments/actives') ? standarNavLinkSelect : standarNavLink}>
                            Activos
                        </Link>
                      </li>

                      <li>
                        <Link 
                          href="/transporter/shipments/all" 
                          className={isLinkActive('/transporter/shipments/all') ? standarNavLinkSelect : standarNavLink}>
                            Todos
                        </Link>
                      </li>
                    </ul>
                  </details>
                </li>

                <li><Link href="/transporter/wallet" className={isLinkActive('/transporter/wallet') ? standarNavLinkSelect : standarNavLink}>Billetera</Link></li>
                <li><Link href="/transporter/current" className={isLinkActive('/transporter/current') ? standarNavLinkSelect : standarNavLink}>Estado Actual</Link></li>
              </>
            )}

            {userRole === 'user' && (
              <>
                <li>
                  <details className="group [&_summary::-webkit-details-marker]:hidden">
                    <summary
                      className={`${isLinkActive('/user/shipments') ? standarNavLinkSelect : standarNavLink} flex cursor-pointer items-center justify-between`}
                    >
                      <span> Fletes </span>

                      <span className="transition-transform duration-300 group-open:-rotate-180">
                        <ArrowDown />
                      </span>
                    </summary>

                    <ul className="absolute mx-auto mt-2 space-y-1 bg-primary-100 pb-2 px-3 rounded-lg group-open:-translate-x-6">
                      <li>
                        <Link 
                          href="/user/shipments/create" 
                          className={isLinkActive('/user/shipments/create') ? standarNavLinkSelect : standarNavLink}>
                            Crear
                        </Link>
                      </li>

                      <li>
                        <Link 
                          href="/user/shipments/me" 
                          className={isLinkActive('/user/shipments/me/all') ? standarNavLinkSelect : standarNavLink}>
                            Mis fletes
                        </Link>
                      </li>

                      <li>
                        <Link 
                          href="/user/shipments/actives" 
                          className={isLinkActive('/user/shipments/actives') ? standarNavLinkSelect : standarNavLink}>
                            Activos
                        </Link>
                      </li>
                    </ul>
                  </details>
                </li>
                <li><Link href="/user/help" className={isLinkActive('/user/help') ? standarNavLinkSelect : standarNavLink}>Ayuda</Link></li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
