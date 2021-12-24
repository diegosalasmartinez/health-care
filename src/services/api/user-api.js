import { apiGet, apiPatch, apiPost } from './api'

const getUsers = async () => {
    return await apiGet(`users`);
}

const createUser = async (user) => {
    return await apiPost(`users/add`, user);
}

const updateUser = async (user) => {
    return await apiPatch(`users/${user._id}`, user);
}

const deleteUser = async (user) => {
    return await apiPost(`users/delete/${user._id}`, user);
}

export { getUsers, createUser, updateUser, deleteUser }