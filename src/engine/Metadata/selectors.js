import { prop, compose } from "ramda";
import * as types from "./types";

const metadataRoot = prop(types.namespace);

export const categories = compose(
  prop("categories"),
  metadataRoot
);
