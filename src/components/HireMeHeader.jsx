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
        className="bg-black px-4 py-2 border-slate-500 font-[anzo3] text-white"
        onClick={scrollToBottom} // Call function on click
      >
        Hire Me
      </button>
    </div>
  );
};

export default HireMeHeader;