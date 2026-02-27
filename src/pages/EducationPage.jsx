import { useGSAP } from "@gsap/react";
import EducationCard from "../components/EducationCard";
import gsap from "gsap";
import { useRef } from "react";
import { usePortfolioData } from "../context/PortfolioDataContext.jsx";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

function EducationPage() {
  const { education } = usePortfolioData();
  const educationRef = useRef([]);

  useGSAP(() => {
    gsap.from("#educationHeading", {
      rotateY: -90,
      opacity: 0,
      duration: 3,
      ease: "power4.out",
      scrollTrigger: {
        trigger: "#educationHeading",
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
    });
  });

  useGSAP(() => {
    educationRef.current.forEach((el) => {
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
  }, [education]);

  return (
    <div className="bg-palette-cream w-screen px-2 pb-8 md:px-8 md:pb-20 relative overflow-hidden">
      <div className="h-full w-full rounded-3xl bg-cover ">
        <h2
          id="educationHeading"
          className="capitalize text-[4rem] sm:text-[5rem] md:text-[5rem] lg:text-[5rem] font-[anzo3] font-bold text-palette-dark text-start underline decoration-palette-dark"
        >
          Education
        </h2>
        <div className="w-full pt-10">
          <div className="education-container grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {education.map((edu, index) => (
              <div
                key={edu.id ?? index}
                ref={(el) => (educationRef.current[index] = el)}
              >
                <EducationCard {...edu} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EducationPage;
