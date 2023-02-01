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
  console.log(prankOwner);

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
          <h1 className={"m-b-20 m-t-20"} style={{fontSize:'50px'}}>
            {prop.index + 1}. {title}
          </h1>
          <p className={"m-0 form-label-blue"}>{description}</p>
          {isDone && <p className={"m-b-20 prankCardDetailCard"}>Step completed:✅</p>}
          {!isDone && <p className={"m-b-20 prankCardDetailCard"}>Step completed:❌</p>}
          <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
          { user && user._id === prankOwner && (
            <>
            
              
            
              <button
               
                className={'btn-detailpage'}
                onClick={() => setEditMode(!editMode)}
              >
                Edit
              </button>
              
            </>
          )}

          
          <Button
            onClick={() => setOpen(!open)}
            aria-controls="comment-section"
            aria-expanded={open}
            // style={{color:'black',backgroundColor:'#ED64B6', padding:'3px'}}
            className={'btn-detailpage'}
          >
            {comments.length === 0 && <p className={"m-0"}>Write a comment</p>}
            {comments.length === 1 && <p className={"m-0"}>One Comment</p>}
            {comments.length > 1 && (
              <p className={"m-0"}>{comments.length} Comments</p>
            )}
          </Button>
          </div>
          <Collapse in={open}>
            <div id="comment-section">
              {comments.map((comment) => {
                return (
                  <div>
                    <h3>{comment.user.name}</h3>
                    <p>{comment.description}</p>
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
