import { FaWhatsapp } from 'react-icons/fa';

const WhatsAppButton = () => {
  return (
    <div className="fixed bottom-20 right-4 z-40 md:bottom-6 md:right-6">
      <a
        href="https://wa.me/919876543210"
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-900 hover:text-green-600 hover:scale-110 transition-all duration-300 flex items-center justify-center"
      >
        <FaWhatsapp className="w-8 h-8 md:w-10 md:h-10" />
      </a>
    </div>
  );
};

export default WhatsAppButton;