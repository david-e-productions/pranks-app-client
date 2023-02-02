import axios from "axios";
import StepCard from "../components/StepCard";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import PrankCard from "../components/PrankCard";

import { Row, Col } from "react-bootstrap";

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
      {prank && (
        <div className={"lightblue-bg pink-font"}>

          <Row className={"p-0"}>
            <Col md={6} className={"lightblue-bg pink-font"}>

              <PrankCard
                key={prank._id}
                element={prank}
                refreshPrank={getPrank}
              />
            </Col>

            <Col md={6} className="p-0">
            {prank.steps.length === 0 && (
              <h1 className='p-t-20'>No Steps added yet</h1>
            )}
              {prank.steps.map((step, index) => {
                
                return (

                  <>
                    <Col
                      className={
                        index % 2 === 0
                          ? "green-bg  fullwidth p-0"
                          : "yellow-bg  fullwidth p-0"
                      }
                    >

                      <StepCard
                        key={step._id}
                        element={step}
                        refreshPrank={getPrank}
                        prank={prank}
                        index={index}
                      />
                    </Col>

                  </>
                );
              })}
            

            </Col>
          </Row>
        </div>
      )}
    </>
  );
}

export default PrankDetailPage;
