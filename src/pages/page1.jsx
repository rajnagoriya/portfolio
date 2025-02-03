import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, useState } from "react";
import TiltText from "../components/TiltText";

function Page1() {
  const tiltRef = useRef(null);
  const [xVal, setXVal] = useState(0);
  const [yVal, setYVal] = useState(0);

  const mouseMoving = (e) => {
    setXVal(
      (e.clientX -
        tiltRef.current.getBoundingClientRect().x -
        tiltRef.current.getBoundingClientRect().width / 2) /
        20
    );
    setYVal(
      -(
        e.clientY -
        tiltRef.current.getBoundingClientRect().y -
        tiltRef.current.getBoundingClientRect().height / 2
      ) / 15
    );
  };

  useGSAP(function(){
    gsap.to(tiltRef.current,{
      transform :`rotateX(${yVal}deg) rotateY(${xVal}deg)`,
      duration : 2,
      ease: 'power4.out'
    });
  },[xVal,yVal])

  return (
    <div
      className="h-screen bg-black w-screen relative overflow-hidden"
      onMouseMove={(e) => {
        mouseMoving(e);
      }}
    >
      <div
        id="page1-in"
        className="relative  h-full w-full rounded-3xl bg-cover
        p-[5vw] flex justify-center items-start flex-col"
      >
        <TiltText tltRef={tiltRef} />
        
        <div className="mt-10 font-[anzo6] flex justify-end items-end font-bold  w-full h-[100px] text-white">
          <h3 className="brightness-200 font-[anzo6]">
            Let’s Build Something Great Together
          </h3>
        </div>
      </div>
    </div>
  );
}
export default Page1;
