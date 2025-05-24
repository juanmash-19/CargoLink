'use client'

import React from 'react'
import Image from 'next/image'
import { useTranslations } from "next-intl";
import Link from 'next/link';
import CargoLinkLogo from '../atoms/Logo';

export default function Footer() {
  const t = useTranslations();

  return (
    <div>
        <footer className="bg-white mt-5">
            <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
                <div className="md:flex md:justify-between">
                <div className="mb-6 md:mb-0">
                    <Link href="/" className="flex items-center">
                        <div className="self-center text-2xl font-semibold whitespace-nowrap">
                            <span className='text-logoCargo'>Cargo</span><span className='text-logoLink'>Link</span>
                        </div>
                    </Link>
                </div>
                <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
                    <div>
                        <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase ">{t('footer.resources')}</h2>
                        <ul className="text-gray-500  font-medium">
                            <li className="mb-4">
                                <Link href="https://flowbite.com/" target="_blank" rel="noopener noreferrer" className="hover:underline">
                                    {t('footer.flowbite')}
                                </Link>
                            </li>
                            <li className="mb-4">
                                <Link href="https://tailwindcss.com/" target="_blank" rel="noopener noreferrer" className="hover:underline">
                                    {t('footer.tailwind')}
                                </Link>
                            </li>
                            <li className="mb-4">
                                <Link href="https://tailwindcss.com/" target="_blank" rel="noopener noreferrer" className="hover:underline">
                                    HyperUI
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase ">{t('footer.followUs')}</h2>
                        <ul className="text-gray-500 font-medium">
                            <li className="mb-4">
                                <Link href="https://github.com/juanmash-19/CargoLink" target="_blank" rel="noopener noreferrer" className="hover:underline">
                                    {t('footer.github')}
                                </Link>
                            </li>
                            <li>
                                <Link href="https://www.instagram.com/cargolink/" target="_blank" rel="noopener noreferrer" className="hover:underline">
                                    Instagram
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase ">{t('footer.legal')}</h2>
                        <ul className="text-gray-500  font-medium">
                            <li className="mb-4">
                                <Link href="/info/privacy-policy" className="hover:underline">{t('footer.privacyPolicy')}</Link>
                            </li>
                            <li>
                                <Link href="/info/terms-conditions" className="hover:underline">{t('footer.termsConditions')}</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <hr className="my-6 border-gray-200 sm:mx-auto  lg:my-8" />
            <div className="sm:flex sm:items-center sm:justify-between">
                <span className="text-sm text-gray-500 sm:text-center ">
                    © 2025 <Link href="/" className="hover:underline">{t('footer.companyName')}</Link>. {t('footer.rightsReserved')}
                </span>
            </div>
            </div>
        </footer>
    </div>
  )
}
