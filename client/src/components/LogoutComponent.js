import { NavLink } from "react-bootstrap";
import React from "react";
import axios from "axios";
import { handleLogout } from "../redux/actions/user";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

const FloatingNavlink = styled(NavLink)`
  @media (min-width: 768px) {
    float: right;
  }
`;

const LogoutComponent = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const handleClick = (e) => {
    e.preventDefault();
    console.log("hit");
    localStorage.removeItem("token");
    delete axios.defaults.headers.common.Authorization;
    dispatch(handleLogout(history));
  };
  return <FloatingNavlink onClick={handleClick}>Logout</FloatingNavlink>;
};

export default LogoutComponent;
