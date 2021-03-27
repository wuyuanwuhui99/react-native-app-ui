import * as types from "../actionTypes";
export default function(state = {},action){
    switch (action.type){
        case types.USER_DATA:
            return {
                ...state,
                userData:action.userData
            }

        case types.TOKEN:
            return {
                ...state,
                token:action.token
            }

        default:
            return state
    }
}
