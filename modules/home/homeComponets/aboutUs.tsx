"use client"
import React from "react";
import Image from "next/image";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const AboutUs = () => {
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

    // Definimos los datos estáticos
    const expertData = [
        {
            name: "Santiago Castaño",
            description: "Desarrollador backend",
            imgSrc: "/images/Expert/santiago.jpg"
        },
        {
            name: "Juan Martin",
            description: "Desarrollador frontend",
            imgSrc: "/images/Expert/maria.jpg"
        },
        {
            name: "Juan Diego",
            description: "Ingeniero de datos",
            imgSrc: "/images/Expert/carlos.jpg"
        }
    ];

    return (
        <section className="bg-primary/15" id="about-us">
            <div className='container mx-auto lg:max-w-screen-xl md:max-w-screen-md'>
                <div className="text-center">
                    <p className='text-primary text-lg font-normal mb-2 tracking-widest uppercase'>DESARROLLADORES</p>
                    <h2 className="text-3xl lg:text-5xl font-semibold text-black">
                        Ingenieros
                    </h2>
                </div>
                <Slider {...settings}>
                    {expertData.map((item, i) => (
                        <div key={i}>
                            <div className='m-2 py-10 my-10 text-center inline-flex'>
                                {/* <div className="relative">
                                    <Image src={item.imgSrc} alt={item.name} width={362} height={262} className="inline-block m-auto" />
                                    <div className="absolute top-[50%] right-[2%]">
                                        <Image src={'/images/Expert/Linkedin.svg'} alt="linkedin" width={220} height={120} />
                                    </div>
                                </div> */}
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