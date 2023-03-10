import { Link } from "react-router-dom";

function PrankCardList(props) {
  const { title, description, imageUrl, _id } = props;
  const { handleHover } = props;

  return (
    <div>
      <Link style={{ textDecoration: "none" }} to={`/pranks/${_id}`}>
        <div>
        {imageUrl && (
        <img className="imageMobile" src={imageUrl} alt={title}></img>

      )}
          <h1
            className="t-s p-t-20"
            onMouseEnter={handleHover}
            id={imageUrl}
            style={{ fontSize: "40px" }}
          >
            {title}
          </h1>
          <p className="prankCardDetailCard m-b-20">{description}</p>
        </div>
      </Link>

    </div>
  );
}

export default PrankCardList;
