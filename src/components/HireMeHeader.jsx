import 'remixicon/fonts/remixicon.css';

const HireMeHeader = () => {
  
  // Function to scroll to the bottom
  const scrollToBottom = () => {
    window.scrollTo({
      top: document.body.scrollHeight, // Scroll to the bottom
      behavior: "smooth", // Smooth scrolling effect
    });
  };

  return (
    <div className="fixed w-full z-10 p-20 flex items-center justify-end">
      <button 
        className="bg-palette-light hover:opacity-90 px-4 py-2 border-2 border-palette-light font-[anzo3] text-palette-dark transition-all"
        onClick={scrollToBottom}
      >
        Hire Me
      </button>
    </div>
  );
};

export default HireMeHeader;