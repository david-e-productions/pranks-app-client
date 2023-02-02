import axios from "axios";
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import service from "../api/service";

// TO DO:
// Add the user via AuthContext to the form so we can know which user added the prank

function AddPrankPage() {
  const [title, setTitle] = useState("");
  const [time, setTime] = useState("");
  const [place, setPlace] = useState("");
  const [prankee, setPrankee] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");
  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  const storedToken = localStorage.getItem("authToken");

  const handleFileUpload = (e) => {
    const uploadData = new FormData();

    uploadData.append("imageUrl", e.target.files[0]);

    service
      .uploadImage(uploadData)
      .then((response) => {
        setImageUrl(response.fileUrl);
      })
      .catch((err) => console.log("Error while uploading the file: ", err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const userId = user._id;

    const reqBody = {
      title,
      time,
      place,
      prankee,
      imageUrl,
      description,
      userId,
    };

    axios
      .post(`${process.env.REACT_APP_API_URL}/api/prank`, reqBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((res) => {
        navigate(`/pranks`);
      });
  };

  return (
    <div className="lightblue-bg p-0" style={{ height: "100vh" }}>
      <form onSubmit={handleSubmit}>
        <label className={"form-label-blue"}>Title: </label>
        <input
          className={"input-yellow m-b-20"}
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label className={"form-label-blue"}>Time and date: </label>
        <input
          className={"input-yellow m-b-20"}
          type="datetime-local"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
        <label className={"form-label-blue"}>Place: </label>
        <input
          className={"input-yellow m-b-20"}
          type="text"
          value={place}
          onChange={(e) => setPlace(e.target.value)}
        />
        <label className={"form-label-blue"}>Prankee: </label>
        <input
          className={"input-yellow m-b-20"}
          type="text"
          value={prankee}
          onChange={(e) => setPrankee(e.target.value)}
        />
        <label className={"form-label-blue"}>Choose an image: </label>
        <label for="file-input">
          <input
            className="m-b-20 input-yellow ts"
            type="file"
            onChange={(e) => handleFileUpload(e)}
          />
        </label>

        <label className={"form-label-blue"}>Description: </label>
        <textarea
          className={"input-yellow m-b-20"}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button className="btn-blue" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default AddPrankPage;
