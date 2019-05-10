import { prop, compose } from "ramda";
import * as types from "../types";

const userRoot = prop(types.namespace);
const getUserValues = root => {
  if (!root.userReducer) {
    return root.userReducer;
  }

  return root.userReducer;
};
const user = compose(
  getUserValues,
  userRoot
);

export default {
  user
};
