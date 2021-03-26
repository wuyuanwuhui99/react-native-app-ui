import * as types from "../actionTypes";

export const getUserInfo = (data)=>{
    return {
        type:types.USER_INFO,
        ...data
    }
}