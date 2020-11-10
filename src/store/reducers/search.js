import * as actionTypes from '../actions/actionTypes'

const initLocation = {
    province: [],
    district: [],
    provinceId: -1,
    districtId: -1,
    price: 1000000,
    acreage: 20,
    optionAdvance: false,
    listCriteriaId: []
}

const search = (state = initLocation, action) => {
    switch (action.type) {
        case actionTypes.INIT_LIST_PROVINCE:
            return {
                ...state,
                province: action.payload
            }
        case actionTypes.CHANGE_SEARCH_DISTRICT:
            return {
                ...state,
                district: action.payload
            }
        case actionTypes.CHANGE_SEARCH_PRICE:
            return {
                ...state,
                price: action.payload
            }
        case actionTypes.CHANGE_SEARCH_ACREAGE:
            return {
                ...state,
                acreage: action.payload
            }
        case actionTypes.CHANGE_SEARCH_CRITERIA_ID:
            return {
                ...state,
                listCriteriaId: action.payload
            }
        case actionTypes.CHANGE_SEARCH_PROVINCE_ID:
            return {
                ...state,
                provinceId: action.payload
            }
        case actionTypes.CHANGE_SEARCH_DISTRICT_ID:
            return {
                ...state,
                districtId: action.payload
            }
        case actionTypes.CHANGE_SEARCH_OPTION_ADVANCE:
            return {
                ...state,
                optionAdvance: action.payload
            }
        default:
            return state
    }
}

export default search