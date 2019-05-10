import { defineAction } from "redux-define";
const stateTypes = ["START", "SUCCESS", "REJECTED", "CANCELLED"];

export const namespace = "skill";
export const FETCH_SKILLS = defineAction("FETCH_SKILLS", stateTypes, namespace);
export const PUSH_SKILLS = defineAction("PUSH_SKILLS", stateTypes, namespace);
export const DELETE_SKILLS = defineAction(
  "DELETE_SKILLS",
  stateTypes,
  namespace
);
export const PATCH_SKILLS = defineAction("PATCH_SKILLS", stateTypes, namespace);
