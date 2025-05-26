"use client"
import React from "react";
import Image from "next/image";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useTranslations } from "next-intl";

const AboutUs = () => {
    const t = useTranslations();

    const settings = {
        dots: false,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,
        speed: 500,
        cssEase: "linear",
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 800,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 450,
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    };

    const expertData = [
        {
            name: t('home.aboutUs.santiagoName'),
            description: t('home.aboutUs.santiagoRole'),
            imgSrc: "/images/Expert/santiago.jpg"
        },
        {
            name: t('home.aboutUs.juanMartinName'),
            description: t('home.aboutUs.juanMartinRole'),
            imgSrc: "/images/Expert/maria.jpg"
        },
        {
            name: t('home.aboutUs.juanDiegoName'),
            description: t('home.aboutUs.juanDiegoRole'),
            imgSrc: "/images/Expert/carlos.jpg"
        }
    ];

    return (
        <section className="bg-primary/15" id="about-us">
            <div className='container mx-auto lg:max-w-screen-xl md:max-w-screen-md'>
                <div className="text-center">
                    <p className='text-primary text-lg font-normal mb-2 tracking-widest uppercase'>
                        {t('home.aboutUs.developers')}
                    </p>
                    <h2 className="text-3xl lg:text-5xl font-semibold text-black">
                        {t('home.aboutUs.engineers')}
                    </h2>
                </div>
                <Slider {...settings}>
                    {expertData.map((item, i) => (
                        <div key={i}>
                            <div className='m-2 py-10 my-10 text-center inline-flex'>
                                <h3 className='text-2xl font-semibold text-lightblack'>{item.name}</h3>
                                <h4 className='text-lg font-normal text-lightblack pt-2 pb-2 opacity-50'>{item.description}</h4>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </section>
    )
}

export default AboutUs;