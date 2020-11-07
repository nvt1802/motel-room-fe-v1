import Axios from "axios"
import { API_URL } from "../common/Constant"

class WardAPI {
    findAll() {
        return Axios.get(`${API_URL}/api/district`)
    }

    findDistrictByDistrictId(provinceId) {
        return Axios.get(`${API_URL}/api/ward/${provinceId}`)
    }
}

export default new WardAPI()