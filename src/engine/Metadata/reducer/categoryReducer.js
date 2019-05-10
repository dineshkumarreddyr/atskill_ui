import * as types from "../types";

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_META_CATEGORIES.SUCCESS:
      return action.payload;
    default:
      return state;
  }
};
