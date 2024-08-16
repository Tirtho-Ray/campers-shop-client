import  { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import img from '../../assets/campers-about-picture/beautiful-smiling-woman-with-sma.png';
import AboutWebDataBox from './aboutWebDataBox';

const About = () => {
    const textRef = useRef<(HTMLParagraphElement | null)[]>([]);
    const imgRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const tl = gsap.timeline({ defaults: { duration: 1, ease: 'power3.out' } });

        textRef.current.forEach((el, index) => {
            if (el) {
                tl.fromTo(el, { y: 50, opacity: 0 }, { y: 0, opacity: 1 }, index * 0.5);
            }
        });

        if (imgRef.current) {
            tl.fromTo(imgRef.current, { x: 100, opacity: 0 }, { x: 0, opacity: 1 }, '-=1');
        }
    }, []);

    return (
       <div>
         <div className="mt-16 md:mt-28 lg:mt-28 flex flex-col md:flex-row lg:px-28 px-5 items-center md:items-start space-y-6 md:space-y-0 md:space-x-12">
            <div className="md:w-1/2 lg:w-2/5 px-6 lg:px-8">
                <p ref={el => textRef.current[0] = el} className="text-xl md:text-2xl lg:text-4xl font-bold">Our Story</p>
                <p ref={el => textRef.current[1] = el} className="mt-3 text-xs md:text-sm lg:text-md leading-relaxed font-Poppins lg:mt-5">
                    Launched in 2020, Exclusive is South Asia's premier online shopping marketplace with an active presence in Bangladesh. Supported by a wide range of tailored marketing, data, and service solutions, Exclusive has 15,100 sellers and 300 brands, serving 3 million customers across the region.
                </p>
                <p ref={el => textRef.current[2] = el} className="mt-3 text-xs md:text-sm lg:text-md leading-relaxed">
                    Exclusive has more than 1 million products to offer, growing at a very fast rate. Exclusive offers a diverse assortment in categories ranging from consumer electronics to fashion and more.
                </p>
            </div>
            <div ref={imgRef} className="md:w-1/2 lg:w-3/5 flex justify-center">
                <img className="w-full h-auto max-w-xs lg:max-w-md xl:max-w-lg rounded-lg shadow-lg lg:h-[400px] lg:w-[350px]" src={img} alt="Smiling woman with a small bag" />
            </div>
        </div>
        <AboutWebDataBox />
       </div>
    );
};

export default About;
