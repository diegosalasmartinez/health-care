import { apiGet, apiPatch, apiPost } from './api'

const getAppointments = async (pagination, searchParams) => {
    return await apiGet(`appointments?offset=${pagination.offset}&limit=${pagination.limit}&patient=${searchParams.patient}&doctor=${searchParams.doctor}`);
}

const createAppointment = async (Appointment) => {
    return await apiPost(`appointments/add`, Appointment);
}

const updateAppointment = async (Appointment) => {
    return await apiPatch(`appointments/${Appointment._id}`, Appointment);
}

const deleteAppointment = async (Appointment) => {
    return await apiPost(`appointments/delete/${Appointment._id}`, Appointment);
}

export { getAppointments, createAppointment, updateAppointment, deleteAppointment }