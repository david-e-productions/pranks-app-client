import axios from "axios";
import StepCard from "../components/StepsCard";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function PrankDetailPage() {
  const { prank, setPrank } = useState(null);

  const {title,time,place,description,prankee,comments,steps} = prank

  const { prankId } = useParams();


  const getPrank = () => {
    const storedToken = localStorage.getItem("authToken");

  // All API REQS NEED AUTH FOR API


    axios
      .get(`${process.env.REACT_APP_API_URL}/api/projects/${prankId}`)
      .then((res) => setPrank(res.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getPrank();
        // eslint-disable-next-line
  }, [prankId]);


  return (

    <div>

    {prank && (
        <>
        <h1>{title}</h1>
      <p>
        On {time} at {place}
      </p>
      <p>{description}</p>
      <p>{prankee}</p>
      {comments.map((comment) => {
        return (
          <div>
            <p>{comment}</p>
          </div>
        );
      })}
      {steps.map((step) => {
        return <StepCard elment={step} />;
      })}
        </>
    )}

    </div>
  );
}

export default PrankDetailPage;
