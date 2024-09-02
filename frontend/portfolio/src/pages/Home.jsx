import { useContext, useEffect, useState } from "react";
import { Btn } from "../component/shared/btn";
import "../style/home.css"
import { UserDataContext } from "../contextApi/userContext";
const btns = [
    {
        value: "project",
        path: "/project"
    },
    {
        value:"education",
        path:"/education"
    },
    {
        value: "expirence",
        path: "/expirence"
    },
    {
        value: "resume",
        path: "/resume"
    }
]
export const Home = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 600);

    const handleResize = () => {
      setIsMobile(window.innerWidth < 600);
    };
  
    useEffect(() => {
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);
  
    const {userName,profileImage,about} = useContext(UserDataContext);
    
    return <>
        <section className="hero">
            <div className="flip-card">
                <div className="flip-card-inner">
                    <div className="flip-card-front">
                        <div>
                            <img src={profileImage} alt="profile img" />
                        </div>
                        <div className="data">HELLO<br />
                            i am
                            <h1 >{userName || "raj nagoriya"} </h1>
                            a devloper
                        </div>
                    </div>
                    <div className="flip-card-back">
                        <h1>about</h1>
                        <p>{about}</p>
                    </div>
                </div>
            </div>
            <div id="hero_center_btn">
            
                {isMobile ? "" : btns.map((i,idx) => <Btn value={i.value} path={i.path} key={idx}/>)} 
            
            </div>
        </section>
    </>
}
