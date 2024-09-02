import { useContext, useState } from "react"
import { Link } from "react-router-dom"
import "../style/profiles.css";
import { UserDataContext } from "../contextApi/userContext";


export const Profiles = () => {
    const {profileLinks} = useContext(UserDataContext);
    return (
        <>
            <div id="profiles">
                {profileLinks.map((i) =>
                    <Link to={i.link} key={i._id} className="link_tag" target="_blank">
                        <img src={i.imgUrl} alt="img" className="footer-img" />
                        {i.name}
                    </Link>)}
            </div>
        </>
    )
}