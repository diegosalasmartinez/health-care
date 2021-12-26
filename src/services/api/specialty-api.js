import { apiGet, apiPatch, apiPost } from './api'

const getSpecialties = async () => {
    return await apiGet(`specialties`);
}

const createSpecialty = async (specialty) => {
    return await apiPost(`specialties/add`, specialty);
}

const updateSpecialty = async (specialty) => {
    return await apiPatch(`specialties/${specialty._id}`, specialty);
}

const deleteSpecialty = async (specialty) => {
    return await apiPost(`specialties/delete/${specialty._id}`, specialty);
}

export { getSpecialties, createSpecialty, updateSpecialty, deleteSpecialty }