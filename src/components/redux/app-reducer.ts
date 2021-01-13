import {AppStateType} from "./redux-store";
import {ThunkAction} from "redux-thunk";

const SET_IS_READY = "SET_IS_READY";

const initialState = {
    isReady: false,
}

type InitialStateType = typeof initialState

const appReducer = (state = initialState, action: ActionTypes) : InitialStateType => {
    switch (action.type) {
        case SET_IS_READY:
            return {
                ...state,
                isReady: action.value,
            }
        default:
            return state;
    }
}

type ActionTypes = SetIsReadyActionType

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes>;

type SetIsReadyActionType = {
    type: typeof SET_IS_READY
    value: boolean
}

export const setIsReadyAction = (value: boolean): SetIsReadyActionType => ({type: SET_IS_READY, value});

export const checkUser = (): ThunkType => {
    return async (dispatch) => {

    }
}

export default appReducer;