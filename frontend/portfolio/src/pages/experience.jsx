import Card from "../component/shared/card"
import { useContext } from "react";
import "../style/project.css";
import { UserDataContext } from '../contextApi/userContext';

export const Expirence = () => {
    const {experience} = useContext(UserDataContext);

    return(
        <>
        <div className="project-container">
        {experience.map((experience) => (
        <Card experience={experience} key={experience._id}/>
    ))}
    </div>
        </>
    )
}
