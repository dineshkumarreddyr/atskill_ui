import * as types from "../types";

const initialState = {
  list: [],
  error: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_QUESTIONNAIRE.SUCCESS:
      return { ...state, list: action.payload };
    case types.CREATE_QUESTIONNAIRE.SUCCESS:
      return {
        ...state,
        list: [...state.list, ...action.payload]
      };
    case types.CREATE_QUESTIONNAIRE.REJECTED:
      return { ...state, ...{ error: action.error } };
    case types.DELETE_QUESTIONNAIRE.START:
      const filteredItems = state.filter(item => item.id !== action.payload.id);
      return { ...state, ...{ list: filteredItems } };
    default:
      return state;
  }
};
