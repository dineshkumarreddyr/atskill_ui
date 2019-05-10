import * as types from "./types";
import * as actions from "./action";
import reducer from "./reducer";
import processors from "./processors";
import selectors from "./selectors";

export default {
  types,
  actions,
  reducer,
  processors,
  namespace: types.namespace,
  selectors
};
