import * as actionTypes from './actionTypes'

export const initAccount = (account) => {
    return {
        type: actionTypes.INIT_ACCOUNT_MANAGEMENT,
        payload: account
    }
}