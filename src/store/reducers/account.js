import * as actionTypes from '../actions/actionTypes'

const account = (state = {}, action) => {
    switch (action.type) {
        case actionTypes.INIT_ACCOUNT_MANAGEMENT:
            return action.payload
        default:
            return state
    }
}

export default account