import { FaWhatsapp } from 'react-icons/fa';

const WhatsAppButton = () => {
  return (
    <div className="fixed bottom-0 right-4 z-40 flex items-center h-16 md:h-20">
      <a
        href="https://wa.me/919876543210"
        target="_blank"
        rel="noopener noreferrer"
        className="
          flex items-center justify-center
          w-12 h-12
          text-gray-900
          transform hover:scale-110 active:scale-95
          transition-transform duration-300 ease-in-out
          focus:outline-none focus:ring-2 focus:ring-gray-300
          group
        "
        aria-label="Contact us on WhatsApp"
      >
        <FaWhatsapp className="
          w-8 h-8
          group-hover:animate-pulse
        " />
      </a>
    </div>
  );
};

export default WhatsAppButton;