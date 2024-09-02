import React from "react";
import { Link } from "react-router-dom";
import "../../style/mobileFooter.css";

export const IconBtn = ({ value, path, icon }) => {
  return (
    <Link to={path} className="navBtn">
      <span className="navIcon">{icon}</span>
      <span className="navText">{value}</span>
    </Link>
  );
};
