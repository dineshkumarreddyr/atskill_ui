import { createLogic } from "redux-logic";
import * as types from "../types";

import { map } from "rxjs/operators";

export const deleteSkillLogic = createLogic({
  type: types.DELETE_SKILLS.START,
  process({ http, getState, action }, dispatch, done) {
    http
      .delete(
        `${process.env.REACT_APP_API_PATH}skill/delete/${escape(
          action.payload.id
        )}`
      )
      .pipe(map(retVal => retVal))
      .subscribe(
        response => {
          console.log("current response", response);
          dispatch({
            type: types.FETCH_SKILLS.START
          });
          done();
        },
        error => {
          dispatch({
            type: types.DELETE_SKILLS.REJECTED,
            payload: error
          });
          done();
        }
      );
  }
});
