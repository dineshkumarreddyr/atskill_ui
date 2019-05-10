import * as types from "./types";

export const fetchSkills = payload => ({
  type: types.FETCH_SKILLS.START,
  payload: { id: payload }
});

export const pushSkills = payload => ({
  type: types.PUSH_SKILLS.START,
  payload: payload
});

export const deleteSkills = payload => ({
  type: types.DELETE_SKILLS.START,
  payload: { id: payload }
});

export const patchSkills = payload => ({
  type: types.PATCH_SKILLS.START,
  payload: payload
});
