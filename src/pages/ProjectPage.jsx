import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import ProjectCard from "../components/ProjectCard";
import { useState, useRef, useEffect } from "react";
import { usePortfolioData } from "../context/PortfolioDataContext.jsx";
gsap.registerPlugin(ScrollTrigger);

function ProjectPage() {
  const { projects } = usePortfolioData();
  const [filteredProjects, setFilteredProjects] = useState(projects);
  const projectRefs = useRef([]);


//  Animation for Heading
  useGSAP(() => {
    gsap.from("#projectHeadin", {
      rotateY: -90,
      opacity: 0,
      duration: 3,
      ease: "power4.out",
      scrollTrigger: {
        trigger: "#projectHeadin",
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
    });
  });

  // GSAP Animation (Each Card Animates Individually When It Enters View)
  useGSAP(() => {
    projectRefs.current.forEach((el, index) => {
      if (el) {
        gsap.fromTo(
          el,
          { scale: 0.7, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            stagger:1,
            scrollTrigger: {
              trigger: el,
              start: "top 100%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    });
  }, [filteredProjects]);

  useEffect(() => {
    setFilteredProjects(projects);
  }, [projects]);

  // Filter function
  const findThisTypeProjects = (e) => {
    if (e.target.value === "All") {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter((project) => project.tag === e.target.value));
    }
  };

  const uniqueTags = [...new Set(projects.map((p) => p.tag).filter(Boolean))];

  return (
    <div
    className="bg-palette-light w-screen px-8 relative"
  >
    <div className="h-full w-full rounded-3xl bg-cover p-[5vw]">
      <h2 id="projectHeadin" className="capitalize text-[4rem] sm:text-[5rem] md:text-[5rem] lg:text-[5rem] font-[anzo3] font-bold text-palette-dark text-start underline decoration-palette-dark">
      Projects
        </h2>
      <div className="w-full pt-10">
        <div className="w-full flex">
          <p className="text-[1.2rem] capitalize font-[anzo3] text-palette-dark">Filter by:</p>
          <select
            name="project_type"
            id="projectType"
            onChange={findThisTypeProjects}
            className="text-palette-dark bg-palette-cream/80 border border-palette-dark/40 rounded-lg px-3 py-1 font-[anzo3] ml-3 focus:outline-none focus:ring-2 focus:ring-palette-medium"
          >
            <option value="All">All</option>
            {uniqueTags.map((tag) => (
              <option key={tag} value={tag}>{tag}</option>
            ))}
          </select>
        </div>

        {/* Project Cards */}
        <div className="project-container grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-5">
          {filteredProjects.map((project, index) => (
            <div key={project.id ?? index} ref={(el) => (projectRefs.current[index] = el)}>
              <ProjectCard {...project} />
            </div>
          ))}
        </div>
      </div>
    </div>
    </div>
  );
}

export default ProjectPage;