import * as actionTypes from '../actions/actionTypes'

const initialState = {
    postLatest: {},
    postCommon: {},
    postCheap: {},
    pageIndexLatest: 0,
    totalPageLatest: 0,
    pageIndexCommon: 0,
    totalPageCommon: 0,
    pageIndexCheap: 0,
    totalPageCheap: 0
}

const discover = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.INIT_POST_LATEST:
            return {
                ...state,
                postLatest: action.payload
            }
        case actionTypes.INIT_POST_COMMON:
            return {
                ...state,
                postCommon: action.payload
            }
        case actionTypes.INIT_POST_CHEAP:
            return {
                ...state,
                postCheap: action.payload
            }
        case actionTypes.UPDATE_PAGE_INDEX_LATEST:
            return {
                ...state,
                pageIndexLatest: action.payload
            }
        case actionTypes.UPDATE_TOTAL_PAGE_LATEST:
            return {
                ...state,
                totalPageLatest: action.payload
            }
        case actionTypes.UPDATE_PAGE_INDEX_COMMON:
            return {
                ...state,
                pageIndexCommon: action.payload
            }
        case actionTypes.UPDATE_TOTAL_PAGE_COMMON:
            return {
                ...state,
                totalPageCommon: action.payload
            }
        case actionTypes.UPDATE_PAGE_INDEX_CHEAP:
            return {
                ...state,
                pageIndexCheap: action.payload
            }
        case actionTypes.UPDATE_TOTAL_PAGE_CHEAP:
            return {
                ...state,
                totalPageCheap: action.payload
            }
        default:
            return state
    }
}

export default discover