import {createStore,applyMiddleware} from "redux";
import thunkMiddleware from "redux-thunk";
import reducer from "./reducers";
 // 引入工具插件
 const { composeWithDevTools } = require('redux-devtools-extension');

let initState = {
    userData:{}
}

const Store = ()=>{
    return createStore(
        reducer,
        initState,
        composeWithDevTools(
            applyMiddleware(thunkMiddleware),
        )
    );
}

export default Store()
