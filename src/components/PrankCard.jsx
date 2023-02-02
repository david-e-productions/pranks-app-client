import { useState, useContext } from "react";
import EditPrankCard from "./EditPrankCard";
import AddStepForm from "./AddStepForm";
import CommentSection from "../components/CommentSection";
import { AuthContext } from "../context/auth.context";

function PrankCard(props) {
  const [editMode, setEditMode] = useState(false);
  const [addStepMode, setAddStepMode] = useState(false);
  const { user } = useContext(AuthContext);

  const prankOwner = props.element.userId;

  const { element, refreshPrank } = props;
  const { title, time, place, description, imageUrl, prankee } = element;

  const renderDate = () => {
    if (time) {
      return `On ${time.slice(0, 10)} at ${time.slice(11, 16)} at ${place} `;
    }
  };

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };
  const toggleAddStepMode = () => {
    setAddStepMode(!addStepMode);
  };

  return (
    <>
      {!editMode && !addStepMode && (
        <div>
          <h1 className={"m-t-20 t"}>{title}</h1>

          {imageUrl && (
            <>
              <img className="imgDetailPage" src={imageUrl} alt={title}></img>
            </>
          )}

          <div style={{ margin: "30px 0" }}>
            <p className={"form-label-blue"}>When and Where:</p>
            <p className={"m-b-20 prankCardDetailCard"}>{renderDate()}</p>
            <p className={" form-label-blue"}>Description:</p>
            <p className={"m-b-20 prankCardDetailCard"}>{description}</p>
            <p className={" form-label-blue"}>Victim of the Prank:</p>
            <p className={"prankCardDetailCard"}>{prankee}</p>
          </div>
          {user && user._id === prankOwner && (
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              <button
                className={"bootstrap-overrides btn-detailpage"}
                onClick={() => {
                  toggleEditMode();
                }}
              >
                Edit
              </button>
              <button
                className={"bootstrap-overrides btn-detailpage"}
                onClick={() => {
                  toggleAddStepMode();
                }}
              >
                Add Step
              </button>
            </div>
          )}
          {user && (
            <CommentSection prank={element} refreshPrank={refreshPrank} />
          )}
        </div>
      )}
      {addStepMode && (
        <>
          <AddStepForm
            refreshPrank={refreshPrank}
            toggleAddStepMode={toggleAddStepMode}
          />
        </>
      )}
      {editMode && (
        <>
          <EditPrankCard
            toggleEditMode={toggleEditMode}
            refreshPrank={refreshPrank}
          />
        </>
      )}
    </>
  );
}

export default PrankCard;
