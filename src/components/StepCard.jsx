import { useState, useContext } from "react";
import Button from "react-bootstrap/Button";
import Collapse from "react-bootstrap/Collapse";
import { AuthContext } from "../context/auth.context";
import axios from "axios";
import EditStepCard from "./EditStepCard";

function StepCard(prop) {
  const { title, description, isDone, comments, _id } = prop.element;
  const [stepComment, setStepComment] = useState("");
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const prankOwner = prop.prank.userId;

  const { user } = useContext(AuthContext);
  const storedToken = localStorage.getItem("authToken");

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const handleStepCommentSubmit = (e) => {
    e.preventDefault();

    const userId = user._id;

    axios
      .post(
        `${process.env.REACT_APP_API_URL}/api/commentstep`,
        { description: stepComment, user: userId, stepId: _id },
        { headers: { Authorization: `Bearer ${storedToken}` } }
      )
      .then(() => {
        setStepComment("");
        prop.refreshPrank();
      });
  };

  return (
    <div>
      {!editMode && (
        <>
          <h1 className={"m-b-20 m-t-20"} style={{ fontSize: "50px" }}>
            {prop.index + 1}. {title}
          </h1>
          <p className={"form-label-blue"}>{description}</p>
          {isDone && (
            <p className={"m-b-20 prankCardDetailCard"}>Step completed:✅</p>
          )}
          {!isDone && (
            <p className={"m-b-20 prankCardDetailCard"}>Step completed:❌</p>
          )}
          {user && user._id === prankOwner && (
            <div className="m-b-20 ">
              <button
                className={"btn-detailpage"}
                style={{ margin: "0 auto" }}
                onClick={() => setEditMode(!editMode)}
              >
                Edit
              </button>
            </div>
          )}
          {user && (
            <>
              <Button
                onClick={() => setOpen(!open)}
                aria-controls="comment-section"
                aria-expanded={open}
                style={{ margin: "0 auto" }}
                className={"btn-detailpage"}
              >
                {comments.length === 0 && (
                  <p className={"m-0"}>Write a comment</p>
                )}
                {comments.length === 1 && <p className={"m-0"}>One Comment</p>}
                {comments.length > 1 && (
                  <p className={"m-0"}>{comments.length} Comments</p>
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
                        <p className="form-label-blue m-b-20 ">
                          {comment.description}
                        </p>
                      </div>
                    );
                  })}
                  <form onSubmit={handleStepCommentSubmit}>
                    <textarea
                      className="input-yellow"
                      type="text"
                      value={stepComment}
                      onChange={(e) => setStepComment(e.target.value)}
                    />
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
            </>
          )}
        </>
      )}
      {editMode && (
        <>
          <EditStepCard
            element={prop.element}
            toggleEditMode={toggleEditMode}
            refreshPrank={prop.refreshPrank}
          />
        </>
      )}
    </div>
  );
}

export default StepCard;
