import { useState,useContext } from "react";
import EditPrankCard from "./EditPrankCard";
import AddStepForm from "./AddStepForm";
import CommentSection from "../components/CommentSection";
import { AuthContext } from "../context/auth.context";



function PrankCard(props) {
  const [editMode, setEditMode] = useState(false);
  const [addStepMode, setAddStepMode] = useState(false);
  const { user } = useContext(AuthContext);

  console.log(user)
  const prankOwner = props.element.userId
  console.log('prankowner',prankOwner)

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

       {(user._id === prankOwner ) && (<>

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
       </>)}   
          
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
