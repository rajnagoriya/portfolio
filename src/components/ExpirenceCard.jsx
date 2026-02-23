
function ExpirenceCard(props) {
    return (
      <div className="card shadow-xl font-[anzo3] capitalize bg-palette-medium/40 border-2 border-palette-dark/30 hover:border-palette-dark transition-colors">
        <div className="card-body">
          <h2 className="card-title font-[anzo6] text-palette-dark">
            {props.role}
          </h2>
          <div className="badge h-auto w-fit bg-palette-dark text-palette-cream">{props.type}</div>
          <div className="badge h-auto w-auto badge-outline border-palette-dark/60 text-palette-dark font-[anzo3]">{props.date}</div>
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
    );
  }
  
  export default ExpirenceCard;