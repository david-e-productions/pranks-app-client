import { Link } from "react-router-dom";
import { useState } from "react";

function PrankCardList(props) {
  const { title, description,imageUrl, _id } = props;
  const {handleHover} = props

  // console.log(imageUrl)
 

  // const handleHover = (event) => {
  //   setSelectedId(event.target.id);
  //   console.log('seclected',event.target.id)
  // };

  return (
    <div   className="PrankCard">
      <Link style={{ textDecoration: "none" }} to={`/pranks/${_id}`}>
        <h1  onMouseEnter={handleHover} id={imageUrl}  style={{ fontSize: "40px" }}>{title}</h1>
      </Link>
      <p  className="prankCardDetailCard m-b-20">{description}</p>
    </div>
  );
}

export default PrankCardList;
