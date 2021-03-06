import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./redux-store";
import {userAPI} from "../API/API";
import {setIsAjaxAction, SetIsAjaxActionType} from "./app-reducer";

const SET_USERS = "SET_USERS";
const SET_CURRENT_USER = "SET_CURRENT_USER";
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
const SET_COUNT_PAGES = "SET_COUNT_PAGES";
const SET_NAME_FILTER = "SET_NAME_FILTER";
const SET_DATE_CREATE_FILTER = "SET_DATE_CREATE_FILTER";
const SET_SEARCH_FILTER = "SET_SEARCH_FILTER";
const CLEAR_FILTERS = "CLEAR_FILTERS";

export type UserType = {
    id: number,
    name: string,
    type: string,
    name_organization: null | string,
    inn: string,
    ogrn: string,
    address: string,
    phone: string,
}

const initialState = {
    users: null as Array<UserType> | null,
    currentPage: 1,
    countPages: 0,
    countNeed: 10,
    countUsers: 0,
    filters: {
        searchFilter: null as string | null,
        name: null as "asc" | "desc" | null,
        dateCreate: null as "asc" | "desc" | null,
    },
    currentUser: null as UserType | null,
}

type InitialStateType = typeof initialState

const userReducer = (state = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case SET_USERS:
            return {
                ...state,
                users: action.users,
                countUsers: action.count,
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
        case SET_CURRENT_USER:
            return {
                ...state,
                currentUser: action.data,
            }
        default:
            return state
    }
}

type ActionTypes = SetUsersActionType | SetCurrentPageUserActionType | SetCountPagesUserActionType | SetNameFilterUserActionType
    | SetDateCreateFilterUserActionType | SetSearchFilterUserActionType | ClearFiltersUserActionType | SetCurrentUserActionType

type OtherActionTypes = SetIsAjaxActionType;

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes | OtherActionTypes>;

type SetUsersActionType = {
    type: typeof SET_USERS
    users: Array<UserType>
    count: number
}

export const setUsersAction = (users: Array<UserType>, count: number): SetUsersActionType => ({type: SET_USERS, users, count});

export type UsersFiltersType = {
    searchFilter: string | null,
    name: "asc" | "desc" | null,
    dateCreate: "asc" | "desc" | null,
    currentPage: number,
    countNeed: number,
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

type SetCurrentUserActionType = {
    type: typeof SET_CURRENT_USER
    data: UserType
}

export const setCurrentUserAction = (data: UserType): SetCurrentUserActionType => ({type: SET_CURRENT_USER, data});

export const getUsers = (data: UsersFiltersType): ThunkType => {
    return async (dispatch) => {
        dispatch(setIsAjaxAction(true));
        const response = await userAPI.getAll(data);
        if(response.success) {
            const countPages = Math.ceil( response.data.count / initialState.countNeed );
            await dispatch(setUsersAction(response.data.users, response.data.count));
            await dispatch(setCountPagesUserAction(countPages));
        }
        await dispatch(setIsAjaxAction(false));
    }
}

export const getOneUser = (id: number): ThunkType => {
    return async (dispatch) => {
        dispatch(setIsAjaxAction(true));
        const response = await userAPI.getOne(id);
        if(response.success) {
            dispatch(setCurrentUserAction(response.data));
        }
        dispatch(setIsAjaxAction(false));
    }
}

export default userReducer;