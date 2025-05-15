'use client'

import React from 'react'
import Image from 'next/image'
import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations();

  return (
    <div>
        <footer className="bg-white mt-5">
            <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
                <div className="md:flex md:justify-between">
                <div className="mb-6 md:mb-0">
                    <a href="https://flowbite.com/" className="flex items-center">
                        <Image 
                            src="https://flowbite.com/docs/images/logo.svg" 
                            width={32} 
                            height={32} 
                            alt={t('footer.logoAlt')} 
                            className="h-8 me-3"
                        />
                        <span className="self-center text-2xl font-semibold whitespace-nowrap">{t('footer.companyName')}</span>
                    </a>
                </div>
                <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
                    <div>
                        <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase ">{t('footer.resources')}</h2>
                        <ul className="text-gray-500  font-medium">
                            <li className="mb-4">
                                <a href="https://flowbite.com/" className="hover:underline">{t('footer.flowbite')}</a>
                            </li>
                            <li>
                                <a href="https://tailwindcss.com/" className="hover:underline">{t('footer.tailwind')}</a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase ">{t('footer.followUs')}</h2>
                        <ul className="text-gray-500 font-medium">
                            <li className="mb-4">
                                <a href="https://github.com/themesberg/flowbite" className="hover:underline ">{t('footer.github')}</a>
                            </li>
                            <li>
                                <a href="https://discord.gg/4eeurUVvTy" className="hover:underline">{t('footer.discord')}</a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase ">{t('footer.legal')}</h2>
                        <ul className="text-gray-500  font-medium">
                            <li className="mb-4">
                                <a href="#" className="hover:underline">{t('footer.privacyPolicy')}</a>
                            </li>
                            <li>
                                <a href="#" className="hover:underline">{t('footer.termsConditions')}</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <hr className="my-6 border-gray-200 sm:mx-auto  lg:my-8" />
            <div className="sm:flex sm:items-center sm:justify-between">
                <span className="text-sm text-gray-500 sm:text-center ">© 2023 <a href="https://flowbite.com/" className="hover:underline">{t('footer.companyName')}</a>. {t('footer.rightsReserved')}
                </span>
            </div>
            </div>
        </footer>
    </div>
  )
}
