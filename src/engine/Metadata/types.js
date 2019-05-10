import { defineAction } from "redux-define";
const stateTypes = ["START", "SUCCESS", "REJECTED", "CANCELLED"];

export const namespace = "metadata";
export const FETCH_META_CATEGORIES = defineAction(
  "FETCH_META_CATEGORIES",
  stateTypes,
  namespace
);

