import React, { useContext} from 'react';
import { UserDataContext } from '../contextApi/userContext';

export const Resume = () => {
  const {resume} = useContext(UserDataContext);
 
  return (
    <div>
      {resume.link ? (
        // <iframe
        //   src={resume.link}
        //   title="Resume PDF"
        //   width="100%"
        //   height="600px"
        //   content='fit'
        //   background-color="#fff"
        // />
        <img src={resume.link}
        width="100%"
          // height="600px"
        alt="resume img" />
      ) : (
        <p>Loading resume...</p>
      )}
    </div>
  );
};
