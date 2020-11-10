import * as actionTypes from './actionTypes'

export const createAccount = (account) => {
    return {
        type: actionTypes.CREATE_ACCOUNT,
        payload: account
    }
}