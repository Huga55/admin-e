import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./redux-store";
import {dadataAPI} from "../API/API";

const GET_CORRECT_ADDRESS = "GET_CORRECT_ADDRESS";
const CLEAR_ADDRESSES = "CLEAR_ADDRESSES";
const SET_ID_ACTIVE_ADDRESS = "SET_ID_ACTIVE_ADDRESS";
const SET_ADDRESS_FROM_MAP = "SET_ADDRESS_FROM_MAP";
const SET_LOGIN_ERROR = "SET_LOGIN_ERROR";

const initialState = {
    address: null as null | string[],
    nameInputActive: null as string | null,
    idAddressActive: null as number | null,
    loginError: null as null | string,
}

type InitialStateType = typeof initialState

const formReducer = (state = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case GET_CORRECT_ADDRESS:
            return {
                ...state,
                address: action.address,
                nameInputActive: action.nameInput,
            }
        case CLEAR_ADDRESSES:
            return {
                ...state,
                address: null,
                nameInputActive: null,
            }
        case SET_ID_ACTIVE_ADDRESS:
            return {
                ...state,
                idAddressActive: action.id,
            }
        case SET_LOGIN_ERROR:
            return {
                ...state,
                loginError: action.message,
            }
        default:
            return state
    }
}

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes>

type ActionTypes = GetCorrectAddressActionType | ClearAdressesActionType | SetIdActiveAddressActionType
    | SetAddressFromMapActionType | SetLoginErrorActionType

type GetCorrectAddressActionType = {
    type: typeof GET_CORRECT_ADDRESS
    address: string[]
    nameInput: string
}

export const getCorrectAddressAction = (address: string[], nameInput: string): GetCorrectAddressActionType => ({type: GET_CORRECT_ADDRESS, address, nameInput});

type ClearAdressesActionType = {
    type: typeof CLEAR_ADDRESSES
}

export const clearAdressesAction = (): ClearAdressesActionType => ({type: CLEAR_ADDRESSES});

type SetIdActiveAddressActionType = {
    type: typeof SET_ID_ACTIVE_ADDRESS
    id: number
}

export const setIdActiveAddressAction = (id: number): SetIdActiveAddressActionType => ({type: SET_ID_ACTIVE_ADDRESS, id});

export type SetLoginErrorActionType = {
    type: typeof SET_LOGIN_ERROR
    message: string | null
}

export const setLoginErrorAction = (message: string | null): SetLoginErrorActionType => ({type: SET_LOGIN_ERROR, message});

type SetAddressFromMapActionType = {
    type: typeof SET_ADDRESS_FROM_MAP
    data: {
        address: string
        direction: "dispatch" | "delivery"
    } | null
}

export const setAddressFromMapAction = (data: {address: string, direction: "dispatch" | "delivery"} | null): SetAddressFromMapActionType => ({type: SET_ADDRESS_FROM_MAP, data});

export const getCorrectAddress = (address: string, inputName: string): ThunkType => {
    return async (dispatch) => {
        const response = await dadataAPI.getAdrress(address);
        if(response.success) {
            const resultOfAddress = response.data.suggestions.map((data: any) => data.value);
            dispatch(getCorrectAddressAction(resultOfAddress, inputName));
        }
    }
}

export default formReducer;