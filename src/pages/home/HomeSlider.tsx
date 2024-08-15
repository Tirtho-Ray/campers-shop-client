import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay } from 'swiper/modules';

// Array of images with provided URLs and unique IDs
const slides = [
  {
    id: 1,
    src: 'https://i.ibb.co/2NkcS36/Best-survival-kit.png',
    alt: 'Image 1'
  },
  
  {
    id: 3,
    src: 'https://i.ibb.co/bJgCSCT/images1png.png',
    alt: 'Image 3'
  },
  {
    id: 4,
    src: 'https://i.ibb.co/HFNp6Cr/images3.png',
    alt: 'Image 4'
  },
  {
    id: 5,
    src: 'https://i.ibb.co/LhQWL68/images4.png',
    alt: 'Image 5'
  },
  {
    id: 6,
    src: 'https://i.ibb.co/VJkG0p6/images5.png',
    alt: 'Image 6'
  },
  {
    id: 7,
    src: 'https://i.ibb.co/ZY57NyB/images6.png',
    alt: 'Image 7'
  },
  {
    id: 8,
    src: 'https://i.ibb.co/chMvt7R/pic1.png',
    alt: 'Image 8'
  },
  {
    id: 9,
    src: 'https://i.ibb.co/gw2GGPt/pic2.png',
    alt: 'Image 9'
  },
  
];

const HomeSlider = () => {
  return (
    <div className="mySwiperContainer">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay]}
        className="mySwiper"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <img 
              className="w-full object-cover md:h-[450px] sm:h-[350px] h-[250px] " 
              src={slide.src} 
              alt={slide.alt} 
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HomeSlider;
