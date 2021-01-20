import {setIsAjaxAction, SetIsAjaxActionType} from "./app-reducer";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./redux-store";
import {orderAPI} from "../API/API";
import {SendFileDataType} from "../Orders/Order/Docs/Docs";

const SET_ORDERS = "SET_ORDERS";
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
const SET_COUNT_PAGES = "SET_COUNT_PAGES";
const SET_NAME_FILTER = "SET_NAME_FILTER";
const SET_DATE_CREATE_FILTER = "SET_DATE_CREATE_FILTER";
const SET_SEARCH_FILTER = "SET_SEARCH_FILTER";
const CLEAR_FILTERS = "CLEAR_FILTERS";
const SET_CURRENT_DOCS = "SET_CURRENT_DOCS";
const SET_COUNT_NEED = "SET_COUNT_NEED";
const SET_COUNT_ORDERS = "SET_COUNT_ORDERS";
const SET_CURRENT_ORDER = "SET_CURRENT_ORDER";

type DirectionType = {
    name: string
    phone: string
}

export type OrderType = {
    id: number
    idDostavista: number
    to: Array<DirectionType>
    from: Array<DirectionType>
    addressDispatch: string
    addressDelivery: string
    nameCargo: string
    type: string
    docsCount: number
    status: string
    dateCreate: string
    trackNumber: string
}

type DocType = {
    id: number
    name: string
    path: string
    doc_type: string
}

const initialState = {
    orders: null as Array<OrderType> | null,
    currentOrder: null as OrderType | null,
    currentPage: 1,
    countNeed: 10,
    countOrders: 0,
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
                orders: action.orders,
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
        case SET_COUNT_ORDERS:
            return {
                ...state,
                countOrders: action.count,
            }
        case SET_CURRENT_ORDER:
            return {
                ...state,
                currentOrder: action.order,
            }
        default:
            return state
    }
}

type ActionTypes = SetOrdersActionType | SetCurrentPageOrderActionType | SetCountPagesOrderActionType | SetNameFilterOrderActionType
    | SetDateCreateFilterOrderActionType | SetSearchFilterOrderActionType | ClearFiltersOrderActionType | SetCurrentDocsActionType
    | SetCountNeedAction | SetCountOrdersActionType | SetCurrentOrderActionType

type OtherActionTypes = SetIsAjaxActionType;

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes | OtherActionTypes>;

type SetOrdersActionType = {
    type: typeof SET_ORDERS
    orders: Array<OrderType>
}

export const setOrdersAction = (orders: Array<OrderType>): SetOrdersActionType => ({type: SET_ORDERS, orders});

export type OrdersFiltersType = {
    searchFilter: string | null,
    name: "asc" | "desc" | null,
    dateCreate: "asc" | "desc" | null,
    currentPage: number,
    countNeed: number,
    userId: number | null
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

type SetCountNeedAction = {
    type: typeof SET_COUNT_NEED
    count: number
}

export const setCountNeedAction = (count: number): SetCountNeedAction => ({type: SET_COUNT_NEED, count});

type SetCountOrdersActionType = {
    type: typeof SET_COUNT_ORDERS
    count: number
}

export const setCountOrdersAction = (count: number): SetCountOrdersActionType => ({type: SET_COUNT_ORDERS, count});

type SetCurrentOrderActionType = {
    type: typeof SET_CURRENT_ORDER
    order: OrderType
}

export const setCurrentOrderAction = (order: OrderType): SetCurrentOrderActionType => ({type: SET_CURRENT_ORDER, order});

export const getOrders = (data: OrdersFiltersType): ThunkType => {
    return async (dispatch) => {
        await dispatch(setIsAjaxAction(true));
        const response = await orderAPI.getAll(data);
        if(response.success) {
            await dispatch(setOrdersAction(response.data.orders));
            await dispatch(setCountOrdersAction(response.data.count));
            const countPages = Math.ceil( response.data.count / initialState.countNeed );
            await dispatch(setCountPagesOrderAction(countPages));
        }
        await dispatch(setIsAjaxAction(false));
    }
}

export const getOneOrder = (id: number): ThunkType => {
    return async (dispatch) => {
        await dispatch(setIsAjaxAction(true));
        const response = await orderAPI.getOne(id);
        if(response.success) {
            await dispatch(setCurrentOrderAction(response.data));
            await dispatch(setCurrentDocsAction(response.data.docs));
        }
        await dispatch(setIsAjaxAction(false));
    }
}

export const sendFile = (data: SendFileDataType, orderId: number): ThunkType => {
    return async (dispatch) => {
        await dispatch(setIsAjaxAction(true));
        const response = await orderAPI.sendFile(data, orderId);
        if(response.success) {

        }
        await dispatch(setIsAjaxAction(false));
    }
}

export const deleteFile = (id: number): ThunkType => {
    return async (dispatch) => {
        await dispatch(setIsAjaxAction(true));
        const response = await orderAPI.deleteFile(id);
        if(response.success) {

        }
        await dispatch(setIsAjaxAction(false));
    }
}

export default orderReducer;