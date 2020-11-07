import Axios from "axios"
import { API_URL } from "../common/Constant"

class ImageAPI {

    fileUpload(motelId, element) {
        const url = `${API_URL}/api/image/multi-upload`;
        const formData = new FormData();
        formData.append('motelId', motelId)
        for (let i = 0; i < element.files.length; i++) {
            formData.append('files', element.files[i])
        }
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        return Axios.post(url, formData, config)
    }

    findImageByMotelId(motelId) {
        return Axios.get(`${API_URL}/api/image/listImage/${motelId}`)
    }

    multipleDeleteImage(listId) {
        return Axios.post(`${API_URL}/api/image/multipleDelete`, listId)
    }
}

export default new ImageAPI()