import * as types from "../types";

const initialState = {};

export default function (state = initialState, action) {
    switch (action.type) {
        case types.FETCH_SKILLS.SUCCESS:
            return action.payload;
        default:
            return state;
    }
}