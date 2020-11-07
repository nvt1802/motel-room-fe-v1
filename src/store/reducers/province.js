import * as actionTypes from '../actions/actionTypes'

const province = (state = [], action) => {
    switch (action.type) {
        case actionTypes.GET_ALL_PROVINCE:
            return state
        case actionTypes.INIT_LIST_PROVINCE:
            state = action.payload
            return state
        default:
            return state
    }
}

export default province