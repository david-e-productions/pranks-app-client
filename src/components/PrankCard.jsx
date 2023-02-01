import { useState, useContext } from "react";
import EditPrankCard from "./EditPrankCard";
import AddStepForm from "./AddStepForm";
import CommentSection from "../components/CommentSection";
import { AuthContext } from "../context/auth.context";

function PrankCard(props) {
  const [editMode, setEditMode] = useState(false);
  const [addStepMode, setAddStepMode] = useState(false);
  const { user } = useContext(AuthContext);

  console.log(user);
  const prankOwner = props.element.userId;
  


  const { element, refreshPrank } = props;
  const { title, time, place, description, prankee } = element;

  console.log(time)

  const day = time.slice(0,10)
  const hour = time.slice(11,16)

  console.log(`On ${day} at ${hour}`)

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
          <h1 className={"m-t-20"}>{title}</h1>

          <div style={{ margin: "30px 0" }}>
            <p className={"m-0 form-label-blue m-b-10"}>When and Where:</p>
            <p className={"m-b-20 prankCardDetailCard"}>
            On {day} / {hour} at {place}
            </p>

            <p className={" m-0 form-label-blue"}>Description:</p>

            <p className={"m-b-20 prankCardDetailCard"}>{description}</p>
            <p className={" m-0 form-label-blue"}>Victim of the Prank:</p>

            <p className={"m-0 prankCardDetailCard"}>{prankee}</p>
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
