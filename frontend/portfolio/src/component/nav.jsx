import "../style/Nav.css";
import { useState } from "react";
import { IconBtn } from "./shared/iconBtns";
export const NavBar = ({isMobile}) => {
  const [name, setName] = useState("Raj nagoriya");
    return(<>
      <div  id="nav">
        {isMobile? <IconBtn key={"home"} value={"home"} path={"/"} icon={"🏠"} />:""}
        <h1 className="children">RAJ NAGORIYA</h1>
        {/* <p >email: <u>rajnagoriya3@gmail.com </u></p>
        <p >Mo. <u>7566200482</u></p> */}
    </div>
    </>)
}