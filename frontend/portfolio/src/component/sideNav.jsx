import { Btn } from "./shared/btn"
import "../style/Nav.css";
const btns = [
    {
        value:"home",
        path:"/"
    },
    {
        value:"project",
        path:"/project"
    },
    {
        value:"expirence",
        path:"/expirence"
    },
    {
        value:"resume",
        path:"/resume"
    },
    {
        value:"education",
        path:"/education"
    },
]

export const SideNave = () => {
    return(
        <>
        <div id="sideNav">
            {
                btns.map((i,idx)=><Btn value={i.value} path={i.path} key={idx}/> )
            }
       </div>
        </>
    )
}