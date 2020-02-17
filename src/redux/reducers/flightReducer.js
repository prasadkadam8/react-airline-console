import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function flightReducer(state = initialState.flightsData, action) {
  switch (action.type) {
    case types.LOAD_FLIGHTS_SUCCESS:
      return action.flightsData;
    case types.UPDATE_FLIGHTS_SUCCESS:
      return state.map(flight =>
        flight.id === action.flightData.id ? action.flightData : flight
      );
    default:
      return state;
  }
}
