import { apiGet, apiPost } from './api'

const getDoctors = async (pagination, searchParams) => {
    return await apiGet(`doctors?offset=${pagination.offset}&limit=${pagination.limit}&code=${searchParams.code}&name=${searchParams.name}&specialtyId=${searchParams.specialtyId}`);
}

export { getDoctors }