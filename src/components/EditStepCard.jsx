import { useState } from "react";
import axios from "axios";

function EditStepCard(prop) {
  const [stepTemp, setStepTemp] = useState(prop.element);

  const handleDeleteSubmit = (e) => {
    e.preventDefault();
    const stepId = prop.element._id;
    const storedToken = localStorage.getItem("authToken");

    axios
      .delete(`${process.env.REACT_APP_API_URL}/api/step/${stepId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then(() => prop.refreshPrank())
      .catch((err) => console.error(err));
  };

  const handleUpdateSubmit = (e) => {
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
        prop.toggleEditMode();
        prop.refreshPrank();
      });
  };

  return (
    <>
      <h1 className="p-t-20" style={{ fontSize: "50px" }}>
        Edit Step
      </h1>
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={handleUpdateSubmit}
      >
        <label className="form-label-blue">Title</label>
        <input
          className="input-yellow"
          type="text"
          value={stepTemp.title}
          onChange={(e) => {
            setStepTemp({ ...stepTemp, title: e.target.value });
          }}
        ></input>
        <br />
        <label className="form-label-blue">Description</label>
        <input
          className="input-yellow"
          type={"textarea"}
          value={stepTemp.description}
          onChange={(e) => {
            setStepTemp({ ...stepTemp, description: e.target.value });
          }}
        ></input>
        <br />
        <div className="prankCardDetailCard">
          <label>Step done?</label>
          <input
            className="prankCardDetailCard .checkbox"
            type="checkbox"
            checked={stepTemp.isDone}
            onChange={(e) => {
              setStepTemp({ ...stepTemp, isDone: e.target.checked });
            }}
          ></input>
        </div>

        <br />

        <button
          className="btn-detailpage"
          style={{ margin: "5px auto" }}
          type="submit"
        >
          Save changes
        </button>
      </form>
      <form onSubmit={handleDeleteSubmit}>
        <button
          className="btn-detailpage"
          style={{ margin: "5px auto" }}
          type={"submit"}
        >
          Delete Step
        </button>
      </form>
    </>
  );
}

export default EditStepCard;
