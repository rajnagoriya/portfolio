import "remixicon/fonts/remixicon.css";
import { RiFileDownloadLine } from "react-icons/ri";
const RESUME_PATH = "/file/raj_resume_mca.pdf";

const HireMeHeader = () => {
  const handleDownloadResume = () => {
    const link = document.createElement("a");
    link.href = RESUME_PATH;
    link.download = "";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed w-full z-10 p-10 md:p-20 flex items-center justify-end">
      <button
        className="bg-palette-light flex items-center justify-center px-4 py-2 font-[anzo3] text-palette-dark hover:text-palette-medium transition-all border-2 border-palette-dark"
        onClick={handleDownloadResume}
      >
        <RiFileDownloadLine className="text-2xl mr-2" />
        Download Resume
      </button>
    </div>
  );
};

export default HireMeHeader;