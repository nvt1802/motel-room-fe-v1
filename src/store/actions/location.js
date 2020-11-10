import * as actionTypes from './actionTypes'

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