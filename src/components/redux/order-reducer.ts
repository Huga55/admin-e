import {setIsAjaxAction, SetIsAjaxActionType} from "./app-reducer";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./redux-store";
import {orderAPI} from "../API/API";

const SET_ORDERS = "SET_ORDERS";
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
const SET_COUNT_PAGES = "SET_COUNT_PAGES";
const SET_NAME_FILTER = "SET_NAME_FILTER";
const SET_DATE_CREATE_FILTER = "SET_DATE_CREATE_FILTER";
const SET_SEARCH_FILTER = "SET_SEARCH_FILTER";
const CLEAR_FILTERS = "CLEAR_FILTERS";
const SET_CURRENT_DOCS = "SET_CURRENT_DOCS";

type DirectionType = {
    name: string
    phone: string[]
}

type OrderType = {
    id: number
    id_dostavista: number
    to: Array<DirectionType>
    from: Array<DirectionType>
    address_dispatch: string
    address_delivery: string
    name: string
    type: string
    docs_count: number
    status: string
    date_create: string
}

type DocType = {
    id: number
    name: string
    path: string
}

const initialState = {
    orders: null as Array<OrderType> | null,
    currentPage: 1,
    countPages: 0,
    filters: {
        searchFilter: null as string | null,
        name: null as "asc" | "desc" | null,
        dateCreate: null as "asc" | "desc" | null,
    },
    currentDocs: null as Array<DocType> | null,
}

type InitialStateType = typeof initialState

const orderReducer = (state = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case SET_ORDERS:
            return {
                ...state,
                users: action.orders,
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
        case SET_CURRENT_DOCS:
            return {
                ...state,
                currentDocs: action.docs,
            }
        default:
            return state
    }
}

type ActionTypes = SetOrdersActionType | SetCurrentPageOrderActionType | SetCountPagesOrderActionType | SetNameFilterOrderActionType
    | SetDateCreateFilterOrderActionType | SetSearchFilterOrderActionType | ClearFiltersOrderActionType | SetCurrentDocsActionType

type OtherActionTypes = SetIsAjaxActionType;

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes | OtherActionTypes>;

type SetOrdersActionType = {
    type: typeof SET_ORDERS
    users: Array<OrderType>
}

export const setOrdersAction = (users: Array<OrderType>): SetOrdersActionType => ({type: SET_ORDERS, users});

export type OrdersFiltersType = {
    searchFilter: string | null,
    name: "asc" | "desc" | null,
    dateCreate: "asc" | "desc" | null,
}

type SetCurrentPageOrderActionType = {
    type: typeof SET_CURRENT_PAGE
    currentPage: number
}

export const setCurrentPageOrderAction = (currentPage: number): SetCurrentPageOrderActionType => ({type: SET_CURRENT_PAGE, currentPage});

type SetCountPagesOrderActionType = {
    type: typeof SET_COUNT_PAGES
    count: number
}

export const setCountPagesOrderAction = (count: number): SetCountPagesOrderActionType => ({type: SET_COUNT_PAGES, count});

type SetNameFilterOrderActionType = {
    type: typeof SET_NAME_FILTER
    filter: null | "asc" | "desc"
}

export const setNameFilterOrderAction = (filter: null | "asc" | "desc"): SetNameFilterOrderActionType => ({type: SET_NAME_FILTER, filter});

type SetDateCreateFilterOrderActionType = {
    type: typeof SET_DATE_CREATE_FILTER
    filter: null | "asc" | "desc"
}

export const setDateCreateFilterOrderAction = (filter: null | "asc" | "desc"): SetDateCreateFilterOrderActionType => ({type: SET_DATE_CREATE_FILTER, filter});

type SetSearchFilterOrderActionType = {
    type: typeof SET_SEARCH_FILTER
    filter: null | string
}

export const setSearchFilterOrderAction = (filter: null | string): SetSearchFilterOrderActionType => ({type: SET_SEARCH_FILTER, filter});

type ClearFiltersOrderActionType = {
    type: typeof CLEAR_FILTERS
}

export const clearFiltersOrderAction = (): ClearFiltersOrderActionType => ({type: CLEAR_FILTERS});

type SetCurrentDocsActionType = {
    type: typeof SET_CURRENT_DOCS
    docs: Array<DocType>
}

export const setCurrentDocsAction = (docs: Array<DocType>): SetCurrentDocsActionType => ({type: SET_CURRENT_DOCS, docs});

export const getOrders = (data: OrdersFiltersType): ThunkType => {
    return async (dispatch) => {
        dispatch(setIsAjaxAction(true));
        const response = await orderAPI.getAll(data);
        if(response.success) {
            dispatch(setOrdersAction(response.data.orders));
        }
        dispatch(setIsAjaxAction(false));
    }
}

export const getOneOrder = (id: number): ThunkType => {
    return async (dispatch) => {
        dispatch(setIsAjaxAction(true));
        const response = await orderAPI.getOne(id);
        if(response.success) {
            dispatch(setCurrentDocsAction(response.data));
        }
        dispatch(setIsAjaxAction(false));
    }
}

export default orderReducer;