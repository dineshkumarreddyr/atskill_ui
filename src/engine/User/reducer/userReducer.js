import * as types from "../types";

const initalState = {};

export default function(state = initalState, action) {
  switch (action.type) {
    case types.FETCH_USERS.SUCCESS:
      return action.payload;
    default:
      return state;
  }
}
