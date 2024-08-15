import React, { useState } from 'react';
import { FaPhone } from "react-icons/fa";
import './contact.css';
import { FaMessage } from 'react-icons/fa6';

const Contact = () => {
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate network request

      setSuccess('Your message has been sent successfully!');
      setFormValues({
        name: '',
        email: '',
        phone: '',
        message: '',
      });
    } catch (error) {
      setSuccess('There was an error sending your message.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center">
      <div className="mt-24 md:mt-28 md:flex lg:px-12 px-8 gap-4">
        <div className="border p-4 bg-slate-100 shadow-xl">
          <div>
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-full bg-red-400 flex justify-center items-center">
                <FaPhone />
              </div>
              <div className="text-[15px] font-bold">Call to us</div>
            </div>
            <div>
              <p className="lg:mt-4 text-[12px] mt-3">We are available 24/7, 7 days a week</p>
              <p className="lg:mt-4 text-[12px] mt-3">Phone: +8801234567891</p>
            </div>
            <div className="h-0 border-black border lg:mt-7 mt-4"></div>
          </div>
          <div>
            <div>
              <div className="flex items-center gap-4 mt-3">
                <div className="h-10 w-10 rounded-full bg-red-400 flex justify-center items-center lg:mt-4">
                  <FaMessage />
                </div>
                <div className="text-[15px] font-bold">Write to us</div>
              </div>
              <div>
                <p className="lg:mt-3 text-[12px] mt-3">Fill out the form and we will contact you within 24 hours</p>
                <p className="lg:mt-2 text-[12px] mt-3">Email: customer@campe.com</p>
                <p className="lg:mt-2 text-[12px] mt-3">Email: support@campers.com</p>
              </div>
            </div>
          </div>
        </div>
        <div className="border p-4 bg-slate-100 shadow-xl mt-6 md:mt-0">
          <form onSubmit={handleSubmit}>
            <div className="grid md:grid-cols-3 gap-3">
              <input
                type="text"
                name="name"
                value={formValues.name}
                onChange={handleChange}
                placeholder="Your name *"
                className="mt-1 h-10 block w-full border px-2"
                required
              />
              <input
                type="email"
                name="email"
                value={formValues.email}
                onChange={handleChange}
                placeholder="Your Email *"
                className="mt-1 h-10 block w-full border px-2"
                required
              />
              <input
                type="tel"
                name="phone"
                value={formValues.phone}
                onChange={handleChange}
                placeholder="Your Phone *"
                className="mt-1 h-10 block w-full border px-2"
                required
              />
            </div>
            <div className='mt-3'>
              <textarea
                name="message"
                value={formValues.message}
                onChange={handleChange}
                placeholder="Send message"
                className="mt-1 block w-full lg:mt-6 h-32 p-4 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                required
              ></textarea>
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="lg:px-4 py-2 border bg-red-700 font-bold text-white flex lg:mt-12 rounded-md text-[12px] mt-3 px-2"
                disabled={isLoading}
              >
                {isLoading ? 'Sending...' : 'Send Message'}
              </button>
            </div>
          </form>
          {success && (
            <div className="mt-4 text-center">
              <p className={`text-sm ${success.includes('error') ? 'text-red-500' : 'text-green-500'}`}>{success}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;
