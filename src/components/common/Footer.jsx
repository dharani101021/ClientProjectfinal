import { Instagram } from 'lucide-react';

const Footer = () => {
  // Function to handle contact button click
  const handleContactClick = () => {
    // Option 1: Redirect to a contact page
    window.location.href = '/contact';
    
    // Option 2: Redirect to external contact form
    // window.open('https://your-contact-form-url.com', '_blank');
    
    // Option 3: Scroll to contact section on same page
    // const contactSection = document.getElementById('contact');
    // if (contactSection) {
    //   contactSection.scrollIntoView({ behavior: 'smooth' });
    // }
    
    // Option 4: Open email client
    // window.location.href = 'mailto:info@studioprecht.com';
  };

  return (
    <footer className="fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-black">
      <div className="flex flex-col md:flex-row justify-between items-center px-4 md:px-12 py-4 md:py-6 gap-2 md:gap-0">
        <div className="flex justify-start w-full md:w-[40%]">
          <button className="text-base md:text-xl font-medium tracking-wider hover:text-gray-600 transition-colors ml-0 md:ml-[10%]">
            © 2025. STUDIO PRECHT.
          </button>
        </div>
        
        <div className="flex justify-center w-full md:w-[20%]">
          <button className="text-base md:text-xl font-medium tracking-wider hover:text-gray-600 transition-colors flex items-center gap-2">
            <Instagram className="w-5 h-5" />
            INSTAGRAM
          </button>
        </div>
        
        <div className="flex justify-end w-full md:w-[40%]">
          <button 
            onClick={handleContactClick}
            className="text-base md:text-xl font-medium tracking-wider text-gray-800 hover:text-gray-600 transition-colors cursor-pointer mr-0 md:mr-[10%]"
          >
            CONTACT
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;