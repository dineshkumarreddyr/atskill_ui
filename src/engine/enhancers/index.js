import { createLogicMiddleware } from "redux-logic";
import { applyMiddleware } from "redux";
import User from "../User";
import Skill from "../Skill";
import Questionnaire from "../Questionnaire";
import Metadata from "../Metadata";
import { composeWithDevTools } from "redux-devtools-extension";
import { ajax } from "rxjs/ajax";

const arrayLogic = [
  ...User.processors,
  ...Skill.processors,
  ...Questionnaire.processors,
  ...Metadata.processors
];

const deps = {
  http: ajax
};

const logicMiddleWare = createLogicMiddleware(arrayLogic, deps);

export default () => composeWithDevTools(applyMiddleware(logicMiddleWare));
