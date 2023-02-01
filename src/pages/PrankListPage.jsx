import axios from "axios";
import PrankCardList from "../components/PrankCardList";
import { useState, useEffect } from "react";
import {  Row, Col } from "react-bootstrap";

function PrankListPage() {
  const [pranks, setPranks] = useState([]);

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

      <Row className="lightblue-bg p-0" 
      style={{backgroundImage: 'linear-gradient(  #ed64b6 ,#018ff5)',height:'100vh'}}>

        <Col className="p-0" md={6} fluid>
          <h1 className="p-0 m-b-20 m-t-10">All Pranks:</h1>
          {pranks.map((prank) => {
            return <PrankCardList key={prank._id} {...prank} />;
          })}
        </Col>
        <Col className="p-0" md={6}>
          <h2 className="p-0">add images here</h2>
        </Col>
      </Row>
    </>
  );
}

export default PrankListPage;
