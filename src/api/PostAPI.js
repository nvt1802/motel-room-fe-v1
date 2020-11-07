import Axios from "axios"
import { API_URL } from "../common/Constant"

class PostAPI {
    createPost(object) {
        return Axios.post(`${API_URL}/api/post`, object)
    }

    updatePost(object) {
        return Axios.put(`${API_URL}/api/post`, object)
    }

    findPostById(postId) {
        return Axios.get(`${API_URL}/api/post/${postId}`)
    }

    finAllPostPageable(pageCommon) {
        return Axios.post(`${API_URL}/api/post/pageable`, pageCommon)
    }

    finAllPostPageableAvailable(pageCommon) {
        return Axios.post(`${API_URL}/api/post/pageableAvailable`, pageCommon)
    }

    multipleDeletePost(arrPostId) {
        return Axios.post(`${API_URL}/api/post/multipleDelete`, arrPostId)
    }

    lockAndUnlockPost(post) {
        return Axios.put(`${API_URL}/api/post/lockAndUnlock`, post)
    }

    viewPostById(postId) {
        return Axios.get(`${API_URL}/api/post/viewPost/${postId}`)
    }
}

export default new PostAPI()