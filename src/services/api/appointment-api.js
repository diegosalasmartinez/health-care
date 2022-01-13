import { apiGet, apiPatch, apiPost } from './api'

const getAppointments = async (pagination, searchParams) => {
    return await apiGet(`appointments?offset=${pagination.offset}&limit=${pagination.limit}&patient=${searchParams.patient}&doctor=${searchParams.doctor}`);
}

const getAppointmentsCompleted = async (pagination, searchParams) => {
    return await apiGet(`appointments/completed?offset=${pagination.offset}&limit=${pagination.limit}&patient=${searchParams.patient}&doctor=${searchParams.doctor}`);
}

const createAppointment = async (appointment) => {
    return await apiPost(`appointments/add`, appointment);
}

const updateAppointment = async (appointment) => {
    return await apiPatch(`appointments/${appointment._id}`, appointment);
}

const completeAppointment = async (appointment) => {
    return await apiPost(`appointments/complete/${appointment._id}`, appointment);
}

const deleteAppointment = async (appointment) => {
    return await apiPost(`appointments/delete/${appointment._id}`, appointment);
}

export { getAppointments, getAppointmentsCompleted, createAppointment, updateAppointment, completeAppointment, deleteAppointment }