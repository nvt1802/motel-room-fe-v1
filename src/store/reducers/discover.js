import * as actionTypes from '../actions/actionTypes'

const initialState = {
    postLatest: {},
    postCommon: {},
    postCheap: {}
}

const discover = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.INIT_POST_LATEST:
            state = {
                postLatest: action.payload,
                postCommon: state.postCommon,
                postCheap: state.postCheap
            }
            return state
        case actionTypes.INIT_POST_COMMON:
            state = {
                postLatest: state.postLatest,
                postCommon: action.payload,
                postCheap: state.postCheap
            }
            return state
        case actionTypes.INIT_POST_CHEAP:
            state = {
                postLatest: state.postLatest,
                postCommon: state.postCommon,
                postCheap: action.payload
            }
            return state
        default:
            return state
    }
}

export default discover