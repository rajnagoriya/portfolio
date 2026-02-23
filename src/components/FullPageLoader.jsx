
const FullPageLoader = () => {
    return (
      <div className="h-screen w-screen flex justify-center items-center bg-palette-dark">
        <div className="relative w-20 h-20">
          {/* Outer Ring */}
          <div className="absolute inset-0 border-4 border-palette-light/30 rounded-full"></div>
  
          {/* Rotating Ring */}
          <div className="absolute inset-0 border-4 border-t-transparent border-palette-medium rounded-full animate-spin"></div>
  
          {/* Center Dot */}
          <div className="absolute inset-0 flex justify-center items-center">
            <div className="text-palette-cream text-sm font-medium">Loading..</div>
          </div>
        </div>
        
      </div>
    );
  };
  
  export default FullPageLoader;