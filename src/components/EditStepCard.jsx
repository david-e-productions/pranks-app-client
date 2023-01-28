import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { propTypes } from "react-bootstrap/esm/Image";

function EditStepCard(prop) {
  const [step, setStep] = useState(prop.element);
  const [stepTemp, setStepTemp] = useState(prop.element);
  const navigate = useNavigate();

  console.log(stepTemp.isDone)

  const handleSubmit = (e) => {
    e.preventDefault();
    const stepId = prop.element._id;
    const storedToken = localStorage.getItem("authToken");

    const { title, isDone, description } = stepTemp;
    const reqBody = { title, isDone, description };

    axios
      .put(`${process.env.REACT_APP_API_URL}/api/step/${stepId}`, reqBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((res) => {
        prop.function();
        prop.refreshPrank();
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Title</label>
      <input
        type="text"
        value={stepTemp.title}
        onChange={(e) => {
          setStepTemp({ ...stepTemp, title: e.target.value });
        }}
      ></input>
      <br />
      <label>Description</label>
      <input type={"textarea"} value={stepTemp.description} onChange={(e) => {
          setStepTemp({ ...stepTemp, description: e.target.value });
        }}></input>
      <br />

      <label>Step done?</label>
      <input type="checkbox" value={stepTemp.isDone} onChange={(e) => {
          setStepTemp({ ...stepTemp, isDone: e.target.checked });
        }}></input>
      <br />

      <button type="submit">Save changes</button>
    </form>
  );
}

export default EditStepCard;
