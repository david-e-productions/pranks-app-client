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
        props.toggleAddStepMode()
      });
  };

  return (
    <>
      <h3>Add a new Step</h3>

      <form onSubmit={handleSubmit}>
        <label>Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        ></input>
        <label>Description</label>
        <input
          type="textarea"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></input>
        <button type="submit">Add Step</button>
      </form>
    </>
  );
}

export default AddStepForm;
