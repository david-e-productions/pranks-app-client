import axios from "axios";
import PrankCardList from "../components/PrankCardList";
import { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";

function PrankListPage() {
  const [pranks, setPranks] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  const handleHover = (event) => {
    if (event.target.id) {
      setSelectedId(event.target.id);
    }
  };

  const getAllPranks = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/pranks`)
      .then((res) => {
        setPranks(res.data);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getAllPranks();
  }, []);

  return (
    <>
      <Row className="lightblue-bg p-0">
        <Col className="p-0" md={6}>
          <h1 className="p-0 m-b-20 m-t-10 t">All Pranks:</h1>
          {pranks.map((prank) => {
            return (
              <PrankCardList
                key={prank._id}
                {...prank}
                handleHover={handleHover}
              />
            );
          })}
        </Col>
        <Col className="p-0" md={6}>
          {selectedId && (
            <img
              style={{ position: "absolute", top: "30%", left: "45%" }}
              src={selectedId}
              alt="pranks"
            ></img>
          )}
        </Col>
      </Row>
    </>
  );
}

export default PrankListPage;
