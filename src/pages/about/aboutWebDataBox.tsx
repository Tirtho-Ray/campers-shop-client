import  { useEffect, useRef } from "react";
import { AiOutlineShop } from "react-icons/ai";
import { FaSackDollar } from "react-icons/fa6";
import { BsCurrencyDollar } from "react-icons/bs";
import { LuBaggageClaim } from "react-icons/lu";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const AboutWebDataBox = () => {
  const boxRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    gsap.fromTo(
      boxRefs.current,
      { x: -200, opacity: 0 },  
      {
        x: 0,                 
        opacity: 1,           
        duration: 1.5,
        stagger: 0.3,         
        ease: "power2.out",
        scrollTrigger: {
          trigger: boxRefs.current,
          start: "top 80%",   
          end: "bottom 20%",
          toggleActions: "play none none reverse", 
        },
      }
    );
  }, []);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 justify-center gap-4 p-4 md:px-16 md:mt-12 mt-5 xl:px-52">
      {/* Box 1 */}
      <div
        className="flex flex-col justify-center items-center bg-red-300 rounded-lg shadow-lg p-4 lg:h-[200px] lg:w-[200px] md:w-[150px] md:h-[150px] sm:w-[120px] sm:h-[120px]"
        ref={(el) => (boxRefs.current[0] = el)}
      >
        <div className="flex justify-center items-center bg-white rounded-full shadow-md lg:h-[70px] lg:w-[70px] md:w-[60px] md:h-[60px] w-[40px] h-[40px]">
          <AiOutlineShop className="text-red-300 lg:text-5xl md:text-2xl text-2xl" />
        </div>
        <p className="font-bold mt-2 lg:text-3xl md:text-xl text-lg">10.5 K</p>
        <p className="font-semibold text-center lg:text-base md:text-base text-[10px]">Seller Active Site</p>
      </div>

      {/* Box 2 */}
      <div
        className="flex flex-col justify-center items-center bg-red-300 rounded-lg shadow-lg p-4 lg:h-[200px] lg:w-[200px] md:w-[150px] md:h-[150px] sm:w-[120px] sm:h-[120px]"
        ref={(el) => (boxRefs.current[1] = el)}
      >
        <div className="flex justify-center items-center bg-white rounded-full shadow-md lg:h-[70px] lg:w-[70px] md:w-[60px] md:h-[60px] w-[40px] h-[40px]">
          <BsCurrencyDollar className="text-red-300 lg:text-5xl md:text-2xl text-xl" />
        </div>
        <p className="font-bold mt-2 lg:text-3xl md:text-xl text-lg">45.5 K</p>
        <p className="font-semibold text-center lg:text-base md:text-base text-[10px]">Monthly Product sell</p>
      </div>

      {/* Box 3 */}
      <div
        className="flex flex-col justify-center items-center bg-red-300 rounded-lg shadow-lg p-4 lg:h-[200px] lg:w-[200px] md:w-[150px] md:h-[150px] sm:w-[120px] sm:h-[120px]"
        ref={(el) => (boxRefs.current[2] = el)}
      >
        <div className="flex justify-center items-center bg-white rounded-full shadow-md lg:h-[70px] lg:w-[70px] md:w-[60px] md:h-[60px] w-[40px] h-[40px]">
          <LuBaggageClaim className="text-red-300 lg:text-5xl md:text-2xl text-xl" />
        </div>
        <p className="font-bold mt-2 lg:text-3xl md:text-xl text-lg">10.5 K</p>
        <p className="font-semibold text-center lg:text-base md:text-base text-[10px]">Customer Active our site</p>
      </div>

      {/* Box 4 */}
      <div
        className="flex flex-col justify-center items-center bg-red-300 rounded-lg shadow-lg p-4 lg:h-[200px] lg:w-[200px] md:w-[150px] md:h-[150px] sm:w-[120px] sm:h-[120px]"
        ref={(el) => (boxRefs.current[3] = el)}
      >
        <div className="flex justify-center items-center bg-white rounded-full shadow-md lg:h-[70px] lg:w-[70px] md:w-[60px] md:h-[60px] w-[40px] h-[40px]">
          <FaSackDollar className="text-red-300 lg:text-5xl md:text-2xl text-xl" />
        </div>
        <p className="font-bold mt-2 lg:text-3xl md:text-xl text-lg">25 K</p>
        <p className="font-semibold text-center lg:text-base md:text-base text-[10px]">Annual gross sell our Site</p>
      </div>
    </div>
  );
};

export default AboutWebDataBox;
