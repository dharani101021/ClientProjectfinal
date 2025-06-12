import { FaWhatsapp } from 'react-icons/fa';

const WhatsAppButton = () => {
  return (
    <div className="fixed bottom-4 right-4 z-40 sm:bottom-6 sm:right-6 lg:bottom-8 lg:right-8 max-[776px]:bottom-20">
      <a
        href="https://wa.me/919876543210"
        target="_blank"
        rel="noopener noreferrer"
        className="
          flex items-center justify-center
          text-gray-900 hover:text-green-600
          transform hover:scale-110 active:scale-95
          transition-all duration-300 ease-in-out
          focus:outline-none focus:ring-2 focus:ring-gray-300
          group
        "
        aria-label="Contact us on WhatsApp"
      >
        <FaWhatsapp className="
          w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8
          group-hover:animate-pulse
        " />
      </a>
    </div>
  );
};

export default WhatsAppButton;