import * as actionTypes from '../actions/actionTypes'

export const changeLayout = (value) => {
    return {
        type: actionTypes.CHANGE_LAYOUT,
        payload: value
    }
}