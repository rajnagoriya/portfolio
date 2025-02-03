import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

const skills = [
  { name: "Javascript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
  { name: "React", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "Redux", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg" },
  { name: "Next.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
  { name: "Node.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
  { name: "Express.js", logo: "https://th.bing.com/th/id/OIP.1ji9NLQl3sOXktSoEYnt3wHaHa?rs=1&pid=ImgDetMain" },
  { name: "MongoDB", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
  { name: "MySQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
  { name: "Prisma", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prisma/prisma-original.svg" },
  { name: "GSAP", logo: "https://webdesignledger.com/wp-content/uploads/2016/06/greensock-man-512x512.png" },
  { name: "Tailwind CSS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
  { name: "Bootstrap", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg" },
  { name: "Git", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
  { name: "jwt", logo: "https://img.icons8.com/color/600w/000000/java-web-token.png" }
];

function SkillsPage() {
  gsap.registerPlugin(ScrollTrigger);

  useGSAP(() => {
    gsap.from("#projectHeading", {
      rotateY: -90,
      duration: 3,
      opacity: 0,
      ease: 'power4.out',
      scrollTrigger: {
        trigger: "#projectHeading",
        start: 'top 85%',
        toggleActions: "play none none reverse",
      }
    });
  });

  useGSAP(() => {
    gsap.from(".skill-item", {
      opacity: 0,
      y: 50,
      duration: 1.5,
      stagger: 0.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".skills-container",
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });
  });

  return (
    <div className="bg-black w-screen px-8">
      <div className="shadow-lg h-full w-full rounded-3xl bg-cover p-[5vw]">
        <h2 id="projectHeading" className="capitalize text-[4rem] sm:text-[5rem] md:text-[5rem] lg:text-[5rem] font-[anzo3] font-bold text-white text-start underline">
          skills
        </h2>
        <div className="w-full h-auto">
          <div className="skills-container grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 pt-5">
            {skills.map((skill, index) => (
              <div key={index} className="skill-item p-5 rounded-lg flex flex-col items-center justify-center shadow-lg transform hover:scale-105 transition-transform duration-300">
                <img src={skill.logo} alt={skill.name} className="w-16 h-16 object-contain" />
                <p className="text-white mt-2 text-lg">{skill.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SkillsPage;




// import { useGSAP } from "@gsap/react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/all";


// const skills = [
//   { name: "Javascript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
//   { name: "React", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
//   { name: "Redux", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg" },
//   { name: "Next.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
//   { name: "Node.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
//   { name: "Express.js", logo: "https://th.bing.com/th/id/OIP.1ji9NLQl3sOXktSoEYnt3wHaHa?rs=1&pid=ImgDetMain" },
//   { name: "MongoDB", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
//   { name: "MySQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
//   { name: "Prisma", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prisma/prisma-original.svg" },
//   { name: "GSAP", logo: "https://webdesignledger.com/wp-content/uploads/2016/06/greensock-man-512x512.png" },
//   { name: "Tailwind CSS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
//   { name: "Bootstrap", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg" },
//   { name: "Git", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
//   { name: "jwt", logo: "https://img.icons8.com/color/600w/000000/java-web-token.png" }
// ];

// function SkillsPage() {
 
//   gsap.registerPlugin(ScrollTrigger);

//   useGSAP(function(){
//     gsap.from("#projectHeading",{
//       rotateY: -90,
//       duration:3,
//       opacity: 0,
//       ease: 'power4.out',
//       scrollTrigger:{
//         trigger : "#projectHeading",
//         start: 'top 85%',
//         toggleActions: "play none none reverse",
//       }
//     });
//   })


//   useGSAP(() => {
//     gsap.from(".skill-item", {
//       opacity: 0,
//       y: 50,
//       duration: 1.5,
//       stagger: 0.2,
//       ease: "power3.out",
//       scrollTrigger: {
//         trigger: ".skills-container",
//         start: "top 80%",
//         toggleActions: "play none none reverse",
//       },
//     });
//   });

//   return (
//     <div
//       className=" bg-black w-screen px-8 relative"
//     >
//     <div className="shadow-lg h-full w-full rounded-3xl bg-cover bg-black
//         p-[5vw]">
//       <h2  id="projectHeading" className="capitalize text-[5rem] flex underline font-[anzo3] font-bold">skills</h2>
//       <div className="w-full h-auto">
//       <div className=" w-full">
//       <div className="skills-container grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 pt-5">
//         {skills.map((skill, index) => (
//           <div key={index} className="skill-item  p-3 rounded-lg flex flex-col items-center justify-center shadow-lg transform hover:scale-105 transition-transform duration-300">
//             <img src={skill.logo} alt={skill.name} className="w-16 h-16 object-contain  " />
//             <p className="text-white mt-2 text-lg ">{skill.name}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//       </div>
//     </div>
//     </div>
//   )
// }

// export default SkillsPage