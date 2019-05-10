import { defineAction } from "redux-define";
const stateTypes = ["LOADING", "SUCCESS", "REJECTED", "CANCELLED"];

export const namespace = "user";
export const FETCH_USERS = defineAction("FETCH_USERS", stateTypes, namespace);
