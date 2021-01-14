import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./redux-store";
import {userAPI} from "../API/API";
import {setIsAjaxAction, SetIsAjaxActionType} from "./app-reducer";

const SET_USERS = "SET_USERS";
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
const SET_COUNT_PAGES = "SET_COUNT_PAGES";
const SET_NAME_FILTER = "SET_NAME_FILTER";
const SET_DATE_CREATE_FILTER = "SET_DATE_CREATE_FILTER";
const SET_SEARCH_FILTER = "SET_SEARCH_FILTER";
const CLEAR_FILTERS = "CLEAR_FILTERS";

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
        case SET_COUNT_PAGES:
            return {
                ...state,
                countPages: action.count,
            }
        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.currentPage,
            }
        case SET_NAME_FILTER:
            return {
                ...state,
                filters: {
                    ...state.filters,
                    name: action.filter
                }
            }
        case SET_DATE_CREATE_FILTER:
            return {
                ...state,
                filters: {
                    ...state.filters,
                    dateCreate: action.filter,
                }
            }
        case SET_SEARCH_FILTER:
            return {
                ...state,
                filters: {
                    ...state.filters,
                    searchFilter: action.filter,
                }
            }
        case CLEAR_FILTERS:
            return {
                ...state,
                filters: {
                    ...state.filters,
                    searchFilter: null,
                    dateCreate: null,
                    name: null,
                }
            }
        default:
            return state
    }
}

type ActionTypes = SetUsersActionType | SetCurrentPageUserActionType | SetCountPagesUserActionType | SetNameFilterUserActionType
    | SetDateCreateFilterUserActionType | SetSearchFilterUserActionType | ClearFiltersUserActionType

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

type SetCurrentPageUserActionType = {
    type: typeof SET_CURRENT_PAGE
    currentPage: number
}

export const setCurrentPageUserAction = (currentPage: number): SetCurrentPageUserActionType => ({type: SET_CURRENT_PAGE, currentPage});

type SetCountPagesUserActionType = {
    type: typeof SET_COUNT_PAGES
    count: number
}

export const setCountPagesUserAction = (count: number): SetCountPagesUserActionType => ({type: SET_COUNT_PAGES, count});

type SetNameFilterUserActionType = {
    type: typeof SET_NAME_FILTER
    filter: null | "asc" | "desc"
}

export const setNameFilterUserAction = (filter: null | "asc" | "desc"): SetNameFilterUserActionType => ({type: SET_NAME_FILTER, filter});

type SetDateCreateFilterUserActionType = {
    type: typeof SET_DATE_CREATE_FILTER
    filter: null | "asc" | "desc"
}

export const setDateCreateFilterUserAction = (filter: null | "asc" | "desc"): SetDateCreateFilterUserActionType => ({type: SET_DATE_CREATE_FILTER, filter});

type SetSearchFilterUserActionType = {
    type: typeof SET_SEARCH_FILTER
    filter: null | string
}

export const setSearchFilterUserAction = (filter: null | string): SetSearchFilterUserActionType => ({type: SET_SEARCH_FILTER, filter});

type ClearFiltersUserActionType = {
    type: typeof CLEAR_FILTERS
}

export const clearFiltersUserAction = (): ClearFiltersUserActionType => ({type: CLEAR_FILTERS});

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