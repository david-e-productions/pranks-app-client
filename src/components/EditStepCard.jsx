import { useLocation } from "react-router-dom";

function EditStepCard () {
const id = useLocation().search.split("=")[1];

    return (
        <h1>Now its the edit step card!!</h1>
    )
}

export default EditStepCard