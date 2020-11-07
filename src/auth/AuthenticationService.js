import axios from "axios"
import { API_URL, JWT_AUTH_HEADER, USER_NAME_SESSION } from '../common/Constant'

class AuthenticationService {

    constructor() {
        let jwtAuthHeader = this.getJwtAuthToken()
        if (jwtAuthHeader != null) {
            this.setupAxiosInterceptors(jwtAuthHeader)
        }
    }

    executeJwtAuthenticateService(username, password) {
        return axios.post(`${API_URL}/authenticate`, {
            username, password
        })
    }

    createJwtAuthToken(token) {
        localStorage.setItem(JWT_AUTH_HEADER, `Bearer ${token}`)
        return localStorage.getItem(JWT_AUTH_HEADER)
    }

    getJwtAuthToken() {
        return localStorage.getItem(JWT_AUTH_HEADER)
    }

    registerSuccessFullLogin(username, password, token) {
        localStorage.setItem(USER_NAME_SESSION, username)
        this.setupAxiosInterceptors(this.createJwtAuthToken(token))
    }

    logout() {
        this.removeAxiosInterceptors()
        localStorage.removeItem(USER_NAME_SESSION)
        localStorage.removeItem(JWT_AUTH_HEADER)
    }

    getUsername() {
        return localStorage.getItem(USER_NAME_SESSION)
    }

    isUserLoggedIn() {
        let user = localStorage.getItem(USER_NAME_SESSION)
        if (user === null) return false
        return true
    }

    setupAxiosInterceptors = (basicAuthHeader) => {
        axios.interceptors.request.use(
            (config) => {
                if (this.isUserLoggedIn()) {
                    config.headers.authorization = basicAuthHeader
                }
                return config
            }
        )
    }

    removeAxiosInterceptors = () => {
        axios.interceptors.request.handlers = []
    }
}

export default new AuthenticationService()