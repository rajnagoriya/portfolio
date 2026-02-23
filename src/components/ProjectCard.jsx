function ProjectCard(props) {
    return (
      <a
      className="text-palette-dark block"
      href={props.link}
      target="_blank"
      rel="noopener noreferrer">

      <div className="card bg-palette-cream/90 border-2 border-palette-dark/30 hover:border-palette-dark shadow-xl font-[anzo3] capitalize transition-colors">
        <div className="card-body">
          <h2 className="card-title font-[anzo6] text-palette-dark">
            {props.heading}
          </h2>
          <div className="badge bg-palette-dark text-palette-cream">{props.tag}</div>
          {(props.description || props.discription || []).map((dis, idx) => (
            <p key={idx} className="text-palette-dark/90">{dis}</p>
          ))}
          <div className="card-actions justify-end">
            {(props.technology || []).map((tech, idx) => (
              <div className="badge badge-outline border-palette-dark/60 text-palette-dark font-[anzo3]" key={idx}>{tech}</div>
            ))}
          </div>
        </div>
      </div>
      </a>
    );
  }
  
  export default ProjectCard;