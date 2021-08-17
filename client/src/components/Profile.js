import { Col, Row } from "react-bootstrap";

import React from "react";
import { useSelector } from "react-redux";

const Profile = () => {
  const user = useSelector((store) => store.user);

  return (
    <Row>
      <Col>
        <h1>Welcome back, {user.firstName}!</h1>
      </Col>
    </Row>
  );
};

export default Profile;
