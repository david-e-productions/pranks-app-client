import { Link } from "react-router-dom";

function PrankCardList(props) {
  const { title, description, _id } = props;
  return (
    <div className="PrankCard">
      <Link 
      style={{textDecoration:'none'}}
      to={`/pranks/${_id}`}>
        <h1
        style={{fontSize:'40px'}}
        >{title}</h1>
      </Link>
      <p
      className="prankCardDetailCard"
      >{description}</p>
    </div>
  );
}

export default PrankCardList;
