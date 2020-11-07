import Axios from "axios"
import { API_URL } from "../common/Constant"

class DistrictAPI {
    findAll() {
        return Axios.get(`${API_URL}/api/district`)
    }

    findDistrictByProvinceId(provinceId) {
        return Axios.get(`${API_URL}/api/district/provinceId/${provinceId}`)
    }

    findDistrictByDistrictId(districtId) {
        return Axios.get(`${API_URL}/api/district/${districtId}`)
    }
}

export default new DistrictAPI()