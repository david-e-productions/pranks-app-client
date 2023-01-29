import { Link } from "react-router-dom";

function PrankCardList(props) {
  const { title, description, _id } = props;
  return (
    <div className="PrankCard">
      <Link to={`/pranks/${_id}`}>
        <h3>{title}</h3>
      </Link>
      <p>{description}</p>
    </div>
  );
}

export default PrankCardList;
