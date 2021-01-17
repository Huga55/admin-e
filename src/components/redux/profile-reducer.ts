import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./redux-store";
import {authAPI, instance} from "../API/API";
import {checkUser, setIsAjaxAction, SetIsAjaxActionType} from "./app-reducer";
import {setLoginErrorAction, SetLoginErrorActionType} from "./form-reducer";

const SET_INFO = "SET_INFO";

const initialState = {
    id: null as number | null,
    name: null as string | null,
    email: null as string | null,
    position: null as string | null,
    status: null as boolean | null,
}

type InitialStateType = typeof initialState

const profileReducer = (state = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case SET_INFO:
            return {
                ...state,
                id: action.data.id,
                name: action.data.name,
                email: action.data.email,
                position: action.data.position,
                status: action.data.status,
            }
        default:
            return state
    }
}

type ActionTypes = SetInfoActionType

type OtherActionTypes = SetIsAjaxActionType | SetLoginErrorActionType

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes | OtherActionTypes>;

export type ProfileType = {
    id: null | number
    name: null | string
    email: null | string
    position: null | string
    status: null | boolean
}

export type SetInfoActionType = {
    type: typeof SET_INFO
    data: ProfileType
}

export const setInfoAction = (data: ProfileType): SetInfoActionType => ({type: SET_INFO, data});

export type LoginType = {
    email: string
    password: string
}

export const loginUser = (data: LoginType): ThunkType => {
    return async (dispatch) => {
        dispatch(setIsAjaxAction(true));
        const response = await authAPI.loginUser(data);
        if(response.success) {
            //if authorization is true, then set token to local storage and to instance
            window.localStorage.setItem("token", response.token);
            instance.defaults.headers["api-key"] = response.token;
            await dispatch((checkUser()));
        }else {
            dispatch(setLoginErrorAction("Неверно введен email или пароль"));
        }
        dispatch(setIsAjaxAction(false));
    }
}

export default profileReducer;