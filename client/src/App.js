import "./App.css";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Routes from "./Routes";
import { setLoggedInUser } from "./redux/actions/user";
import { useHistory } from "react-router-dom";

function App() {
  const user = useSelector((store) => store.user);
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(token);
    if (token) {
      dispatch(setLoggedInUser(token, history));
    }
    // eslint-disable-next-line
  }, []);
  useEffect(() => {}, [user]);
  return <Routes />;
}

export default App;
