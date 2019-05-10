import { createLogic } from "redux-logic";

import * as types from "../types";
import { map } from "rxjs/operators";

export const createQuestionnaireLogic = createLogic({
  type: types.CREATE_QUESTIONNAIRE.START,
  transform({ getState, action }, next) {
    const existingPayloadData = action.payload || {};
    const meta = {
      ...existingPayloadData,
      createdAt: new Date()
        .toISOString()
        .slice(0, 19)
        .replace("T", " "),
      createdBy: "Dinesh Rachumalla"
    };

    next({
      ...action,
      meta
    });
  },
  process({ http, getState, action }, dispatch, done) {
    console.log("Current State", getState());
    return http
      .post(`${process.env.REACT_APP_API_PATH}qn`, action.meta)
      .pipe(map(retVal => retVal.response))
      .subscribe(
        response => {
          dispatch({
            type: types.CREATE_QUESTIONNAIRE.SUCCESS,
            payload: response
          });
          done();
        },
        error => {
          dispatch({
            type: types.CREATE_QUESTIONNAIRE.REJECTED,
            error: error
          });
          done();
        }
      );
  }
});
