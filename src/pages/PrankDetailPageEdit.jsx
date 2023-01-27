import axios from "axios";
import StepCard from "../components/StepCard";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Collapse from "react-bootstrap/Collapse";
import { AuthContext } from "../context/auth.context";
import EditStepCard from "../components/EditStepCard";

// TO DO here:
// write the submit-function for the comment and connect it to the api endpoint
// add the username to the form so we know which user commented

function PrankDetailPageEdit() {
  const [prank, setPrank] = useState("");
  const [prankComment, setPrankComment] = useState("");
  const [open, setOpen] = useState(false);


  const { prankId } = useParams();
  console.log(prankId)
  console.log(prank)

  const getPrank = () => {
    const storedToken = localStorage.getItem("authToken");

    // All API REQS NEED AUTH FOR API

    axios
      .get(`${process.env.REACT_APP_API_URL}/api/pranks/${prankId}`)
      .then((res) => {
        console.log(res)
        setPrank(res.data)})
      .catch((err) => console.error(err));
  };

  const handlePrankCommentSubmit = () => {
    // req.body
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

            <>
              <Button
                onClick={() => setOpen(!open)}
                aria-controls="comment-section"
                aria-expanded={open}
              >
                {prank.comments.length === 0 && <p>Write a comment</p>}
                {prank.comments.length === 1 && <p>One comment</p>}
                {prank.comments.length > 1 && (
                  <p>{prank.comments.length} comments</p>
                )}
              </Button>
              <Collapse in={open}>
                <div id="comment-section">
                  {prank.comments.map((comment) => {
                    return (
                      <div>
                        <h3>Placeholder:Username of Commenter</h3>
                        <p>{comment}</p>
                      </div>
                    );
                  })}
                  <form onSubmit={handlePrankCommentSubmit}>
                    <input
                      type="text"
                      value={prankComment}
                      onChange={(e) => setPrankComment(e.target.value)}
                    ></input>
                    <button type="submit">Comment</button>
                  </form>
                </div>
              </Collapse>
            </>

            <div>
              {prank.steps.map((step) => {
                return <EditStepCard key={step._id} element={step} />;
              })}
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default PrankDetailPageEdit;
