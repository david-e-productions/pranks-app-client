import { useState } from "react";
import Button from "react-bootstrap/Button";
import Collapse from "react-bootstrap/Collapse";
import { AuthContext } from "../context/auth.context";
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'



// TO DO:
// add the API call to add a step
// add the username to the form so we know which user commented
// 

function StepCard(prop) {
  const { title, description, isDone, comments, _id } = prop.element;
  const [stepComment, setStepComment] = useState(null);
  const [open, setOpen] = useState(false);


  const handleStepCommentSubmit = () => {
    // req.body
    // here goes the axios request to the api to comment it
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
          {comments.map((comment) => {
            return (
              <div>
                <h3>Placeholder:Username of Commenter</h3>
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
