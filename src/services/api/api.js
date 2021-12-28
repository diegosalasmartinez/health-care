import axios from 'axios'
import { store } from '../redux/store'
const baseUrl = "/api/v1/"
import dotenv from 'dotenv'
dotenv.config();

const apiUrl = process.env.REACT_APP_SERVER_URL;

export function generateUrl(path) {
	return apiUrl + baseUrl + path;
}

export function apiReq(endPoint, data, method, headers, requestOptions = {}) {
	return new Promise((res, rej) => {
		headers = { ...headers, Authorization: "Bearer " + store.getState().auth.token }
		if (method === 'get' || method === 'delete') {
			data = {
				...requestOptions,
				params: data,
				headers
			}
		}
		axios[method](endPoint, data, { headers })
			.then((result) => {
                let { data } = result;
                if (data.status === false) {
                    return rej(data);
                }
			    return res(data);
		    })
            .catch((err) => { return rej(err) });
	})
}

export function apiPost(endPoint, data, headers = {}) {
	return apiReq(generateUrl(endPoint), data, 'post', headers);
}

export function apiDelete(endPoint, data, headers = {}) {
	return apiReq(generateUrl(endPoint), data, 'delete', headers);
}

export function apiGet(endPoint, data, headers = {}, requestOptions) {
	return apiReq(generateUrl(endPoint), data, 'get', headers, requestOptions);
}

export function apiPatch(endPoint, data, headers = {}) {
	return apiReq(generateUrl(endPoint), data, 'patch', headers);
}