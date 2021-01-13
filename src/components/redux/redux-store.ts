import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleWare from "redux-thunk";
import appReducer from "./app-reducer";

let rootReducer = combineReducers({
    app: appReducer,
});

type RootReducerType = typeof rootReducer;
export type AppStateType = ReturnType<RootReducerType>
const store = createStore(rootReducer, applyMiddleware(thunkMiddleWare));

export default store;