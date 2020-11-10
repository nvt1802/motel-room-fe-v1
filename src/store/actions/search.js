import * as actionTypes from '../actions/actionTypes'

export const initListDistrict = (district) => {
    return {
        type: actionTypes.CHANGE_SEARCH_DISTRICT,
        payload: district
    }
}

export const setPrice = (price) => {
    return {
        type: actionTypes.CHANGE_SEARCH_PRICE,
        payload: price
    }
}

export const setAcreage = (acreage) => {
    return {
        type: actionTypes.CHANGE_SEARCH_ACREAGE,
        payload: acreage
    }
}

export const setListCriteriaId = (listCriteriaId) => {
    return {
        type: actionTypes.CHANGE_SEARCH_CRITERIA_ID,
        payload: listCriteriaId
    }
}

export const setProvinceId = (provinceId) => {
    return {
        type: actionTypes.CHANGE_SEARCH_PROVINCE_ID,
        payload: provinceId
    }
}

export const setDistrictId = (districtId) => {
    return {
        type: actionTypes.CHANGE_SEARCH_DISTRICT_ID,
        payload: districtId
    }
}

export const setOptionAdvance = (optionAdvance) => {
    return {
        type: actionTypes.CHANGE_SEARCH_OPTION_ADVANCE,
        payload: optionAdvance
    }
}