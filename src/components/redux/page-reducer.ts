import {DataTableType} from "../Page/Page";
import {PosibilityType} from "../Page/Posibility/Posibility";
import {AdditionalType} from "../Page/Additional/Additional";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./redux-store";
import {setIsAjaxAction, SetIsAjaxActionType} from "./app-reducer";
import {pageAPI} from "../API/API";

const SET_PAGE_DATA = "SET_PAGE_DATA";
const ADD_ROW = "ADD_ROW";
const ADD_COLUMN = "ADD_COLUMN";
const DELETE_ROW = "DELETE_ROW";
const DELETE_COLUMN = "DELETE_COLUMN";

const initialState = {
    name: null as string | null,
    titleTop: null as string | null,
    titleMain: null as string | null,
    titleDoc: null as string | null,
    table: null as DataTableType | null,
    posibilities: null as PosibilityType | null,
    services: null as PosibilityType | null,
    additional: null as AdditionalType | null,
}

type InitialStateType = typeof initialState

const pageReducer = (state = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case SET_PAGE_DATA:
            return {
                ...state,
                ...action.data
            }
        default:
            return state
    }
}

type ActionTypes = SetPageDataActionType

type OtherActionTypes = SetIsAjaxActionType

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes | OtherActionTypes>;

export type PageData = {
    name: string
    titleTop: string
    titleMain: string
    titleDoc: string
    tabel: DataTableType
    posibilities: PosibilityType
    services: PosibilityType
    additional: AdditionalType
}

type SetPageDataActionType = {
    type: typeof SET_PAGE_DATA
    data: PageData
}

const setPageDataAction = (data: PageData): SetPageDataActionType => ({type: SET_PAGE_DATA, data});

export const sendDataPage = (data: any): ThunkType => {
    return async (dispatch) => {
        await dispatch(setIsAjaxAction(true));
        const response = await pageAPI.sendData(data);
        if(response.success) {
            await dispatch(getDataPage());
        }
        await dispatch(setIsAjaxAction(false));
    }
}

export const getDataPage = (): ThunkType => {
    return async (dispatch) => {
        await dispatch(setIsAjaxAction(true));
        const response = await pageAPI.getData();
        if(response.success) {
            await dispatch(setPageDataAction(response.data));
        }
        await dispatch(setIsAjaxAction(false));
    }
}


export default pageReducer;