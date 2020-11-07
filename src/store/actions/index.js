import * as actionTypes from './actionTypes'

export const createAccount = (account) => {
    return {
        type: actionTypes.CREATE_ACCOUNT,
        payload: account
    }
}

export const getAllProvince = () => {
    return {
        type: actionTypes.GET_ALL_PROVINCE
    }
}

export const initListProvince = (province) => {
    return {
        type: actionTypes.INIT_LIST_PROVINCE,
        payload: province
    }
}


export const initListDistrict = (district) => {
    return {
        type: actionTypes.INIT_LIST_DISTRICT,
        payload: district
    }
}

export const initAuthenticate = (account, logged) => {
    return {
        type: actionTypes.INIT_DATA_AUTHENTICATE,
        payload: account,
        logged: logged
    }
}