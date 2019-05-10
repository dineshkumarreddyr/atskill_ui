import { createLogic } from "redux-logic";

import * as types from "../types";
import { map } from "rxjs/operators";

export const fetchQuestionnaireLogic = createLogic({
  type: types.FETCH_QUESTIONNAIRE.START,
  processOptions: {
    successType: types.FETCH_QUESTIONNAIRE.SUCCESS,
    failType: types.FETCH_QUESTIONNAIRE.REJECTED
  },
  process({ http, getState, action }, dispatch, done) {
    console.log(getState());
    console.log(action);
    dispatch(
      http({
        method: "GET",
        url: `${process.env.REACT_APP_API_PATH}qn/${action.payload.id}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      }).pipe(map(retVal => retVal.response))
    );
    done();
  }
});
