import { apiGet, apiPatch, apiPost } from './api'

const getBestDoctors = async () => {
    return await apiGet(`dashboard/doctors`);
}

const getBestSpecialties = async () => {
    return await apiGet(`dashboard/specialties`);
}

const getDashboardHistory = async () => {
    return await apiGet(`dashboard/history`);
}

export { getBestDoctors, getBestSpecialties, getDashboardHistory }