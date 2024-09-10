import React, { useContext} from 'react';
import { UserDataContext } from '../contextApi/userContext';

const Resume = () => {
  const {resume} = useContext(UserDataContext);
 
  return (
    <div>
      {resume.link ? (
        <iframe
        src={`${import.meta.env.VITE_SERVER}/public/Raj_resume.pdf`}
          title="Resume PDF"
          width="100%"
          height="600px"
          content='fit'
          background-color="#fff"
        />
      ) : (
        <p>Loading resume...</p>
      )}
    </div>
  );
};

export default Resume;
