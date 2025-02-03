function ProjectCard(props) {
    return (
      <a
      className="text-white  "
      href={props.link}
      target="_blank"
      rel="noopener noreferrer">

      <div className="card bg-black  shadow-xl font-[anzo3] capitalize border-solid border-white border-2">
        {/* <figure className="h-72  w-full bg-red-400">
          <img src={props.img} alt={props.heading} className="h-[100%] w-[100%]"/>
        </figure> */}
        <div className="card-body">
          <h2 className="card-title font-[anzo6]">
            {props.heading}
          </h2>
          <div className="badge bg-slate-800 text-white">{props.tag}</div>
          {props.discription.map((dis, idx) => (
            <p key={idx}>{dis}</p>
          ))}
          <div className="card-actions justify-end">
            {props.technology.map((tech, idx) => (
              <div className="badge badge-outline font-[anzo3]" key={idx}>{tech}</div>
            ))}
          </div>
        </div>
      </div>
      </a>
    );
  }
  
  export default ProjectCard;