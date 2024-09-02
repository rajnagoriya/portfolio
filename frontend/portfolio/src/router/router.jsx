import { createBrowserRouter, Outlet, useLocation } from "react-router-dom";
import { Home } from "../pages/Home";
import { NavBar } from "../component/nav";
import { SideNave } from "../component/sideNav";
import { Project } from "../pages/Project";
import "../style/LayOut.css"
import { Expirence } from "../pages/experience";
import { Resume } from "../pages/resume";
import { Footer } from "../component/footer";
import { MobileFooterNav } from "../component/mobileFooter";
import { useEffect, useState } from "react";
import { Profiles } from "../pages/profiles";
import { Education } from "../pages/education";
import NotFound from "../pages/notFound";



const LayOut = () =>{

    const [isMobile, setIsMobile] = useState(window.innerWidth < 600);

    const handleResize = () => {
      setIsMobile(window.innerWidth < 600);
    };
  
    useEffect(() => {
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);
  

    const location = useLocation();
    return <>
    <NavBar isMobile={isMobile}/>
    <div className="center">
   {location.pathname !== "/"?<>
   <div className="center1"><SideNave /></div><div className="center2"><Outlet /></div></>:<Outlet/>}
    </div>
    {isMobile ? <MobileFooterNav /> : <Footer />}
    </>
}

export const router = createBrowserRouter([
    {
        path:"/",
        element:<LayOut/>,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/project",
                element: <Project />,
            },
            {
                path: "/expirence",
                element: <Expirence />,
            },
            {
                path: "/resume",
                element: <Resume />,
            },
            {
                path: "/education",
                element: <Education />,
            },
            {
                path: "/profiles",
                element: <Profiles />,
            },
            {
                path: "*", 
                element: <NotFound />,
            }
        ]
    }
])

