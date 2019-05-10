import { createLogic } from "redux-logic";
import * as types from "../types";

import { map } from "rxjs/operators";

export const fetchSkillsLogic = createLogic({
  type: types.FETCH_SKILLS.START,
  processOptions: {
    successType: types.FETCH_SKILLS.SUCCESS,
    failType: types.FETCH_SKILLS.REJECTED
  },
  process({ http }, dispatch, done) {
    dispatch(
      http({
        url: `${process.env.REACT_APP_API_PATH}skill`,
        responseType: "json",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      }).pipe(map(ret => ret.response))
    );

    done();
  }
});
