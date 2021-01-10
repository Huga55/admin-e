import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleWare from "redux-thunk";

let rootReducer = combineReducers({

});

type RootReducerType = typeof rootReducer;
export type AppStateType = ReturnType<RootReducerType>
const store = createStore(rootReducer, applyMiddleware(thunkMiddleWare));

export default store;