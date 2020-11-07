import Axios from "axios"
import { API_URL } from "../common/Constant"

class ProvinceAPI {
    findAll() {
        return Axios.get(`${API_URL}/api/province`)
    }
    findProvinceById(provinceId) {
        return Axios.get(`${API_URL}/api/province/${provinceId}`)
    }
}

export default new ProvinceAPI()