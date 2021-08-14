import { React } from "react";
import { Col, Row } from "react-bootstrap";
import Profile from "../Profile";
import Templates from "../TemplateComponents/Templates";

const Home = () => {
  return (
    <Row>
      <Col>
        <Profile />
      </Col>
      <Col>
        <Templates />
      </Col>
    </Row>
  );
};

export default Home;
