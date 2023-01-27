import { useState, useContext, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Collapse from "react-bootstrap/Collapse";
import { AuthContext } from "../context/auth.context";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from "axios";

// TO DO:
// add the API call to add a step
// add the username to the form so we know which user commented
//

function StepCard(prop) {
  const { title, description, isDone, comments, _id } = prop.element;
  const [stepComment, setStepComment] = useState("");
  const [open, setOpen] = useState(false);

  const { user } = useContext(AuthContext);
  const storedToken = localStorage.getItem("authToken");




  const handleStepCommentSubmit = (e) => {
    e.preventDefault();
  const userId = user._id;

    // req.body
    const reqBody = { stepComment, userId, _id };
    // here goes the axios request to the api to comment it
    axios.post(
      `${process.env.REACT_APP_API_URL}/api/commentstep`,
      { description: stepComment, userId: userId, stepId: _id },
      { headers: { Authorization: `Bearer ${storedToken}` } }
    )
    .then(()=>{
        setStepComment("")
        prop.refreshPrank()
    })
    
    
  };

  return (
    <div style={{ border: "solid" }}>
      <h3>{title}</h3>
      <p>{description}</p>
      {isDone && <p>Step completed:✅</p>}
      {!isDone && <p>Step completed:❌</p>}
      <Button
        onClick={() => setOpen(!open)}
        aria-controls="comment-section"
        aria-expanded={open}
      >
        {comments.length === 0 && <p>Write a comment</p>}
        {comments.length === 1 && <p>One comment</p>}
        {comments.length > 1 && <p>{comments.length} comments</p>}
      </Button>
      <Collapse in={open}>
        <div id="comment-section" style={{ border: "dashed" }}>
        {/* COMMENTS POPULATED */}
          {comments.map((comment) => {
            return (
              <div>
                <h3>{comment}</h3>
                <p>{comment}</p>
              </div>
            );
          })}
          <h3>Add Comment:</h3>
          <form onSubmit={handleStepCommentSubmit}>
            <input
              type="text"
              value={stepComment}
              onChange={(e) => setStepComment(e.target.value)}
            ></input>
            <button type="submit">Comment</button>
          </form>
        </div>
      </Collapse>
    </div>
  );
}

export default StepCard;
