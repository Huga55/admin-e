import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import thunkMiddleWare from "redux-thunk";
import appReducer from "./app-reducer";
import profileReducer from "./profile-reducer";
import userReducer from "./user-reducer";
import errorsReducer from "./errors-reducer";
import formReducer from "./form-reducer";
import orderReducer from "./order-reducer";
import {composeWithDevTools} from "redux-devtools-extension";
import pageReducer from "./page-reducer";

let rootReducer = combineReducers({
    app: appReducer,
    profile: profileReducer,
    user: userReducer,
    errors: errorsReducer,
    forms: formReducer,
    orders: orderReducer,
    page: pageReducer,
});

const initialState = {};

type RootReducerType = typeof rootReducer;
export type AppStateType = ReturnType<RootReducerType>

const store = createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(thunkMiddleWare)));

export default store;