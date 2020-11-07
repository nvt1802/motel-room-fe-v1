import Axios from "axios"
import { API_URL } from "../common/Constant"

class DiscoverAPI {

    discoverLatest(pageCommon) {
        return Axios.post(`${API_URL}/api/discover/latest`, pageCommon)
    }

    discoverCommon(pageCommon) {
        return Axios.post(`${API_URL}/api/discover/common`, pageCommon)
    }

    discoverCheap(pageCommon) {
        return Axios.post(`${API_URL}/api/discover/cheap`, pageCommon)
    }
}

export default new DiscoverAPI()