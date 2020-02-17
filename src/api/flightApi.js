import { handleResponse, handleError } from "./apiUtils";
const baseUrl = process.env.API_URL + "/flightData/";

export function getFlightData() {
    return fetch(baseUrl)
      .then(handleResponse)
      .catch(handleError);
}

export function updateFlightData(flight) {
  return fetch(baseUrl + (flight.id || ""), {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(flight)
  })
    .then(handleResponse)
    .catch(handleError);
}