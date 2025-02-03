
// role , type , discription ,
function ExpirenceCard(props) {
    return (
      <div className="card shadow-xl font-[anzo3] capitalize bg-black border-solid border-white border-2 ">
        <div className="card-body">
          <h2 className="card-title font-[anzo6]">
            {props.role}
          </h2>
          <div className="badge h-auto w-fit bg-slate-800 text-white">{props.type}</div>
          <div className="badge h-auto w-auto badge-outline font-[anzo3]">{props.date}</div>
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
    );
  }
  
  export default ExpirenceCard;