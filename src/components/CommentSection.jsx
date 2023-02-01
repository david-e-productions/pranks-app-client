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

  console.log(props);

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

  const handleDeleteSubmit = (id) => {
    const storedToken = localStorage.getItem("authToken");

    axios
      .delete(`${process.env.REACT_APP_API_URL}/api/comment/${id}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then(() => props.refreshPrank())
      .catch((err) => console.error(err));
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Button
        style={{ margin: "0 auto" }}
        onClick={() => setOpen(!open)}
        aria-controls="comment-section"
        aria-expanded={open}
        className={"bootstrap-overrides btn-detailpage"}
      >
        {comments.length === 0 && (
          <p style={{ margin: "0" }}>Write a comment</p>
        )}
        {comments.length === 1 && <p style={{ margin: "0" }}>One comment</p>}
        {comments.length > 1 && (
          <p style={{ margin: "0" }}>{comments.length} comments</p>
        )}
      </Button>

      <Collapse in={open}>
        <div id="comment-section">
          {comments.map((comment) => {
            return (
              <div>
                <p
                  className="prankCardDetailCard m-t-20"
                  style={{ marginBottom: "0" }}
                >
                  {comment.user.name} commented:
                </p>
                <p className="form-label-blue ">{comment.description}</p>
                {user && user.name === comment.user.name && (
                  <button
                    onClick={() => handleDeleteSubmit(comment._id)}
                    className="btn-detailpage"
                    style={{ margin: "5px auto" }}
                    type={"submit"}
                  >
                    Delete comment
                  </button>
                )}
              </div>
            );
          })}
          <form onSubmit={handlePrankCommentSubmit}>
            <textarea
              className="input-yellow"
              type="text"
              value={prankComment}
              onChange={(e) => setPrankComment(e.target.value)}
            />
            <input
              type="hidden"
              value={prankCommentOwner}
              onChange={(e) => setPrankCommentOwner(e.target.value)}
            ></input>
            <button
              style={{ margin: "0 auto" }}
              className="btn-detailpage"
              type="submit"
            >
              Comment
            </button>
          </form>
        </div>
      </Collapse>
    </div>
  );
}

export default CommentSection;
