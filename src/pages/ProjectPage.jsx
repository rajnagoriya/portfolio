import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import ProjectCard from "../components/ProjectCard";
import { useState, useRef } from "react";
gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    heading: "Real Time Chat Web App",
    tag: "Fullstack",
    discription: ["Built a real-time chat application using Next.js, Node.js, and MySQL.",
      "Integrated one-on-one and group chats with notifications",
      "Designed for scalability and seamless user interaction.",
      "chatting one-on-one or in a group, RealTimeX ensures instant message delivery, typing indicators, read receipts, and media sharing for an uninterrupted experience."
    ],
    technology: ["Nextjs", "Tailwind CSS", "shadcn ui","nodejs","expressjs","prisma","mysql","socket.io","rest Api"],
    link: "https://client-chat-app-raj-nagoriyas-projects.vercel.app/login",
    img: "https://cdn.pixabay.com/photo/2016/11/30/18/14/chat-1873543_1280.png",
  },
  {
    heading: "Email Automation with AI",
    tag: "Backend",
    discription: ["Developed an AI-powered email response system using Cohere AI and Google OAuth2.",
      "Implemented task scheduling and real-time caching with BullMQ and Redis",
      "give automatic reply based on the intrest of user in our product."
    ],
    technology: ["Node.js", "Express.js", "redis","BullMQ","Google OAuth2", "Cohere AI Api","Rest Api"],
    link: "https://github.com/rajnagoriya/emailAutomation",
    img: "https://cdn.pixabay.com/photo/2018/03/22/02/37/email-3249062_1280.png",
  },
  {
    heading: "airbnb clone",
    tag: "Fullstack",
    discription: ["Built an Airbnb-like platform with authentication and CRUD operations.","Hosts can list properties, and travelers can book with ease.","Secure login & registration system.","Accessible on all devices for a smooth experience."],
    technology: [ "Node.js", "expressjs", "MongoDB","Tailwind Css","ejs","jwt","rest Api"],
    link: "https://airbnb-qkcc.onrender.com/",
    img: "https://cdn.pixabay.com/photo/2018/05/08/21/28/airbnb-3384008_1280.png",
  }
];

function ProjectPage() {
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

  // Filter function
  const findThisTypeProjects = (e) => {
    if (e.target.value === "All") {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter((project) => project.tag === e.target.value));
    }
  };

  return (
    <div
    className=" bg-black  w-screen px-8 relative"
  >
    <div className="shadow-lg  h-full w-full rounded-3xl bg-cover bg-black
        p-[5vw]">
      <h2 id="projectHeadin" className="capitalize text-[4rem] sm:text-[5rem] md:text-[5rem] lg:text-[5rem] font-[anzo3] font-bold text-white text-start underline">
      Projects
        </h2>
      <div className="w-full pt-10">
        <div className="w-full flex">
          <p className="text-[1.2rem] capitalize font-[anzo3]">Select by Tech:</p>
          <select
            name="project_type"
            id="projectType"
            onChange={findThisTypeProjects}
            className="text-white font-[anzo3] ml-3"
          >
            <option value="All">All</option>
            {/* <option value="Frontend">Frontend</option> */}
            <option value="Backend">Backend</option>
            <option value="Fullstack">FullStack</option>
          </select>
        </div>

        {/* Project Cards */}
        <div className="project-container grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-5">
          {filteredProjects.map((project, index) => (
            <div key={index} ref={(el) => (projectRefs.current[index] = el)}>
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