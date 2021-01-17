import {AppStateType} from "./redux-store";
import {ThunkAction} from "redux-thunk";
import {authAPI} from "../API/API";
import {setInfoAction, SetInfoActionType} from "./profile-reducer";

const SET_IS_READY = "SET_IS_READY";
const SET_IS_AJAX = "SET_IS_AJAX";
const SET_IS_AUTH = "SET_IS_AUTH";

const initialState = {
    isReady: false,
    isAjax: false,
    isAuth: null as boolean | null,
}

type InitialStateType = typeof initialState

const appReducer = (state = initialState, action: ActionTypes) : InitialStateType => {
    switch (action.type) {
        case SET_IS_READY:
            return {
                ...state,
                isReady: action.value,
            }
        case SET_IS_AJAX:
            return {
                ...state,
                isAjax: action.value,
            }
        case SET_IS_AUTH:
            return {
                ...state,
                isAuth: action.value,
            }
        default:
            return state;
    }
}

type ActionTypes = SetIsReadyActionType | SetIsAjaxActionType | SetIsAuthActionType

type OtherActionTypes = SetInfoActionType

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes | OtherActionTypes>;

type SetIsReadyActionType = {
    type: typeof SET_IS_READY
    value: boolean
};

export const setIsReadyAction = (value: boolean): SetIsReadyActionType => ({type: SET_IS_READY, value});

export type SetIsAjaxActionType = {
    type: typeof SET_IS_AJAX
    value: boolean
};

export const setIsAjaxAction = (value: boolean): SetIsAjaxActionType => ({type: SET_IS_AJAX, value});

type SetIsAuthActionType = {
    type: typeof SET_IS_AUTH
    value: boolean
}

export const setIsAuthAction = (value: boolean): SetIsAuthActionType => ({type: SET_IS_AUTH, value});

export const checkUser = (): ThunkType => {
    return async (dispatch) => {
        await dispatch(setIsAjaxAction(true));
        const response = await authAPI.checkUser();
        if(response.success) {
            await dispatch(setInfoAction(response.data));
        }
        await dispatch(setIsAuthAction(response.success));
        await dispatch(setIsReadyAction(true));
        await dispatch(setIsAjaxAction(false));
    }
}

export default appReducer;