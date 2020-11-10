import * as actionTypes from './actionTypes'

export const initAuthenticate = (account) => {
    return {
        type: actionTypes.INIT_DATA_AUTHENTICATE,
        payload: account,
        logged: true
    }
}

export const removeAuthenticate = () => {
    return {
        type: actionTypes.REMOVE_DATA_AUTHENTICATE,
        logged: false
    }
}