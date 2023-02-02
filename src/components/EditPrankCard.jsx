import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import service from "../api/service";


function EditPrankCard(props) {
  const [tempPrank, setTempPrank] = useState();
  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState("");


  const { prankId } = useParams();

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

  const handleDeleteSubmit = (e) => {
    e.preventDefault();
    const storedToken = localStorage.getItem("authToken");
    axios
      .delete(`${process.env.REACT_APP_API_URL}/api/prank/${prankId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then(() => navigate("/pranks"))
      .catch((err) => console.error(err));
  };

  const storedToken = localStorage.getItem("authToken");

  const getPrank = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/prank/${prankId}`)
      .then((res) => {
        setTempPrank(res.data);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getPrank();
    // eslint-disable-next-line
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const { title, time, place, prankee, description } = tempPrank;
    const reqBody = { title, time, place, prankee, imageUrl, description };

    axios
      .put(`${process.env.REACT_APP_API_URL}/api/prank/${prankId}`, reqBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((res) => {
        props.toggleEditMode();
        props.refreshPrank();
      });
  };

  return (
    <div>
      <h1>Edit Prank</h1>
      {tempPrank && (
        <>
          <form onSubmit={handleSubmit}>
            <label className={"form-label-blue"}>Title:</label>
            <input
              className={"input-yellow"}
              type="text"
              value={tempPrank.title}
              onChange={(e) =>
                setTempPrank({ ...tempPrank, title: e.target.value })
              }
            />
            <br />
            <label className={"form-label-blue"}>Time:</label>
            <input
              className={"input-yellow"}
              type="datetime-local"
              value={tempPrank.time}
              onChange={(e) =>
                setTempPrank({ ...tempPrank, time: e.target.value })
              }
            />
            <br />
            <label className={"form-label-blue"}>Place:</label>
            <input
              className={"input-yellow"}
              type="text"
              value={tempPrank.place}
              onChange={(e) =>
                setTempPrank({ ...tempPrank, place: e.target.value })
              }
            />
            <br />
            <label className={"form-label-blue"}>Prankee:</label>
            <input
              className={"input-yellow"}
              type="text"
              value={tempPrank.prankee}
              onChange={(e) =>
                setTempPrank({ ...tempPrank, prankee: e.target.value })
              }
            />
            <br />
            <label className={"form-label-blue"}>Description:</label>
        <input type="file" onChange={(e) => handleFileUpload(e)} />

            <textarea
              className={"input-yellow"}
              value={tempPrank.description}
              onChange={(e) =>
                setTempPrank({ ...tempPrank, description: e.target.value })
              }
            />
            <br />
            <button
              style={{ margin: "0 auto" }}
              className={"btn-detailpage"}
              type="submit"
            >
              Save changes
            </button>
          </form>
          <form onSubmit={handleDeleteSubmit}>
            <button
              style={{ margin: "0 auto" }}
              className={"btn-detailpage"}
              type={"submit"}
            >
              Delete Prank
            </button>
          </form>
        </>
      )}
    </div>
  );
}

export default EditPrankCard;
