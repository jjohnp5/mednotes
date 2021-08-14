import { combineReducers } from "redux";
import { userReducer } from "./user";
import { templateReducer } from "./templates";
import { patientReducer } from "./patients";
import { visitReducer } from "./visits";
import { fieldReducer } from "./fields";
import { junctionReducer } from "./templateJunction";

export const rootReducer = combineReducers({
  user: userReducer,
  templates: templateReducer,
  patients: patientReducer,
  visits: visitReducer,
  templateFields: fieldReducer,
  fieldMaps: junctionReducer,
});
