import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";

function AddStepForm(props) {
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const { prankId } = useParams();

  const storedToken = localStorage.getItem("authToken");

  const handleSubmit = (e) => {
    e.preventDefault();
    const reqBody = { title, description, prankId };

    axios
      .post(`${process.env.REACT_APP_API_URL}/api/step`, reqBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then(() => {
        props.refreshPrank();
        props.toggleAddStepMode();
      });
  };

  return (
    <>
      <h1>Add a new Step</h1>

      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={handleSubmit}
      >
        <label className="form-label-blue">Title</label>
        <input
          className="input-yellow m-b-20"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        ></input>
        <label className="form-label-blue">Description</label>
        <input
          className="input-yellow m-b-20"
          type="textarea"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></input>
        <button 
        className="btn-detailpage"
        
        style={{ margin: "0 auto" }} type="submit">
          Add Step
        </button>
      </form>

      <button
        className="btn-detailpage"
        onClick={() => {
          props.toggleAddStepMode();
        }}
      >
        Cancel
      </button>
    </>
  );
}

export default AddStepForm;
