import axios from "axios";
import StepCard from "../components/StepCard";
import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import Button from "react-bootstrap/Button";
import Collapse from "react-bootstrap/Collapse";
import { AuthContext } from "../context/auth.context";
import { useNavigate } from "react-router-dom";

// TO DO here:
// write the submit-function for the comment and connect it to the api endpoint
// add the username to the form so we know which user commented

function PrankDetailPage() {
  const [prank, setPrank] = useState("");
  const [prankComment, setPrankComment] = useState("");
  const [prankCommentOwner, setPrankCommentOwner] = useState("");
  // const [user,setUser] = useState()
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  // setUser(useContext(AuthContext))

  const storedToken = localStorage.getItem("authToken");

  const { prankId } = useParams();

  const getPrank = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/prank/${prankId}`)
      .then((res) => setPrank(res.data))
      .catch((err) => console.error(err));
  };

  const handlePrankCommentSubmit = (e) => {
    e.preventDefault();
    const userId = user._id;

    axios
      .post(
        `${process.env.REACT_APP_API_URL}/api/commentprank`,
        { description: prankComment, user: userId, prankId: prankId },
        { headers: { Authorization: `Bearer ${storedToken}` } }
      )
      .then(() => {
        setPrankComment("");
        setPrankCommentOwner("");
        getPrank();
      });
  };

  useEffect(() => {
    getPrank();

    // eslint-disable-next-line
  }, [prankId]);

  return (
    <>
      <div>
        <button
          onClick={() => {
            navigate(`/pranks/${prank._id}/edit`);
          }}
        >
          Edit
        </button>
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
                        <h3>{comment.user}</h3>
                        <p>{comment.description}</p>
                      </div>
                    );
                  })}
                  <form onSubmit={handlePrankCommentSubmit}>
                    <input
                      type="text"
                      value={prankComment}
                      onChange={(e) => setPrankComment(e.target.value)}
                    ></input>
                    <input
                      type="hidden"
                      value={prankCommentOwner}
                      onChange={(e) => setPrankCommentOwner(e.target.value)}
                    ></input>
                    <button type="submit">Comment</button>
                  </form>
                </div>
              </Collapse>
            </>

            <div>
              {prank.steps.map((step) => {
                return (
                  <StepCard
                    key={step._id}
                    element={step}
                    refreshPrank={getPrank}
                  />
                );
              })}
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default PrankDetailPage;
