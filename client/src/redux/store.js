import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { logger } from "redux-logger";
import { rootReducer } from "./reducers";
import env from "../env";

const environment = process.env.REACT_APP_ENV
  ? process.env.REACT_APP_ENV
  : env.APP_ENV;

const composeEnhancers = ["development", "test"].includes(environment)
  ? composeWithDevTools
  : compose;

let middlewares = [];
if (["development", "test"].includes(environment))
  middlewares = [...middlewares, logger];

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk, ...middlewares))
);

export default store;
