import * as actionTypes from './actionTypes'

export const initPostLatest = (postLatest) => {
    return {
        type: actionTypes.INIT_POST_LATEST,
        payload: postLatest
    }
}

export const initPostCommon = (postCommon) => {
    return {
        type: actionTypes.INIT_POST_COMMON,
        payload: postCommon
    }
}

export const initPostCheap = (postCheap) => {
    return {
        type: actionTypes.INIT_POST_CHEAP,
        payload: postCheap
    }
}

export const updatePageIndexLatest = (pageIndexLatest) => {
    return {
        type: actionTypes.UPDATE_PAGE_INDEX_LATEST,
        payload: pageIndexLatest
    }
}

export const updateTotalPageLatest = (totalPageLatest) => {
    return {
        type: actionTypes.UPDATE_TOTAL_PAGE_LATEST,
        payload: totalPageLatest
    }
}

export const updatePageIndexCommon = (pageIndexCommon) => {
    return {
        type: actionTypes.UPDATE_PAGE_INDEX_COMMON,
        payload: pageIndexCommon
    }
}

export const updateTotalPageCommon = (totalPageCommon) => {
    return {
        type: actionTypes.UPDATE_TOTAL_PAGE_COMMON,
        payload: totalPageCommon
    }
}

export const updatePageIndexCheap = (pageIndexCheap) => {
    return {
        type: actionTypes.UPDATE_PAGE_INDEX_CHEAP,
        payload: pageIndexCheap
    }
}

export const updateTotalPageCheap = (totalPageCheap) => {
    return {
        type: actionTypes.UPDATE_TOTAL_PAGE_CHEAP,
        payload: totalPageCheap
    }
}