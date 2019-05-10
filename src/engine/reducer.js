import { combineReducers } from "redux";
import User from "./User";
import Skill from "./Skill";
import Questionnaire from "./Questionnaire";
import Metadata from "./Metadata";

export default combineReducers({
  [User.namespace]: User.reducer,
  [Skill.namespace]: Skill.reducer,
  [Questionnaire.namespace]: Questionnaire.reducer,
  [Metadata.namespace]: Metadata.reducer
});
