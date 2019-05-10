import { createLogic } from "redux-logic";
import * as types from "../types";

import { map } from "rxjs/operators";

export const pushSkillsLogic = createLogic({
  type: types.PUSH_SKILLS.START,
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
    console.log("current state", getState());
    return http
      .post(`${process.env.REACT_APP_API_PATH}skill/push`, action.meta)
      .pipe(map(retVal => retVal.status === 200 && retVal.response))
      .subscribe(
        response => {
          if (response && response.code === "ER_DUP_ENTRY") {
            dispatch({
              type: types.PUSH_SKILLS.REJECTED
            });
          } else {
            dispatch({
              type: types.FETCH_SKILLS.START
            });
          }
          done();
        },
        error => {
          dispatch({
            type: types.PUSH_SKILLS.REJECTED,
            payload: error
          });
          done();
        }
      );
  }
});
