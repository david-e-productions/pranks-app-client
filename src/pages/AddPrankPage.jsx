import axios from "axios";
import React, { useState,useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";


// TO DO:
// Add the user via AuthContext to the form so we can know which user added the prank

function AddPrankPage() {
  const [title, setTitle] = useState("");
  const [time, setTime] = useState("");
  const [place, setPlace] = useState("");
  const [prankee, setPrankee] = useState("");
  const [description, setDescription] = useState("");
  const { user } = useContext(AuthContext);


  const navigate = useNavigate()

  const storedToken = localStorage.getItem("authToken");


  const handleSubmit = (e) => {
    e.preventDefault();
  const userId = user._id;

    const reqBody = {title, time, place, prankee, description, userId}

    axios.post(`${process.env.REACT_APP_API_URL}/api/prank`,reqBody,{ headers: { Authorization: `Bearer ${storedToken}` } })
    .then((res)=>{navigate(`/pranks`)})

  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Title:
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </label>
      <br />
      <label>
        Time:
        <input
          type="date"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
      </label>
      <br />
      <label>
        Place:
        <input
          type="text"
          value={place}
          onChange={(e) => setPlace(e.target.value)}
        />
      </label>
      <br />
      <label>
        Prankee:
        <input
          type="text"
          value={prankee}
          onChange={(e) => setPrankee(e.target.value)}
        />
      </label>
      <br />
      <label>
        Description:
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </label>
      <br />
      <button type="submit">Submit</button>
    </form>
  );
}

export default AddPrankPage;
