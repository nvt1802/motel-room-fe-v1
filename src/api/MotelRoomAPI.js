import Axios from "axios"
import { API_URL } from "../common/Constant"

class MotelRoomAPI {
    findAll() {
        return Axios.get(`${API_URL}/api/motelRoom`)
    }

    findMotelRoomById(motelId) {
        return Axios.get(`${API_URL}/api/motelRoom/${motelId}`)
    }

    findMotelRoomByAccountId(accountId) {
        return Axios.get(`${API_URL}/api/motelRoom/accountId/${accountId}`)
    }

    findMotelRoomByAccountIdForEdit(accountId, postId) {
        return Axios.get(`${API_URL}/api/motelRoom/accountId/${accountId}/${postId}`)
    }

    createMotelRoom(motelRoom) {
        return Axios.post(`${API_URL}/api/motelRoom`, motelRoom)
    }

    updateMotelRoom(motelRoom) {
        return Axios.put(`${API_URL}/api/motelRoom`, motelRoom)
    }

    findRoomByAccountIdPageable(pageCommon) {
        return Axios.post(`${API_URL}/api/motelRoom/pageable`, pageCommon)
    }

    multipleDeleteRoom(arrMotelId) {
        return Axios.post(`${API_URL}/api/motelRoom/multipleDelete`, arrMotelId)
    }
}
export default new MotelRoomAPI()