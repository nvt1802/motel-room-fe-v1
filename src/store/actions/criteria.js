import * as actionTypes from '../actions/actionTypes'

export const initListCriteria = (criteria) => {
    return {
        type: actionTypes.INIT_LIST_CRITERIA,
        payload: criteria
    }
}