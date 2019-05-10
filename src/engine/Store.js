import { createStore } from "redux";
import rootReducer from "./reducer";
import enhancers from "./enhancers";

export default () => {
  const store = createStore(rootReducer, enhancers());
  return store;
};
