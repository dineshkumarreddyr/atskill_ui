import { createLogic } from "redux-logic";
import * as types from "../types";

import { map } from "rxjs/operators";

export const patchQuestionnaireLogic = createLogic({
  type: types.PATCH_QUESTIONNAIRE.START,
  transform({ getState, action }, next) {
    const existingPayloadData = action.payload || {};
    const id = existingPayloadData.id;

    next({
      ...action,
      id
    });
  },
  process({ http, getState, action }, dispatch, done) {
    console.log(getState());
    return http
      .patch(
        `${process.env.REACT_APP_API_PATH}qn/patch/${action.id}`,
        action.payload
      )
      .pipe(map(retVal => retVal.response))
      .subscribe(
        response => {
          dispatch({
            type: types.PATCH_QUESTIONNAIRE.SUCCESS,
            payload: action.payload
          });
          done();
        },
        error => {
          dispatch({ type: types.PATCH_QUESTIONNAIRE.REJECTED, error: error });
          done();
        }
      );
  }
});
