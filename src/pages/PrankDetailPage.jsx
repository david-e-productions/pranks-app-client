import axios from "axios";
import StepCard from "../components/StepCard";
import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import Button from "react-bootstrap/Button";
import Collapse from "react-bootstrap/Collapse";
import PrankCard from "../components/PrankCard";


function PrankDetailPage() {
  const [prank, setPrank] = useState("");


  const { prankId } = useParams();

  const getPrank = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/prank/${prankId}`)
      .then((res) => setPrank(res.data))
      .catch((err) => console.error(err));
  };



  useEffect(() => {
    getPrank();

    // eslint-disable-next-line
  }, [prankId]);

  return (
    <>
      <div>
        {prank && (
          <>
            <PrankCard
              key={prank._id}
              element={prank}
              refreshPrank={getPrank}
              
            />
           

            <div>
              {prank.steps.map((step) => {
                return (
                  <StepCard
                    key={step._id}
                    element={step}
                    refreshPrank={getPrank}
                    prank={prank}
                  />
                );
              })}
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default PrankDetailPage;
