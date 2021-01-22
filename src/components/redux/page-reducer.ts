import {DataTableType} from "../Page/Page";

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
    table: {
        head: ["Вес, кг", "Зона 1", "Зона 2", "Зона 3", "Зона 4", "Зона 5"],
        body: [
            ["0,5", "1010", "1596", "1848", "1987", "2198"],
            ["0,5", "1010", "1596", "1848", "1987", "2198"],
            ["0,5", "1010", "1596", "1848", "1987", "2198"],
            ["0,5", "1010", "1596", "1848", "1987", "2198"],
            ["0,5", "1010", "1596", "1848", "1987", "2198"]
        ],
    } as DataTableType | null,
}

type InitialStateType = typeof initialState

const pageReducer = (state = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case SET_PAGE_DATA:
            return {
                ...state,
                ...action.data
            }
        case ADD_COLUMN:
            return {
                ...state,
                table: state.table? {
                    head: [...state.table.head, ""],
                    body: state.table.body.map((arr) => [...arr, ""]),
                } : null,
            }
        case ADD_ROW:
            return {
                ...state,
                table: state.table? {
                    head: state.table.head,
                    body: [...state.table.body, Array.from([...state.table.body[0]], (t) => "")],
                } : null,
            }
        case DELETE_ROW:
            return {
                ...state,
                table: state.table? {
                    ...state.table,
                    body: state.table.body.filter((c, index) => index !== action.index),
                } : null
            }
        case DELETE_COLUMN:
            return {
                ...state,
                table: state.table? {
                    head: state.table.head.filter((c, index) => index !== action.index),
                    body: state.table.body.map((arr) => arr.filter((c, index) => index !== action.index)),
                } : null
            }
        default:
            return state
    }
}

type ActionTypes = SetPageDataActionType | AddRowActionType | AddColumnActionType | DeleteRowActionType
                | DeleteColumnActionType

type PageData = {
    name: string
    titleTop: string
    titleMain: string
    titleDoc: string
    tabel: DataTableType
}

type SetPageDataActionType = {
    type: typeof SET_PAGE_DATA
    data: PageData
}

const setPageDataAction = (data: PageData): SetPageDataActionType => ({type: SET_PAGE_DATA, data});

type AddRowActionType = {
    type: typeof ADD_ROW
}

export const addColumnAction = (): AddRowActionType => ({type: ADD_ROW});

type AddColumnActionType = {
    type: typeof ADD_COLUMN
}

export const addRowAction = (): AddColumnActionType => ({type: ADD_COLUMN});

type DeleteRowActionType = {
    type: typeof DELETE_ROW
    index: number
}

export const deleteRowAction = (index: number): DeleteRowActionType => ({type: DELETE_ROW, index});

type DeleteColumnActionType = {
    type: typeof DELETE_COLUMN
    index: number
}

export const deleteColumnAction = (index: number): DeleteColumnActionType => ({type: DELETE_COLUMN, index});

export default pageReducer;