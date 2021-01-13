import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./redux-store";

const SET_INFO = "SET_INFO";

const initialState = {
    id: null as number | null,
    name: null as string | null,
    email: null as string | null,
    position: null as string | null,
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
            }
        default:
            return state
    }
}

type ActionTypes = SetInfoActionType

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes>;

type ProfileType = {
    id: null | number
    name: null | string
    email: null | string
    position: null | string
}

type SetInfoActionType = {
    type: typeof SET_INFO
    data: ProfileType
}

export const setInfoAction = (data: ProfileType) => ({type: SET_INFO, data});

export default profileReducer;