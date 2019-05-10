import { prop, compose } from "ramda";
import * as types from "./types";

const questionnaireRoot = prop(types.namespace);

export const list = compose(
  prop("questions"),
  questionnaireRoot
);
