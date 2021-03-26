import * as types from "../actionTypes";
export default function(state = {},action){
    switch (action.type){
        case types.USER_INFO:{
            return {
                ...state,
                userInfo:action.userInfo
            }
        }

        default:{
            return state
        }
    }
}