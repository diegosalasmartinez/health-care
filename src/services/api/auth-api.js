import { apiPost } from './api'

const login = async (user) => {
    return await apiPost(`auth/login`, user);
}

export { login }