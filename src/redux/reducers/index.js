import { combineReducers } from "redux";
import flightData from "./flightReducer";
import {userRoleReducer, currentUserReducer} from "./loginReducer";

const rootReducer = combineReducers({
  flightData,
  userRoleReducer,
  currentUserReducer,
});

export default rootReducer;
