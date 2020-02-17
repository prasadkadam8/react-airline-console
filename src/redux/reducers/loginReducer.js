import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export function userRoleReducer(state = initialState.userRoles, action) {
  switch (action.type) {
    case types.LOAD_USER_ROLES_SUCCESS:
      return action.userRoles;
    default:
      return state;
  }
}

export function currentUserReducer(state = initialState.currentUser, action) {
    switch (action.type) {
      case types.LOAD_CURRENT_USER_SUCCESS:
        return action.currentUser;
      case types.UPDATE_CURRENT_USER_SUCCESS:
        return action.currentUser;
      default:
        return state;
    }
  }
