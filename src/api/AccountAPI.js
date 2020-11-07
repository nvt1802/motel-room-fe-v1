import Axios from "axios"
import { API_URL } from "../common/Constant"

class AccountAPI {
    checkUserNameExist(username) {
        return Axios.get(`${API_URL}/api/account/checkAccount/${username}`)
    }

    findAccountByUserName(username) {
        return Axios.get(`${API_URL}/api/account/${username}`)
    }

    addOneAccount(account) {
        return Axios.post(`${API_URL}/api/account`, account)
    }

    finAllAccountAvailable(pageCommon) {
        return Axios.post(`${API_URL}/api/account/available`, pageCommon)
    }

    findAccountByAccountId(accountId) {
        return Axios.get(`${API_URL}/api/account/getOneAccount/${accountId}`)
    }

    multipleDeleteAccount(arrAccountId) {
        return Axios.post(`${API_URL}/api/account/multipleDelete`, arrAccountId)
    }

    updateOneAccount(account) {
        return Axios.put(`${API_URL}/api/account/update`, account)
    }

    updateInfo(account) {
        return Axios.put(`${API_URL}/api/account/changeInfo`, account)
    }

    lockAndUnlockPost(account) {
        return Axios.put(`${API_URL}/api/account/lockAndUnlock`, account)
    }
}

export default new AccountAPI()