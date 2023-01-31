import axios from "axios";
import StepCard from "../components/StepCard";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import PrankCard from "../components/PrankCard";

import { Container, Row, Col, ListGroup } from "react-bootstrap";

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
      <Container fluid>
        {prank && (
          <>

            <Row fluid className={"p-0"}>
              <Col fluid md={6} className={'lightblue-bg pink-font'} >
                <PrankCard
                  key={prank._id}
                  element={prank}
                  refreshPrank={getPrank}
                />
              </Col>

              <Col fluid md={6} className={'fullwidth'} >
                <Container fluid className={'p-0'}>
                  {prank.steps.map((step,index) => {
                    return (
                      <Row  fluid className={index % 2 === 0 ? "green-bg  fullwidth" : "yellow-bg  fullwidth"}>
                        <Col className={'fullwidth'}>
                          <StepCard
                            key={step._id}
                            element={step}
                            refreshPrank={getPrank}
                            prank={prank}
                            index={index}
                          />
                        </Col>
                      </Row>
                    );
                  })}
                </Container>
              </Col>
            </Row>
          </>
        )}
      </Container>
    </>
  );
}

export default PrankDetailPage;
