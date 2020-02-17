import * as types from "./actionTypes";
import * as flightApi from "../../api/flightApi";

export function loadFlightsSuccess(flightsData) {
    return { type: types.LOAD_FLIGHTS_SUCCESS, flightsData };
}
export function updateFlightSuccess(flightData) {
    return { type: types.UPDATE_FLIGHTS_SUCCESS, flightData };
}

export function loadFlights() {
    return function (dispatch) {
        return flightApi
            .getFlightData()
            .then(flightsData => {
                dispatch(loadFlightsSuccess(flightsData));
            })
            .catch(error => {
                throw error;
            });
    };
}

export function updateFlight(flight) {
    return function (dispatch) {

        return flightApi
            .updateFlightData(flight)
            .then(flightData => {
                dispatch(updateFlightSuccess(flightData));
            })
            .catch(error => {
                throw error;
            });
    };
}