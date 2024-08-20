import { AiFillCustomerService } from "react-icons/ai";
import { LiaShuttleVanSolid } from "react-icons/lia";
import { SiTicktick } from "react-icons/si";

const HomeContant = () => {
  return (
    <div className="flex justify-center items-center md:gap-4 mt-6 md:mt-12 ">
      <div className="flex flex-col justify-center items-center  rounded-lg  p-4 lg:h-[200px] lg:w-[250px] md:w-[160px] md:h-[150px] w-[110px] h-[100px]">
        <div className="flex justify-center items-center bg-black rounded-full shadow-md lg:h-[70px] lg:w-[70px] md:w-[60px] md:h-[60px] w-[25px] h-[25px]">
          <LiaShuttleVanSolid className="text-white lg:text-5xl md:text-2xl text-sm" />
        </div>
        <p className="font-bold mt-2 lg:text-sm md:text-[10px] text-[6px]">
          FAST ANS FAST DELIVERY
        </p>
        <p className="font-semibold text-center lg:text-[13px] md:text-[10px] text-[5px]">
          Free delivery up to 150$
        </p>
      </div>
      <div className="flex flex-col justify-center items-center  rounded-lg  p-4 lg:h-[200px] lg:w-[250px] md:w-[160px] md:h-[150px] w-[110px] h-[100px]">
        <div className="flex justify-center items-center bg-black rounded-full shadow-md lg:h-[70px] lg:w-[70px] md:w-[60px] md:h-[60px] w-[25px] h-[25px]">
          <AiFillCustomerService className="text-white lg:text-5xl md:text-2xl text-sm" />
        </div>
        <p className="font-bold mt-2 lg:text-sm md:text-[10px] text-[6px]">
          34/7 customer services
        </p>
        <p className="font-semibold text-center lg:text-[13px] md:text-[10px] text-[5px]">
          Friendly customer support
        </p>
      </div>
      <div className="flex flex-col justify-center items-center  rounded-lg  p-4 lg:h-[200px] lg:w-[250px] md:w-[160px] md:h-[150px] w-[110px] h-[100px]">
        <div className="flex justify-center items-center bg-black rounded-full shadow-md lg:h-[70px] lg:w-[70px] md:w-[60px] md:h-[60px] w-[25px] h-[25px]">
          <SiTicktick className="text-white lg:text-5xl md:text-2xl text-sm" />
        </div>
        <p className="font-bold mt-2 lg:text-sm md:text-[10px] text-[6px]">
         Money refund policy
        </p>
        <p className="font-semibold text-center lg:text-[13px] md:text-[10px] text-[5px]">
          money back 30 days
        </p>
      </div>
     
    </div>
  );
};

export default HomeContant;
