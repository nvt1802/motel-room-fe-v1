import * as actionTypes from '../actions/actionTypes'

const initLocation = {
    province: [],
    district: [],
    ward: []
}

const location = (state = initLocation, action) => {
    switch (action.type) {
        case actionTypes.INIT_LIST_PROVINCE:
            return {
                ...state,
                province: action.payload
            }
        case actionTypes.INIT_LIST_DISTRICT:
            return {
                ...state,
                district: action.payload
            }
        default:
            return state
    }
}

export default location