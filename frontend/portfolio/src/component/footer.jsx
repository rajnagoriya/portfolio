import { Link } from "react-router-dom";
import "../style/Nav.css";
import { useContext, useState } from "react";
import { UserDataContext } from "../contextApi/userContext";



export const Footer = () => {
  const {profileLinks} = useContext(UserDataContext);
    return(<>
      <div  id="footer">
        
     {profileLinks.map((i)=> 
     <Link to={i.link} key={i._id} className="link_tag"  target="_blank">
      <img src={i.imgUrl} alt="img" className="footer-img"/>
      <div className="image-overlay">{i.name}</div>
      </Link>)}
    </div>
    </>)
}