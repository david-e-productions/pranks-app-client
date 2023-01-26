import axios from "axios";
import StepCard from "../components/StepsCard";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function PrankDetailPage() {
  const [prank, setPrank] = useState(null);
  const [prankComment, setPrankComment] = useState(null);

  const { prankId } = useParams();

  const getPrank = () => {
    const storedToken = localStorage.getItem("authToken");

    // All API REQS NEED AUTH FOR API

    axios
      .get(`${process.env.REACT_APP_API_URL}/api/pranks/${prankId}`)
      .then((res) => setPrank(res.data))
      .catch((err) => console.error(err));
  };

  const handlePrankCommentSubmit = () => {

    // here goes the axios request to the api to comment it
  };

  useEffect(() => {
    getPrank();
    // eslint-disable-next-line
  }, [prankId]);

  return (
    <>
      <div>
        {prank && (
          <>
            <h1>{prank.title}</h1>
            <p>
              On {prank.time} at {prank.place}
            </p>
            <p>{prank.description}</p>
            <p>{prank.prankee}</p>
            {prank.comments.map((comment) => {
              return (
                <div>
                  <p>{comment}</p>
                </div>
              );
            })}
            {prank.steps.map((step) => {
              return <StepCard elment={step} />;
            })}
          </>
        )}
      </div>
      <div>
        <h3>Add a comment</h3>

        <form onSubmit={handlePrankCommentSubmit}>
            <input type='text' value={prankComment} onChange={e=>setPrankComment(e.target.value)}></input>
            <button type='submit'>Comment</button>
        </form>
      </div>
    </>
  );
}

export default PrankDetailPage;
