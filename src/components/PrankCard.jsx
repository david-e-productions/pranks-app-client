
import { useState, useContext, useEffect } from "react";
import EditPrankCard from "./EditPrankCard";
import AddStepForm from "./AddStepForm";



function PrankCard (props) {
    const [editMode, setEditMode] = useState(false);
    const [addStepMode,setAddStepMode] = useState(false)
    
    const {element,refreshPrank} = props
    const {title,time,place,description,prankee} = element
    console.log('refreshPrank',refreshPrank)
    console.log('element',element)


    const toggleEditMode = () =>{
        setEditMode(!editMode)
      }

    return (
        <>
        {(!editMode && !addStepMode) && (
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
            setAddStepMode(!addStepMode)
        }}>Add Step</button>
        </>

        )}

        {addStepMode && (
            <>
<AddStepForm refreshPrank={refreshPrank}/>
            </>
        ) }

        {editMode && (<>
            <EditPrankCard toggleEditMode={toggleEditMode} refreshPrank={refreshPrank}/>

        </>)}
             
        </>
    )
}

export default PrankCard