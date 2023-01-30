import axios from "axios";
import React, { useEffect, useState } from "react";
import {  useNavigate, useParams } from "react-router";

function EditPrankCard(props) {
  const [tempPrank, setTempPrank] = useState();
  const navigate = useNavigate();

  const {prankId} = useParams();

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
    const reqBody = { title, time, place, prankee, description };

    axios
      .put(
        `${process.env.REACT_APP_API_URL}/api/prank/${prankId}`,
        reqBody,
        { headers: { Authorization: `Bearer ${storedToken}` } }
      )
      .then((res) => {
        props.toggleEditMode();
        props.refreshPrank();
      });
  };

  return (
    <>
      {tempPrank && (
        <>
          <form onSubmit={handleSubmit}>
            <label>
              Title:
              <input
                type="text"
                value={tempPrank.title}
                onChange={(e) =>
                  setTempPrank({ ...tempPrank, title: e.target.value })
                }
              />
            </label>
            <br />
            <label>
              Time:
              <input
                type="date"
                value={tempPrank.time}
                onChange={(e) =>
                  setTempPrank({ ...tempPrank, time: e.target.value })
                }
              />
            </label>
            <br />
            <label>
              Place:
              <input
                type="text"
                value={tempPrank.place}
                onChange={(e) =>
                  setTempPrank({ ...tempPrank, place: e.target.value })
                }
              />
            </label>
            <br />
            <label>
              Prankee:
              <input
                type="text"
                value={tempPrank.prankee}
                onChange={(e) =>
                  setTempPrank({ ...tempPrank, prankee: e.target.value })
                }
              />
            </label>
            <br />
            <label>
              Description:
              <textarea
                value={tempPrank.description}
                onChange={(e) =>
                  setTempPrank({ ...tempPrank, description: e.target.value })
                }
              />
            </label>
            <br />
            <button type="submit">Submit</button>
          </form>

          <form onSubmit={handleDeleteSubmit}>
            <button type={"submit"}>Delete Prank</button>
          </form>
        </>
      )}
    </>
  );
}

export default EditPrankCard;
