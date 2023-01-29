import axios from "axios";
import StepCard from "../components/StepCard";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Collapse from "react-bootstrap/Collapse";
import { AuthContext } from "../context/auth.context";
import EditStepCard from "../components/EditStepCard";
import UpdatePrankForm from "../components/UpdatePrankForm";

function PrankDetailPageEdit() {
  const [prank, setPrank] = useState("");

  const { prankId } = useParams();


  const getPrank = () => {
    const storedToken = localStorage.getItem("authToken");


    axios
      .get(`${process.env.REACT_APP_API_URL}/api/prank/${prankId}`)
      .then((res) => {
        console.log(res)
        setPrank(res.data)})
      .catch((err) => console.error(err));
  };

    useEffect(() => {
    getPrank();
    // eslint-disable-next-line
  }, [prankId]);

  return <>
    <UpdatePrankForm refreshPrank={getPrank}/>
  </>;
}



export default PrankDetailPageEdit;
