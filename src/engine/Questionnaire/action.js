import * as types from "./types";

export const fetchQuestionnaire = id => ({
  type: types.FETCH_QUESTIONNAIRE.START,
  payload: { id }
});

export const createQuestionnaire = payload => ({
  type: types.CREATE_QUESTIONNAIRE.START,
  payload: payload
});

export const deleteQuestionnaire = id => ({
  type: types.DELETE_QUESTIONNAIRE.START,
  payload: { id }
});

export const updateQuestionnaire = payload => ({
  type: types.PATCH_QUESTIONNAIRE.START,
  payload: payload
});
