"use client";

import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Image from "next/image";

const LANGUAGES: Record<string, { src: string; alt: string; short: string; }> = {
  es: { src: "/flags/spain.png", alt: "Español", short: "Es" },
  en: { src: "/flags/usa.png", alt: "English", short: "En" },
  fr: { src: "/flags/france.png", alt: "Français", short: "Fr" }, // Example for French
};

const LanguageSelector = () => {
  const [language, setLanguage] = useState("es");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const savedLanguage = Cookies.get("language") || "es";
    setLanguage(savedLanguage);
  }, []);

  const handleLanguageChange = (lang: string) => {
    setLanguage(lang);
    Cookies.set("language", lang, { expires: 365 });
    window.location.reload(); // Reload the page to apply the new language
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center bg-white p-2 rounded shadow border text-black"
      >
        <Image
          src={LANGUAGES[language].src}
          alt={LANGUAGES[language].alt}
          width={20}
          height={15}
          className="mr-2"
        />
        {LANGUAGES[language].short}
      </button>
      {isOpen && (
        <div className="absolute bottom-full mb-2 bg-white rounded shadow border text-black">
          {Object.entries(LANGUAGES).map(([key, { src, alt, short }]) => (
            <button
              key={key}
              onClick={() => handleLanguageChange(key)}
              className="flex items-center p-2 hover:bg-gray-100 w-full"
            >
              <Image src={src} alt={alt} width={20} height={15} className="mr-2" />
              {short}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
