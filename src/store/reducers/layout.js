import * as actionTypes from '../actions/actionTypes'

const layout = (state = { adminPage: false }, action) => {
    switch (action.type) {
        case actionTypes.CHANGE_LAYOUT:
            return {
                ...state,
                adminPage: action.payload
            }
        default:
            return state
    }
}

export default layout