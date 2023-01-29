
import { useState, useContext, useEffect } from "react";
import EditPrankCard from "./EditPrankCard";


function PrankCard (props) {
    const [editMode, setEditMode] = useState(false);
    
    const {element,refreshPrank} = props
    const {title,time,place,description,prankee} = element
    console.log('refreshPrank',refreshPrank)
    console.log('element',element)


    const toggleEditMode = () =>{
        setEditMode(!editMode)
      }

    return (
        <>
        {!editMode && (
            <>
            <h1>{title}</h1>
            <p>
              On {time} at {place}
            </p>
            <p>{description}</p>
            <p>{prankee}</p>
            <button
          onClick={() => {
toggleEditMode()          }}
        >
          Edit
        </button>
        <button onClick={()=>{
        // the PrankCard should switch to <AddStepForm>
        }}>Add Step</button>
        </>

        )}

        {editMode && (<>
            <EditPrankCard toggleEditMode={toggleEditMode} refreshPrank={refreshPrank}/>

        </>)}
             
        </>
    )
}

export default PrankCard