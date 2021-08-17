import { Button, Col, Form, Row } from "react-bootstrap";
import React, { useState } from "react";

import axios from "axios";
import { handleLogin } from "../redux/actions/user";
import jwt_decode from "jwt-decode";
import { login } from "../services/user";
import styled from "styled-components";
import { useDispatch } from "react-redux";

const TallRow = styled(Row)`
  min-height: ${window.innerHeight * 0.5}px;
  flex-direction: column;
`;

const LoginComponent = ({ history }) => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "username":
        setUsername(value);
        break;
      case "password":
        setPassword(value);
        break;
      default:
        break;
    }
  };
  const submit = async (e) => {
    e.preventDefault();
    try {
      const loginData = await login({ username, password });
      localStorage.setItem("token", loginData.data.token);
      axios.defaults.headers.common.Authorization = `Bearer ${loginData.data.token}`;
      const decoded = jwt_decode(loginData.data.token);
      dispatch(handleLogin(decoded));
      history.push("/");
    } catch (err) {
      console.log("unauthorized.");
    }
  };
  return (
    <TallRow>
      <Col></Col>
      <Col>
        <Row>
          <Col></Col>
          <Col xs={12} sm={6}>
            <Form>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter email"
                  name="username"
                  value={username}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={password}
                  onChange={handleChange}
                />
              </Form.Group>
              <Button variant="primary" type="submit" onClick={submit}>
                Submit
              </Button>
            </Form>
          </Col>
          <Col></Col>
        </Row>
      </Col>
      <Col></Col>
    </TallRow>
  );
};

export default LoginComponent;
