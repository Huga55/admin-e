import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleWare from "redux-thunk";
import appReducer from "./app-reducer";
import profileReducer from "./profile-reducer";
import userReducer from "./user-reducer";

let rootReducer = combineReducers({
    app: appReducer,
    profile: profileReducer,
    user: userReducer,
});

type RootReducerType = typeof rootReducer;
export type AppStateType = ReturnType<RootReducerType>
const store = createStore(rootReducer, applyMiddleware(thunkMiddleWare));

export default store;