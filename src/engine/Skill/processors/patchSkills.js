import { createLogic } from "redux-logic";
import * as types from '../types';

import { map } from "rxjs/operators";

const patchSkillsLogic = createLogic({
    type: types.PATCH_SKILLS.START,
    validate = ({getState, action}, allow, reject) => {
        const skill = action.payload;
        skill && skill.id ? allow(action) : reject({type: types.PATCH_SKILLS.REJECTED})
    },
    process = ({http, getState, action}, dispatch, done) => {
        return http.patch(`${process.env.REACT_APP_API_PATH}${action.payload.id}`, action.payload)
        .pipe(map(retVal => retVal))
        .subscribe(response => {
            if(response){
                dispatch({
                    type:types.FETCH_SKILLS.START
                });
                done();
            }
        }, error => {
            dispatch({
                type: types.PATCH_SKILLS.REJECTED,
                payload: error
            });
            done();
        });
    }
})

export default patchSkillsLogic;
