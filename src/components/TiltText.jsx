function TiltText(props) {
  return (
    <div
      ref={props.tltRef}
      id="tiltDiv"
      className="relative mt-32 ml-5 text-white max-w-full overflow-hidden px-4 text-start"
    >
      {/* Adjusted line height for responsiveness */}
      <h1 className="text-[2rem] sm:text-[3rem] md:text-[4rem] lg:text-[4rem] uppercase font-[anzo5] leading-none">
        hello, i am <br />
        <span className="text-slate-800 block">Raj Nagoriya</span>
      </h1>

      <h1 className="text-[3rem] sm:text-[5rem] md:text-[6rem] lg:text-[6rem] uppercase font-[anzo1] leading-none">
        Developer
      </h1>

      <p className="uppercase font-[anzo6] font-bold ml-1 text-[0.75rem] sm:text-[1rem] md:text-[1.2rem]">
        to hire
      </p>
    </div>
  );
}

export default TiltText;