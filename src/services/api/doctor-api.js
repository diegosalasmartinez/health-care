import { apiGet, apiPost } from './api'

const getDoctors = async () => {
    return await apiGet(`doctors`);
}

const createDoctor = async (doctor) => {
    return await apiPost(`doctors/add`, doctor);
}

export { getDoctors, createDoctor }