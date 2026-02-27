import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { usePortfolioData } from "../context/PortfolioDataContext.jsx";

function SkillsPage() {
  const { skills } = usePortfolioData();

  useGSAP(() => {
    gsap.from("#projectHeading", {
      rotateY: -90,
      duration: 3,
      opacity: 0,
      ease: "power4.out",
    });
  });

  useGSAP(() => {
    gsap.fromTo(
      ".skill-item",
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1.5,
        stagger: 0.2,
        ease: "power3.out",
      }
    );
  }, [skills]);

  return (
    <div className="bg-palette-medium w-screen px-2 pb-8 md:px-8 md:pb-20 relative">
      <div className="h-full w-full rounded-3xl bg-cover ">
        <h2 id="projectHeading" className="capitalize text-[4rem] sm:text-[5rem] md:text-[5rem] lg:text-[5rem] font-[anzo3] font-bold text-palette-dark text-start underline decoration-palette-dark">
          skills
        </h2>
        <div className="w-full h-auto">
          <div className="skills-container grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 pt-5">
            {skills.map((skill, index) => (
              <div key={skill.id ?? index} className="skill-item p-5 rounded-lg flex flex-col items-center justify-center ">
                <img src={skill.logo} alt={skill.name} className="w-16 h-16 object-contain" />
                <p className="text-palette-dark mt-2 text-lg font-medium">{skill.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SkillsPage;