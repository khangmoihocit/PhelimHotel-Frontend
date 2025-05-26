import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import Header from "./Header";
import { SiPlanetscale } from "react-icons/si";
import { FaClock, FaUtensils, FaWifi } from "react-icons/fa";

const HotelService = () => {
  return (
    <>
      <Container className="mb-2">
        <Header title={"Our Services"} />

        <Row>
          <h4 className="text-center">
            Services at <span className="hotel-color"> Phelim Hotel</span>
            <span className="gap-2">
              <FaClock />
              -24-Hour Front Desk
            </span>
          </h4>
        </Row>
        <hr />
        <Row xs={1} md={2} lg={3} className="g-4 mt-2">
          <Col>
            <Card.Body>
              <Card.Title className="hotel-color">
                <FaWifi /> Wifi
              </Card.Title>
              <Card.Text>
                Stay connected with hight-speed internet access.
              </Card.Text>
            </Card.Body>
          </Col>
          <Col>
            <Card.Body>
              <Card.Title className="hotel-color">
                <FaUtensils /> Breakfast
              </Card.Title>
              <Card.Text>
                Stay connected with hight-speed internet access.
              </Card.Text>
            </Card.Body>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default HotelService;
