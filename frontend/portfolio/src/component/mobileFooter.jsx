import React from "react";
import { IconBtn } from "./shared/iconBtns";
import "../style/mobileFooter.css";

const btns = [
  {
    value: "project",
    path: "/project",
    icon: "📁",
  },
  {
    value: "experience",
    path: "/expirence",
    icon: "💼",
  },
  {
    value: "resume",
    path: "/resume",
    icon: "📄",
  },
  {
    value: "education",
    path: "/education",
    icon: "🎓",
  },
  {
    value: "profiles",
    path: "/profiles",
    icon: "⚓",
  },
];

export const MobileFooterNav = () => {
  return (
    <div className="footerNav">
      {btns.map((btn, idx) => (
        <IconBtn key={idx} value={btn.value} path={btn.path} icon={btn.icon} />
      ))}
    </div>
  );
};
