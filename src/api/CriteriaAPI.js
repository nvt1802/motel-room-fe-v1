import Axios from "axios"
import { API_URL } from "../common/Constant"

class CriteriaAPI {
    findAll() {
        return Axios.get(`${API_URL}/api/criteria`)
    }

    findAllPageable(pageCommon) {
        return Axios.post(`${API_URL}/api/criteria/pageable`, pageCommon)
    }

    updateCriteria(criteria) {
        return Axios.put(`${API_URL}/api/criteria`, criteria)
    }

    createCriteria(criteria) {
        return Axios.post(`${API_URL}/api/criteria`, criteria)
    }

    multipleDeleteCriteria(listCriteria) {
        return Axios.post(`${API_URL}/api/criteria/multipleDelete`, listCriteria)
    }

    findCriteriaByListCriteriaId(listId) {
        return Axios.post(`${API_URL}/api/criteria/multiple`, listId)
    }
}

export default new CriteriaAPI()