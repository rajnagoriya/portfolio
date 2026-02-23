function EducationCard(props) {
  return (
    <div className="card shadow-xl font-[anzo3] capitalize bg-palette-medium/40 border-2 border-palette-dark/30 hover:border-palette-dark transition-colors">
      <div className="card-body">
        <h2 className="card-title font-[anzo6] text-palette-dark">
          {props.degree}
        </h2>
        <p className="text-palette-dark/90 font-medium">{props.institution}</p>
        {props.grade && (
          <div className="badge h-auto w-fit bg-palette-dark text-palette-cream">
            {props.grade}
          </div>
        )}
        {props.location && (
          <div className="badge h-auto w-auto badge-outline border-palette-dark/60 bg-palette-dark text-palette-cream font-[anzo3]">
            {props.location}
          </div>
        )}
        <div className="badge h-auto w-auto badge-outline border-palette-dark/60 bg-palette-dark text-palette-cream font-[anzo3]">
          {props.date}
        </div>
      </div>
    </div>
  );
}

export default EducationCard;
