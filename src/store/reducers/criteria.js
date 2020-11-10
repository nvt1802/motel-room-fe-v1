import * as actionTypes from '../actions/actionTypes'

const criteria = (state = [], action) => {
    switch (action.type) {
        case actionTypes.INIT_LIST_CRITERIA:
            return action.payload
        default:
            return state
    }
}

export default criteria