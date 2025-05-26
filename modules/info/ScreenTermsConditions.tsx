'use client'
import React from 'react';
import { useTranslations } from "next-intl";
import { FileText, Users, Key, BookOpen, CreditCard, AlertTriangle, Copyright, Mail } from 'lucide-react';

export default function ScreenTermsConditions() {
  const t = useTranslations('legal');
  
  return (
    <div className="bg-white min-h-screen">
      {/* Header Banner */}
      <div className="bg-primary-100 text-white py-16 px-4">
        <div className="container mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 flex items-center">
            <FileText className="mr-3 h-10 w-10" />
            {t('termsConditions.title')}
          </h1>
          <p className="text-xl opacity-90 max-w-3xl">
            {t('termsConditions.introduction.content')}
          </p>
        </div>
      </div>
      
      <div className="container mx-auto py-12 px-4 md:px-6">
        <div className="bg-white rounded-lg shadow-xl p-6 md:p-10 text-gray-700">
          <div className="prose max-w-none text-gray-700">
            <section className="mb-10 border-b pb-10">
              <div className="flex items-center mb-6">
                <BookOpen className="h-7 w-7 text-primary-100 mr-3" />
                <h2 className="text-2xl font-bold text-gray-800">{t('termsConditions.introduction.title')}</h2>
              </div>
              <p className="text-lg leading-relaxed">{t('termsConditions.introduction.content')}</p>
            </section>
            
            <section className="mb-10 border-b pb-10">
              <div className="flex items-center mb-6">
                <BookOpen className="h-7 w-7 text-primary-100 mr-3" />
                <h2 className="text-2xl font-bold text-gray-800">{t('termsConditions.definitions.title')}</h2>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <ul className="list-none space-y-4">
                  <li className="pb-3 border-b">
                    <strong className="text-primary-100 text-lg">{t('termsConditions.definitions.items.service.term')}: </strong>
                    <span className="text-lg">{t('termsConditions.definitions.items.service.definition')}</span>
                  </li>
                  <li className="pb-3 border-b">
                    <strong className="text-primary-100 text-lg">{t('termsConditions.definitions.items.user.term')}: </strong>
                    <span className="text-lg">{t('termsConditions.definitions.items.user.definition')}</span>
                  </li>
                  <li className="pb-3 border-b">
                    <strong className="text-primary-100 text-lg">{t('termsConditions.definitions.items.transporter.term')}: </strong>
                    <span className="text-lg">{t('termsConditions.definitions.items.transporter.definition')}</span>
                  </li>
                  <li>
                    <strong className="text-primary-100 text-lg">{t('termsConditions.definitions.items.shipment.term')}: </strong>
                    <span className="text-lg">{t('termsConditions.definitions.items.shipment.definition')}</span>
                  </li>
                </ul>
              </div>
            </section>
            
            <section className="mb-10 border-b pb-10">
              <div className="flex items-center mb-6">
                <Users className="h-7 w-7 text-primary-100 mr-3" />
                <h2 className="text-2xl font-bold text-gray-800">{t('termsConditions.accountUse.title')}</h2>
              </div>
              <p className="text-lg leading-relaxed mb-4">{t('termsConditions.accountUse.content')}</p>
              <div className="bg-gray-50 p-6 rounded-lg">
                <ul className="list-disc pl-6 mb-4 text-gray-700">
                  <li className="mb-3 text-lg">{t('termsConditions.accountUse.items.responsibility')}</li>
                  <li className="mb-3 text-lg">{t('termsConditions.accountUse.items.accuracy')}</li>
                  <li className="mb-3 text-lg">{t('termsConditions.accountUse.items.security')}</li>
                </ul>
              </div>
            </section>
            
            <section className="mb-10 border-b pb-10">
              <div className="flex items-center mb-6">
                <Key className="h-7 w-7 text-primary-100 mr-3" />
                <h2 className="text-2xl font-bold text-gray-800">{t('termsConditions.serviceUsage.title')}</h2>
              </div>
              <p className="text-lg leading-relaxed p-4 bg-gray-50 border-l-4 border-primary-100 rounded">
                {t('termsConditions.serviceUsage.content')}
              </p>
            </section>
            
            <section className="mb-10 border-b pb-10">
              <div className="flex items-center mb-6">
                <CreditCard className="h-7 w-7 text-primary-100 mr-3" />
                <h2 className="text-2xl font-bold text-gray-800">{t('termsConditions.payments.title')}</h2>
              </div>
              <p className="text-lg leading-relaxed">{t('termsConditions.payments.content')}</p>
            </section>
            
            <section className="mb-10 border-b pb-10">
              <div className="flex items-center mb-6">
                <AlertTriangle className="h-7 w-7 text-primary-100 mr-3" />
                <h2 className="text-2xl font-bold text-gray-800">{t('termsConditions.liability.title')}</h2>
              </div>
              <div className="p-6 bg-yellow-50 border-l-4 border-yellow-400 rounded-md">
                <p className="text-lg leading-relaxed text-gray-800">{t('termsConditions.liability.content')}</p>
              </div>
            </section>
            
            <section className="mb-10 border-b pb-10">
              <div className="flex items-center mb-6">
                <Copyright className="h-7 w-7 text-primary-100 mr-3" />
                <h2 className="text-2xl font-bold text-gray-800">{t('termsConditions.propertyRights.title')}</h2>
              </div>
              <p className="text-lg leading-relaxed">{t('termsConditions.propertyRights.content')}</p>
            </section>
            
            <section className="mb-10 border-b pb-10">
              <div className="flex items-center mb-6">
                <BookOpen className="h-7 w-7 text-primary-100 mr-3" />
                <h2 className="text-2xl font-bold text-gray-800">{t('termsConditions.changes.title')}</h2>
              </div>
              <p className="text-lg leading-relaxed p-4 bg-blue-50 border-l-4 border-blue-400 rounded">
                {t('termsConditions.changes.content')}
              </p>
            </section>
            
            <section className="mb-6">
              <div className="flex items-center mb-6">
                <Mail className="h-7 w-7 text-primary-100 mr-3" />
                <h2 className="text-2xl font-bold text-gray-800">{t('termsConditions.contact.title')}</h2>
              </div>
              <p className="text-lg leading-relaxed">{t('termsConditions.contact.content')}</p>
              <p className="mt-4 text-lg font-semibold text-primary-100">
                {t('termsConditions.contact.email')}: legal@cargol.ink
              </p>
            </section>
          </div>
          
          <div className="mt-12 pt-6 border-t text-center text-sm text-gray-500">
            <p>© {new Date().getFullYear()} {t('copyright')}</p>
            <p className="mt-2">{t('lastUpdated')} { new Date().toLocaleDateString() }</p>
          </div>
        </div>
      </div>
    </div>
  );
}
