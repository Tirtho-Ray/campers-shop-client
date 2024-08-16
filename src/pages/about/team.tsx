import img1 from '../../assets/New folder/man.png';
import img2 from '../../assets/New folder/girl1.png';
import img3 from '../../assets/New folder/man2.png';
import img4 from '../../assets/New folder/girl3.png';
import img5 from '../../assets/New folder/man1.png';
import img6 from '../../assets/New folder/girl.png';
import { FaLinkedin, FaFacebook, FaTwitter } from 'react-icons/fa';




const Team = () => {
 

  return (
    <div className=''>
      <p className="team-card text-center font-semibold mt-4 md:mt-8 lg:mt-16 text-xl md:text-2xl lg:text-3xl ">
        Meet Our Team Members
      </p>
      <div className='flex justify-center mt-12 md:mt-20 lg:mt28'>
        <div className='flex flex-wrap justify-center gap-3 lg:gap-6'>
          <div className='relative group '>
            <img 
              className='xl:h-[300px] xl:w-[300px] lg:h-[200px] lg:w-[200px] md:h-[200px] md:w-[200px] h-[140px] w-[140px] rounded-sm' 
              src={img1} 
              alt='man image' 
            />
            <div className='absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-center p-4 rounded-lg'>
              <h3 className='font-semibold text-lg'>John Doe</h3>
              <p className='text-sm'>Founder</p>
              <div className='flex gap-4 mt-2'>
                <a href='https://www.linkedin.com' target='_blank' rel='noopener noreferrer'>
                  <FaLinkedin className='text-2xl hover:text-blue-600 transition-colors duration-300' />
                </a>
                <a href='https://www.facebook.com' target='_blank' rel='noopener noreferrer'>
                  <FaFacebook className='text-2xl hover:text-blue-500 transition-colors duration-300' />
                </a>
                <a href='https://www.twitter.com' target='_blank' rel='noopener noreferrer'>
                  <FaTwitter className='text-2xl hover:text-blue-400 transition-colors duration-300' />
                </a>
              </div>
            </div>
          </div>
          <div className='relative group '>
            <img 
              className='xl:h-[300px] xl:w-[300px] lg:h-[200px] lg:w-[200px] md:h-[200px] md:w-[200px] h-[140px] w-[140px] rounded-sm' 
              src={img2} 
              alt='man image' 
            />
            <div className='absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-center p-4 rounded-lg'>
              <h3 className='font-semibold text-lg'>John Doe</h3>
              <p className='text-sm'>Designer</p>
              <div className='flex gap-4 mt-2'>
                <a href='https://www.linkedin.com' target='_blank' rel='noopener noreferrer'>
                  <FaLinkedin className='text-2xl hover:text-blue-600 transition-colors duration-300' />
                </a>
                <a href='https://www.facebook.com' target='_blank' rel='noopener noreferrer'>
                  <FaFacebook className='text-2xl hover:text-blue-500 transition-colors duration-300' />
                </a>
                <a href='https://www.twitter.com' target='_blank' rel='noopener noreferrer'>
                  <FaTwitter className='text-2xl hover:text-blue-400 transition-colors duration-300' />
                </a>
              </div>
            </div>
          </div>
          <div className='relative group '>
            <img 
              className='xl:h-[300px] xl:w-[300px] lg:h-[200px] lg:w-[200px] md:h-[200px] md:w-[200px] h-[140px] w-[140px] rounded-sm' 
              src={img3} 
              alt='man image' 
            />
            <div className='absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-center p-4 rounded-lg'>
              <h3 className='font-semibold text-lg'>John Doe</h3>
              <p className='text-sm'>Executive Manager</p>
              <div className='flex gap-4 mt-2'>
                <a href='https://www.linkedin.com' target='_blank' rel='noopener noreferrer'>
                  <FaLinkedin className='text-2xl hover:text-blue-600 transition-colors duration-300' />
                </a>
                <a href='https://www.facebook.com' target='_blank' rel='noopener noreferrer'>
                  <FaFacebook className='text-2xl hover:text-blue-500 transition-colors duration-300' />
                </a>
                <a href='https://www.twitter.com' target='_blank' rel='noopener noreferrer'>
                  <FaTwitter className='text-2xl hover:text-blue-400 transition-colors duration-300' />
                </a>
              </div>
            </div>
          </div>
          <div className='relative group'>
            <img 
              className='xl:h-[300px] xl:w-[300px] lg:h-[200px] lg:w-[200px] md:h-[200px] md:w-[200px] h-[140px] w-[140px] rounded-sm' 
              src={img4} 
              alt='man image' 
            />
            <div className='absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-center p-4 rounded-lg'>
              <h3 className='font-semibold text-lg'>John Doe</h3>
              <p className='text-sm'>It expert</p>
              <div className='flex gap-4 mt-2'>
                <a href='https://www.linkedin.com' target='_blank' rel='noopener noreferrer'>
                  <FaLinkedin className='text-2xl hover:text-blue-600 transition-colors duration-300' />
                </a>
                <a href='https://www.facebook.com' target='_blank' rel='noopener noreferrer'>
                  <FaFacebook className='text-2xl hover:text-blue-500 transition-colors duration-300' />
                </a>
                <a href='https://www.twitter.com' target='_blank' rel='noopener noreferrer'>
                  <FaTwitter className='text-2xl hover:text-blue-400 transition-colors duration-300' />
                </a>
              </div>
            </div>
          </div>
          <div className='relative group '>
            <img 
              className='xl:h-[300px] xl:w-[300px] lg:h-[200px] lg:w-[200px] md:h-[200px] md:w-[200px] h-[140px] w-[140px] rounded-sm' 
              src={img5} 
              alt='man image' 
            />
            <div className='absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-center p-4 rounded-lg'>
              <h3 className='font-semibold text-lg'>John Doe</h3>
              <p className='text-sm'>Sells Manager</p>
              <div className='flex gap-4 mt-2'>
                <a href='https://www.linkedin.com' target='_blank' rel='noopener noreferrer'>
                  <FaLinkedin className='text-2xl hover:text-blue-600 transition-colors duration-300' />
                </a>
                <a href='https://www.facebook.com' target='_blank' rel='noopener noreferrer'>
                  <FaFacebook className='text-2xl hover:text-blue-500 transition-colors duration-300' />
                </a>
                <a href='https://www.twitter.com' target='_blank' rel='noopener noreferrer'>
                  <FaTwitter className='text-2xl hover:text-blue-400 transition-colors duration-300' />
                </a>
              </div>
            </div>
          </div>
          <div className='relative group '>
            <img 
              className='xl:h-[300px] xl:w-[300px] lg:h-[200px] lg:w-[200px] md:h-[200px] md:w-[200px] h-[140px] w-[140px] rounded-sm' 
            src={img6} 
              alt='man image' 
            />
            <div className='absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-center p-4 rounded-lg'>
              <h3 className='font-semibold text-lg'>Lisa</h3>
              <p className='text-sm'>Prodect Manager</p>
              <div className='flex gap-4 mt-2'>
                <a href='https://www.linkedin.com' target='_blank' rel='noopener noreferrer'>
                  <FaLinkedin className='text-2xl hover:text-blue-600 transition-colors duration-300' />
                </a>
                <a href='https://www.facebook.com' target='_blank' rel='noopener noreferrer'>
                  <FaFacebook className='text-2xl hover:text-blue-500 transition-colors duration-300' />
                </a>
                <a href='https://www.twitter.com' target='_blank' rel='noopener noreferrer'>
                  <FaTwitter className='text-2xl hover:text-blue-400 transition-colors duration-300' />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Team;
