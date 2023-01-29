import React, { useState, useContext } from "react";
import Button from "react-bootstrap/Button";
import Collapse from "react-bootstrap/Collapse";
import axios from "axios";
import { AuthContext } from "../context/auth.context";
import { useParams } from "react-router-dom";

function CommentSection(props) {
  const [open, setOpen] = useState(false);
  const [prankComment, setPrankComment] = useState("");
  const [prankCommentOwner, setPrankCommentOwner] = useState("");
  const { user } = useContext(AuthContext);
  const { comments } = props.prank;

  const storedToken = localStorage.getItem("authToken");

  const { prankId } = useParams();

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
        props.refreshPrank();
      });
  };

  return (
    <>
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
        <div id="comment-section">
          {comments.map((comment) => {
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
  );
}

export default CommentSection;
