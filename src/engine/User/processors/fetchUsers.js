import { createLogic } from "redux-logic";
import * as types from "../types";

export const fetchUsers = createLogic({
  type: types.FETCH_USERS.ACTION,
  processOptions: {
    successType: types.FETCH_USERS.SUCCESS,
    failType: types.FETCH_USERS.REJECTED
  },
  process() {
    return {
      name: "Test User",
      email: "test@simonjose.com",
      id: 1
    };
  }
});
