import {AppStateType} from "./redux-store";
import {ThunkAction} from "redux-thunk";

const SET_IS_READY = "SET_IS_READY";
const SET_IS_AJAX = "SET_IS_AJAX";

const initialState = {
    isReady: false,
    isAjax: false,
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
        default:
            return state;
    }
}

type ActionTypes = SetIsReadyActionType | SetIsAjaxActionType

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes>;

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

export const checkUser = (): ThunkType => {
    return async (dispatch) => {

    }
}

export default appReducer;