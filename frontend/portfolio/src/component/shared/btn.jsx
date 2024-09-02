import { Link } from "react-router-dom"
import "../../style/Nav.css"
export const Btn = ({value,path}) =>{
    return(
        <>
        <Link to={path} className="btn">{value}</Link>
        </>
    )
}