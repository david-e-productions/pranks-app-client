import { useState } from "react";
import EditPrankCard from "./EditPrankCard";
import AddStepForm from "./AddStepForm";
import CommentSection from "../components/CommentSection";


function PrankCard(props) {
  const [editMode, setEditMode] = useState(false);
  const [addStepMode, setAddStepMode] = useState(false);

  const { element, refreshPrank } = props;
  const { title, time, place, description, prankee } = element;

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };
  const toggleAddStepMode = () => {
    setAddStepMode(!addStepMode);
  };

  return (
    <>
      {!editMode && !addStepMode && (
        <>
          <h1>{title}</h1>
          <p>
            On {time} at {place}
          </p>
          <p>{description}</p>
          <p>{prankee}</p>
          <button
            onClick={() => {
              toggleEditMode();
            }}
          >
            Edit
          </button>
          <button
            onClick={() => {
              toggleAddStepMode();
            }}
          >
            Add Step
          </button>
          <CommentSection prank={element} refreshPrank={refreshPrank}/>

        </>
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
