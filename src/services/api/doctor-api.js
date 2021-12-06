import { apiGet, apiPost } from './api'

const getDoctors = async () => {
    return await apiGet(`doctors`);
}

export { getDoctors }