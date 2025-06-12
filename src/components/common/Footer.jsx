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
      <div className="flex flex-col min-[790px]:flex-row justify-between items-center px-4 min-[790px]:px-12 py-4 min-[790px]:py-6 gap-3 min-[790px]:gap-0">
        <div className="flex justify-center min-[790px]:justify-start w-full min-[790px]:w-[40%]">
          <button className="text-base min-[790px]:text-xl font-medium tracking-wider hover:text-gray-600 transition-colors ml-0 min-[790px]:ml-[10%]">
            © 2025. STUDIO PRECHT.
          </button>
        </div>
        
        <div className="flex justify-center w-full min-[790px]:w-[20%]">
          <button className="text-base min-[790px]:text-xl font-medium tracking-wider hover:text-gray-600 transition-colors flex items-center gap-2">
            <Instagram className="w-5 h-5" />
            INSTAGRAM
          </button>
        </div>
        
        <div className="flex justify-center min-[790px]:justify-end w-full min-[790px]:w-[40%]">
          <button 
            onClick={handleContactClick}
            className="text-base min-[790px]:text-xl font-medium tracking-wider text-gray-800 hover:text-gray-600 transition-colors cursor-pointer mr-0 min-[790px]:mr-[10%]"
          >
            CONTACT
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;