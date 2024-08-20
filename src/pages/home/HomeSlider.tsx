
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay } from 'swiper/modules';

// Array of images with provided URLs and unique IDs
const slides = [
  {
    id: 1,
    src: 'https://i.ibb.co/hCtDpNL/pic1.png',
    alt: 'Image 5'
  },
  {
    id: 2,
    src: 'https://i.ibb.co/2NkcS36/Best-survival-kit.png',
    alt: 'Image 1'
  },
  
  {
    id: 3,
    src: 'https://i.ibb.co/zWgHjwP/camping.png',
    alt: 'Image 3'
  },
  {
    id: 4,
    src: 'https://i.ibb.co/j6LXt4n/sunrise-view.png',
    alt: 'Image 4'
  },
  

  {
    id: 6,
    src: 'https://i.ibb.co/r0G4hb4/winter-c.png',
    alt: 'Image 6'
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
