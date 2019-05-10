import { createLogic } from "redux-logic";
import * as types from "../types";

import { map } from "rxjs/operators";

export const fetchCategoriesLogic = createLogic({
  type: types.FETCH_META_CATEGORIES.START,
  processOptions: {
    successType: types.FETCH_META_CATEGORIES.SUCCESS,
    failType: types.FETCH_META_CATEGORIES.REJECTED
  },
  process({ http, getState, action }, dispatch, done) {
    dispatch(
      http({
        url: `${process.env.REACT_APP_API_PATH}meta/categories`,
        responseType: "json",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      }).pipe(map(retVal => retVal.response))
    );
    done();
  }
});
