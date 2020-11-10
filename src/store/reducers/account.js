import * as actionTypes from '../actions/actionTypes'

const account = (state = {}, action) => {
    switch (action.type) {
        case actionTypes.CREATE_ACCOUNT:
            return {
                accountId: action.accountId,
                userName: action.payload.userName,
                role: action.payload.role,
                name: action.payload.name,
                gender: action.payload.gender,
                birthday: action.payload.birthday,
                phone: action.payload.phone,
                email: action.payload.email,
                provinceId: action.payload.provinceId,
                districtId: action.payload.districtId,
            }
        default:
            return state
    }
}

export default account