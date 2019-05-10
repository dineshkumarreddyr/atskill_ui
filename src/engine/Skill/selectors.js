import { prop, compose } from "ramda";
import * as types from "./types";

const skillRoot = prop(types.namespace);

export const list = compose(prop("list"), skillRoot);
