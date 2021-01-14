import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./redux-store";
import {userAPI} from "../API/API";
import {setIsAjaxAction, SetIsAjaxActionType} from "./app-reducer";

const SET_USERS = "SET_USERS";
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";

type UserType = {
    id: number,
    name: string,
    type: string,
    name_organization: null | string,
}

const initialState = {
    users: null as Array<UserType> | null,
    currentPage: 1,
    countPages: 0,
    filters: {
        searchFilter: null as string | null,
        name: null as "asc" | "desc" | null,
        dateCreate: null as "asc" | "desc" | null,
    }
}

type InitialStateType = typeof initialState

const userReducer = (state = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case SET_USERS:
            return {
                ...state,
                users: action.users,
            }
        default:
            return state
    }
}

type ActionTypes = SetUsersActionType | SetCurrentPageActionType;

type OtherActionTypes = SetIsAjaxActionType;

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes | OtherActionTypes>;

type SetUsersActionType = {
    type: typeof SET_USERS
    users: Array<UserType>
}

export const setUsersAction = (users: Array<UserType>): SetUsersActionType => ({type: SET_USERS, users});

export type UsersFiltersType = {
    searchFilter: string | null,
    name: "asc" | "desc" | null,
    dateCreate: "asc" | "desc" | null,
}

type SetCurrentPageActionType = {
    type: typeof SET_CURRENT_PAGE
    currentPage: number
}

export const setCurrentPageAction = (currentPage: number): SetCurrentPageActionType => ({type: SET_CURRENT_PAGE, currentPage});

export const getUsers = (data: UsersFiltersType): ThunkType => {
    return async (dispatch) => {
        dispatch(setIsAjaxAction(true));
        const response = await userAPI.getAll(data);
        if(response.success) {
            dispatch(setUsersAction(response.data.users));
        }
        dispatch(setIsAjaxAction(false));
    }
}

export const getOneUser = (id: number): ThunkType => {
    return async (dispatch) => {
        dispatch(setIsAjaxAction(true));
        const response = await userAPI.getOne(id);
        if(response.success) {

        }
        dispatch(setIsAjaxAction(false));
    }
}

export default userReducer;