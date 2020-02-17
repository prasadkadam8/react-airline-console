import { handleResponse, handleError } from "./apiUtils";
const baseUrl = process.env.API_URL;

export function getUserRoles() {
    return fetch(baseUrl + "/userRoles/")
      .then(handleResponse)
      .catch(handleError);
}

export function getCurrentUser() {
    return fetch(baseUrl + "/currentUser/")
      .then(handleResponse)
      .catch(handleError);
}

export function updateCurrentUser(user) {
  return fetch(baseUrl + "/currentUser/", {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(user)
  })
    .then(handleResponse)
    .catch(handleError);
}