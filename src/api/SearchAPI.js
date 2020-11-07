import Axios from "axios"
import { API_URL } from "../common/Constant"

class SearchAPI {
    search(object) {
        return Axios.post(`${API_URL}/api/search`, object)
    }

    searchImage(object) {
        return Axios.post(`${API_URL}/api/search/image`, object)
    }
}

export default new SearchAPI()