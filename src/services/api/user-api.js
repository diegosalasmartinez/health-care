import { apiGet, apiPatch, apiPost } from './api'

const getUsers = async (pagination, searchParams) => {
    return await apiGet(`users?offset=${pagination.offset}&limit=${pagination.limit}&dni=${searchParams.dni}&name=${searchParams.name}&role=${searchParams.role}`);
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