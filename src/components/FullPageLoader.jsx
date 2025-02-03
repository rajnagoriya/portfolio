
const FullPageLoader = () => {
    return (
      <div className="h-screen w-screen flex justify-center items-center bg-black">
        <div className="relative w-20 h-20">
          {/* Outer Ring */}
          <div className="absolute inset-0 border-4 border-slate-400-500 rounded-full opacity-30"></div>
  
          {/* Rotating Ring */}
          <div className="absolute inset-0 border-4 border-t-transparent border-slate-300 rounded-full animate-spin"></div>
  
          {/* Center Dot */}
          <div className="absolute inset-0 flex justify-center items-center">
            <div className="rounded-full">Loading..</div>
          </div>
        </div>
        
      </div>
    );
  };
  
  export default FullPageLoader;