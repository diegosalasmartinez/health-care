import { apiGet, apiPost, apiPatch } from './api'

const getPatients = async (pagination, searchParams) => {
    return await apiGet(`patients?offset=${pagination.offset}&limit=${pagination.limit}&code=${searchParams.code}&dni=${searchParams.dni}&name=${searchParams.name}`);
}

const createPatient = async (patient) => {
    return await apiPost(`patients/add`, patient);
}

const updatePatient = async (patient) => {
    return await apiPatch(`patients/${patient._id}`, patient);
}

const updatePatientHistory = async (patient) => {
    return await apiPatch(`patients/${patient._id}/history`, patient);
}

const deletePatient = async (patient) => {
    return await apiPost(`patients/delete/${patient._id}`, patient);
}

export { getPatients, createPatient, updatePatient, updatePatientHistory, deletePatient }