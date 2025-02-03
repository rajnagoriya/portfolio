import 'remixicon/fonts/remixicon.css';

const Header = () => {
  
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

export default Header;






// import 'remixicon/fonts/remixicon.css'

// const Header = () => {
//   return (
//     <div className="fixed w-full z-10 p-20 flex items-center justify-end">
//     <button className="bg-black px-4 py-2 border-slate-500 font-[anzo3] text-white">Hire Me</button>
//     {/* <i className="ri-more-2-fill text-4xl ml-3 bg-black rounded-full p-[5px]"></i> */}
//     </div>
//   )
// }

// export default Header