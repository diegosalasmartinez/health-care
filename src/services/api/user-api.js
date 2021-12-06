import { apiGet, apiPost } from './api'

const getUsers = async () => {
    return await apiGet(`users`);
}

const createUser = async (user) => {
    return await apiPost(`users/add`, user);
}

const updateUser = async (user) => {
    return await apiPost(`users/${user._id}`, user);
}

export { getUsers, createUser, updateUser }