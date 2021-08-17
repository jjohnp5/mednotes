import { Col, Row } from "react-bootstrap";
import React, { Fragment } from "react";

import Profile from "../Profile";
import Templates from "../TemplateComponents/Templates";
import { useSelector } from "react-redux";

const Home = () => {
  const user = useSelector((store) => store.user);

  return (
    <Row>
      {user && user.id && (
        <Fragment>
          <Col>
            <Profile />
          </Col>
          <Col>
            <Templates />
          </Col>
        </Fragment>
      )}
    </Row>
  );
};

export default Home;
