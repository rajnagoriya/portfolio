import { useGSAP } from "@gsap/react";
import ExpirenceCard from "../components/ExpirenceCard";
import gsap from "gsap";
import { useRef } from "react";

const Expirence = [
    {
      role: "Frontend Developer",
      type: "Intern",
      discription: ["Developed responsive web components using React.js and Tailwind CSS","Collaborated with cross-functional teams to integrate APIs and deploy new features"],
      technology: ["React", "Tailwind CSS", "Redux",'Git',"Team Work"],
      date: "Nov-2024 to Nov-2024"
    },
    {
        role: "Freelancer",
        type: "FullStack Developer",
        discription: ["worked on multiple project with international client","Designed and developed real-time chat web applications with seamless scalability","Built REST APIs to support real-time engagement and localization features.","Resolved bugs and optimized existing applications for performance."],
        technology: ["React","nextjs","Redux", "MongoDB","MySQL","Tailwind CSS",'Git',"Api handling"],
        date: "Jun-2024 to Present"

    },
  ];


function ExpirencePage() {

  const expirenceRef = useRef([]);

  //  Animation for Heading
  useGSAP(() => {
    gsap.from("#expirenceHeading", {
      rotateY: -90,
      opacity: 0,
      duration: 3,
      ease: "power4.out",
      scrollTrigger: {
        trigger: "#expirenceHeading",
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
    });
  });

  useGSAP(() => {
    expirenceRef.current.forEach((el) => {
      if (el) {
        gsap.fromTo(
          el,
          { scale: 0.7, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    });
  });

  return (
    <div
    className=" bg-black w-screen px-8 relative overflow-hidden"
  >
    <div className=" h-full w-full rounded-3xl bg-cover bg-black
        p-[5vw]">
      <h2 id="expirenceHeading" className="capitalize text-[4rem] sm:text-[5rem] md:text-[5rem] lg:text-[5rem] font-[anzo3] font-bold text-white text-start underline">
      Expirence
        </h2>
      <div className="w-full pt-10">
      {/* expirence card  */}
      <div className="expirence-container grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"> 
              {Expirence.map((exp, index) => (
            <div key={index} ref={(el) => (expirenceRef.current[index] = el)}>
              <ExpirenceCard {...exp} />
            </div>
          ))}
        </div>
        </div>
    </div>
    </div>
  )
}

export default ExpirencePage