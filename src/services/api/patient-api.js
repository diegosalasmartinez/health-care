import { apiGet, apiPost } from './api'

const getPatients = async () => {
    return await apiGet(`patients`);
}

const createPatient = async (patient) => {
    return await apiPost(`patients/add`, patient);
}

const updatePatient = async (patient) => {
    return await apiPost(`patients/${patient._id}`, patient);
}
const deletePatient = async (patient) => {
    return await apiPost(`patients/delete/${patient._id}`, patient);
}

export { getPatients, createPatient, updatePatient, deletePatient }