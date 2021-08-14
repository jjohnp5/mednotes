import { React } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { NavLink } from "react-bootstrap";
import { handleLogout } from "../redux/actions/user";
import styled from "styled-components";

const FloatingNavlink = styled(NavLink)`
  @media (min-width: 768px) {
    float: right;
  }
`;

const LogoutComponent = () => {
  const dispatch = useDispatch();
  const handleClick = (e) => {
    e.preventDefault();
    console.log("hit");
    localStorage.removeItem("token");
    delete axios.defaults.headers.common.Authorization;
    dispatch(handleLogout());
    window.location = "/";
  };
  return <FloatingNavlink onClick={handleClick}>Logout</FloatingNavlink>;
};

export default LogoutComponent;
