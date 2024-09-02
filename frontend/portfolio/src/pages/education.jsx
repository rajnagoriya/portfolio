// src/components/EducationPage.js
import React, { useContext, useEffect, useState } from 'react';
import "../style/education.css"; 
import { UserDataContext } from '../contextApi/userContext';


export const Education = () => {
  const {education} = useContext(UserDataContext);

  return (
    <div className="education-container">
      {education.map((item) => (
        <div key={item._id} className="education-item">
          <img
            src={item.InstitutionImg}
            alt={item.nameOfInstitution}
            className="institution-img"
          />
          <div className="education-details">
            <h2 className="institution-name">{item.nameOfInstitution}</h2>
            <p className="course-type">{item.typeOfCourse}</p>
            <p className="score">Score: {item.score}</p>
            <p className="date">
              {new Date(item.startDate).toLocaleDateString()} - {new Date(item.endDate).toLocaleDateString()}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};


