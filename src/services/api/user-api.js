import { apiGet, apiPost } from './api'

const getUsers = async () => {
    return await apiGet(`users`);
}

const createUser = async (user) => {
    return await apiPost(`users/add`, user);
}

export { getUsers, createUser }