import React, { useEffect, useState } from 'react';
import '../../style/card.css'; // Importing the CSS file for styling

const Card = ({project=null , experience=null }) => {
  

  return (
    <div className="project-container">
        <div key={project?._id || experience?._id} className="project-card">
          <h2 className="project-heading">{project?.heading || experience?.role}</h2>
          <p className="project-name"><strong><b>title:</b></strong> {project?.name || experience?.heading || "heading missing"}</p>
          <p className="project-description"><strong>Description:</strong> {project?.discription || experience?.discription}</p>
          <p className="project-dates">
            <strong>Duration:</strong> {new Date(project?.startDate || experience?.startDate).toLocaleDateString()} - {new Date(project?.endDate || experience?.endDate).toLocaleDateString() || "till now"}
          </p>
         {project?.link?<a href={project.link} className="project-link" target="_blank" rel="noopener noreferrer">View Project</a>:"company name"}
        </div>
     
    </div>
  );
};

export default Card;
