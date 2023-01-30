import axios from "axios";
import PrankCardList from "../components/PrankCardList";
import {useState, useEffect} from 'react'

function PrankListPage() {
  const [pranks,setPranks] = useState([])


// All API REQS NEED AUTH FOR API


  const getAllPranks = () => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/pranks`)
      .then((res)=>{
        setPranks(res.data)})
      .catch((err)=>console.error(err))
  }

  useEffect(()=>{
    getAllPranks()
  },[])

  return (
    <>
      <h1>List of all Pranks</h1>
        {pranks.map((prank) => {
        return (
            <PrankCardList key={prank._id} {...prank}/>
        )
      })}
    </>
  );
}

export default PrankListPage;
