import * as types from "./actionTypes";
import * as loginApi from "../../api/loginApi";

export function loadUserRolesSuccess(userRoles) {
    return { type: types.LOAD_USER_ROLES_SUCCESS, userRoles };
}
export function loadCurrentUserSuccess(currentUser) {
    return { type: types.LOAD_CURRENT_USER_SUCCESS, currentUser };
}
export function updateCurrentUserSuccess(currentUser) {
    return { type: types.UPDATE_CURRENT_USER_SUCCESS, currentUser };
}

export function loadUserRoles() {
    return function (dispatch) {
        return loginApi
            .getUserRoles()
            .then(userRoles => {
                dispatch(loadUserRolesSuccess(userRoles));
            })
            .catch(error => {
                throw error;
            });
    };
}
export function loadCurrentUser() {
    return function (dispatch) {
        return loginApi
            .getCurrentUser()
            .then(currentUser => {
                dispatch(loadCurrentUserSuccess(currentUser));
            })
            .catch(error => {
                throw error;
            });
    };
}
export function updateCurrentUser(user) {
    return function (dispatch) {
        return loginApi
            .updateCurrentUser(user)
            .then(user => {
                dispatch(updateCurrentUserSuccess(user));
            })
            .catch(error => {
                throw error;
            });
    };
}