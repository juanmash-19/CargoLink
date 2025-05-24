'use client'
import React from 'react';
import { useTranslations } from "next-intl";
import { Shield, Lock, UserCheck, BookOpen, Bell, Mail } from 'lucide-react';

export default function ScreenPrivacyPolicy() {
  const t = useTranslations('legal');
  
  return (
    <div className="bg-white min-h-screen">
      {/* Header Banner */}
      <div className="bg-primary-100 text-white py-16 px-4">
        <div className="container mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 flex items-center">
            <Shield className="mr-3 h-10 w-10" />
            {t('privacyPolicy.title')}
          </h1>
          <p className="text-xl opacity-90 max-w-3xl">
            {t('privacyPolicy.introduction.content')}
          </p>
        </div>
      </div>
      
      <div className="container mx-auto py-12 px-4 md:px-6">
        <div className="bg-white rounded-lg shadow-xl p-6 md:p-10 text-gray-700">
          <div className="prose max-w-none text-gray-700">
            <section className="mb-10 border-b pb-10">
              <div className="flex items-center mb-6">
                <BookOpen className="h-7 w-7 text-primary-100 mr-3" />
                <h2 className="text-2xl font-bold text-gray-800">{t('privacyPolicy.introduction.title')}</h2>
              </div>
              <p className="text-lg leading-relaxed">{t('privacyPolicy.introduction.content')}</p>
            </section>
            
            <section className="mb-10 border-b pb-10">
              <div className="flex items-center mb-6">
                <UserCheck className="h-7 w-7 text-primary-100 mr-3" />
                <h2 className="text-2xl font-bold text-gray-800">{t('privacyPolicy.dataCollection.title')}</h2>
              </div>
              <p className="text-lg leading-relaxed mb-4">{t('privacyPolicy.dataCollection.content')}</p>
              <div className="bg-gray-50 p-6 rounded-lg">
                <ul className="list-disc pl-6 mb-4 text-gray-700">
                  <li className="mb-3 text-lg">{t('privacyPolicy.dataCollection.items.personal')}</li>
                  <li className="mb-3 text-lg">{t('privacyPolicy.dataCollection.items.usage')}</li>
                  <li className="mb-3 text-lg">{t('privacyPolicy.dataCollection.items.cookies')}</li>
                </ul>
              </div>
            </section>
            
            <section className="mb-10 border-b pb-10">
              <div className="flex items-center mb-6">
                <Lock className="h-7 w-7 text-primary-100 mr-3" />
                <h2 className="text-2xl font-bold text-gray-800">{t('privacyPolicy.dataUsage.title')}</h2>
              </div>
              <p className="text-lg leading-relaxed mb-4">{t('privacyPolicy.dataUsage.content')}</p>
              <div className="bg-gray-50 p-6 rounded-lg">
                <ul className="list-disc pl-6 mb-4 text-gray-700">
                  <li className="mb-3 text-lg">{t('privacyPolicy.dataUsage.items.serviceProvision')}</li>
                  <li className="mb-3 text-lg">{t('privacyPolicy.dataUsage.items.serviceImprovement')}</li>
                  <li className="mb-3 text-lg">{t('privacyPolicy.dataUsage.items.communication')}</li>
                </ul>
              </div>
            </section>
            
            <section className="mb-10 border-b pb-10">
              <div className="flex items-center mb-6">
                <Lock className="h-7 w-7 text-primary-100 mr-3" />
                <h2 className="text-2xl font-bold text-gray-800">{t('privacyPolicy.dataSharing.title')}</h2>
              </div>
              <p className="text-lg leading-relaxed">{t('privacyPolicy.dataSharing.content')}</p>
            </section>
            
            <section className="mb-10 border-b pb-10">
              <div className="flex items-center mb-6">
                <Shield className="h-7 w-7 text-primary-100 mr-3" />
                <h2 className="text-2xl font-bold text-gray-800">{t('privacyPolicy.dataSecurity.title')}</h2>
              </div>
              <p className="text-lg leading-relaxed">{t('privacyPolicy.dataSecurity.content')}</p>
            </section>
            
            <section className="mb-10 border-b pb-10">
              <div className="flex items-center mb-6">
                <UserCheck className="h-7 w-7 text-primary-100 mr-3" />
                <h2 className="text-2xl font-bold text-gray-800">{t('privacyPolicy.userRights.title')}</h2>
              </div>
              <p className="text-lg leading-relaxed mb-4">{t('privacyPolicy.userRights.content')}</p>
              <div className="bg-gray-50 p-6 rounded-lg">
                <ul className="list-disc pl-6 mb-4 text-gray-700">
                  <li className="mb-3 text-lg">{t('privacyPolicy.userRights.items.access')}</li>
                  <li className="mb-3 text-lg">{t('privacyPolicy.userRights.items.rectification')}</li>
                  <li className="mb-3 text-lg">{t('privacyPolicy.userRights.items.deletion')}</li>
                  <li className="mb-3 text-lg">{t('privacyPolicy.userRights.items.objection')}</li>
                </ul>
              </div>
            </section>
            
            <section className="mb-10 border-b pb-10">
              <div className="flex items-center mb-6">
                <Bell className="h-7 w-7 text-primary-100 mr-3" />
                <h2 className="text-2xl font-bold text-gray-800">{t('privacyPolicy.changes.title')}</h2>
              </div>
              <p className="text-lg leading-relaxed">{t('privacyPolicy.changes.content')}</p>
            </section>
            
            <section className="mb-6">
              <div className="flex items-center mb-6">
                <Mail className="h-7 w-7 text-primary-100 mr-3" />
                <h2 className="text-2xl font-bold text-gray-800">{t('privacyPolicy.contact.title')}</h2>
              </div>
              <p className="text-lg leading-relaxed">{t('privacyPolicy.contact.content')}</p>
              <p className="mt-4 text-lg font-semibold text-primary-100">
                {t('privacyPolicy.contact.email')}: privacy@cargol.ink
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
