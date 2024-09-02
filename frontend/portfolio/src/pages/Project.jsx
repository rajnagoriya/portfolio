import Card from "../component/shared/card"
import { useContext, useState } from "react";
import "../style/project.css";
import { UserDataContext } from "../contextApi/userContext";

export const Project = () => {
    const {project} = useContext(UserDataContext);

    return(
        <>
        <div className="project-container">
        {project.map((project) => (
        <Card project={project} key={project._id}/>
    ))}
    </div>
        </>
    )
}