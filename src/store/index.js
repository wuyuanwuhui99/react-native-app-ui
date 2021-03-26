import {createStore,applyMiddleware} from "redux";
import thunkMiddleware from "redux-thunk";
import reducer from "../reducers";
 // 引入工具插件
 const { composeWithDevTools } = require('redux-devtools-extension');

let initState = {
    userInfo:{}
}

export default function Store(){
    return createStore(
        reducer,
        initState,
        composeWithDevTools(
            applyMiddleware(thunkMiddleware),
        )
    );
}