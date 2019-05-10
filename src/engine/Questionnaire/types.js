import { defineAction } from "redux-define";
const stateTypes = ["START", "SUCCESS", "REJECTED", "CANCELLED"];

export const namespace = "questionnaire";
export const FETCH_QUESTIONNAIRE = defineAction(
  "FETCH_QUESTIONNAIRE",
  stateTypes,
  namespace
);
export const CREATE_QUESTIONNAIRE = defineAction(
  "CREATE_QUESTIONNAIRE",
  stateTypes,
  namespace
);

export const DELETE_QUESTIONNAIRE = defineAction(
  "DELETE_QUESTIONNAIRE",
  stateTypes,
  namespace
);

export const PATCH_QUESTIONNAIRE = defineAction(
  "PATCH_QUESTIONNAIRE",
  stateTypes,
  namespace
);
