import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { AuthContext } from "../context/auth.context";

function UpdatePrankForm () {
  const [prank, setPrank] = useState("");
  const [tempPrank,setTempPrank] = useState()

    // const [title, setTitle] = useState(prank.title);
    // const [time, setTime] = useState("");
    // const [place, setPlace] = useState(prank.place);
    // const [prankee, setPrankee] = useState(prank.prankee);
    // const [description, setDescription] = useState(prank.description)


    const prankId = useParams()

    const navigate = useNavigate()

    const storedToken = localStorage.getItem("authToken");


    const getPrank = () => {
      axios
        .get(`${process.env.REACT_APP_API_URL}/api/prank/${prankId.prankId}`)
        .then((res) => {
          setTempPrank(res.data)
          setPrank(res.data)})
        .catch((err) => console.error(err));
    }

    useEffect(()=>{
      getPrank()
    },[])
  
    const handleSubmit = (e) => {
      e.preventDefault();

      const {title, time, place, prankee, description} = tempPrank
      const reqBody = {title, time, place, prankee, description}
      console.log('title',title)
      console.log('reqBody',reqBody)
  
      axios.put(`${process.env.REACT_APP_API_URL}/api/prank/${prankId.prankId}`,reqBody,
      { headers: { Authorization: `Bearer ${storedToken}` } }
      
      )
      .then((res)=>{navigate(`/pranks/${res.data._id}`)})
  
    };
  

    return (
      <>
 {tempPrank && (
  <form onSubmit={handleSubmit}>
      <label>
        Title:
        <input
          type="text"
          value={tempPrank.title}
          onChange={(e) => setTempPrank({...tempPrank, title: e.target.value})}
        />
      </label>
      <br />
      <label>
        Time:
        <input
          type="date"
          value={tempPrank.time}
          onChange={(e) => setTempPrank({...tempPrank, time: e.target.value})}
        />
      </label>
      <br />
      <label>
        Place:
        <input
          type="text"
          value={tempPrank.place}
          onChange={(e) => setTempPrank({...tempPrank, place: e.target.value})}
        />
      </label>
      <br />
      <label>
        Prankee:
        <input
          type="text"
          value={tempPrank.prankee}
          onChange={(e) => setTempPrank({...tempPrank, prankee: e.target.value})}
        />
      </label>
      <br />
      <label>
        Description:
        <textarea
          value={tempPrank.description}
          onChange={(e) => setTempPrank({...tempPrank, description: e.target.value})}
        />
      </label>
      <br />
      <button type="submit">Submit</button>
    </form>
)}
      </>
   
      
    )
}

export default UpdatePrankForm