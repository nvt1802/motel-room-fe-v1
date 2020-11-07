import * as actionTypes from '../actions/actionTypes'

const district = (state = [], action) => {
    switch (action.type) {
        case actionTypes.GET_ALL_DISTRICT:
            return state
        case 'INIT_DISTRICT':
            state = action.payload
            return state
        default:
            return state
    }
}

export default district