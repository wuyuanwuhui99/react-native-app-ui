import * as types from "../actionTypes";

export const getUserData = (userData)=>{
    return {
        type:types.USER_DATA,
        userData
    }
}

export const getToken = (token)=>{
    return {
        type:types.TOKEN,
        token
    }
}

